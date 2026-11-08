import type { Metadata } from "next";
import { site } from "@/content/site";

/** A page's title, description, canonical URL and share tags. */
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  /** The page's own title; the full title adds the site name. */
  title?: string;
  description: string;
}): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — Double-entry books you can check`;
  return {
    title: title ?? { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title: fullTitle, description, siteName: site.name, locale: site.locale },
    twitter: { card: "summary", title: fullTitle, description },
  };
}
