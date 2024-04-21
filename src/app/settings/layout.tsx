import SkipToMain from "@/components/SkipToMain";
import { type ReactElement, type ReactNode } from "react";
import TopBar from "./_components/TopBar";

export default function SettingsLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <>
      <SkipToMain />
      <TopBar />
      <p className="col-span-full col-start-1 justify-self-center bg-black p-1 text-center text-xs">
        🚧 Under Construction 🚧
      </p>
      {children}
    </>
  );
}
