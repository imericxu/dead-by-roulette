import { type ReactElement, type ReactNode } from "react";
import TopBar from "./TopBar";

export default function RouletteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
