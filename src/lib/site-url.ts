import { site } from "@/content/site";

/**
 * The public origin for canonical URLs, the sitemap and share tags. Read at
 * build time; SITE_URL overrides it, for a preview build elsewhere.
 */
export function resolveSiteUrl(env: Record<string, string | undefined> = process.env): URL {
  return new URL(env.SITE_URL || site.url);
}

export const siteUrl = resolveSiteUrl();

/** An absolute URL on this site. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).href;
}
