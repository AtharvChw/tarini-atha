// Original TĀRINI journal entries. No dates, awards, or third-party claims.
export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: [string, string, string];
};

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "reading-a-korvai-border",
    title: "How to Read a Korvai Border",
    excerpt: "Three joins, one continuous thread — what the interlocked border is telling you.",
    body: [
      "A korvai border is not stitched on afterwards; it is interlocked with the body while both are on the loom. Two shuttles pass at once, and where body meets border the threads lock like fingers closing. Run your fingertip along the join on a TĀRINI Kanjivaram and you will feel a tiny ridge — that ridge is the signature of the technique.",
      "Because the border is woven in, its colours can be completely independent of the body. That is why the classic temple Kanjivaram pairs a deep body with a contrasting gold border: the weaver is working two palettes at the same time, and the join has to hold them both without a pucker. A clean, straight join line tells you the weaver kept equal tension across two different yarn counts.",
      "When you shop, hold the saree to the light and look at the join from the reverse. Neat interlocking with no long floats means the border will sit flat for decades. Loose, trailing threads at the join mean the two shuttles were never truly married — walk past that piece, whatever the price tag says.",
    ],
  },
  {
    slug: "resting-silk-between-wears",
    title: "Resting Silk Between Wears",
    excerpt: "Silk is a fibre that remembers — air, refold, and patience keep it alive.",
    body: [
      "Mulberry silk remembers every fold it is kept in. After a wearing, let the saree breathe on a clean cotton sheet for a day before it goes back into storage, and refold it along different lines than last time. The creases you avoid today are the weak points you never develop.",
      "Zari dislikes perfume, damp, and plastic covers in equal measure. Wrap the saree in washed muslin, keep a sachet of dried neem or cloves nearby rather than naphthalene, and store it flat or loosely rolled instead of pressed under a stack. Weight is what cracks metal-wrapped thread over the years.",
      "Once a season, take the saree out, open it fully in shade, and look at the pallu ends and the first pleat fold — those are the places wear shows first. Caught early, a loosening edge is a small repair at the loom; caught late, it is a restoration. The archive shelf rewards the patient owner.",
    ],
  },
  {
    slug: "why-we-keep-the-shelf-small",
    title: "Why We Keep the Shelf Small",
    excerpt: "Fewer pieces, longer relationships — the thinking behind a twelve-piece archive.",
    body: [
      "A handloom weaves slowly — a fine Kanjivaram can occupy a loom for weeks. If we carried hundreds of designs, most of them would have to come from faster looms, and the archive would stop meaning anything. So we keep the shelf small: a handful of pieces per chapter, each one traceable to a loom, a family, a set of hands.",
      "A small shelf also changes how you choose. Instead of scrolling past forty near-identical reds, you sit with three and notice how one border catches morning light and another holds it. Choosing becomes slower and surer, and the saree that comes home is the one you actually looked at.",
      "And when a piece is made to order, the wait is part of the ownership. Your name goes onto the loom schedule, the warp is dyed for your saree alone, and what arrives is not stock but something begun after you said yes. That is the opposite of fast cloth, and we intend to keep it that way.",
    ],
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return JOURNAL_POSTS.find((p) => p.slug === slug);
}