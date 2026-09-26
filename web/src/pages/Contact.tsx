import { useState } from "react";
import type { FormEvent } from "react";
import { track } from "../lib/analytics";
import { useSeo } from "../lib/seo";
import { supabase } from "../lib/supabase";

type Status = "idle" | "sending" | "done";

const inputClass = "min-h-[44px] w-full border bg-transparent px-3 py-2 text-sm";

export default function Contact() {
  useSeo(
    "Contact — TĀRINI",
    "Book a private appointment or write to the TĀRINI drape consultants — in store or over video."
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    try {
      if (supabase) {
        await supabase.from("consultations").insert([{ name, email, phone, message }]);
      }
    } catch {
      /* fall through to local success */
    }
    track("consultation_clicked", { source: "contact-form" });
    setStatus("done");
  }

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-6 pt-12 lg:pt-16">
        <p className="kicker">Write to Us</p>
        <h1 className="font-display mt-4 max-w-2xl text-4xl leading-tight font-medium md:text-5xl">Contact</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-80">
          Appointments, enquiries, and slow questions about silk — a consultant replies within two working days.
        </p>
      </section>
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-2 lg:py-14">
        <div>
          {status === "done" ? (
            <div className="border px-6 py-10" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
              <p className="kicker">Received</p>
              <p className="font-display mt-3 text-3xl">We will write back shortly</p>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed opacity-80">
                Thank you, {name || "friend"}. Your appointment request is with our consultants — expect a reply
                within two working days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4" aria-label="Appointment form">
              <label className="flex flex-col gap-1">
                <span className="kicker">Name</span>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  style={{ borderColor: "var(--line)" }}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="kicker">Email</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  style={{ borderColor: "var(--line)" }}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="kicker">Phone</span>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  style={{ borderColor: "var(--line)" }}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="kicker">Message</span>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Which piece, which occasion, which city?"
                  className="w-full border bg-transparent px-3 py-2 text-sm"
                  style={{ borderColor: "var(--line)" }}
                />
              </label>
              <button
                type="submit"
                disabled={status === "sending"}
                className="min-h-[44px] px-6 py-3 text-[12px] tracking-[0.12em] uppercase disabled:opacity-60"
                style={{ background: "var(--peacock)", color: "#FCF9F3" }}
              >
                {status === "sending" ? "Sending…" : "Request appointment"}
              </button>
            </form>
          )}
        </div>
        <aside className="border self-start px-6 py-8" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
          <p className="kicker">Prefer to talk</p>
          <p className="mt-3 text-[15px] leading-relaxed opacity-80">
            Chennai atelier — <a href="tel:+914440001122" className="underline">+91 44 4000 1122</a>
            <br />
            Kanchipuram atelier — <a href="tel:+914440001133" className="underline">+91 44 4000 1133</a>
            <br />
            Tuesday to Sunday, 10am to 7pm.
          </p>
        </aside>
      </section>
    </>
  );
}