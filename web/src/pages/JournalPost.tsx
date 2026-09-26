import { Link, useParams } from "react-router-dom";
import { getJournalPost } from "../data/journal";
import { useSeo } from "../lib/seo";

export default function JournalPost() {
  const { slug = "" } = useParams();
  const post = getJournalPost(slug);

  useSeo(
    post ? post.title + " — TĀRINI Journal" : "Note not found — TĀRINI",
    post ? post.excerpt : "This journal note could not be found."
  );

  if (!post) {
    return (
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <p className="kicker">Journal</p>
        <h1 className="font-display mt-4 text-4xl font-medium md:text-5xl">This note is missing</h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed opacity-80">
          The page you asked for is not in the journal.
        </p>
        <Link
          to="/journal"
          className="mt-6 inline-flex min-h-[44px] items-center px-6 py-3 text-[12px] tracking-[0.12em] uppercase"
          style={{ background: "var(--peacock)", color: "#FCF9F3" }}
        >
          Back to journal
        </Link>
      </section>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: "TĀRINI" },
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-3xl px-6 pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-[13px] opacity-75">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/journal" className="hover:underline">Journal</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="opacity-100">{post.title}</li>
        </ol>
      </nav>
      <article className="mx-auto w-full max-w-3xl px-6 py-8 lg:py-12">
        <p className="kicker">Journal</p>
        <h1 className="font-display mt-4 text-4xl leading-tight font-medium md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-[15px] leading-relaxed opacity-75">{post.excerpt}</p>
        <div className="mt-8 space-y-6 text-[16px] leading-relaxed opacity-90">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <Link to="/journal" className="mt-10 inline-flex min-h-[44px] items-center text-[12px] tracking-[0.12em] uppercase opacity-80">
          ← All notes
        </Link>
      </article>
    </>
  );
}