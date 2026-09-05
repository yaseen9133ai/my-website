import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import MotionProvider from "@/components/MotionProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: `${profile.name} — AI Engineer & Researcher`,
    template: `%s — ${profile.name}`,
  },
  description: profile.summary,
  keywords: [
    "AI Engineer",
    "AI Researcher",
    "Neuro-Symbolic AI",
    "Graph Neural Networks",
    "Financial AI",
    "LLM Engineering",
    "Islamic Finance",
    "Ahmed Yaseen",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — AI Engineer & Researcher`,
    description: profile.positioning,
    type: "profile",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06070a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${display.variable} ${mono.variable} antialiased`}
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
