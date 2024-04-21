import { ReactElement } from "react";

export default function LoadMobileRoulette(): ReactElement {
  return (
    <div
      className="col-span-full col-start-1 flex h-[476px] animate-pulse flex-col items-center sm:hidden"
      aria-hidden
    >
      {/* Content */}
      <div className="w-full grow border border-main-medium bg-overlay gradient-mask-b-0"></div>

      {/* Tab Switchers */}
      <div className="flex items-center justify-center gap-2">
        {/* Character Tab (Circle) */}
        <div className="h-7 w-7 rounded-full border-2 border-main-medium bg-overlay"></div>
        {/* Perk Tab (Diamond) */}
        <div className="w-fit fill-overlay stroke-main-medium">
          <svg
            viewBox="-6 -6 112 112"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
          >
            <path d="M50 0L100 50L50 100L0 50L50 0Z" strokeWidth={7} />
          </svg>
        </div>
        {/* Add-Ons Tab (Square) */}
        <div className="h-6 w-6 border-2 border-main-medium bg-overlay"></div>
        {/* Offerings Tab (Hexagon) */}
        <div className="w-fit fill-overlay stroke-main-medium">
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
        </div>
      </div>
    </div>
  );
}
