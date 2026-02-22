"use client";

import { useEffect, useRef } from "react";

interface LumosOverlayProps {
  enabled: boolean;
}

export function LumosOverlay({ enabled }: LumosOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    function handleMove(e: MouseEvent) {
      overlay!.style.setProperty("--mouse-x", `${e.clientX}px`);
      overlay!.style.setProperty("--mouse-y", `${e.clientY}px`);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={overlayRef}
      className="lumos-overlay"
      style={{
        ["--mouse-x" as string]: "50%",
        ["--mouse-y" as string]: "50%",
      }}
    />
  );
}
