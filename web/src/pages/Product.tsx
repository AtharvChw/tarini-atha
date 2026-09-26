import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LightTable from "../components/LightTable";
import ProductCard, { availabilityLabel, formatInr } from "../components/ProductCard";
import { COLLECTIONS, getByCollection, getProduct } from "../data/products";
import { track } from "../lib/analytics";
import { useSeo } from "../lib/seo";
import { useShop } from "../store/shop";

const QTY_OPTIONS = [1, 2, 3, 4, 5];

function NotFound({ slug }: { slug: string | undefined }) {
  useSeo("Piece not found — TĀRINI", "This archive piece could not be found. Return to the collections.");
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
      <p className="kicker">The Piece</p>
      <h1 className="font-display mt-4 max-w-xl text-4xl leading-tight font-medium md:text-5xl">
        This weave is not on the shelf
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed opacity-80">
        {slug ? "No piece named \u201c" + slug + "\u201d lives in the archive." : "No piece lives at this address."} It may
        have found its home, or the thread may have mistyped.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex min-h-[44px] items-center px-6 py-3 text-[12px] tracking-[0.12em] uppercase"
        style={{ background: "var(--peacock)", color: "#FCF9F3" }}
      >
        Back to the archive
      </Link>
    </section>
  );
}

export default function Product() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const { add } = useShop();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setActive(0);
    setQty(1);
    setAdded(false);
  }, [slug]);

  useEffect(() => {
    if (product) track("product_viewed", { product: product.slug, collection: product.collection });
  }, [product]);

  const gallery = useMemo(() => {
    if (!product) return [];
    const [a, b] = product.images;
    return [
      { src: a, alt: product.name + " — full drape", caption: "Drape" },
      { src: b, alt: product.name + " — detail view", caption: "Detail" },
      { src: a, alt: product.name + " — pallu macro", caption: "Pallu macro" },
      { src: b, alt: product.name + " — border macro", caption: "Border macro" },
    ];
  }, [product]);

  const related = useMemo(() => {
    if (!product) return [];
    return getByCollection(product.collection).filter((p) => p.slug !== product.slug).slice(0, 3);
  }, [product]);

  useSeo(
    product ? product.name + " — TĀRINI" : "Piece not found — TĀRINI",
    product
      ? product.description + " " + product.fabric + ", " + product.weave + ", in " + product.color + "."
      : "This archive piece could not be found."
  );

  if (!product) return <NotFound slug={slug} />;

  const collection = COLLECTIONS.find((c) => c.slug === product.collection);
  const productSlug = product.slug;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    material: product.fabric,
    color: product.color,
    image: gallery.map((g) => g.src),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.priceInr,
      availability:
        product.availability === "in-stock" ? "https://schema.org/InStock" : "https://schema.org/MadeToOrder",
    },
  };

  function handleAdd(): void {
    add(productSlug, qty);
    track("add_to_bag", { product: productSlug, qty });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
  }

  function handleConsult(source: string): void {
    track("consultation_clicked", { source, product: productSlug });
  }

  const showAppointment = product.priceInr > 75000;

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-7xl px-6 pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-[13px] opacity-75">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          {collection ? (
            <>
              <li>
                <Link to={"/collections/" + collection.slug} className="hover:underline">
                  {collection.title}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
            </>
          ) : null}
          <li aria-current="page" className="opacity-100">{product.name}</li>
        </ol>
      </nav>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 py-8 lg:grid-cols-2 lg:gap-14 lg:py-12">
        <div>
          <div className="aspect-[4/5] w-full overflow-hidden" style={{ background: "var(--surface)" }}>
            <img
              src={gallery[active].src}
              alt={gallery[active].alt}
              width={900}
              height={1125}
              loading="eager"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3" role="tablist" aria-label="Product images">
            {gallery.map((g, i) => (
              <button
                key={g.caption}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={"View " + g.caption}
                onClick={() => setActive(i)}
                className="aspect-[4/5] w-full overflow-hidden"
                style={{
                  background: "var(--surface)",
                  outline: active === i ? "2px solid var(--peacock)" : "1px solid var(--line)",
                  outlineOffset: "2px",
                }}
              >
                <img src={g.src} alt="" aria-hidden="true" loading="lazy" width={225} height={281} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <p className="font-mono2 mt-3 text-[12px] opacity-60">{gallery[active].caption}</p>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="kicker">{collection ? collection.title : "The Piece"}</p>
          <h1 className="font-display mt-4 text-4xl leading-tight font-medium md:text-5xl">{product.name}</h1>
          <p className="font-mono2 mt-4 text-lg">
            {formatInr(product.priceInr)}
            {product.compareAtInr ? (
              <span className="ml-3 text-sm opacity-60 line-through">{formatInr(product.compareAtInr)}</span>
            ) : null}
          </p>
          <p className="kicker mt-3">{availabilityLabel(product.availability)}</p>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed opacity-80">{product.description}</p>
          {product.weaver ? (
            <p className="mt-3 max-w-md text-[13px] tracking-wide opacity-70">
              Handwoven by {product.weaver.name} · {product.weaver.village} · {product.weaver.loom}
            </p>
          ) : null}

          <dl className="mt-6 w-full max-w-md space-y-3 text-sm">
            <div className="flex items-baseline justify-between gap-6 border-b pb-2" style={{ borderColor: "var(--line)" }}>
              <dt className="kicker">Fabric</dt>
              <dd>{product.fabric}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-b pb-2" style={{ borderColor: "var(--line)" }}>
              <dt className="kicker">Weave</dt>
              <dd className="text-right">{product.weave}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-b pb-2" style={{ borderColor: "var(--line)" }}>
              <dt className="kicker">Colour</dt>
              <dd>{product.color}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <label htmlFor="pdp-qty" className="flex flex-col gap-1">
              <span className="kicker">Quantity</span>
              <select
                id="pdp-qty"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="min-h-[44px] min-w-[88px] border bg-transparent px-3 text-sm"
                style={{ borderColor: "var(--line)" }}
              >
                {QTY_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={handleAdd}
              className="mt-5 min-h-[44px] flex-1 px-6 py-3 text-[12px] tracking-[0.12em] uppercase"
              style={{ background: "var(--peacock)", color: "#FCF9F3" }}
            >
              {added ? "Added to bag" : "Add to Bag — " + formatInr(product.priceInr * qty)}
            </button>
          </div>
          {product.availability === "made-to-order" ? (
            <p className="mt-4 max-w-md text-[13px] leading-relaxed opacity-70">
              Loomed for you after you order — allow a few weeks on the loom before dispatch.
            </p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:py-14" aria-labelledby="pdp-specs">
        <div className="max-w-2xl">
          <p className="kicker">Silk &amp; Zari</p>
          <h2 id="pdp-specs" className="font-display mt-4 text-3xl leading-tight font-medium md:text-4xl">
            Specifications
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <table className="w-full max-w-md text-sm">
              <tbody>
                {[
                  ["Fabric", product.fabric + " silk"],
                  ["Weave", product.weave],
                  ["Colour", product.color],
                  ["Occasions", product.occasions.join(", ")],
                  ["Availability", availabilityLabel(product.availability)],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b" style={{ borderColor: "var(--line)" }}>
                    <th scope="row" className="kicker py-3 pr-6 text-left align-top">{k}</th>
                    <td className="py-3">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="font-display mt-8 text-2xl">Dimensions &amp; blouse</h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed opacity-80">
              Six yards and a little more, with an attached blouse length woven in the body colour. The fall and
              pico edge are finished by hand before the saree leaves the atelier, so it arrives ready to drape.
            </p>
            <h3 className="font-display mt-8 text-2xl">Care &amp; preservation</h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed opacity-80">
              Air after wearing, refold along new lines, and rest the saree in washed muslin away from damp and
              perfume. Dry-clean only, sparingly, and bring the piece to us first if an edge ever loosens.
            </p>
          </div>
          <div>
            <LightTable source={"product-zari-" + product.slug} />
          </div>
        </div>
      </section>

      <section className="border-t" style={{ borderColor: "var(--line)" }} aria-labelledby="pdp-notes">
        <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:py-14">
          <p className="kicker">Weave Notes</p>
          <h2 id="pdp-notes" className="font-display mt-4 max-w-2xl text-3xl leading-tight font-medium md:text-4xl">
            Notes from the loom
          </h2>
          <div className="mt-6 grid max-w-4xl grid-cols-1 gap-6 text-[15px] leading-relaxed opacity-85 md:grid-cols-1">
            <p>
              The {product.name} begins as an idea about weight — how the {product.color} ground should fall when
              pleated, and how much light the {product.weave.toLowerCase()} work should return. The warp is dyed
              before a single pick is thrown, so the colour you see is dyed through, not printed on.
            </p>
            <p>
              Motifs are counted thread by thread from a draft the weaving family keeps by hand. Nothing is
              transferred or traced; the pattern lives partly on paper and partly in memory, which is why two
              pieces from the same draft are sisters rather than twins.
            </p>
            <p>
              Before the saree earns the TĀRINI selvedge it is washed, stretched, checked join by join, and draped
              once in daylight. If the border does not sit flat or the pallu does not catch the hour it was woven
              for, the piece goes back to the loom — not onto the shelf.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-10 lg:pb-14" aria-label="Delivery and appointment">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="border px-6 py-8" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
            <p className="kicker">Delivery</p>
            <p className="mt-3 text-[15px] leading-relaxed opacity-80">
              Insured dispatch across India with tracking from our door to yours. Need help deciding? Write to us
              and a drape consultant will answer within two working days.
            </p>
            <Link to="/policies" className="mt-4 inline-block text-[12px] tracking-[0.12em] uppercase underline">
              Shipping &amp; returns
            </Link>
          </div>
          {showAppointment ? (
            <div className="border px-6 py-8" style={{ borderColor: "var(--line)" }}>
              <p className="kicker">Private Viewing</p>
              <p className="font-display mt-3 text-2xl">See this piece before you decide</p>
              <p className="mt-3 text-[15px] leading-relaxed opacity-80">
                Heirloom pieces deserve an unhurried look. Book a private appointment — in store or over video —
                and examine the {product.name} fold by fold with our consultant.
              </p>
              <Link
                to="/contact"
                onClick={() => handleConsult("pdp-appointment")}
                className="mt-4 inline-flex min-h-[44px] items-center px-6 py-3 text-[12px] tracking-[0.12em] uppercase"
                style={{ background: "var(--peacock)", color: "#FCF9F3" }}
              >
                Book an appointment
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mx-auto w-full max-w-7xl px-6 pb-16 lg:pb-24" aria-labelledby="pdp-related">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">Related Work</p>
              <h2 id="pdp-related" className="font-display mt-4 text-3xl leading-tight font-medium md:text-4xl">
                From the same chapter
              </h2>
            </div>
            {collection ? (
              <Link to={"/collections/" + collection.slug} className="inline-flex min-h-[44px] items-center text-[12px] tracking-[0.12em] uppercase opacity-80">
                View all →
              </Link>
            ) : null}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t px-4 py-3 md:hidden" style={{ background: "var(--surface)", borderColor: "var(--line)" }}>
        <div className="flex items-center gap-3">
          <p className="font-mono2 flex-1 text-sm">{formatInr(product.priceInr * qty)}</p>
          <button
            type="button"
            onClick={handleAdd}
            className="min-h-[44px] flex-1 px-4 py-3 text-[12px] tracking-[0.12em] uppercase"
            style={{ background: "var(--peacock)", color: "#FCF9F3" }}
          >
            {added ? "Added to bag" : "Add to Bag"}
          </button>
        </div>
      </div>
    </>
  );
}