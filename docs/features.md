# Sai Weds Sai - Magical Book Features

This document outlines the core features and technical capabilities implemented in the "Sai Weds Sai" magical wedding invitation application.

## 1. Cinematic Entry Experience

- **Dining Hall Splash Screen**: Immediate visual immersion using a custom Hogwarts Grand Dining Hall background with a semi-transparent dark overlay to ensure legibility.
- **"Click to Enter" Audio Unblocker**: Requires an initial user interaction to bypass modern browser autoplay policies, ensuring the following video plays with sound.
- **Intro Cinematic Video**: A full-screen video (`intro.mp4`) that plays seamlessly after entry, providing a cinematic lead-in to the application.
- **Skip Functionality**: Users can cleanly skip the intro video at any time, instantly transitioning to the interactive book experience.

## 2. Interactive 3D Book Cover

- **Global Hogwarts Integration**: A persistent, global Hogwarts background image anchors the entire experience across both the cover and interior stages.
- **3D Floating Animation**: The closed book physically floats in 3D space (`gentle-float` keyframe) with a dynamic drop-shadow casting onto the environment.
- **Responsive Screen Scaling**: The book is mathematically scaled to consume maximum screen real-estate (width up to `98vw`, height up to `160vh`), ensuring a dominant, immersive presence.
- **Seamless Opening Synchronization**: Unmounting the cover is precisely timed with the fading-in of the book interior, calculating identical CSS heights to completely eliminate any vertical "jumping" during the transition.
- **Entrance Zoom**: A CSS 3D zoom effect (`zoom-from-castle`) plays upon entering the `dark` stage, bringing the book from the distant background to the foreground.

## 3. Magical Book Interior

- **Dual-Page Layout**: A realistic, two-page book spread mimicking an ancient tome.
- **3D Page Turning**: Smooth, hardware-accelerated CSS 3D folding animations for turning pages forward and backward.
- **Opening Glow Burst**: A radial CSS gradient animation that expands out like a magical shockwave when the book first opens.

## 4. Multimedia Story Chapters

- **Dynamic Content Routing**: Content is driven by a `chapters` data structure (`lib/chapters.ts`), allowing for easy storytelling progression.
- **Integrated Video Modals**: Each chapter contains a "Play Memory" button that opens an immersive, dark-backdrop video player modal for specific wedding/relationship milestones.
- **Vintage GIF Integration**: Magical, looping GIFs (with Harry Potter-styled captions) mimic "Moving Pictures" from the wizarding world.

## 5. Magical Aesthetic & Effects

- **Wand Sparkle Cursor**: A custom React component that tracks mouse movement, emitting a trail of fading, floating golden sparkles.
- **Dust Particles**: Ambient, floating dust motes drift across the foreground globally to give a sense of age and magic.
- **Marauder's Map Footprints**: Animated footprints (`footprints_final.gif`) that seamlessly loop and walk across the page, disappearing into the binding.
- **Custom Typography**: Integration of custom fonts including `harryP` for primary wizarding headers, `Cinzel` for elegant subtitles, and `IM Fell English` for the vintage, handwritten story text.
- **Wax Seals and Quills**: Thematic graphical overlays (ink bottles, quills, and Hogwarts 'S' wax seals) placed around the interactive elements to ground the UI in the wizarding world context.
