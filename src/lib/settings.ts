import DbdRole from "./dbdRole";
import { isEnumValue } from "./utils";
import { match } from "ts-pattern";

const enum LocalStorageKey {
  lastSettingsRole = "lastSettingsRole",
  lastKillerSettingsTab = "lastKillerSettingsTab",
  lastSurvivorSettingsTab = "lastSurvivorSettingsTab",
  loadoutConfig = "loadoutConfig",
}

export enum SettingsTab {
  character = "character",
  perks = "perks",
  addOns = "addOns",
  offerings = "offerings",
  loadout = "loadout",
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
 * Get the last settings tab accessed for the given role.
 */
export function getLastSettingsTab(role: DbdRole): SettingsTab {
  const storedValue: string | null = localStorage.getItem(
    match(role)
      .with(DbdRole.killer, () => LocalStorageKey.lastKillerSettingsTab)
      .with(DbdRole.survivor, () => LocalStorageKey.lastSurvivorSettingsTab)
      .exhaustive(),
  );

  if (storedValue === null) return SettingsTab.character;

  if (isEnumValue(SettingsTab, storedValue)) return storedValue;

  saveLastTab(role, SettingsTab.character);
  return SettingsTab.character;
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
  disabledEntities: Record<ConfigEntity, Set<number>>;
}

enum ConfigEntity {
  characters = "characters",
  itemTypes = "itemTypes",
  items = "items",
  addOns = "addOns",
  offerings = "offerings",
  perks = "perks",
}

function createLoadoutConfig(): LoadoutConfig {
  return {
    disabledEntities: {
      characters: new Set<number>(),
      itemTypes: new Set<number>(),
      items: new Set<number>(),
      addOns: new Set<number>(),
      offerings: new Set<number>(),
      perks: new Set<number>(),
    },
  };
}

export function getLoadoutConfig(): LoadoutConfig {
  const storedValue: string | null = localStorage.getItem(
    LocalStorageKey.loadoutConfig,
  );
  if (storedValue === null) return createLoadoutConfig();
  return JSON.parse(storedValue);
}

export function saveLoadoutConfig(config: LoadoutConfig): void {
  localStorage.setItem(LocalStorageKey.loadoutConfig, JSON.stringify(config));
}

export function resetLoadoutConfig(): void {
  localStorage.removeItem(LocalStorageKey.loadoutConfig);
}

export function disableEntity(
  config: LoadoutConfig,
  entity: ConfigEntity,
  id: number,
): void {
  config.disabledEntities[entity].add(id);
}

export function enableEntity(
  config: LoadoutConfig,
  entity: ConfigEntity,
  id: number,
): void {
  config.disabledEntities[entity].delete(id);
}
