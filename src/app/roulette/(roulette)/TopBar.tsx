"use client";

import RoleSwitcher from "@/components/RoleSwitcher";
import { LucideHome } from "lucide-react";
import { type Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactElement } from "react";
import DbdRole from "@/lib/dbdRole";
import { match } from "ts-pattern";

export default function TopBar(): ReactElement {
  const pathname = usePathname() as Route;
  const role: DbdRole = match(pathname)
    .with("/roulette/killer", () => DbdRole.killer)
    .with("/roulette/survivor", () => DbdRole.survivor)
    .otherwise(() => {
      throw new Error(`Unexpected pathname: ${pathname}`);
    });

  return (
    <header className="sticky flex h-12 w-full items-center border-b border-white/10 px-4 shadow-lg">
      {/* Home Button */}
      <Link
        href="/"
        aria-label="Home"
        title="Home"
        className="shrink-0 transition hover:text-white/75 active:scale-95"
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
