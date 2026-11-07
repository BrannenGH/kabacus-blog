import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { inter, playfair } from "./fonts";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: `${site.name} — Double-entry books you can check`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, locale: site.locale },
  twitter: { card: "summary" },
};

export const viewport: Viewport = { themeColor: "#f2eddf" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <a className={styles.skip} href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
