import type { Metadata } from "next";
import { AppStateProvider } from "@/components/providers/app-state";
import { display, hand, sans, brand } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOOP — Close the loop on customer feedback",
  description:
    "Turn customer feedback into sentiment, themes, trends, and evidence-backed decisions.",
  icons: {
    icon: [{ url: "/icon.png" }, { url: "/logo.png" }],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${display.variable} ${sans.variable} ${hand.variable} ${brand.variable} font-sans antialiased`}
      >
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}

