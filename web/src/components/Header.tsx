import { useState } from "react";
import { Link } from "react-router-dom";

export type Theme = "day" | "dusk";

type HeaderProps = {
  cartCount: number;
  theme: Theme;
  onSearchOpen: () => void;
  onCartOpen: () => void;
  onToggleTheme: () => void;
};

const MEGA_GROUPS: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: "Signature",
    links: [
      { label: "The Temple Edit", to: "/collections/temple-edit" },
      { label: "Heirloom Revival", to: "/collections/heirloom-revival" },
    ],
  },
  {
    heading: "By Weave",
    links: [
      { label: "Kanjivaram", to: "/kanjivaram" },
      { label: "Organza", to: "/organza" },
    ],
  },
  {
    heading: "By Occasion",
    links: [
      { label: "Bridal", to: "/collections/bridal" },
      { label: "Festive", to: "/collections/festive" },
    ],
  },
  {
    heading: "New",
    links: [
      { label: "Latest Arrivals", to: "/collections/latest" },
      { label: "Archive Nº 01", to: "/collections/archive-01" },
    ],
  },
];

const NAV_LINKS = [
  { label: "Kanjivaram", to: "/kanjivaram" },
  { label: "Organza", to: "/organza" },
  { label: "The Weave", to: "/weave" },
  { label: "Journal", to: "/journal" },
];

export default function Header({ cartCount, theme, onSearchOpen, onCartOpen, onToggleTheme }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{ background: "var(--paper)", borderColor: "var(--line)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="font-display text-2xl font-semibold tracking-[0.08em]" aria-label="TĀRINI home">
          TĀRINI
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              type="button"
              aria-expanded={megaOpen}
              aria-haspopup="true"
              onFocus={() => setMegaOpen(true)}
              onBlur={() => setMegaOpen(false)}
              onClick={() => setMegaOpen((v) => !v)}
              className="text-[13px] tracking-[0.12em] uppercase"
            >
              Collections
            </button>
            {megaOpen && (
              <div
                className="absolute top-full left-1/2 w-[36rem] -translate-x-1/2 pt-4"
                onFocus={() => setMegaOpen(true)}
                onBlur={() => setMegaOpen(false)}
              >
                <div
                  className="grid grid-cols-4 gap-6 p-8 shadow-sepia"
                  style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
                >
                  {MEGA_GROUPS.map((group) => (
                    <div key={group.heading}>
                      <p className="kicker">{group.heading}</p>
                      <ul className="mt-3 space-y-2">
                        {group.links.map((link) => (
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
            )}
          </div>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.to} className="text-[13px] tracking-[0.12em] uppercase">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-pressed={theme === "dusk"}
            aria-label={theme === "day" ? "Switch to dusk theme" : "Switch to day theme"}
            className="font-mono2 rounded-full border px-3 py-1 text-[11px] tracking-[0.12em]"
            style={{ borderColor: "var(--line)" }}
          >
            {theme === "day" ? "DUSK" : "DAY"}
          </button>
          <button type="button" onClick={onSearchOpen} aria-label="Search" className="p-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
          </button>
          <Link to="/contact" aria-label="Account" className="p-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" />
            </svg>
          </Link>
          <button type="button" onClick={onCartOpen} aria-label={`Bag, ${cartCount} items`} className="relative p-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 8h15l-1.5 12h-12L6 8z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {cartCount > 0 && (
              <span
                className="font-mono2 absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px]"
                style={{ background: "var(--oxblood)", color: "var(--ivory)" }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="p-2 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col px-8 py-6 lg:hidden"
          style={{ background: "var(--paper)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl font-semibold tracking-[0.08em]">TĀRINI</span>
            <button type="button" aria-label="Close menu" className="p-2" onClick={() => setMobileOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-6" aria-label="Mobile">
            <Link to="/collections/archive-01" onClick={() => setMobileOpen(false)} className="font-display text-3xl">
              Collections
            </Link>
            {NAV_LINKS.map((link) => (
              <Link key={link.label} to={link.to} onClick={() => setMobileOpen(false)} className="font-display text-3xl">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="kicker mt-auto">Chennai · Kanchipuram</p>
        </div>
      )}
    </header>
  );
}
