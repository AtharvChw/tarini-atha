import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductCard, { availabilityLabel } from "../components/ProductCard";
import { COLLECTIONS, getByCollection } from "../data/products";
import { track } from "../lib/analytics";

type CollectionProps = {
  fixedSlug?: string;
};

type SortKey = "featured" | "low-high" | "high-low";

const ALL = "all";

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

type FilterSelectProps = {
  id: string;
  label: string;
  value: string;
  options: string[];
  display?: (v: string) => string;
  onChange: (value: string) => void;
};

function FilterSelect({ id, label, value, options, display, onChange }: FilterSelectProps) {
  return (
    <label htmlFor={id} className="flex min-w-[160px] flex-1 flex-col gap-1">
      <span className="kicker">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[44px] border bg-transparent px-3 text-sm"
        style={{ borderColor: "var(--line)" }}
      >
        <option value={ALL}>All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {display ? display(o) : o}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function Collection({ fixedSlug }: CollectionProps) {
  const { slug: paramSlug } = useParams();
  const [searchParams] = useSearchParams();
  const slug = fixedSlug ?? paramSlug ?? "";
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  const base = useMemo(() => getByCollection(slug), [slug]);

  const [weave, setWeave] = useState(ALL);
  const [fabric, setFabric] = useState(ALL);
  const [color, setColor] = useState(ALL);
  const [occasion, setOccasion] = useState(ALL);
  const [availability, setAvailability] = useState(ALL);
  const [sort, setSort] = useState<SortKey>("featured");

  useEffect(() => {
    setWeave(ALL);
    setFabric(ALL);
    setColor(ALL);
    setOccasion(searchParams.get("occasion") ?? ALL);
    setAvailability(ALL);
    setSort("featured");
  }, [slug, searchParams]);

  useEffect(() => {
    if (collection) track("collection_viewed", { collection: slug });
  }, [collection, slug]);

  const weaves = useMemo(() => uniqueSorted(base.map((p) => p.weave)), [base]);
  const fabrics = useMemo(() => uniqueSorted(base.map((p) => p.fabric)), [base]);
  const colors = useMemo(() => uniqueSorted(base.map((p) => p.color)), [base]);
  const occasions = useMemo(() => uniqueSorted(base.flatMap((p) => p.occasions)), [base]);
  const availabilities = useMemo(() => uniqueSorted(base.map((p) => p.availability)), [base]);

  function filterChanged(kind: string, value: string, apply: (v: string) => void): void {
    apply(value);
    track("weave_filter_used", { collection: slug, filter: kind, value });
  }

  const filtered = useMemo(() => {
    const list = base.filter(
      (p) =>
        (weave === ALL || p.weave === weave) &&
        (fabric === ALL || p.fabric === fabric) &&
        (color === ALL || p.color === color) &&
        (occasion === ALL || p.occasions.includes(occasion)) &&
        (availability === ALL || p.availability === availability),
    );
    if (sort === "low-high") return [...list].sort((a, b) => a.priceInr - b.priceInr);
    if (sort === "high-low") return [...list].sort((a, b) => b.priceInr - a.priceInr);
    return list;
  }, [base, weave, fabric, color, occasion, availability, sort]);

  function clearFilters(): void {
    setWeave(ALL);
    setFabric(ALL);
    setColor(ALL);
    setOccasion(ALL);
    setAvailability(ALL);
    setSort("featured");
  }

  if (!collection) {
    return (
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <p className="kicker">Collections</p>
        <h1 className="font-display mt-4 text-4xl font-medium md:text-5xl">Unknown weave</h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed opacity-80">
          This chapter is not on the loom yet.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex min-h-[44px] items-center px-6 py-3 text-[12px] tracking-[0.12em] uppercase"
          style={{ background: "var(--peacock)", color: "#FCF9F3" }}
        >
          Back home
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-6 pt-12 lg:pt-16">
        <p className="kicker">Collections</p>
        <h1 className="font-display mt-4 max-w-2xl text-4xl leading-tight font-medium md:text-5xl">
          {collection.title}
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-80">{collection.intro}</p>
        <p className="font-mono2 mt-4 text-[12px] opacity-60">
          {filtered.length} of {base.length} weaves
        </p>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-8" aria-label="Filters">
        <div className="flex flex-wrap gap-4">
          <FilterSelect
            id="f-weave"
            label="Weave"
            value={weave}
            options={weaves}
            onChange={(v) => filterChanged("weave", v, setWeave)}
          />
          <FilterSelect
            id="f-fabric"
            label="Fabric"
            value={fabric}
            options={fabrics}
            onChange={(v) => filterChanged("fabric", v, setFabric)}
          />
          <FilterSelect
            id="f-color"
            label="Colour"
            value={color}
            options={colors}
            onChange={(v) => filterChanged("color", v, setColor)}
          />
          <FilterSelect
            id="f-occasion"
            label="Occasion"
            value={occasion}
            options={occasions}
            onChange={(v) => filterChanged("occasion", v, setOccasion)}
          />
          <FilterSelect
            id="f-availability"
            label="Availability"
            value={availability}
            options={availabilities}
            display={availabilityLabel}
            onChange={(v) => filterChanged("availability", v, setAvailability)}
          />
          <label htmlFor="f-sort" className="flex min-w-[160px] flex-1 flex-col gap-1">
            <span className="kicker">Sort</span>
            <select
              id="f-sort"
              value={sort}
              onChange={(e) => filterChanged("sort", e.target.value, (v) => setSort(v as SortKey))}
              className="min-h-[44px] border bg-transparent px-3 text-sm"
              style={{ borderColor: "var(--line)" }}
            >
              <option value="featured">Featured</option>
              <option value="low-high">Price · low to high</option>
              <option value="high-low">Price · high to low</option>
            </select>
          </label>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16 lg:pb-24">
        {filtered.length === 0 ? (
          <div className="border px-6 py-12" style={{ borderColor: "var(--line)" }}>
            <p className="font-display text-3xl">No weaves match — clear filters</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 min-h-[44px] px-6 py-3 text-[12px] tracking-[0.12em] uppercase"
              style={{ background: "var(--peacock)", color: "#FCF9F3" }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}