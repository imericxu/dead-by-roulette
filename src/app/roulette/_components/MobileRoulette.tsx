"use client";

import LoadDetectImage from "@/components/LoadDetectImage";
import { Item } from "@/lib/dbd";
import DbdRole from "@/lib/dbdRole";
import Loadout, { LoadoutPart } from "@/lib/loadout";
import { isEnumValue } from "@/lib/utils";
import rarityBg from "@/lib/variants/rarityBg";
import { type Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState, type ReactElement } from "react";
import { Button, Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import { twJoin, twMerge } from "tailwind-merge";
import { P, match } from "ts-pattern";
import { RouletteTab } from "./Roulette";
import LoadMobileRoulette from "./LoadMobileRoulette";

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
              src={loadout.character.bigImg}
              alt=""
              priority
              sizes="(max-width: 320px) 100vw, 360px"
              width={0}
              height={0}
              className="m-auto h-full w-auto overflow-hidden object-cover opacity-100 transition data-[loading=true]:opacity-0"
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
  const [perkHovered, setPerkHovered] = useState<boolean>(false);
  const [perkPressed, setPerkPressed] = useState<boolean>(false);

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
            loadout.perks.map((perk, _idx) => (
              <Button
                key={perk.id}
                aria-label="Randomize All Perks"
                onPress={() => {
                  randomizeHandler(LoadoutPart.perks);
                }}
                onHoverChange={setPerkHovered}
                onPressChange={setPerkPressed}
                className={twMerge(
                  "flex items-center justify-start gap-2 border border-main-light p-2 text-start outline-0 transition focus-visible:outline-2",
                  perkHovered && "bg-overlay-light",
                  perkPressed && "border-main-heavy",
                )}
              >
                {/* Image */}
                {/* Pseudo-Border */}
                <div
                  className={twMerge(
                    "clip-diamond shrink-0 bg-main-light p-0.5 transition",
                    perkPressed && "bg-main-heavy",
                  )}
                >
                  {/* Clipped Background */}
                  <div
                    className={twJoin(
                      "clip-diamond overflow-visible bg-gradient-to-b from-orange-800 to-orange-950",
                      perkHovered && "brightness-125",
                    )}
                  >
                    <LoadDetectImage
                      src={perk.img}
                      alt=""
                      priority
                      width={68}
                      height={68}
                      className="scale-110 opacity-100 transition data-[loading=true]:opacity-0"
                    />
                  </div>
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
  const [addOnPressed, setAddOnPressed] = useState<boolean>(false);

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
            onPress={() => {
              randomizeHandler(LoadoutPart.ability);
            }}
            aria-label={`Randomize ${roleAbilityType}`}
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
                src={loadout?.ability.img}
                alt=""
                priority
                fill
                sizes="80px"
                className="opacity-100 transition data-[loading=true]:opacity-0"
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
              loadout.addOns.map((addOn) => (
                <Button
                  key={addOn.id}
                  aria-label="Randomize Add-Ons"
                  onPress={() => {
                    randomizeHandler(LoadoutPart.addOns);
                  }}
                  onHoverChange={setAddOnHovered}
                  onPressChange={setAddOnPressed}
                  className={twMerge(
                    "flex w-full items-center justify-start gap-2 border border-main-light p-2 outline-0 transition focus-visible:outline-2",
                    (abilityHovered || addOnHovered) && "bg-overlay-light",
                    (abilityPressed || addOnPressed) && "border-main-heavy",
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
                      (abilityPressed || addOnPressed) && "border-main-heavy",
                    )}
                  >
                    <LoadDetectImage
                      src={addOn.img}
                      alt=""
                      priority
                      fill
                      sizes="64px"
                      className="opacity-100 transition data-[loading=true]:opacity-0"
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
          {/* Pseudo-Border */}
          <div className="clip-hexagon group bg-main-light p-[3px] transition group-pressed:bg-main-heavy">
            {/* Clipped Background */}
            <div
              className={twJoin(
                "clip-hexagon relative box-content h-[128px] w-[128px] py-[8px] transition",
                rarityBg(loadout.offering.rarity),
              )}
            >
              <LoadDetectImage
                src={loadout?.offering.img}
                alt=""
                fill
                priority
                sizes="120px"
                className="object-cover opacity-100 transition data-[loading=true]:opacity-0"
              />
            </div>
          </div>
        </Button>
      )}

      {/* Offering Name */}
      <p className="text-lg">{loadout?.offering.name}</p>
    </RouletteTabContent>
  );
}
