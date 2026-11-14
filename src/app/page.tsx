import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PageShell } from "@/components/PageShell";
import { SectionLabel } from "@/components/SectionLabel";
import { WovenIcon } from "@/components/WovenIcon";
import { features, hero, principles, screenshots } from "@/content/home";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata({ path: "/", description: site.description });

export default function HomePage() {
  return (
    <PageShell current="/">
      <section className={styles.hero} aria-labelledby="hero-title">
        <WovenIcon icon="abacus" size={112} className={styles.icon} />
        <h1 id="hero-title" className={styles.title}>
          {hero.title[0]} <span className={styles.nowrap}>{hero.title[1]}</span>
        </h1>
        <p className={styles.intro}>{hero.intro}</p>
        <div className={styles.actions}>
          <ButtonLink href="/download">Download Kabacus</ButtonLink>
          <ButtonLink href="/wiki" variant="secondary">
            Read the help wiki
          </ButtonLink>
        </div>
      </section>

      <section className={styles.showcase} aria-labelledby="screens-heading">
        <SectionLabel as="h2" id="screens-heading">Inside Kabacus</SectionLabel>
        <div className={styles.screens}>
          {screenshots.map((shot) => (
            <figure key={shot.src}>
              <Link href={`/wiki/${shot.article}`}>
                {/* eslint-disable-next-line @next/next/no-img-element -- self-hosted, pre-sized screenshots */}
                <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
              </Link>
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
        <p className={styles.more}>Sample books in the web app. Select a screenshot for its guide.</p>
      </section>
      <section className={styles.section} aria-labelledby="features-heading">
        <SectionLabel as="h2" id="features-heading">
          01 / Features
        </SectionLabel>
        <ul className={styles.features}>
          {features.map((feature) => (
            <li key={feature.title}>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureBody}>{feature.body}</p>
              <p>
                <Link className={styles.more} href={`/wiki/${feature.article}`}>
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${styles.section} ${styles.principles}`} aria-labelledby="principles-heading">
        <SectionLabel>02 / {principles.label}</SectionLabel>
        <h2 id="principles-heading" className={styles.principlesHeading}>
          {principles.heading}
        </h2>
        <div className={styles.principlesBody}>
          {principles.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
