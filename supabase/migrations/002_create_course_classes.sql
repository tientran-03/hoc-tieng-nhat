-- Create course_classes table for individual class instances within courses
create table if not exists public.course_classes (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  class_name text not null check (char_length(class_name) between 1 and 50),
  time_slot text not null check (char_length(time_slot) between 1 and 50),
  start_date text not null check (char_length(start_date) between 1 and 20),
  status text not null default 'Còn chỗ' check (status in ('Còn chỗ', 'Gần hết', 'Hết chỗ')),
  schedule text not null check (char_length(schedule) between 1 and 20),
  session_count integer not null check (session_count > 0),
  location text not null check (char_length(location) between 1 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create indexes for better performance
create index if not exists course_classes_course_id_idx on public.course_classes(course_id);
create index if not exists course_classes_status_idx on public.course_classes(status);

-- Enable RLS
alter table public.course_classes enable row level security;

-- Policy: Anyone can view course classes for published courses
create policy "Anyone can view course classes"
  on public.course_classes for select
  using (
    exists (
      select 1 from public.courses 
      where courses.id = course_classes.course_id 
      and courses.is_published = true
    )
  );

-- Policy: Admin can manage course classes (you may want to add proper admin authentication later)
create policy "Admin can manage course classes"
  on public.course_classes for all
  using (true)
  with check (true);

-- Update courses table to add color field for UI
alter table public.courses 
  add column if not exists color text default 'bg-coral';

-- Update courses table to add icon field for UI
alter table public.courses 
  add column if not exists icon text default '📚';

-- Update existing courses with colors and icons
update public.courses 
set color = 'bg-coral', icon = '🌱'
where level = 'N5';

update public.courses 
set color = 'bg-[#f1a43a]', icon = '🌸'
where level = 'N4';

update public.courses 
set color = 'bg-[#4ba3be]', icon = '🚀'
where level = 'N3';
