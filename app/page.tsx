"use client";

import { useState, useCallback } from "react";
import { WandCursor } from "@/components/magical-book/wand-cursor";
import { LumosOverlay } from "@/components/magical-book/lumos-overlay";
import { DustParticles } from "@/components/magical-book/dust-particles";
import { BookCover } from "@/components/magical-book/book-cover";
import { BookInterior } from "@/components/magical-book/book-interior";

type Stage = "intro" | "dark" | "opening" | "reading";

export default function SaiWedsSai() {
  const [stage, setStage] = useState<Stage>("intro");
  const [introStarted, setIntroStarted] = useState(false);
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
      className={`relative min-h-screen overflow-hidden wand-cursor bg-black`}
    >
      {/* Stage 0: Intro Video */}
      {stage === "intro" && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
          {!introStarted ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
              {/* Magical particles effect on intro screen */}
              <div className="absolute inset-0 pointer-events-none opacity-50">
                <DustParticles />
              </div>
              <h1
                className="font-harry text-5xl md:text-7xl text-[#c9a84c] mb-8 tracking-wider text-center drop-shadow-lg opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
              >
                Sai weds Sai
              </h1>
              <button
                onClick={() => setIntroStarted(true)}
                className="px-8 py-3 rounded-full border border-[rgba(201,168,76,0.5)] bg-[rgba(20,10,5,0.7)] text-[#c9a84c] font-serif tracking-widest text-sm hover:bg-[rgba(201,168,76,0.15)] hover:border-[#c9a84c] hover:scale-105 transition-all duration-300 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "1.5s" }}
              >
                Enter the Magic
              </button>
            </div>
          ) : (
            <>
              <video
                src="/intro/intro.mp4"
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                onEnded={() => setStage("dark")}
              />
              <button
                onClick={() => setStage("dark")}
                className="absolute bottom-8 right-8 z-50 px-6 py-2 rounded-full bg-black/40 text-white/50 hover:text-white/90 hover:bg-black/80 font-serif text-sm backdrop-blur-sm transition-all border border-white/10"
              >
                Skip Intro
              </button>
            </>
          )}
        </div>
      )}

      {/* Main Experience (Stages 1-3) */}
      {stage !== "intro" && (
        <>
          {/* Hogwarts global background image */}
          <div
            className="fixed inset-0 bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: "url(/images/hogwarts-bg.jpg)",
              zIndex: 0,
            }}
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
            <div className="absolute inset-0 z-40 animate-fade-in">
              <BookCover onOpen={handleBookOpen} />
            </div>
          )}

          {/* Stage 3+: Reading the book */}
          <BookInterior
            visible={stage === "reading"}
            onClose={handleBookClose}
          />
        </>
      )}
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
