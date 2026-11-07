import styles from "./TextLink.module.css";

/** An outbound link in the madder accent, e.g. "Source code ↗". */
export function TextLink({ href, children, size = "md" }: { href: string; children: string; size?: "sm" | "md" }) {
  return (
    <a className={`${styles.link} ${styles[size]}`} href={href} rel="noopener">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}
