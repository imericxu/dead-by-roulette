"use client";

import { getLastRole, getLastSettingsTab, SettingsTab } from "@/lib/settings";
import { type Route } from "next";
import { redirect, useSearchParams } from "next/navigation";
import { type ReactElement, useEffect } from "react";
import DbdRole from "@/lib/dbdRole";
import { match } from "ts-pattern";

export default function GoToLastAccessedSettings(): ReactElement {
  const searchParams = useSearchParams();
  const returnUrl: string | null = searchParams.get("return");

  // Redirect to the last accessed settings page
  useEffect(() => {
    const redirectRoute: Route = match(getLastRole())
      .with(DbdRole.killer, (role) =>
        match(getLastSettingsTab(role))
          .returnType<Route>()
          .with(SettingsTab.character, () => "/settings/killer/killers")
          .with(SettingsTab.perks, () => "/settings/killer/perks")
          .with(SettingsTab.addOns, () => "/settings/killer/add-ons")
          .with(SettingsTab.offerings, () => "/settings/killer/offerings")
          .with(SettingsTab.loadout, () => "/settings/killer/loadout")
          .exhaustive(),
      )
      .with(DbdRole.survivor, (role) =>
        match(getLastSettingsTab(role))
          .returnType<Route>()
          .with(SettingsTab.character, () => "/settings/survivor/survivors")
          .with(SettingsTab.perks, () => "/settings/survivor/perks")
          .with(
            SettingsTab.addOns,
            () => "/settings/survivor/items-and-add-ons",
          )
          .with(SettingsTab.offerings, () => "/settings/survivor/offerings")
          .with(SettingsTab.loadout, () => "/settings/survivor/loadout")
          .exhaustive(),
      )
      .exhaustive();
    redirect(
      returnUrl === null
        ? redirectRoute
        : `${redirectRoute}?return=${returnUrl}`,
    );
  }, [returnUrl]);

  return <></>;
}
