import { ReactElement } from "react";

export default function LoadingSettings(): ReactElement {
  return (
    <main
      id="main"
      className="col-span-full col-start-1 flex h-fit min-h-fit w-full animate-pulse flex-col items-stretch gap-4"
    >
      {/* Tab Bar */}
      <div className="flex h-10 w-dvw max-w-fit self-center overflow-hidden px-page">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 flex-shrink-0 border border-main-medium bg-overlay"
          ></div>
        ))}
      </div>
      {/* Config Dropdown */}
      <div className="flex items-center gap-2">
        <span className="h-10 border border-main-medium bg-overlay text-transparent">
          Config
        </span>
        <div className="h-10 flex-grow border border-main-medium bg-overlay"></div>
        <div className="h-10 w-10 border border-main-medium bg-overlay"></div>
      </div>
      {/* Content */}
      <div className="h-80 border border-main-medium bg-overlay gradient-mask-b-0"></div>
    </main>
  );
}
