import { type ReactElement } from "react";
import { Route } from "next";
import { redirect } from "next/navigation";
import { pickRandom } from "@/lib/utils";

export default async function Roulette(): Promise<ReactElement> {
  const routes: Route[] = ["/roulette/killer", "/roulette/survivor"];
  redirect(pickRandom(routes));
}
