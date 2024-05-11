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
import { Timeout } from "@/lib/utils";
import {
  ReactElement,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { match } from "ts-pattern";
import DesktopRoulette from "./DesktopRoulette";
import LoadMobileRoulette from "./LoadMobileRoulette";
import MobileRoulette from "./MobileRoulette";

const RANDOMIZE_INTERVAL_MS = 500;

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

  const [canRandomize, setCanRandomize] = useState(true);
  const [, setRandomizeTimeout] = useState<Timeout | null>(null);

  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setIsShiftPressed(true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setIsShiftPressed(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const [loadout, setLoadout] = useState<Loadout | null>(null);

  useEffect(() => {
    if (config !== undefined) {
      setLoadout(randomizeLoadout(config, role));
    }
  }, [config, role]);

  const randomizeHandler = useCallback(
    (loadoutPart: LoadoutPart, idx?: number): void => {
      if (config === undefined) throw Error("Config is undefined");
      if (!canRandomize) return;
      setCanRandomize(false);
      setRandomizeTimeout((prev) => {
        if (prev !== null) clearTimeout(prev);
        return setTimeout(() => {
          setCanRandomize(true);
          setRandomizeTimeout(null);
        }, RANDOMIZE_INTERVAL_MS);
      });
      setLoadout((prev) => {
        if (prev === null) throw Error("Previous loadout is null");
        return match(loadoutPart)
          .with(LoadoutPart.all, () => randomizeLoadout(config, role))
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
    [config, role, canRandomize],
  );

  return (
    <main className="col-span-full col-start-1 grid grid-cols-subgrid gap-y-4 sm:gap-y-8">
      {/* Visible under sm size */}
      <Suspense fallback={<LoadMobileRoulette />}>
        <MobileRoulette
          role={role}
          loadout={loadout}
          randomizeHandler={randomizeHandler}
          canRandomize={canRandomize}
          isShiftPressed={isShiftPressed}
        />
      </Suspense>

      {/* Visible above sm size */}
      <DesktopRoulette
        role={role}
        loadout={loadout}
        randomizeHandler={randomizeHandler}
        canRandomize={canRandomize}
        isShiftPressed={isShiftPressed}
      />

      {/* Randomize Button */}
      <StyledButton
        onPress={() => {
          randomizeHandler(LoadoutPart.all);
        }}
        className={twMerge(
          "col-span-full col-start-1 w-[min(100%,320px)] justify-self-center",
          !canRandomize && "hover:bg-transparent pressed:border-main-light",
        )}
      >
        Randomize
      </StyledButton>
    </main>
  );
}
