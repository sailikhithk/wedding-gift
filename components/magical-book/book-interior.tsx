"use client";

import { useState, useCallback } from "react";
import { chapters } from "@/lib/chapters";
import { VideoModal } from "./video-modal";
import { HogwartsBackground } from "./hogwarts-background";

interface BookInteriorProps {
  visible: boolean;
  onClose: () => void;
}

export function BookInterior({ visible, onClose }: BookInteriorProps) {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<"forward" | "back">(
    "forward",
  );
  const [nextChapter, setNextChapter] = useState(0);
  const [expandedVideo, setExpandedVideo] = useState(false);
  const [showOutroVideo, setShowOutroVideo] = useState(false);

  const canGoForward = currentChapter < chapters.length - 1;
  const canGoBack = currentChapter > 0;

  const turnPage = useCallback(
    (direction: "forward" | "back") => {
      if (isPageTurning) return;
      if (direction === "forward" && !canGoForward) return;
      if (direction === "back" && !canGoBack) return;
      const next =
        direction === "forward" ? currentChapter + 1 : currentChapter - 1;
      setNextChapter(next);
      setTurnDirection(direction);
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentChapter(next);
        setIsPageTurning(false);
      }, 900);
    },
    [isPageTurning, canGoForward, canGoBack, currentChapter],
  );

  if (!visible) return null;

  const cur = chapters[currentChapter];
  const nxt = chapters[nextChapter];

  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center p-2 md:p-3">
      {/* ── MAGICAL OPENING GLOW BURST ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 52%, rgba(255,220,100,0.55) 0%, rgba(201,168,76,0.25) 35%, transparent 70%)",
          animation: "bookOpenGlow 2.5s ease-out forwards",
          zIndex: 5,
        }}
      />

      {/* ── MAIN BOOK CONTAINER ── */}
      <div
        className="relative w-[98vw] max-w-[2500px] preserve-3d mx-auto z-10"
        style={{ animation: "floatBook 6s ease-in-out infinite" }}
      >
        <div>
          {/* ── OPEN BOOK using real book-pages.png as background ── */}
          <div
            className="relative"
            style={{
              width: "100%",
              aspectRatio: "1280/706",
              filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.85))",
            }}
          >
            {/* Real book image */}
            <img
              src="/images/book-pages.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ objectFit: "fill", zIndex: 1 }}
            />

            {/* ── LEFT PAGE CONTENT (text only, no decorations) ── */}
            <div
              className="absolute overflow-hidden"
              style={{
                left: "21%",
                right: "52%",
                top: "13.9%",
                bottom: "26%",
                zIndex: 2,
                transform: "skewY(-3.5deg)",
                transformOrigin: "center top",
                paddingBottom: "18%", // Extra padding for feather/ink
              }}
            >
              <LeftPage chapter={cur} />
            </div>

            {/* ── RIGHT PAGE CONTENT (text only, no decorations) ── */}
            <div
              className="absolute overflow-hidden"
              style={{
                left: "52%",
                right: "21%",
                top: "13.9%",
                bottom: "26%",
                zIndex: 2,
                transform: "skewY(3.5deg)",
                transformOrigin: "center top",
              }}
            >
              <RightPage
                chapter={cur}
                onExpandVideo={() => setExpandedVideo(true)}
                isFinalChapter={currentChapter === chapters.length - 1}
                onShowOutro={() => setShowOutroVideo(true)}
              />
            </div>

            {/* ── FEATHER — placed on the left page bottom ── */}
            <img
              src="/images/feather.png"
              alt="quill feather"
              className="absolute pointer-events-none"
              style={{
                bottom: "32%",
                left: "32%",
                width: "18%",
                transform: "rotate(-25deg)",
                transformOrigin: "80% 80%",
                filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))",
                zIndex: 10,
              }}
            />

            {/* ── INK BOTTLE — placed on the left page bottom ── */}
            <img
              src="/images/ink-bottle-cropped.png"
              alt="ink bottle"
              className="absolute pointer-events-none"
              style={{
                bottom: "30%",
                left: "42%",
                width: "4%",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.6))",
                zIndex: 11,
              }}
            />

            {/* ── WAX SEAL — placed on the right page near the bottom-left spine ── */}
            <img
              src="/images/wax-seal.png"
              alt="wax seal"
              className="absolute pointer-events-none"
              style={{
                bottom: "28%",
                left: "52%",
                width: "6%",
                filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))",
                zIndex: 10,
              }}
            />

            {/* ── MARAUDER'S FOOTPRINTS ── */}
            <MaraudersFootprints />

            {/* ── CLICK ZONES: brown page stack edges ── */}
            <div
              onClick={canGoBack ? () => turnPage("back") : onClose}
              className="absolute top-0 bottom-0 left-0 z-10"
              style={{ width: "18.7%", cursor: "inherit" }}
            />
            {canGoForward && (
              <div
                onClick={() => turnPage("forward")}
                className="absolute top-0 bottom-0 right-0 z-10"
                style={{ width: "18.5%", cursor: "inherit" }}
              />
            )}

            {/* ── FLIPPING LEAF ── */}
            {isPageTurning && (
              <div
                className="absolute z-30"
                style={{
                  left: "21%",
                  right: "21%",
                  top: "13.9%",
                  bottom: "26%",
                  perspective: "2000px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: turnDirection === "forward" ? "50%" : "0",
                    right: turnDirection === "forward" ? "0" : "50%",
                    top: 0,
                    bottom: 0,
                    transformStyle: "preserve-3d",
                    transformOrigin:
                      turnDirection === "forward"
                        ? "left center"
                        : "right center",
                    animation:
                      turnDirection === "forward"
                        ? "pageTurnForward 0.9s cubic-bezier(0.645,0.045,0.355,1.000) forwards"
                        : "pageTurnBack 0.9s cubic-bezier(0.645,0.045,0.355,1.000) forwards",
                  }}
                >
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(160deg, #eedcb8 0%, #e5ce9e 50%, #d8be88 100%)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      borderRight:
                        turnDirection === "forward"
                          ? "1px solid rgba(0,0,0,0.1)"
                          : "none",
                      borderLeft:
                        turnDirection === "back"
                          ? "1px solid rgba(0,0,0,0.1)"
                          : "none",
                    }}
                  >
                    <PageTexture />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          turnDirection === "forward"
                            ? "linear-gradient(to left, rgba(0,0,0,0.3) 0%, transparent 50%)"
                            : "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 50%)",
                      }}
                    />
                    <div
                      className="absolute"
                      style={{
                        left: "3%",
                        right: "3%",
                        top: "14%",
                        bottom: "14%",
                      }}
                    >
                      {turnDirection === "forward" ? (
                        <RightPage
                          chapter={cur}
                          onExpandVideo={() => {}}
                          isFinalChapter={
                            currentChapter === chapters.length - 1
                          }
                          onShowOutro={() => {}}
                        />
                      ) : (
                        <LeftPage chapter={cur} />
                      )}
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(160deg, #e8d4b0 0%, #dcc89a 50%, #d0b882 100%)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <PageTexture />
                    <div className="w-full h-full">
                      <div
                        className="w-full h-full"
                        style={{ padding: "5%", paddingBottom: "18%" }}
                      >
                        {turnDirection === "forward" ? (
                          <LeftPage chapter={nxt} />
                        ) : (
                          <RightPage
                            chapter={nxt}
                            onExpandVideo={() => {}}
                            isFinalChapter={nextChapter === chapters.length - 1}
                            onShowOutro={() => {}}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chapter dots */}
        <div className="flex items-center justify-center mt-3 px-1">
          <div className="flex items-center gap-2">
            {chapters.map((_, i) => (
              <div
                key={i}
                onClick={() => !isPageTurning && setCurrentChapter(i)}
                className="cursor-pointer transition-colors transition-transform duration-500"
                style={{
                  width: i === currentChapter ? "22px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background:
                    i === currentChapter ? "#c9a84c" : "rgba(201,168,76,0.25)",
                }}
              />
            ))}
          </div>
        </div>
        <p
          className="text-center font-serif text-xs mt-1"
          style={{ color: "rgba(201,168,76,0.35)" }}
        >
          Chapter {currentChapter + 1} of {chapters.length}
        </p>
      </div>

      <VideoModal
        isOpen={expandedVideo}
        onClose={() => setExpandedVideo(false)}
        chapter={cur}
      />

      {/* Full screen outro sequence */}
      {showOutroVideo && (
        <OutroSequence onClose={() => setShowOutroVideo(false)} />
      )}
    </div>
  );
}

// ── Shared decorative helpers ──

function PageTexture() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(70,38,8,0.13) 100%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-6 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(50,25,5,0.18), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(50,25,5,0.18), transparent)",
        }}
      />
    </>
  );
}

function PhotoFrame({
  gifUrl,
  gifCaption,
  placeholder,
}: {
  gifUrl?: string;
  gifCaption?: string;
  placeholder: string;
}) {
  return (
    <div
      className="relative mx-auto"
      style={{ aspectRatio: "450/640", width: "100%" }}
    >
      <div
        className="absolute overflow-hidden"
        style={{
          top: "8.9%",
          bottom: "8.8%",
          left: "11.8%",
          right: "11.3%",
        }}
      >
        {gifUrl ? (
          <img
            src={gifUrl}
            alt={gifCaption ?? placeholder}
            className="w-full h-full object-cover"
            style={{ filter: "sepia(0.35) contrast(1.05) brightness(0.95)" }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #3d2a14, #2a1a0a)",
            }}
          >
            <span
              className="font-serif text-xs text-center px-3"
              style={{ color: "rgba(201,168,76,0.4)" }}
            >
              {placeholder}
            </span>
          </div>
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(20,10,2,0.3) 100%)",
          }}
        />
      </div>
      <img
        src="/images/phot-frame-cropped.png"
        alt="ornate frame"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          objectFit: "fill",
          filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.55))",
        }}
      />
    </div>
  );
}

function WaxSeal({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="pointer-events-none select-none"
      style={{ ...style, position: "absolute" }}
    >
      <svg width="72" height="72" viewBox="0 0 44 44" fill="none">
        <circle
          cx="22"
          cy="22"
          r="20"
          fill="#8b2500"
          stroke="rgba(201,168,76,0.6)"
          strokeWidth="1.5"
        />
        <circle
          cx="22"
          cy="22"
          r="15"
          fill="none"
          stroke="rgba(201,168,76,0.4)"
          strokeWidth="0.8"
        />
        <text
          x="22"
          y="27"
          textAnchor="middle"
          fontSize="14"
          fontFamily="serif"
          fill="rgba(201,168,76,0.9)"
          fontWeight="bold"
        >
          H
        </text>
      </svg>
    </div>
  );
}

function Sparkles({ count = 6, seed = 0 }: { count?: number; seed?: number }) {
  const items = Array.from({ length: count }, (_, i) => ({
    x: 5 + ((i * 37 + seed * 13) % 85),
    y: 5 + ((i * 53 + seed * 17) % 85),
    s: 0.5 + (i % 3) * 0.5,
    o: 0.2 + (i % 4) * 0.1,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none">
      {items.map((sp, i) => (
        <div
          key={i}
          className="absolute star-twinkle"
          style={{
            left: `${sp.x}%`,
            top: `${sp.y}%`,
            width: `${sp.s * 4}px`,
            height: `${sp.s * 4}px`,
            background:
              "radial-gradient(circle, rgba(255,240,180,0.9) 0%, transparent 70%)",
            borderRadius: "50%",
            opacity: sp.o,
            animationDuration: `${2 + i * 0.7}s`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Marauder's Map footprints ──

function MaraudersFootprints() {
  // A trail of footprints walking across both pages
  // Each: { x, y, rot, left } — x/y as % of book container
  const prints = [
    // New path matching source.jpg: looping from top-left, crossing spine, looping bottom-right
    // Left Page - Top loop (avoiding text, sweeping high)
    { x: 26, y: 12, rot: 135, left: true },
    { x: 23, y: 15, rot: 150, left: false },
    { x: 21, y: 20, rot: 170, left: true },
    { x: 21, y: 26, rot: 195, left: false },
    { x: 23, y: 31, rot: 220, left: true },
    { x: 27, y: 34, rot: 245, left: false },
    { x: 31, y: 35, rot: 260, left: true },
    { x: 36, y: 33, rot: 280, left: false },
    // Crossing over to spine (under title, over frames)
    { x: 41, y: 29, rot: 295, left: true },
    { x: 46, y: 25, rot: 310, left: false },
    // Right Page - Crossing and descending
    { x: 51, y: 22, rot: 320, left: true },
    { x: 55, y: 20, rot: 335, left: false },
    { x: 59, y: 19, rot: 350, left: true },
    { x: 63, y: 19, rot: 15, left: false },
    // Curve down the right edge
    { x: 67, y: 22, rot: 40, left: true },
    { x: 69, y: 27, rot: 60, left: false },
    { x: 71, y: 32, rot: 75, left: true },
    { x: 72, y: 38, rot: 90, left: false },
    { x: 72, y: 44, rot: 105, left: true },
    // Loop around bottom-right photo frame
    { x: 70, y: 50, rot: 130, left: false },
    { x: 67, y: 56, rot: 160, left: true },
    { x: 62, y: 59, rot: 190, left: false },
    { x: 57, y: 60, rot: 215, left: true },
    { x: 53, y: 58, rot: 240, left: false },
    { x: 50, y: 54, rot: 270, left: true },
    { x: 51, y: 48, rot: 300, left: false },
    { x: 54, y: 44, rot: 320, left: true },
    { x: 58, y: 41, rot: 345, left: false },
    // Head down and off page
    { x: 62, y: 41, rot: 15, left: true },
    { x: 66, y: 43, rot: 40, left: false },
    { x: 69, y: 47, rot: 60, left: true },
    { x: 70.5, y: 52, rot: 80, left: false },
    { x: 71, y: 58, rot: 95, left: true },
    { x: 70.5, y: 64, rot: 105, left: false },
    { x: 68.5, y: 69, rot: 120, left: true },
    { x: 66, y: 74, rot: 135, left: false },
    { x: 62.5, y: 78, rot: 150, left: true },
    { x: 59, y: 81, rot: 165, left: false },
    { x: 55, y: 84, rot: 175, left: true },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4 }}>
      {prints.map((p, i) => (
        <img
          key={i}
          src="/images/marauders-footprints.svg"
          alt="footprint"
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: "18px",
            transform: `rotate(${p.rot}deg) scaleX(${p.left ? 1 : -1})`,
            opacity: 0.28,
            animation: `footAppear 0.3s ease-out ${i * 0.18}s both`,
            filter:
              "sepia(1) hue-rotate(-50deg) saturate(3) brightness(0.4) opacity(0.7)",
          }}
        />
      ))}
    </div>
  );
}

// ── Page content components ──

function LeftPage({ chapter }: { chapter: (typeof chapters)[0] }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Sparkles count={5} seed={chapter.id} />

      {/* Chapter title */}
      <div className="px-5 pt-4 pb-1 text-center">
        <h2
          className="font-harry text-2xl md:text-3xl leading-tight"
          style={{ color: "#2a1505" }}
        >
          Chapter {chapter.id}: {chapter.title}
        </h2>
        <p className="font-harry text-lg mt-0.5" style={{ color: "#7a5020" }}>
          ({chapter.subtitle})
        </p>
        <div className="flex items-center gap-2 mt-1">
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(100,65,20,0.4))",
            }}
          />
          <svg width="8" height="8" viewBox="0 0 10 10">
            <path
              d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z"
              fill="rgba(139,100,30,0.5)"
            />
          </svg>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(100,65,20,0.4))",
            }}
          />
        </div>
      </div>

      {/* Text with frame floated right */}
      <div className="px-4 md:px-5" style={{ lineHeight: 0 }}>
        <div
          style={{
            float: "right",
            width: "42%",
            marginLeft: "10px",
            marginBottom: "8px",
            lineHeight: 1,
          }}
        >
          <PhotoFrame
            gifUrl={chapter.gifUrl}
            gifCaption={chapter.gifCaption}
            placeholder={chapter.videoPlaceholder}
          />
        </div>
        <p
          className="font-harry text-xl pb-16"
          style={{
            color: "#2e1a08",
            textAlign: "justify",
            lineHeight: "1.4",
            display: "block",
            letterSpacing: "1px",
          }}
        >
          {chapter.storyText}
        </p>
        <div style={{ clear: "both" }} />
      </div>

      {/* Page number */}
      <div
        className="absolute bottom-2 left-0 right-0 flex justify-center"
        style={{ zIndex: 2 }}
      >
        <span
          className="font-harry text-xl"
          style={{ color: "rgba(100,65,20,0.6)" }}
        >
          {chapter.id * 2 - 1}
        </span>
      </div>
    </div>
  );
}

function RightPage({
  chapter,
  onExpandVideo,
  isFinalChapter,
  onShowOutro,
}: {
  chapter: (typeof chapters)[0];
  onExpandVideo: () => void;
  isFinalChapter?: boolean;
  onShowOutro?: () => void;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Sparkles count={5} seed={chapter.id + 10} />

      {/* Dobby Popup if it's the final chapter */}
      {isFinalChapter && onShowOutro && <DobbyOutro onClick={onShowOutro} />}

      {/* Title */}
      <div className="px-5 pt-4 pb-1 text-center">
        <h2
          className="font-harry text-2xl md:text-3xl leading-tight"
          style={{ color: "#2a1505" }}
        >
          {chapter.title}
        </h2>
        <p className="font-harry text-lg mt-0.5" style={{ color: "#7a5020" }}>
          ({chapter.subtitle})
        </p>
        <div className="flex items-center gap-2 mt-1">
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(100,65,20,0.4))",
            }}
          />
          <svg width="8" height="8" viewBox="0 0 10 10">
            <path
              d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z"
              fill="rgba(139,100,30,0.5)"
            />
          </svg>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(100,65,20,0.4))",
            }}
          />
        </div>
      </div>

      {/* Text with frame floated right */}
      <div className="px-4 md:px-5" style={{ lineHeight: 0 }}>
        <button
          onClick={onExpandVideo}
          className="focus:outline-none hover:scale-[1.02] transition-transform"
          style={{
            float: "right",
            width: "42%",
            marginLeft: "10px",
            marginBottom: "8px",
            lineHeight: 1,
          }}
        >
          <PhotoFrame
            gifUrl={chapter.gifUrl}
            gifCaption={chapter.gifCaption}
            placeholder={chapter.videoPlaceholder}
          />
          {chapter.gifCaption && (
            <p
              className="text-center font-harry text-lg italic mt-1.5"
              style={{ color: "rgba(100,65,20,0.8)" }}
            >
              "{chapter.gifCaption}"
            </p>
          )}
        </button>
        <p
          className="font-harry text-xl pb-16"
          style={{
            color: "#2e1a08",
            textAlign: "justify",
            lineHeight: "1.4",
            display: "block",
            letterSpacing: "1px",
          }}
        >
          {chapter.storyText}
        </p>
        <div style={{ clear: "both" }} />
      </div>

      {/* Page number */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <span
          className="font-harry text-xl"
          style={{ color: "rgba(100,65,20,0.6)" }}
        >
          {chapter.id * 2}
        </span>
      </div>
    </div>
  );
}

function DobbyOutro({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="absolute z-[70] cursor-pointer animate-fade-in-up hover:scale-105 transition-transform duration-300 pointer-events-auto flex items-end justify-center"
      style={{
        bottom: "-2%",
        right: "-2%",
        animationDelay: "1s",
        animationFillMode: "both",
      }}
      onClick={onClick}
    >
      <div className="relative group flex flex-col items-center">
        {/* CSS Speech bubble */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 bg-[#efdbb2] border-2 border-[#8b6914] rounded-lg p-2 shadow-lg text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 before:content-[''] before:absolute before:bottom-[-10px] before:left-1/2 before:-translate-x-1/2 before:border-x-[10px] before:border-x-transparent before:border-t-[10px] before:border-t-[#8b6914] after:content-[''] after:absolute after:bottom-[-7px] after:left-1/2 after:-translate-x-1/2 after:border-x-[8px] after:border-x-transparent after:border-t-[8px] after:border-t-[#efdbb2]">
          <p className="font-harry text-2xl text-[#543210] leading-none">
            Ready for the ride?
          </p>
        </div>
        <img
          src="/images/dobby.png"
          alt="Dobby ready for the ride"
          className="w-70 md:w-85 h-auto drop-shadow-2xl filter"
          style={{ filter: "drop-shadow(0 12px 16px rgba(0,0,0,0.6))" }}
        />
      </div>
    </div>
  );
}

function OutroSequence({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"video" | "surprise" | "thankyou">("video");

  if (step === "thankyou") {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center animate-fade-in">
        <video
          src="/exit/thanks.mp4"
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-[110] p-2 rounded-full bg-black/40 text-white/50 hover:text-white hover:bg-black/80 transition-colors border border-white/10"
          aria-label="Close"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  if (step === "surprise") {
    return (
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center animate-fade-in bg-cover bg-center"
        style={{ backgroundImage: "url(/images/media-player-background.png)" }}
      >
        <div className="relative z-10 p-8 md:p-12 rounded-2xl max-w-4xl text-center flex flex-col items-center">
          <h2 className="font-harry text-6xl md:text-8xl text-[#f3e5ab] mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] leading-tight tracking-wider">
            Hold on!
          </h2>
          <p className="font-harry text-4xl md:text-6xl text-[#efdbb2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-relaxed text-center">
            Surprises doesn't end here, <br />
            they wanna say something
          </p>

          <button
            onClick={() => setStep("thankyou")}
            className="mt-12 group relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-transparent border-4 border-[#8b6914] text-[#f3e5ab] shadow-[0_0_20px_rgba(139,105,20,0.4)] hover:scale-110 hover:shadow-[0_0_30px_rgba(139,105,20,0.8)] hover:bg-[#8b6914]/20 transition-all duration-300"
            aria-label="Play Video"
          >
            <svg
              className="w-12 h-12 ml-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-[110] p-2 rounded-full bg-black/40 text-white/50 hover:text-white hover:bg-black/80 transition-colors border border-white/10"
          aria-label="Close surprise screen"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center animate-fade-in">
      <video
        src="/exit/gringotts.MP4"
        autoPlay
        playsInline
        className="w-full h-full object-cover"
        onEnded={() => setStep("surprise")}
      />
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-[110] p-2 rounded-full bg-black/40 text-white/50 hover:text-white hover:bg-black/80 transition-colors border border-white/10"
        aria-label="Skip video"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
