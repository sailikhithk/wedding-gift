"use client"

import type { Chapter } from "@/lib/chapters"
import { MovingPicture } from "./moving-picture"

interface ChapterSpreadProps {
  chapter: Chapter
  isActive: boolean
  onExpandVideo: () => void
}

export function ChapterSpread({ chapter, isActive, onExpandVideo }: ChapterSpreadProps) {
  if (!isActive) return null

  return (
    <div className="w-full h-full flex flex-col lg:flex-row">
      {/* Left page — Text */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8 md:px-10 lg:px-12 lg:py-10 relative">
        {/* Page fold shadow for left page */}
        <div
          className="absolute top-0 right-0 bottom-0 w-8 hidden lg:block"
          style={{
            background: "linear-gradient(to left, rgba(0,0,0,0.08) 0%, transparent 100%)",
          }}
        />

        {/* Chapter number */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-ink/20 flourish-line" />
          <span
            className="font-sans text-xs tracking-[0.4em] uppercase"
            style={{ color: "#8b7355" }}
          >
            {"Chapter "}{chapter.id}
          </span>
          <div className="h-px flex-1 bg-ink/20 flourish-line" />
        </div>

        {/* Chapter title */}
        <h2
          className="font-mono text-2xl md:text-3xl lg:text-4xl text-center mb-2 ink-reveal"
          style={{ color: "#2a1a0a" }}
        >
          {chapter.title}
        </h2>

        {/* Subtitle */}
        <p
          className="font-serif text-sm text-center mb-6 italic"
          style={{ color: "#8b7355" }}
        >
          {chapter.subtitle}
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-px w-8 bg-ink/20" />
          <svg width="12" height="12" viewBox="0 0 12 12" style={{ color: "#c9a84c" }}>
            <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z" fill="currentColor" opacity="0.5" />
          </svg>
          <div className="h-px w-8 bg-ink/20" />
        </div>

        {/* Story text */}
        <div className="ink-reveal">
          <p
            className="font-serif text-sm md:text-base leading-relaxed text-center lg:text-left"
            style={{
              color: "#3d2a14",
              textIndent: "2em",
              lineHeight: "1.8",
            }}
          >
            {chapter.storyText}
          </p>
        </div>

        {/* Bottom flourish */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="h-px w-16 bg-ink/15" />
          <svg width="8" height="8" viewBox="0 0 8 8" style={{ color: "#c9a84c" }}>
            <circle cx="4" cy="4" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            <circle cx="4" cy="4" r="1" fill="currentColor" opacity="0.3" />
          </svg>
          <div className="h-px w-16 bg-ink/15" />
        </div>
      </div>

      {/* Center binding shadow (desktop) */}
      <div className="hidden lg:block w-6 relative">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.06) 100%)",
          }}
        />
      </div>

      {/* Right page — Video */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8 md:px-10 lg:px-12 lg:py-10 relative">
        {/* Page fold shadow for right page */}
        <div
          className="absolute top-0 left-0 bottom-0 w-8 hidden lg:block"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.06) 0%, transparent 100%)",
          }}
        />

        {/* Newspaper-style header */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px flex-1 bg-ink/30" />
            <span
              className="font-sans text-[10px] tracking-[0.5em] uppercase"
              style={{ color: "#8b7355" }}
            >
              The Daily Prophet
            </span>
            <div className="h-px flex-1 bg-ink/30" />
          </div>
          <p
            className="text-center font-sans text-xs"
            style={{ color: "#8b7355" }}
          >
            {"Exclusive Moving Photograph"}
          </p>
        </div>

        {/* Moving Picture */}
        <div className="max-w-sm mx-auto w-full">
          <MovingPicture
            placeholder={chapter.videoPlaceholder}
            onExpand={onExpandVideo}
          />
        </div>

        {/* Caption under picture */}
        <p
          className="text-center font-serif text-xs italic mt-6"
          style={{ color: "#8b7355" }}
        >
          {"\"A memory preserved in magical ink\""}
        </p>
      </div>
    </div>
  )
}
