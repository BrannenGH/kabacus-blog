import type { MetadataRoute } from "next";
import { navigation } from "@/content/site";
import { articles } from "@/content/wiki";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...navigation.map((item) => ({ url: absoluteUrl(item.href) })),
    ...articles.map((article) => ({ url: absoluteUrl(`/wiki/${article.slug}`) })),
  ];
}
