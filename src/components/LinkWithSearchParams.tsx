"use client";

import { Route } from "next";
import Link, { LinkProps } from "next/link";
import { useSearchParams } from "next/navigation";
import { type ReactElement, Suspense } from "react";
import { twMerge } from "tailwind-merge";

export interface LinkSearchParamsProps<T extends string> extends LinkProps<T> {
  href: Route;
  searchParams: string[];
}

export default function LinkSearchParams<T extends string>(
  props: LinkSearchParamsProps<T>,
): ReactElement {
  const { searchParams, ...buttonLinkProps } = props;

  return (
    <Suspense
      fallback={
        <Link
          {...buttonLinkProps}
          className={twMerge(
            props.className,
            "pointer-events-none cursor-wait",
          )}
        />
      }
    >
      <_LinkSearchParams {...props} />
    </Suspense>
  );
}

function _LinkSearchParams<T extends string>({
  searchParams: propSearchParams,
  ...props
}: LinkSearchParamsProps<T>): ReactElement {
  const searchParams = useSearchParams();
  const query = new URLSearchParams();
  for (const param of propSearchParams) {
    const value = searchParams.get(param);
    if (value !== null) {
      query.set(param, value);
    }
  }

  return <Link {...{ ...props, href: `${props.href}?${query.toString()}` }} />;
}
