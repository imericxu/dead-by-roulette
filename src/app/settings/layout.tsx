import SkipToMain from "@/components/SkipToMain";
import { ReactElement, ReactNode } from "react";
import TopBar from "./_components/TopBar";

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
