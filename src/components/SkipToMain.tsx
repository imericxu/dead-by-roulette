import { type ReactElement } from "react";

export default function SkipToMain(): ReactElement {
  return (
    <a
      href="#main"
      className="absolute -top-96 left-0 z-50 border-white/95 bg-black/80 px-4 py-2 uppercase focus:top-4"
    >
      Skip to main content
    </a>
  );
}
