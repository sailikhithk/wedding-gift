"use client";

import { useState, useEffect } from "react";

interface BookCoverProps {
  onOpen: () => void;
}

export function BookCover({ onOpen }: BookCoverProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    // Transition from the entrance zoom animation to the gentle float
    // The zoomFromCastle animation takes 2.5s
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  function handleClick() {
    setIsOpening(true);
    onOpen();
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      {/* Harry Potter flying — top-left corner */}
      <img
        src="/images/harry-potter-flying.png"
        alt="Harry Potter flying on broomstick"
        className="absolute pointer-events-none"
        style={{
          top: "16px",
          left: "16px",
          width: "clamp(130px, 15vw, 210px)",
          opacity: 0.95,
          filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.85))",
          zIndex: 25,
        }}
      />

      {/* 3D Book Scene Container - Handles the Entrance Zoom */}
      <div className={`relative z-30 ${!hasEntered ? "zoom-from-castle" : ""}`}>
        {/* Inner Container - Handles Float and Opening */}
        <div
          className={`${isOpening ? "book-cover-animate" : hasEntered ? "gentle-float" : ""}`}
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
              width: "calc(min(95vw, 140vh) * 0.414)", // Precisely matches the BookInterior height
              aspectRatio: "3/4",
            }}
          >
            {/* === FRONT COVER BUTTON === */}
            <div
              className="absolute inset-0"
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(0px)",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
              }}
            >
              <img
                src="/images/book.png"
                alt="Sai Weds Sai book cover"
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Ground shadow beneath the book */}
            <div
              className="absolute"
              style={{
                width: "100%",
                height: "40px",
                bottom: "-30px",
                left: "50%",
                transform: "translateX(-50%) rotateX(80deg)",
                background:
                  "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, transparent 80%)",
                filter: "blur(6px)",
              }}
            />
          </button>
        </div>
      </div>

      {/* Whisper text */}
      <p
        className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-30 font-serif text-sm md:text-base whisper-text text-center"
        style={{ color: "rgba(201, 168, 76, 0.7)" }}
      >
        {"Tap the tome to begin the saga"}
      </p>
    </div>
  );
}
