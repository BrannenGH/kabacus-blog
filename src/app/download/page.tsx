import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { SectionLabel } from "@/components/SectionLabel";
import { TextLink } from "@/components/TextLink";
import { available, comingSoon } from "@/content/download";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata({
  path: "/download",
  title: "Download",
  description: "Download Kabacus for Linux as an RPM or DEB, from the package repository, or run the server as a container.",
});

export default function DownloadPage() {
  return (
    <PageShell current="/download">
      <header className={styles.header}>
        <SectionLabel>Download</SectionLabel>
        <h1 className={styles.title}>Get Kabacus.</h1>
        <p className={styles.intro}>
          Kabacus is in active development. Builds follow the master branch; the source is on{" "}
          <TextLink href={site.githubUrl}>GitHub</TextLink>.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="available-heading">
        <SectionLabel as="h2" id="available-heading">
          Available now
        </SectionLabel>
        <ul className={styles.list}>
          {available.map((option) => (
            <li key={option.title} className={styles.option}>
              <h3 className={styles.optionTitle}>{option.title}</h3>
              <p>{option.body}</p>
              {option.command && (
                <pre className={styles.command} tabIndex={0}>
                  <code>{option.command}</code>
                </pre>
              )}
              <p className={styles.links}>
                {option.links.map((link) => (
                  <TextLink key={link.href} href={link.href}>
                    {link.label}
                  </TextLink>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="later-heading">
        <SectionLabel as="h2" id="later-heading">
          Not yet published
        </SectionLabel>
        <ul className={styles.list}>
          {comingSoon.map((item) => (
            <li key={item.title} className={styles.option}>
              <h3 className={styles.optionTitle}>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
