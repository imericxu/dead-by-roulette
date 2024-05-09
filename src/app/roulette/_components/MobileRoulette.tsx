"use client";

import LoadDetectImage from "@/components/LoadDetectImage";
import { type Item } from "@/lib/dbd";
import DbdRole from "@/lib/dbdRole";
import Loadout, { LoadoutPart } from "@/lib/loadout";
import { Timeout, isEnumValue } from "@/lib/utils";
import rarityBg from "@/lib/variants/rarityBg";
import { type Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState, type ReactElement } from "react";
import { Button, Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import { twJoin, twMerge } from "tailwind-merge";
import { P, match } from "ts-pattern";
import LoadMobileRoulette from "./LoadMobileRoulette";
import { RouletteTab } from "./Roulette";
import DiamondOutline from "@/components/svg/DiamondOutline";
import HexagonOutline from "@/components/svg/HexagonOutline";

const LONG_PRESS_DURATION_MS = 300;

export interface MobileRouletteProps {
  role: DbdRole;
  loadout: Loadout | null;
  randomizeHandler: (part: LoadoutPart, idx?: number) => void;
}

export default function MobileRoulette(
  props: MobileRouletteProps,
): ReactElement {
  const pathname = usePathname() as Route;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<RouletteTab | null>(null);

  // Sync the tab state with the URL query parameter
  // If the tab is not set, default to the perks tab
  useEffect(() => {
    if (tab === null) {
      // Set the state based on the URL query parameter
      const queryTab: RouletteTab | null = match(searchParams.get("tab"))
        .with(null, () => RouletteTab.perks)
        .with(
          P.when((value) => isEnumValue(RouletteTab, value)),
          (narrowed: RouletteTab) => narrowed,
        )
        .otherwise(() => RouletteTab.perks);
      setTab(queryTab);
    } else {
      // Update the URL query parameter when the tab state changes
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set("tab", tab);
      router.replace(`${pathname}?${updatedSearchParams.toString()}`);
    }
  }, [pathname, router, searchParams, tab]);

  return tab === null ? (
    <LoadMobileRoulette />
  ) : (
    <Tabs
      selectedKey={tab}
      onSelectionChange={(key) => {
        setTab(key as RouletteTab);
      }}
      className="col-span-full col-start-1 flex h-[476px] flex-col items-center sm:hidden"
    >
      {/* Tab Switchers */}
      <TabList
        aria-label="Loadout Part"
        className="order-2 flex items-center justify-center gap-2"
      >
        {/* Character Tab (Circle) */}
        <Tab
          id="character"
          aria-label="Character"
          className="h-7 w-7 cursor-pointer rounded-full border-2 border-main-light outline-0 transition hover:bg-overlay focus-visible:outline-2 selected:border-main-heavy selected:bg-overlay-light"
        ></Tab>
        {/* Perk Tab (Diamond) */}
        <Tab
          id="perks"
          aria-label="Perks"
          className="w-fit cursor-pointer fill-transparent stroke-main-light outline-0 transition hover:fill-overlay focus-visible:outline-2 selected:fill-overlay-light selected:stroke-main-heavy"
        >
          <svg
            viewBox="-6 -6 112 112"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
          >
            <path d="M50 0L100 50L50 100L0 50L50 0Z" strokeWidth={7} />
          </svg>
        </Tab>
        {/* Add-Ons Tab (Square) */}
        <Tab
          id="add-ons"
          aria-label="Add-ons"
          className="h-6 w-6 cursor-pointer border-2 border-main-light bg-transparent outline-0 transition hover:bg-overlay focus-visible:outline-2 selected:border-main-heavy selected:bg-overlay-light"
        ></Tab>
        {/* Offerings Tab (Hexagon) */}
        <Tab
          id="offering"
          aria-label="Offering"
          className="w-fit cursor-pointer fill-transparent stroke-main-light outline-0 transition hover:fill-overlay focus-visible:outline-2 selected:fill-overlay-light selected:stroke-main-heavy"
        >
          <svg
            viewBox="-6 -6 100 112"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
          >
            <path
              d="M44 0L87.3013 25V75L44 100L0.69873 75V25L44 0Z"
              strokeWidth={7}
            />
          </svg>
        </Tab>
      </TabList>

      {/* Tab Content */}
      <div className="w-[min(100%,320px)] grow transition">
        <CharacterTab {...props} />
        <PerksTab {...props} />
        <AbilityAddOnsTab {...props} />
        <OfferingTab {...props} />
      </div>
    </Tabs>
  );
}

function RouletteTabContent(props: {
  id: string;
  title: string;
  children: Readonly<ReactNode>;
}): ReactElement {
  return (
    <TabPanel id={props.id} className="flex flex-col items-center gap-4">
      <h1 className="text-balance text-center text-xl font-medium uppercase">
        {props.title}
      </h1>
      {props.children}
    </TabPanel>
  );
}

function CharacterTab({
  loadout,
  role,
  randomizeHandler,
}: MobileRouletteProps): ReactElement {
  return (
    <RouletteTabContent id="character" title="Character">
      {/* Large Portrait of Character */}
      {loadout === null ? (
        <div className="aspect-[4/3] w-full animate-pulse border border-main-heavy bg-overlay"></div>
      ) : (
        <>
          <Button
            onPress={() => {
              randomizeHandler(LoadoutPart.character);
            }}
            aria-label="Randomize Character"
            className="relative aspect-[4/3] w-full overflow-hidden border border-main-light bg-gradient-to-b from-orange-950/80 to-stone-950/90 pt-2 outline-0 transition hover:brightness-125 focus-visible:outline-2 pressed:border-main-heavy"
          >
            <LoadDetectImage
              src={`${loadout.character.bigImg}-264h.png`}
              alt=""
              priority
              width={0}
              height={0}
              className="pointer-events-none m-auto h-full w-auto overflow-hidden object-cover opacity-100 transition data-[loading=true]:opacity-0"
            />
          </Button>
          {/* Character Name */}
          <h2 className="text-lg">
            {`${role === DbdRole.killer ? "The " : ""}${
              loadout.character.name
            }`}
          </h2>
        </>
      )}
    </RouletteTabContent>
  );
}

function PerksTab({
  loadout,
  randomizeHandler,
}: MobileRouletteProps): ReactElement {
  // Press States
  const [perkHovered, setPerkHovered] = useState<boolean>(false);
  const [pressedIdx, setPressedIdx] = useState<number | null>(null);

  // Long Press
  const [isLongPress, setIsLongPress] = useState<boolean>(false);
  const [longPressTimeout, setLongPressTimeout] = useState<Timeout | null>(
    null,
  );

  function resetPress(): void {
    setPressedIdx(null);
    setIsLongPress(false);
    if (longPressTimeout !== null) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
  }

  return (
    <RouletteTabContent id="perks" title="Perks">
      {/* Vertical Layout */}
      <div className="flex w-full flex-col gap-2">
        {loadout === null
          ? // Placeholders
            [...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="h-[90px] w-full animate-pulse border border-main-medium bg-overlay"
              ></div>
            ))
          : // Perk Buttons
            loadout.perks.map((perk, idx) => (
              <Button
                key={perk.id}
                aria-label="Randomize All Perks"
                onPressStart={() => {
                  setPressedIdx(idx);
                  setLongPressTimeout(
                    setTimeout(() => {
                      setIsLongPress(true);
                    }, LONG_PRESS_DURATION_MS),
                  );
                }}
                onPressUp={() => {
                  if (pressedIdx === null) return;
                  if (isLongPress) {
                    randomizeHandler(LoadoutPart.perk, pressedIdx);
                  } else {
                    randomizeHandler(LoadoutPart.perks);
                  }
                  resetPress();
                }}
                onPressEnd={resetPress}
                onHoverChange={setPerkHovered}
                className={twMerge(
                  "flex items-center justify-start gap-2 border border-main-light p-2 text-start outline-0 transition focus-visible:outline-2",
                  perkHovered && "bg-overlay-light",
                  pressedIdx !== null && "border-main-heavy",
                  isLongPress &&
                    idx !== pressedIdx &&
                    "border-main-light bg-transparent",
                )}
              >
                {/* Perk Diamond */}
                <div
                  className={twMerge(
                    "relative h-[72px] w-[72px] shrink-0",
                    perkHovered && "brightness-125",
                    isLongPress && pressedIdx !== idx && "brightness-100",
                  )}
                >
                  {/* Background */}
                  <div className="clip-diamond h-full w-full bg-gradient-to-b from-orange-800 to-orange-950"></div>
                  {/* Border */}
                  <DiamondOutline
                    className={twMerge(
                      "absolute inset-0 h-full w-full stroke-main-light stroke-2 transition",
                      pressedIdx !== null && "stroke-main-heavy",
                      isLongPress && pressedIdx !== idx && "stroke-main-light",
                    )}
                  />
                  {/* Image */}
                  <LoadDetectImage
                    src={`${perk.img}-112w.png`}
                    alt=""
                    priority
                    fill
                    className="pointer-events-none absolute scale-125 opacity-100 transition data-[loading=true]:opacity-0"
                  />
                </div>

                <p className="grow">{perk.name}</p>
              </Button>
            ))}
      </div>
    </RouletteTabContent>
  );
}

function AbilityAddOnsTab({
  loadout,
  role,
  randomizeHandler,
}: MobileRouletteProps): ReactElement {
  const [abilityHovered, setAbilityHovered] = useState<boolean>(false);
  const [abilityPressed, setAbilityPressed] = useState<boolean>(false);

  const [addOnHovered, setAddOnHovered] = useState<boolean>(false);
  const [pressedAddOnIdx, setPressedAddOnIdx] = useState<number | null>(null);
  const [isLongPress, setIsLongPress] = useState<boolean>(false);
  const [longPressTimeout, setLongPressTimeout] = useState<Timeout | null>(
    null,
  );

  function resetAddOnPress(): void {
    setPressedAddOnIdx(null);
    setIsLongPress(false);
    if (longPressTimeout !== null) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
  }

  const roleAbilityType: string = match(role)
    .with(DbdRole.killer, () => "Power")
    .with(DbdRole.survivor, () => "Item")
    .exhaustive();

  return (
    <RouletteTabContent id="add-ons" title={`${roleAbilityType} and Add-Ons`}>
      {/* Ability */}
      <section className="flex w-full flex-col gap-2">
        <h2 className="text-lg font-medium">{roleAbilityType}</h2>

        {loadout === null ? (
          <div className="h-[98px] w-full animate-pulse border border-main-medium bg-overlay"></div>
        ) : (
          <Button
            aria-label={`Randomize ${roleAbilityType}`}
            onPress={() => {
              randomizeHandler(LoadoutPart.ability);
            }}
            onHoverChange={setAbilityHovered}
            onPressChange={setAbilityPressed}
            className="group flex w-full items-center justify-start gap-2 border border-main-light p-2 outline-0 transition hover:bg-overlay-light focus-visible:outline-2 pressed:border-main-heavy"
          >
            {/* Image Border and Background */}
            <div
              className={twJoin(
                "relative aspect-square h-20 w-20 border border-main-light transition group-hover:brightness-125 group-pressed:border-main-heavy",
                match(role)
                  .with(
                    DbdRole.killer,
                    () => "bg-gradient-to-b from-orange-900 to-orange-950/80",
                  )
                  .with(DbdRole.survivor, () =>
                    rarityBg((loadout.ability as Item).rarity),
                  )
                  .exhaustive(),
              )}
            >
              <LoadDetectImage
                src={`${loadout?.ability.img}-112w.png`}
                alt=""
                priority
                fill
                className="pointer-events-none opacity-100 transition data-[loading=true]:opacity-0"
              />
            </div>

            <p className="text-start">{loadout?.ability.name}</p>
          </Button>
        )}
      </section>

      {/* Add-Ons */}
      <section className="flex w-full flex-col gap-2">
        <h2 className="text-lg font-medium">Add-Ons</h2>

        {/* Vertical Layout for Add-On Buttons */}
        <div className="flex w-full flex-col gap-2">
          {loadout === null
            ? // Placeholders
              [...Array(2)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-[82px] w-full animate-pulse border border-main-medium bg-overlay"
                ></div>
              ))
            : // Add-On Buttons
              loadout.addOns.map((addOn, idx) => (
                <Button
                  key={addOn.id}
                  aria-label="Randomize Add-Ons"
                  onPressStart={() => {
                    setPressedAddOnIdx(idx);
                    setLongPressTimeout(
                      setTimeout(() => {
                        setIsLongPress(true);
                      }, LONG_PRESS_DURATION_MS),
                    );
                  }}
                  onPressUp={() => {
                    if (pressedAddOnIdx === null) return;
                    if (isLongPress) {
                      randomizeHandler(LoadoutPart.addOn, idx);
                    } else {
                      randomizeHandler(LoadoutPart.addOns);
                    }
                    resetAddOnPress();
                  }}
                  onPressEnd={resetAddOnPress}
                  onHoverChange={setAddOnHovered}
                  className={twMerge(
                    "flex w-full items-center justify-start gap-2 border border-main-light p-2 outline-0 transition focus-visible:outline-2",
                    (abilityHovered || addOnHovered) && "bg-overlay-light",
                    (abilityPressed || pressedAddOnIdx !== null) &&
                      "border-main-heavy",
                    isLongPress &&
                      idx !== pressedAddOnIdx &&
                      "border-main-light bg-transparent",
                  )}
                >
                  {/* Image Border and Background */}
                  <div
                    className={twMerge(
                      twJoin(
                        "relative aspect-square h-16 w-16 border border-main-light transition",
                        rarityBg(addOn.rarity),
                      ),
                      (abilityHovered || addOnHovered) && "brightness-125",
                      (abilityPressed || pressedAddOnIdx !== null) &&
                        "border-main-heavy",
                      isLongPress &&
                        idx !== pressedAddOnIdx &&
                        "border-main-light brightness-100",
                    )}
                  >
                    <LoadDetectImage
                      src={`${addOn.img}-96w.png`}
                      alt=""
                      priority
                      fill
                      className="pointer-events-none opacity-100 transition data-[loading=true]:opacity-0"
                    />
                  </div>
                  <p className="text-start">{addOn.name}</p>
                </Button>
              ))}
        </div>
      </section>
    </RouletteTabContent>
  );
}

function OfferingTab({
  loadout,
  randomizeHandler,
}: MobileRouletteProps): ReactElement {
  return (
    <RouletteTabContent id="offering" title="Offering">
      {loadout === null ? (
        // Placeholder
        <div className="aspect-[4/3] w-full animate-pulse border border-main-heavy bg-overlay"></div>
      ) : (
        <Button
          onPress={() => {
            randomizeHandler(LoadoutPart.offering);
          }}
          aria-label="Randomize Offering"
          className="group flex aspect-[4/3] w-full items-center justify-center border border-main-light bg-gradient-to-b from-orange-950/80 to-stone-950/60 outline-0 transition hover:brightness-125 focus-visible:outline-2 pressed:border-main-heavy"
        >
          {/* Offering Hexagon */}
          <div className="relative h-36 w-[126px]">
            {/* Background */}
            <div
              className={twJoin(
                "clip-hexagon h-full w-full",
                rarityBg(loadout.offering.rarity),
              )}
            ></div>
            {/* Border */}
            <HexagonOutline className="absolute inset-0 h-full w-full stroke-main-light stroke-2 transition group-pressed:stroke-main-heavy" />
            {/* Image */}
            <LoadDetectImage
              src={`${loadout?.offering.img}-144w.png`}
              alt=""
              fill
              priority
              className="pointer-events-none absolute scale-110 object-cover opacity-100 transition data-[loading=true]:opacity-0"
            />
          </div>
        </Button>
      )}

      {/* Offering Name */}
      <p className="text-lg">{loadout?.offering.name}</p>
    </RouletteTabContent>
  );
}
