"use client";

import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { type ReactElement, useEffect } from "react";

export default function Random(): ReactElement {
  const router: AppRouterInstance = useRouter();

  useEffect(() => {
    // Randomly pick a role
    const roles: string[] = ["killer", "survivor"];
    const role: string = roles[Math.floor(Math.random() * roles.length)];

    // Redirect to the role
    router.replace(`/roulette/${role}`);
  }, [router]);

  return <></>;
}
