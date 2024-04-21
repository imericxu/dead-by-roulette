import LoadingSettings from "@/app/settings/_components/LoadingSettings";
import { Suspense, type ReactElement } from "react";
import EffectRedirectToLastSurvivorTab from "./_components/EffectRedirectToLastSurvivorTab";

export default function SurvivorSettings(): ReactElement {
  return (
    <>
      <Suspense>
        <EffectRedirectToLastSurvivorTab />
      </Suspense>
      <LoadingSettings />
    </>
  );
}
