-- Feedback detail: notes, activity, assignee, customer email
-- Safe to re-run.

alter table public.feedback
  add column if not exists customer_email text not null default '';

alter table public.feedback
  add column if not exists assignee_id uuid references public.profiles (id) on delete set null;

create index if not exists feedback_assignee_id_idx on public.feedback (assignee_id);

-- ---------------------------------------------------------------------------
-- Notes on feedback
-- ---------------------------------------------------------------------------
create table if not exists public.feedback_notes (
  id uuid primary key default gen_random_uuid(),
  feedback_id uuid not null references public.feedback (id) on delete cascade,
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists feedback_notes_feedback_id_idx
  on public.feedback_notes (feedback_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Activity log
-- ---------------------------------------------------------------------------
create table if not exists public.feedback_activity (
  id uuid primary key default gen_random_uuid(),
  feedback_id uuid not null references public.feedback (id) on delete cascade,
  workspace_id uuid not null references public.workspaces (id) on delete cascade,
  actor_id uuid references public.profiles (id) on delete set null,
  action text not null,
  detail text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists feedback_activity_feedback_id_idx
  on public.feedback_activity (feedback_id, created_at desc);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.feedback_notes enable row level security;
alter table public.feedback_activity enable row level security;

drop policy if exists "feedback_notes_select_member" on public.feedback_notes;
create policy "feedback_notes_select_member"
  on public.feedback_notes for select
  using (public.is_workspace_member(workspace_id));

drop policy if exists "feedback_notes_insert_member" on public.feedback_notes;
create policy "feedback_notes_insert_member"
  on public.feedback_notes for insert
  with check (
    public.is_workspace_member(workspace_id)
    and auth.uid() = author_id
  );

drop policy if exists "feedback_notes_delete_own" on public.feedback_notes;
create policy "feedback_notes_delete_own"
  on public.feedback_notes for delete
  using (auth.uid() = author_id or public.is_workspace_admin(workspace_id));

drop policy if exists "feedback_activity_select_member" on public.feedback_activity;
create policy "feedback_activity_select_member"
  on public.feedback_activity for select
  using (public.is_workspace_member(workspace_id));

drop policy if exists "feedback_activity_insert_member" on public.feedback_activity;
create policy "feedback_activity_insert_member"
  on public.feedback_activity for insert
  with check (public.is_workspace_member(workspace_id));

-- Log status changes automatically
create or replace function public.log_feedback_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' and old.status is distinct from new.status then
    insert into public.feedback_activity (
      feedback_id, workspace_id, actor_id, action, detail
    ) values (
      new.id,
      new.workspace_id,
      auth.uid(),
      'status_changed',
      'changed status to ' || new.status::text
    );
  end if;
  return new;
end;
$$;

drop trigger if exists feedback_status_activity on public.feedback;
create trigger feedback_status_activity
  after update of status on public.feedback
  for each row execute function public.log_feedback_status_change();
