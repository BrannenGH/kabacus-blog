import Link from "next/link";
import { navigation, type NavPath } from "@/content/site";
import styles from "./SiteHeader.module.css";

export function SiteHeader({ current }: { current?: NavPath }) {
  return (
    <header className={`container ${styles.header}`}>
      <nav aria-label="Main">
        <ul className={styles.list}>
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={styles.link}
                aria-current={item.href === current ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
