"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";

type Line = { k: "sys" | "agent" | "user" | "call" | "ret" | "ok"; t: string };

const script: Line[] = [
  { k: "sys", t: "call.started  lead=#4821  channel=outbound" },
  { k: "agent", t: "Hi, I'm calling about your CSCS card — have you got a minute?" },
  { k: "user", t: "Yeah, I'm a labourer starting on a new site next week." },
  { k: "call", t: "lookup_product(role=\"labourer\")" },
  { k: "ret", t: "{ card: \"Green Labourer\", price: \"fixed\" }" },
  { k: "agent", t: "The Green Labourer card is the one you need. Shall I set that up?" },
  { k: "call", t: "validate_vat(company_id=\"…\")" },
  { k: "call", t: "create_order(card=\"green_labourer\")" },
  { k: "call", t: "send_payment_link(order_id=\"ORD-2291\")" },
  { k: "ok", t: "call.analyzed  disposition=SALE  summary=stored" },
];

const style: Record<Line["k"], { tag: string; cls: string }> = {
  sys: { tag: "event", cls: "text-muted" },
  agent: { tag: "agent", cls: "text-fg" },
  user: { tag: "caller", cls: "text-fg/70" },
  call: { tag: "tool →", cls: "text-acid" },
  ret: { tag: "← ret", cls: "text-sky-300/80" },
  ok: { tag: "done", cls: "text-acid" },
};

export function AgentTrace() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(
      () => setCount((c) => (c >= script.length + 3 ? 0 : c + 1)),
      count === 0 ? 400 : 900,
    );
    return () => clearTimeout(id);
  }, [inView, count]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-line bg-ink-2/80 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)]"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
        </div>
        <span className="font-mono text-[11px] text-muted">voice-agent · trace</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-acid">
          <span className="size-1.5 animate-pulse-dot rounded-full bg-acid" /> live
        </span>
      </div>
      <div className="h-[340px] space-y-2 overflow-hidden p-5 font-mono text-[12.5px] leading-relaxed">
        <AnimatePresence initial={false}>
          {script.slice(0, count).map((l, i) => (
            <motion.div
              key={`${i}-${l.t}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex gap-3"
            >
              <span className="w-14 shrink-0 text-right text-faint">{style[l.k].tag}</span>
              <span className={style[l.k].cls}>{l.t}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {count <= script.length && (
          <div className="flex gap-3">
            <span className="w-14" />
            <span className="inline-block h-4 w-2 animate-pulse bg-acid/80" />
          </div>
        )}
      </div>
      <div className="border-t border-line px-5 py-3 font-mono text-[10.5px] text-faint">
        Illustrative replay of the AI Voice Sales Agent&apos;s call flow · tool names simplified
      </div>
    </div>
  );
}
