import { addConfig, type Config } from "@/lib/config";
import { db } from "@/lib/db";
import type DbdRole from "@/lib/dbdRole";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";

export default function useConfigs(role: DbdRole): Config[] | undefined {
  const [isVerified, setVerified] = useState(false);
  const configs = useLiveQuery(
    async () =>
      await db.config
        .orderBy("lastUsed")
        .reverse()
        .filter((config) => config.role === role)
        .toArray(),
  );

  useEffect(() => {
    if (isVerified || configs === undefined) return;
    if (configs.length === 0) {
      void addConfig("Default", role);
    }
    setVerified(true);
  }, [configs, isVerified, role]);

  if (configs === undefined || configs.length === 0) return undefined;
  return configs;
}
