"use client";

import { usePathname } from "next/navigation";
import { ReactElement } from "react";

export default function Placeholder(): ReactElement {
  const pathname: string = usePathname();

  return <p>Placeholder for {pathname}</p>;
}
