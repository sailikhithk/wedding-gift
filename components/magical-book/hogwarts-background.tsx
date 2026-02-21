"use client"

import { useEffect, useRef, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinkleDelay: number
}

interface ShootingStar {
  id: number
  startX: number
  startY: number
  angle: number
  speed: number
  delay: number
  duration: number
}

export function HogwartsBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Generate stars on mount
  useEffect(() => {
    const generated: Star[] = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 70, // keep stars in upper 70%
      size: 0.5 + Math.random() * 2.5,
      opacity: 0.3 + Math.random() * 0.7,
      twinkleSpeed: 2 + Math.random() * 4,
      twinkleDelay: Math.random() * 5,
    }))
    setStars(generated)

    // Shooting stars
    const shooters: ShootingStar[] = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      startX: 20 + Math.random() * 60,
      startY: 5 + Math.random() * 25,
      angle: 20 + Math.random() * 30,
      speed: 1 + Math.random() * 2,
      delay: 5 + i * 8 + Math.random() * 5,
      duration: 0.8 + Math.random() * 0.6,
    }))
    setShootingStars(shooters)
  }, [])

  // Fog / mist canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let time = 0

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    function drawFog() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      time += 0.003

      // Draw multiple fog layers
      for (let i = 0; i < 4; i++) {
        const yBase = canvas!.height * (0.55 + i * 0.08)
        const amplitude = 20 + i * 10
        const alpha = 0.03 + i * 0.01

        ctx!.beginPath()
        ctx!.moveTo(0, canvas!.height)

        for (let x = 0; x <= canvas!.width; x += 4) {
          const y =
            yBase +
            Math.sin(x * 0.003 + time + i * 1.5) * amplitude +
            Math.sin(x * 0.007 + time * 0.7 + i) * (amplitude * 0.5)
          ctx!.lineTo(x, y)
        }

        ctx!.lineTo(canvas!.width, canvas!.height)
        ctx!.closePath()
        ctx!.fillStyle = `rgba(180, 190, 210, ${alpha})`
        ctx!.fill()
      }

      animId = requestAnimationFrame(drawFog)
    }

    drawFog()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Night sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #020111 0%, #06112b 20%, #0a1a3a 35%, #0d1f42 50%, #111e38 65%, #1a1a2e 80%, #16213e 100%)",
        }}
      />

      {/* Aurora / magical glow in the sky */}
      <div
        className="absolute inset-0 aurora-glow"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 30% 20%, rgba(76, 0, 130, 0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 30% at 70% 15%, rgba(0, 80, 120, 0.06) 0%, transparent 60%)",
        }}
      />

      {/* Moon */}
      <div
        className="absolute moon-glow"
        style={{
          top: "8%",
          right: "15%",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 40%, #ffeedd 0%, #e8d5a8 40%, #c9a84c 80%, transparent 100%)",
          boxShadow:
            "0 0 40px rgba(255, 238, 200, 0.3), 0 0 80px rgba(201, 168, 76, 0.15), 0 0 120px rgba(201, 168, 76, 0.08)",
        }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background:
              star.size > 2
                ? "radial-gradient(circle, #fff 0%, rgba(201,168,76,0.6) 50%, transparent 100%)"
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
            width: "80px",
            height: "1px",
            background:
              "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.8) 50%, #fff 100%)",
            transform: `rotate(${s.angle}deg)`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* Fog / mist canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Hogwarts Castle Silhouette */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "35%" }}>
        <svg
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMax slice"
          className="absolute bottom-0 w-full h-full"
          style={{ filter: "drop-shadow(0 -4px 20px rgba(0,0,0,0.5))" }}
        >
          <defs>
            {/* Castle gradient */}
            <linearGradient id="castleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a0a15" />
              <stop offset="100%" stopColor="#050510" />
            </linearGradient>
            {/* Window glow */}
            <radialGradient id="windowGlow">
              <stop offset="0%" stopColor="#e8b84c" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Distant hills / treeline */}
          <path
            d="M0 350 Q100 310 200 330 Q300 300 400 320 Q500 290 600 310 Q700 280 800 300 Q900 270 1000 290 Q1100 260 1200 280 Q1300 270 1440 290 L1440 400 L0 400 Z"
            fill="#080812"
            opacity="0.7"
          />

          {/* Main castle body */}
          <path
            d="M500 400 L500 220 L510 220 L510 180 L520 180 L520 220 L580 220 L580 160 L590 160 L590 120 L595 100 L600 120 L610 120 L610 160 L620 160 L620 220 L660 220 L660 190 L670 190 L670 150 L675 130 L680 150 L690 150 L690 190 L700 190 L700 220 L740 220 L740 180 L750 180 L750 140 L755 110 L758 90 L760 70 L762 90 L765 110 L770 140 L780 140 L780 180 L790 180 L790 220 L830 220 L830 170 L840 170 L840 130 L845 110 L850 130 L860 130 L860 170 L870 170 L870 220 L920 220 L920 190 L930 190 L930 160 L935 140 L940 160 L950 160 L950 190 L960 190 L960 400 Z"
            fill="url(#castleGrad)"
          />

          {/* Left wing */}
          <path
            d="M350 400 L350 280 L360 280 L360 250 L365 230 L370 250 L380 250 L380 280 L420 280 L420 240 L430 240 L430 200 L435 180 L440 200 L450 200 L450 240 L460 240 L460 280 L500 280 L500 400 Z"
            fill="url(#castleGrad)"
          />

          {/* Right wing */}
          <path
            d="M960 400 L960 280 L1000 280 L1000 240 L1010 240 L1010 200 L1015 180 L1020 200 L1030 200 L1030 240 L1040 240 L1040 280 L1080 280 L1080 250 L1085 230 L1090 250 L1100 250 L1100 280 L1100 400 Z"
            fill="url(#castleGrad)"
          />

          {/* Battlements / crenellations on main body */}
          <path
            d="M510 220 L510 212 L520 212 L520 220 M530 220 L530 212 L540 212 L540 220 M550 220 L550 212 L560 212 L560 220 M570 220 L570 212 L580 212 L580 220 M700 220 L700 212 L710 212 L710 220 M720 220 L720 212 L730 212 L730 220 M790 220 L790 212 L800 212 L800 220 M810 220 L810 212 L820 212 L820 220 M870 220 L870 212 L880 212 L880 220 M890 220 L890 212 L900 212 L900 220"
            fill="url(#castleGrad)"
          />

          {/* Castle windows — warm golden glow */}
          {[
            [560, 250], [600, 180], [680, 210], [760, 160],
            [760, 200], [840, 190], [930, 210], [400, 300],
            [440, 260], [550, 290], [650, 260], [750, 250],
            [850, 250], [1020, 260], [1050, 300],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="6" fill="url(#windowGlow)" />
              <rect
                x={cx! - 2}
                y={cy! - 3}
                width="4"
                height="6"
                rx="1"
                fill="#e8b84c"
                opacity="0.7"
                className="window-flicker"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            </g>
          ))}

          {/* Foreground ground / lake reflection area */}
          <rect x="0" y="360" width="1440" height="40" fill="#050510" />

          {/* Lake reflection shimmer */}
          <path
            d="M400 370 Q500 365 600 370 Q700 368 800 372 Q900 368 1000 370"
            stroke="rgba(201, 168, 76, 0.06)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M450 380 Q550 375 650 380 Q750 377 850 381 Q950 378 1050 380"
            stroke="rgba(201, 168, 76, 0.04)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Bottom darkness fade (so book sits naturally) */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "30%",
          background:
            "linear-gradient(to top, rgba(5,5,10,0.95) 0%, rgba(5,5,10,0.6) 40%, transparent 100%)",
        }}
      />
    </div>
  )
}
