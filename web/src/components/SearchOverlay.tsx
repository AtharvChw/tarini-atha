import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, searchProducts } from "../data/products";
import { formatInr } from "./ProductCard";

type SearchOverlayProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const POPULAR = ["rajya-deepam", "nila-vaanam", "agni-thirai"];

const RECENT_KEY = "tarini-recent";

function readRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function collectionLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export default function SearchOverlay({ open, onOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
        return;
      }
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA");
      if (e.key === "/" && !typing) {
        e.preventDefault();
        onOpen();
        return;
      }
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpen, onClose]);

  useEffect(() => {
    if (open) {
      setRecent(readRecent());
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const results = useMemo(() => searchProducts(query).slice(0, 6), [query]);

  const popular = useMemo(
    () => POPULAR.map((slug) => PRODUCTS.find((p) => p.slug === slug)).filter((p) => p !== undefined),
    []
  );

  function remember(slug: string) {
    const next = [slug, ...recent.filter((r) => r !== slug)].slice(0, 5);
    setRecent(next);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
    onClose();
  }

  if (!open) return null;

  const trimmed = query.trim();
  const recentProducts = recent
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-24" role="dialog" aria-modal="true" aria-label="Search">
      <button type="button" aria-label="Close search" onClick={onClose} className="absolute inset-0 cursor-default bg-black/40" />
      <div className="relative w-full max-w-xl p-6 shadow-sepia" style={{ background: "var(--surface)" }}>
        <label htmlFor="site-search" className="kicker">
          Search the archive
        </label>
        <input
          id="site-search"
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try &quot;kanjivaram&quot; or &quot;peacock&quot;"
          className="font-display mt-3 w-full border-b bg-transparent pb-2 text-2xl outline-none"
          style={{ borderColor: "var(--line)" }}
        />
        <div className="mt-5 max-h-72 overflow-auto">
          {trimmed === "" ? (
            <>
              {recentProducts.length > 0 ? (
                <>
                  <p className="kicker">Recent</p>
                  <ul className="mt-2 space-y-2">
                    {recentProducts.map((p) => (
                      <li key={p.slug}>
                        <Link to={"/product/" + p.slug} onClick={() => remember(p.slug)} className="text-left text-[15px] hover:underline">
                          {p.name} <span className="opacity-60">· {p.fabric}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              <p className="kicker mt-5">Popular</p>
              <ul className="mt-2 space-y-2">
                {popular.map((p) => (
                  <li key={p.slug}>
                    <Link to={"/product/" + p.slug} onClick={() => remember(p.slug)} className="text-left text-[15px] hover:underline">
                      {p.name} <span className="opacity-60">· {formatInr(p.priceInr)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm opacity-70">Search by name, fabric, weave, collection, or colour.</p>
            </>
          ) : results.length === 0 ? (
            <p className="text-sm opacity-70">Nothing in the archive matches &quot;{trimmed}&quot; yet. Try &quot;silk&quot;, &quot;organza&quot;, or &quot;peacock&quot;.</p>
          ) : (
            <ul className="space-y-1">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={"/product/" + p.slug}
                    onClick={() => remember(p.slug)}
                    className="flex items-baseline justify-between gap-4 py-2 text-left hover:underline"
                  >
                    <span className="text-[15px]">
                      {p.name}
                      <span className="opacity-60"> · {p.fabric} · {p.color} · {collectionLabel(p.collection)}</span>
                    </span>
                    <span className="font-mono2 shrink-0 text-[13px]">{formatInr(p.priceInr)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}