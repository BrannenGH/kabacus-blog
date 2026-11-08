export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: readonly string[] }
  | { type: "ol"; items: readonly string[] }
  | { type: "code"; text: string };

export interface Article {
  slug: string;
  title: string;
  summary: string;
  group: string;
  blocks: readonly Block[];
}

const p = (text: string): Block => ({ type: "p", text });
const h2 = (text: string): Block => ({ type: "h2", text });
const ul = (...items: string[]): Block => ({ type: "ul", items });
const ol = (...items: string[]): Block => ({ type: "ol", items });
const code = (text: string): Block => ({ type: "code", text });

export const groups = ["Start here", "Everyday use", "Beyond the window", "Running a server"] as const;

export const articles: readonly Article[] = [
  {
    slug: "getting-started",
    group: "Start here",
    title: "Getting started",
    summary: "Install Kabacus, make your first books and record a first transaction.",
    blocks: [
      p("Kabacus keeps double-entry books in a database. By default that is a file ending in .kabacus on your computer; no server or sign-in is involved."),
      h2("Make your first books"),
      ol(
        "Install the app (see Download) and start it. With no books open it shows Welcome.",
        "Choose New Books…, pick where to save the .kabacus file, then give it a currency and a first account.",
        "Press Add (Ctrl+N) and choose what happened: spent, received, card purchase, transfer and so on.",
        "Fill in the amount. The preview shows the balances before and after and whether the books balance. Save when it looks right.",
      ),
      h2("Already use hledger?"),
      p("Import your journal once with kabacus-cli. After that the database is the books and the journal files are no longer read. See Import and export."),
      h2("Where things are"),
      p("The sidebar lists the destinations in a fixed order: Overview, Transactions, Reserves, Credit, Loans, People, Reports and Activity. Settings is at the foot. The foot of the sidebar also says where your books live and that every change is saved."),
    ],
  },
  {
    slug: "books",
    group: "Start here",
    title: "Books, files and windows",
    summary: "What a set of books is, how files and windows work, and why money is exact.",
    blocks: [
      p("The books are a SQLite file (.kabacus) that the apps and kabacus-cli open directly. On a server they can also be a SQLite file or PostgreSQL. Both behave identically. Backing the database up is your job, or your host’s."),
      h2("The File menu"),
      ul(
        "New Window (Ctrl+Shift+N), New Books…, Open Books… (Ctrl+O) and Open Recent.",
        "Save a Copy As… (Ctrl+Shift+S), Close Window (Ctrl+Shift+W) and Quit (Ctrl+Q).",
        "Connect to a Server… for books on a server. It has no shortcut and nothing else asks for a server address.",
      ),
      h2("One set of books per window"),
      p("Open Recent opens books in the current window; the arrow beside an entry opens them in a new one. Books already open in another window bring that window forward. When you start again, every window from last time reopens where you left it, or you can choose to see Welcome instead in Settings → When Kabacus Starts."),
      h2("Money is exact"),
      p("Amounts are whole numbers with a number of decimal places, never floating point. A write with more decimal places than its commodity takes is refused; only an import can raise a commodity’s places."),
      h2("Descriptions and numbers"),
      p("A description can’t contain a line break or a semicolon, so it can’t pose as postings or tags in the journal text. Every transaction gets a number when it is first written; it never changes, even when you edit the transaction."),
    ],
  },
  {
    slug: "accounts",
    group: "Everyday use",
    title: "Accounts and their kinds",
    summary: "How Kabacus decides what an account is from its name.",
    blocks: [
      p("There are no monthly budgets. Instead every account has a kind, worked out from its path by a table of rules in the server’s configuration. The first matching rule wins."),
      ul(
        "assets:bank:checking is money.",
        "assets:bank:checking:insurance is a reserve (a fund) inside that bank account.",
        "assets:bank:checking:card-visa is a card’s reserve.",
        "assets:receivable:<person> and liabilities:payable:<person> are what a person owes you and what you owe them.",
        "liabilities:credit-card:visa is a card; liabilities:loans:* and liabilities:mortgage:* are loans.",
        "Other kinds are non-liquid, income and expense.",
      ),
      h2("Friendly names"),
      p("Tags on an account give friendly names: ynab-account: for accounts and ynab-envelope: for categories. An account’s kind never comes from a tag."),
      h2("Warnings"),
      p("An account no rule matches, an overdrawn reserve or a card reserve that does not match its card produces a warning on Overview with the one action that fixes it. A warning never blocks a write."),
    ],
  },
  {
    slug: "transactions",
    group: "Everyday use",
    title: "Recording and changing transactions",
    summary: "The Add chooser, previews, editing in place, voiding and conflicts.",
    blocks: [
      h2("Add"),
      p("Add is one chooser, named after what happened: spent, received, card purchase, transfer, set aside, pay a card, split with someone, or postings for full control. Keys 1–8 choose. A payee you have used before pre-fills the form from its last transaction, and account pickers offer likely accounts first."),
      h2("Preview, then save"),
      p("Every write previews first with a dry run: balances before and after, the change in Cash on Hand, the transaction’s text and whether the books balance. Saving writes it as one new numbered revision (“Saved as revision 418”, with View)."),
      h2("Edit in place"),
      p("Click a transaction to edit it. Saving replaces it, keeps its number and keeps its comments, tags and assertions. Leaving out a posting that carries a balance assertion is an error, not a silent removal. Saving without a change writes nothing."),
      h2("Void"),
      p("A void adds a reversal dated today and leaves the original untouched. Both show in registers and net to zero. There is no revert: history only grows."),
      h2("Conflicts"),
      p("A save is checked against the revision your preview was made on. If someone or something changed the books meanwhile you get a conflict naming who made the change, never an overwrite."),
      h2("Not yet in the app"),
      ul("Delete, rename and balance-assertion rewrites from the app.", "Choosing among several ledgers in one database."),
    ],
  },
  {
    slug: "cash-on-hand",
    group: "Everyday use",
    title: "Cash on Hand",
    summary: "What you can spend right now, and how it is worked out.",
    blocks: [
      p("Cash on Hand is the free money left once reserves, card reserves and money owed to you are set apart. It is shown for today unless you ask for another day; a transaction dated in the future counts from its own day."),
      code("Cash on Hand = Money on Hand − Future Allocations − Receivables"),
      p("An overdrawn reserve sets nothing apart: its overdraft was spent from the account’s free money, so it comes off that free money."),
      h2("Where you see it"),
      ul(
        "Overview shows it first, beside the free money in each account, with a trend and its change against a month ago.",
        "Money on Hand has an info button and opens into the sum Cash on Hand comes from.",
        "Reports include Cash on Hand over time and a cash flow bridge from one day’s Cash on Hand to another’s.",
        "Every preview shows how a change moves it.",
      ),
    ],
  },
  {
    slug: "reserves",
    group: "Everyday use",
    title: "Reserves",
    summary: "Setting money aside for later, releasing it and moving it between reserves.",
    blocks: [
      p("A reserve sets money aside inside the bank account that holds it and carries forward for ever. (The books, the server and MCP call them funds.)"),
      ul(
        "Set aside into a new reserve and it is created in the same revision.",
        "Release money back to free money, or move it between reserves of the same bank account. Money never moves across banks.",
        "Only what is there can be set aside: the source’s lowest balance from that day on must cover the amount.",
        "If you ask for too much the preview names the shortfall under Amount and nothing can be saved.",
      ),
      p("Moving money between different bank accounts is a real transfer. Record it only after it happened at the bank."),
    ],
  },
  {
    slug: "credit-cards",
    group: "Everyday use",
    title: "Credit cards",
    summary: "Card reserves, purchases, payments and one-revision fixes.",
    blocks: [
      p("Each card has a reserve inside the bank account that will pay it. The reserve always equals what the card owes."),
      ul(
        "A card purchase moves money from free money (or the reserve paying for it) into the card’s reserve.",
        "Paying the card spends the reserve. Paying more than it owes puts the card into credit and its reserve follows below zero.",
        "A card transaction written without its reserve lines is saved but flagged as unreserved until fixed.",
      ),
      p("The Credit page lists each card with what it owes, its reserve and what is still to reserve, with one-revision fixes for missing reserve lines."),
    ],
  },
  {
    slug: "loans",
    group: "Everyday use",
    title: "Loans and mortgages",
    summary: "Loan accounts, and how principal is reported.",
    blocks: [
      p("The Loans page lists each loan or mortgage with what is owed and opens its register."),
      p("In the income statement, loan principal paid is shown as an equity conversion rather than an expense."),
      p("Dedicated pages for mortgages and installment loans are not done yet."),
    ],
  },
  {
    slug: "people",
    group: "Everyday use",
    title: "People and shared expenses",
    summary: "Receivables, payables, splitting costs and statements.",
    blocks: [
      p("Each person has a receivable (they owe you, never below zero) and a payable (you owe them, never above zero). Money toward someone pays down what you owe them first, then builds what they owe you."),
      ul(
        "Use “split with someone” in Add to record a shared expense.",
        "Each person has a netted statement that runs from the start of last year.",
        "Export a statement as CSV or PDF; the app and MCP clients produce identical files.",
        "Receivables activity is also a report.",
      ),
    ],
  },
  {
    slug: "reports",
    group: "Everyday use",
    title: "Reports",
    summary: "The reports and what they count.",
    blocks: [
      ul(
        "Income statement, with loan principal shown as equity conversion.",
        "Balance sheet.",
        "Spending by category.",
        "Cash on Hand over time, and a cash flow bridge between two days.",
        "Receivables activity.",
      ),
      p("Every report counts every transaction, voided ones and their reversals included, as hledger’s balance reports do. Income and equity, which hledger keeps negative, are shown positive and neutral. Amounts are coloured by sign."),
      p("kabacus-cli report prints the same reports, and MCP clients can ask for them."),
    ],
  },
  {
    slug: "reconcile",
    group: "Everyday use",
    title: "Reconcile an account",
    summary: "Check an account against a statement and lock in the agreement.",
    blocks: [
      ol(
        "Open the register of a bank, card, loan or investment account and choose Reconcile….",
        "Enter the statement’s date and balance.",
        "If there is a difference, Kabacus suggests the transactions that likely explain it. Open them and mark what is cleared.",
        "When it matches, write the balance check.",
      ),
      p("A balance check is an assertion that holds at the end of its day. If a later change would break it, that change is refused with a sentence naming the account, the day, and the asserted and calculated amounts. Assertions on money accounts include reserves, so moving money into a reserve never breaks them."),
    ],
  },
  {
    slug: "history",
    group: "Everyday use",
    title: "Activity and history",
    summary: "Revisions, who made them, diffs and reading the books as they were.",
    blocks: [
      p("Every write is one numbered revision (1, 2, 3, …). There are no commits or hashes. Each records who made it: the app, kabacus-cli, an MCP client or the signed-in user, with an agent’s name when an assistant made it, and a one-line summary naming the transaction."),
      ul(
        "The Activity page lists every revision and opens the transaction it wrote.",
        "Any revision shows as a diff of the books’ text.",
        "The books can be read as they were at any revision.",
        "Rewrites (delete, rewrite outright, declare, rename or remove an account, change a balance assertion) are hidden behind three gates: the host allows them, you hold the ledger-rewrite role, and the app has them switched on. Even then history keeps the earlier versions.",
      ),
    ],
  },
  {
    slug: "import-export",
    group: "Beyond the window",
    title: "Import and export",
    summary: "Bring hledger journals in and take the books out.",
    blocks: [
      p("Kabacus’s accounting follows hledger’s. Make empty books, then import a journal (and what it includes) into them, once. Import previews unless you pass --save, and it refuses books that aren’t empty:"),
      code("kabacus-cli new household.kabacus --currency USD\nkabacus-cli import household.kabacus main.journal\nkabacus-cli import household.kabacus main.journal --save"),
      p("On a server the same is kabacus-server import <journal>. Afterwards the database is the books and the journal files are no longer read. Export writes an hledger journal any time:"),
      code("kabacus-cli export household.kabacus -o household.journal"),
    ],
  },
  {
    slug: "web-app",
    group: "Beyond the window",
    title: "The web app and PWA",
    summary: "The same app in a browser or as a desktop shell, and how it differs.",
    blocks: [
      p("The web app has the KDE app’s destinations, words, order and flows, so someone who uses one can use the other. It looks different: it uses the Verdure design language of parchment, forest, sage and gold."),
      ul(
        "A desktop shell (Tauri) opens files and windows like the KDE app, with the same File menu.",
        "An installable PWA works offline and, once installed, can open .kabacus files from the file manager where the browser supports it.",
        "Books in a browser run the same libraries compiled to WebAssembly. Chromium saves back to the file you picked and asks once per file after a restart; other browsers keep the books in browser storage, and Save a Copy As… downloads them.",
        "One set of books per tab.",
        "A server can host the web app at /app/; it then opens that server’s books after sign-in.",
      ),
    ],
  },
  {
    slug: "phone",
    group: "Beyond the window",
    title: "On a phone",
    summary: "Tabs, the Add sheet and recording with the keypad.",
    blocks: [
      p("The KDE app and the web app have the same shape on a phone. Tablets keep the desktop layout with the sidebar as an icon rail."),
      ul(
        "Tabs at the bottom: Overview, Transactions, Reserves, Credit and More. More lists Loans, People, Reports, Activity, Settings and Books.",
        "The app bar shows the books’ name, which opens the Books sheet to switch books or connect to a server.",
        "A floating Add button opens the Add sheet with the same eight choices.",
        "Recording is a full-screen form with Amount first and a numeric keypad. Review shows what changes, then Save.",
        "A register shows rows grouped by day. Search is in the app bar; Reconcile, Statement and Void are in the overflow menu.",
        "Touch targets are at least 48 px.",
      ),
    ],
  },
  {
    slug: "shortcuts",
    group: "Beyond the window",
    title: "Keyboard shortcuts and languages",
    summary: "Keys in the KDE app and the web app, and the languages offered.",
    blocks: [
      ul(
        "Ctrl+1 … Ctrl+8 go to the destinations; Ctrl+N is Add; F5 refreshes.",
        "In a browser, where a key is reserved, the web app uses N for Add, R for Refresh, / for search and G then 1…8 for the destinations. Every button shows its key.",
        "Keys 1–8 choose in the Add chooser.",
      ),
      h2("Languages"),
      p("The KDE app speaks the language your KDE settings or LANGUAGE ask for, in every language KDE’s translation teams cover. Right-to-left languages mirror the whole layout. Amounts keep the books’ own formatting. Text the server composes (its warnings and refusals) is not translated yet."),
    ],
  },
  {
    slug: "cli-and-mcp",
    group: "Beyond the window",
    title: "Command line and MCP assistants",
    summary: "kabacus-cli, scripts, and letting an AI assistant work on your books.",
    blocks: [
      p("kabacus-cli is the app without a window. It calls the same libraries, so a script or an assistant gets the same validation, revisions and conflicts as a person."),
      h2("Subcommands"),
      p("info, new, report, import, export, history, run, commands and mcp. Reading subcommands take --json. --help prints to stdout and exits 0; usage errors exit 2 before any work; failures exit 1."),
      h2("Scripts"),
      p("run executes a script, one step per command. A step can name itself with “as” and later steps use its result. A script is all-or-nothing and saved as one revision. Writes are dry runs unless you pass --save. kabacus-cli commands lists every action."),
      h2("MCP"),
      ul(
        "Headless: kabacus-cli mcp --books FILE serves MCP over stdio on the books you name. --read-only lists only reading tools. It never reaches the network.",
        "Attached: kabacus-cli mcp --attach PORT drives a running app through its control channel so you watch every change. Turn the channel on in Settings → Automation. It listens on loopback only.",
        "Tools are the same everywhere, dry run by default; rewrite tools are listed only when usable.",
        "A revision made through MCP records your user and the agent’s name, for example “jordan.lee via Claude (agent)”, and Activity marks it.",
      ),
    ],
  },
  {
    slug: "server",
    group: "Running a server",
    title: "Running kabacus-server",
    summary: "Shared books over an HTTP API, the web app and an MCP endpoint.",
    blocks: [
      p("kabacus-server serves one ledger to several people and devices. It ships as a container image with the books in a /data volume (/data/books.kabacus is made on first start) or in PostgreSQL via database_url."),
      code("podman run -d --name kabacus-server --userns=keep-id --read-only --tmpfs /tmp --network none \\\n  -v /path/to/data:/data \\\n  -v \"$XDG_RUNTIME_DIR/kabacus:/run/kabacus\" \\\n  -v /path/to/server.toml:/etc/kabacus/server.toml:ro \\\n  localhost/kabacus-server:latest --auth=none"),
      ul(
        "--auth=none is for one user on one computer, over a unix socket only. For OAuth or the remote HTTPS listener, configure [auth] and [remote] and drop it.",
        "Other devices connect over the HTTPS listener with Connect to a Server… in the app. An ordinary certificate or a private CA works.",
        "/mcp serves MCP over streamable HTTP; clients sign in with the same provider.",
        "The server logs one line per request, to the journal if its socket is mounted, otherwise stderr.",
        "Set account_kinds in the config to change how account paths map to kinds; it reloads on SIGHUP.",
      ),
      p("The container README in the Kabacus repository lists every volume and setting."),
    ],
  },
  {
    slug: "signing-in",
    group: "Running a server",
    title: "Signing in and roles",
    summary: "OAuth 2.0 / OpenID Connect, roles and how apps and assistants sign in.",
    blocks: [
      p("Local books need no sign-in. A server uses any OAuth 2.0 / OpenID Connect provider, configured by issuer URL and discovery. Nothing is specific to one provider."),
      h2("Roles"),
      p("Roles come from a configurable claim, mapped by role_map onto ledger-read, ledger-write and ledger-rewrite. A signed-in identity becomes a user in the database and is recorded on each revision they make."),
      h2("Apps"),
      p("The app signs in with Authorization Code and PKCE in your system browser, redirecting to a loopback port. It never sees your password. It learns the issuer and client from the server, so a device only needs the server’s address. The refresh token lives in the system keyring, never in settings. Settings → Account shows who is signed in and signs out."),
      h2("Assistants"),
      p("MCP clients sign in themselves. /mcp validates bearer tokens exactly as the API does and points clients at your issuer through protected resource metadata."),
      h2("When the server is away"),
      p("What was last loaded stays readable, writes are off, and the app retries with backoff. It never queues writes. Local books never go offline."),
    ],
  },
];

export function findArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
