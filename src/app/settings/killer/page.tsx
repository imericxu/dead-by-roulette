import { ReactElement } from "react";
import EffectRedirectToLastKillerTab from "./_components/EffectRedirectToLastKillerTab";
import LoadingSettings from "@/app/settings/_components/LoadingSettings";

export default function KillerSettings(): ReactElement {
  return (
    <>
      <EffectRedirectToLastKillerTab />
      <LoadingSettings />
    </>
  );
}
