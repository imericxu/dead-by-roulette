"use client";

import { usePathname } from "next/navigation";
import { ReactElement, use } from "react";

export default function Placeholder(): ReactElement {
  const pathname: string = usePathname();
  // Sleep using a promise
  use(new Promise((resolve) => setTimeout(resolve, 1000)));

  return (
    <p className="col-span-full col-start-1">Placeholder for {pathname}</p>
  );
}
