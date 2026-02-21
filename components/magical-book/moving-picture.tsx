"use client"

import { useState } from "react"

interface MovingPictureProps {
  videoSrc?: string
  placeholder: string
  onExpand: () => void
}

export function MovingPicture({ videoSrc, placeholder, onExpand }: MovingPictureProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onExpand}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative block w-full focus:outline-none group"
      aria-label={`View ${placeholder} in full color`}
    >
      {/* Ornate frame */}
      <div className="relative">
        {/* Outer frame border */}
        <div
          className="absolute -inset-3 md:-inset-4 rounded-sm"
          style={{
            border: "3px solid rgba(201, 168, 76, 0.5)",
            boxShadow: isHovered
              ? "0 0 20px rgba(201, 168, 76, 0.3), inset 0 0 20px rgba(201, 168, 76, 0.1)"
              : "0 0 8px rgba(0,0,0,0.3), inset 0 0 8px rgba(0,0,0,0.1)",
            transition: "box-shadow 0.5s ease",
          }}
        />

        {/* Inner frame border */}
        <div
          className="absolute -inset-1.5 md:-inset-2 rounded-sm"
          style={{
            border: "1px solid rgba(201, 168, 76, 0.25)",
          }}
        />

        {/* Corner ornaments */}
        {[
          "-top-3 -left-3 md:-top-4 md:-left-4",
          "-top-3 -right-3 md:-top-4 md:-right-4 rotate-90",
          "-bottom-3 -left-3 md:-bottom-4 md:-left-4 -rotate-90",
          "-bottom-3 -right-3 md:-bottom-4 md:-right-4 rotate-180",
        ].map((pos, i) => (
          <div key={i} className={`absolute ${pos} z-10`}>
            <svg width="16" height="16" viewBox="0 0 16 16" className="text-gold/60">
              <path d="M1 1 L1 10 Q1 1 10 1" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
        ))}

        {/* Video / Placeholder area */}
        <div
          className="relative overflow-hidden bg-ink/50"
          style={{
            aspectRatio: "4/3",
          }}
        >
          {videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              className="moving-picture w-full h-full object-cover"
            />
          ) : (
            /* Placeholder with animated grain effect */
            <div className="w-full h-full moving-picture flex items-center justify-center relative"
              style={{
                background: "linear-gradient(135deg, #3d2a14 0%, #2a1a0a 50%, #3d2a14 100%)",
              }}
            >
              {/* Film grain noise effect */}
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Camera icon */}
              <div className="relative flex flex-col items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 24 24" className="text-gold/40">
                  <path
                    d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="13" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span className="text-gold/30 font-serif text-xs text-center px-4">
                  {placeholder}
                </span>
              </div>
            </div>
          )}

          {/* Hover glow overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: isHovered ? 0.15 : 0,
              background: "radial-gradient(circle at center, #c9a84c 0%, transparent 70%)",
            }}
          />
        </div>
      </div>

      {/* "Tap to reveal" hint on hover */}
      <p
        className="text-center font-serif text-xs mt-5 transition-opacity duration-300"
        style={{
          color: "rgba(201, 168, 76, 0.5)",
          opacity: isHovered ? 1 : 0,
        }}
      >
        {"Tap to reveal in full color"}
      </p>
    </button>
  )
}
