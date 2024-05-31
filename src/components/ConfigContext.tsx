import { ReactElement, createContext, useEffect, useState } from "react";
import { Config, getSelectedConfig } from "@/lib/config";
import DbdRole from "@/lib/dbdRole";

/**
 * Context for the configuration of the app.
 *
 * null means that the configuration is not loaded yet.
 * undefined means that the configuration is not available.
 */
const ConfigContext = createContext<Config | null | undefined>(undefined);

export interface ConfigProviderProps {
  role: Readonly<DbdRole>;
  children?: Readonly<ReactElement>;
}

export function ConfigProvider({
  role,
  children,
}: ConfigProviderProps): ReactElement {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    getSelectedConfig(role)
      .then((config) => {
        setConfig(config);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [role]);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}

export default ConfigContext;
