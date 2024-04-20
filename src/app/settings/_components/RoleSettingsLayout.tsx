"use client";

import type { ReactElement, ReactNode } from "react";
import DbdRole from "@/lib/dbdRole";
import LinkTabber from "@/app/settings/_components/LinkTabber";
import { SettingsTab } from "@/lib/settings";
import { match } from "ts-pattern";
import { type Route } from "next";
import EffectStoreLastTab from "@/app/settings/_components/EffectStoreLastTab";
import { LoadoutConfigsContext } from "@/components/LoadoutConfigsProvider";
import useLoadoutConfigs from "@/hooks/useLoadoutConfigs";
import ConfigSelect from "@/app/settings/_components/ConfigSelect";

const KILLER_TABS: Record<
  Exclude<SettingsTab, "loadout">,
  { label: string; segment: string }
> = {
  character: { label: "Killers", segment: "killers" },
  perks: { label: "Perks", segment: "perks" },
  addOns: { label: "Add-ons", segment: "add-ons" },
  offerings: { label: "Offerings", segment: "offerings" },
};

const SURVIVOR_TABS: Record<
  Exclude<SettingsTab, "loadout">,
  { label: string; segment: string }
> = {
  character: { label: "Survivors", segment: "survivors" },
  perks: { label: "Perks", segment: "perks" },
  addOns: { label: "Items & Add-ons", segment: "items-and-addons" },
  offerings: { label: "Offerings", segment: "offerings" },
};

export interface SettingsPageProps {
  children?: Readonly<ReactNode>;
  role: DbdRole;
}

export default function RoleSettingsLayout(
  props: SettingsPageProps,
): ReactElement {
  const layoutRoute: Route = match(props.role)
    .returnType<Route>()
    .with(DbdRole.killer, () => "/settings/killer")
    .with(DbdRole.survivor, () => "/settings/survivor")
    .exhaustive();
  const tabs = Object.values(
    match(props.role)
      .with(DbdRole.killer, () => KILLER_TABS)
      .with(DbdRole.survivor, () => SURVIVOR_TABS)
      .exhaustive(),
  );

  const { configs, configManager } = useLoadoutConfigs(props.role);

  return (
    <>
      <EffectStoreLastTab role={props.role} />
      <LinkTabber
        layoutRoute={layoutRoute}
        tabs={tabs}
        className="col-span-full w-dvw max-w-fit justify-self-center"
      />
      <LoadoutConfigsContext.Provider value={{ configs, configManager }}>
        <main
          id="main"
          className="col-span-full col-start-1 grid grid-cols-subgrid gap-y-4"
        >
          {" "}
          <ConfigSelect
            configs={configs}
            configManager={configManager}
            className="col-span-full col-start-1"
          />
          {props.children}
        </main>
      </LoadoutConfigsContext.Provider>
    </>
  );
}
