"use client";

import StyledButton from "@/components/StyledButton";
import useLoadoutConfigs from "@/hooks/useLoadoutConfigs";
import DbdRole from "@/lib/dbdRole";
import type Loadout from "@/lib/loadout";
import { LoadoutPart } from "@/lib/loadout";
import {
  randomizeAbility,
  randomizeAddOn,
  randomizeAddOns,
  randomizeCharacter,
  randomizeLoadout,
  randomizeOffering,
  randomizePerk,
  randomizePerks,
} from "@/lib/randomize";
import { type LoadoutConfig } from "@/lib/settings";
import {
  ReactElement,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import { match } from "ts-pattern";
import DesktopRoulette from "./DesktopRoulette";
import LoadMobileRoulette from "./LoadMobileRoulette";
import MobileRoulette from "./MobileRoulette";

export enum RouletteTab {
  character = "character",
  perks = "perks",
  addOns = "add-ons",
  offerings = "offering",
}

export interface RouletteProps {
  role: DbdRole;
}

export default function Roulette({ role }: RouletteProps): ReactElement {
  const configsContext = useLoadoutConfigs(role);
  if (configsContext === undefined) {
    throw new Error("LoadoutConfigsContext is undefined");
  }
  const config: LoadoutConfig | undefined = configsContext?.configs?.at(0);

  const [loadout, setLoadout] = useState<Loadout | null>(null);

  useEffect(() => {
    if (config !== undefined) {
      setLoadout(randomizeLoadout(config, role));
    }
  }, [config, role]);

  const randomizeHandler = useCallback(
    (loadoutPart: LoadoutPart, idx?: number): void => {
      if (config === undefined) throw Error("Config is undefined");
      setLoadout((prev) => {
        if (prev === null) throw Error("Previous loadout is null");
        return match(loadoutPart)
          .with(LoadoutPart.character, () =>
            randomizeCharacter(config, role, prev),
          )
          .with(LoadoutPart.ability, () => randomizeAbility(config, role, prev))
          .with(LoadoutPart.addOns, () => randomizeAddOns(config, role, prev))
          .with(LoadoutPart.addOn, () => {
            if (idx === undefined) throw Error("Index is undefined");
            return randomizeAddOn(config, role, prev, idx);
          })
          .with(LoadoutPart.offering, () =>
            randomizeOffering(config, role, prev),
          )
          .with(LoadoutPart.perks, () => randomizePerks(config, role, prev))
          .with(LoadoutPart.perk, () => {
            if (idx === undefined) throw Error("Index is undefined");
            return randomizePerk(config, role, prev, idx);
          })
          .exhaustive();
      });
    },
    [config, role],
  );

  return (
    <main className="col-span-full col-start-1 grid grid-cols-subgrid gap-y-4 sm:gap-y-8">
      {/* Visible under sm size */}
      <Suspense fallback={<LoadMobileRoulette />}>
        <MobileRoulette
          role={role}
          loadout={loadout}
          randomizeHandler={randomizeHandler}
        />
      </Suspense>

      {/* Visible above sm size */}
      <DesktopRoulette
        role={role}
        loadout={loadout}
        randomizeHandler={randomizeHandler}
      />

      {/* Randomize Button */}
      <StyledButton
        onPress={() => {
          if (config === undefined) throw Error("Config is undefined");
          setLoadout(randomizeLoadout(config, role));
        }}
        className="col-span-full col-start-1 w-[min(100%,320px)] justify-self-center"
      >
        Randomize
      </StyledButton>
    </main>
  );
}
