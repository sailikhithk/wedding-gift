# Playwright / Browser Automation Guide for Sai Weds Sai

This document outlines the standard click targets and expected flows to automate or test the magical book experience.

## Viewport Recommendation

For consistent click targeting, a standard desktop viewport (e.g., `1920x1080` or `1280x720`) is recommended if using proportional clicks, or rely on CSS selectors where possible.

## 1. Intro Screen

- **"Enter the Magic" Button**
  - **Selector:** `button:has-text("Enter the Magic")`
  - **Action:** Starts the experience and plays the intro video (`welcome-amma.mp4`).

- **"Skip Intro" Button**
  - **Selector:** `button:has-text("Skip Intro")`
  - **Action:** Bypasses the intro video and goes directly to the closed book cover.

## 2. Book Cover

- **Open the Book**
  - **Selector:** `.book-container` or simply click the center of the viewport once the cover is visible.
  - **Action:** Triggers the 3D opening animation, revealing the Chapter 1 interior spread.

## 3. Book Interior (Pages)

- **Turn Page Forward (Next Chapter)**
  - **Action:** Click the right half of the screen/book (the `RightPage` area).
  - **Selector:** Clickable invisible div on the right edge. The subagent typically clicks proportional coordinates like `X: 750, Y: 500`.

- **Turn Page Backward (Previous Chapter)**
  - **Action:** Click the left half of the screen/book (the `LeftPage` area).
  - **Selector:** Clickable invisible div on the left edge. The subagent typically clicks proportional coordinates on the left side.

## 4. Media & Video Modal

- **Play Video/Enlarge Memory**
  - **Action:** Click the golden photo frame on the right page.
  - **Selector:** `button` containing the `PhotoFrame` component. (Subagent usually clicks inside the right page content area, e.g., `X: 650, Y: 420` in a standard viewport).
- **Close Video Modal**
  - **Action:** Click anywhere outside the video on the modal backdrop, or click the "X"/Close button if present, or press `Escape`.

## 5. Outro Sequence

- **Trigger Dobby Popup (Final Chapter)**
  - **Action:** Click the Dobby image that pops up on the bottom right of the final chapter.
  - **Selector:** `div` containing `DobbyOutro` or `img[alt="Dobby ready for the ride"]`.

- **Outro Video -> Surprise Screen -> Thank You Video**
  - **Action 1:** Watch the Gringotts exit video (plays automatically).
  - **Action 2:** Once the "Hold on!" surprise screen appears, click the round Harry Potter style play button in the center (has an SVG play icon).
  - **Action 3:** The `thankyou.mp4` video plays in fullscreen.
