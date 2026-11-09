# CLAUDE.md

The website for Kabacus: a Next.js (App Router) app that renders React on
the server, in the same design as Brannen Hall's personal site. `README.md`
covers building and testing; read it first.

Hard rules:

- **Server-rendered first.** Pages are React Server Components that render
  their content and links to HTML. Add a client component (`"use client"`)
  only for a control that needs it, and keep it small.
- **Follow the design.** Colours and spacing come from `src/app/globals.css`
  (the charcoal and red palette). Desktop is a 1440 px canvas with 1296 px of content
  and 72 px margins; below 768 px it is one column with 24 px gutters.
- **Content lives in `src/content/`**, not inline in pages. Help articles are
  typed data in `src/content/wiki.ts`.
- **Accurate to Kabacus.** The site describes what Kabacus does today. The public
  help manual explains the specification for users; distinguish current behavior
  from planned features. Do not link to the internal specification wiki. Check
  commands and flags against `kabacus-cli --help`.
- **Self-host assets.** No third-party requests from the page: fonts come
  from the Fontsource packages via `next/font/local`.
- **Accessible by default.** Semantic landmarks and headings, real links,
  visible focus, reduced-motion support, alt text on meaningful images.
- **Done means proven by automated tests.** Lint, typecheck, unit and
  end-to-end tests pass in CI. Write the test first; a bug fix starts with
  a failing test. Run only targeted tests locally and let CI run the full
  suite.
- **Comments are short and only where needed.**
- **All rights reserved.** See `LICENSE`. Don't add licence headers or
  open-source licence files.
- **Commits and pull requests carry the maintainer's name only.** No AI
  agent attribution anywhere (Claude, Codex/ChatGPT, Copilot, Cursor,
  Aider, Devin, Gemini or any other): no `Co-Authored-By` or session
  trailers, no "Generated with ..." lines or agent session links in PR
  descriptions or GitHub comments. `.claude/settings.json` turns Claude
  Code's own attribution off too. An agent is never a commit's author or
  committer: if git's identity is an agent's, set this repository's
  `user.name` and `user.email` to the maintainer's before committing. The
  Attribution workflow (`scripts/check-attribution`) fails a pull request
  that breaks any of this.
- **Branches follow git flow.** Name a branch `<type>/<topic>`, where
  `<type>` is `feature`, `bugfix`, `hotfix`, `release` or `support` and
  `<topic>` is short kebab-case. An AI agent puts the GitHub username of
  the person it works for between the two: `feature/<username>/<topic>`.
- **`master` is protected.** Change it through pull requests only.
- **Personal notes go in `CLAUDE.local.md`** (gitignored).
