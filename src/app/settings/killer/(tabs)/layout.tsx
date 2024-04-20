import {
  LucideChevronDown,
  LucideEye,
  LucideGroup,
  LucideScanSearch,
  LucideSearch,
} from "lucide-react";
import { ReactElement, ReactNode } from "react";
import StoreLastAccessed from "./StoreLastAccessed";
import StyledButton from "@/components/StyledButton";
import LinkTabber from "@/components/LinkTabber";
import { Route } from "next";
import { SettingsTab } from "@/lib/settings";

const tabs: Record<SettingsTab, { label: string; url: Route }> = {
  character: { label: "Killers", url: "/settings/killer/killers" },
  perks: { label: "Perks", url: "/settings/killer/perks" },
  addOns: { label: "Add-ons", url: "/settings/killer/add-ons" },
  offerings: { label: "Offerings", url: "/settings/killer/offerings" },
  loadout: { label: "Current Loadout", url: "/settings/killer/loadout" },
};

export default function KillerSettingsLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <>
      <StoreLastAccessed />
      <div className="grid grid-cols-[16px_1fr_16px] gap-y-4 py-4">
        {/* Config dropdown */}
        {/* TODO: Learn React Aria */}
        <label className="col-span-1 col-start-2 flex items-baseline gap-2">
          <span>Config</span>

          <button
            type="button"
            className="inline-flex h-10 grow items-center gap-2 border border-white/25 px-2 active:border-white/95 hover:border-white/50 hover:bg-white/10"
          >
            <span className="grow overflow-ellipsis whitespace-nowrap text-left">
              My Config Name
            </span>
            <LucideChevronDown size={16} />
          </button>
        </label>

        {/* Tabs */}
        <LinkTabber tabs={Object.values(tabs)} className="col-span-full" />

        {/* Action Buttons */}
        <div className="col-span-1 col-start-2 flex w-full items-stretch gap-4">
          <StyledButton size="icon" aria-label="Search">
            <LucideSearch size={20} />
          </StyledButton>

          <StyledButton size="icon" aria-label="Show">
            <LucideEye size={20} />
          </StyledButton>

          <div>
            <StyledButton
              size="icon"
              aria-label="Group"
              className="peer border-r-0"
            >
              <LucideGroup size={20} />
            </StyledButton>

            <StyledButton
              size="icon"
              aria-label="Locate Group"
              className="peer-hover:border-l-white/50 peer-pressed:border-l-white/95"
            >
              <LucideScanSearch size={20} />
            </StyledButton>
          </div>
        </div>

        <div className="col-span-full grid grid-cols-subgrid">{children}</div>
      </div>
    </>
  );
}
