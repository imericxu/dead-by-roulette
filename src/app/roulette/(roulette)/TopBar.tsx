"use client";

import RoleSwitcher from "@/components/RoleSwitcher";
import { LucideHome } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { type ReactElement } from "react";
import DbdRole from "@/lib/dbdRole";
import { match } from "ts-pattern";

export default function TopBar(): ReactElement {
  const segment: string | null = useSelectedLayoutSegment();
  const role: DbdRole = match(segment)
    .with("killer", () => DbdRole.killer)
    .with("survivor", () => DbdRole.survivor)
    .with(null, () => {
      throw new Error("Expected segment to be defined");
    })
    .otherwise(() => {
      throw new Error(`Unexpected segment: ${segment}`);
    });

  return (
    <header className="sticky col-span-full col-start-1 flex h-12 w-dvw items-center justify-self-center border-b border-white/10 px-4 shadow-lg">
      {/* Home Button */}
      <Link
        href="/"
        aria-label="Home"
        title="Home"
        className="shrink-0 transition active:scale-95 hover:text-main-medium"
      >
        <LucideHome size={20} />
      </Link>

      <RoleSwitcher
        role={role}
        killerLink="/roulette/killer"
        survivorLink="/roulette/survivor"
        className="grow pr-5"
      />
    </header>
  );
}
