import { createClient } from "@/lib/supabase/client";

const OAUTH_MESSAGE = "loop-google-oauth";

function getGoogleClientId() {
  return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() || "";
}

function makeRawNonce() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode.apply(null, Array.from(bytes) as number[]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** SHA-256 hex — send this to Google; send the raw nonce to Supabase. */
async function hashNonce(raw: string) {
  const encoded = new TextEncoder().encode(raw);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function setupHint() {
  const origin = window.location.origin;
  const redirect = `${origin}/google-callback.html`;
  return (
    `In Google Cloud → Credentials → Web client (${getGoogleClientId() || "your client"}):\n` +
    `• Authorized JavaScript origins: ${origin}\n` +
    `• Authorized redirect URIs: ${redirect}`
  );
}

function openGoogleIdTokenPopup(
  clientId: string,
  hashedNonce: string,
): Promise<string> {
  const redirectUri = `${window.location.origin}/google-callback.html`;
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "id_token",
    response_mode: "fragment",
    scope: "openid email profile",
    redirect_uri: redirectUri,
    nonce: hashedNonce,
    prompt: "select_account",
  });

  const width = 520;
  const height = 640;
  const left = Math.max(
    0,
    Math.round(window.screenX + (window.outerWidth - width) / 2),
  );
  const top = Math.max(
    0,
    Math.round(window.screenY + (window.outerHeight - height) / 2),
  );

  const popup = window.open(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
    "loop-google-signin",
    `width=${width},height=${height},left=${left},top=${top},popup=yes`,
  );

  if (!popup) {
    return Promise.reject(
      new Error("Popup blocked. Allow popups for this site and try again."),
    );
  }

  return new Promise((resolve, reject) => {
    let settled = false;

    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      window.clearInterval(closedTimer);
      window.removeEventListener("message", onMessage);
      try {
        popup.close();
      } catch {
        // COOP may block close; ignore.
      }
      fn();
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data as {
        source?: string;
        idToken?: string | null;
        error?: string | null;
      };
      if (data?.source !== OAUTH_MESSAGE) return;

      if (data.idToken) {
        finish(() => resolve(data.idToken as string));
        return;
      }

      finish(() =>
        reject(
          new Error(
            data.error === "access_denied"
              ? "Google sign-in was cancelled."
              : `Google sign-in failed (${data.error || "unknown"}). ${setupHint()}`,
          ),
        ),
      );
    };

    window.addEventListener("message", onMessage);

    // Avoid reading popup.closed when COOP blocks it — rely on postMessage + timeout.
    const closedTimer = window.setInterval(() => {
      try {
        if (popup.closed) {
          finish(() => reject(new Error("Google sign-in was cancelled.")));
        }
      } catch {
        // Cross-Origin-Opener-Policy — ignore; wait for postMessage or timeout.
      }
    }, 500);

    window.setTimeout(() => {
      finish(() =>
        reject(new Error("Google sign-in timed out. Please try again.")),
      );
    }, 120_000);
  });
}

/**
 * Google sign-in via ID token (popup).
 * Register in Google Cloud (Web client):
 *   Authorized JavaScript origins: http://localhost:3001
 *   Authorized redirect URIs:      http://localhost:3001/google-callback.html
 * Also enable Google in Supabase → Authentication → Providers (Client ID required).
 */
export async function signInWithGoogle() {
  const clientId = getGoogleClientId();
  if (!clientId) {
    throw new Error(
      "Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID. Add it to .env and restart the dev server.",
    );
  }

  const rawNonce = makeRawNonce();
  const hashedNonce = await hashNonce(rawNonce);
  const idToken = await openGoogleIdTokenPopup(clientId, hashedNonce);

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: idToken,
    nonce: rawNonce,
  });

  if (error) {
    throw new Error(
      `${error.message}. Enable Google in Supabase → Authentication → Providers and set Client ID to ${clientId}.`,
    );
  }
}
