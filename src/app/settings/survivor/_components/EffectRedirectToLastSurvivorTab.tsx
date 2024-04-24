"use client";

import Role from "@/lib/dbdRole";
import { getLastSettingsTabRoute } from "@/lib/settings";
import {
  redirect,
  useSearchParams,
  type ReadonlyURLSearchParams,
} from "next/navigation";
import { useEffect, type ReactElement } from "react";

export default function EffectRedirectToLastSurvivorTab(): ReactElement {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const returnUrl: string | null = searchParams.get("return");

  useEffect(() => {
    const query = new URLSearchParams();
    if (returnUrl !== null) {
      query.set("return", returnUrl);
    }
    const redirectUrl = `${getLastSettingsTabRoute(Role.survivor)}?${query.toString()}`;
    redirect(redirectUrl);
  }, [returnUrl]);

  return <></>;
}
