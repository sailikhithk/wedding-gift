# Software Requirements Specification (SRS)

## 1. Functional Requirements

- **REQ-F01 (Custom Cursor):** The application must replace the default OS cursor with a custom `wand.png` graphic across the entire viewport.
- **REQ-F02 (Spotlight Engine / Lumos):** The landing page must implement a dynamic CSS radial gradient mask tied to `mousemove` and `touchmove` coordinates to create a flashlight effect over the dark book cover.
- **REQ-F03 (Book State Management):** The application must track the state of the book (`isClosed`, `isOpening`, `isOpen`) to trigger CSS 3D keyframe animations (rotateY).
- **REQ-F04 (Media Playback & Filters):** Inline videos ("moving pictures") must use HTML5 `<video>` tags set to `autoplay`, `loop`, `muted`, and `playsinline`. A CSS filter (`sepia(80%) grayscale(50%)`) must be applied to simulate the _Daily Prophet_ newspaper aesthetic.
- **REQ-F05 (Modal Expansion):** Clicking an inline video must pause the inline playback, open a fixed-position overlay (Modal), and load the full-color, unmuted version of the media.
- **REQ-F06 (Audio Engine):** The app must preload and trigger specific audio files (`.mp3`) on user interaction: an unlocking latch, a heavy page turn, and AI-generated character voice lines.

## 2. Non-Functional Requirements

- **REQ-NF01 (Responsiveness):** On mobile, the "wand cursor" effect must adapt to a "drag-to-illuminate" touch interaction. The two-page spread must stack into a single-page vertical layout on viewports narrower than 768px.
- **REQ-NF02 (Performance):** Video assets must be highly compressed or served via a CDN/YouTube iframe to ensure the initial bundle size remains lightweight and prevents layout blocking.
