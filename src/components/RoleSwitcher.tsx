import DbdRole from "@/lib/dbdRole";
import { type Route } from "next";
import Link from "next/link";
import { type ReactElement } from "react";
import { twMerge } from "tailwind-merge";

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
        <Link
          href={props.killerLink}
          className="font-light transition hover:text-white/75 active:scale-95"
        >
          Killer
        </Link>
      )}

      {/* Divider */}
      <div className="h-4 w-px bg-white/75"></div>

      {/* Survivor Title/Link */}
      {props.role === DbdRole.survivor ? (
        <span className="font-semibold">Survivor</span>
      ) : (
        <Link
          href={props.survivorLink}
          className="font-light transition hover:text-white/75 active:scale-95"
        >
          Survivor
        </Link>
      )}
    </div>
  );
}
