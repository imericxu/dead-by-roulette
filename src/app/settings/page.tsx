/**
 * Automatically redirects to the last accessed settings page.
 */

import { ReactElement } from "react";
import GoToLastAccessedSettings from "./GoToLastAccessedSettings";

export default function Settings(): ReactElement {
  return (
    <>
      <GoToLastAccessedSettings />
      <main className="p-4">Loading settings&hellip;</main>
    </>
  );
}
