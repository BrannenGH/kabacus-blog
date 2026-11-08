import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionLabel } from "@/components/SectionLabel";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./not-found.module.css";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className={`container ${styles.main}`}>
        <SectionLabel>404 / Not found</SectionLabel>
        <h1 className={styles.title}>This entry doesn’t balance.</h1>
        <p className={styles.body}>The page you were looking for isn’t here.</p>
        <ButtonLink href="/wiki">Browse the help wiki</ButtonLink>
      </main>
      <SiteFooter tagline={["Kabacus", "Books you can check"]} />
    </>
  );
}
