import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { type ReactElement, type ReactNode } from "react";
import { twJoin } from "tailwind-merge";
import "./globals.css";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dead by Roulette - Dead by Daylight Randomizer",
  description:
    "Randomize your Dead by Daylight loadout (randomize characters, perks, add-ons, and offerings). Customizable to your liking.",
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
          "bg-neutral-950 bg-gradient-to-b from-red-950/90 to-red-950/15 bg-fixed text-main",
          jost.className,
        )}
      >
        {/* Grid Container */}
        <div className="relative mx-page grid grid-cols-4 gap-4 sm:grid-cols-8 sm:gap-x-8 lg:mx-page-lg lg:w-[var(--page-width-lg)] lg:grid-cols-12">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
