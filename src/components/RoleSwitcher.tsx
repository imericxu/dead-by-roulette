import DbdRole from "@/lib/dbdRole";
import { type Route } from "next";
import { type ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import LinkSearchParams from "./LinkWithSearchParams";

export interface RoleSwitcherProps {
  role: DbdRole;
  killerLink: Route;
  survivorLink: Route;
  className?: string;
}

export default function RoleSwitcher(props: RoleSwitcherProps): ReactElement {
  return (
    <div
      className={twMerge(
        "inline-flex items-center justify-center gap-2 text-lg uppercase",
        props.className,
      )}
    >
      {/* Killer Title/Link */}
      {props.role === DbdRole.killer ? (
        <span className="font-semibold">Killer</span>
      ) : (
        <LinkSearchParams
          href={props.killerLink}
          searchParams={["tab"]}
          className="font-light transition active:scale-95 hover:text-white/75"
        >
          Killer
        </LinkSearchParams>
      )}

      {/* Divider */}
      <div className="h-4 w-px bg-white/75"></div>

      {/* Survivor Title/Link */}
      {props.role === DbdRole.survivor ? (
        <span className="font-semibold">Survivor</span>
      ) : (
        <LinkSearchParams
          href={props.survivorLink}
          searchParams={["tab"]}
          className="font-light transition active:scale-95 hover:text-white/75"
        >
          Survivor
        </LinkSearchParams>
      )}
    </div>
  );
}
