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
  const [coverAnimDone, setCoverAnimDone] = useState(false);

  const handleBookOpen = useCallback(() => {
    // Mount the interior immediately behind the cover
    setStage("reading");

    // Unmount the cover only after its 2s opening animation concludes
    setTimeout(() => {
      setCoverAnimDone(true);
    }, 2000);
  }, []);

  const handleBookClose = useCallback(() => {
    setStage("dark");
    setCoverAnimDone(false);
  }, []);

  return (
    <main
      className={`relative min-h-screen overflow-hidden wand-cursor`}
      style={{ background: "#0a0604" }}
    >
      {/* Hogwarts global background image */}
      <div
        className="fixed inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url(/images/hogwarts-bg.jpg)", zIndex: 0 }}
      />

      {/* Global Vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%)",
          zIndex: 1,
        }}
      />

      {/* Dust particles — always visible */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <DustParticles />
      </div>

      {/* Wand sparkle trail */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <WandCursor enabled={true} />
      </div>

      {/* Lumos flashlight effect */}
      <LumosOverlay enabled={stage === "dark"} />

      {/* Stage 1 & 2: Dark Landing + Book Cover */}
      {!coverAnimDone && (
        <div className="absolute inset-0 z-40">
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
