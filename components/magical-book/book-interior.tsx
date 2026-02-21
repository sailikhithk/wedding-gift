"use client"

import { useState, useCallback } from "react"
import { chapters } from "@/lib/chapters"
import { ChapterSpread } from "./chapter-spread"
import { VideoModal } from "./video-modal"

interface BookInteriorProps {
  visible: boolean
}

export function BookInterior({ visible }: BookInteriorProps) {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [isPageTurning, setIsPageTurning] = useState(false)
  const [turnDirection, setTurnDirection] = useState<"forward" | "back">("forward")
  const [expandedVideo, setExpandedVideo] = useState(false)

  const canGoForward = currentChapter < chapters.length - 1
  const canGoBack = currentChapter > 0

  const turnPage = useCallback(
    (direction: "forward" | "back") => {
      if (isPageTurning) return
      if (direction === "forward" && !canGoForward) return
      if (direction === "back" && !canGoBack) return

      setIsPageTurning(true)
      setTurnDirection(direction)

      setTimeout(() => {
        setCurrentChapter((prev) =>
          direction === "forward" ? prev + 1 : prev - 1
        )
        setIsPageTurning(false)
      }, 600)
    },
    [isPageTurning, canGoForward, canGoBack]
  )

  if (!visible) return null

  const chapter = chapters[currentChapter]

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center p-4 md:p-8">
      {/* Ambient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, #1a0e05 0%, #0a0604 100%)",
        }}
      />

      {/* The open book */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Book wrapper with shadow */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "4px 8px 8px 4px",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.8), 0 0 100px rgba(0,0,0,0.4)",
          }}
        >
          {/* Parchment pages */}
          <div
            className={`parchment-bg relative transition-opacity duration-500 ${
              isPageTurning ? "opacity-80" : "opacity-100"
            }`}
            style={{
              minHeight: "min(600px, 75vh)",
            }}
          >
            {/* Aging overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 20%, transparent 40%, rgba(139, 115, 85, 0.08) 100%)",
              }}
            />

            {/* Tea stain effects */}
            <div
              className="absolute pointer-events-none rounded-full"
              style={{
                width: "120px",
                height: "100px",
                top: "10%",
                right: "15%",
                background:
                  "radial-gradient(ellipse, rgba(139, 115, 85, 0.06) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute pointer-events-none rounded-full"
              style={{
                width: "80px",
                height: "90px",
                bottom: "20%",
                left: "10%",
                background:
                  "radial-gradient(ellipse, rgba(139, 115, 85, 0.04) 0%, transparent 70%)",
              }}
            />

            {/* Page turn overlay */}
            {isPageTurning && (
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background:
                    turnDirection === "forward"
                      ? "linear-gradient(to left, rgba(0,0,0,0.15) 0%, transparent 50%)"
                      : "linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 50%)",
                  transition: "all 0.6s ease",
                }}
              />
            )}

            {/* Chapter content */}
            <div
              key={currentChapter}
              className={`${isPageTurning ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
            >
              <ChapterSpread
                chapter={chapter}
                isActive={true}
                onExpandVideo={() => setExpandedVideo(true)}
              />
            </div>
          </div>

          {/* Spine (left edge) */}
          <div
            className="absolute top-0 left-0 bottom-0 w-2"
            style={{
              background: "linear-gradient(to right, #2a1508, #4d3420, #2a1508)",
              boxShadow: "2px 0 8px rgba(0,0,0,0.3)",
            }}
          />
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-between mt-6 px-2">
          {/* Back button */}
          <button
            onClick={() => turnPage("back")}
            disabled={!canGoBack || isPageTurning}
            className="flex items-center gap-2 px-4 py-2 transition-all duration-300 disabled:opacity-0"
            style={{ color: "#c9a84c" }}
            aria-label="Previous chapter"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12 4 L6 10 L12 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-serif text-sm hidden md:inline">
              {"Previous Chapter"}
            </span>
          </button>

          {/* Chapter indicator */}
          <div className="flex items-center gap-3">
            {chapters.map((_, i) => (
              <div
                key={i}
                className="transition-all duration-500"
                style={{
                  width: i === currentChapter ? "24px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background:
                    i === currentChapter
                      ? "#c9a84c"
                      : "rgba(201, 168, 76, 0.25)",
                }}
              />
            ))}
          </div>

          {/* Forward button */}
          <button
            onClick={() => turnPage("forward")}
            disabled={!canGoForward || isPageTurning}
            className="flex items-center gap-2 px-4 py-2 transition-all duration-300 disabled:opacity-0"
            style={{ color: "#c9a84c" }}
            aria-label="Next chapter"
          >
            <span className="font-serif text-sm hidden md:inline">
              {"Next Chapter"}
            </span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M8 4 L14 10 L8 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Page number */}
        <p
          className="text-center font-serif text-xs mt-2"
          style={{ color: "rgba(201, 168, 76, 0.4)" }}
        >
          {"Page "}{currentChapter * 2 + 1}{" - "}{currentChapter * 2 + 2}
        </p>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={expandedVideo}
        onClose={() => setExpandedVideo(false)}
        chapter={chapter}
      />
    </div>
  )
}
