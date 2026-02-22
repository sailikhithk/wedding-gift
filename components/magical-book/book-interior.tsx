"use client"

import { useState, useCallback } from "react"
import { chapters } from "@/lib/chapters"
import { VideoModal } from "./video-modal"
import { HogwartsBackground } from "./hogwarts-background"

interface BookInteriorProps {
  visible: boolean
  onClose: () => void
}

export function BookInterior({ visible, onClose }: BookInteriorProps) {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [isPageTurning, setIsPageTurning] = useState(false)
  const [turnDirection, setTurnDirection] = useState<"forward" | "back">("forward")
  const [nextChapter, setNextChapter] = useState(0)
  const [expandedVideo, setExpandedVideo] = useState(false)

  const canGoForward = currentChapter < chapters.length - 1
  const canGoBack = currentChapter > 0

  const turnPage = useCallback(
    (direction: "forward" | "back") => {
      if (isPageTurning) return
      if (direction === "forward" && !canGoForward) return
      if (direction === "back" && !canGoBack) return
      const next = direction === "forward" ? currentChapter + 1 : currentChapter - 1
      setNextChapter(next)
      setTurnDirection(direction)
      setIsPageTurning(true)
      setTimeout(() => {
        setCurrentChapter(next)
        setIsPageTurning(false)
      }, 900)
    },
    [isPageTurning, canGoForward, canGoBack, currentChapter]
  )

  if (!visible) return null

  const cur = chapters[currentChapter]
  const nxt = chapters[nextChapter]

  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center p-2 md:p-3">
      <HogwartsBackground />

      {/* ── MAGICAL OPENING GLOW BURST ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 52%, rgba(255,220,100,0.55) 0%, rgba(201,168,76,0.25) 35%, transparent 70%)",
          animation: "bookOpenGlow 2.5s ease-out forwards",
          zIndex: 5,
        }}
      />

      <div className="relative z-10 mx-auto gentle-float" style={{ width: "min(1716px, 99vw)" }}>
        <div>
          {/* ── OPEN BOOK using real book-pages.png as background ── */}
          <div className="relative" style={{
            width: "min(1716px, 99vw)",
            aspectRatio: "1280/706",
            filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.85))",
          }}>
            {/* Real book image */}
            <img
              src="/images/book-pages.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ objectFit: "fill", zIndex: 1 }}
            />

            {/* ── LEFT PAGE CONTENT (text only, no decorations) ── */}
            <div className="absolute overflow-hidden" style={{
              left: "21%", right: "52%",
              top: "13.9%", bottom: "26%",
              zIndex: 2,
              transform: "skewY(-3.5deg)",
              transformOrigin: "center top",
            }}>
              <LeftPage chapter={cur} />
            </div>

            {/* ── RIGHT PAGE CONTENT (text only, no decorations) ── */}
            <div className="absolute overflow-hidden" style={{
              left: "52%", right: "21%",
              top: "13.9%", bottom: "26%",
              zIndex: 2,
              transform: "skewY(3.5deg)",
              transformOrigin: "center top",
            }}>
              <RightPage chapter={cur} onExpandVideo={() => setExpandedVideo(true)} />
            </div>

            {/* ── FEATHER — on left page, bottom area ── */}
            <img
              src="/images/feather.png"
              alt="quill feather"
              className="absolute pointer-events-none"
              style={{
                bottom: "28%", left: "16%",
                width: "18%",
                transform: "rotate(-22deg)",
                transformOrigin: "30% 85%",
                filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))",
                zIndex: 10,
              }}
            />

            {/* ── INK BOTTLE — on left page, bottom area ── */}
            <img
              src="/images/ink-bottle-cropped.png"
              alt="ink bottle"
              className="absolute pointer-events-none"
              style={{
                bottom: "30%", left: "23%",
                width: "4%",
                filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.6))",
                zIndex: 11,
              }}
            />

            {/* ── WAX SEAL — on right page, bottom area ── */}
            <WaxSeal style={{ bottom: "26%", right: "19%", zIndex: 10 }} />

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
              <div className="absolute" style={{
                left: turnDirection === "forward" ? "50%" : "0",
                right: turnDirection === "forward" ? "0" : "50%",
                top: 0, bottom: 0,
                transformStyle: "preserve-3d",
                transformOrigin: turnDirection === "forward" ? "left center" : "right center",
                animation: turnDirection === "forward"
                  ? "flipForward 0.9s cubic-bezier(0.645,0.045,0.355,1.000) forwards"
                  : "flipBack 0.9s cubic-bezier(0.645,0.045,0.355,1.000) forwards",
                zIndex: 30,
              }}>
                <div className="absolute inset-0 overflow-hidden" style={{
                  background: "linear-gradient(160deg, #eedcb8 0%, #e5ce9e 50%, #d8be88 100%)",
                  backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                }}>
                  <PageTexture />
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: turnDirection === "forward"
                      ? "linear-gradient(to left, rgba(0,0,0,0.3) 0%, transparent 50%)"
                      : "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 50%)",
                  }} />
                  <div className="absolute" style={{ left:"3%", right:"3%", top:"14%", bottom:"14%" }}>
                    {turnDirection === "forward"
                      ? <RightPage chapter={cur} onExpandVideo={() => {}} />
                      : <LeftPage chapter={cur} />}
                  </div>
                </div>
                <div className="absolute inset-0 overflow-hidden" style={{
                  background: "linear-gradient(160deg, #e8d4b0 0%, #dcc89a 50%, #d0b882 100%)",
                  backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}>
                  <PageTexture />
                  <div style={{ transform: "scaleX(-1)", height: "100%" }}>
                    <div className="absolute" style={{ left:"3%", right:"3%", top:"14%", bottom:"14%" }}>
                      {turnDirection === "forward"
                        ? <LeftPage chapter={nxt} />
                        : <RightPage chapter={nxt} onExpandVideo={() => {}} />}
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
              <div key={i} onClick={() => !isPageTurning && setCurrentChapter(i)}
                className="cursor-pointer transition-all duration-500"
                style={{
                  width: i === currentChapter ? "22px" : "6px", height: "6px", borderRadius: "3px",
                  background: i === currentChapter ? "#c9a84c" : "rgba(201,168,76,0.25)",
                }} />
            ))}
          </div>
        </div>
        <p className="text-center font-serif text-xs mt-1" style={{ color: "rgba(201,168,76,0.35)" }}>
          Chapter {currentChapter + 1} of {chapters.length}
        </p>
      </div>

      <VideoModal isOpen={expandedVideo} onClose={() => setExpandedVideo(false)} chapter={cur} />
    </div>
  )
}

// ── Shared decorative helpers ──

function PageTexture() {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(70,38,8,0.13) 100%)",
      }} />
      <div className="absolute top-0 left-0 right-0 h-6 pointer-events-none" style={{
        background: "linear-gradient(to bottom, rgba(50,25,5,0.18), transparent)",
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none" style={{
        background: "linear-gradient(to top, rgba(50,25,5,0.18), transparent)",
      }} />
    </>
  )
}

function PhotoFrame({ gifUrl, gifCaption, placeholder }: { gifUrl?:string, gifCaption?:string, placeholder:string }) {
  return (
    <div className="relative mx-auto" style={{ aspectRatio: "450/640", width: "100%" }}>
      <div className="absolute overflow-hidden" style={{
        top: "8.9%", bottom: "8.8%",
        left: "11.8%", right: "11.3%",
      }}>
        {gifUrl ? (
          <img
            src={gifUrl}
            alt={gifCaption ?? placeholder}
            className="w-full h-full object-cover"
            style={{ filter: "sepia(0.35) contrast(1.05) brightness(0.95)" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{
            background: "linear-gradient(135deg, #3d2a14, #2a1a0a)",
          }}>
            <span className="font-serif text-xs text-center px-3" style={{ color: "rgba(201,168,76,0.4)" }}>
              {placeholder}
            </span>
          </div>
        )}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(20,10,2,0.3) 100%)",
        }} />
      </div>
      <img
        src="/images/phot-frame-cropped.png"
        alt="ornate frame"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ objectFit: "fill", filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.55))" }}
      />
    </div>
  )
}

function WaxSeal({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="pointer-events-none select-none" style={{ ...style, position: "absolute" }}>
      <svg width="72" height="72" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="20" fill="#8b2500" stroke="rgba(201,168,76,0.6)" strokeWidth="1.5"/>
        <circle cx="22" cy="22" r="15" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8"/>
        <text x="22" y="27" textAnchor="middle" fontSize="14" fontFamily="serif" fill="rgba(201,168,76,0.9)" fontWeight="bold">H</text>
      </svg>
    </div>
  )
}

function Sparkles({ count=6, seed=0 }: { count?:number, seed?:number }) {
  const items = Array.from({length:count},(_,i)=>({
    x: 5 + ((i*37+seed*13)%85),
    y: 5 + ((i*53+seed*17)%85),
    s: 0.5 + (i%3)*0.5,
    o: 0.2 + (i%4)*0.1,
  }))
  return (
    <div className="absolute inset-0 pointer-events-none">
      {items.map((sp,i)=>(
        <div key={i} className="absolute star-twinkle" style={{
          left:`${sp.x}%`, top:`${sp.y}%`,
          width:`${sp.s*4}px`, height:`${sp.s*4}px`,
          background:"radial-gradient(circle, rgba(255,240,180,0.9) 0%, transparent 70%)",
          borderRadius:"50%",
          opacity: sp.o,
          animationDuration:`${2+i*0.7}s`,
          animationDelay:`${i*0.4}s`,
        }}/>
      ))}
    </div>
  )
}

// ── Marauder's Map footprints ──

function MaraudersFootprints() {
  // A trail of footprints walking across both pages
  // Each: { x, y, rot, isLeft } — x/y as % of book container
  const prints = [
    // Left page — walking from bottom-left upward
    { x: 22, y: 72, rot: -10, left: true },
    { x: 24, y: 66, rot: 8,   left: false },
    { x: 23, y: 60, rot: -12, left: true },
    { x: 25, y: 54, rot: 6,   left: false },
    { x: 24, y: 48, rot: -8,  left: true },
    { x: 26, y: 42, rot: 10,  left: false },
    { x: 25, y: 36, rot: -6,  left: true },
    { x: 27, y: 30, rot: 8,   left: false },
    // Crossing the spine
    { x: 30, y: 26, rot: 15,  left: true },
    { x: 34, y: 23, rot: 20,  left: false },
    { x: 38, y: 21, rot: 18,  left: true },
    { x: 43, y: 20, rot: 15,  left: false },
    { x: 48, y: 20, rot: 10,  left: true },
    // Right page — continuing
    { x: 53, y: 21, rot: 8,   left: false },
    { x: 58, y: 23, rot: 12,  left: true },
    { x: 62, y: 26, rot: -8,  left: false },
    { x: 64, y: 32, rot: -12, left: true },
    { x: 63, y: 38, rot: 10,  left: false },
    { x: 65, y: 44, rot: -8,  left: true },
    { x: 64, y: 50, rot: 6,   left: false },
    { x: 66, y: 56, rot: -10, left: true },
    { x: 65, y: 62, rot: 8,   left: false },
    { x: 67, y: 68, rot: -6,  left: true },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4 }}>
      {prints.map((p, i) => (
        <svg
          key={i}
          width="18" height="22"
          viewBox="0 0 18 22"
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: `rotate(${p.rot}deg) scaleX(${p.left ? 1 : -1})`,
            opacity: 0.28,
            animation: `footAppear 0.3s ease-out ${i * 0.18}s both`,
          }}
        >
          {/* Heel */}
          <ellipse cx="9" cy="18" rx="5.5" ry="3.5" fill="#3d2008"/>
          {/* Mid-foot */}
          <ellipse cx="8" cy="13" rx="3.5" ry="4" fill="#3d2008"/>
          {/* Ball */}
          <ellipse cx="9" cy="8" rx="5" ry="3.5" fill="#3d2008"/>
          {/* Toes */}
          <ellipse cx="5"  cy="4.5" rx="2"   ry="1.5" fill="#3d2008"/>
          <ellipse cx="8"  cy="3"   rx="2"   ry="1.5" fill="#3d2008"/>
          <ellipse cx="11" cy="3.5" rx="1.8" ry="1.4" fill="#3d2008"/>
          <ellipse cx="13.5" cy="5" rx="1.5" ry="1.3" fill="#3d2008"/>
        </svg>
      ))}
    </div>
  )
}

// ── Page content components ──

function LeftPage({ chapter }: { chapter: (typeof chapters)[0] }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Sparkles count={5} seed={chapter.id} />

      {/* Chapter title */}
      <div className="px-5 pt-4 pb-1 text-center">
        <h2 className="font-mono text-base md:text-lg leading-tight" style={{ color:"#2a1505" }}>
          Chapter {chapter.id}: {chapter.title}
        </h2>
        <p className="font-serif text-[10px] italic mt-0.5" style={{ color:"#7a5020" }}>
          ({chapter.subtitle})
        </p>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-px flex-1" style={{ background:"linear-gradient(to right, transparent, rgba(100,65,20,0.4))" }}/>
          <svg width="8" height="8" viewBox="0 0 10 10"><path d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z" fill="rgba(139,100,30,0.5)"/></svg>
          <div className="h-px flex-1" style={{ background:"linear-gradient(to left, transparent, rgba(100,65,20,0.4))" }}/>
        </div>
      </div>

      {/* Text with frame floated right */}
      <div className="px-4 md:px-5" style={{ lineHeight: 0 }}>
        <div style={{ float:"right", width:"42%", marginLeft:"10px", marginBottom:"8px", lineHeight:1 }}>
          <PhotoFrame gifUrl={chapter.gifUrl} gifCaption={chapter.gifCaption} placeholder={chapter.videoPlaceholder} />
        </div>
        <p className="font-serif text-xs" style={{ color:"#2e1a08", textAlign:"justify", lineHeight:"1.75", display:"block" }}>
          {chapter.storyText}
        </p>
        <div style={{ clear:"both" }} />
      </div>

      {/* Page number */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center" style={{ zIndex: 2 }}>
        <span className="font-serif text-[10px]" style={{ color:"rgba(100,65,20,0.45)" }}>{chapter.id * 2 - 1}</span>
      </div>
    </div>
  )
}

function RightPage({ chapter, onExpandVideo }: { chapter: (typeof chapters)[0], onExpandVideo: () => void }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Sparkles count={5} seed={chapter.id + 10} />

      {/* Title */}
      <div className="px-5 pt-4 pb-1 text-center">
        <h2 className="font-mono text-base md:text-lg leading-tight" style={{ color:"#2a1505" }}>
          {chapter.title}
        </h2>
        <p className="font-serif text-[10px] italic mt-0.5" style={{ color:"#7a5020" }}>
          ({chapter.subtitle})
        </p>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-px flex-1" style={{ background:"linear-gradient(to right, transparent, rgba(100,65,20,0.4))" }}/>
          <svg width="8" height="8" viewBox="0 0 10 10"><path d="M5 0L6.2 3.8L10 5L6.2 6.2L5 10L3.8 6.2L0 5L3.8 3.8Z" fill="rgba(139,100,30,0.5)"/></svg>
          <div className="h-px flex-1" style={{ background:"linear-gradient(to left, transparent, rgba(100,65,20,0.4))" }}/>
        </div>
      </div>

      {/* Text with frame floated left */}
      <div className="px-4 md:px-5" style={{ lineHeight: 0 }}>
        <button
          onClick={onExpandVideo}
          className="focus:outline-none hover:scale-[1.02] transition-transform"
          style={{ float:"left", width:"42%", marginRight:"10px", marginBottom:"8px", lineHeight:1 }}
        >
          <PhotoFrame gifUrl={chapter.gifUrl} gifCaption={chapter.gifCaption} placeholder={chapter.videoPlaceholder} />
          {chapter.gifCaption && (
            <p className="text-center font-serif text-[9px] italic mt-1" style={{ color:"rgba(100,65,20,0.6)" }}>
              "{chapter.gifCaption}"
            </p>
          )}
        </button>
        <p className="font-serif text-xs" style={{ color:"#2e1a08", textAlign:"justify", lineHeight:"1.75", display:"block" }}>
          {chapter.storyText}
        </p>
        <div style={{ clear:"both" }} />
      </div>

      {/* Page number */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <span className="font-serif text-[10px]" style={{ color:"rgba(100,65,20,0.45)" }}>{chapter.id * 2}</span>
      </div>
    </div>
  )
}
