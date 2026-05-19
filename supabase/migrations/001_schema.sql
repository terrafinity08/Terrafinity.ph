-- ============================================================
-- Terrafinity PH — Database Schema
-- Run this in Supabase SQL Editor or via Supabase CLI
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ── CATEGORIES ──────────────────────────────────────────────
create table if not exists categories (
  id           uuid    primary key default gen_random_uuid(),
  name         text    not null,
  slug         text    not null unique,
  description  text,
  image_url    text,
  sort_order   integer default 0,
  created_at   timestamptz default now()
);

-- ── PRODUCTS ────────────────────────────────────────────────
create table if not exists products (
  id                uuid        primary key default gen_random_uuid(),
  name              text        not null,
  slug              text        not null unique,
  description       text,
  short_description text,
  price             numeric(10,2) not null check (price >= 0),
  category_id       uuid        references categories(id) on delete set null,
  image_url         text,
  gallery_images    text[]      default '{}',
  featured          boolean     default false,
  bestseller        boolean     default false,
  new_arrival       boolean     default false,
  stock             integer     default 0 check (stock >= 0),
  care_notes        text,
  dimensions        text,
  weight_grams      integer,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at();

-- ── WORKSHOPS ───────────────────────────────────────────────
create table if not exists workshops (
  id                 uuid          primary key default gen_random_uuid(),
  title              text          not null,
  slug               text          not null unique,
  description        text,
  short_description  text,
  price              numeric(10,2) not null check (price >= 0),
  duration_minutes   integer       default 120,
  max_participants   integer       default 10,
  image_url          text,
  highlights         text[]        default '{}',
  includes           text[]        default '{}',
  active             boolean       default true,
  created_at         timestamptz   default now(),
  updated_at         timestamptz   default now()
);

create trigger workshops_updated_at
  before update on workshops
  for each row execute function update_updated_at();

-- ── WORKSHOP DATES ──────────────────────────────────────────
create table if not exists workshop_dates (
  id              uuid        primary key default gen_random_uuid(),
  workshop_id     uuid        not null references workshops(id) on delete cascade,
  date            date        not null,
  start_time      time        not null default '10:00',
  end_time        time,
  spots_total     integer     not null default 10,
  spots_booked    integer     not null default 0,
  active          boolean     default true,
  created_at      timestamptz default now(),
  check (spots_booked <= spots_total)
);

-- ── WORKSHOP BOOKINGS ───────────────────────────────────────
create table if not exists workshop_bookings (
  id               uuid          primary key default gen_random_uuid(),
  workshop_id      uuid          not null references workshops(id),
  workshop_date_id uuid          references workshop_dates(id),
  customer_name    text          not null,
  customer_email   text          not null,
  customer_phone   text,
  qty              integer       not null default 1 check (qty >= 1),
  total_price      numeric(10,2) not null,
  status           text          not null default 'pending'
                   check (status in ('pending','confirmed','cancelled','completed')),
  notes            text,
  created_at       timestamptz   default now()
);

-- ── FEATURED COLLECTIONS ────────────────────────────────────
create table if not exists featured_products (
  id           uuid        primary key default gen_random_uuid(),
  product_id   uuid        not null references products(id) on delete cascade,
  collection   text        not null default 'homepage',
  sort_order   integer     default 0,
  created_at   timestamptz default now(),
  unique (product_id, collection)
);

-- ── ROW-LEVEL SECURITY ──────────────────────────────────────
alter table categories         enable row level security;
alter table products           enable row level security;
alter table workshops          enable row level security;
alter table workshop_dates     enable row level security;
alter table workshop_bookings  enable row level security;
alter table featured_products  enable row level security;

-- Public read access
create policy "Public read categories"        on categories        for select using (true);
create policy "Public read products"          on products          for select using (true);
create policy "Public read workshops"         on workshops         for select using (true);
create policy "Public read workshop_dates"    on workshop_dates    for select using (true);
create policy "Public read featured_products" on featured_products for select using (true);

-- Bookings: anyone can insert, only service role can update
create policy "Anyone can book"
  on workshop_bookings for insert with check (true);

create policy "Service role full access on bookings"
  on workshop_bookings for all
  using (auth.role() = 'service_role');

-- Admin full access (requires service_role key on server)
create policy "Service role full access on categories"
  on categories for all using (auth.role() = 'service_role');
create policy "Service role full access on products"
  on products for all using (auth.role() = 'service_role');
create policy "Service role full access on workshops"
  on workshops for all using (auth.role() = 'service_role');
create policy "Service role full access on workshop_dates"
  on workshop_dates for all using (auth.role() = 'service_role');
create policy "Service role full access on featured_products"
  on featured_products for all using (auth.role() = 'service_role');

-- ── STORAGE BUCKETS (run separately or via dashboard) ───────
-- insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);
-- insert into storage.buckets (id, name, public) values ('workshop-images', 'workshop-images', true);
-- create policy "Public read product-images" on storage.objects for select using (bucket_id = 'product-images');
-- create policy "Service role upload product-images" on storage.objects for insert with check (bucket_id = 'product-images' and auth.role() = 'service_role');
-- create policy "Public read workshop-images" on storage.objects for select using (bucket_id = 'workshop-images');
-- create policy "Service role upload workshop-images" on storage.objects for insert with check (bucket_id = 'workshop-images' and auth.role() = 'service_role');

-- ── SEED DATA ───────────────────────────────────────────────
insert into categories (name, slug, description, sort_order) values
  ('Geometric', 'geometric', 'Clean lines, modern glass vessels', 1),
  ('Open Terrariums', 'open', 'Breathable open-top designs for succulents and air plants', 2),
  ('Closed Terrariums', 'closed', 'Self-sustaining humid ecosystems under glass', 3),
  ('Moss & Zen', 'moss-zen', 'Japanese wabi-sabi inspired moss gardens', 4),
  ('Miniature Forest', 'forest', 'Lush miniature woodland scenes', 5)
on conflict (slug) do nothing;

insert into products (name, slug, short_description, description, price, featured, bestseller, new_arrival, stock, care_notes) values
  ('Forest Sphere', 'forest-sphere', 'A self-contained forest world in hand-blown glass.', 'Hand-blown borosilicate sphere housing a miniature forest ecosystem. Mosses, ferns, and volcanic stones create a living landscape that requires almost no maintenance.', 3200, true, true, false, 8, 'Indirect light. Mist lightly every 2–3 weeks. Avoid direct sun.'),
  ('Moss Haven', 'moss-haven', 'Ancient moss meets contemporary design.', 'Premium Japanese cushion moss arranged over volcanic stone. The black geometric base contrasts beautifully with the living green canopy. A statement piece for any interior.', 3900, true, false, false, 5, 'Low to medium indirect light. Mist weekly.'),
  ('The Sanctuary', 'the-sanctuary', 'Miniature world, maximum calm.', 'A carefully curated closed terrarium housing tropical ferns, baby selaginella, and a hand-placed driftwood arch. The sealed glass creates its own humid microclimate.', 2450, false, true, false, 12, 'Sealed — no watering needed. Place near (not in) a bright window.'),
  ('Green Capsule', 'green-capsule', 'Modernist geometry meets living art.', 'Elongated capsule terrarium in clear borosilicate glass. Filled with a curated selection of geometric succulents and fine white sand.', 3400, false, false, true, 6, 'Bright indirect light. Water sparingly — once every 2–3 weeks.'),
  ('Desert Dreams', 'desert-dreams', 'Arid beauty under glass.', 'Minimalist desert landscape with rare succulents, smooth river pebbles, and pale sand layers. A serene contrast to lush tropical designs.', 2950, false, false, false, 9, 'Bright light. Water once a month. Drainage layer included.'),
  ('Midnight Garden', 'midnight-garden', 'Drama in a bell jar.', 'Dark volcanic substrate, deep-green selaginella, and black river stones create an intensely atmospheric composition. A collector piece.', 4700, true, false, false, 3, 'Medium indirect light. Mist lightly every 10 days.')
on conflict (slug) do nothing;
