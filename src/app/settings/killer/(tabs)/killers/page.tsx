"use client";

import { type ReactElement, use } from "react";
import { dbd, Killer } from "@/lib/dbd";
import { LoadoutConfigsContext } from "@/components/LoadoutConfigsProvider";
import { Button, ToggleButton } from "react-aria-components";
import { ConfigEntity } from "@/lib/settings";
import Image from "next/image";
import { twJoin, twMerge } from "tailwind-merge";

export default function Placeholder(): ReactElement {
  // TODO: I feel like I should only use the necessary parts of the dbd object, but let's worry about optimization later
  const killers: Killer[] = dbd.killerRelated.killers;
  const configsContext = use(LoadoutConfigsContext);
  if (configsContext === undefined) {
    throw new Error("LoadoutConfigsContext is undefined");
  }
  const { configs, configManager } = configsContext;

  if (configs === undefined || configs.length === 0) {
    return (
      <div className="col-span-full col-start-1 grid animate-pulse grid-cols-subgrid gap-y-2">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="col-span-full h-12 border border-main-medium"
          ></div>
        ))}
      </div>
    );
  }

  const disabledCharacters = configs[0].disabledEntities.characters;

  function toggleKiller(id: number): void {
    void (async () => {
      await configManager.toggleEntity(ConfigEntity.characters, id);
    })();
  }

  return (
    // List of killers
    <div className="col-span-full col-start-1 grid grid-cols-subgrid gap-y-2">
      {killers.map((killer) => (
        // Killer toggle button
        <ToggleButton
          key={killer.id}
          isSelected={!disabledCharacters.has(killer.id)}
          onChange={() => {
            toggleKiller(killer.id);
          }}
          className="group col-span-full col-start-1 flex items-center gap-2 border border-main-light bg-transparent p-2 outline-0 transition hover:bg-overlay focus-visible:outline-2 pressed:border-main-heavy selected:border-main-heavy selected:bg-overlay-light selected:hover:bg-overlay selected:pressed:border-main-medium selected:pressed:bg-overlay-light"
        >
          {({ isSelected }) => (
            <>
              {/* Image */}
              <div className="relative h-14 w-11 border border-main-light bg-gradient-to-b from-slate-800 via-sky-200/70 via-30% to-slate-900 transition">
                <Image
                  src={killer.img}
                  alt=""
                  fill
                  sizes="3rem"
                  className="object-cover grayscale transition group-selected:filter-none"
                />
              </div>
              {/* Text */}
              <div className="flex flex-col items-start">
                <span>{killer.name}</span>
                <span className="text-sm text-main-medium">
                  {isSelected ? "Enabled" : "Disabled"}
                </span>
              </div>
            </>
          )}
        </ToggleButton>
      ))}
    </div>
  );
}
