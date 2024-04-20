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
  base: "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap border bg-transparent transition pressed:border-main-heavy disabled:text-white/75",
  variants: {
    variant: {
      default: "border-main-light hover:bg-overlay",
      ghost: "border-transparent hover:border-main-light",
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
    case: "uppercase",
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
