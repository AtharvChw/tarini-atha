-- TARINI catalogue schema (CHUNK-C1). Original fictional content, INR prices.
-- No secrets in this file. Apply with: supabase db push (or psql < schema.sql)

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- collections
create table if not exists collections (
  slug text primary key,
  title text not null,
  intro text not null default ''
);

-- ---------------------------------------------------------------- categories
create table if not exists categories (
  slug text primary key,
  title text not null
);

-- ---------------------------------------------------------------- occasions
create table if not exists occasions (
  slug text primary key,
  title text not null
);

-- ---------------------------------------------------------------- fabrics
create table if not exists fabrics (
  slug text primary key,
  title text not null
);

-- ---------------------------------------------------------------- products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  price_inr integer not null check (price_inr > 0),
  compare_at_inr integer null check (compare_at_inr is null or compare_at_inr > 0),
  fabric text not null default '',
  weave text not null default '',
  color text not null default '',
  occasion text[] not null default '{}',
  collection text not null default '' references collections (slug),
  availability text not null default 'made-to-order',
  description text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists products_slug_idx on products (slug);
create index if not exists products_collection_idx on products (collection);
create index if not exists products_fabric_idx on products (fabric);
create index if not exists products_color_idx on products (color);

-- ---------------------------------------------------------------- variants
create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  name text not null,
  value text not null
);

create index if not exists product_variants_product_idx on product_variants (product_id);

-- ---------------------------------------------------------------- media
create table if not exists product_media (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  url text not null,
  alt text not null default '',
  kind text not null default 'image'
);

create index if not exists product_media_product_idx on product_media (product_id);

-- ---------------------------------------------------------------- stores
create table if not exists stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null default '',
  address text not null default '',
  phone text not null default ''
);

-- ---------------------------------------------------------------- newsletter
create table if not exists newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- contact
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  email text not null default '',
  phone text not null default '',
  message text not null default '',
  type text not null default 'general',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- RLS
alter table products enable row level security;
alter table product_variants enable row level security;
alter table product_media enable row level security;
alter table categories enable row level security;
alter table collections enable row level security;
alter table occasions enable row level security;
alter table fabrics enable row level security;
alter table stores enable row level security;
alter table newsletter_subscriptions enable row level security;
alter table contact_submissions enable row level security;

-- Public read for catalogue tables
create policy "public read products" on products for select using (true);
create policy "public read product_variants" on product_variants for select using (true);
create policy "public read product_media" on product_media for select using (true);
create policy "public read categories" on categories for select using (true);
create policy "public read collections" on collections for select using (true);
create policy "public read occasions" on occasions for select using (true);
create policy "public read fabrics" on fabrics for select using (true);
create policy "public read stores" on stores for select using (true);

-- Insert-only for newsletter + contact (no public read/update/delete)
create policy "public insert newsletter" on newsletter_subscriptions for insert with check (true);
create policy "public insert contact" on contact_submissions for insert with check (true);