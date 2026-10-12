-- Run this in the Supabase SQL editor before enabling production mode.
create table if not exists public.flyers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null,
  faculty text not null,
  primary_color text not null,
  secondary_color text not null,
  program_type text not null,
  title text not null,
  requirements_heading text not null default 'REQUISITOS DE ADMISION:',
  requirements jsonb not null default '[]'::jsonb,
  image_url text,
  image_zoom numeric not null default 1,
  image_x numeric not null default 50,
  image_y numeric not null default 50,
  overlay numeric not null default 55,
  qr_url text not null default '',
  qr_image text,
  png_path text,
  pdf_path text,
  show_qr boolean not null default true,
  enrollment text not null,
  amount text not null,
  email text not null,
  phone1 text not null,
  phone2 text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.flyers add column if not exists png_path text;
alter table public.flyers add column if not exists pdf_path text;
alter table public.flyers enable row level security;
create policy "Users manage their flyers" on public.flyers for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
create trigger flyers_updated_at before update on public.flyers for each row execute function public.set_updated_at();

-- Create a private bucket named flyer-images in Storage, then run these policies.
create policy "Users upload their flyer images" on storage.objects for insert to authenticated with check (bucket_id = 'flyer-images' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users read their flyer images" on storage.objects for select to authenticated using (bucket_id = 'flyer-images' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users delete their flyer images" on storage.objects for delete to authenticated using (bucket_id = 'flyer-images' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users update their flyer images" on storage.objects for update to authenticated using (bucket_id = 'flyer-images' and auth.uid()::text = (storage.foldername(name))[1]) with check (bucket_id = 'flyer-images' and auth.uid()::text = (storage.foldername(name))[1]);
