"use client";

import DbdRole from "@/lib/dbdRole";
import { type ReactElement } from "react";
import Roulette from "../_components/Roulette";
import LoadoutConfigsProvider from "@/components/LoadoutConfigsProvider";

export default function SurvivorRoulette(): ReactElement {
  return (
    <LoadoutConfigsProvider role={DbdRole.survivor}>
      <Roulette role={DbdRole.survivor} />
    </LoadoutConfigsProvider>
  );
}
