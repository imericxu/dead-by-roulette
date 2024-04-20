import LoadingSettings from "@/app/settings/_components/LoadingSettings";
import { ReactElement } from "react";
import EffectRedirectToLastKillerTab from "./_components/EffectRedirectToLastKillerTab";

export default function KillerSettings(): ReactElement {
  return (
    <>
      <EffectRedirectToLastKillerTab />
      <LoadingSettings />
    </>
  );
}
