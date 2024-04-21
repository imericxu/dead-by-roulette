"use client";

import LoadoutConfigsProvider from "@/components/LoadoutConfigsProvider";
import DbdRole from "@/lib/dbdRole";
import { type ReactElement } from "react";
import Roulette from "../_components/Roulette";

export default function KillerRoulette(): ReactElement {
  return (
    <LoadoutConfigsProvider role={DbdRole.killer}>
      <Roulette role={DbdRole.killer} />
    </LoadoutConfigsProvider>
  );
}
