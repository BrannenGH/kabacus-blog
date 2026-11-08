import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DownloadPage from "@/app/download/page";
import HomePage from "@/app/page";
import ArticlePage from "@/app/wiki/[slug]/page";
import WikiPage from "@/app/wiki/page";
import { SiteHeader } from "@/components/SiteHeader";
import { features } from "@/content/home";
import { articles } from "@/content/wiki";

describe("navigation", () => {
  it("links every page and marks only the current one", () => {
    render(<SiteHeader current="/download" />);
    const links = within(screen.getByRole("navigation", { name: "Main" })).getAllByRole("link");
    expect(links.map((link) => [link.textContent, link.getAttribute("href")])).toEqual([
      ["Home", "/"],
      ["Download", "/download"],
      ["Help wiki", "/wiki"],
    ]);
    expect(links.filter((link) => link.getAttribute("aria-current") === "page")).toHaveLength(1);
  });
});

describe("home", () => {
  it("explains every feature and links its help article", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Books you can trust and check.");
    for (const feature of features) {
      expect(screen.getByRole("heading", { level: 3, name: feature.title })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("link", { name: /Learn more/ })).toHaveLength(features.length);
    expect(screen.getByRole("link", { name: /Download Kabacus/ })).toHaveAttribute("href", "/download");
  });
});

describe("download", () => {
  it("offers the release, the repository and the server image", () => {
    render(<DownloadPage />);
    expect(screen.getByRole("link", { name: /Latest release on GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/BrannenGH/kabacus/releases/tag/latest",
    );
    expect(screen.getByRole("link", { name: /repo\.hallb\.me/ })).toBeInTheDocument();
    expect(screen.getByText("podman pull ghcr.io/brannengh/kabacus-server:latest")).toBeInTheDocument();
  });
});

describe("wiki", () => {
  it("lists every article under its group", () => {
    render(<WikiPage />);
    for (const article of articles) {
      expect(screen.getByRole("link", { name: article.title })).toHaveAttribute("href", `/wiki/${article.slug}`);
    }
  });

  it("renders an article with its steps and a link to the others", async () => {
    render(await ArticlePage({ params: Promise.resolve({ slug: "getting-started" }) }));
    expect(screen.getByRole("heading", { level: 1, name: "Getting started" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(4);
    expect(screen.getByRole("link", { name: "Cash on Hand" })).toHaveAttribute("href", "/wiki/cash-on-hand");
  });
});
