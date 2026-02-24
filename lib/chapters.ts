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
      "✨ *Lumos!* When laziness met craziness, who knew it would create the perfect kind of magic? 🌟 Before our eyes met, two very different souls wandered separately. But in that exact moment, the shadow of boredom vanished, replaced by an undeniable spark. 🔮 The universe had been waiting for this chaotic, beautiful collision. 🦋 The magic had only just begun.",
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
      "An Unbreakable Vow is the most sacred bond. But honestly? 2 years ago, I bent the knee and got a wonderful wife... absolutely the best trade deal ever in the history of trade deals! Surrounded by love and light, we made our own vow. Not because magic compelled us, but because we knew life would be endlessly better together. The rings exchanged were our portkeys to forever.",
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
    videoPlaceholder: "Adding our Dance performance video",
    videoUrl: "/images/chapters/chapter4.mp4",
    gifCaption: "The magic of togetherness",
  },
  {
    id: 5,
    title: "The Next Adventure",
    subtitle: "Our Future Awaits",
    storyText:
      "Two magical years down, an entire lifetime to go. As Dumbledore once said, 'It does not do to dwell on dreams and forget to live.' But the reality of the past two years has been better than any dream. The pages ahead are waiting to be filled with even more craziness, love, and adventures. The wand chose the wizard, but we continue to choose each other every single day. Happy 2nd Anniversary, Yashu! Always.",
    videoPlaceholder: "Your future together",
    videoUrl: "/images/chapters/chapter5.mp4",
    gifCaption: "Soaring into the next chapter",
  },
];
