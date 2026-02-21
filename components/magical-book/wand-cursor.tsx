"use client"

import { useEffect, useRef } from "react"

interface WandCursorProps {
  enabled: boolean
}

export function WandCursor({ enabled }: WandCursorProps) {
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return

    const trail = trailRef.current
    if (!trail) return

    let particles: HTMLDivElement[] = []
    let lastTime = 0

    function createSparkle(x: number, y: number) {
      const sparkle = document.createElement("div")
      sparkle.style.cssText = `
        position: fixed;
        left: ${x - 2}px;
        top: ${y - 2}px;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, #e8d08a 0%, #c9a84c 50%, transparent 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 1s ease-out;
      `
      trail.appendChild(sparkle)
      particles.push(sparkle)

      requestAnimationFrame(() => {
        sparkle.style.opacity = "0"
        sparkle.style.transform = `translateY(-${20 + Math.random() * 30}px) translateX(${(Math.random() - 0.5) * 20}px) scale(0)`
      })

      setTimeout(() => {
        if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle)
        particles = particles.filter((p) => p !== sparkle)
      }, 1000)
    }

    function handleMove(e: MouseEvent) {
      const now = Date.now()
      if (now - lastTime < 50) return
      lastTime = now

      if (Math.random() > 0.5) {
        createSparkle(e.clientX, e.clientY)
      }
    }

    window.addEventListener("mousemove", handleMove)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      particles.forEach((p) => {
        if (p.parentNode) p.parentNode.removeChild(p)
      })
    }
  }, [enabled])

  if (!enabled) return null

  return <div ref={trailRef} className="fixed inset-0 z-[9999] pointer-events-none" />
}
