"use client";

import { type ReactElement, useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

export interface LoadDetectImageProps extends ImageProps {}

/**
 * Wrapper around Next/Image with a `data-loading` attribute that is toggled
 * whenever the `src` prop changes.
 */
export default function LoadDetectImage({
  src,
  alt,
  ...props
}: LoadDetectImageProps): ReactElement {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [src]);

  return (
    <Image
      src={src}
      data-loading={loading}
      alt={alt}
      {...props}
      onLoad={() => {
        setLoading(false);
      }}
    />
  );
}
