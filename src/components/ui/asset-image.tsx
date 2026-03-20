"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type AssetImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fallbackClassName?: string;
};

/** Local public image with gradient fallback if file is missing. */
export function AssetImage({
  src,
  alt,
  className,
  fallbackClassName,
  onError,
  ...props
}: AssetImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "bg-gradient-to-br from-accent-subtle to-bg-tertiary",
          fallbackClassName,
          className,
        )}
        aria-hidden
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
      {...props}
    />
  );
}
