import type { Block } from "@/content/wiki";
import styles from "./Prose.module.css";

export function Prose({ blocks }: { blocks: readonly Block[] }) {
  return (
    <div className={styles.prose}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return <h2 key={index}>{block.text}</h2>;
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
