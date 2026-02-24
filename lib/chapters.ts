export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  storyText: string;
  videoPlaceholder: string;
  gifUrl?: string;
  gifCaption?: string;
  videoUrl?: string;
  mediaPosition?: string;
}

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "The Prophecy",
    subtitle: "How Two Souls Found Each Other",
    storyText:
      "✨ *Lumos!* Just like that, you cast continuous light into my life. 🌟 Before our eyes met, two souls wandered separately, unknowing they were meant to converge. But in that exact moment, the shadows vanished, replaced by a quiet, undeniable certainty that everything prior had simply been leading here. 🔮 The universe had been waiting. 🦋 The magic had only just begun.",
    videoPlaceholder: "Your first meeting memory",
    videoUrl: "/images/chapters/chapter1.mp4",
    mediaPosition: "30% center",
    gifCaption: "Albus Dumbledore — Keeper of Prophecies",
  },
  {
    id: 2,
    title: "The First Spell",
    subtitle: "A Date That Changed Everything",
    storyText:
      "Every great wizard remembers their first spell — that trembling moment when raw potential transforms into something real. So it was with our first evening together. The nervous laughter, the stolen glances, the way conversation flowed like an enchanted river. By the end of that night, a spell had been cast — not with wand and incantation, but with shared smiles and whispered dreams. There was no counter-charm for what had begun.",
    videoPlaceholder: "Your first date memory",
    videoUrl: "/images/chapters/chapter2.mp4",
    gifCaption: "The magic of a first enchantment",
  },
  {
    id: 3,
    title: "The Unbreakable Vow",
    subtitle: "A Promise for Eternity",
    storyText:
      "In the wizarding world, an Unbreakable Vow is the most sacred bond — a promise sealed by magic itself, never to be broken. On that unforgettable day, surrounded by love and light, two hearts made their own Unbreakable Vow. Not because magic compelled them, but because love did. Every word spoken was a spell of commitment, every tear shed a potion of joy. The rings exchanged were not mere metal — they were portkeys to forever.",
    videoPlaceholder: "Your wedding day memory",
    videoUrl: "/images/chapters/chapter3.mp4",
    gifCaption: "A bond sealed by magic",
  },
  {
    id: 4,
    title: "The Order of the Two Sais",
    subtitle: "Building a Life of Magic Together",
    storyText:
      "Like the Order of the Phoenix rising from the ashes, The Order of the Two Sais was forged in love, laughter, and a shared devotion to something greater. Together they built not just a home, but a sanctuary — a place where morning chai became a daily ritual, where inside jokes became sacred incantations, and where every challenge faced together only strengthened the bond. This was no longer two stories — it was one magnificent tale.",
    videoPlaceholder: "Your life together memory",
    videoUrl: "/images/chapters/chapter4.mp4",
    gifCaption: "The magic of togetherness",
  },
  {
    id: 5,
    title: "The Next Adventure",
    subtitle: "Our Future Awaits",
    storyText:
      "As Dumbledore once said, 'It does not do to dwell on dreams and forget to live.' But what if the dream IS the life you're living? The pages ahead are blank and beautiful, waiting to be filled with new adventures, new memories, and new chapters of this extraordinary saga. The wand chooses the wizard — and destiny chose us for each other. Whatever comes next, we face it together. Always.",
    videoPlaceholder: "Your future together",
    videoUrl: "/images/chapters/chapter5.mp4",
    gifCaption: "Soaring into the next chapter",
  },
];
