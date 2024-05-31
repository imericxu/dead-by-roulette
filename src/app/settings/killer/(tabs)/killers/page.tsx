"use client";

import ConfigContext from "@/components/ConfigContext";
import { Config, ConfigEntity, toggleEntity } from "@/lib/config";
import { Killer, dbd } from "@/lib/dbd";
import { genSrcSet } from "@/lib/utils";
import { use, useCallback, type ReactElement } from "react";
import { ToggleButton } from "react-aria-components";
import LoadingRoleSettings from "../loading";

export default function Placeholder(): ReactElement {
  // TODO: I feel like I should only use the necessary parts of the dbd object, but let's worry about optimization later
  const killers: Killer[] = dbd.killerRelated.killers;

  const config: Config | null | undefined = use(ConfigContext);
  if (config === undefined) throw new Error("config is undefined");

  const toggleKiller = useCallback(
    (id: number) => {
      if (config === null) throw new Error("Config hasn't loaded yet.");
      void toggleEntity(config, ConfigEntity.characters, id);
    },
    [config],
  );

  if (config === null) {
    return <LoadingRoleSettings />;
  }

  const disabledCharacters = config.disabledEntities.characters;

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
                <img
                  srcSet={genSrcSet(killer.img, [48, 96], "webp")}
                  sizes="48px"
                  alt=""
                  loading="lazy"
                  className="pointer-events-none h-full w-full object-cover grayscale transition group-selected:filter-none"
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
