import { db } from "./db";
import DbdRole from "./dbdRole";

/**
 * Configuration for randomizing a loadout.
 */
export interface Config {
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

export async function getSelectedConfig(role: DbdRole): Promise<Config> {
  const count: number = await db.config.where("role").equals(role).count();
  let config: Config | undefined;

  if (count === 0) {
    const id = await addConfig("Default", role);
    config = await db.config.get(id);
  } else {
    config = await db.config
      .orderBy("lastUsed")
      .reverse()
      .filter((config) => config.role === role)
      .first();
  }

  if (config === undefined) throw new Error("Config not found");
  return config;
}

export async function addConfig(name: string, role: DbdRole): Promise<number> {
  return await db.config.add({
    lastUsed: new Date(),
    name,
    role,
    disabledEntities: {
      characters: new Set(),
      itemTypes: new Set(),
      items: new Set(),
      addOns: new Set(),
      offerings: new Set(),
      perks: new Set(),
    },
  });
}

export async function deleteConfig(id: number): Promise<void> {
  await db.config.delete(id);
}

export async function selectConfig(id: number): Promise<void> {
  await db.config.update(id, { lastUsed: new Date() });
}

export async function toggleEntity(
  config: Config,
  entity: ConfigEntity,
  entityId: number,
): Promise<void> {
  if (config.disabledEntities[entity].has(entityId)) {
    config.disabledEntities[entity].delete(entityId);
  } else {
    config.disabledEntities[entity].add(entityId);
  }
  await db.config.put(config);
}

export async function enableEntity(
  config: Config,
  entity: ConfigEntity,
  entityId: number,
): Promise<void> {
  config.disabledEntities[entity].delete(entityId);
  await db.config.put(config);
}

export async function disableEntity(
  config: Config,
  entity: ConfigEntity,
  entityId: number,
): Promise<void> {
  config.disabledEntities[entity].add(entityId);
  await db.config.put(config);
}
