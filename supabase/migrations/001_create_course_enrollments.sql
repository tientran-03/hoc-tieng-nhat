-- Supabase Auth owns auth.users. These application tables extend it with
-- learner profiles, published courses, and course registrations.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 1 and 100),
  username text unique check (
    username is null or (
      username = lower(username)
      and username ~ '^[a-z0-9_]{3,30}$'
    )
  ),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, username, avatar_url)
  values (
    new.id,
    left(coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(new.email, '@', 1)), 100),
    nullif(lower(new.raw_user_meta_data ->> 'username'), ''),
    nullif(new.raw_user_meta_data ->> 'avatar_url', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]{3,80}$'),
  level text not null check (level in ('N5', 'N4', 'N3', 'N2', 'N1')),
  title text not null check (char_length(title) between 1 and 150),
  description text not null,
  tuition_fee integer not null check (tuition_fee >= 0),
  session_count integer not null check (session_count > 0),
  class_schedule text not null,
  seats_available integer not null check (seats_available >= 0),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete restrict,
  phone text not null check (char_length(phone) between 6 and 30),
  preferred_schedule text not null check (preferred_schedule in ('morning', 'afternoon', 'evening')),
  note text check (note is null or char_length(note) <= 1000),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create index if not exists course_enrollments_user_id_idx on public.course_enrollments(user_id);
create index if not exists course_enrollments_course_id_idx on public.course_enrollments(course_id);

-- The initial course catalogue. `on conflict` makes this safe to rerun.
insert into public.courses (
  slug, level, title, description, tuition_fee, session_count, class_schedule, seats_available, is_published
) values
  ('n5-foundation', 'N5', 'Nền tảng tiếng Nhật', 'Từ con số 0 đến giao tiếp nền tảng vững vàng.', 2490000, 36, 'T2 · T4 · T6', 8, true),
  ('n4-communication', 'N4', 'Giao tiếp N4', 'Mở rộng phản xạ và tự tin trong tình huống hằng ngày.', 2790000, 30, 'T3 · T5 · T7', 5, true),
  ('n3-breakthrough', 'N3', 'Bứt phá N3', 'Rèn kỹ năng thực chiến cho công việc và du học.', 3190000, 32, 'T2 · T5 · CN', 12, true)
on conflict (slug) do update set
  level = excluded.level,
  title = excluded.title,
  description = excluded.description,
  tuition_fee = excluded.tuition_fee,
  session_count = excluded.session_count,
  class_schedule = excluded.class_schedule,
  seats_available = excluded.seats_available,
  is_published = excluded.is_published,
  updated_at = now();

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.course_enrollments enable row level security;

drop policy if exists "Learners can view their own profile" on public.profiles;
create policy "Learners can view their own profile"
  on public.profiles for select to authenticated
  using (auth.uid() = id);

drop policy if exists "Learners can update their own profile" on public.profiles;
create policy "Learners can update their own profile"
  on public.profiles for update to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Anyone can view published courses" on public.courses;
create policy "Anyone can view published courses"
  on public.courses for select
  using (is_published = true);

drop policy if exists "Learners can view their registrations" on public.course_enrollments;
create policy "Learners can view their registrations"
  on public.course_enrollments for select to authenticated
  using (auth.uid() = user_id);
