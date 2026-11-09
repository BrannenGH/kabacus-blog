import { describe, expect, it } from "vitest";
import { available } from "@/content/download";
import { features } from "@/content/home";
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
