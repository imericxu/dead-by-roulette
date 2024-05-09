import { ReactElement } from "react";

export interface DiamondOutlineProps {
  className?: string;
}

export default function DiamondOutline(
  props: DiamondOutlineProps,
): ReactElement {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path d="M1.41421 48L48 1.41421L94.5858 48L48 94.5858L1.41421 48Z" />
    </svg>
  );
}
