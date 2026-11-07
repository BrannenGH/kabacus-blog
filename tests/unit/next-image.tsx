import type { ImgHTMLAttributes } from "react";

// next/image needs Next's runtime; a plain <img> is enough to test markup.
export default function Image({
  src,
  alt,
  fill: _fill,
  priority: _priority,
  placeholder: _placeholder,
  ...rest
}: Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | { src: string };
  fill?: boolean;
  priority?: boolean;
  placeholder?: string;
}) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={typeof src === "string" ? src : src.src} alt={alt} {...rest} />;
}
