"use client";

import DbdRole from "@/lib/dbdRole";
import { getLastSettingsTabRoute } from "@/lib/settings";
import {
  redirect,
  useSearchParams,
  type ReadonlyURLSearchParams,
} from "next/navigation";
import { useEffect, type ReactElement } from "react";

export default function EffectRedirectToLastKillerTab(): ReactElement {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const returnUrl: string | null = searchParams.get("return");

  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (returnUrl !== null) {
      searchParams.set("return", returnUrl);
    }
    const redirectUrl = `${getLastSettingsTabRoute(DbdRole.killer)}?${searchParams.toString()}`;
    redirect(redirectUrl);
  }, [returnUrl]);

  return <></>;
}
