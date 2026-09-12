-- Loop product data (safe to re-run).
-- Auth migration already applied if you saw: type "auth_provider" already exists.
-- Run THIS file only in Supabase SQL Editor — do not re-run 20260328000000_auth_users.sql.

-- ---------------------------------------------------------------------------
-- Enums (idempotent)
-- ---------------------------------------------------------------------------
do $$ begin
  create type public.feedback_sentiment as enum (
    'positive', 'neutral', 'negative', 'mixed'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.feedback_status as enum ('NEW', 'REVIEWED', 'ACTIONED');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.action_status as enum (
    'open', 'in_progress', 'done', 'cancelled'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.integration_status as enum (
    'connected', 'disconnected', 'error'
  );
exception when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------------------
-- Themes
-- ---------------------------------------------------------------------------
create table if not exists public.themes (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  name text not null,
  description text not null default '',
  color text not null default '#494AFD',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, name)
);

create index if not exists themes_workspace_id_idx on public.themes (workspace_id);

-- ---------------------------------------------------------------------------
-- Feedback
-- ---------------------------------------------------------------------------
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  content text not null,
  customer_label text not null default '',
  customer_initials text not null default '',
  sentiment public.feedback_sentiment not null default 'neutral',
  status public.feedback_status not null default 'NEW',
  theme_id uuid references public.themes (id) on delete set null,
  channel text not null default 'manual',
  source_ref text not null default '',
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists feedback_workspace_id_idx on public.feedback (workspace_id);
create index if not exists feedback_created_at_idx on public.feedback (created_at desc);
create index if not exists feedback_theme_id_idx on public.feedback (theme_id);
create index if not exists feedback_sentiment_idx on public.feedback (sentiment);

-- ---------------------------------------------------------------------------
-- Actions
-- ---------------------------------------------------------------------------
create table if not exists public.actions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  title text not null,
  description text not null default '',
  status public.action_status not null default 'open',
  feedback_id uuid references public.feedback (id) on delete set null,
  assignee_id uuid references public.profiles (id) on delete set null,
  due_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists actions_workspace_id_idx on public.actions (workspace_id);
create index if not exists actions_status_idx on public.actions (status);

-- ---------------------------------------------------------------------------
-- Events
-- ---------------------------------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists events_workspace_id_idx on public.events (workspace_id);
create index if not exists events_starts_at_idx on public.events (starts_at);

-- ---------------------------------------------------------------------------
-- Integrations
-- ---------------------------------------------------------------------------
create table if not exists public.integrations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  provider text not null,
  status public.integration_status not null default 'disconnected',
  config jsonb not null default '{}'::jsonb,
  connected_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, provider)
);

create index if not exists integrations_workspace_id_idx on public.integrations (workspace_id);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------
drop trigger if exists themes_set_updated_at on public.themes;
create trigger themes_set_updated_at
  before update on public.themes
  for each row execute function public.set_updated_at();

drop trigger if exists feedback_set_updated_at on public.feedback;
create trigger feedback_set_updated_at
  before update on public.feedback
  for each row execute function public.set_updated_at();

drop trigger if exists actions_set_updated_at on public.actions;
create trigger actions_set_updated_at
  before update on public.actions
  for each row execute function public.set_updated_at();

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

drop trigger if exists integrations_set_updated_at on public.integrations;
create trigger integrations_set_updated_at
  before update on public.integrations
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Membership helpers
-- ---------------------------------------------------------------------------
create or replace function public.is_workspace_member(ws uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members m
    where m.workspace_id = ws
      and m.user_id = auth.uid()
  );
$$;

create or replace function public.is_workspace_admin(ws uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members m
    where m.workspace_id = ws
      and m.user_id = auth.uid()
      and m.role = 'ADMIN'
  );
$$;

-- ---------------------------------------------------------------------------
-- Every new user gets a workspace
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_provider public.auth_provider;
  v_full_name text;
  v_avatar text;
  v_workspace_name text;
  v_slug text;
  v_workspace_id uuid;
begin
  v_provider := public.resolve_auth_provider(new.raw_app_meta_data);

  v_full_name := coalesce(
    nullif(trim(new.raw_user_meta_data->>'full_name'), ''),
    nullif(trim(new.raw_user_meta_data->>'name'), ''),
    nullif(trim(new.raw_user_meta_data->>'display_name'), ''),
    split_part(coalesce(new.email, 'user'), '@', 1)
  );

  v_avatar := coalesce(
    nullif(trim(new.raw_user_meta_data->>'avatar_url'), ''),
    nullif(trim(new.raw_user_meta_data->>'picture'), '')
  );

  v_workspace_name := coalesce(
    nullif(trim(new.raw_user_meta_data->>'workspace_name'), ''),
    v_full_name || '''s workspace'
  );

  insert into public.profiles (id, email, full_name, avatar_url, auth_provider)
  values (
    new.id,
    coalesce(new.email, ''),
    v_full_name,
    v_avatar,
    v_provider
  )
  on conflict (id) do update
    set
      email = excluded.email,
      full_name = case
        when public.profiles.full_name = '' then excluded.full_name
        else public.profiles.full_name
      end,
      avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url),
      auth_provider = excluded.auth_provider,
      updated_at = now();

  -- Skip creating another workspace if this user already owns/memberships one
  if exists (
    select 1 from public.workspace_members m where m.user_id = new.id
  ) then
    return new;
  end if;

  v_slug := public.slugify(v_workspace_name);
  if v_slug = '' then
    v_slug := 'workspace-' || substr(replace(new.id::text, '-', ''), 1, 8);
  end if;
  if exists (select 1 from public.workspaces w where w.slug = v_slug) then
    v_slug := v_slug || '-' || substr(replace(new.id::text, '-', ''), 1, 6);
  end if;

  insert into public.workspaces (name, slug, owner_id)
  values (v_workspace_name, v_slug, new.id)
  returning id into v_workspace_id;

  insert into public.workspace_members (workspace_id, user_id, role)
  values (v_workspace_id, new.id, 'ADMIN');

  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.themes enable row level security;
alter table public.feedback enable row level security;
alter table public.actions enable row level security;
alter table public.events enable row level security;
alter table public.integrations enable row level security;

-- Themes
drop policy if exists "themes_select_member" on public.themes;
create policy "themes_select_member"
  on public.themes for select
  using (public.is_workspace_member(workspace_id));

drop policy if exists "themes_insert_member" on public.themes;
create policy "themes_insert_member"
  on public.themes for insert
  with check (public.is_workspace_member(workspace_id));

drop policy if exists "themes_update_member" on public.themes;
create policy "themes_update_member"
  on public.themes for update
  using (public.is_workspace_member(workspace_id));

drop policy if exists "themes_delete_admin" on public.themes;
create policy "themes_delete_admin"
  on public.themes for delete
  using (public.is_workspace_admin(workspace_id));

-- Feedback
drop policy if exists "feedback_select_member" on public.feedback;
create policy "feedback_select_member"
  on public.feedback for select
  using (public.is_workspace_member(workspace_id));

drop policy if exists "feedback_insert_member" on public.feedback;
create policy "feedback_insert_member"
  on public.feedback for insert
  with check (public.is_workspace_member(workspace_id));

drop policy if exists "feedback_update_member" on public.feedback;
create policy "feedback_update_member"
  on public.feedback for update
  using (public.is_workspace_member(workspace_id));

drop policy if exists "feedback_delete_admin" on public.feedback;
create policy "feedback_delete_admin"
  on public.feedback for delete
  using (public.is_workspace_admin(workspace_id));

-- Actions
drop policy if exists "actions_select_member" on public.actions;
create policy "actions_select_member"
  on public.actions for select
  using (public.is_workspace_member(workspace_id));

drop policy if exists "actions_insert_member" on public.actions;
create policy "actions_insert_member"
  on public.actions for insert
  with check (public.is_workspace_member(workspace_id));

drop policy if exists "actions_update_member" on public.actions;
create policy "actions_update_member"
  on public.actions for update
  using (public.is_workspace_member(workspace_id));

drop policy if exists "actions_delete_admin" on public.actions;
create policy "actions_delete_admin"
  on public.actions for delete
  using (public.is_workspace_admin(workspace_id));

-- Events
drop policy if exists "events_select_member" on public.events;
create policy "events_select_member"
  on public.events for select
  using (public.is_workspace_member(workspace_id));

drop policy if exists "events_insert_member" on public.events;
create policy "events_insert_member"
  on public.events for insert
  with check (public.is_workspace_member(workspace_id));

drop policy if exists "events_update_member" on public.events;
create policy "events_update_member"
  on public.events for update
  using (public.is_workspace_member(workspace_id));

drop policy if exists "events_delete_admin" on public.events;
create policy "events_delete_admin"
  on public.events for delete
  using (public.is_workspace_admin(workspace_id));

-- Integrations
drop policy if exists "integrations_select_member" on public.integrations;
create policy "integrations_select_member"
  on public.integrations for select
  using (public.is_workspace_member(workspace_id));

drop policy if exists "integrations_insert_admin" on public.integrations;
create policy "integrations_insert_admin"
  on public.integrations for insert
  with check (public.is_workspace_admin(workspace_id));

drop policy if exists "integrations_update_admin" on public.integrations;
create policy "integrations_update_admin"
  on public.integrations for update
  using (public.is_workspace_admin(workspace_id));

drop policy if exists "integrations_delete_admin" on public.integrations;
create policy "integrations_delete_admin"
  on public.integrations for delete
  using (public.is_workspace_admin(workspace_id));

-- Teammate profiles
drop policy if exists "profiles_select_teammates" on public.profiles;
create policy "profiles_select_teammates"
  on public.profiles for select
  using (
    exists (
      select 1
      from public.workspace_members mine
      join public.workspace_members theirs
        on theirs.workspace_id = mine.workspace_id
      where mine.user_id = auth.uid()
        and theirs.user_id = profiles.id
    )
  );

-- Workspace bootstrap policies
drop policy if exists "workspaces_insert_own" on public.workspaces;
create policy "workspaces_insert_own"
  on public.workspaces for insert
  with check (auth.uid() = owner_id);

drop policy if exists "workspace_members_insert_self_admin" on public.workspace_members;
create policy "workspace_members_insert_self_admin"
  on public.workspace_members for insert
  with check (
    auth.uid() = user_id
    and role = 'ADMIN'
    and exists (
      select 1 from public.workspaces w
      where w.id = workspace_id and w.owner_id = auth.uid()
    )
  );
