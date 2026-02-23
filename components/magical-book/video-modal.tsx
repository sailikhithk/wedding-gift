"use client";

import { useEffect, useState } from "react";
import type { Chapter } from "@/lib/chapters";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: Chapter;
}

export function VideoModal({ isOpen, onClose, chapter }: VideoModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowContent(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      setShowContent(false);
      setIsClosing(false);
      onClose();
    }, 400);
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen && !showContent) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`${chapter.title} - Full color memory`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-500 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/media-player-background.png)",
          opacity: isClosing ? 0 : 1,
        }}
        onClick={handleClose}
      >
        {/* Dark overlay to ensure the video and text stand out against the background */}
        <div className="absolute inset-0 bg-black/30 z-0" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 w-full max-w-3xl mx-4 ${
          isClosing ? "video-collapse" : "video-expand"
        }`}
      >
        {/* Close hint */}
        <p
          className="text-center font-serif text-xs mb-4 transition-opacity duration-700"
          style={{
            color: "rgba(201, 168, 76, 0.6)",
            opacity: isClosing ? 0 : 1,
            transitionDelay: "0.5s",
          }}
        >
          {"Click anywhere outside to return to the book"}
        </p>

        {/* Video container — Full Color */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "16/9",
            borderRadius: "8px",
            border: "2px solid rgba(201, 168, 76, 0.3)",
            boxShadow:
              "0 0 40px rgba(201, 168, 76, 0.15), 0 20px 60px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Placeholder — replace with actual video */}
          <div
            className="w-full h-full flex flex-col items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #1a0e05 0%, #2a1a0a 50%, #1a0e05 100%)",
            }}
          >
            {/* Play icon */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{
                border: "2px solid rgba(201, 168, 76, 0.4)",
                background: "rgba(201, 168, 76, 0.1)",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                style={{ color: "#c9a84c" }}
              >
                <path d="M8 5 L19 12 L8 19 Z" fill="currentColor" />
              </svg>
            </div>

            <p className="font-mono text-lg" style={{ color: "#c9a84c" }}>
              {chapter.title}
            </p>
            <p className="font-serif text-sm mt-2" style={{ color: "#8b7355" }}>
              {chapter.videoPlaceholder}
            </p>
            <p
              className="font-serif text-xs mt-4 italic"
              style={{ color: "rgba(139, 115, 85, 0.6)" }}
            >
              {"Add your video to bring this memory to life"}
            </p>
          </div>
        </div>

        {/* Chapter info below video */}
        <div className="mt-6 text-center">
          <h3 className="font-mono text-xl" style={{ color: "#c9a84c" }}>
            {"Chapter "}
            {chapter.id}
            {": "}
            {chapter.title}
          </h3>
          <p
            className="font-serif text-sm mt-1 italic"
            style={{ color: "#8b7355" }}
          >
            {chapter.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
