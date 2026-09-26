import LightTable from "../components/LightTable";
import { useSeo } from "../lib/seo";

export default function Weave() {
  useSeo(
    "The Weave — TĀRINI",
    "Move light across the weave under the macro lens — silk ground, interlock, and zari shimmer."
  );

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-6 pt-12 lg:pt-16">
        <p className="kicker">The Craft</p>
        <h1 className="font-display mt-4 max-w-2xl text-4xl leading-tight font-medium md:text-5xl">
          The Weave, under light
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed opacity-80">
          Real zari is flat ribbon metal wrapped around silk — under the macro lens it behaves like
          architecture, catching light a little differently at every turn. Move your pointer across the
          frame and watch the ground, the interlock, and the shimmer trade places.
        </p>
      </section>
      <section className="mx-auto w-full max-w-3xl px-6 py-10 lg:py-14" aria-label="Interactive weave study">
        <LightTable source="weave-page" />
        <div className="mt-8 space-y-4 text-[15px] leading-relaxed opacity-85">
          <p>
            The left of the frame holds the silk ground — the quiet field everything else is built on. Good
            ground silk is even and calm; it asks for nothing and carries everything.
          </p>
          <p>
            The middle is the interlock, where body meets border on a korvai loom and two shuttles lock
            threads like closing fingers. That tiny ridge is the signature no printed imitation can borrow.
          </p>
        </div>
      </section>
    </>
  );
}