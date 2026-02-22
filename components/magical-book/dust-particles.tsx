"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export function DustParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 6 + Math.random() * 8,
      size: 1 + Math.random() * 3,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="dust-particle"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
