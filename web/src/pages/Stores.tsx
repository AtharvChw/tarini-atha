import { Link } from "react-router-dom";
import { track } from "../lib/analytics";
import { useSeo } from "../lib/seo";

const STORES = [
  {
    city: "Chennai",
    name: "TĀRINI — Chennai Atelier",
    address: "14, Cathedral Garden Lane, Mylapore, Chennai 600 004",
    phone: "+91 44 4000 1122",
    hours: "Tuesday to Sunday, 10am to 7pm. Mondays by appointment.",
    note: "Two draping rooms, the full Kanjivaram chapter, and hot filter coffee while you decide.",
  },
  {
    city: "Kanchipuram",
    name: "TĀRINI — Kanchipuram Atelier",
    address: "7, Weaver Street, Kanchipuram 631 501",
    phone: "+91 44 4000 1133",
    hours: "Monday to Saturday, 9am to 6pm. Loom visits on request.",
    note: "Next door to our partner looms — watch your border being interlocked, then choose it.",
  },
];

export default function Stores() {
  useSeo(
    "Stores — TĀRINI",
    "Visit the TĀRINI ateliers in Chennai and Kanchipuram — addresses, hours, and private appointments."
  );

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-6 pt-12 lg:pt-16">
        <p className="kicker">Visit</p>
        <h1 className="font-display mt-4 max-w-2xl text-4xl leading-tight font-medium md:text-5xl">Stores</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-80">
          Silk reads differently in person. Come drape, compare, and take your time — the kettle is on.
        </p>
      </section>
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-2 lg:py-14">
        {STORES.map((s) => (
          <article key={s.city} className="border px-6 py-8" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
            <p className="kicker">{s.city}</p>
            <h2 className="font-display mt-3 text-3xl">{s.name}</h2>
            <address className="mt-4 text-[15px] leading-relaxed opacity-80 not-italic">
              {s.address}
              <br />
              <a href={"tel:" + s.phone.replace(/[^+\d]/g, "")} className="underline">{s.phone}</a>
              <br />
              {s.hours}
            </address>
            <p className="mt-4 text-[15px] leading-relaxed opacity-80">{s.note}</p>
            <Link
              to="/contact"
              onClick={() => track("consultation_clicked", { source: "stores-" + s.city.toLowerCase() })}
              className="mt-6 inline-flex min-h-[44px] items-center px-6 py-3 text-[12px] tracking-[0.12em] uppercase"
              style={{ background: "var(--peacock)", color: "#FCF9F3" }}
            >
              Book an appointment
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}