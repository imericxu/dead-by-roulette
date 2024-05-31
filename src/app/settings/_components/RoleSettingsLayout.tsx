"use client";

import ConfigSelect from "@/app/settings/_components/ConfigSelect";
import EffectStoreLastTab from "@/app/settings/_components/EffectStoreLastTab";
import LinkTabber from "@/app/settings/_components/LinkTabber";
import ConfigContext from "@/components/ConfigContext";
import useConfigs from "@/hooks/useConfigs";
import DbdRole from "@/lib/dbdRole";
import { Config } from "@/lib/config";
import { SettingsTab } from "@/lib/settings";
import { type Route } from "next";
import type { ReactElement, ReactNode } from "react";
import { match } from "ts-pattern";

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

/**
 * Common layout for the settings pages.
 *
 * Content up to the config drop down.
 */
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

  const configs: Config[] | undefined = useConfigs(props.role);

  return (
    <>
      <EffectStoreLastTab role={props.role} />
      <p className="col-span-full inline-block w-fit justify-self-center bg-black px-2 py-1 text-center">
        🚧 Under construction 🚧
      </p>
      <LinkTabber
        layoutRoute={layoutRoute}
        tabs={tabs}
        className="col-span-full w-dvw max-w-fit justify-self-center"
      />
      <ConfigContext.Provider value={configs ? configs[0] : null}>
        <main
          id="main"
          className="col-span-full col-start-1 grid grid-cols-subgrid gap-y-4"
        >
          <ConfigSelect
            configs={configs}
            className="col-span-full col-start-1"
          />
          {props.children}
        </main>
      </ConfigContext.Provider>
    </>
  );
}
