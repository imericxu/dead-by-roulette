import SkipToMain from "@/components/SkipToMain";
import { ReactElement, ReactNode, Suspense } from "react";
import TopBar from "./_components/TopBar";

export default function SettingsLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <>
      <SkipToMain />
      <Suspense>
        <TopBar />
      </Suspense>
      {children}
    </>
  );
}
