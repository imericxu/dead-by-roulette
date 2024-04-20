"use client";

import DbdRole from "@/lib/dbdRole";
import { saveLastTab, SettingsTab } from "@/lib/settings";
import { type ReactElement, useEffect } from "react";
import { match } from "ts-pattern";
import { useSelectedLayoutSegment } from "next/navigation";

export interface StoreLastAccessedProps {
  role: DbdRole;
}

export default function EffectStoreLastTab(
  props: StoreLastAccessedProps,
): ReactElement {
  const segment: string | null = useSelectedLayoutSegment();
  if (segment === null) throw new Error("There shouldn't be a page here.");

  useEffect(() => {
    saveLastTab(
      props.role,
      match(segment)
        .with("killers", () => SettingsTab.character)
        .with("survivors", () => SettingsTab.character)
        .with("perks", () => SettingsTab.perks)
        .with("add-ons", () => SettingsTab.addOns)
        .with("items-and-addons", () => SettingsTab.addOns)
        .with("offerings", () => SettingsTab.offerings)
        .otherwise(() => {
          throw new Error(`Unexpected segment: ${segment}`);
        }),
    );
  }, [props.role, segment]);

  return <></>;
}
