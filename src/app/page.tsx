import ButtonLink from "@/components/ButtonLink";
import EffectPrefetchRoulette from "@/components/EffectPrefetchRoulette";
import { LucideDices, LucideSettings } from "lucide-react";
import { type ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <>
      <EffectPrefetchRoulette />
      <div className="col-span-full flex h-dvh min-h-min flex-col items-center gap-8 py-page">
        <main className="flex grow flex-col items-center justify-center gap-8 justify-self-center text-center">
          {/* Heading */}
          <h1 className="text-balance text-5xl font-bold uppercase">
            Dead by
            <br className="md:hidden" />
            <span className="hidden md:inline"> </span>
            Roulette
          </h1>

          {/* CTA Links */}
          <nav className="w-full max-w-72 md:max-w-none">
            <ul className="flex flex-col items-stretch gap-4 md:flex-row md:justify-between">
              {/* Killer Roulette */}
              <li>
                <ButtonLink href="/roulette/killer" className="w-full md:w-36">
                  Killer
                </ButtonLink>
              </li>
              {/* Survivor Roulette */}
              <li>
                <ButtonLink
                  href="/roulette/survivor"
                  className="w-full md:w-36"
                >
                  Survivor
                </ButtonLink>
              </li>
              {/* Random Roulette */}
              <li>
                <ButtonLink href="/roulette" className="w-full md:w-auto">
                  <LucideDices size={20} /> Pick for Me
                </ButtonLink>
              </li>
            </ul>
          </nav>

          {/* Settings Link */}
          <ButtonLink
            href="/settings?return=/"
            variant="ghost"
            className="w-full max-w-72 md:max-w-none"
          >
            <LucideSettings size={20} /> Settings
          </ButtonLink>
        </main>

        <a
          href="https://www.github.com/imericxu/dead-by-roulette"
          className="col-span-full col-start-1 text-center text-main-heavy"
        >
          GitHub
        </a>
      </div>
    </>
  );
}
