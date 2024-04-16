import { ReactElement } from "react";

export default function Loading(): ReactElement {
  return (
    <div className="col-span-full col-start-1 flex w-full animate-pulse flex-col gap-2">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-12 border border-main-medium"></div>
      ))}
    </div>
  );
}
