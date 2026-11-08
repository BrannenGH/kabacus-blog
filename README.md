# Kabacus website

The site for [Kabacus](https://github.com/BrannenGH/kabacus): the home page
with every feature, download links, and a help wiki that explains how
Kabacus works. A server-rendered React app built with
[Next.js](https://nextjs.org/) (App Router, React Server Components); pages
ship no client-side JavaScript of their own. The design follows Brannen
Hall's personal site.

## Requirements

- Node.js 22.12 or newer (`.nvmrc`)
- npm

## Develop

```sh
npm ci
npm run dev        # http://localhost:3000
```

| Variable   | Purpose                                                              |
| ---------- | -------------------------------------------------------------------- |
| `SITE_URL` | Optional. Public origin for canonical URLs and the sitemap, read at build time. Defaults to `https://kabacus.hallb.me`. |

## Build and run

```sh
npm run build
npm start
```

## Test

```sh
npm run lint
npm run typecheck
npm test                              # unit tests (Vitest + Testing Library)
npm run build && npm run test:e2e     # Playwright against `next start`
```

End-to-end tests need Chromium (`npx playwright install chromium`) and run
at 1440 px, plus a 390 px check of every page type. CI runs all of the above
on pull requests; `attribution.yml` runs `scripts/check-attribution`, which
fails a pull request whose commits, title or description credit an AI
coding agent.

## Layout

- `src/app/`: routes (`/`, `/download`, `/wiki`, `/wiki/<article>`), tokens
  (`globals.css`) and self-hosted fonts
- `src/components/`: shared server components, each with a CSS module
- `src/content/`: copy as typed modules; help articles are in `wiki.ts`
- `public/art/`: artwork exported from the design file

## Adding a help article

Add an entry to `articles` in `src/content/wiki.ts` with a `group`, a
`summary` and its blocks. It appears on `/wiki`, gets its own page and joins
the sitemap. Check any command against `kabacus-cli --help`.

## Licence

All rights reserved; see `LICENSE`.
