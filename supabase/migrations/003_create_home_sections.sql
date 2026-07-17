-- Create home_sections table for dynamic sections on the home page
-- Supports: pronunciation cards, Facebook video embeds, and custom content
create table if not exists public.home_sections (
  id uuid primary key default gen_random_uuid(),
  section_type text not null check (section_type in ('pronunciation', 'video', 'custom')),
  title text not null check (char_length(title) between 1 and 200),
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Pronunciation items (Japanese text + romaji + meaning + audio)
create table if not exists public.pronunciation_items (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.home_sections(id) on delete cascade,
  japanese_text text not null check (char_length(japanese_text) between 1 and 100),
  romaji text check (char_length(romaji) between 1 and 200),
  meaning text check (char_length(meaning) between 1 and 300),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Video items (Facebook video embed links)
create table if not exists public.video_items (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.home_sections(id) on delete cascade,
  video_url text not null check (char_length(video_url) between 1 and 500),
  video_title text check (char_length(video_title) between 1 and 200),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists home_sections_sort_idx on public.home_sections(sort_order);
create index if not exists pronunciation_items_section_idx on public.pronunciation_items(section_id);
create index if not exists video_items_section_idx on public.video_items(section_id);

-- Enable RLS
alter table public.home_sections enable row level security;
alter table public.pronunciation_items enable row level security;
alter table public.video_items enable row level security;

-- Anyone can view
create policy "Anyone can view home sections" on public.home_sections for select using (is_visible = true);
create policy "Anyone can view pronunciation items" on public.pronunciation_items for select using (true);
create policy "Anyone can view video items" on public.video_items for select using (true);

-- Admin can manage (open for now, add auth later)
create policy "Admin can manage home sections" on public.home_sections for all using (true) with check (true);
create policy "Admin can manage pronunciation items" on public.pronunciation_items for all using (true) with check (true);
create policy "Admin can manage video items" on public.video_items for all using (true) with check (true);
