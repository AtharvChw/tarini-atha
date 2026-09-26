import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { track } from "../lib/analytics";

const MACROS = [
  {
    src: "/images/0.jpg",
    alt: "Silk ground under raking light",
    caption: "Silk ground",
  },
  {
    src: "/images/1.jpg",
    alt: "Interlocked weave structure in close-up",
    caption: "Interlock",
  },
  {
    src: "/images/2.jpg",
    alt: "Zari threads catching direct light",
    caption: "Zari shimmer",
  },
];

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

type LightTableProps = {
  source?: string;
  images?: { src: string; alt: string; caption: string }[];
};

export default function LightTable({ source = "light-table", images = MACROS }: LightTableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0.5);
  const [interacted, setInteracted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function handleMove(e: PointerEvent<HTMLDivElement>): void {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const nx = clamp01((e.clientX - rect.left) / rect.width);
    const ny = clamp01((e.clientY - rect.top) / rect.height);
    el.style.setProperty("--lx", (nx * 100).toFixed(1) + "%");
    el.style.setProperty("--ly", (ny * 100).toFixed(1) + "%");
    setX(nx);
    if (!interacted) {
      setInteracted(true);
      track("macro_detail_opened", { source });
    }
  }

  const [base, mid, top] = images;

  if (reduced || images.length < 3) {
    return (
      <figure>
        <div className="aspect-[16/10] w-full overflow-hidden" style={{ background: "var(--surface)" }}>
          <img src={mid.src} alt={mid.alt} loading="lazy" width={1200} height={750} className="h-full w-full object-cover" />
        </div>
        <figcaption className="mt-3 text-[13px] opacity-70">
          Weave detail — {mid.caption}. Motion is paused because reduced motion is on.
        </figcaption>
      </figure>
    );
  }

  const midOpacity = clamp01(1 - Math.abs(x - 0.5) * 2);
  const topOpacity = clamp01((x - 0.35) * 1.8);

  return (
    <figure>
      <div
        ref={ref}
        onPointerMove={handleMove}
        className="relative aspect-[16/10] w-full cursor-ew-resize touch-pan-y overflow-hidden"
        style={{ background: "var(--surface)", ["--lx" as string]: "50%", ["--ly" as string]: "40%" }}
        role="img"
        aria-label="Interactive weave study. Move your pointer across to move light over the zari."
      >
        <img
          src={base.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1200}
          height={750}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <img
          src={mid.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1200}
          height={750}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: midOpacity }}
          draggable={false}
        />
        <img
          src={top.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1200}
          height={750}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: topOpacity }}
          draggable={false}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle 220px at var(--lx, 50%) var(--ly, 40%), rgba(255,248,225,0.5), rgba(255,248,225,0) 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-px"
          style={{ left: "var(--lx, 50%)", background: "rgba(255,248,225,0.8)" }}
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-[13px] opacity-70">
        <span>Move light across the weave — zari shimmer</span>
        <span className="font-mono2 text-[12px]">
          {x < 0.33 ? base.caption : x < 0.66 ? mid.caption : top.caption}
        </span>
      </figcaption>
    </figure>
  );
}