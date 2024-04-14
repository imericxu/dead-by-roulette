import { ReactElement, ReactNode } from "react";
import TopBar from "./_components/TopBar";
import SkipToMain from "@/components/SkipToMain";

export default function SettingsLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <>
      <SkipToMain />
      <TopBar />
      {children}
    </>
  );
}
