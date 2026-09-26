import { Link } from "react-router-dom";
import ProductCard, { availabilityLabel, formatInr } from "../components/ProductCard";
import { COLLECTIONS, PRODUCTS, getByCollection } from "../data/products";
import { track } from "../lib/analytics";

const FALLBACK_IMG = "/images/3.jpg";

const OCCASION_TILES = [
  {
    label: "Wedding",
    note: "Temple borders and real zari for the morning rites.",
    occasion: "wedding",
    collection: "rajya-regal-kanjivaram",
  },
  {
    label: "Festive",
    note: "Sheer grounds and moonlit buttas for evenings of light.",
    occasion: "festive",
    collection: "nila-archive-organza",
  },
  {
    label: "Trousseau",
    note: "Keepsakes chosen once and worn for decades.",
    occasion: "trousseau",
    collection: "agni-rekha-heritage",
  },
];

const ARCHIVE_STATS = [
  {
    stat: "100% handwoven",
    note: "Every yard on a wooden handloom — no power-loom shortcuts.",
  },
  {
    stat: "Real zari tested",
    note: "Metal-wrapped thread, verified before it touches silk.",
  },
  {
    stat: "Made to order",
    note: "Loomed for you when the piece asks for it.",
  },
];

const WEAVERS = [
  { name: "Meenakshi K.", village: "Kanchipuram", loom: "pit-loom" },
  { name: "Ravi S.", village: "Kanchipuram", loom: "frame-loom" },
  { name: "Lakshmi V.", village: "Arani", loom: "pit-loom" },
  { name: "Karthik R.", village: "Kumbakonam", loom: "frame-loom" },
];

function chapterImage(slug: string): string {
  return getByCollection(slug)[0]?.images[0] ?? FALLBACK_IMG;
}

export default function Home() {
  const masterpiece = PRODUCTS.reduce((top, p) => (p.priceInr > top.priceInr ? p : top), PRODUCTS[0]);
  const arrivals = PRODUCTS.slice(0, 4);

  return (
    <>
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-[0.35fr_0.65fr] lg:gap-14 lg:py-20">
        <div>
          <p className="kicker">Archive Nº 01</p>
          <h1 className="font-display mt-4 text-5xl leading-[1.05] font-medium md:text-6xl">
            The Quiet Archive of Handwoven Silk
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed opacity-80">
            Kanjivaram and heritage silks, woven slowly on wooden looms and kept for generations.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/collections/archive-01"
              className="px-6 py-3 text-[12px] tracking-[0.12em] uppercase"
              style={{ background: "var(--peacock)", color: "#FCF9F3" }}
            >
              Enter the Collections
            </Link>
            <Link
              to="/contact"
              className="border px-6 py-3 text-[12px] tracking-[0.12em] uppercase"
              style={{ borderColor: "var(--line)" }}
            >
              Book a Consultation
            </Link>
          </div>
        </div>
        <div className="aspect-[4/5] w-full overflow-hidden lg:max-h-[78vh]">
          <img
            src="/images/4.jpg"
            alt="Handwoven Kanjivaram drape in warm light"
            width={1200}
            height={1500}
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:py-20" aria-labelledby="chapters">
        <div className="max-w-2xl">
          <p className="kicker">Signature Chapters</p>
          <h2 id="chapters" className="font-display mt-4 text-4xl leading-tight font-medium md:text-5xl">
            Three looms, three moods
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-80">
            Each chapter is a small shelf of the archive — one weave family, one set of hands, one way of
            catching the light.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              to={`/collections/${c.slug}`}
              onClick={() => track("collection_viewed", { collection: c.slug, source: "home-chapters" })}
              className="group flex min-h-[44px] flex-col"
            >
              <div className="aspect-[4/5] w-full overflow-hidden" style={{ background: "var(--surface)" }}>
                <img
                  src={chapterImage(c.slug)}
                  alt={c.title}
                  loading="lazy"
                  width={900}
                  height={1125}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="font-display mt-4 text-2xl leading-snug">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-75">{c.intro}</p>
              <span className="mt-3 text-[12px] tracking-[0.12em] uppercase opacity-70">
                Enter the chapter →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="border-t"
        style={{ borderColor: "var(--line)" }}
        aria-labelledby="masterpiece"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 py-14 lg:grid-cols-2 lg:gap-14 lg:py-20">
          <div className="aspect-[4/5] w-full overflow-hidden" style={{ background: "var(--surface)" }}>
            <img
              src={masterpiece.images[0]}
              alt={masterpiece.name}
              loading="lazy"
              width={900}
              height={1125}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="kicker">Featured Masterpiece</p>
            <h2
              id="masterpiece"
              className="font-display mt-4 text-4xl leading-tight font-medium md:text-5xl"
            >
              {masterpiece.name}
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed opacity-80">
              {masterpiece.description}
            </p>
            <dl className="mt-6 w-full max-w-md space-y-3 text-sm">
              <div className="flex items-baseline justify-between gap-6 border-b pb-2" style={{ borderColor: "var(--line)" }}>
                <dt className="kicker">Fabric</dt>
                <dd>{masterpiece.fabric}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-b pb-2" style={{ borderColor: "var(--line)" }}>
                <dt className="kicker">Weave</dt>
                <dd className="text-right">{masterpiece.weave}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-b pb-2" style={{ borderColor: "var(--line)" }}>
                <dt className="kicker">Colour</dt>
                <dd>{masterpiece.color}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-b pb-2" style={{ borderColor: "var(--line)" }}>
                <dt className="kicker">Availability</dt>
                <dd>{availabilityLabel(masterpiece.availability)}</dd>
              </div>
            </dl>
            <p className="font-mono2 mt-6 text-base">{formatInr(masterpiece.priceInr)}</p>
            <Link
              to={`/product/${masterpiece.slug}`}
              className="mt-6 inline-flex min-h-[44px] items-center px-6 py-3 text-[12px] tracking-[0.12em] uppercase"
              style={{ background: "var(--peacock)", color: "#FCF9F3" }}
            >
              View the masterpiece
            </Link>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--peacock)", color: "#FCF9F3" }} aria-labelledby="zari">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:py-20">
          <div className="max-w-2xl">
            <p className="kicker" style={{ color: "#FCF9F3", opacity: 0.75 }}>
              Zari Study
            </p>
            <h2 id="zari" className="font-display mt-4 text-4xl leading-tight font-medium md:text-5xl">
              Gold, drawn to a hairline
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ opacity: 0.88 }}>
              Under the macro lens, real zari stops looking like thread and starts looking like
              architecture — flat ribbons of metal wrapped tight around silk, each turn catching light
              at a slightly different hour. That is why a TĀRINI border seems to move as you do.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ opacity: 0.88 }}>
              Every batch of zari is tested before it is allowed near the loom, and every motif is woven
              in extra weft by hand — never printed, never pasted.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:py-20" aria-labelledby="arrivals">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="kicker">Curated Arrivals</p>
            <h2 id="arrivals" className="font-display mt-4 text-4xl leading-tight font-medium md:text-5xl">
              Fresh off the loom
            </h2>
          </div>
          <Link
            to="/collections/rajya-regal-kanjivaram"
            className="inline-flex min-h-[44px] items-center text-[12px] tracking-[0.12em] uppercase opacity-80"
          >
            View all →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {arrivals.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      <section
        className="border-t"
        style={{ borderColor: "var(--line)" }}
        aria-labelledby="weavers"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 py-14 lg:grid-cols-[0.6fr_0.4fr] lg:gap-14 lg:py-20">
          <div>
            <p className="kicker">Weavers&apos; Archive</p>
            <h2 id="weavers" className="font-display mt-4 text-4xl leading-tight font-medium md:text-5xl">
              Slow cloth, honest hands
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-80">
              Our sarees are woven on wooden handlooms by families who read a draft the way musicians
              read notation — from memory, with improvisation where the pattern allows it. A single
              Kanjivaram can pass through dyeing, warping, weaving, and finishing over weeks before it
              earns the TĀRINI selvedge.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-80">
              We keep the shelf small on purpose: fewer pieces, longer relationships, cloth that
              outlives trends.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="Resident weavers">
              {WEAVERS.map((w) => (
                <li key={w.name} className="border-t pt-3" style={{ borderColor: "var(--line)" }}>
                  <p className="font-display text-lg">{w.name}</p>
                  <p className="mt-1 text-sm opacity-70">
                    {w.village} · {w.loom}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <ul className="flex flex-col justify-center gap-6">
            {ARCHIVE_STATS.map((s) => (
              <li key={s.stat} className="border-b pb-4" style={{ borderColor: "var(--line)" }}>
                <p className="font-display text-2xl">{s.stat}</p>
                <p className="mt-1 text-sm opacity-70">{s.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:py-20" aria-labelledby="occasions">
        <div className="max-w-2xl">
          <p className="kicker">Occasion Editorial</p>
          <h2 id="occasions" className="font-display mt-4 text-4xl leading-tight font-medium md:text-5xl">
            Dress for the hour
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-80">
            Start from the moment, not the mirror — each edit opens the shelf filtered for the occasion.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {OCCASION_TILES.map((t) => (
            <Link
              key={t.label}
              to={`/collections/${t.collection}?occasion=${t.occasion}`}
              className="group flex min-h-[44px] flex-col"
            >
              <div className="aspect-[4/5] w-full overflow-hidden" style={{ background: "var(--surface)" }}>
                <img
                  src={chapterImage(t.collection)}
                  alt={t.label}
                  loading="lazy"
                  width={900}
                  height={1125}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="font-display mt-4 text-2xl leading-snug">{t.label}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-75">{t.note}</p>
              <span className="mt-3 text-[12px] tracking-[0.12em] uppercase opacity-70">
                Shop the edit →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16 lg:pb-24" aria-labelledby="consult">
        <div
          className="border px-6 py-12 lg:px-12"
          style={{ borderColor: "var(--line)", background: "var(--surface)" }}
        >
          <p className="kicker">Private Consultation</p>
          <h2 id="consult" className="font-display mt-4 max-w-xl text-4xl leading-tight font-medium md:text-5xl">
            Not sure which weave is yours?
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-80">
            Sit with our drape consultant — in store or over video — and find the weight, colour, and
            border that belong to your moment.
          </p>
          <Link
            to="/contact"
            onClick={() => track("consultation_clicked", { source: "home-consultation" })}
            className="mt-6 inline-flex min-h-[44px] items-center px-6 py-3 text-[12px] tracking-[0.12em] uppercase"
            style={{ background: "var(--peacock)", color: "#FCF9F3" }}
          >
            Book an appointment
          </Link>
        </div>
      </section>
    </>
  );
}