"use client";

import focusRing from "@/lib/variants/focusRing";
import { type ReactElement } from "react";
import {
  Button,
  type ButtonProps,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const buttonStyles = tv({
  extend: focusRing,
  base: "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap border bg-transparent transition",
  variants: {
    variant: {
      default:
        "border-white/25 hover:bg-white/10 pressed:border-white/95 pressed:bg-white/10",
      ghost:
        "border-transparent hover:border-white/25 pressed:border-white/95 pressed:bg-white/10",
    },
    size: {
      default: "px-4 py-2",
      lessPadding: "px-2 py-2",
      icon: "h-10 min-h-10 w-10 min-w-10 p-0",
    },
    case: {
      normal: "normal-case",
      uppercase: "uppercase",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    case: "normal",
  },
});

export type ButtonVariants = VariantProps<typeof buttonStyles>;

export interface StyledButtonProps extends ButtonProps, ButtonVariants {}

export default function StyledButton(props: StyledButtonProps): ReactElement {
  return (
    <Button
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        buttonStyles({ ...renderProps, ...props, className }),
      )}
    />
  );
}
