-- ArtStudio — early access waitlist
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).
-- Safe to re-run (all statements are idempotent).

-- 1. Table -------------------------------------------------------------------
create table if not exists public.early_access (
  id          bigint generated always as identity primary key,
  email       text        not null unique,
  created_at  timestamptz not null default now()
);

comment on table public.early_access is 'Early-access signups collected from the landing page.';

-- 2. Row Level Security -------------------------------------------------------
-- RLS is ON with NO policies, so anonymous / authenticated clients cannot read
-- or write this table directly. Writes happen only from the Next.js route
-- handler, which uses the service_role key (which bypasses RLS).
alter table public.early_access enable row level security;

-- 3. Index --------------------------------------------------------------------
create index if not exists early_access_created_at_idx
  on public.early_access (created_at desc);

-- (Optional) view recent signups:
-- select email, created_at from public.early_access order by created_at desc limit 50;
