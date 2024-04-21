import { type ReactElement } from "react";

export default function LoadingRoleSettings(): ReactElement {
  return (
    <div className="col-span-full col-start-1 flex w-full animate-pulse flex-col gap-2">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="h-20 border border-main-medium bg-overlay"
        ></div>
      ))}
    </div>
  );
}
