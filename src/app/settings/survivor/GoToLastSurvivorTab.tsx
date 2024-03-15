"use client";

import Role from "@/lib/dbdRole";
import { getLastSettingsTab, SettingsTab } from "@/lib/settings";
import { type Route } from "next";
import {
  type ReadonlyURLSearchParams,
  redirect,
  useSearchParams,
} from "next/navigation";
import { type ReactElement, useEffect } from "react";
import { match } from "ts-pattern";

export default function GoToLastSurvivorTab(): ReactElement {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const returnUrl: string | null = searchParams.get("return");

  useEffect(() => {
    const lastTab: SettingsTab = getLastSettingsTab(Role.survivor);
    const route: Route = match(lastTab)
      .returnType<Route>()
      .with(SettingsTab.character, () => "/settings/survivor/survivors")
      .with(SettingsTab.perks, () => "/settings/survivor/perks")
      .with(SettingsTab.addOns, () => "/settings/survivor/items-and-add-ons")
      .with(SettingsTab.offerings, () => "/settings/survivor/offerings")
      .with(SettingsTab.loadout, () => "/settings/survivor/loadout")
      .exhaustive();
    redirect(returnUrl === null ? route : `${route}?return=${returnUrl}`);
  }, [returnUrl]);

  return <></>;
}
