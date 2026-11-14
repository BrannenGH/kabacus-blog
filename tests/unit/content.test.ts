import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { available } from "@/content/download";
import { features, screenshots } from "@/content/home";
import { articles, findArticle, groups } from "@/content/wiki";

describe("wiki content", () => {
  it("has unique slugs and a known group for every article", () => {
    const slugs = articles.map((article) => article.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const article of articles) {
      expect(groups).toContain(article.group);
      expect(article.blocks.length).toBeGreaterThan(0);
    }
  });

  it("has an article behind every feature on the home page", () => {
    for (const feature of features) {
      expect(findArticle(feature.article), `${feature.title} → ${feature.article}`).toBeDefined();
    }
  });

  it("never links to the specification wiki or names an AI agent", () => {
    const text = JSON.stringify(articles).toLowerCase();
    expect(text).not.toContain("taiga");
    expect(text).not.toContain("generated with");
  });
});

describe("download content", () => {
  it("links only to https addresses", () => {
    for (const option of available) {
      for (const link of option.links) expect(link.href).toMatch(/^https:\/\//);
    }
  });
});

// Width and height of a lossy, lossless or extended WebP file.
function webpSize(file: Buffer): [number, number] {
  const chunk = file.toString("ascii", 12, 16);
  if (chunk === "VP8 ") return [file.readUInt16LE(26) & 0x3fff, file.readUInt16LE(28) & 0x3fff];
  if (chunk === "VP8L") {
    const bits = file.readUInt32LE(21);
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
  }
  return [file.readUIntLE(24, 3) + 1, file.readUIntLE(27, 3) + 1];
}

describe("manual screenshots", () => {
  const images = articles.flatMap((article) =>
    article.blocks.flatMap((block) => (block.type === "image" ? [{ slug: article.slug, ...block }] : [])),
  );

  it("illustrates the everyday guides", () => {
    expect(new Set(images.map((image) => image.slug)).size).toBeGreaterThanOrEqual(6);
  });

  it("points at files that exist, at the size each declares", () => {
    for (const image of [...images, ...screenshots]) {
      const path = join(process.cwd(), "public", image.src);
      expect(existsSync(path), image.src).toBe(true);
      expect(webpSize(readFileSync(path)), image.src).toEqual([image.width, image.height]);
    }
  });
});

describe("command-line examples", () => {
  // `kabacus-cli --help` in the release the manual describes.
  const subcommands = ["info", "new", "report", "export", "history", "run", "commands", "mcp", "completions", "man", "--help"];

  it("use only subcommands kabacus-cli provides", () => {
    for (const article of articles) {
      for (const block of article.blocks) {
        if (block.type !== "code") continue;
        for (const [, subcommand] of block.text.matchAll(/^kabacus-cli (\S+)/gm)) {
          expect(subcommands, `${article.slug}: kabacus-cli ${subcommand}`).toContain(subcommand);
        }
      }
    }
  });

  it("no longer offer a journal import", () => {
    const text = JSON.stringify(articles);
    expect(text).not.toMatch(/kabacus-(cli|server) import/);
  });
});

describe("manual cross-references", () => {
  it("links only to real articles and provides a section heading on each page", () => {
    for (const article of articles) {
      expect(article.blocks.some((block) => block.type === "h2"), article.slug).toBe(true);
      for (const block of article.blocks) {
        if (block.type === "links") {
          for (const slug of block.slugs) expect(findArticle(slug), slug).toBeDefined();
        }
      }
    }
  });
});
