-- Handy queries for managing Loop sign-in / sign-up users.
-- Run in Supabase → SQL Editor (after applying the migration).

-- 1) All app users (email + Google + Microsoft)
select
  id,
  email,
  full_name,
  auth_provider,
  created_at
from public.profiles
order by created_at desc;

-- 2) Counts by auth method
select
  auth_provider,
  count(*) as users
from public.profiles
group by auth_provider
order by users desc;

-- 3) Google users only
select *
from public.profiles
where auth_provider = 'google'
order by created_at desc;

-- 4) Microsoft (Azure) users only
select *
from public.profiles
where auth_provider = 'azure'
order by created_at desc;

-- 5) Email/password users only
select *
from public.profiles
where auth_provider = 'email'
order by created_at desc;

-- 6) Raw auth identities (provider links from Supabase Auth)
select
  i.user_id,
  i.provider,
  i.identity_data->>'email' as provider_email,
  i.identity_data->>'name' as provider_name,
  i.created_at
from auth.identities i
order by i.created_at desc;

-- 7) Users who signed up but have no workspace yet (typical for OAuth)
select
  p.id,
  p.email,
  p.full_name,
  p.auth_provider,
  p.created_at
from public.profiles p
left join public.workspace_members m on m.user_id = p.id
where m.user_id is null
order by p.created_at desc;

-- 8) Workspaces with owner + member count
select
  w.id,
  w.name,
  w.slug,
  p.email as owner_email,
  p.auth_provider as owner_provider,
  (select count(*) from public.workspace_members m where m.workspace_id = w.id) as members,
  w.created_at
from public.workspaces w
join public.profiles p on p.id = w.owner_id
order by w.created_at desc;

-- 9) Find a user by email (auth + profile)
select
  u.id,
  u.email as auth_email,
  u.created_at as auth_created_at,
  u.last_sign_in_at,
  u.raw_app_meta_data->>'provider' as provider,
  p.full_name,
  p.auth_provider
from auth.users u
left join public.profiles p on p.id = u.id
where lower(u.email) = lower('you@company.com');

-- 10) Soft cleanup preview: profiles with empty email (should be rare)
select *
from public.profiles
where email is null or trim(email) = '';
