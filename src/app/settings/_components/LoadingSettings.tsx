import { ReactElement } from "react";

export default function LoadingSettings(): ReactElement {
  return (
    <main className="col-span-full col-start-1 mt-4 flex h-fit min-h-fit w-full animate-pulse flex-col items-stretch gap-4">
      {/* Tab Bar */}
      <div className="-ml-page flex h-10 w-dvw overflow-hidden px-page">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 flex-shrink-0 border border-main-light"
          ></div>
        ))}
      </div>
      {/* Config Dropdown */}
      <div className="h-10 border border-main-medium"></div>
      {/* Content */}
      <div className="h-80 border border-main-medium gradient-mask-b-0"></div>
    </main>
  );
}
