import type { ProjectIcon } from "@/content/site";
import styles from "./WovenIcon.module.css";

export function WovenIcon({ icon, size = 136, className = "" }: { icon: ProjectIcon; size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- decorative SVG, nothing to optimise
    <img
      className={`${styles.icon} ${className}`}
      src={`/art/icon-${icon}.svg`}
      alt=""
      width={size}
      height={size}
    />
  );
}
