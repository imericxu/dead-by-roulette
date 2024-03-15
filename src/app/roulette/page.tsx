import Link from "next/link";
import { type ReactElement } from "react";
import Random from "./Random";

export default function Roulette(): ReactElement {
  return (
    <>
      <Random />

      <div className="flex h-screen min-h-min flex-col">
        <header className="sticky flex h-12 w-full flex-shrink-0 items-center justify-center border-b border-white/10 shadow-lg">
          <Link
            href="/"
            className="whitespace-nowrap text-center text-lg font-semibold uppercase transition hover:text-white/75 active:scale-95"
          >
            Dead by Roulette
          </Link>
        </header>

        <main className="p-4">
          <p>Selecting a role for you, please wait&hellip;</p>
        </main>
      </div>
    </>
  );
}
