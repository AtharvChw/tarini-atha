-- TARINI seed (CHUNK-C1). All names/copy original fiction. Prices in INR.
-- Run after schema.sql: psql < seed.sql

-- ---------------------------------------------------------------- lookups
insert into collections (slug, title, intro) values
  ('rajya-regal-kanjivaram', 'Rajya: Regal Kanjivaram', 'Temple-border Kanjivarams in mulberry silk and real zari, woven for weddings and ceremony.'),
  ('nila-archive-organza', 'Nila: Archive Organza', 'Feather-light organzas from the archive drape book — sheer grounds, moonlit buttas, tissue pallus.'),
  ('agni-rekha-heritage', 'Agni Rekha: Heritage Tussar', 'Handloom tussars with flame-stripe pallus and extra-weft spark — the heritage fire line.')
on conflict (slug) do update set title = excluded.title, intro = excluded.intro;

insert into fabrics (slug, title) values
  ('kanjivaram', 'Kanjivaram Silk'),
  ('organza', 'Organza'),
  ('tussar', 'Tussar Silk')
on conflict (slug) do nothing;

insert into occasions (slug, title) values
  ('wedding', 'Wedding'),
  ('festive', 'Festive'),
  ('ceremonial', 'Ceremonial'),
  ('trousseau', 'Trousseau')
on conflict (slug) do nothing;

insert into categories (slug, title) values
  ('kanjivaram', 'Kanjivaram'),
  ('organza', 'Organza'),
  ('tussar', 'Tussar'),
  ('bridal', 'Bridal'),
  ('festive', 'Festive')
on conflict (slug) do nothing;

insert into stores (name, city, address, phone) values
  ('Tarini Flagship', 'Chennai', '14 Temple Street, Mylapore, Chennai 600004', '+91 44 4000 1001'),
  ('Tarini Studio', 'Bengaluru', '22 Loom Lane, Indiranagar, Bengaluru 560038', '+91 80 4000 1002')
on conflict do nothing;

-- ---------------------------------------------------------------- products
insert into products (slug, name, price_inr, compare_at_inr, fabric, weave, color, occasion, collection, availability, description) values
  ('rajya-deepam', 'Rajya Deepam', 68500, 76000, 'Kanjivaram', 'Korvai temple border, real zari', 'deep maroon', '{wedding,ceremonial}', 'rajya-regal-kanjivaram', 'in-stock',
   'A deep maroon Kanjivaram in mulberry silk, lit by a korvai temple border in real zari. Woven for the wedding morning.'),
  ('rajya-mayuram', 'Rajya Mayuram', 78500, null, 'Kanjivaram', 'Peacock-butta body, contrast pallu', 'peacock', '{wedding,trousseau}', 'rajya-regal-kanjivaram', 'in-stock',
   'Peacock-blue silk scattered with dancing mayur buttas and a contrast gold pallu. A trousseau centrepiece.'),
  ('rajya-nilavu', 'Rajya Nilavu', 54900, 62000, 'Kanjivaram', 'Indigo ground, gold checks', 'indigo', '{festive,ceremonial}', 'rajya-regal-kanjivaram', 'made-to-order',
   'Midnight indigo checks in fine gold zari — moonlight folded into silk. Made to order on the temple loom.'),
  ('rajya-ponni', 'Rajya Ponni', 92500, null, 'Kanjivaram', 'Mustard silk, rudraksha border', 'mustard', '{trousseau,wedding}', 'rajya-regal-kanjivaram', 'made-to-order',
   'Harvest-mustard silk edged with a rudraksha-bead border. Bold, auspicious, unforgettable.'),
  ('nila-vaanam', 'Nila Vaanam', 24500, 28900, 'Organza', 'Sheer ivory drape, zari edge', 'ivory', '{festive,trousseau}', 'nila-archive-organza', 'in-stock',
   'An ivory organza that floats like sky — a hairline zari edge is its only ornament.'),
  ('nila-theeram', 'Nila Theeram', 27900, null, 'Organza', 'Indigo dip-dye hem, tissue pallu', 'indigo', '{festive,ceremonial}', 'nila-archive-organza', 'in-stock',
   'Shoreline indigo melting up into clear organza, finished with a tissue pallu that catches the light.'),
  ('nila-megham', 'Nila Megham', 31500, 36000, 'Organza', 'Peacock-thread jaal, scalloped border', 'peacock', '{ceremonial,trousseau}', 'nila-archive-organza', 'made-to-order',
   'A cloud of peacock-thread jaal over sheer organza, cut with a scalloped zari border.'),
  ('nila-chandram', 'Nila Chandram', 34900, null, 'Organza', 'Oxblood organza, moon-butta weave', 'oxblood', '{wedding,festive}', 'nila-archive-organza', 'made-to-order',
   'Oxblood organza studded with small moon buttas — night-sky drama for evening weddings.'),
  ('agni-rekha', 'Agni Rekha', 38500, 44000, 'Tussar', 'Handloom tussar, flame-stripe pallu', 'oxblood', '{festive,ceremonial}', 'agni-rekha-heritage', 'in-stock',
   'The line that named the collection: handloom tussar with a flame-stripe pallu in ember reds.'),
  ('agni-jwala', 'Agni Jwala', 42500, null, 'Tussar', 'Mustard tussar, extra-weft sparks', 'mustard', '{festive,trousseau}', 'agni-rekha-heritage', 'in-stock',
   'Mustard tussar flecked with extra-weft sparks — a small, joyful fire for festive days.'),
  ('agni-kanavu', 'Agni Kanavu', 46500, 52000, 'Tussar', 'Deep maroon ground, dream-motif borders', 'deep maroon', '{ceremonial,wedding}', 'agni-rekha-heritage', 'made-to-order',
   'Deep maroon tussar bordered with dream motifs drawn from temple murals. Slow weave, deep colour.'),
  ('agni-thirai', 'Agni Thirai', 185000, null, 'Tussar', 'Flagship bridal tussar-kanjivaram, real zari curtain pallu', 'ivory', '{wedding,trousseau}', 'agni-rekha-heritage', 'made-to-order',
   'The flagship: ivory tussar married to a Kanjivaram technique, with a real-zari curtain pallu. One heirloom, one bride.')
on conflict (slug) do update set
  name = excluded.name, price_inr = excluded.price_inr, compare_at_inr = excluded.compare_at_inr,
  fabric = excluded.fabric, weave = excluded.weave, color = excluded.color, occasion = excluded.occasion,
  collection = excluded.collection, availability = excluded.availability, description = excluded.description;

-- ---------------------------------------------------------------- variants
insert into product_variants (product_id, name, value) values
  ((select id from products where slug = 'rajya-deepam'), 'Blouse', 'Unstitched 1m included'),
  ((select id from products where slug = 'rajya-deepam'), 'Fall', 'Pico edging included'),
  ((select id from products where slug = 'rajya-mayuram'), 'Blouse', 'Unstitched 1m included'),
  ((select id from products where slug = 'rajya-mayuram'), 'Blouse', 'Stitched made-to-order'),
  ((select id from products where slug = 'rajya-nilavu'), 'Blouse', 'Unstitched 1m included'),
  ((select id from products where slug = 'rajya-nilavu'), 'Fall', 'Pico edging included'),
  ((select id from products where slug = 'rajya-ponni'), 'Blouse', 'Unstitched 1m included'),
  ((select id from products where slug = 'rajya-ponni'), 'Blouse', 'Stitched made-to-order'),
  ((select id from products where slug = 'nila-vaanam'), 'Blouse', 'Unstitched 0.8m included'),
  ((select id from products where slug = 'nila-vaanam'), 'Fall', 'Rolled hem included'),
  ((select id from products where slug = 'nila-theeram'), 'Blouse', 'Unstitched 0.8m included'),
  ((select id from products where slug = 'nila-theeram'), 'Fall', 'Rolled hem included'),
  ((select id from products where slug = 'nila-megham'), 'Blouse', 'Unstitched 0.8m included'),
  ((select id from products where slug = 'nila-megham'), 'Blouse', 'Stitched made-to-order'),
  ((select id from products where slug = 'nila-chandram'), 'Blouse', 'Unstitched 0.8m included'),
  ((select id from products where slug = 'nila-chandram'), 'Fall', 'Rolled hem included'),
  ((select id from products where slug = 'agni-rekha'), 'Blouse', 'Unstitched 1m included'),
  ((select id from products where slug = 'agni-rekha'), 'Fall', 'Pico edging included'),
  ((select id from products where slug = 'agni-jwala'), 'Blouse', 'Unstitched 1m included'),
  ((select id from products where slug = 'agni-jwala'), 'Fall', 'Pico edging included'),
  ((select id from products where slug = 'agni-kanavu'), 'Blouse', 'Unstitched 1m included'),
  ((select id from products where slug = 'agni-kanavu'), 'Blouse', 'Stitched made-to-order'),
  ((select id from products where slug = 'agni-thirai'), 'Blouse', 'Stitched made-to-order'),
  ((select id from products where slug = 'agni-thirai'), 'Fall', 'Hand-finished hem included');

-- ---------------------------------------------------------------- media (2 per product)
insert into product_media (product_id, url, alt, kind) values
  ((select id from products where slug = 'rajya-deepam'), 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80&auto=format&fit=crop&crop=top', 'Rajya Deepam drape', 'image'),
  ((select id from products where slug = 'rajya-deepam'), 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80&auto=format&fit=crop&crop=top&sat=-15', 'Rajya Deepam border detail', 'image'),
  ((select id from products where slug = 'rajya-mayuram'), 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80&auto=format&fit=crop&crop=bottom', 'Rajya Mayuram drape', 'image'),
  ((select id from products where slug = 'rajya-mayuram'), 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80&auto=format&fit=crop&crop=bottom&sat=-15', 'Rajya Mayuram pallu detail', 'image'),
  ((select id from products where slug = 'rajya-nilavu'), 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80&auto=format&fit=crop&crop=left', 'Rajya Nilavu drape', 'image'),
  ((select id from products where slug = 'rajya-nilavu'), 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80&auto=format&fit=crop&crop=left&sat=-15', 'Rajya Nilavu checks detail', 'image'),
  ((select id from products where slug = 'rajya-ponni'), 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80&auto=format&fit=crop&crop=right', 'Rajya Ponni drape', 'image'),
  ((select id from products where slug = 'rajya-ponni'), 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80&auto=format&fit=crop&crop=right&sat=-15', 'Rajya Ponni border detail', 'image'),
  ((select id from products where slug = 'nila-vaanam'), 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80&auto=format&fit=crop&crop=faces', 'Nila Vaanam drape', 'image'),
  ((select id from products where slug = 'nila-vaanam'), 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80&auto=format&fit=crop&crop=faces&sat=-15', 'Nila Vaanam edge detail', 'image'),
  ((select id from products where slug = 'nila-theeram'), 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80&auto=format&fit=crop&crop=entropy', 'Nila Theeram drape', 'image'),
  ((select id from products where slug = 'nila-theeram'), 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80&auto=format&fit=crop&crop=entropy&sat=-15', 'Nila Theeram hem detail', 'image'),
  ((select id from products where slug = 'nila-megham'), 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80&auto=format&fit=crop&crop=edges', 'Nila Megham drape', 'image'),
  ((select id from products where slug = 'nila-megham'), 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80&auto=format&fit=crop&crop=edges&sat=-15', 'Nila Megham jaal detail', 'image'),
  ((select id from products where slug = 'nila-chandram'), 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80&auto=format&fit=crop&crop=center', 'Nila Chandram drape', 'image'),
  ((select id from products where slug = 'nila-chandram'), 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80&auto=format&fit=crop&crop=center&sat=-15', 'Nila Chandram butta detail', 'image'),
  ((select id from products where slug = 'agni-rekha'), 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80&auto=format&fit=crop&crop=top&sat=10', 'Agni Rekha drape', 'image'),
  ((select id from products where slug = 'agni-rekha'), 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80&auto=format&fit=crop&crop=focalpoint', 'Agni Rekha pallu detail', 'image'),
  ((select id from products where slug = 'agni-jwala'), 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80&auto=format&fit=crop&crop=bottom&sat=10', 'Agni Jwala drape', 'image'),
  ((select id from products where slug = 'agni-jwala'), 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80&auto=format&fit=crop&crop=top&sat=10', 'Agni Jwala weave detail', 'image'),
  ((select id from products where slug = 'agni-kanavu'), 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80&auto=format&fit=crop&crop=left&sat=10', 'Agni Kanavu drape', 'image'),
  ((select id from products where slug = 'agni-kanavu'), 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80&auto=format&fit=crop&crop=bottom&sat=10', 'Agni Kanavu border detail', 'image'),
  ((select id from products where slug = 'agni-thirai'), 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80&auto=format&fit=crop&crop=right&sat=10', 'Agni Thirai drape', 'image'),
  ((select id from products where slug = 'agni-thirai'), 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80&auto=format&fit=crop&crop=left&sat=10', 'Agni Thirai pallu detail', 'image');