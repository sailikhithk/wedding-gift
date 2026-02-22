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

      <div className="relative z-10 mx-auto gentle-float" style={{ perspective: "2400px", width: "min(1440px, 98vw)" }}>
        <div style={{ transformStyle: "preserve-3d", transform: "rotateX(3deg)" }}>

          {/* ── OPEN BOOK using real book-pages.png as background ── */}
          <div className="relative" style={{
            // Match the image's natural aspect ratio: 1280x706
            width: "min(1440px, 98vw)",
            aspectRatio: "1280/706",
            filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.85))",
          }}>
            {/* The real book image as background */}
            <img
              src="/images/book-pages.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ objectFit: "fill", zIndex: 1 }}
            />

            {/* ── LEFT PAGE CONTENT AREA ──
                Pixel-accurate: x=18.7%–49.4%, y=13.9%–75.2%
            ── */}
            <div className="absolute overflow-hidden" style={{
              left: "18.7%", right: "50.6%",
              top: "13.9%", bottom: "24.8%",
              zIndex: 2,
            }}>
              <LeftPage chapter={cur} />
            </div>

            {/* ── RIGHT PAGE CONTENT AREA ──
                Pixel-accurate: x=50.5%–81.5%, y=13.9%–74.8%
            ── */}
            <div className="absolute overflow-hidden" style={{
              left: "50.6%", right: "18.5%",
              top: "13.9%", bottom: "25.2%",
              zIndex: 2,
            }}>
              <RightPage chapter={cur} onExpandVideo={() => setExpandedVideo(true)} />
            </div>

            {/* ── CLICK ZONES: brown page stack edges ── */}
            {/* Left stack (0–18.7%) → previous / close */}
            <div
              onClick={canGoBack ? () => turnPage("back") : onClose}
              className="absolute top-0 bottom-0 left-0 z-10"
              style={{ width: "18.7%", cursor: "inherit" }}
              title={canGoBack ? "Previous chapter" : "Close book"}
            />
            {/* Right stack (81.5%–100%) → next */}
            {canGoForward && (
              <div
                onClick={() => turnPage("forward")}
                className="absolute top-0 bottom-0 right-0 z-10"
                style={{ width: "18.5%", cursor: "inherit" }}
                title="Next chapter"
              />
            )}

            {/* ── FLIPPING LEAF (covers half the book) ── */}
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
                {/* Front face */}
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
                  <div className="absolute" style={{
                    left: turnDirection === "forward" ? "3%" : "3%",
                    right: turnDirection === "forward" ? "3%" : "3%",
                    top: "14%", bottom: "14%",
                  }}>
                    {turnDirection === "forward"
                      ? <RightPage chapter={cur} onExpandVideo={() => {}} />
                      : <LeftPage chapter={cur} />}
                  </div>
                </div>
                {/* Back face */}
                <div className="absolute inset-0 overflow-hidden" style={{
                  background: "linear-gradient(160deg, #e8d4b0 0%, #dcc89a 50%, #d0b882 100%)",
                  backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}>
                  <PageTexture />
                  <div style={{ transform: "scaleX(-1)", height: "100%" }}>
                    <div className="absolute" style={{
                      left: "3%", right: "3%", top: "14%", bottom: "14%",
                    }}>
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

        {/* Navigation */}
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

/** Ornate photo frame using real frame image */
function PhotoFrame({ gifUrl, gifCaption, placeholder }: { gifUrl?:string, gifCaption?:string, placeholder:string }) {
  return (
    // Cropped frame is 450x640 → aspect ratio 0.703
    <div className="relative mx-auto" style={{ aspectRatio: "450/640", width: "100%" }}>
      {/* Photo content sits in the window opening
          Insets: top 8.9%, bottom 8.8%, left 11.8%, right 11.3% */}
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

      {/* Cropped frame PNG on top */}
      <img
        src="/images/phot-frame-cropped.png"
        alt="ornate frame"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ objectFit: "fill", filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.55))" }}
      />
    </div>
  )
}

/** Wax seal */
function WaxSeal({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="pointer-events-none select-none" style={{ ...style, position:"absolute" }}>
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="20" fill="#8b2500" stroke="rgba(201,168,76,0.6)" strokeWidth="1.5"/>
        <circle cx="22" cy="22" r="15" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8"/>
        <text x="22" y="27" textAnchor="middle" fontSize="14" fontFamily="serif" fill="rgba(201,168,76,0.9)" fontWeight="bold">H</text>
      </svg>
    </div>
  )
}

/** Sparkle dots scattered on page */
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


// ── Page content components ──

function LeftPage({ chapter }: { chapter: (typeof chapters)[0] }) {
  return (
    <div className="absolute inset-0 overflow-visible">
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

      {/* Text with frame floated right — CSS float wraps text naturally */}
      <div className="px-4 md:px-5" style={{ lineHeight: 0 }}>
        {/* Float the frame to the right so text wraps around it */}
        <div style={{
          float: "right",
          width: "42%",
          marginLeft: "10px",
          marginBottom: "8px",
          lineHeight: 1,
        }}>
          <PhotoFrame gifUrl={chapter.gifUrl} gifCaption={chapter.gifCaption} placeholder={chapter.videoPlaceholder} />
        </div>

        <p className="font-serif text-xs" style={{
          color:"#2e1a08",
          textAlign:"justify",
          lineHeight:"1.75",
          display: "block",
        }}>
          {chapter.storyText}
        </p>

        {/* Clear float */}
        <div style={{ clear: "both" }} />
      </div>

      {/* Feather + ink bottle — bottom left */}
      <div className="absolute pointer-events-none" style={{ bottom: -10, left: 0, width: "75%", zIndex: 10 }}>
        <img
          src="/images/ink-bottle-cropped.png"
          alt="ink bottle"
          className="absolute"
          style={{
            width: "18%",
            bottom: 8,
            left: "12%",
            filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.5))",
          }}
        />
        <img
          src="/images/feather.png"
          alt="quill feather"
          style={{
            width: "90%",
            display: "block",
            transform: "rotate(-22deg)",
            transformOrigin: "30% 85%",
            filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.4))",
            marginLeft: "-5%",
          }}
        />
      </div>

      {/* Page number */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center" style={{ zIndex: 2 }}>
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

      {/* Text with frame floated LEFT — wraps around it */}
      <div className="px-4 md:px-5" style={{ lineHeight: 0 }}>
        <button
          onClick={onExpandVideo}
          className="focus:outline-none hover:scale-[1.02] transition-transform"
          style={{
            float: "left",
            width: "42%",
            marginRight: "10px",
            marginBottom: "8px",
            lineHeight: 1,
          }}
        >
          <PhotoFrame gifUrl={chapter.gifUrl} gifCaption={chapter.gifCaption} placeholder={chapter.videoPlaceholder} />
          {chapter.gifCaption && (
            <p className="text-center font-serif text-[9px] italic mt-1" style={{ color:"rgba(100,65,20,0.6)" }}>
              "{chapter.gifCaption}"
            </p>
          )}
        </button>

        <p className="font-serif text-xs" style={{
          color:"#2e1a08",
          textAlign:"justify",
          lineHeight:"1.75",
          display: "block",
        }}>
          {chapter.storyText}
        </p>

        <div style={{ clear: "both" }} />
      </div>

      {/* Wax seal — bottom right */}
      <WaxSeal style={{ bottom:8, right:10 }} />

      {/* Page number */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        <span className="font-serif text-[10px]" style={{ color:"rgba(100,65,20,0.45)" }}>{chapter.id * 2}</span>
      </div>
    </div>
  )
}
