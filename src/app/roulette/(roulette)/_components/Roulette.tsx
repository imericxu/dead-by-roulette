"use client";

import StyledButton from "@/components/StyledButton";
import useLoadoutConfigs from "@/hooks/useLoadoutConfigs";
import DbdRole from "@/lib/dbdRole";
import Loadout, { LoadoutPart } from "@/lib/loadout";
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
import { LoadoutConfig } from "@/lib/settings";
import Image from "next/image";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { Button } from "react-aria-components";
import { match } from "ts-pattern";
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
    <main className="col-span-full col-start-1 grid grid-cols-subgrid gap-y-4">
      {/* Mobile (Tabbed) */}
      <MobileRoulette
        role={role}
        loadout={loadout}
        randomizeHandler={randomizeHandler}
      />

      {/* Desktop */}
      {loadout !== null && (
        <div className="col-span-full col-start-1 hidden w-fit grid-cols-[auto_min-content_max-content_min-content_max-content] grid-rows-[max-content_min-content_max-content] justify-self-center sm:grid">
          {/* Character */}
          <StyledButton className="relative col-start-1 row-span-full h-full w-48">
            <Image
              src={loadout.character.bigImg}
              alt=""
              fill
              priority
              sizes="192px"
              className="object-cover"
            />
          </StyledButton>
          {/* Ability and Add-Ons */}
          <div className="col-start-3 row-start-1 flex items-end gap-2">
            {/* Ability */}
            <StyledButton className="h-fit w-fit p-0">
              <Image
                src={loadout.ability.img}
                alt=""
                width={100}
                height={100}
              />
            </StyledButton>
            {/* Add-Ons */}
            <div className="flex shrink-0">
              {loadout.addOns.map((addOn) => (
                <Image
                  key={addOn.id}
                  src={addOn.img}
                  alt=""
                  width={80}
                  height={80}
                  className="shrink-0 border"
                />
              ))}
            </div>
          </div>
          {/* Offering */}
          <div className="col-start-5 row-start-1">
            <Image src={loadout.offering.img} alt="" width={100} height={100} />
          </div>
          {/* Perks */}
          <div className="col-start-3 col-end-[-1] row-start-3 flex gap-2">
            {loadout.perks.map((perk) => (
              <Button
                key={perk.id}
                className="clip-diamond flex h-[96px] w-[96px] items-center justify-center bg-main-light pressed:bg-main-heavy"
              >
                <div className="clip-diamond relative h-[92px] w-[92px] bg-orange-700">
                  <Image
                    src={perk.img}
                    alt=""
                    fill
                    sizes="92px"
                    className="scale-105 object-cover"
                  />
                </div>
              </Button>
            ))}
          </div>

          {/* Dividers */}
          {/* Character | Rest of Content */}
          <div className="col-start-2 row-span-full row-start-1 mx-4 h-full w-px bg-gradient-to-b from-transparent via-main-light to-transparent"></div>
          {/* Add-Ons | Offering */}
          <div className="col-start-4 row-start-1 mx-4 h-full w-px bg-gradient-to-b from-transparent via-main-light to-transparent"></div>
          {/* Perks | Rest of Content */}
          <div className="col-start-3 col-end-[-1] row-start-2 my-4 h-px w-full bg-gradient-to-r from-transparent via-main-light to-transparent"></div>
        </div>
      )}

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
