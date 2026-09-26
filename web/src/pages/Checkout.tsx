import { useState } from "react";
import { Link } from "react-router-dom";
import { availabilityLabel, formatInr } from "../components/ProductCard";
import { getProduct } from "../data/products";
import { track } from "../lib/analytics";
import { createCheckoutSession } from "../lib/checkout";
import { useSeo } from "../lib/seo";
import { useShop } from "../store/shop";

export default function Checkout() {
  useSeo("Checkout — TĀRINI", "Review your bag and reserve your pieces. Test checkout — no live charge.");

  const { cart, updateQty, remove, subtotal } = useShop();
  const [notice, setNotice] = useState("");

  const lines = cart
    .map((line) => ({ line, product: getProduct(line.slug) }))
    .filter((e): e is { line: (typeof cart)[number]; product: NonNullable<ReturnType<typeof getProduct>> } => e.product !== undefined);

  function handleReserve(): void {
    const result = createCheckoutSession(cart.map((l) => ({ slug: l.slug, qty: l.qty, variant: l.variant })));
    track("checkout_started", { items: cart.length, subtotal });
    setNotice(result.message);
  }

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-6 pt-12 lg:pt-16">
        <p className="kicker">Checkout</p>
        <h1 className="font-display mt-4 max-w-2xl text-4xl leading-tight font-medium md:text-5xl">Your Bag</h1>
        <p className="mt-4 max-w-xl border px-4 py-3 text-[13px] leading-relaxed" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
          Test checkout — no live charge. Reserving stages your pieces for an enquiry; no payment is processed.
        </p>
      </section>
      <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:py-14">
        {lines.length === 0 ? (
          <div className="border px-6 py-12" style={{ borderColor: "var(--line)" }}>
            <p className="font-display text-3xl">Your bag is still on the loom</p>
            <p className="mt-3 max-w-md text-[15px] opacity-80">Browse the chapters and choose your weave.</p>
            <Link
              to="/"
              className="mt-6 inline-flex min-h-[44px] items-center px-6 py-3 text-[12px] tracking-[0.12em] uppercase"
              style={{ background: "var(--peacock)", color: "#FCF9F3" }}
            >
              Back to the archive
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.65fr_0.35fr]">
            <ul className="divide-y" style={{ borderColor: "var(--line)" }}>
              {lines.map(({ line, product }) => (
                <li key={line.slug + (line.variant ?? "")} className="flex gap-5 py-6">
                  <Link to={"/product/" + product.slug} className="aspect-[4/5] w-24 shrink-0 overflow-hidden" style={{ background: "var(--surface)" }}>
                    <img src={product.images[0]} alt={product.name} loading="lazy" width={192} height={240} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <Link to={"/product/" + product.slug} className="font-display text-xl hover:underline">
                      {product.name}
                    </Link>
                    <p className="mt-1 text-[13px] opacity-70">
                      {product.fabric} · {product.color} · {availabilityLabel(product.availability)}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <label className="flex items-center gap-2 text-sm">
                        <span className="kicker">Qty</span>
                        <select
                          value={line.qty}
                          onChange={(e) => updateQty(line.slug, Number(e.target.value), line.variant)}
                          className="min-h-[44px] border bg-transparent px-2 text-sm"
                          style={{ borderColor: "var(--line)" }}
                          aria-label={"Quantity for " + product.name}
                        >
                          {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </label>
                      <button
                        type="button"
                        onClick={() => remove(line.slug, line.variant)}
                        className="min-h-[44px] text-[12px] tracking-[0.12em] uppercase underline opacity-70"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="font-mono2 text-sm">{formatInr(product.priceInr * line.qty)}</p>
                </li>
              ))}
            </ul>
            <aside className="h-fit border px-6 py-8 lg:sticky lg:top-24" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
              <p className="kicker">Summary</p>
              <div className="mt-4 flex items-baseline justify-between gap-4 border-b pb-3" style={{ borderColor: "var(--line)" }}>
                <span className="text-sm">Subtotal</span>
                <span className="font-mono2">{formatInr(subtotal)}</span>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed opacity-70">
                Shipping and insurance are confirmed with you before anything is charged — and nothing here charges.
              </p>
              <button
                type="button"
                onClick={handleReserve}
                className="mt-6 min-h-[44px] w-full px-6 py-3 text-[12px] tracking-[0.12em] uppercase"
                style={{ background: "var(--peacock)", color: "#FCF9F3" }}
              >
                Reserve / Enquire
              </button>
              {notice ? (
                <p role="status" className="mt-4 text-[13px] leading-relaxed opacity-80">{notice}</p>
              ) : null}
            </aside>
          </div>
        )}
      </section>
    </>
  );
}