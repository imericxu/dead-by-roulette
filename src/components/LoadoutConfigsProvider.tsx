import { createContext, ReactElement, ReactNode } from "react";
import DbdRole from "@/lib/dbdRole";
import useLoadoutConfigs, { ConfigManager } from "@/hooks/useLoadoutConfigs";
import { LoadoutConfig } from "@/lib/settings";

export const LoadoutConfigsContext = createContext<
  | {
      configs: LoadoutConfig[] | undefined;
      configManager: ConfigManager;
    }
  | undefined
>(undefined);

export interface LoadoutConfigsProviderProps {
  children: Readonly<ReactNode>;
  role: DbdRole;
}

export default function LoadoutConfigsProvider(
  props: LoadoutConfigsProviderProps,
): ReactElement {
  const { configs, configManager } = useLoadoutConfigs(props.role);

  return (
    <LoadoutConfigsContext.Provider value={{ configs, configManager }}>
      {props.children}
    </LoadoutConfigsContext.Provider>
  );
}
