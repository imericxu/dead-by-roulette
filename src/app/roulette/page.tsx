"use client";

import { pickRandom } from "@/lib/utils";
import { Route } from "next";
import { useRouter } from "next/navigation";
import { useEffect, type ReactElement } from "react";

export default function RoulettePage(): ReactElement {
  const router = useRouter();
  const routes: Route[] = ["/roulette/killer", "/roulette/survivor"];
  const route: Route = pickRandom(routes);

  useEffect(() => {
    router.replace(route);
  }, [route, router]);

  return (
    <>
      <p className="col-span-full col-start-1 animate-bounce text-center">
        Deciding whether to play killer or survivor&hellip;
      </p>
      <p className="col-span-full col-start-1 text-center text-main-medium">
        If you&lsquo;re not redirected in a few seconds, please click one of the
        links above.
      </p>
    </>
  );
}
