import DbdRole from "./dbdRole";
import { isEnumValue } from "./utils";
import { match } from "ts-pattern";
import type { Route } from "next";

const enum LocalStorageKey {
  lastSettingsRole = "lastSettingsRole",
  lastKillerSettingsTab = "lastKillerSettingsTab",
  lastSurvivorSettingsTab = "lastSurvivorSettingsTab",
}

export enum SettingsTab {
  character = "character",
  perks = "perks",
  addOns = "addOns",
  offerings = "offerings",
}

/**
 * Get the last role accessed in the settings.
 */
export function getLastRole(): DbdRole {
  const storedValue: string | null = localStorage.getItem(
    LocalStorageKey.lastSettingsRole,
  );

  if (storedValue === null) return DbdRole.killer;

  if (isEnumValue(DbdRole, storedValue)) return storedValue;

  localStorage.setItem(LocalStorageKey.lastSettingsRole, DbdRole.killer);
  return DbdRole.killer;
}

/**
 * Get the route for the last settings tab accessed for the given role.
 */
export function getLastSettingsTabRoute(role: DbdRole): Route {
  const storedValue: string | null = localStorage.getItem(
    match(role)
      .with(DbdRole.killer, () => LocalStorageKey.lastKillerSettingsTab)
      .with(DbdRole.survivor, () => LocalStorageKey.lastSurvivorSettingsTab)
      .exhaustive(),
  );

  if (storedValue !== null && isEnumValue(SettingsTab, storedValue)) {
    return match(role)
      .returnType<Route>()
      .with(DbdRole.killer, () =>
        match(storedValue)
          .returnType<Route>()
          .with(SettingsTab.character, () => "/settings/killer/killers")
          .with(SettingsTab.perks, () => "/settings/killer/perks")
          .with(SettingsTab.addOns, () => "/settings/killer/add-ons")
          .with(SettingsTab.offerings, () => "/settings/killer/offerings")
          .exhaustive(),
      )
      .with(DbdRole.survivor, () =>
        match(storedValue)
          .returnType<Route>()
          .with(SettingsTab.character, () => "/settings/survivor/survivors")
          .with(SettingsTab.perks, () => "/settings/survivor/perks")
          .with(
            SettingsTab.addOns,
            () => "/settings/survivor/items-and-add-ons",
          )
          .with(SettingsTab.offerings, () => "/settings/survivor/offerings")
          .exhaustive(),
      )
      .exhaustive();
  }

  saveLastTab(role, SettingsTab.character);
  return match(role)
    .returnType<Route>()
    .with(DbdRole.killer, () => "/settings/killer/killers")
    .with(DbdRole.survivor, () => "/settings/survivor/survivors")
    .exhaustive();
}

/**
 * Store the last role and tab accessed in local storage.
 */
export function saveLastTab(role: DbdRole, tab: SettingsTab): void {
  localStorage.setItem(LocalStorageKey.lastSettingsRole, role);
  localStorage.setItem(
    match(role)
      .with(DbdRole.killer, () => LocalStorageKey.lastKillerSettingsTab)
      .with(DbdRole.survivor, () => LocalStorageKey.lastSurvivorSettingsTab)
      .exhaustive(),
    tab,
  );
}

/**
 * Configuration for randomizing a loadout.
 */
export interface LoadoutConfig {
  id?: number;
  lastUsed: Date;
  name: string;
  role: DbdRole;
  disabledEntities: Record<ConfigEntity, Set<number>>;
}

export enum ConfigEntity {
  characters = "characters",
  itemTypes = "itemTypes",
  items = "items",
  addOns = "addOns",
  offerings = "offerings",
  perks = "perks",
}
