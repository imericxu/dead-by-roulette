import { type ConfigEntity, LoadoutConfig } from "@/lib/settings";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import DbdRole from "@/lib/dbdRole";
import { useEffect, useMemo } from "react";

export interface ConfigManager {
  addConfig: (name: string) => Promise<void>;
  deleteConfig: (id: number) => Promise<void>;
  selectConfig: (id: number) => Promise<void>;
  enableEntity: (
    configId: number,
    entity: ConfigEntity,
    entityId: number,
  ) => Promise<void>;
  disableEntity: (
    configId: number,
    entity: ConfigEntity,
    entityId: number,
  ) => Promise<void>;
}

export default function useLoadoutConfigs(role: DbdRole): {
  configs: LoadoutConfig[] | undefined;
  configManager: ConfigManager;
} {
  const configs = useLiveQuery(
    async () =>
      await db.config
        .orderBy("lastUsed")
        .reverse()
        .filter((config) => config.role === role)
        .toArray(),
  );

  const configManager: ConfigManager = useMemo(
    () => ({
      addConfig: async (name: string): Promise<void> => {
        await db.config.add({
          lastUsed: new Date(),
          name,
          role,
          disabledEntities: {
            characters: new Set<number>(),
            itemTypes: new Set<number>(),
            items: new Set<number>(),
            addOns: new Set<number>(),
            offerings: new Set<number>(),
            perks: new Set<number>(),
          },
        });
      },
      deleteConfig: async (id: number): Promise<void> => {
        await db.config.delete(id);
      },
      selectConfig: async (id: number): Promise<void> => {
        await db.config.update(id, { lastUsed: new Date() });
      },
      enableEntity: async (
        configId: number,
        entity: ConfigEntity,
        entityId: number,
      ): Promise<void> => {
        const config = await db.config.get(configId);
        if (config === undefined) throw new Error("Config not found");
        config.disabledEntities[entity].delete(entityId);
        await db.config.put(config);
      },
      disableEntity: async (
        configId: number,
        entity: ConfigEntity,
        entityId: number,
      ): Promise<void> => {
        const config = await db.config.get(configId);
        if (config === undefined) throw new Error("Config not found");
        config.disabledEntities[entity].add(entityId);
        await db.config.put(config);
      },
    }),
    [role],
  );

  useEffect(() => {
    if (configs === undefined) return;
    if (configs.length === 0) {
      void configManager.addConfig("Default");
    }
  }, [configManager, configs]);

  return { configs, configManager };
}
