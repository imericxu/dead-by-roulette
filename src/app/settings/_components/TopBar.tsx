"use client";

import RoleSwitcher from "@/components/RoleSwitcher";
import DbdRole from "@/lib/dbdRole";
import { buildReturnUrl } from "@/lib/utils";
import { LucideArrowLeft, LucideHome } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import type { ReactElement } from "react";
import { match } from "ts-pattern";

export default function TopBar(): ReactElement {
  const role: DbdRole | null = match(useSelectedLayoutSegment())
    .with(null, () => null)
    .with("killer", () => DbdRole.killer)
    .with("survivor", () => DbdRole.survivor)
    .otherwise((value) => {
      throw new Error(`Unexpected segment: ${value}`);
    });
  const returnUrl: string | null = useSearchParams().get("return");

  return (
    <header className="sticky col-span-full flex h-12 w-dvw items-center justify-self-center border-b border-white/10 px-4 shadow-lg">
      {/* Either a back or home button based on return URL */}
      <Link
        href={(returnUrl as Route) ?? "/"}
        title={returnUrl !== null ? "Back" : "Home"}
        className="shrink-0 transition active:scale-95 hover:text-white/75"
      >
        {returnUrl !== null ? (
          <LucideArrowLeft size={20} />
        ) : (
          <LucideHome size={20} />
        )}
      </Link>

      {/*
      Title/Nav
      - Shows "Settings" if on /settings
      - Otherwise, shows "Killer" and "Survivor" links
      */}
      <div className="inline-flex grow items-center justify-center pr-5 text-lg">
        {role === null ? (
          <span className="font-semibold">Settings</span>
        ) : (
          <RoleSwitcher
            role={role}
            killerLink={buildReturnUrl("/settings/killer", returnUrl)}
            survivorLink={buildReturnUrl("/settings/survivor", returnUrl)}
          />
        )}
      </div>
    </header>
  );
}
