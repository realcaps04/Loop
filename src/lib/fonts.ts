import localFont from "next/font/local";
import { Caveat, Instrument_Sans, Inter } from "next/font/google";

export const display = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const brand = localFont({
  src: [
    {
      path: "../fonts/Gropled.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Gropled.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-brand",
  display: "swap",
});
