"use client";

import { ConfigProvider } from "@/components/ConfigContext";
import DbdRole from "@/lib/dbdRole";
import { type ReactElement } from "react";
import Roulette from "../_components/Roulette";

export default function KillerRoulette(): ReactElement {
  return (
    <ConfigProvider role={DbdRole.killer}>
      <Roulette role={DbdRole.killer} />
    </ConfigProvider>
  );
}
