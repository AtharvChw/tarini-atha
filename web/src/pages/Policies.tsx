import { useSeo } from "../lib/seo";

export default function Policies() {
  useSeo(
    "Policies — TĀRINI",
    "TĀRINI shipping, care, and returns — insured dispatch, dry-clean guidance, and made-to-order exchanges."
  );

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-6 pt-12 lg:pt-16">
        <p className="kicker">Care</p>
        <h1 className="font-display mt-4 max-w-2xl text-4xl leading-tight font-medium md:text-5xl">Policies</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-80">
          Plain words on shipping, looking after silk, and what happens if a piece is not right.
        </p>
      </section>
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-3 lg:py-14">
        <article className="border px-6 py-8" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
          <p className="kicker">Shipping</p>
          <h2 className="font-display mt-3 text-2xl">Insured, tracked, unhurried</h2>
          <p className="mt-3 text-[15px] leading-relaxed opacity-80">
            Every saree travels insured with door-to-door tracking across India. In-stock pieces leave the
            atelier within a few working days; made-to-order pieces are loomed for you first, which takes a
            few weeks. We confirm timelines in writing before dispatch, and the saree travels in muslin inside
            a hard case.
          </p>
        </article>
        <article className="border px-6 py-8" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
          <p className="kicker">Care</p>
          <h2 className="font-display mt-3 text-2xl">Keeping silk alive</h2>
          <p className="mt-3 text-[15px] leading-relaxed opacity-80">
            Air each wearing, refold along new lines, and store in washed muslin away from damp, perfume, and
            plastic covers. Dry-clean only and sparingly. If an edge loosens or a thread lifts, stop wearing it
            and write to us first — early repairs at the loom are small; late ones are not.
          </p>
        </article>
        <article className="border px-6 py-8" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
          <p className="kicker">Returns</p>
          <h2 className="font-display mt-3 text-2xl">Exchanges with honesty</h2>
          <p className="mt-3 text-[15px] leading-relaxed opacity-80">
            Unworn in-stock pieces with tags intact may be exchanged within two weeks of delivery — write to us
            and we will arrange the return pickup. Made-to-order pieces are loomed for one owner and cannot be
            restocked, so they are covered instead by our weave warranty: any flaw of loom or material is
            repaired or remade, always.
          </p>
        </article>
      </section>
    </>
  );
}