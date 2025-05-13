import Image from "next/image";
import { useState } from "react";
import React from "react";
import {
  OnLoadingComplete,
  PlaceholderValue,
} from "../../../../../../node_modules/next/dist/shared/lib/get-img-props";
import { ImageLoader } from "next/dist/client/image-component";

export type TImage = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"
> & {
  src: string;
  alt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
  loader?: ImageLoader;
  quality?: number | `${number}`;
  priority?: boolean;
  loading?: "eager" | "lazy" | undefined;
  placeholder?: PlaceholderValue;
  blurDataURL?: string;
  unoptimized?: boolean;
  overrideSrc?: string;
  onLoadingComplete?: OnLoadingComplete;
  layout?: string;
  objectFit?: string;
  objectPosition?: string;
  lazyBoundary?: string;
  lazyRoot?: string;
} & React.RefAttributes<HTMLImageElement | null> & { fallbackSrc: string };
export default function FallbackImage({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  ...props
}: TImage) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={() => {
        if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
      }}
    />
  );
}
