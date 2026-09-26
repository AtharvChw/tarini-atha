// TARINI local catalogue (CHUNK-C1). Mirrors supabase/seed.sql.
// Original fictional content. Prices in INR.

export type Collection = {
  slug: string;
  title: string;
  intro: string;
};

export type Product = {
  slug: string;
  name: string;
  priceInr: number;
  compareAtInr?: number;
  fabric: string;
  weave: string;
  color: string;
  occasions: string[];
  collection: string;
  availability: string;
  description: string;
  images: [string, string];
  weaver?: { name: string; village: string; loom: string };
};

export const COLLECTIONS: Collection[] = [
  {
    slug: 'rajya-regal-kanjivaram',
    title: 'Rajya: Regal Kanjivaram',
    intro: 'Temple-border Kanjivarams in mulberry silk and real zari, woven for weddings and ceremony.',
  },
  {
    slug: 'nila-archive-organza',
    title: 'Nila: Archive Organza',
    intro: 'Feather-light organzas from the archive drape book — sheer grounds, moonlit buttas, tissue pallus.',
  },
  {
    slug: 'agni-rekha-heritage',
    title: 'Agni Rekha: Heritage Tussar',
    intro: 'Handloom tussars with flame-stripe pallus and extra-weft spark — the heritage fire line.',
  },
];

const WEAVER_MEENAKSHI = { name: 'Meenakshi K.', village: 'Kanchipuram', loom: 'pit-loom' };
const WEAVER_RAVI = { name: 'Ravi S.', village: 'Kanchipuram', loom: 'frame-loom' };
const WEAVER_LAKSHMI = { name: 'Lakshmi V.', village: 'Arani', loom: 'pit-loom' };
const WEAVER_KARTHIK = { name: 'Karthik R.', village: 'Kumbakonam', loom: 'frame-loom' };

export const PRODUCTS: Product[] = [
  {
    slug: 'rajya-deepam',
    name: 'Rajya Deepam',
    priceInr: 68500,
    compareAtInr: 76000,
    fabric: 'Kanjivaram',
    weave: 'Korvai temple border, real zari',
    color: 'deep maroon',
    occasions: ['wedding', 'ceremonial'],
    collection: 'rajya-regal-kanjivaram',
    availability: 'in-stock',
    description: 'A deep maroon Kanjivaram in mulberry silk, lit by a korvai temple border in real zari. Woven for the wedding morning.',
    images: ['/images/5.jpg', '/images/6.jpg'],
    weaver: WEAVER_MEENAKSHI,
  },
  {
    slug: 'rajya-mayuram',
    name: 'Rajya Mayuram',
    priceInr: 78500,
    fabric: 'Kanjivaram',
    weave: 'Peacock-butta body, contrast pallu',
    color: 'peacock',
    occasions: ['wedding', 'trousseau'],
    collection: 'rajya-regal-kanjivaram',
    availability: 'in-stock',
    description: 'Peacock-blue silk scattered with dancing mayur buttas and a contrast gold pallu. A trousseau centrepiece.',
    images: ['/images/7.jpg', '/images/8.jpg'],
    weaver: WEAVER_RAVI,
  },
  {
    slug: 'rajya-nilavu',
    name: 'Rajya Nilavu',
    priceInr: 54900,
    compareAtInr: 62000,
    fabric: 'Kanjivaram',
    weave: 'Indigo ground, gold checks',
    color: 'indigo',
    occasions: ['festive', 'ceremonial'],
    collection: 'rajya-regal-kanjivaram',
    availability: 'made-to-order',
    description: 'Midnight indigo checks in fine gold zari — moonlight folded into silk. Made to order on the temple loom.',
    images: ['/images/9.jpg', '/images/10.jpg'],
    weaver: WEAVER_LAKSHMI,
  },
  {
    slug: 'rajya-ponni',
    name: 'Rajya Ponni',
    priceInr: 92500,
    fabric: 'Kanjivaram',
    weave: 'Mustard silk, rudraksha border',
    color: 'mustard',
    occasions: ['trousseau', 'wedding'],
    collection: 'rajya-regal-kanjivaram',
    availability: 'made-to-order',
    description: 'Harvest-mustard silk edged with a rudraksha-bead border. Bold, auspicious, unforgettable.',
    images: ['/images/11.jpg', '/images/12.jpg'],
    weaver: WEAVER_KARTHIK,
  },
  {
    slug: 'nila-vaanam',
    name: 'Nila Vaanam',
    priceInr: 24500,
    compareAtInr: 28900,
    fabric: 'Organza',
    weave: 'Sheer ivory drape, zari edge',
    color: 'ivory',
    occasions: ['festive', 'trousseau'],
    collection: 'nila-archive-organza',
    availability: 'in-stock',
    description: 'An ivory organza that floats like sky — a hairline zari edge is its only ornament.',
    images: ['/images/13.jpg', '/images/14.jpg'],
    weaver: WEAVER_MEENAKSHI,
  },
  {
    slug: 'nila-theeram',
    name: 'Nila Theeram',
    priceInr: 27900,
    fabric: 'Organza',
    weave: 'Indigo dip-dye hem, tissue pallu',
    color: 'indigo',
    occasions: ['festive', 'ceremonial'],
    collection: 'nila-archive-organza',
    availability: 'in-stock',
    description: 'Shoreline indigo melting up into clear organza, finished with a tissue pallu that catches the light.',
    images: ['/images/15.jpg', '/images/16.jpg'],
    weaver: WEAVER_RAVI,
  },
  {
    slug: 'nila-megham',
    name: 'Nila Megham',
    priceInr: 31500,
    compareAtInr: 36000,
    fabric: 'Organza',
    weave: 'Peacock-thread jaal, scalloped border',
    color: 'peacock',
    occasions: ['ceremonial', 'trousseau'],
    collection: 'nila-archive-organza',
    availability: 'made-to-order',
    description: 'A cloud of peacock-thread jaal over sheer organza, cut with a scalloped zari border.',
    images: ['/images/17.jpg', '/images/18.jpg'],
    weaver: WEAVER_LAKSHMI,
  },
  {
    slug: 'nila-chandram',
    name: 'Nila Chandram',
    priceInr: 34900,
    fabric: 'Organza',
    weave: 'Oxblood organza, moon-butta weave',
    color: 'oxblood',
    occasions: ['wedding', 'festive'],
    collection: 'nila-archive-organza',
    availability: 'made-to-order',
    description: 'Oxblood organza studded with small moon buttas — night-sky drama for evening weddings.',
    images: ['/images/19.jpg', '/images/20.jpg'],
    weaver: WEAVER_KARTHIK,
  },
  {
    slug: 'agni-rekha',
    name: 'Agni Rekha',
    priceInr: 38500,
    compareAtInr: 44000,
    fabric: 'Tussar',
    weave: 'Handloom tussar, flame-stripe pallu',
    color: 'oxblood',
    occasions: ['festive', 'ceremonial'],
    collection: 'agni-rekha-heritage',
    availability: 'in-stock',
    description: 'The line that named the collection: handloom tussar with a flame-stripe pallu in ember reds.',
    images: ['/images/21.jpg', '/images/22.jpg'],
    weaver: WEAVER_MEENAKSHI,
  },
  {
    slug: 'agni-jwala',
    name: 'Agni Jwala',
    priceInr: 42500,
    fabric: 'Tussar',
    weave: 'Mustard tussar, extra-weft sparks',
    color: 'mustard',
    occasions: ['festive', 'trousseau'],
    collection: 'agni-rekha-heritage',
    availability: 'in-stock',
    description: 'Mustard tussar flecked with extra-weft sparks — a small, joyful fire for festive days.',
    images: ['/images/23.jpg', '/images/24.jpg'],
    weaver: WEAVER_RAVI,
  },
  {
    slug: 'agni-kanavu',
    name: 'Agni Kanavu',
    priceInr: 46500,
    compareAtInr: 52000,
    fabric: 'Tussar',
    weave: 'Deep maroon ground, dream-motif borders',
    color: 'deep maroon',
    occasions: ['ceremonial', 'wedding'],
    collection: 'agni-rekha-heritage',
    availability: 'made-to-order',
    description: 'Deep maroon tussar bordered with dream motifs drawn from temple murals. Slow weave, deep colour.',
    images: ['/images/25.jpg', '/images/26.jpg'],
    weaver: WEAVER_LAKSHMI,
  },
  {
    slug: 'agni-thirai',
    name: 'Agni Thirai',
    priceInr: 185000,
    fabric: 'Tussar',
    weave: 'Flagship bridal tussar-kanjivaram, real zari curtain pallu',
    color: 'ivory',
    occasions: ['wedding', 'trousseau'],
    collection: 'agni-rekha-heritage',
    availability: 'made-to-order',
    description: 'The flagship: ivory tussar married to a Kanjivaram technique, with a real-zari curtain pallu. One heirloom, one bride.',
    images: ['/images/27.jpg', '/images/28.jpg'],
    weaver: WEAVER_KARTHIK,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getByCollection(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.collection === slug);
}

export function searchProducts(q: string): Product[] {
  const needle = q.trim().toLowerCase();
  if (needle.length === 0) return [];
  return PRODUCTS.filter((p) =>
    [p.name, p.fabric, p.weave, p.color, p.collection, p.description, ...p.occasions]
      .join(' ')
      .toLowerCase()
      .includes(needle),
  );
}