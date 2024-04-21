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
      {/* TODO: Remove when desktop experience is ready */}
      <p className="col-span-full col-start-1 hidden justify-self-center bg-black p-1 text-center text-xs sm:inline-block">
        🚧 Desktop experience under construction 🚧
      </p>
      {children}
    </>
  );
}
