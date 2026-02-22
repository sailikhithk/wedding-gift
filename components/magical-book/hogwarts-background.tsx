"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  twinkleSpeed: number
  twinkleDelay: number
}

interface ShootingStar {
  id: number
  startX: number
  startY: number
  angle: number
  delay: number
  duration: number
}

export function HogwartsBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])

  useEffect(() => {
    setStars(
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 60,
        size: 0.5 + Math.random() * 2,
        twinkleSpeed: 2 + Math.random() * 4,
        twinkleDelay: Math.random() * 6,
      }))
    )
    setShootingStars(
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        startX: 10 + Math.random() * 60,
        startY: 5 + Math.random() * 20,
        angle: 20 + Math.random() * 25,
        delay: 4 + i * 9 + Math.random() * 4,
        duration: 0.7 + Math.random() * 0.5,
      }))
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Real Hogwarts photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hogwarts-bg.jpg)" }}
      />

      {/* Subtle dark overlay so stars pop */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)" }} />

      {/* Harry Potter flying — top-left corner, transparent PNG */}
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
          zIndex: 5,
        }}
      />

      {/* Twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.size > 1.5
              ? "radial-gradient(circle, #fff 0%, rgba(201,168,76,0.5) 60%, transparent 100%)"
              : "#e8dcc8",
            animationDuration: `${star.twinkleSpeed}s`,
            animationDelay: `${star.twinkleDelay}s`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((s) => (
        <div
          key={s.id}
          className="absolute shooting-star"
          style={{
            left: `${s.startX}%`,
            top: `${s.startY}%`,
            width: "90px",
            height: "1px",
            background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.7) 50%, #fff 100%)",
            transform: `rotate(${s.angle}deg)`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
