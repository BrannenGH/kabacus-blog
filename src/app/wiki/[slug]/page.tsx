import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { Prose } from "@/components/Prose";
import { SectionLabel } from "@/components/SectionLabel";
import { articles, findArticle } from "@/content/wiki";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = findArticle((await params).slug);
  if (!article) return {};
  return pageMetadata({ path: `/wiki/${article.slug}`, title: article.title, description: article.summary });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = findArticle((await params).slug);
  if (!article) notFound();
  const others = articles.filter((other) => other.slug !== article.slug);

  return (
    <PageShell current="/wiki">
      <article className={styles.article}>
        <header>
          <p className={styles.crumb}>
            <Link href="/wiki">Help wiki</Link> <span aria-hidden="true">/</span> {article.group}
          </p>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.summary}>{article.summary}</p>
        </header>
        <Prose blocks={article.blocks} />
      </article>
      <nav className={styles.more} aria-labelledby="more-heading">
        <SectionLabel as="h2" id="more-heading">
          More help
        </SectionLabel>
        <ul className={styles.moreList}>
          {others.map((other) => (
            <li key={other.slug}>
              <Link href={`/wiki/${other.slug}`}>{other.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </PageShell>
  );
}
