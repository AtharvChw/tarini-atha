import { useState } from "react";
import { Link } from "react-router-dom";

const COLUMNS: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: "Shop",
    links: [
      { label: "Collections", to: "/collections/archive-01" },
      { label: "Kanjivaram", to: "/kanjivaram" },
      { label: "Organza", to: "/organza" },
    ],
  },
  {
    heading: "House",
    links: [
      { label: "The Weave", to: "/weave" },
      { label: "Journal", to: "/journal" },
      { label: "Stores", to: "/stores" },
    ],
  },
  {
    heading: "Care",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Policies", to: "/policies" },
      { label: "Checkout", to: "/checkout" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <footer className="mt-24 border-t" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[1.2fr_2fr]">
        <div>
          <p className="font-display text-2xl font-semibold tracking-[0.08em]">TĀRINI</p>
          <p className="kicker mt-3">Letters from the loom</p>
          {joined ? (
            <p className="mt-4 text-sm">Welcome to the archive. Your first letter is on its way.</p>
          ) : (
            <form
              className="mt-4 flex max-w-sm gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim().length > 3) setJoined(true);
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full border bg-transparent px-4 py-2 text-sm"
                style={{ borderColor: "var(--line)" }}
              />
              <button
                type="submit"
                className="px-4 py-2 text-[12px] tracking-[0.12em] uppercase"
                style={{ background: "var(--peacock)", color: "#FCF9F3" }}
              >
                Join
              </button>
            </form>
          )}
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="kicker">{col.heading}</p>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t" style={{ borderColor: "var(--line)" }}>
        <p className="font-mono2 mx-auto max-w-7xl px-6 py-5 text-[11px] tracking-wide opacity-70">
          © {new Date().getFullYear()} TĀRINI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
