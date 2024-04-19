"use client";

import useLoadoutConfigs from "@/hooks/useLoadoutConfigs";
import DbdRole from "@/lib/dbdRole";
import Loadout from "@/lib/loadout";
import {
  randomizeCharacter,
  randomizeLoadout,
  randomizeOffering,
  randomizePerks,
} from "@/lib/randomize";
import { LoadoutConfig } from "@/lib/settings";
import { isEnumValue } from "@/lib/utils";
import { Route } from "next";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { Button, Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import { P, match } from "ts-pattern";

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
  const router = useRouter();
  const pathname = usePathname() as Route;

  // The tab is only used in mobile view
  const [tab, setTab] = useState<RouletteTab | null>(null);
  const searchParams = useSearchParams();

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

  const pageLoaded = config !== undefined && loadout !== null && tab !== null;

  if (!pageLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <main className="col-span-full col-start-1 grid grid-cols-subgrid gap-y-4">
      {/* Mobile (Tabbed) */}
      <Tabs
        selectedKey={tab}
        onSelectionChange={(key) => {
          setTab(key as RouletteTab);
        }}
        className="col-span-full col-start-1 flex h-[max(80vh,400px)] flex-col sm:hidden"
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
        <div className="grow">
          {/* Character Tab */}
          <TabPanel id="character" className="flex flex-col items-center gap-4">
            <h1 className="text-balance text-center text-2xl font-medium">
              Character
            </h1>
            {/* Large Portrait of Character */}
            <Button
              onPress={() => {
                setLoadout((prev) => {
                  if (prev === null) throw new Error("Loadout is null");
                  return randomizeCharacter(config, role, prev);
                });
              }}
              className="relative aspect-[4/3] w-[min(100%,360px)] border border-main-light pt-1 outline-0 transition focus-visible:outline-2 pressed:border-main-heavy"
            >
              <Image
                src={loadout.character.bigImg}
                alt=""
                fill
                priority
                sizes="(max-width: 360px) 100vw, 360px"
                className="object-contain"
              />
            </Button>
            {/* Character Name */}
            <h2 className="text-lg">{`${role === DbdRole.killer ? "The " : ""}${
              loadout.character.name
            }`}</h2>
          </TabPanel>

          {/* Perks Tab */}
          <TabPanel id="perks" className="flex flex-col items-center gap-4">
            <h1 className="text-balance text-center text-2xl font-medium">
              Perks
            </h1>

            {/* Perk Images (Laid Out in Diamond) */}
            <div className="">
              <Button
                onPress={() => {
                  setLoadout((prev) => {
                    if (prev === null) throw new Error("Loadout is null");
                    return randomizePerks(config, role, prev);
                  });
                }}
                className="relative h-20 w-20 border border-main-light outline-0 transition focus-visible:outline-2 pressed:border-main-heavy"
              >
                <Image
                  src={loadout.perks[0].img}
                  alt=""
                  priority
                  fill
                  sizes="80px"
                />
              </Button>
              <Button
                onPress={() => {
                  setLoadout((prev) => {
                    if (prev === null) throw new Error("Loadout is null");
                    return randomizePerks(config, role, prev);
                  });
                }}
                className="relative h-20 w-20 border border-main-light outline-0 transition focus-visible:outline-2 pressed:border-main-heavy"
              >
                <Image
                  src={loadout.perks[1].img}
                  alt=""
                  priority
                  fill
                  sizes="80px"
                />
              </Button>
              <Button
                onPress={() => {
                  setLoadout((prev) => {
                    if (prev === null) throw new Error("Loadout is null");
                    return randomizePerks(config, role, prev);
                  });
                }}
                className="relative h-20 w-20 border border-main-light outline-0 transition focus-visible:outline-2 pressed:border-main-heavy"
              >
                <Image
                  src={loadout.perks[2].img}
                  alt=""
                  priority
                  fill
                  sizes="80px"
                />
              </Button>
              <Button
                onPress={() => {
                  setLoadout((prev) => {
                    if (prev === null) throw new Error("Loadout is null");
                    return randomizePerks(config, role, prev);
                  });
                }}
                className="relative h-20 w-20 border border-main-light outline-0 transition focus-visible:outline-2 pressed:border-main-heavy"
              >
                <Image
                  src={loadout.perks[3].img}
                  alt=""
                  priority
                  fill
                  sizes="80px"
                />
              </Button>
            </div>
          </TabPanel>

          {/* Power/Item and Add-Ons Tab */}
          <TabPanel id="add-ons">
            <h1 className="text-balance text-center text-2xl font-medium">
              {match(role)
                .with(DbdRole.killer, () => "Power and ")
                .with(DbdRole.survivor, () => "Item and ")
                .exhaustive()}
              Add-Ons
            </h1>

            {/* Power/Item Image */}
            <div className="flex items-center gap-2">
              <Image
                src={loadout.ability.img}
                alt=""
                width={100}
                height={100}
                priority
              />
              <p>{loadout.ability.name}</p>
            </div>

            {/* Add-Ons */}
            {loadout.addOns.every(
              (addOn) => addOn !== null && addOn !== undefined,
            ) ? (
              loadout.addOns.map((addOn) => (
                <div key={addOn.id} className="flex items-center gap-2">
                  <Image
                    src={addOn.img}
                    alt=""
                    width={100}
                    height={100}
                    priority
                  />
                  <p>{addOn.name}</p>
                </div>
              ))
            ) : (
              <pre>{JSON.stringify(loadout.addOns, null, 2)}</pre>
            )}
          </TabPanel>

          {/* Offering Tab */}
          <TabPanel id="offering" className="flex flex-col items-center gap-4">
            <h1 className="text-balance text-center text-2xl font-medium">
              Offering
            </h1>

            {/* Offering Image */}
            <Button
              onPress={() => {
                setLoadout((prev) => {
                  if (prev === null) throw new Error("Loadout is null");
                  return randomizeOffering(config, role, prev);
                });
              }}
              className="clip-hexagon bg-main-light p-0.5 pressed:bg-main-heavy"
            >
              <div className="clip-hexagon relative box-content h-[128px] w-[128px] bg-red-800 py-[8px]">
                <Image
                  src={loadout.offering.img}
                  alt=""
                  fill
                  priority
                  sizes="120px"
                  className="object-cover"
                />
              </div>
            </Button>

            {/* Offering Name */}
            <p className="text-lg">{loadout.offering.name}</p>
          </TabPanel>
        </div>
      </Tabs>

      {/* Desktop */}
      <div className="col-span-full col-start-1 hidden grid-cols-[auto_min-content_auto_min-content_auto] grid-rows-2 sm:grid">
        {/* Character */}
        <div className="relative col-start-1 row-span-full">
          <Image
            src={loadout.character.bigImg}
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-contain"
          />
        </div>
        {/* Ability and Add-Ons */}
        <div className="col-start-3 row-start-1 flex items-end gap-2">
          {/* Ability */}
          <Image src={loadout.ability.img} alt="" width={100} height={100} />
          {/* Add-Ons */}
          <div className="flex">
            {loadout.addOns.map((addOn) => (
              <Image
                key={addOn.id}
                src={addOn.img}
                alt=""
                width={80}
                height={80}
              />
            ))}
          </div>
        </div>
        {/* Offering */}
        <div className="col-start-5 row-start-1">
          <Image src={loadout.offering.img} alt="" width={100} height={100} />
        </div>
        <div className="col-start-3 col-end-[-1] row-start-2 flex">
          {loadout.perks.map((perk) => (
            <Image
              key={perk.id}
              src={perk.img}
              alt=""
              width={100}
              height={100}
            />
          ))}
        </div>

        {/* Dividers */}
        {/* Character | Rest of Content */}
        <div className="col-start-2 row-span-full row-start-1 h-full w-0.5 bg-gradient-to-b from-transparent via-main-light to-transparent"></div>
        {/* Add-Ons | Offering */}
        <div className="col-start-4 row-start-1 h-full w-0.5 bg-gradient-to-b from-transparent via-main-light to-transparent"></div>
        {/* Perks | Rest of Content */}
        <div className="col-start-3 col-end-[-1] row-start-2 h-0.5 w-full bg-gradient-to-r from-transparent via-main-light to-transparent"></div>
      </div>
    </main>
  );
}
