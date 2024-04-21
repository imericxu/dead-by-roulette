"use client";

import { Suspense, type ReactElement } from "react";
import ButtonLink, { LinkProps } from "./ButtonLink";
import { useSearchParams } from "next/navigation";
import { Route } from "next";
import { twMerge } from "tailwind-merge";

export interface ButtonLinkSearchParamsProps<T extends string>
  extends LinkProps<T> {
  href: Route;
  searchParams: string[];
}

export default function ButtonLinkSearchParams<T extends string>(
  props: ButtonLinkSearchParamsProps<T>,
): ReactElement {
  const { searchParams, ...buttonLinkProps } = props;

  return (
    <Suspense
      fallback={
        <ButtonLink
          {...buttonLinkProps}
          isDisabled
          className={twMerge(props.className, "cursor-wait")}
        />
      }
    >
      <_ButtonLinkSearchParams {...props} />
    </Suspense>
  );
}

function _ButtonLinkSearchParams<T extends string>(
  props: ButtonLinkSearchParamsProps<T>,
): ReactElement {
  const { searchParams: _, ...buttonLinkProps } = props;
  const searchParams = useSearchParams();
  const query = new URLSearchParams();
  for (const param of props.searchParams) {
    const value = searchParams.get(param);
    if (value !== null) {
      query.set(param, value);
    }
  }

  return (
    <ButtonLink
      {...{ ...buttonLinkProps, href: `${props.href}?${query.toString()}` }}
    />
  );
}
