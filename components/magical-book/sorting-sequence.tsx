"use client";

import { useEffect, useState } from "react";

export function SortingSequence({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<
    "validating" | "plate" | "welcome" | "alohomora"
  >("validating");
  const [fade, setFade] = useState(true);

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    const transition = (nextStep: any, delay: number) => {
      timer1 = setTimeout(() => setFade(false), delay - 500);
      timer2 = setTimeout(() => {
        setStep(nextStep);
        setFade(true);
      }, delay);
    };

    if (step === "validating") {
      transition("plate", 2500);
    } else if (step === "plate") {
      transition("welcome", 4000); // Give them time to read the scorecard
    } else if (step === "welcome") {
      transition("alohomora", 3500);
    } else if (step === "alohomora") {
      timer1 = setTimeout(() => setFade(false), 2000);
      timer2 = setTimeout(() => onComplete(), 2500);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [step, onComplete]);

  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-500">
      <div
        className={`transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        } w-full h-full flex flex-col items-center justify-center p-4`}
      >
        {step === "validating" && (
          <h2 className="font-harry text-5xl md:text-7xl text-[#c9a84c] tracking-widest drop-shadow-[0_0_15px_rgba(201,168,76,0.8)] animate-pulse text-center">
            Validating wizard...
          </h2>
        )}

        {step === "plate" && (
          <img
            src="/images/plate.png"
            alt="Score Card"
            className="max-w-[95vw] max-h-[85vh] object-contain drop-shadow-[0_0_25px_rgba(201,168,76,0.4)] transition-transform duration-1000 scale-100 hover:scale-105"
            style={{ animation: "floatBook 4s ease-in-out infinite" }}
          />
        )}

        {step === "welcome" && (
          <div className="text-center">
            <h2 className="font-harry text-5xl md:text-7xl text-[#c9a84c] mb-6 tracking-widest drop-shadow-[0_0_15px_rgba(201,168,76,0.8)]">
              Welcome Yashu...
            </h2>
            <h3 className="flex items-center justify-center gap-4 font-harry text-4xl md:text-6xl text-[#ff2400] tracking-widest drop-shadow-[0_0_25px_rgba(211,166,37,1)] animate-pulse">
              <span>🦁</span> heading to Gryffindor! <span>🦁</span>
            </h3>
          </div>
        )}

        {step === "alohomora" && (
          <h2
            className="font-harry text-6xl md:text-8xl text-[#c9a84c] tracking-widest animate-pulse"
            style={{
              textShadow:
                "0 0 20px rgba(201,168,76,0.6), 0 0 40px rgba(201,168,76,0.4)",
            }}
          >
            Alohomora...
          </h2>
        )}
      </div>
    </div>
  );
}
