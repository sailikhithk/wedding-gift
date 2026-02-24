# Magical Spells Integration Guide

This document catalogs the various Harry Potter magical spells woven into the interactive elements of the application. These spells appear contextually to enhance the immersive experience of the magical book journey.

| Spell | Meaning / Context | Trigger / Location in App | Component File |
| :--- | :--- | :--- | :--- |
| **Lumos** | Wand-Lighting Charm: Used to cast light into the darkness. | **Chapter 1 Story Text:** Used directly in the prose ("*Lumos!* Just like that, you cast continuous light into my life.") to symbolize the first time the couple met. | `lib/chapters.ts` |
| **Alohomora** | Unlocking Charm: Used to unlock doors and chests. | **Opening the Book:** Clicking the closed book cover displays a massive, pulsing "Alohomora..." overlay for 1.5s before the book physically opens. | `components/magical-book/book-cover.tsx` <br/> *via* `alohomora-popup.tsx` |
| **Accio** | Summoning Charm: Used to summon objects towards the caster. | **Turning Pages:** Clicking the page edges to turn forward or backward triggers a glowing "Accio..." overlay while the page flip animation occurs. | `components/magical-book/book-interior.tsx` |
| **Engorgio** | Enlargement Charm: Causes the target to swell in size. | **Expanding Media Player:** Clicking a PhotoFrame on the right page to expand the video to fullscreen displays a flashing "Engorgio..." overlay. | `components/magical-book/video-modal.tsx` |
| **Revelio** | Revealing Charm: Used to reveal hidden objects or messages. | **Surprise Screen reveal:** After the main chapters and Dobby outro, this spell pulses at the top of the "Hold on!" screen, revealing that there is one final hidden message left. | `components/magical-book/book-interior.tsx` |
| **Expecto Patronum** | Patronus Charm: Casts a protective shield driven by a powerful happy memory. | **Final Video Button:** The text below the play button for the final "Thank You" video asks the user to "Cast Expecto Patronum", symbolizing that this relationship is their ultimate happy memory. | `components/magical-book/book-interior.tsx` |

## Technical Implementation Notes
* All spell typography uses the custom `font-harry` (Harry P) font.
* Spells utilize the `#c9a84c` golden theme color.
* Overlay transition effects rely on a combination of `animate-pulse`, `animate-fade-in-out`, and heavy CSS text-shadowing / drop-shadows to ensure the spells literally "glow" in the dark cinematic modes.
