"use client";

import DbdRole from "@/lib/dbdRole";
import { getLastSettingsTabRoute } from "@/lib/settings";
import {
  type ReadonlyURLSearchParams,
  redirect,
  useSearchParams,
} from "next/navigation";
import { type ReactElement, useEffect } from "react";
import { buildReturnUrl } from "@/lib/utils";

export default function EffectRedirectToLastKillerTab(): ReactElement {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const returnUrl: string | null = searchParams.get("return");

  useEffect(() => {
    redirect(
      buildReturnUrl(getLastSettingsTabRoute(DbdRole.killer), returnUrl),
    );
  }, [returnUrl]);

  return <></>;
}
