import { useEffect } from "react";
import { Link } from "react-router-dom";
import { availabilityLabel, formatInr } from "./ProductCard";
import { getProduct } from "../data/products";
import { useShop } from "../store/shop";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  onCartChange?: (count: number) => void;
};

export default function CartDrawer({ open, onClose, onCartChange }: CartDrawerProps) {
  const { cart, updateQty, remove, subtotal, cartCount } = useShop();

  useEffect(() => {
    onCartChange?.(cartCount);
  }, [cartCount, onCartChange]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const lines = cart
    .map((line) => ({ line, product: getProduct(line.slug) }))
    .filter((e): e is { line: (typeof cart)[number]; product: NonNullable<ReturnType<typeof getProduct>> } => e.product !== undefined);

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <button type="button" aria-label="Close bag" onClick={onClose} className="absolute inset-0 cursor-default bg-black/40" />
      <aside
        className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col"
        style={{ background: "var(--surface)" }}
      >
        <div className="flex items-center justify-between border-b px-6 py-5" style={{ borderColor: "var(--line)" }}>
          <p className="font-display text-2xl">Your Bag</p>
          <button type="button" aria-label="Close bag" onClick={onClose} className="flex min-h-[44px] min-w-[44px] items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-4 px-6">
            <p className="kicker">Empty</p>
            <p className="font-display text-2xl">Your bag is still on the loom.</p>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-5 py-2 text-[12px] tracking-[0.12em] uppercase"
              style={{ background: "var(--peacock)", color: "#FCF9F3" }}
            >
              Continue browsing
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-5 overflow-auto px-6 py-6">
              {lines.map(({ line, product }) => (
                <li key={`${line.slug}::${line.variant ?? ""}`} className="flex items-start gap-4">
                  <img
                    src={product.images[0]}
                    alt=""
                    aria-hidden="true"
                    width={160}
                    height={200}
                    className="aspect-[4/5] w-20 shrink-0 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg leading-snug">{product.name}</p>
                    <p className="font-mono2 mt-1 text-[12px] opacity-70">
                      {formatInr(product.priceInr)} · {availabilityLabel(product.availability)}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="flex min-h-[44px] min-w-[44px] items-center justify-center border"
                        style={{ borderColor: "var(--line)" }}
                        onClick={() => updateQty(line.slug, line.qty - 1, line.variant)}
                      >
                        -
                      </button>
                      <span className="font-mono2 text-sm" aria-live="polite">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${product.name}`}
                        className="flex min-h-[44px] min-w-[44px] items-center justify-center border"
                        style={{ borderColor: "var(--line)" }}
                        onClick={() => updateQty(line.slug, line.qty + 1, line.variant)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        aria-label={`Remove ${product.name} from bag`}
                        className="flex min-h-[44px] items-center px-2 text-[12px] tracking-[0.1em] uppercase opacity-70"
                        onClick={() => remove(line.slug, line.variant)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="font-mono2 shrink-0 text-sm">{formatInr(product.priceInr * line.qty)}</p>
                </li>
              ))}
            </ul>
            <div className="border-t px-6 py-5" style={{ borderColor: "var(--line)" }}>
              <div className="flex items-center justify-between">
                <p className="kicker">Subtotal</p>
                <p className="font-mono2 text-sm">{formatInr(subtotal)}</p>
              </div>
              <Link
                to="/checkout"
                onClick={onClose}
                className="mt-4 flex min-h-[44px] w-full items-center justify-center py-3 text-[12px] tracking-[0.12em] uppercase"
                style={{ background: "var(--peacock)", color: "#FCF9F3" }}
              >
                Proceed to checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}