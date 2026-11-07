import { Fragment } from "react";
import { site } from "@/content/site";
import styles from "./SiteFooter.module.css";

/** `tagline` parts are shown joined by a spaced slash. */
export function SiteFooter({ tagline }: { tagline: readonly string[] }) {
  return (
    <footer className={`container ${styles.footer}`}>
      <div className={styles.inner}>
        <p className={styles.tagline}>
          {tagline.map((part, index) => (
            <Fragment key={part}>
              {index > 0 && <span className={styles.separator}> / </span>}
              {part}
            </Fragment>
          ))}
        </p>
        <a className={styles.github} href={site.githubUrl} rel="me noopener">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </footer>
  );
}
