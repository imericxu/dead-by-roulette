import { ReactElement } from "react";
import LoadingSettings from "@/app/settings/_components/LoadingSettings";
import EffectRedirectToLastSurvivorTab from "./_components/EffectRedirectToLastSurvivorTab";

export default function SurvivorSettings(): ReactElement {
  return (
    <>
      <EffectRedirectToLastSurvivorTab />
      <LoadingSettings />
    </>
  );
}
