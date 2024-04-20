"use client";

import LoadDetectImage from "@/components/LoadDetectImage";
import DbdRole from "@/lib/dbdRole";
import Loadout, { LoadoutPart } from "@/lib/loadout";
import { isEnumValue } from "@/lib/utils";
import { type Route } from "next";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type ReactElement } from "react";
import { Button, Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import { P, match } from "ts-pattern";
import { RouletteTab } from "./Roulette";
import { twMerge } from "tailwind-merge";

export interface MobileRouletteProps {
  role: DbdRole;
  loadout: Loadout | null;
  randomizeHandler: (part: LoadoutPart, idx?: number) => void;
}

export default function MobileRoulette({
  role,
  loadout,
  randomizeHandler,
}: MobileRouletteProps): ReactElement {
  const pathname = usePathname() as Route;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<RouletteTab | null>(null);

  const [perkHovered, setPerkHovered] = useState<boolean>(false);
  const [perkPressed, setPerkPressed] = useState<boolean>(false);

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

  return (
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
        {/* Character Tab */}
        <TabPanel id="character" className="flex flex-col items-center gap-4">
          <h1 className="text-balance text-center text-xl font-medium">
            Character
          </h1>
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
                className="relative aspect-[4/3] w-full overflow-hidden border border-main-light bg-gradient-to-b from-orange-950/80 to-stone-950/90 pt-2 outline-0 transition hover:brightness-110 focus-visible:outline-2 pressed:border-main-heavy"
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
        </TabPanel>

        {/* Perks Tab */}
        <TabPanel id="perks" className="flex flex-col gap-4">
          <h1 className="text-balance text-center text-xl font-medium">
            Perks
          </h1>

          {/* Perks */}
          <div className="flex flex-col gap-2">
            {loadout === null
              ? [...Array(4)].map((_, idx) => (
                  <div key={idx} className="h-24"></div>
                ))
              : loadout.perks.map((perk, idx) => (
                  <Button
                    key={perk.id}
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
                      <div className="clip-diamond overflow-visible bg-orange-950 bg-gradient-to-b">
                        <LoadDetectImage
                          src={perk.img}
                          alt=""
                          priority
                          width={68}
                          height={68}
                          className={twMerge(
                            "scale-110 opacity-100 transition data-[loading=true]:opacity-0",
                            perkHovered && "brightness-110",
                          )}
                        />
                      </div>
                    </div>

                    <p className="grow">{perk.name}</p>
                  </Button>
                ))}
          </div>
        </TabPanel>

        {/* Power/Item and Add-Ons Tab */}
        <TabPanel id="add-ons">
          <h1 className="text-balance text-center text-xl font-medium">
            {match(role)
              .with(DbdRole.killer, () => "Power and ")
              .with(DbdRole.survivor, () => "Item and ")
              .exhaustive()}
            Add-Ons
          </h1>

          {/* Power/Item Image */}
          <h2>
            {match(role)
              .with(DbdRole.killer, () => "Power")
              .with(DbdRole.survivor, () => "Item")
              .exhaustive()}
          </h2>
          {loadout === null ? (
            <div className="h-26 w-full"></div>
          ) : (
            <Button
              onPress={() => {
                randomizeHandler(LoadoutPart.ability);
              }}
              className="flex w-full items-center gap-2 border border-main-light pressed:border-main-heavy"
            >
              <Image
                src={loadout?.ability.img}
                alt=""
                width={100}
                height={100}
                priority
                className="opacity-100 transition data-[loading=true]:opacity-0"
              />
              <p>{loadout?.ability.name}</p>
            </Button>
          )}

          {/* Add-Ons */}
          <h2>Add-Ons</h2>
          {loadout === null
            ? [...Array(2)].map((_, idx) => (
                <div key={idx} className="h-26 w-full"></div>
              ))
            : loadout.addOns.map((addOn) => (
                <Button
                  key={addOn.id}
                  onPress={() => {
                    randomizeHandler(LoadoutPart.addOn);
                  }}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={addOn.img}
                    alt=""
                    width={100}
                    height={100}
                    priority
                  />
                  <p>{addOn.name}</p>
                </Button>
              ))}
        </TabPanel>

        {/* Offering Tab */}
        <TabPanel id="offering" className="flex flex-col items-center gap-4">
          <h1 className="text-balance text-center text-xl font-medium">
            Offering
          </h1>

          {/* Offering Image */}
          {loadout === null ? (
            <div className="h-[128px] w-[128px]"></div>
          ) : (
            <Button
              onPress={() => {
                randomizeHandler(LoadoutPart.offering);
              }}
              className="clip-hexagon bg-main-light p-0.5 pressed:bg-main-heavy"
            >
              <div className="clip-hexagon relative box-content h-[128px] w-[128px] bg-red-800 py-[8px]">
                <Image
                  src={loadout?.offering.img}
                  alt=""
                  fill
                  priority
                  sizes="120px"
                  className="object-cover"
                />
              </div>
            </Button>
          )}

          {/* Offering Name */}
          <p className="text-lg">{loadout?.offering.name}</p>
        </TabPanel>
      </div>
    </Tabs>
  );
}
