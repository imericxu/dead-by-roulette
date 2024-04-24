"use client";

import { getLastRole, getLastSettingsTabRoute } from "@/lib/settings";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, type ReactElement } from "react";

export default function EffectRedirectToLastTab(): ReactElement {
  const searchParams = useSearchParams();
  const returnUrl: string | null = searchParams.get("return");

  // Redirect to the last accessed settings page
  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (returnUrl !== null) {
      searchParams.set("return", returnUrl);
    }
    const redirectUrl = `${getLastSettingsTabRoute(getLastRole())}?${searchParams.toString()}`;
    redirect(redirectUrl);
  }, [returnUrl]);

  return <></>;
}
