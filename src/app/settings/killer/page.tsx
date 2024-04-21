import LoadingSettings from "@/app/settings/_components/LoadingSettings";
import { ReactElement, Suspense } from "react";
import EffectRedirectToLastKillerTab from "./_components/EffectRedirectToLastKillerTab";

export default function KillerSettings(): ReactElement {
  return (
    <>
      <Suspense>
        <EffectRedirectToLastKillerTab />
      </Suspense>
      <LoadingSettings />
    </>
  );
}
