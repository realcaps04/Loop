import { createClient } from "@/lib/supabase/client";
import type { MemberRole, Profile, WorkspaceRow } from "@/lib/auth/queries";
import type { Role, Session, User, Workspace } from "@/lib/types";

function initialsFromName(name: string, email: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  if (parts.length === 1 && parts[0].length >= 2) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (email.slice(0, 2) || "U").toUpperCase();
}

function firstName(name: string) {
  const part = name.trim().split(/\s+/)[0];
  return part || "there";
}

export function mapSession(
  profile: Profile,
  workspace: WorkspaceRow & { role?: MemberRole },
): Session {
  const name = profile.full_name || profile.email.split("@")[0] || "User";
  const role = (workspace.role ?? "ADMIN") as Role;
  const user: User = {
    id: profile.id,
    name,
    email: profile.email,
    role,
    title: role === "ADMIN" ? "Workspace admin" : "Product Team",
    initials: initialsFromName(name, profile.email),
    avatarUrl: profile.avatar_url,
  };
  const ws: Workspace = {
    id: workspace.id,
    name: workspace.name,
    slug: workspace.slug,
    details: "",
  };
  return { user, workspace: ws };
}

export { firstName };

/** Load profile + primary workspace; create a workspace if the user has none. */
export async function loadOrCreateSession(): Promise<Session | null> {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  let { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    const fullName =
      (user.user_metadata?.full_name as string | undefined) ||
      (user.user_metadata?.name as string | undefined) ||
      user.email?.split("@")[0] ||
      "User";

    const { data: inserted, error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        email: user.email ?? "",
        full_name: fullName,
        avatar_url:
          (user.user_metadata?.avatar_url as string | undefined) ||
          (user.user_metadata?.picture as string | undefined) ||
          null,
      })
      .select("*")
      .single();

    if (error) throw error;
    profile = inserted;
  }

  const { data: memberships } = await supabase
    .from("workspace_members")
    .select("workspace_id, role")
    .eq("user_id", user.id);

  let workspace: (WorkspaceRow & { role?: MemberRole }) | null = null;

  if (memberships?.length) {
    const first = memberships[0];
    const { data: ws } = await supabase
      .from("workspaces")
      .select("*")
      .eq("id", first.workspace_id)
      .maybeSingle();

    if (ws) {
      workspace = { ...(ws as WorkspaceRow), role: first.role as MemberRole };
    }
  }

  if (!workspace) {
    const name = `${profile.full_name || "My"}'s workspace`;
    const baseSlug =
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || `workspace-${user.id.slice(0, 8)}`;
    const slug = `${baseSlug}-${user.id.slice(0, 6)}`;

    const { data: created, error: wsError } = await supabase
      .from("workspaces")
      .insert({ name, slug, owner_id: user.id })
      .select("*")
      .single();

    if (wsError) throw wsError;

    const { error: memberError } = await supabase
      .from("workspace_members")
      .insert({
        workspace_id: created.id,
        user_id: user.id,
        role: "ADMIN",
      });

    if (memberError) throw memberError;

    workspace = { ...(created as WorkspaceRow), role: "ADMIN" };
  }

  return mapSession(profile as Profile, workspace);
}
