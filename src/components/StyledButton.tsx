"use client";

import focusRing from "@/lib/variants/focusRing";
import { type ReactElement } from "react";
import {
  Button,
  type ButtonProps,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  extend: focusRing,
  base: "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap border uppercase",
  variants: {
    variant: {
      default:
        "border-white/25 hover:bg-white/10 pressed:border-white/95 pressed:bg-white/10",
      ghost:
        "border-transparent hover:border-white/25 hover:bg-transparent pressed:border-white/95 pressed:bg-white/10",
    },
    size: {
      default: "px-4 py-2",
      icon: "h-10 min-h-10 w-10 min-w-10 p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type ButtonVariants = VariantProps<typeof button>;

export interface StyledButtonProps extends ButtonProps, ButtonVariants {}

export default function StyledButton(props: StyledButtonProps): ReactElement {
  return (
    <Button
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, ...props, className }),
      )}
    />
  );
}
