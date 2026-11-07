export const site = {
  name: "Kabacus",
  description:
    "Kabacus keeps double-entry books in a file or a database, from a KDE app, a web app, a command line or an MCP client. Every change is validated and every version is kept.",
  githubUrl: "https://github.com/BrannenGH/kabacus",
  releasesUrl: "https://github.com/BrannenGH/kabacus/releases/tag/latest",
  url: "https://kabacus.hallb.me",
  language: "en",
  locale: "en_US",
} as const;

export type ProjectIcon = "abacus";

export type NavPath = "/" | "/download" | "/wiki";

export const navigation: ReadonlyArray<{ href: NavPath; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/download", label: "Download" },
  { href: "/wiki", label: "Help wiki" },
];
