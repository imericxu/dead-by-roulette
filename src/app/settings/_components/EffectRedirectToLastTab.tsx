"use client";

import { getLastRole, getLastSettingsTabRoute } from "@/lib/settings";
import { redirect, useSearchParams } from "next/navigation";
import { type ReactElement, useEffect } from "react";
import { buildReturnUrl } from "@/lib/utils";

export default function EffectRedirectToLastTab(): ReactElement {
  const searchParams = useSearchParams();
  const returnUrl: string | null = searchParams.get("return");

  // Redirect to the last accessed settings page
  useEffect(() => {
    redirect(buildReturnUrl(getLastSettingsTabRoute(getLastRole()), returnUrl));
  }, [returnUrl]);

  return <></>;
}
