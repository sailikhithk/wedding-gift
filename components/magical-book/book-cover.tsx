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
      {/* Desk background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/desk-scene.jpg)" }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* The Book */}
      <div
        className={`relative z-30 ${isOpening ? "book-cover-animate" : "gentle-float"}`}
        style={{ perspective: "1200px" }}
      >
        <button
          onClick={handleClick}
          disabled={isOpening}
          className="relative block focus:outline-none group"
          aria-label="Open the magical book"
        >
          {/* Book body */}
          <div
            className="relative overflow-hidden"
            style={{
              width: "min(400px, 80vw)",
              height: "min(540px, 70vh)",
              backgroundImage: "url(/images/leather.jpg)",
              backgroundSize: "cover",
              borderRadius: "4px 12px 12px 4px",
              boxShadow:
                "0 0 30px rgba(0,0,0,0.8), inset 0 0 60px rgba(0,0,0,0.4), -4px 0 8px rgba(0,0,0,0.6)",
            }}
          >
            {/* Leather border effect */}
            <div
              className="absolute inset-3 border-2 rounded-sm"
              style={{ borderColor: "rgba(201, 168, 76, 0.3)" }}
            />

            {/* Inner border */}
            <div
              className="absolute inset-5 border rounded-sm"
              style={{ borderColor: "rgba(201, 168, 76, 0.15)" }}
            />

            {/* Corner ornaments */}
            {[
              "top-6 left-6",
              "top-6 right-6 rotate-90",
              "bottom-6 left-6 -rotate-90",
              "bottom-6 right-6 rotate-180",
            ].map((pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} text-gold/40`}
                style={{ fontSize: "24px" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M2 2 L2 12 Q2 2 12 2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M2 2 L2 8 Q2 2 8 2"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.5"
                  />
                </svg>
              </div>
            ))}

            {/* Title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
              {/* Decorative line top */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-gold/40" />
                <svg className="text-gold/50" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" fill="currentColor" />
                </svg>
                <div className="h-px w-12 bg-gold/40" />
              </div>

              <h1 className="font-mono text-2xl md:text-3xl text-center gold-sparkle" style={{ color: "#c9a84c" }}>
                Sai Weds Sai
              </h1>

              <div className="my-3 flex items-center gap-2">
                <div className="h-px w-8 bg-gold/30" />
                <span className="text-gold/50 text-xs font-sans tracking-[0.3em] uppercase">An</span>
                <div className="h-px w-8 bg-gold/30" />
              </div>

              <h2 className="font-mono text-lg md:text-xl text-center" style={{ color: "#e8d08a" }}>
                Epic Saga
              </h2>

              {/* Decorative line bottom */}
              <div className="flex items-center gap-3 mt-6">
                <div className="h-px w-12 bg-gold/40" />
                <svg className="text-gold/50" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" fill="currentColor" />
                </svg>
                <div className="h-px w-12 bg-gold/40" />
              </div>
            </div>

            {/* Spine shadow (left edge) */}
            <div
              className="absolute top-0 left-0 bottom-0 w-4"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
              }}
            />

            {/* Wax Seal */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
              <div
                className="seal-pulse w-16 h-16 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage: "url(/images/wax-seal.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(139,37,0,0.8) 0%, rgba(100,20,0,0.9) 100%)",
                  }}
                />
                <span className="relative z-10 font-mono text-lg font-bold" style={{ color: "#e8d08a" }}>
                  S
                </span>
              </div>
            </div>
          </div>

          {/* Book spine (left edge 3D effect) */}
          <div
            className="absolute top-0 left-0 bottom-0 w-3 -translate-x-full"
            style={{
              background: "linear-gradient(to right, #2a1508, #3d2010)",
              borderRadius: "4px 0 0 4px",
              boxShadow: "-2px 0 8px rgba(0,0,0,0.5)",
            }}
          />

          {/* Book pages (right edge) */}
          <div
            className="absolute top-2 -right-2 bottom-2 w-2"
            style={{
              background:
                "repeating-linear-gradient(to bottom, #d4b896 0px, #d4b896 1px, #c4a886 1px, #c4a886 2px)",
              borderRadius: "0 2px 2px 0",
            }}
          />
        </button>
      </div>

      {/* Whisper text */}
      <p
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 font-serif text-sm md:text-base whisper-text text-center"
        style={{ color: "rgba(201, 168, 76, 0.7)" }}
      >
        {"Tap the tome to begin the saga"}
      </p>
    </div>
  )
}
