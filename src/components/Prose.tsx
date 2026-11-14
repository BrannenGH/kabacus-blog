import Link from "next/link";
import { findArticle, type Block } from "@/content/wiki";
import styles from "./Prose.module.css";

export function Prose({ blocks }: { blocks: readonly Block[] }) {
  return (
    <div className={styles.prose}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return <h2 id={`section-${index}`} key={index}>{block.text}</h2>;
          case "p":
            return <p key={index}>{block.text}</p>;
          case "ul":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );
          case "table":
            return <div className={styles.tableWrap} role="region" aria-label={block.columns.join(" / ")} tabIndex={0} key={index}>
              <table><thead><tr>{block.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
                <tbody>{block.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} data-label={block.columns[j]}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>;
          case "links":
            return <ul key={index}>{block.slugs.map((slug) => <li key={slug}><Link href={`/wiki/${slug}`}>{findArticle(slug)!.title}</Link></li>)}</ul>;
          case "image":
            return <figure key={index}>
              {/* eslint-disable-next-line @next/next/no-img-element -- self-hosted documentation screenshot */}
              <a href={block.src}><img className={block.height > block.width ? styles.portrait : undefined} src={block.src} alt={block.alt} width={block.width} height={block.height} loading="lazy" /></a>
              <figcaption>{block.caption}</figcaption>
            </figure>;
          case "code":
            return (
              <pre key={index} tabIndex={0}>
                <code>{block.text}</code>
              </pre>
            );
        }
      })}
    </div>
  );
}
