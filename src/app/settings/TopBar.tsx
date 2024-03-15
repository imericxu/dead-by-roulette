"use client";

import RoleSwitcher from "@/components/RoleSwitcher";
import DbdRole from "@/lib/dbdRole";
import { buildReturnUrl, isSubRouteOf } from "@/lib/utils";
import { LucideArrowLeft, LucideHome } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ReactElement } from "react";

export default function TopBar(): ReactElement {
  const pathname = usePathname() as Route;
  const role: DbdRole | null = (() => {
    if (isSubRouteOf("/settings/killer", pathname)) return DbdRole.killer;
    if (isSubRouteOf("/settings/survivor", pathname)) return DbdRole.survivor;
    return null;
  })();

  const searchParams = useSearchParams();
  const returnUrl: string | null = searchParams.get("return");

  return (
    <header className="sticky flex h-12 w-full items-center border-b border-white/10 px-4 shadow-lg">
      {/* Either a back or home button based on return URL */}
      <Link
        href={(returnUrl as Route) ?? "/"}
        title={returnUrl !== null ? "Back" : "Home"}
        className="shrink-0 transition hover:text-white/75 active:scale-95"
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
