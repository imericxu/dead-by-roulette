import { ReactElement } from "react";
import GoToLastSurvivorTab from "./GoToLastSurvivorTab";

export default function SurvivorSettings(): ReactElement {
  return (
    <>
      <GoToLastSurvivorTab />
      <main className="p-4">Loading survivor settings&hellip;</main>
    </>
  );
}
