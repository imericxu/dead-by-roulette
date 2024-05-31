"use client";

import { ConfigProvider } from "@/components/ConfigContext";
import DbdRole from "@/lib/dbdRole";
import { type ReactElement } from "react";
import Roulette from "../_components/Roulette";

export default function SurvivorRoulette(): ReactElement {
  return (
    <ConfigProvider role={DbdRole.survivor}>
      <Roulette role={DbdRole.survivor} />
    </ConfigProvider>
  );
}
