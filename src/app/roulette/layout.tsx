import { type ReactElement, type ReactNode } from "react";
import TopBar from "./_components/TopBar";

export default function RouletteLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}): ReactElement {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
