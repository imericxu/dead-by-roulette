import LoadingSettings from "@/app/settings/_components/LoadingSettings";
import { ReactElement, Suspense } from "react";
import EffectRedirectToLastKillerTab from "./_components/EffectRedirectToLastKillerTab";

/**
 * Automatically redirect to the last-accessed tab.
 */
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
