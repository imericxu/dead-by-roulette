import Diamond112w from "@/components/svg/Diamond112w";
import Diamond96w from "@/components/svg/Diamond96w";
import DiamondOutline from "@/components/svg/DiamondOutline";
import HexagonOutline from "@/components/svg/HexagonOutline";
import Image from "next/image";
import { type ReactElement } from "react";

export default function LoadDesktopRoulette(): ReactElement {
  return (
    <div className="col-span-full col-start-1 mt-4 hidden w-full max-w-[888px] animate-pulse grid-cols-[auto_min-content_max-content_min-content_max-content] grid-rows-[max-content_min-content_max-content] justify-self-center sm:grid">
      {/* Character */}
      <div className="col-start-1 row-span-full h-[225px] w-full justify-self-end border border-main-medium bg-overlay md:h-[257px]"></div>

      {/* Ability and Add-Ons */}
      <div className="col-start-3 row-start-1 flex items-end gap-4">
        {/* Ability */}
        <div className="h-24 w-24 border border-main-medium bg-overlay md:h-28 md:w-28"></div>

        {/* Add-Ons */}
        <div className="flex shrink-0 gap-2">
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className="h-20 w-20 border border-main-medium bg-overlay md:h-24 md:w-24"
            ></div>
          ))}
        </div>
      </div>

      {/* Offering */}
      <div className="clip-hexagon col-start-5 row-start-1 h-fit w-fit bg-overlay">
        <HexagonOutline className="h-[96px] w-[84px] stroke-main-medium stroke-1 md:h-[112px] md:w-[98px]" />
      </div>

      {/* Perks */}
      <div className="col-start-3 col-end-[-1] row-start-3 flex gap-2">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="clip-diamond bg-overlay">
            <DiamondOutline className="h-24 w-24 stroke-main-medium stroke-1 md:h-28 md:w-28" />
          </div>
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
