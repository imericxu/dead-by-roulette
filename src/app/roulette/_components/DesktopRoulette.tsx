"use client";

import LoadFadeImage from "@/components/LoadFadeImage";
import DiamondOutline from "@/components/svg/DiamondOutline";
import HexagonOutline from "@/components/svg/HexagonOutline";
import { type Item } from "@/lib/dbd";
import DbdRole from "@/lib/dbdRole";
import type Loadout from "@/lib/loadout";
import { LoadoutPart } from "@/lib/loadout";
import { Timeout, genSrcSet } from "@/lib/utils";
import rarityBg from "@/lib/variants/rarityBg";
import { useCallback, useState, type ReactElement } from "react";
import { Button, Tooltip, TooltipTrigger } from "react-aria-components";
import { twJoin, twMerge } from "tailwind-merge";
import { match } from "ts-pattern";
import LoadDesktopRoulette from "./LoadDesktopRoulette";

const LONG_PRESS_DELAY_MS = 300;

export interface DesktopRouletteProps {
  role: DbdRole;
  loadout: Loadout | null;
  randomizeHandler: (part: LoadoutPart, idx?: number) => void;
  canRandomize: boolean;
  isShiftPressed: boolean;
}

export default function DesktopRoulette({
  role,
  loadout,
  randomizeHandler,
  canRandomize,
  isShiftPressed,
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

  const [isLongPress, setLongPress] = useState(false);
  const [, setLongPressTimeout] = useState<Timeout | null>(null);

  const startLongPress = useCallback(() => {
    setLongPressTimeout(
      setTimeout(() => {
        setLongPress(true);
      }, LONG_PRESS_DELAY_MS),
    );
  }, []);

  const resetPress = useCallback(
    (part: LoadoutPart.addOn | LoadoutPart.perk) => {
      match(part)
        .with(LoadoutPart.addOn, () => {
          setAddOnsPressedIdx(null);
        })
        .with(LoadoutPart.perk, () => {
          setPerksPressedIdx(null);
        })
        .exhaustive();
      setLongPress(false);
      setLongPressTimeout((prev) => {
        if (prev !== null) clearTimeout(prev);
        return null;
      });
    },
    [],
  );

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
            canRandomize && [
              (characterHovered ||
                (role === DbdRole.killer && abilityHovered)) &&
                "brightness-125",
              (characterPressed ||
                (role === DbdRole.killer && abilityPressed)) &&
                "border-main-heavy",
            ],
          )}
        >
          <LoadFadeImage
            srcSet={genSrcSet(
              loadout.character.bigImg,
              match(role)
                .with(DbdRole.killer, () => [384, 640])
                .with(DbdRole.survivor, () => [256, 384, 640])
                .exhaustive(),
              "webp",
            )}
            sizes={match(role)
              .with(DbdRole.killer, () => "(max-width: 768px) 480px, 560px")
              .with(DbdRole.survivor, () => "(max-width: 768px) 256px, 296px")
              .exhaustive()}
            alt=""
            loading="eager"
            className="pointer-events-none m-auto h-full w-auto object-cover"
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
              canRandomize && [
                ((characterHovered && role === DbdRole.killer) ||
                  abilityHovered) &&
                  "brightness-125",
                ((characterPressed && role === DbdRole.killer) ||
                  abilityPressed) &&
                  "border-main-heavy",
              ],
            )}
          >
            <LoadFadeImage
              srcSet={genSrcSet(
                loadout.ability.img,
                [48, 64, 96, 128, 256],
                "webp",
              )}
              sizes="(max-width: 768px) 96px, 112px"
              alt=""
              loading="eager"
              className="pointer-events-none h-full w-full object-cover"
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
                  if (isShiftPressed) {
                    randomizeHandler(LoadoutPart.addOn, idx);
                  } else {
                    randomizeHandler(LoadoutPart.addOns);
                  }
                }}
                onHoverStart={() => {
                  setAddOnsHoveredIdx(idx);
                }}
                onHoverEnd={() => {
                  setAddOnsHoveredIdx(null);
                }}
                onPressStart={() => {
                  setAddOnsPressedIdx(idx);
                  startLongPress();
                }}
                onPressUp={() => {
                  if (addOnsPressedIdx === null) return;
                  if (isLongPress || isShiftPressed) {
                    randomizeHandler(LoadoutPart.addOn, addOnsPressedIdx);
                  } else {
                    randomizeHandler(LoadoutPart.addOns);
                  }
                  resetPress(LoadoutPart.addOn);
                }}
                onPressEnd={() => {
                  resetPress(LoadoutPart.addOn);
                }}
                className={twMerge(
                  twJoin(
                    "relative h-20 w-20 border-2 border-main-light outline-0 transition focus-visible:outline-2 md:h-24 md:w-24",
                    rarityBg(addOn.rarity),
                  ),
                  canRandomize && [
                    ((role === DbdRole.killer && characterHovered) ||
                      abilityHovered ||
                      addOnsHoveredIdx !== null) &&
                      "brightness-125",
                    ((role === DbdRole.killer && characterPressed) ||
                      abilityPressed ||
                      addOnsPressedIdx !== null) &&
                      "border-main-heavy",
                    ((isShiftPressed && idx !== addOnsHoveredIdx) ||
                      (isLongPress && idx !== addOnsPressedIdx)) &&
                      "border-main-light brightness-100",
                  ],
                )}
              >
                <LoadFadeImage
                  srcSet={genSrcSet(
                    loadout.addOns[idx].img,
                    [48, 64, 96, 128, 256],
                    "webp",
                  )}
                  sizes="(max-width: 768px) 80px, 96px"
                  alt=""
                  loading="eager"
                  className="pointer-events-none h-full w-full object-cover"
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
          className={twJoin(
            "group relative col-start-5 row-start-1 h-24 w-[84px] outline-0 transition focus-visible:outline-2 md:h-28 md:w-[98px]",
            canRandomize && "hover:brightness-125",
          )}
        >
          {/* Background */}
          <div
            className={twJoin(
              "clip-hexagon h-full w-full",
              rarityBg(loadout.offering.rarity),
            )}
          ></div>
          {/* Border */}
          <HexagonOutline
            className={twJoin(
              "absolute inset-0 h-full w-full stroke-main-light stroke-2 transition",
              canRandomize && "group-pressed:stroke-main-heavy",
            )}
          />
          {/* Image */}
          <LoadFadeImage
            srcSet={genSrcSet(loadout.offering.img, [64, 96, 128, 256], "webp")}
            sizes="(max-width: 768px) 96px, 112px"
            alt=""
            loading="eager"
            className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover"
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
                startLongPress();
              }}
              onPressUp={() => {
                if (perksPressedIdx === null) return;
                if (isLongPress || isShiftPressed) {
                  randomizeHandler(LoadoutPart.perk, perksPressedIdx);
                } else {
                  randomizeHandler(LoadoutPart.perks);
                }
                resetPress(LoadoutPart.perk);
              }}
              onPressEnd={() => {
                resetPress(LoadoutPart.perk);
              }}
              className={twMerge(
                "relative h-24 w-24 outline-0 transition focus-visible:outline-2 md:h-28 md:w-28",
                canRandomize && [
                  perksHoveredIdx !== null && "brightness-125",
                  ((isShiftPressed && idx !== perksHoveredIdx) ||
                    (isLongPress && idx !== perksPressedIdx)) &&
                    "brightness-100",
                ],
              )}
            >
              {/* Background */}
              <div className="clip-diamond h-full w-full bg-orange-500 bg-gradient-to-b from-orange-800 to-orange-950"></div>
              {/* Border */}
              <DiamondOutline
                className={twMerge(
                  "absolute inset-0 h-full w-full stroke-main-light stroke-2",
                  canRandomize && [
                    perksPressedIdx !== null && "stroke-main-heavy",
                    ((isShiftPressed && idx !== perksHoveredIdx) ||
                      (isLongPress && idx !== perksPressedIdx)) &&
                      "stroke-main-light",
                  ],
                )}
              />
              {/* Image */}
              <LoadFadeImage
                srcSet={genSrcSet(
                  loadout.perks[idx].img,
                  [96, 128, 256],
                  "webp",
                )}
                sizes="(max-width: 768px) 96px, 112px"
                alt=""
                loading="eager"
                className="pointer-events-none absolute inset-0 scale-[1.2] object-cover"
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
