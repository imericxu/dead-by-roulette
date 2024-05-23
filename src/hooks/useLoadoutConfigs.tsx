import { db } from "@/lib/db";
import DbdRole from "@/lib/dbdRole";
import { LoadoutConfig, type ConfigEntity } from "@/lib/settings";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useMemo, useState } from "react";

export interface ConfigManager {
  addConfig: (name: string) => Promise<void>;
  deleteConfig: (id: number) => Promise<void>;
  selectConfig: (id: number) => Promise<void>;
  toggleEntity: (entity: ConfigEntity, entityId: number) => Promise<void>;
  enableEntity: (entity: ConfigEntity, entityId: number) => Promise<void>;
  disableEntity: (entity: ConfigEntity, entityId: number) => Promise<void>;
}

export default function useLoadoutConfigs(role: DbdRole): {
  configs: LoadoutConfig[] | undefined;
  configManager: ConfigManager;
} {
  const [isVerified, setVerified] = useState(false);
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
      toggleEntity: async (
        entity: ConfigEntity,
        entityId: number,
      ): Promise<void> => {
        if (configs === undefined) throw new Error("Configs not loaded");
        const config = configs[0];
        if (config.disabledEntities[entity].has(entityId)) {
          config.disabledEntities[entity].delete(entityId);
        } else {
          config.disabledEntities[entity].add(entityId);
        }
        await db.config.put(config);
      },
      enableEntity: async (
        entity: ConfigEntity,
        entityId: number,
      ): Promise<void> => {
        if (configs === undefined) throw new Error("Configs not loaded");
        const config = configs[0];
        config.disabledEntities[entity].delete(entityId);
        await db.config.put(config);
      },
      disableEntity: async (
        entity: ConfigEntity,
        entityId: number,
      ): Promise<void> => {
        if (configs === undefined) throw new Error("Configs not loaded");
        const config = configs[0];
        config.disabledEntities[entity].add(entityId);
        await db.config.put(config);
      },
    }),
    [configs, role],
  );

  useEffect(() => {
    if (isVerified || configs === undefined) return;
    if (configs.length === 0) {
      void configManager.addConfig("Default");
    }
    setVerified(true);
  }, [configManager, configs, isVerified]);

  return { configs, configManager };
}
