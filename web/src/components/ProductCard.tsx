import { Link } from "react-router-dom";
import { useShop } from "../store/shop";
import type { Product } from "../data/products";

export function formatInr(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function availabilityLabel(value: string): string {
  if (value === "in-stock") return "In stock";
  if (value === "made-to-order") return "Made to order";
  return value
    .split("-")
    .map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

type ProductCardProps = {
  product: Product;
  index: number;
};

export default function ProductCard({ product, index }: ProductCardProps) {
  const { toggleWish, isWished } = useShop();
  const wished = isWished(product.slug);
  const code = String(index + 1).padStart(2, "0");
  const [primary, secondary] = product.images;

  return (
    <article className="group flex flex-col">
      <div className="flex items-center justify-between">
        <span className="font-mono2 text-[12px] tracking-[0.14em] opacity-60">{code}</span>
        <button
          type="button"
          onClick={() => toggleWish(product.slug)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="flex min-h-[44px] min-w-[44px] items-center justify-end"
          style={wished ? { color: "var(--oxblood)" } : undefined}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={wished ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M12 20.5C7 16.5 3.5 13.3 3.5 9.6 3.5 7 5.5 5 8 5c1.6 0 3.1.8 4 2.1C12.9 5.8 14.4 5 16 5c2.5 0 4.5 2 4.5 4.6 0 3.7-3.5 6.9-8.5 10.9z" />
          </svg>
        </button>
      </div>
      <Link to={`/product/${product.slug}`} className="mt-1 flex flex-col" aria-label={product.name}>
        <div className="relative aspect-[4/5] w-full overflow-hidden" style={{ background: "var(--surface)" }}>
          <img
            src={primary}
            alt={product.name}
            loading="lazy"
            width={900}
            height={1125}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {secondary ? (
            <img
              src={secondary}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={900}
              height={1125}
              className="absolute inset-0 hidden h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block"
            />
          ) : null}
        </div>
        <h3 className="font-display mt-4 text-xl leading-snug">{product.name}</h3>
        <p className="mt-1 text-[13px] opacity-70">
          {product.fabric} · {product.color}
        </p>
        <p className="font-mono2 mt-2 text-sm">
          {formatInr(product.priceInr)}
          {product.compareAtInr ? (
            <span className="ml-2 opacity-60 line-through">{formatInr(product.compareAtInr)}</span>
          ) : null}
        </p>
        <p className="kicker mt-2">{availabilityLabel(product.availability)}</p>
      </Link>
    </article>
  );
}