"use client";

import { useState, useCallback } from "react";
import { WandCursor } from "@/components/magical-book/wand-cursor";
import { LumosOverlay } from "@/components/magical-book/lumos-overlay";
import { DustParticles } from "@/components/magical-book/dust-particles";
import { BookCover } from "@/components/magical-book/book-cover";
import { BookInterior } from "@/components/magical-book/book-interior";

type Stage = "dark" | "opening" | "reading";

export default function SaiWedsSai() {
  const [stage, setStage] = useState<Stage>("dark");
  const [fadeOut, setFadeOut] = useState(false);

  const handleBookOpen = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      setStage("reading");
    }, 800);
  }, []);

  const handleBookClose = useCallback(() => {
    setStage("dark");
    setFadeOut(false);
  }, []);

  return (
    <main
      className={`relative min-h-screen overflow-hidden wand-cursor`}
      style={{ background: "#0a0604" }}
    >
      {/* Dust particles — always visible */}
      <DustParticles />

      {/* Wand sparkle trail */}
      <WandCursor enabled={true} />

      {/* Lumos flashlight effect */}
      <LumosOverlay enabled={stage === "dark"} />

      {/* Stage 1 & 2: Dark Landing + Book Cover */}
      {stage !== "reading" && (
        <div
          className="transition-opacity duration-1000"
          style={{ opacity: fadeOut ? 0 : 1 }}
        >
          <BookCover onOpen={handleBookOpen} />
        </div>
      )}

      {/* Stage 3+: Reading the book */}
      <BookInterior visible={stage === "reading"} onClose={handleBookClose} />

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        {stage === "dark" &&
          "A magical book sits on a dark desk. Move your wand to illuminate it, then tap to open."}
        {stage === "reading" &&
          "The book is open. Navigate through chapters of the love story."}
      </div>
    </main>
  );
}
