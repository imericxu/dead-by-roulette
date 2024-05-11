"use client";

import { DetailedHTMLProps, ImgHTMLAttributes, type ReactElement } from "react";
import { twMerge } from "tailwind-merge";

export interface LoadFadeImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

/**
 * Automatically fade in images as they load.
 */
export default function LoadFadeImage({
  ...props
}: LoadFadeImageProps): ReactElement {
  const { alt, className, ..._props } = props;
  return (
    <img
      alt={alt}
      onLoad={(e) => {
        e.currentTarget.classList.remove("opacity-0");
      }}
      onChange={(e) => {
        e.currentTarget.classList.add("opacity-0");
      }}
      className={twMerge("opacity-0 transition-opacity", className)}
      {..._props}
    />
  );
}
