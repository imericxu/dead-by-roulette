"use client";

import Role from "@/lib/dbdRole";
import { getLastSettingsTabRoute } from "@/lib/settings";
import {
  type ReadonlyURLSearchParams,
  redirect,
  useSearchParams,
} from "next/navigation";
import { type ReactElement, useEffect } from "react";
import { buildReturnUrl } from "@/lib/utils";

export default function EffectRedirectToLastSurvivorTab(): ReactElement {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const returnUrl: string | null = searchParams.get("return");

  useEffect(() => {
    redirect(buildReturnUrl(getLastSettingsTabRoute(Role.survivor), returnUrl));
  }, [returnUrl]);

  return <></>;
}
