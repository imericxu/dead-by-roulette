"use client";

import { useRouter } from "next/navigation";
import { type ReactElement, useEffect } from "react";

export default function EffectPrefetchRoulette(): ReactElement {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/roulette/killer");
    router.prefetch("/roulette/survivor");
  }, [router]);

  return <></>;
}
