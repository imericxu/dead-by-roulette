"use client";

import DbdRole from "@/lib/dbdRole";
import { SettingsTab, saveLastTab } from "@/lib/settings";
import { type Route } from "next";
import { usePathname } from "next/navigation";
import { type ReactElement, useEffect } from "react";
import { match } from "ts-pattern";

export default function StoreLastAccessed(): ReactElement {
  const pathname: Route = usePathname() as Route;

  useEffect(() => {
    match(pathname)
      .with("/settings/killer/killers", () => {
        saveLastTab(DbdRole.killer, SettingsTab.character);
      })
      .with("/settings/killer/perks", () => {
        saveLastTab(DbdRole.killer, SettingsTab.perks);
      })
      .with("/settings/killer/add-ons", () => {
        saveLastTab(DbdRole.killer, SettingsTab.addOns);
      })
      .with("/settings/killer/offerings", () => {
        saveLastTab(DbdRole.killer, SettingsTab.offerings);
      })
      .with("/settings/killer/loadout", () => {
        saveLastTab(DbdRole.killer, SettingsTab.loadout);
      })
      .otherwise(() => {
        throw new Error(`Unexpected pathname: ${pathname}`);
      });
  }, [pathname]);

  return <></>;
}
