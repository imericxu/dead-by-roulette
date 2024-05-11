"use client";

import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  type ReactElement,
} from "react";
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
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.classList.add("opacity-0");
  }, [props.src, props.srcSet]);

  return (
    <img
      ref={ref}
      alt={alt}
      onLoad={() => {
        ref.current?.classList.remove("opacity-0");
      }}
      className={twMerge("opacity-0 transition-opacity", className)}
      {..._props}
    />
  );
}
