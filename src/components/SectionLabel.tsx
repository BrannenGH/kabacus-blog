import type { ReactNode } from "react";
import styles from "./SectionLabel.module.css";

export function SectionLabel({
  as: Tag = "p",
  tone = "madder",
  id,
  children,
}: {
  as?: "p" | "h2";
  tone?: "madder" | "ink" | "parchment";
  id?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} className={`${styles.label} ${styles[tone]}`}>
      {children}
    </Tag>
  );
}
