import ButtonLink from "@/components/ButtonLink";
import { LucideDices, LucideSettings } from "lucide-react";
import { type ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <>
      <main className="flex h-screen min-h-min flex-col items-center justify-center gap-8 text-center">
        {/* Heading */}
        <h1 className="text-balance text-5xl font-bold uppercase">
          Dead by Roulette
        </h1>

        {/* CTA Links */}
        <nav>
          <ul className="flex flex-col items-stretch gap-4">
            {/* Killer Roulette */}
            <li>
              <ButtonLink href="/roulette/killer" className="w-full">
                Killer
              </ButtonLink>
            </li>
            {/* Survivor Roulette */}
            <li>
              <ButtonLink href="/roulette/survivor" className="w-full">
                Survivor
              </ButtonLink>
            </li>
            {/* Random Roulette */}
            <li>
              <ButtonLink href="/roulette" className="w-full">
                <LucideDices size={20} /> Pick for Me
              </ButtonLink>
            </li>
          </ul>
        </nav>

        {/* Settings Link */}
        <ButtonLink href="/settings?return=/" variant="ghost">
          <LucideSettings size={20} /> Settings
        </ButtonLink>
      </main>
    </>
  );
}
