"use client";

import { useEffect } from "react";
import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -80 }, autoRaf: true }}>
      {children}
    </ReactLenis>
  );
}
