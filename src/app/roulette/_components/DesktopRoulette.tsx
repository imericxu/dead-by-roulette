"use client";

import LoadDetectImage from "@/components/LoadDetectImage";
import { type Item } from "@/lib/dbd";
import DbdRole from "@/lib/dbdRole";
import type Loadout from "@/lib/loadout";
import { LoadoutPart } from "@/lib/loadout";
import rarityBg from "@/lib/variants/rarityBg";
import { useState, type ReactElement } from "react";
import { Button } from "react-aria-components";
import { twJoin, twMerge } from "tailwind-merge";
import { match } from "ts-pattern";

export interface DesktopRouletteProps {
  role: DbdRole;
  loadout: Loadout | null;
  randomizeHandler: (part: LoadoutPart, idx?: number) => void;
}

export default function DesktopRoulette({
  role,
  loadout,
  randomizeHandler,
}: DesktopRouletteProps): ReactElement {
  const [characterHovered, setCharacterHovered] = useState(false);
  const [characterPressed, setCharacterPressed] = useState(false);

  const [abilityHovered, setAbilityHovered] = useState(false);
  const [abilityPressed, setAbilityPressed] = useState(false);

  const [addOnsHovered, setAddOnsHovered] = useState(false);
  const [addOnsPressed, setAddOnsPressed] = useState(false);

  const [perksHovered, setPerksHovered] = useState(false);
  const [perksPressed, setPerksPressed] = useState(false);

  if (loadout === null) return <></>;
  return (
    <div className="col-span-full col-start-1 mt-4 hidden w-full max-w-[888px] grid-cols-[auto_min-content_max-content_min-content_max-content] grid-rows-[max-content_min-content_max-content] justify-self-center sm:grid">
      {/* Character */}
      <Button
        onPress={() => {
          randomizeHandler(LoadoutPart.character);
        }}
        onHoverChange={setCharacterHovered}
        onPressChange={setCharacterPressed}
        className={twMerge(
          "relative col-start-1 row-span-full h-[225px] w-full justify-self-end border border-main-light bg-gradient-to-b from-orange-950/80 to-stone-950/90 outline-0 transition focus-visible:outline-2 md:h-[257px]",
          (characterHovered || (role === DbdRole.killer && abilityHovered)) &&
            "brightness-125",
          (characterPressed || (role === DbdRole.killer && abilityPressed)) &&
            "border-main-heavy",
        )}
      >
        <LoadDetectImage
          src={`${loadout.character.bigImg}-264h.png`}
          alt=""
          width={0}
          height={0}
          priority
          className="pointer-events-none m-auto h-full w-auto overflow-hidden object-cover transition data-[loading=true]:opacity-0"
        />
      </Button>

      {/* Ability and Add-Ons */}
      <div className="col-start-3 row-start-1 flex items-end gap-4">
        {/* Ability */}
        <Button
          onPress={() => {
            randomizeHandler(LoadoutPart.ability);
          }}
          onHoverChange={setAbilityHovered}
          onPressChange={setAbilityPressed}
          aria-label={`Randomize ${role === DbdRole.killer ? "power" : "item"}`}
          className={twMerge(
            twJoin(
              "relative h-24 w-24 border border-main-light outline-0 transition focus-visible:outline-2 md:h-28 md:w-28",
              match(role)
                .with(
                  DbdRole.killer,
                  () => "bg-gradient-to-b from-orange-900 to-orange-950/80",
                )
                .with(DbdRole.survivor, () =>
                  rarityBg((loadout.ability as Item).rarity),
                )
                .exhaustive(),
            ),
            ((characterHovered && role === DbdRole.killer) || abilityHovered) &&
              "brightness-125",
            ((characterPressed && role === DbdRole.killer) || abilityPressed) &&
              "border-main-heavy",
          )}
        >
          <LoadDetectImage
            src={`${loadout.ability.img}-112w.png`}
            alt=""
            priority
            fill
            className="pointer-events-none transition data-[loading=true]:opacity-0"
          />
        </Button>

        {/* Add-Ons */}
        <div className="flex shrink-0 gap-2">
          {loadout.addOns.map((addOn) => (
            <Button
              key={addOn.id}
              onPress={() => {
                randomizeHandler(LoadoutPart.addOns);
              }}
              onHoverChange={setAddOnsHovered}
              onPressChange={setAddOnsPressed}
              className={twMerge(
                twJoin(
                  "relative h-20 w-20 border border-main-light outline-0 transition focus-visible:outline-2 md:h-24 md:w-24",
                  rarityBg(addOn.rarity),
                ),
                ((role === DbdRole.killer && characterHovered) ||
                  abilityHovered ||
                  addOnsHovered) &&
                  "brightness-125",
                ((role === DbdRole.killer && characterPressed) ||
                  abilityPressed ||
                  addOnsPressed) &&
                  "border-main-heavy",
              )}
            >
              <LoadDetectImage
                src={`${addOn.img}-96w.png`}
                alt=""
                fill
                priority
                className="pointer-events-none transition data-[loading=true]:opacity-0"
              />
            </Button>
          ))}
        </div>
      </div>

      {/* Offering */}
      <Button
        onPress={() => {
          randomizeHandler(LoadoutPart.offering);
        }}
        className="clip-hexagon col-start-5 row-start-1 h-24 w-[84px] bg-main-light p-[2px] transition hover:brightness-125 pressed:bg-main-heavy md:h-28 md:w-[105px]"
      >
        {/* Clipped Background */}
        <div
          className={twJoin(
            "clip-hexagon relative h-full w-full transition",
            rarityBg(loadout.offering.rarity),
          )}
        >
          <LoadDetectImage
            src={`${loadout?.offering.img}-144w.png`}
            alt=""
            fill
            priority
            className="pointer-events-none object-cover transition data-[loading=true]:opacity-0"
          />
        </div>
      </Button>

      {/* Perks */}
      <div className="col-start-3 col-end-[-1] row-start-3 flex gap-2">
        {loadout.perks.map((perk) => (
          <Button
            key={perk.id}
            onPress={() => {
              randomizeHandler(LoadoutPart.perks);
            }}
            onHoverChange={setPerksHovered}
            onPressChange={setPerksPressed}
            className={twMerge(
              "clip-diamond h-24 w-24 bg-main-light p-[2px] transition md:h-28 md:w-28",
              perksHovered && "brightness-125",
              perksPressed && "bg-main-heavy",
            )}
          >
            {/* Clipped Background */}
            <div className="clip-diamond relative h-full w-full bg-gradient-to-b from-orange-800 to-orange-950">
              <LoadDetectImage
                src={`${perk.img}-112w.png`}
                alt=""
                fill
                priority
                className="pointer-events-none scale-110 object-cover transition data-[loading=true]:opacity-0"
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
  );
}
