import { expect, test } from "@playwright/test";
import { articles } from "../../src/content/wiki";

const pages = [
  { path: "/", title: "Kabacus — Double-entry books you can check", h1: "Books you can trust and check.", nav: "Home" },
  { path: "/download", title: "Download — Kabacus", h1: "Get Kabacus.", nav: "Download" },
  { path: "/wiki", title: "Help wiki — Kabacus", h1: "How Kabacus works.", nav: "Help wiki" },
];

test.describe("server rendering", () => {
  test.use({ javaScriptEnabled: false });

  for (const page of pages) {
    test(`${page.path} renders its content without JavaScript`, async ({ page: browser }) => {
      const response = await browser.goto(page.path);
      expect(response?.status()).toBe(200);
      await expect(browser).toHaveTitle(page.title);
      await expect(browser.getByRole("heading", { level: 1 })).toHaveText(page.h1);
      await expect(browser.getByRole("navigation", { name: "Main" }).getByRole("link", { name: page.nav })).toHaveAttribute(
        "aria-current",
        "page",
      );
      await expect(browser.getByRole("contentinfo")).toBeVisible();
    });
  }

  for (const article of articles) {
    test(`/wiki/${article.slug} renders`, async ({ page }) => {
      const response = await page.goto(`/wiki/${article.slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(article.title);
    });
  }

  test("an unknown article is a 404", async ({ page }) => {
    const response = await page.goto("/wiki/payroll");
    expect(response?.status()).toBe(404);
  });
});

test("a home feature leads to its help article", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Learn more" }).first().click();
  await expect(page).toHaveURL(/\/wiki\//);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("the desktop layout keeps 1296 px of content with 72 px margins", async ({ page }) => {
  for (const { path } of pages) {
    await page.goto(path);
    const box = await page.getByRole("main").evaluate((main) => {
      const style = getComputedStyle(main);
      const rect = main.getBoundingClientRect();
      return {
        content: rect.width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight),
        left: rect.left + parseFloat(style.paddingLeft),
        scroll: document.documentElement.scrollWidth,
      };
    });
    expect(box).toEqual({ content: 1296, left: 72, scroll: 1440 });
  }
});

test("fonts come from this site", async ({ page }) => {
  const origins = new Set<string>();
  page.on("request", (request) => origins.add(new URL(request.url()).origin));
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(origins).toEqual(new Set([new URL(page.url()).origin]));
});

test("below 768 px every page is one column with 24 px gutters", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/", "/download", "/wiki", "/wiki/server"]) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  }
  await page.goto("/");
  const action = await page.getByRole("link", { name: /Download Kabacus/ }).boundingBox();
  expect(action!.x).toBe(24);
  expect(action!.width).toBe(342);
});

test("application screenshots load and the manual contents navigates", async ({ page }) => {
  await page.goto("/");
  const image = page.getByRole("img", { name: /Kabacus Overview/ });
  await expect(image).toBeVisible();
  expect(await image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
  await page.getByRole("link", { name: /Kabacus Overview/ }).click();
  const contents = page.getByRole("navigation", { name: "On this page" });
  await contents.getByRole("link", { name: "Worked calculation" }).click();
  await expect(page).toHaveURL(/#section-/);
  await expect(page.getByRole("heading", { name: "Worked calculation" })).toBeInViewport();
});

test("dark theme and restrained motion respect user preferences", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe("dark");
  expect(await page.locator("section").first().evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/wiki/ledger-rules", "/wiki/transactions", "/wiki/troubleshooting"]) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  }
});
