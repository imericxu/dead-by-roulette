import { ReactElement } from "react";
import GoToLastKillerTab from "./GoToLastKillerTab";

export default function KillerSettings(): ReactElement {
  return (
    <>
      <GoToLastKillerTab />
      <main className="p-4">Loading killer settings&hellip;</main>
    </>
  );
}
