"use client";

import DbdRole from "@/lib/dbdRole";
import { SettingsTab, getLastSettingsTab } from "@/lib/settings";
import { type Route } from "next";
import {
  type ReadonlyURLSearchParams,
  redirect,
  useSearchParams,
} from "next/navigation";
import { type ReactElement, useEffect } from "react";
import { match } from "ts-pattern";

export default function GoToLastKillerTab(): ReactElement {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const returnUrl: string | null = searchParams.get("return");

  useEffect(() => {
    const lastTab: SettingsTab = getLastSettingsTab(DbdRole.killer);
    const route: Route = match(lastTab)
      .returnType<Route>()
      .with(SettingsTab.character, () => "/settings/killer/killers")
      .with(SettingsTab.perks, () => "/settings/killer/perks")
      .with(SettingsTab.addOns, () => "/settings/killer/add-ons")
      .with(SettingsTab.offerings, () => "/settings/killer/offerings")
      .with(SettingsTab.loadout, () => "/settings/killer/loadout")
      .exhaustive();
    redirect(returnUrl === null ? route : `${route}?return=${returnUrl}`);
  }, [returnUrl]);

  return <></>;
}
