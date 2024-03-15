"use client";

import { usePathname } from "next/navigation";
import { ReactElement } from "react";

export default function Placeholder(): ReactElement {
  const pathname: string = usePathname();

  return <p className="col-span-1 col-start-2">Placeholder for {pathname}</p>;
}
