import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./ButtonLink.module.css";

/** Internal hrefs start with "/" and get an arrow; anything else is external. */
export function ButtonLink({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
}) {
  const className = `${styles.button} ${styles[variant]}`;
  if (href.startsWith("/")) {
    return (
      <Link className={className} href={href}>
        {children} <span aria-hidden="true">→</span>
      </Link>
    );
  }
  return (
    <a className={className} href={href} rel="noopener">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}
