"use client"

import { useState } from "react"


interface BookCoverProps {
  onOpen: () => void
}

export function BookCover({ onOpen }: BookCoverProps) {
  const [isOpening, setIsOpening] = useState(false)

  function handleClick() {
    setIsOpening(true)
    setTimeout(() => {
      onOpen()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      {/* Hogwarts background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hogwarts-bg.jpg)" }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* 3D Book Scene */}
      <div
        className={`relative z-30 ${isOpening ? "book-cover-animate" : "gentle-float"}`}
        style={{
          perspective: "1800px",
          transformStyle: "preserve-3d",
        }}
      >
        <button
          onClick={handleClick}
          disabled={isOpening}
          className="relative block focus:outline-none group"
          aria-label="Open the magical book"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(8deg) rotateY(-12deg)",
          }}
        >
          {/* === BOOK THICKNESS: Bottom pages stack === */}
          <div
            className="absolute"
            style={{
              width: "min(1176px, 95vw)",
              height: "min(641px, 82vw)",
              transformStyle: "preserve-3d",
              transform: "translateZ(-30px)",
              borderRadius: "4px 8px 8px 4px",
              background: "linear-gradient(to bottom, #c4a876, #b89860, #a88850, #c4a876)",
              boxShadow: "0 15px 40px rgba(0,0,0,0.7)",
            }}
          />

          {/* === BOOK THICKNESS: Page layers (stacked behind cover) === */}
          {[24, 18, 12, 6].map((z, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: "min(1176px, 95vw)",
                height: "min(641px, 82vw)",
                transform: `translateZ(-${z}px)`,
                borderRadius: "3px 6px 6px 3px",
                background: `linear-gradient(135deg, ${
                  i % 2 === 0 ? "#d4c4a0" : "#c8b890"
                } 0%, ${i % 2 === 0 ? "#c8b488" : "#bca878"} 100%)`,
                boxShadow: i === 3 ? "0 8px 30px rgba(0,0,0,0.5)" : "none",
              }}
            />
          ))}

          {/* === FRONT COVER (the leather face) === */}
          <div
            className="relative"
            style={{
              width: "min(1176px, 95vw)",
              height: "min(641px, 82vw)",
              transformStyle: "preserve-3d",
              transform: "translateZ(0px)",
            }}
          >
            {/* Leather cover surface */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                backgroundImage: "url(/images/sai-weds-sai.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "4px 10px 10px 4px",
                boxShadow:
                  "0 0 40px rgba(0,0,0,0.6), inset 0 0 80px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              {/* Dark leather overlay for depth */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 40% 40%, transparent 30%, rgba(0,0,0,0.25) 100%)",
                }}
              />

              {/* Leather border — outer */}
              <div
                className="absolute inset-4 md:inset-5 border-2 rounded-sm"
                style={{
                  borderColor: "rgba(201, 168, 76, 0.35)",
                  boxShadow: "0 0 8px rgba(201, 168, 76, 0.1)",
                }}
              />

              {/* Leather border — inner */}
              <div
                className="absolute inset-6 md:inset-8 border rounded-sm"
                style={{ borderColor: "rgba(201, 168, 76, 0.18)" }}
              />

              {/* Corner ornaments */}
              {[
                { pos: "top-7 left-7 md:top-9 md:left-9", rot: "" },
                { pos: "top-7 right-7 md:top-9 md:right-9", rot: "rotate-90" },
                { pos: "bottom-7 left-7 md:bottom-9 md:left-9", rot: "-rotate-90" },
                { pos: "bottom-7 right-7 md:bottom-9 md:right-9", rot: "rotate-180" },
              ].map(({ pos, rot }, i) => (
                <div key={i} className={`absolute ${pos} ${rot}`}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path
                      d="M2 2 L2 16 Q2 2 16 2"
                      stroke="rgba(201, 168, 76, 0.45)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2 2 L2 10 Q2 2 10 2"
                      stroke="rgba(201, 168, 76, 0.25)"
                      strokeWidth="1"
                    />
                    <circle cx="3" cy="3" r="1.5" fill="rgba(201, 168, 76, 0.3)" />
                  </svg>
                </div>
              ))}



              {/* Spine shadow (left edge of cover) */}
              <div
                className="absolute top-0 left-0 bottom-0 w-6"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
                }}
              />

              {/* Right edge highlight */}
              <div
                className="absolute top-0 right-0 bottom-0 w-3"
                style={{
                  background:
                    "linear-gradient(to left, rgba(0,0,0,0.15) 0%, transparent 100%)",
                }}
              />

            </div>

            {/* === SPINE (left side 3D face) === */}
            <div
              className="absolute top-0 bottom-0 left-0 origin-left"
              style={{
                width: "30px",
                transform: "translateX(-30px) rotateY(90deg)",
                transformOrigin: "right center",
                background:
                  "linear-gradient(to right, #1a0a02, #2a1508 20%, #3d2010 50%, #2a1508 80%, #1a0a02)",
                boxShadow: "inset 0 0 15px rgba(0,0,0,0.5)",
                borderRadius: "4px 0 0 4px",
              }}
            >
              {/* Spine ridges */}
              {[15, 30, 45, 55, 70, 85].map((pct) => (
                <div
                  key={pct}
                  className="absolute left-0 right-0"
                  style={{
                    top: `${pct}%`,
                    height: "1px",
                    background: "linear-gradient(to right, transparent 10%, rgba(201,168,76,0.2) 30%, rgba(201,168,76,0.3) 50%, rgba(201,168,76,0.2) 70%, transparent 90%)",
                  }}
                />
              ))}
            
            </div>

            {/* === BOTTOM EDGE (page thickness) === */}
            <div
              className="absolute bottom-0 left-0 right-0 origin-bottom"
              style={{
                height: "30px",
                transform: "translateY(30px) rotateX(-90deg)",
                transformOrigin: "top center",
                background:
                  "repeating-linear-gradient(to right, #d4c4a0 0px, #d4c4a0 1px, #c8b488 1px, #c8b488 3px)",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3)",
              }}
            />

            {/* === RIGHT EDGE (page thickness) === */}
            <div
              className="absolute top-0 bottom-0 right-0 origin-right"
              style={{
                width: "30px",
                transform: "translateX(30px) rotateY(90deg)",
                transformOrigin: "left center",
                background:
                  "repeating-linear-gradient(to bottom, #d4c4a0 0px, #d4c4a0 1px, #c8b488 1px, #c8b488 3px)",
                boxShadow: "inset -2px 0 8px rgba(0,0,0,0.3)",
              }}
            />

            {/* === TOP EDGE (page thickness) === */}
            <div
              className="absolute top-0 left-0 right-0 origin-top"
              style={{
                height: "30px",
                transform: "translateY(-30px) rotateX(90deg)",
                transformOrigin: "bottom center",
                background:
                  "repeating-linear-gradient(to right, #c8b488 0px, #c8b488 1px, #bca878 1px, #bca878 3px)",
                boxShadow: "inset 0 -2px 8px rgba(0,0,0,0.2)",
              }}
            />
          </div>

          {/* Ground shadow beneath the book */}
          <div
            className="absolute"
            style={{
              width: "min(1232px, 98vw)",
              height: "60px",
              bottom: "-50px",
              left: "50%",
              transform: "translateX(-50%) rotateX(80deg)",
              background:
                "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
        </button>
      </div>

      {/* Whisper text */}
      <p
        className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-30 font-serif text-sm md:text-base whisper-text text-center"
        style={{ color: "rgba(201, 168, 76, 0.7)" }}
      >
        {"Tap the tome to begin the saga"}
      </p>
    </div>
  )
}
