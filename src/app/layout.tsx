import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { twJoin } from "tailwind-merge";
import "./globals.css";
import { type ReactElement, type ReactNode } from "react";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dead by Roulette",
  description: "Randomize your Dead by Daylight loadout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <html lang="en">
      <body
        className={twJoin(
          "bg-neutral-950 bg-gradient-to-b from-red-950/90 to-red-950/15 bg-fixed text-white/95",
          jost.className,
        )}
      >
        {children}
      </body>
    </html>
  );
}
