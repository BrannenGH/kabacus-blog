export const hero = {
  title: ["Books you can", "trust and check."],
  intro:
    "Kabacus keeps double-entry books in a file or a database. Every change is validated before it is stored, and every version is kept.",
};

export const features: ReadonlyArray<{ title: string; body: string; article: string }> = [
  {
    title: "Cash on Hand",
    body: "One number for what you can spend right now, after reserves, card balances and money owed to you are set apart.",
    article: "cash-on-hand",
  },
  {
    title: "Reserves instead of budgets",
    body: "Set money aside for later inside the account that holds it. Only what is really there can be set aside.",
    article: "reserves",
  },
  {
    title: "Credit cards that add up",
    body: "A card’s reserve always equals what the card owes, so paying the card never surprises you.",
    article: "credit-cards",
  },
  {
    title: "People and shared costs",
    body: "Split expenses, track who owes whom and export a netted statement as CSV or PDF.",
    article: "people",
  },
  {
    title: "Reports",
    body: "Income statement, balance sheet, spending by category, Cash on Hand over time, cash flow and receivables.",
    article: "reports",
  },
  {
    title: "Reconcile",
    body: "Compare an account with your statement, see the likely explanations and lock the agreement in with a balance check.",
    article: "reconcile",
  },
  {
    title: "Every version kept",
    body: "Edits happen in place, voids add a reversal, and the history shows who changed what, with a diff.",
    article: "history",
  },
  {
    title: "Exact money",
    body: "Amounts are whole numbers with decimal places. Nothing is ever rounded by floating point.",
    article: "books",
  },
  {
    title: "Bring your hledger journals",
    body: "Import a journal once, export one any time. Accounting follows hledger’s.",
    article: "import-export",
  },
  {
    title: "KDE, web and phone",
    body: "A convergent Kirigami app, a web app and installable PWA with the same destinations and words, on desktop and phone.",
    article: "web-app",
  },
  {
    title: "Command line and MCP",
    body: "kabacus-cli scripts every action. Local and server MCP let an AI assistant work on your books with the same checks as a person.",
    article: "cli-and-mcp",
  },
  {
    title: "Shared books on a server",
    body: "Several people and devices, sign-in through any OAuth 2.0 / OpenID Connect provider, roles for read, write and rewrite.",
    article: "server",
  },
];

export const principles = {
  label: "Why Kabacus",
  heading: "Careful by design.",
  paragraphs: [
    "Every write is checked against the books it would produce before it is stored: transactions balance, accounts and commodities are declared, balance assertions hold. A preview shows the result first.",
    "Books live in a file you own. A server is only for books shared between people or devices, and the app, the command line and the server all run the same code, so they always agree.",
  ],
};

export const screenshots = [
  { src: "/screenshots/overview.webp", alt: "Kabacus Overview showing Cash on Hand, free money, reserves and credit", caption: "See what is free to spend. Overview separates available money from reserves and card payments.", article: "cash-on-hand" },
  { src: "/screenshots/preview.webp", alt: "Kabacus transaction form with a balanced preview before saving", caption: "Review before saving. The application checks a transaction against the current revision of your books.", article: "transactions" },
] as const;
