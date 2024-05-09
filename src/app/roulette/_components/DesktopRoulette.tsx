"use client";

import LoadDetectImage from "@/components/LoadDetectImage";
import DiamondOutline from "@/components/svg/DiamondOutline";
import HexagonOutline from "@/components/svg/HexagonOutline";
import { type Item } from "@/lib/dbd";
import DbdRole from "@/lib/dbdRole";
import type Loadout from "@/lib/loadout";
import { LoadoutPart } from "@/lib/loadout";
import { Timeout } from "@/lib/utils";
import rarityBg from "@/lib/variants/rarityBg";
import { useState, type ReactElement } from "react";
import { Button, Tooltip, TooltipTrigger } from "react-aria-components";
import { twJoin, twMerge } from "tailwind-merge";
import { match } from "ts-pattern";
import LoadDesktopRoulette from "./LoadDesktopRoulette";

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

  const [addOnsHoveredIdx, setAddOnsHoveredIdx] = useState<number | null>(null);
  const [addOnsPressedIdx, setAddOnsPressedIdx] = useState<number | null>(null);

  const [offeringHovered, setOfferingHovered] = useState(false);

  const [perksHoveredIdx, setPerksHoveredIdx] = useState<number | null>(null);
  const [perksPressedIdx, setPerksPressedIdx] = useState<number | null>(null);

  if (loadout === null) return <LoadDesktopRoulette />;
  return (
    <div className="col-span-full col-start-1 mt-4 hidden w-full max-w-[888px] grid-cols-[auto_min-content_max-content_min-content_max-content] grid-rows-[max-content_min-content_max-content] justify-self-center sm:grid">
      {/* Character */}
      <TooltipTrigger isOpen={characterHovered} delay={0} closeDelay={0}>
        <Button
          onPress={() => {
            randomizeHandler(LoadoutPart.character);
          }}
          onHoverChange={setCharacterHovered}
          onPressChange={setCharacterPressed}
          className={twMerge(
            "relative col-start-1 row-span-full h-[225px] w-full justify-self-end border-2 border-main-light bg-gradient-to-b from-orange-950/80 to-stone-950/90 outline-0 transition focus-visible:outline-2 md:h-[257px]",
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
        <Tooltip
          offset={8}
          placement="bottom"
          className="border border-main-light bg-black/75 px-4 py-2 backdrop-blur-sm"
        >
          {loadout.character.name}
        </Tooltip>
      </TooltipTrigger>

      {/* Ability and Add-Ons */}
      <div className="col-start-3 row-start-1 flex items-end gap-4">
        {/* Ability */}
        <TooltipTrigger isOpen={abilityHovered} delay={0} closeDelay={0}>
          <Button
            onPress={() => {
              randomizeHandler(LoadoutPart.ability);
            }}
            onHoverChange={setAbilityHovered}
            onPressChange={setAbilityPressed}
            aria-label={`Randomize ${
              role === DbdRole.killer ? "power" : "item"
            }`}
            className={twMerge(
              twJoin(
                "relative h-24 w-24 border-2 border-main-light outline-0 transition focus-visible:outline-2 md:h-28 md:w-28",
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
              ((characterHovered && role === DbdRole.killer) ||
                abilityHovered) &&
                "brightness-125",
              ((characterPressed && role === DbdRole.killer) ||
                abilityPressed) &&
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
          <Tooltip
            placement="bottom"
            offset={8}
            className="border border-main-light bg-black/75 px-4 py-2 backdrop-blur-sm"
          >
            {loadout.ability.name}
          </Tooltip>
        </TooltipTrigger>

        {/* Add-Ons */}
        <div className="flex shrink-0 gap-2">
          {loadout.addOns.map((addOn, idx) => (
            <TooltipTrigger
              key={addOn.id}
              isOpen={addOnsHoveredIdx === idx}
              delay={0}
              closeDelay={0}
            >
              <Button
                onPress={() => {
                  randomizeHandler(LoadoutPart.addOns);
                }}
                onHoverStart={() => {
                  setAddOnsHoveredIdx(idx);
                }}
                onHoverEnd={() => {
                  setAddOnsHoveredIdx(null);
                }}
                onPressStart={() => {
                  setAddOnsPressedIdx(idx);
                }}
                onPressEnd={() => {
                  setAddOnsPressedIdx(null);
                }}
                className={twMerge(
                  twJoin(
                    "relative h-20 w-20 border-2 border-main-light outline-0 transition focus-visible:outline-2 md:h-24 md:w-24",
                    rarityBg(addOn.rarity),
                  ),
                  ((role === DbdRole.killer && characterHovered) ||
                    abilityHovered ||
                    addOnsHoveredIdx !== null) &&
                    "brightness-125",
                  ((role === DbdRole.killer && characterPressed) ||
                    abilityPressed ||
                    addOnsPressedIdx !== null) &&
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
              <Tooltip
                placement="bottom"
                offset={8}
                className="flex flex-col items-center border border-main-light bg-black/75 px-4 py-2 backdrop-blur-sm"
              >
                <span>{loadout.addOns[idx].name}</span>
                <span className="text-sm opacity-75">
                  Hold shift to randomize a single add-on
                </span>
              </Tooltip>
            </TooltipTrigger>
          ))}
        </div>
      </div>

      {/* Offering */}
      <TooltipTrigger isOpen={offeringHovered} delay={0} closeDelay={0}>
        <Button
          onHoverChange={setOfferingHovered}
          onPress={() => {
            randomizeHandler(LoadoutPart.offering);
          }}
          className="group relative col-start-5 row-start-1 h-24 w-[84px] outline-0 transition hover:brightness-125 focus-visible:outline-2 md:h-28 md:w-[98px]"
        >
          {/* Background */}
          <div
            className={twJoin(
              "clip-hexagon h-full w-full",
              rarityBg(loadout.offering.rarity),
            )}
          ></div>
          {/* Border */}
          <HexagonOutline className="absolute inset-0 h-full w-full stroke-main-light stroke-[3px] transition group-pressed:stroke-main-heavy" />
          {/* Image */}
          <LoadDetectImage
            src={`${loadout?.offering.img}-144w.png`}
            alt=""
            fill
            priority
            className="pointer-events-none absolute object-cover transition data-[loading=true]:opacity-0"
          />
        </Button>
        <Tooltip
          placement="bottom"
          offset={8}
          className="border border-main-light bg-black/75 px-4 py-2 backdrop-blur-sm"
        >
          {loadout.offering.name}
        </Tooltip>
      </TooltipTrigger>

      {/* Perks */}
      <div className="col-start-3 col-end-[-1] row-start-3 flex gap-2">
        {loadout.perks.map((perk, idx) => (
          <TooltipTrigger
            key={perk.id}
            isOpen={perksHoveredIdx === idx}
            delay={0}
            closeDelay={0}
          >
            <Button
              onHoverStart={() => {
                setPerksHoveredIdx(idx);
              }}
              onHoverEnd={() => {
                setPerksHoveredIdx(null);
              }}
              onPressStart={() => {
                setPerksPressedIdx(idx);
              }}
              onPressEnd={() => {
                setPerksPressedIdx(null);
              }}
              onPress={() => {
                randomizeHandler(LoadoutPart.perks);
              }}
              className={twMerge(
                "relative h-24 w-24 outline-0 transition focus-visible:outline-2 md:h-28 md:w-28",
                perksHoveredIdx !== null && "brightness-125",
              )}
            >
              {/* Background */}
              <div className="clip-diamond h-full w-full bg-orange-500 bg-gradient-to-b from-orange-800 to-orange-950"></div>
              {/* Border */}
              <DiamondOutline
                className={twMerge(
                  "absolute inset-0 h-full w-full stroke-main-light stroke-[3px]",
                  perksPressedIdx !== null && "stroke-main-heavy",
                )}
              />
              {/* Image */}
              <LoadDetectImage
                src={`${perk.img}-112w.png`}
                alt=""
                fill
                priority
                className="pointer-events-none absolute col-start-1 scale-125 object-cover transition data-[loading=true]:opacity-0"
              />
            </Button>
            <Tooltip
              placement="bottom"
              offset={8}
              className="flex flex-col items-center border border-main-light bg-black/75 px-4 py-2 backdrop-blur-sm"
            >
              <span>{loadout.perks[idx].name}</span>
              <span className="text-sm opacity-75">
                Hold shift to randomize a single perk
              </span>
            </Tooltip>
          </TooltipTrigger>
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
