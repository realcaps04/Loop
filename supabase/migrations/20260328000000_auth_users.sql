-- Loop: user profiles + workspace bootstrap for email / Google / Microsoft (Azure) auth.
-- Run in Supabase SQL Editor, or via `supabase db push`.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type public.auth_provider as enum ('email', 'google', 'azure', 'other');
create type public.member_role as enum ('ADMIN', 'ANALYST', 'VIEWER');

-- ---------------------------------------------------------------------------
-- Profiles (1:1 with auth.users — covers password, Google, and Microsoft)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  avatar_url text,
  auth_provider public.auth_provider not null default 'email',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_email_idx on public.profiles (lower(email));
create index profiles_auth_provider_idx on public.profiles (auth_provider);

-- ---------------------------------------------------------------------------
-- Workspaces + membership (signup can seed a workspace from metadata)
-- ---------------------------------------------------------------------------
create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  owner_id uuid not null references public.profiles (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspace_members (
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role public.member_role not null default 'VIEWER',
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create index workspace_members_user_id_idx on public.workspace_members (user_id);

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger workspaces_set_updated_at
  before update on public.workspaces
  for each row execute function public.set_updated_at();

create or replace function public.slugify(input text)
returns text
language sql
immutable
as $$
  select trim(both '-' from regexp_replace(lower(coalesce(input, '')), '[^a-z0-9]+', '-', 'g'));
$$;

create or replace function public.resolve_auth_provider(meta jsonb)
returns public.auth_provider
language sql
immutable
as $$
  select case lower(coalesce(meta->>'provider', 'email'))
    when 'email' then 'email'::public.auth_provider
    when 'google' then 'google'::public.auth_provider
    when 'azure' then 'azure'::public.auth_provider
    else 'other'::public.auth_provider
  end;
$$;

-- ---------------------------------------------------------------------------
-- Auto-create profile (+ optional workspace) on every new auth user
-- Fires for: email/password signup, Google, Microsoft (Azure)
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

  v_workspace_name := nullif(trim(new.raw_user_meta_data->>'workspace_name'), '');

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

  -- Email signup may include workspace_name; OAuth usually does not.
  if v_workspace_name is not null then
    v_slug := public.slugify(v_workspace_name);
    if v_slug = '' then
      v_slug := 'workspace-' || substr(replace(new.id::text, '-', ''), 1, 8);
    end if;

    -- Ensure unique slug
    if exists (select 1 from public.workspaces w where w.slug = v_slug) then
      v_slug := v_slug || '-' || substr(replace(new.id::text, '-', ''), 1, 6);
    end if;

    insert into public.workspaces (name, slug, owner_id)
    values (v_workspace_name, v_slug, new.id)
    returning id into v_workspace_id;

    insert into public.workspace_members (workspace_id, user_id, role)
    values (v_workspace_id, new.id, 'ADMIN');
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Keep profile email / provider in sync when auth.users changes (e.g. link identity)
create or replace function public.handle_user_updated()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set
    email = coalesce(new.email, email),
    auth_provider = public.resolve_auth_provider(new.raw_app_meta_data),
    full_name = case
      when full_name = '' then coalesce(
        nullif(trim(new.raw_user_meta_data->>'full_name'), ''),
        nullif(trim(new.raw_user_meta_data->>'name'), ''),
        full_name
      )
      else full_name
    end,
    avatar_url = coalesce(
      avatar_url,
      nullif(trim(new.raw_user_meta_data->>'avatar_url'), ''),
      nullif(trim(new.raw_user_meta_data->>'picture'), '')
    ),
    updated_at = now()
  where id = new.id;

  return new;
end;
$$;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update of email, raw_app_meta_data, raw_user_meta_data on auth.users
  for each row execute function public.handle_user_updated();

-- ---------------------------------------------------------------------------
-- Backfill existing auth users (safe to re-run)
-- ---------------------------------------------------------------------------
insert into public.profiles (id, email, full_name, avatar_url, auth_provider)
select
  u.id,
  coalesce(u.email, ''),
  coalesce(
    nullif(trim(u.raw_user_meta_data->>'full_name'), ''),
    nullif(trim(u.raw_user_meta_data->>'name'), ''),
    split_part(coalesce(u.email, 'user'), '@', 1)
  ),
  coalesce(
    nullif(trim(u.raw_user_meta_data->>'avatar_url'), ''),
    nullif(trim(u.raw_user_meta_data->>'picture'), '')
  ),
  public.resolve_auth_provider(u.raw_app_meta_data)
from auth.users u
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "workspace_members_select_own"
  on public.workspace_members for select
  using (auth.uid() = user_id);

create policy "workspaces_select_member"
  on public.workspaces for select
  using (
    exists (
      select 1
      from public.workspace_members m
      where m.workspace_id = workspaces.id
        and m.user_id = auth.uid()
    )
  );

create policy "workspaces_update_admin"
  on public.workspaces for update
  using (
    exists (
      select 1
      from public.workspace_members m
      where m.workspace_id = workspaces.id
        and m.user_id = auth.uid()
        and m.role = 'ADMIN'
    )
  );

-- ---------------------------------------------------------------------------
-- Useful management queries (examples — run as needed in SQL Editor)
-- ---------------------------------------------------------------------------
-- List all signed-up users and how they authenticated:
--   select id, email, full_name, auth_provider, created_at
--   from public.profiles
--   order by created_at desc;
--
-- Users by provider:
--   select auth_provider, count(*) as users
--   from public.profiles
--   group by auth_provider;
--
-- Google / Microsoft only:
--   select * from public.profiles where auth_provider in ('google', 'azure');
--
-- Auth identities (Supabase-managed OAuth links):
--   select user_id, provider, identity_data->>'email' as email, created_at
--   from auth.identities
--   order by created_at desc;
