"use client";

import DbdRole from "@/lib/dbdRole";
import { saveLastTab, SettingsTab } from "@/lib/settings";
import { type Route } from "next";
import { usePathname } from "next/navigation";
import { type ReactElement, useEffect } from "react";
import { match } from "ts-pattern";

export default function StoreLastAccessed(): ReactElement {
  const pathname = usePathname() as Route;

  useEffect(() => {
    match(pathname)
      .with("/settings/survivor/survivors", () => {
        saveLastTab(DbdRole.survivor, SettingsTab.character);
      })
      .with("/settings/survivor/perks", () => {
        saveLastTab(DbdRole.survivor, SettingsTab.perks);
      })
      .with("/settings/survivor/items-and-add-ons", () => {
        saveLastTab(DbdRole.survivor, SettingsTab.addOns);
      })
      .with("/settings/survivor/offerings", () => {
        saveLastTab(DbdRole.survivor, SettingsTab.offerings);
      })
      .with("/settings/survivor/loadout", () => {
        saveLastTab(DbdRole.survivor, SettingsTab.loadout);
      })
      .otherwise(() => {
        throw new Error(`Unexpected pathname: ${pathname}`);
      });
  }, [pathname]);

  return <></>;
}
