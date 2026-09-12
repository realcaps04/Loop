import { createClient } from "@/lib/supabase/client";

export type AuthProvider = "email" | "google" | "azure" | "other";

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  auth_provider: AuthProvider;
  created_at: string;
  updated_at: string;
};

export type WorkspaceRow = {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
};

export type MemberRole = "ADMIN" | "ANALYST" | "VIEWER";

export type WorkspaceMember = {
  workspace_id: string;
  user_id: string;
  role: MemberRole;
  created_at: string;
};

/** Current user profile (null if signed out or profile missing). */
export async function getCurrentProfile() {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;
  return data as Profile | null;
}

/** Workspaces the signed-in user belongs to. */
export async function getMyWorkspaces() {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) return [];

  const { data: memberships, error: memberError } = await supabase
    .from("workspace_members")
    .select("workspace_id, role, created_at")
    .eq("user_id", user.id);

  if (memberError) throw memberError;
  if (!memberships?.length) return [];

  const ids = memberships.map((m) => m.workspace_id);
  const { data: workspaces, error: workspaceError } = await supabase
    .from("workspaces")
    .select("*")
    .in("id", ids);

  if (workspaceError) throw workspaceError;

  return (workspaces ?? []).map((workspace) => ({
    ...(workspace as WorkspaceRow),
    role: memberships.find((m) => m.workspace_id === workspace.id)?.role as
      | MemberRole
      | undefined,
  }));
}

/** Email / password sign-in. */
export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient();
  return supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
}

/** Email / password sign-up (optional workspace_name seeds DB via trigger). */
export async function signUpWithEmail(input: {
  email: string;
  password: string;
  fullName: string;
  workspaceName?: string;
}) {
  const supabase = createClient();
  return supabase.auth.signUp({
    email: input.email.trim(),
    password: input.password,
    options: {
      data: {
        full_name: input.fullName.trim(),
        workspace_name: input.workspaceName?.trim() || undefined,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

/** Google OAuth — redirect flow (same pattern as Microsoft). */
export async function signInWithGoogleOAuth() {
  const supabase = createClient();
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      scopes: "email profile openid",
      queryParams: {
        access_type: "online",
        prompt: "select_account",
      },
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

/** Microsoft (Azure AD) OAuth — redirect flow. */
export async function signInWithMicrosoft() {
  const supabase = createClient();
  return supabase.auth.signInWithOAuth({
    provider: "azure",
    options: {
      scopes: "email openid profile",
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

/** Update display name / avatar on the profiles row. */
export async function updateProfile(patch: {
  full_name?: string;
  avatar_url?: string | null;
}) {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("Not signed in.");

  const { data, error } = await supabase
    .from("profiles")
    .update(patch)
    .eq("id", user.id)
    .select("*")
    .single();

  if (error) throw error;
  return data as Profile;
}

export async function signOut() {
  const supabase = createClient();
  return supabase.auth.signOut();
}
