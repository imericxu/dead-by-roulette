import { ReactElement, ReactNode } from "react";
import TopBar from "./TopBar";

export default function SettingsLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
}
