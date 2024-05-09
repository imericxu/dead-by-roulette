import { ReactElement } from "react";

export interface HexagonOutlineProps {
  className?: string;
}

export default function HexagonOutline(
  props: HexagonOutlineProps,
): ReactElement {
  return (
    <svg
      width="84"
      height="96"
      viewBox="0 0 84 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path d="M1.43078 24.5774L42 1.1547L82.5692 24.5774V71.4226L42 94.8453L1.43078 71.4226V24.5774Z" />
    </svg>
  );
}
