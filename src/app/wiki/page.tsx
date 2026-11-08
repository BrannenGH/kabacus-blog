import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { SectionLabel } from "@/components/SectionLabel";
import { articles, groups } from "@/content/wiki";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata({
  path: "/wiki",
  title: "Help wiki",
  description: "Help articles that explain everything Kabacus does: books, accounts, reserves, cards, reports, the command line, MCP and servers.",
});

export default function WikiPage() {
  return (
    <PageShell current="/wiki">
      <header className={styles.header}>
        <SectionLabel>Help wiki</SectionLabel>
        <h1 className={styles.title}>How Kabacus works.</h1>
        <p className={styles.intro}>Short articles on everything Kabacus does, from your first transaction to running a server.</p>
      </header>
      {groups.map((group, index) => (
        <section key={group} className={styles.group} aria-labelledby={`group-${index}`}>
          <SectionLabel as="h2" id={`group-${index}`}>
            {group}
          </SectionLabel>
          <ul className={styles.articles}>
            {articles
              .filter((article) => article.group === group)
              .map((article) => (
                <li key={article.slug}>
                  <h3 className={styles.articleTitle}>
                    <Link href={`/wiki/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className={styles.summary}>{article.summary}</p>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </PageShell>
  );
}
