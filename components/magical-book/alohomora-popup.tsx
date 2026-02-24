"use client";

import { useEffect, useState } from "react";

export function AlohomoraPopup({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Show spell for 1.2 seconds, then fade out
    const timer = setTimeout(() => {
      setVisible(false);
      // Wait for the fade-out duration before completing
      setTimeout(onComplete, 500);
    }, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <h2
        className="relative font-harry text-6xl md:text-8xl text-[#c9a84c] tracking-widest drop-shadow-[0_0_15px_rgba(201,168,76,0.8)] z-10 animate-pulse"
        style={{
          textShadow:
            "0 0 20px rgba(201,168,76,0.6), 0 0 40px rgba(201,168,76,0.4)",
        }}
      >
        Alohomora...
      </h2>
    </div>
  );
}
