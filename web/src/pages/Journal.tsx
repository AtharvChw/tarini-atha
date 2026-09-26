import { Link } from "react-router-dom";
import { JOURNAL_POSTS } from "../data/journal";
import { useSeo } from "../lib/seo";

export default function Journal() {
  useSeo(
    "Journal — TĀRINI",
    "Notes from the archive — reading a korvai border, resting silk between wears, and why we keep the shelf small."
  );

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-6 pt-12 lg:pt-16">
        <p className="kicker">Notes</p>
        <h1 className="font-display mt-4 max-w-2xl text-4xl leading-tight font-medium md:text-5xl">Journal</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-80">
          Short notes from the loom and the shelf — written by us, for owners and future owners.
        </p>
      </section>
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3 lg:py-14">
        {JOURNAL_POSTS.map((post, i) => (
          <Link key={post.slug} to={"/journal/" + post.slug} className="group flex min-h-[44px] flex-col">
            <div className="border px-6 py-8 transition-transform duration-500 group-hover:-translate-y-1" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
              <p className="font-mono2 text-[12px] tracking-[0.14em] opacity-60">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="font-display mt-3 text-2xl leading-snug">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed opacity-75">{post.excerpt}</p>
              <span className="mt-4 inline-block text-[12px] tracking-[0.12em] uppercase opacity-70">
                Read the note →
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}