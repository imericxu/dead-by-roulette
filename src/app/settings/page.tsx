"use client";

import { ReactElement, Suspense } from "react";
import EffectRedirectToLastTab from "./_components/EffectRedirectToLastTab";
import { LucideLoader2 } from "lucide-react";

/**
 * Automatically redirects to the last accessed settings page.
 */
export default function SettingsRedirectPage(): ReactElement {
  return (
    <>
      <Suspense>
        <EffectRedirectToLastTab />
      </Suspense>
      <main className="col-span-full col-start-1 mt-4 flex w-full flex-col items-center">
        <LucideLoader2 size={24} className="animate-spin text-white/50" />
      </main>
    </>
  );
}
