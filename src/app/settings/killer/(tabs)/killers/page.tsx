"use client";

import { LoadoutConfigsContext } from "@/components/LoadoutConfigsProvider";
import { Killer, dbd } from "@/lib/dbd";
import { ConfigEntity } from "@/lib/settings";
import Image from "next/image";
import { use, type ReactElement } from "react";
import { ToggleButton } from "react-aria-components";
import LoadingRoleSettings from "../loading";

export default function Placeholder(): ReactElement {
  // TODO: I feel like I should only use the necessary parts of the dbd object, but let's worry about optimization later
  const killers: Killer[] = dbd.killerRelated.killers;
  const configsContext = use(LoadoutConfigsContext);
  if (configsContext === undefined) {
    throw new Error("LoadoutConfigsContext is undefined");
  }
  const { configs, configManager } = configsContext;

  if (configs === undefined || configs.length === 0) {
    return <LoadingRoleSettings />;
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
                  className="pointer-events-none object-cover grayscale transition group-selected:filter-none"
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
