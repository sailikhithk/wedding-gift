import type { Metadata, Viewport } from "next";
import { Cinzel, IM_Fell_English, Cinzel_Decorative } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const harry = localFont({
  src: "../public/fonts/harryp.ttf",
  variable: "--font-harry",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const imFell = IM_Fell_English({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-im-fell",
  display: "swap",
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel-decorative",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sai Weds Sai — An Epic Saga",
  description: "A magical storybook of our love",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a0e05",
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${imFell.variable} ${cinzelDecorative.variable} ${harry.variable}`}
    >
      <body className="font-serif antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
