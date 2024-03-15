"use client";

import focusRing from "@/lib/variants/focusRing";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { type ReactElement, type ReactNode } from "react";
import { type HoverProps, useFocusRing, useHover } from "react-aria";
import { tv, type VariantProps } from "tailwind-variants";

const link = tv({
  extend: focusRing,
  base: "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap border uppercase transition active:border-white/95 active:bg-white/10",
  variants: {
    variant: {
      default: "border-white/25",
      ghost: "border-transparent",
    },
    btnSize: {
      default: "px-4 py-2",
      icon: "h-10 min-h-10 w-10 min-w-10 p-0",
    },
    isHovered: {
      true: "",
    },
  },
  compoundVariants: [
    {
      isHovered: true,
      variant: "default",
      class: "bg-white/10",
    },
    {
      isHovered: true,
      variant: "ghost",
      class: "border-white/25",
    },
  ],
  defaultVariants: {
    variant: "default",
    btnSize: "default",
  },
});

export type LinkVariants = VariantProps<typeof link>;

export interface LinkProps<T extends string>
  extends NextLinkProps<T>,
    LinkVariants,
    HoverProps {
  children?: ReactNode;
  className?: string;
}

export default function ButtonLink<T extends string>(
  props: LinkProps<T>,
): ReactElement {
  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <NextLink
      {...{ ...props, ...hoverProps, ...focusProps }}
      className={link({ ...props, isHovered, isFocusVisible })}
    >
      {props.children}
    </NextLink>
  );
}
