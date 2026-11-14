export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: readonly string[] }
  | { type: "ol"; items: readonly string[] }
  | { type: "code"; text: string }
  | { type: "table"; columns: readonly string[]; rows: readonly (readonly string[])[] }
  | { type: "links"; slugs: readonly string[] }
  | { type: "image"; src: string; alt: string; caption: string; width: number; height: number };

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

export const groups = ["Start here", "Everyday use", "Beyond the window", "Reference", "Running a server"] as const;

export const articles: readonly Article[] = [
{
  "slug": "manual-scope",
  "title": "About this manual and implementation status",
  "summary": "What this manual covers, which interface to use, and where behavior is still planned.",
  "group": "Start here",
  "blocks": [
    {
      "type": "h2",
      "text": "Choose your starting point"
    },
    {
      "type": "p",
      "text": "This manual is the public reference for using Kabacus and understanding its accounting rules. It covers the KDE application, the web application and desktop shell, kabacus-cli, and shared servers. Start with Getting started if you keep your own books. Server operators should also read Running kabacus-server and Signing in and roles."
    },
    {
      "type": "table",
      "columns": [
        "You want to…",
        "Use…"
      ],
      "rows": [
        [
          "Keep books on one computer",
          "A local .kabacus file; no account or server is needed."
        ],
        [
          "Use books in a browser",
          "The PWA, with browser-specific file storage."
        ],
        [
          "Share books between devices or people",
          "A server, HTTPS and sign-in."
        ],
        [
          "Automate reports or bookkeeping",
          "kabacus-cli or an MCP client; the same validation applies."
        ]
      ]
    },
    {
      "type": "h2",
      "text": "The specification"
    },
    {
      "type": "p",
      "text": "This manual is the Kabacus specification: it says what Kabacus does and why, and the apps, kabacus-cli and kabacus-server follow it. Where an app disagrees with the manual, that is a bug to report. Work that is planned but not done yet is marked as planned. It was checked against the application source and kabacus-cli --help on November 14, 2026. Installed versions can differ; use your version’s command help before running examples. Screenshots show the real web interface with synthetic sample books, not a live household."
    },
    {
      "type": "p",
      "text": "The shared libraries provide accounting, validation, reports and revisions for every interface. A different appearance does not imply different accounting. The red abacus icon is the same on this website and in every app. The website’s charcoal theme is its own: the web app uses neutral light and dark surfaces with green accents, and the KDE app follows your system theme."
    },
    {
      "type": "h2",
      "text": "Planned and not done yet"
    },
    {
      "type": "ul",
      "items": [
        "Dedicated mortgage and installment-loan pages, editing split transactions in the app, and selecting several ledgers within one database are planned.",
        "Delete, rename and balance-assertion rewrites are not general-purpose app workflows yet. Use the documented command or MCP operation only when its rewrite gates are enabled.",
        "There is no administration or registration portal. A server signs people in through an external OAuth 2.0 / OpenID Connect provider, or runs in explicit single-user authentication-off mode.",
        "Journal import has been retired from kabacus-cli and kabacus-server. New books start in Kabacus; record opening balances instead of importing a journal.",
        "Exchanging books as .kabacus files is planned as the way to move books between installations. Today kabacus-cli exports a journal, which does not preserve the complete audit history.",
        "Server-composed warnings and refusals may remain untranslated. Tablet layouts use an icon rail and have less test coverage than desktop and phone layouts."
      ]
    },
    {
      "type": "h2",
      "text": "How to read the manual"
    },
    {
      "type": "p",
      "text": "Steps describe actions in the application. Reference tables explain rules enforced by the shared engine. Examples use declared accounts and USD; substitute your own paths, currency and dates. A reserve in the app is a fund in the API and MCP vocabulary. A revision is a numbered change to the books, not a transaction number."
    },
    {
      "type": "links",
      "slugs": [
        "getting-started",
        "glossary",
        "troubleshooting"
      ]
    }
  ]
},
{
  "slug": "bookkeeping-example",
  "title": "A worked household example",
  "summary": "Follow income, reserves, a card purchase, a payment and reimbursement without counting money twice.",
  "group": "Start here",
  "blocks": [
    {
      "type": "h2",
      "text": "Start with money you have"
    },
    {
      "type": "p",
      "text": "These examples are independent illustrations in USD, with opening balances already recorded. Suppose Checking contains $2,000, there are no reserves or receivables, and the card owes nothing. Cash on Hand is $2,000. A reserve is part of Checking, not another bank account."
    },
    {
      "type": "h2",
      "text": "Set aside and spend"
    },
    {
      "type": "table",
      "columns": [
        "Event",
        "Checking at the bank",
        "Reserves including cards",
        "Cash on Hand"
      ],
      "rows": [
        [
          "Start",
          "$2,000",
          "$0",
          "$2,000"
        ],
        [
          "Set aside $500 for insurance",
          "$2,000",
          "$500",
          "$1,500"
        ],
        [
          "Buy $80 groceries on the card",
          "$2,000",
          "$580",
          "$1,420"
        ],
        [
          "Pay the card $80",
          "$1,920",
          "$500",
          "$1,420"
        ],
        [
          "Pay $200 insurance from its reserve",
          "$1,720",
          "$300",
          "$1,420"
        ]
      ]
    },
    {
      "type": "p",
      "text": "Setting aside changes the purpose of money, not the bank balance. A discretionary card purchase sets aside the money to pay the card immediately. The later payment reduces both bank money and the card reserve, so it does not reduce Cash on Hand a second time. Spending from insurance reduces money already excluded from Cash on Hand."
    },
    {
      "type": "h2",
      "text": "Receive income and reimbursements"
    },
    {
      "type": "p",
      "text": "Receiving $1,000 salary into Checking increases Cash on Hand by $1,000. Paying $60 on behalf of another person from free money reduces Cash on Hand by $60 and increases the receivable. Their later $60 reimbursement clears the receivable and restores that $60 to Cash on Hand. It is repayment, not new salary."
    },
    {
      "type": "h2",
      "text": "Check the outcome"
    },
    {
      "type": "ol",
      "items": [
        "Preview each event and inspect the accounts it touches.",
        "Compare Checking’s inclusive balance with the bank statement, including its reserves.",
        "Compare the card’s amount owed with its reserve on Credit.",
        "Use Activity to inspect the numbered revision for any unexpected change."
      ]
    },
    {
      "type": "links",
      "slugs": [
        "cash-on-hand",
        "reserves",
        "credit-cards",
        "people"
      ]
    }
  ]
},
{
  "slug": "glossary",
  "title": "Glossary and accounting signs",
  "summary": "The words, balances and identifiers used throughout Kabacus.",
  "group": "Start here",
  "blocks": [
    {
      "type": "h2",
      "text": "Core terms"
    },
    {
      "type": "table",
      "columns": [
        "Term",
        "Meaning"
      ],
      "rows": [
        [
          "Books / ledger",
          "The set of accounts, commodities and transactions you are keeping. A database can contain multiple ledgers, although the app does not yet expose a ledger selector."
        ],
        [
          "Posting",
          "One account’s part of a transaction. Real postings balance to zero, by commodity or through a supported cost."
        ],
        [
          "Commodity",
          "The unit of an amount: USD, EUR or another symbol. Symbols are case-sensitive."
        ],
        [
          "Cash on Hand / Available to spend",
          "What you can spend now. Overview labels it Available to spend."
        ],
        [
          "Free money",
          "A money account’s own balance, excluding the reserves below it."
        ],
        [
          "Inclusive balance",
          "An account and its subaccounts together; for a bank account this includes reserves."
        ],
        [
          "Reserve / fund",
          "Money set aside inside its home bank account. It is not a monthly budget."
        ],
        [
          "Card reserve",
          "Money earmarked to cover what a particular card owes."
        ],
        [
          "Receivable / payable",
          "What someone owes you / what you owe them."
        ],
        [
          "Revision / head",
          "The numbered state of the books used to detect concurrent changes."
        ],
        [
          "Transaction id",
          "A stable number assigned when a transaction is first recorded; editing keeps it."
        ],
        [
          "Dry run",
          "Apply and validate a proposed change in memory without saving it."
        ]
      ]
    },
    {
      "type": "h2",
      "text": "Positive and negative"
    },
    {
      "type": "p",
      "text": "Positive postings add to an account’s balance and negative postings subtract from it. A $25 bank purchase commonly posts +25 to expenses:groceries and −25 to assets:bank:checking. Income and liabilities normally carry negative ledger balances. The application presents income and equity as positive neutral amounts; this display convention does not change the stored signs."
    },
    {
      "type": "h2",
      "text": "Balance is not availability"
    },
    {
      "type": "p",
      "text": "A bank balance can include money already reserved for bills or cards. Cash on Hand is the spendable part. Similarly, a credit limit is not available cash and is not part of Cash on Hand."
    },
    {
      "type": "links",
      "slugs": [
        "accounts",
        "cash-on-hand",
        "ledger-rules"
      ]
    }
  ]
},
{
  "slug": "backup-and-recovery",
  "title": "Save copies, back up and recover",
  "summary": "Protect local books and browser storage, and know what history can recover.",
  "group": "Start here",
  "blocks": [
    {
      "type": "h2",
      "text": "Choose a backup method"
    },
    {
      "type": "p",
      "text": "Backup scheduling, retention and restore testing are your responsibility for local books and the host’s responsibility for shared books. Kabacus’s audit history records edits; it cannot recover a deleted database or failed disk."
    },
    {
      "type": "ol",
      "items": [
        "Use File → Save a Copy As… to create a separate .kabacus copy from the application.",
        "Keep copies on a separate device or backup service with a retention policy you control.",
        "Open a copied file separately and check accounts, recent transactions and Activity before relying on it. Keep the original until the copy is verified."
      ]
    },
    {
      "type": "h2",
      "text": "Copying SQLite safely"
    },
    {
      "type": "p",
      "text": "A live local database may use SQLite’s write-ahead log. Copying only the main .kabacus file while it is open can miss committed changes. Prefer the application’s copy operation. For an operator backup, use SQLite’s consistent backup mechanism, or stop all writers before making a filesystem copy. Do not delete -wal or -shm files beside an open database."
    },
    {
      "type": "h2",
      "text": "Browser books"
    },
    {
      "type": "p",
      "text": "Chromium can write back to the file you selected, subject to permission. Other browsers keep books in browser storage; Save a Copy As… downloads them. Export a copy before clearing site data, switching browser profiles or uninstalling the PWA. An installed PWA’s offline assets are not a backup of the books."
    },
    {
      "type": "h2",
      "text": "Recover deliberately"
    },
    {
      "type": "ol",
      "items": [
        "Stop writes and preserve a copy of the damaged or unexpected state.",
        "Open the last verified backup in a separate window or isolated server instance.",
        "Compare the last transactions and revision history with your statements.",
        "Restore using your database or hosting procedure, then reconnect clients and refresh before writing."
      ]
    },
    {
      "type": "p",
      "text": "A past revision is useful for understanding changes. There is no one-button revert of the books: a void adds a reversal, an edit records a new revision, and every earlier revision remains in history. A journal export is an interchange format, not a full-history database backup."
    },
    {
      "type": "links",
      "slugs": [
        "books",
        "history",
        "web-app"
      ]
    }
  ]
},
{
  "slug": "ledger-rules",
  "title": "Amounts, balancing and validation",
  "summary": "Exact money, declarations, missing amounts, costs, dates and balance assertions.",
  "group": "Reference",
  "blocks": [
    {
      "type": "h2",
      "text": "Exact amounts and commodities"
    },
    {
      "type": "p",
      "text": "An amount stores a commodity symbol, an arbitrary-size integer mantissa and up to 255 decimal places. Display style is separate from value. For example, 12.50 is mantissa 1250 with two places. A write with more places than the commodity accepts is refused. No write silently rounds away excess precision."
    },
    {
      "type": "p",
      "text": "Account and commodity declarations are exact and case-sensitive. Declaring assets:bank does not declare assets:bank:checking, and USD differs from usd. A bare amount has the empty commodity, which also requires a declaration. There is no unchecked mode."
    },
    {
      "type": "h2",
      "text": "Balancing and omitted amounts"
    },
    {
      "type": "p",
      "text": "Real postings must balance exactly. Balanced virtual postings, written with [account], balance independently; unbalanced virtual postings, written with (account), do not contribute to the real balance check. At most one real posting and one balanced virtual posting per transaction can omit an amount. The missing amount is inferred from the others in its own group. Several inferred commodities are stored as separate postings."
    },
    {
      "type": "p",
      "text": "Supported unit costs (@) and total costs (@@) participate in balancing. They do not change the balances checked by assertions. A posting carrying an assertion must have an explicit amount; Kabacus does not infer it from the asserted balance."
    },
    {
      "type": "h2",
      "text": "Dates and assertions"
    },
    {
      "type": "p",
      "text": "Transactions use calendar dates, without a time zone or time of day. Assertions check the end of their day, including every transaction dated on or before that day. Order within one day does not change the result. Moving an edited transaction to another date rechecks assertions from the earlier affected date forward."
    },
    {
      "type": "table",
      "columns": [
        "Operator",
        "Checked balance"
      ],
      "rows": [
        [
          "=",
          "This account, only the named commodity."
        ],
        [
          "=*",
          "This account and all subaccounts, only the named commodity."
        ],
        [
          "==",
          "This account’s entire balance; other commodities must be zero."
        ],
        [
          "==*",
          "The entire balance of this account and its subaccounts; other commodities must be zero."
        ]
      ]
    },
    {
      "type": "p",
      "text": "New assertions on money accounts are inclusive, so moving cash into their reserves does not break reconciliation. A change that breaks an assertion is refused and names the account, day and asserted and calculated amounts."
    },
    {
      "type": "h2",
      "text": "Write pipeline"
    },
    {
      "type": "ol",
      "items": [
        "Compare the expected head with the current revision; refuse a stale write.",
        "Apply the proposed change in memory and check amounts, balancing, assertions and declarations.",
        "Store all row changes and their audit record atomically as one revision."
      ]
    },
    {
      "type": "p",
      "text": "A dry run uses the same validation without storing anything. Batches contain up to 100 writes and become one revision. A refused write, a conflict or saving an unchanged transaction creates no revision. Descriptions cannot contain a line break or semicolon; put structured metadata in the supported fields instead."
    },
    {
      "type": "links",
      "slugs": [
        "transactions",
        "reconcile",
        "import-export"
      ]
    }
  ]
},
{
  "slug": "troubleshooting",
  "title": "Troubleshooting and warning reference",
  "summary": "Resolve shortfalls, conflicting edits, mismatched reserves and connection problems.",
  "group": "Reference",
  "blocks": [
    {
      "type": "h2",
      "text": "A change will not save"
    },
    {
      "type": "table",
      "columns": [
        "Symptom",
        "Meaning and next action"
      ],
      "rows": [
        [
          "Conflict / stale head",
          "Someone or another window wrote after your preview. Refresh, inspect Activity, then review a new preview before saving. Do not blindly repeat the old write."
        ],
        [
          "Not enough to set aside",
          "The source cannot cover the amount on that date or a later day. Check future-dated transactions; reduce the allocation or correct the date."
        ],
        [
          "Balance assertion failed",
          "The proposed change disagrees with an existing statement check. Inspect the named account and day; correct the transaction rather than removing the check to conceal a discrepancy."
        ],
        [
          "Too many decimal places",
          "Enter an amount valid for the commodity. Kabacus never rounds it for you."
        ],
        [
          "Undeclared account or commodity",
          "Check spelling and case and use a declared path or symbol. A parent account declaration is not inherited."
        ],
        [
          "Server unavailable / writes disabled",
          "Loaded data remains readable. Check the connection and sign-in; Kabacus retries and does not queue writes."
        ],
        [
          "No Save action on an edit",
          "An unchanged transaction has nothing to save and creates no revision."
        ]
      ]
    },
    {
      "type": "h2",
      "text": "Overview warnings"
    },
    {
      "type": "table",
      "columns": [
        "Warning",
        "What to inspect"
      ],
      "rows": [
        [
          "negative-fund",
          "A reserve is overdrawn. Check its spending and source account before setting aside more."
        ],
        [
          "negative-reserve",
          "A card’s reserve is below zero, or the card is in credit, usually because a payment was recorded without the purchases it paid. The shortfall counts against free money. Fix opens the card; record the missing purchases."
        ],
        [
          "negative-free-money",
          "Reserves exceed the money available in their home account. Review allocations and bank transactions."
        ],
        [
          "reserve-mismatch",
          "The card reserve and card owed amount differ. Inspect Credit and missing reserve lines."
        ],
        [
          "unreserved-unaccounted",
          "Flagged card transactions do not explain the whole reserve difference. Look for standalone movements in the reserve."
        ],
        [
          "unclassified",
          "No account-kind rule matched. Check the path and the host’s rule table."
        ],
        [
          "uncategorized",
          "expenses:uncategorized is not zero. Categorize the relevant transactions."
        ],
        [
          "duplicate-display-name",
          "Two accounts have the same friendly name. Use paths to disambiguate them."
        ],
        [
          "exclusive-assertion",
          "An older money-account assertion excludes reserves. Review inclusive-assertion conversion with rewrite access before changing historical reserve lines."
        ]
      ]
    },
    {
      "type": "p",
      "text": "Warnings draw attention to a problem but do not themselves block writes. Validation errors do. A successful save can therefore coexist with an unresolved warning."
    },
    {
      "type": "h2",
      "text": "File permission and browser recovery"
    },
    {
      "type": "p",
      "text": "After a browser restart, Chromium may need permission to reopen each file before editing. Other browsers use browser storage. If a file is refused, verify that it is a genuine .kabacus database from a compatible version; renaming an arbitrary SQLite file is not a conversion. Keep a copy before attempting recovery."
    },
    {
      "type": "h2",
      "text": "Report a reproducible problem"
    },
    {
      "type": "p",
      "text": "Record the application version (Settings → About shows the app’s own version, not the server’s), interface, operation, error sentence and relevant revision. Expand Details for technical context. Reproduce with synthetic books where possible and remove financial data, credentials and personal information before sharing logs or sample files."
    },
    {
      "type": "links",
      "slugs": [
        "credit-cards",
        "reconcile",
        "signing-in",
        "backup-and-recovery"
      ]
    }
  ]
},
{
  "slug": "cli-reference",
  "title": "Command-line reference",
  "summary": "Common read and write commands, exit codes and revision-aware scripts.",
  "group": "Beyond the window",
  "blocks": [
    {
      "type": "h2",
      "text": "Discover your installed commands"
    },
    {
      "type": "code",
      "text": "kabacus-cli --help\nkabacus-cli report --help\nkabacus-cli commands"
    },
    {
      "type": "p",
      "text": "The installed help is authoritative for flags in your release. The current CLI provides info, new, report, export, history, run, commands, mcp, completions and man. Reads support --json. Help exits 0, usage errors exit 2, and operation failures exit 1."
    },
    {
      "type": "h2",
      "text": "Read local books"
    },
    {
      "type": "code",
      "text": "kabacus-cli info household.kabacus --json\nkabacus-cli report household.kabacus cash-on-hand\nkabacus-cli report household.kabacus register --account assets:bank:checking\nkabacus-cli report household.kabacus income-statement --period 2026-10-01..2026-10-31 --csv\nkabacus-cli history household.kabacus\nkabacus-cli history household.kabacus --diff 42"
    },
    {
      "type": "h2",
      "text": "Reports"
    },
    {
      "type": "p",
      "text": "report takes cash-on-hand, register (with --account), balance-sheet, income-statement, cash-flow, categories, cash-on-hand-history or receivables. --period FROM..TO limits the dates and --csv prints a table instead of JSON."
    },
    {
      "type": "h2",
      "text": "Create and export"
    },
    {
      "type": "code",
      "text": "kabacus-cli new household.kabacus --name Household --currency USD --account assets:bank:checking\nkabacus-cli export household.kabacus -o household.journal"
    },
    {
      "type": "p",
      "text": "new makes books with one money account and a currency; the defaults are assets:bank:checking and USD. export writes the books as journal text; it is not a database backup with complete history. There is no journal import."
    },
    {
      "type": "h2",
      "text": "Run a script"
    },
    {
      "type": "code",
      "text": "kabacus-cli run changes.json --books household.kabacus\nkabacus-cli run changes.json --books household.kabacus --head 42 --save"
    },
    {
      "type": "p",
      "text": "Use commands to discover action identifiers and schemas rather than guessing them. Each step selects a command; as names a result, and a later {\"$ref\": \"name\"} references it. The script is all-or-nothing and saves one revision. --head pins the expected revision; a stale revision conflicts. Without --save it is a dry run."
    },
    {
      "type": "h2",
      "text": "Automation boundaries"
    },
    {
      "type": "code",
      "text": "kabacus-cli mcp --books household.kabacus --read-only\nkabacus-cli mcp --attach 9234"
    },
    {
      "type": "p",
      "text": "The port here is an example; it must match the app’s enabled Automation channel. Do not combine --attach and --books. A browser tab has no attached control channel. Headless MCP opens only the files explicitly supplied; --books can repeat. Rewrite operations require explicit --allow-rewrites in headless mode; it is a global flag, so it also lets run scripts declare or rename accounts."
    },
    {
      "type": "links",
      "slugs": [
        "cli-and-mcp",
        "history",
        "ledger-rules"
      ]
    }
  ]
},
{
  "slug": "server-operations",
  "title": "Server configuration and operations",
  "summary": "Storage, HTTPS, authentication, rule reloads and recovery for operators.",
  "group": "Running a server",
  "blocks": [
    {
      "type": "h2",
      "text": "Storage and configuration"
    },
    {
      "type": "p",
      "text": "The container reads /etc/kabacus/server.toml and uses /data/books.kabacus by default, creating it on first start. Mount persistent data outside the image. Choose SQLite with database or PostgreSQL with database_url; KABACUS_DATABASE can override the database location. Both backends use shared accounting rules."
    },
    {
      "type": "h2",
      "text": "Connect clients"
    },
    {
      "type": "p",
      "text": "Configure [remote] for the HTTPS listener, certificates and trust. Clients use Connect to a Server… and can supply a private CA. The same API and /mcp operations are available over the remote listener. If serving the web app, configure web_dir and use /app/. The web application requires an appropriate provider redirect URI and CORS configuration; never put a client secret into browser code."
    },
    {
      "type": "h2",
      "text": "Authentication and authorization"
    },
    {
      "type": "p",
      "text": "For shared or remote books, configure an OIDC issuer and role mapping. Local authentication-off mode is explicit and restricted to a unix socket or loopback; never use it as a fallback when OAuth fails. ledger-read, ledger-write and ledger-rewrite distinguish visibility, normal bookkeeping and gated rewrites. Configure the claim and role_map for the provider’s actual token shape. The host allows rewrites by default; start the server with --no-rewrite to refuse them for everyone, whatever their roles."
    },
    {
      "type": "p",
      "text": "MCP clients authenticate independently with bearer tokens and protected-resource metadata. Behind a reverse proxy, configure [mcp] resource_url and required scopes for the externally reachable endpoint. Test both ordinary app access and MCP role enforcement."
    },
    {
      "type": "h2",
      "text": "Account-kind configuration"
    },
    {
      "type": "p",
      "text": "Account kinds come from ordered account_kinds rules: the first match wins. * matches a segment or part of one, ** matches one or more. Supplying any custom table replaces the defaults, so include every rule the books need. SIGHUP reloads the configuration. card_reserve_account supplies the reserve path pattern, normally assets:bank:checking:card-{card}."
    },
    {
      "type": "h2",
      "text": "Operate and recover"
    },
    {
      "type": "ul",
      "items": [
        "Keep the data volume writable and the rest of the container read-only where practical. An isolated unix-socket deployment can use --network none; a remote HTTPS deployment needs its listener reachable.",
        "Collect request logs from stderr, or the systemd journal when its socket is mounted. Keep credentials and book contents out of public logs.",
        "Back up consistently using the database’s backup tooling and verify restoration in isolation. A running SQLite database can have a WAL; a plain file copy is not sufficient.",
        "After restoration or migration, make clients refresh and preview again against the restored revision.",
        "Use the container README for the exact supported configuration keys, volumes, migration and launch commands in the installed version."
      ]
    },
    {
      "type": "links",
      "slugs": [
        "server",
        "signing-in",
        "backup-and-recovery",
        "accounts"
      ]
    }
  ]
},
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
        "Press Add (Ctrl+N) and choose what happened: spent, received, transfer, set aside and so on. Spending on a card is Spent with the card as From.",
        "Fill in the amount. The preview shows the balances before and after and whether the books balance. Save when it looks right.",
      ),
      h2("Coming from hledger?"),
      p("Journal import has been retired. Start new books, record each account’s opening balance with Postings against equity:opening, and reconcile against your statements. kabacus-cli export can still write your books as an hledger journal. See Export to hledger."),
      h2("Where things are"),
      p("The sidebar lists the destinations in a fixed order: Overview, Transactions, Reserves, Credit, Loans, People, Reports and Activity. Settings is at the foot. The foot of the sidebar also says where your books live and that every change is saved. Overview opens with Available to spend: your Cash on Hand."),
{
      "type": "h2",
      "text": "Check before relying on the books"
},
{
      "type": "ol",
      "items": [
            "Use account paths that match the account-kind rules, such as assets:bank:checking. Check Overview for unclassified accounts.",
            "Record opening balances and compare them with the real accounts. Do not enter an existing balance again as new income.",
            "Inspect the first saved transaction in Transactions and its revision in Activity.",
            "Save a separate copy and verify that it opens before making the file your only record."
      ]
},
{
      "type": "links",
      "slugs": [
            "bookkeeping-example",
            "backup-and-recovery",
            "accounts"
      ]
}
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
      p("Amounts are whole numbers with a number of decimal places, never floating point. A write with more decimal places than its commodity takes is refused, never rounded."),
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
{
      "type": "h2",
      "text": "Balances, homes and physical accounts"
},
{
      "type": "p",
      "text": "An account’s exclusive balance includes only its own postings; its inclusive balance adds subaccounts. For a money account the exclusive balance is free money and the inclusive balance is the bank balance. Funds and card reserves have a home money account."
},
{
      "type": "p",
      "text": "Synthetic is a separate property from account kind. Accounts default to real; reserves default to synthetic. physical_home identifies the real account holding the money. Converting an account’s real/synthetic type is a rewrite; it does not move money or change the account’s kind. Never use it to disguise a bank transfer."
},
{
      "type": "links",
      "slugs": [
            "glossary",
            "server-operations"
      ]
}
    ],
  },
  {
    slug: "transactions",
    group: "Everyday use",
    title: "Recording and changing transactions",
    summary: "The Add chooser, previews, editing in place, voiding and conflicts.",
    blocks: [
      h2("Add"),
      p("Add is one chooser, named after what happened: spent, received, transfer, set aside, pay a card, split with someone, settle up with someone, or postings for full control. Keys 1–8 choose. A payee you have used before pre-fills the form from its last transaction, and account pickers offer likely accounts first."),
      ul(
        "Card purchase: choose a card as From in Spent and the form becomes a card purchase, which adds the card’s reserve lines for you. Switch to Spent goes back. Record purchase on Credit opens the same form.",
        "New category: type a category that doesn’t exist yet in Spent. The form warns that it is new and creates it in the same revision when you save.",
        "Account pickers open on the groups of the account tree, starting at the current account’s group, with a breadcrumb back up. Typing searches every group at once and shows which group each match lives in.",
      ),
{
      "type": "image",
      "src": "/screenshots/add-chooser.webp",
      "alt": "Kabacus Add chooser listing eight kinds of transaction with keys 1 to 8",
      "caption": "The Add chooser in the web app. Each choice says what it records; press its number to choose it.",
      "width": 1440,
      "height": 1000
},
      h2("Preview, then save"),
      p("Every write previews first with a dry run: balances before and after, the change in Cash on Hand, the transaction’s text and whether the books balance. Saving writes it as one new numbered revision and closes the form; the revision appears in Activity."),
      h2("Edit in place"),
      p("Click a transaction to edit it. Saving replaces it, keeps its number and keeps its comments, tags and assertions. Leaving out a posting that carries a balance assertion is an error, not a silent removal. Saving without a change writes nothing."),
      p("A card purchase opens in the card purchase form, with its Card, Category and Paid from fields; saving moves its reserve lines with it. View as raw postings shows any edit as plain postings: a button in the form’s header on a wide screen, an item in the overflow menu on a phone."),
      h2("Void"),
      p("A void adds a reversal dated today and leaves the original untouched. Both show in registers and net to zero. There is no revert: history only grows."),
      h2("Conflicts"),
      p("A save is checked against the revision your preview was made on. If someone or something changed the books meanwhile you get a conflict naming who made the change, never an overwrite."),
      h2("Not yet in the app"),
      ul("Delete, rename and balance-assertion rewrites from the app.", "Choosing among several ledgers in one database."),
{
      "type": "h2",
      "text": "Inspect a real preview"
},
{
      "type": "image",
      "src": "/screenshots/preview.webp",
      "alt": "Kabacus Spent form beside a balanced transaction preview",
      "caption": "A $64.12 grocery purchase from Checking. The preview shows the journal text, the revision it was checked against, and how Cash on Hand and each account change.",
      "width": 1440,
      "height": 1000
},
{
      "type": "h2",
      "text": "Pick the appropriate operation"
},
{
      "type": "table",
      "columns": [
            "What happened",
            "Choose",
            "Check"
      ],
      "rows": [
            [
                  "Cash or bank purchase",
                  "Spent",
                  "The expense category and the free money or reserve actually used."
            ],
            [
                  "Income arrived",
                  "Received",
                  "The receiving money account and income account."
            ],
            [
                  "Credit-card purchase or refund",
                  "Spent, with the card as From",
                  "The card and source reserve/free money; the form keeps reserve lines together."
            ],
            [
                  "Money moved between banks",
                  "Transfer",
                  "The transfer already happened in the real world. Kabacus only records it."
            ],
            [
                  "Earmark money without moving banks",
                  "Set aside",
                  "The source covers the amount on the selected date and every later day."
            ],
            [
                  "Pay the credit-card bill",
                  "Pay a card",
                  "The payment spends the card’s reserve."
            ],
            [
                  "Share a cost",
                  "Split with someone",
                  "The person’s receivable/payable and your own share."
            ],
            [
                  "You paid someone back, or they paid you",
                  "Settle up with someone",
                  "Which way the money went and the bank account it left or reached."
            ],
            [
                  "Need explicit accounting entries",
                  "Postings",
                  "All declared accounts, exact amounts and balanced entries."
            ]
      ]
},
{
      "type": "h2",
      "text": "Refunds and duplicate entries"
},
{
      "type": "p",
      "text": "For a card refund use a negative card-purchase amount and return the money to its original source. Before adding a suspected missing transaction, search the payee and inspect the register; recording the same payment twice changes the books twice."
},
{
      "type": "links",
      "slugs": [
            "ledger-rules",
            "troubleshooting"
      ]
}
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
      p("An overdrawn reserve sets nothing apart: its overdraft was spent from the account’s free money, so it comes off that free money. A card reserve below zero works the same way. That usually happens when a card payment is recorded without the purchases it paid, or the card is paid more than it owes; the shortfall comes off the bank account’s free money and the negative-reserve warning names the card."),
      h2("Where you see it"),
      ul(
        "Overview shows it first as Available to spend, with its change since a month ago (sign and comparison date). How it’s worked out opens the sum it comes from.",
        "Available by account lists the free money in each bank account. Reserves and Credit follow; a card’s reserve is labelled Set Aside for Credit Card Payments.",
        "Overview charts Cash on Hand over time, and the Cash flow report bridges one month’s opening Cash on Hand to its closing.",
        "Every preview shows how a change moves it.",
      ),
{
      "type": "h2",
      "text": "Read the Overview"
},
{
      "type": "image",
      "src": "/screenshots/overview.webp",
      "alt": "Kabacus Overview with Available to spend, free money by account, reserves and a credit card",
      "caption": "Sample books in the web app: $18,288.84 available to spend, two reserves, and an Everyday Visa whose reserve matches what it owes.",
      "width": 1440,
      "height": 1000
},
{
      "type": "h2",
      "text": "Worked calculation"
},
{
      "type": "code",
      "text": "Money on Hand        $20,067.67\nFuture Allocations   −$1,736.75\nReceivables             −$42.08\nCash on Hand         $18,288.84"
},
{
      "type": "p",
      "text": "In the sample books Checking holds $11,325.59 at the bank: $9,588.84 free, $60 in Car insurance, $1,500 in Winter trip and $176.75 set aside for the Everyday Visa. Savings holds $8,700, all of it free. Future Allocations are the two reserves and the card reserve. The $42.08 a friend owes for shared groceries is counted in Money on Hand but can’t be spent yet. Card debt is already covered by its reserve and is not subtracted twice."
},
{
      "type": "links",
      "slugs": [
            "bookkeeping-example",
            "troubleshooting"
      ]
}
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
        "Set money aside shows the current balance under From and under To as you pick them, so you can see what is there before you preview.",
        "The Reserves page lists each reserve with the name of the bank account that holds it.",
      ),
{
      "type": "image",
      "src": "/screenshots/set-aside.webp",
      "alt": "Kabacus Set money aside form moving $250 from Checking into the Winter trip reserve, with its preview",
      "caption": "Setting $250 aside for a trip. Checking’s free money and the reserve’s balance show under each field; the preview shows Cash on Hand falling by $250 while the bank balance stays the same.",
      "width": 1440,
      "height": 1000
},
      p("Moving money between different bank accounts is a real transfer. Record it only after it happened at the bank."),
{
      "type": "h2",
      "text": "The effect on availability"
},
{
      "type": "p",
      "text": "Setting aside $100 reduces Cash on Hand by $100 without changing the bank’s inclusive balance. Releasing it restores that free money. Moving between reserves in the same home changes neither Cash on Hand nor the bank balance. Spending $100 directly from a funded reserve does not reduce Cash on Hand again."
},
{
      "type": "h2",
      "text": "Check the date and physical home"
},
{
      "type": "p",
      "text": "The source must cover the allocation at the end of its date and every later day, including future spending already recorded. Different bank accounts require a real transfer, even when both named reserves are synthetic. Kabacus cannot execute it: record the actual transfer only after it has happened."
},
{
      "type": "links",
      "slugs": [
            "bookkeeping-example",
            "troubleshooting"
      ]
}
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
        "Paying the card spends the reserve. Paying more than it owes puts the card into credit and its reserve follows below zero. A reserve below zero counts as zero, so the overpayment comes off free money and lowers Cash on Hand; Overview warns until it is fixed.",
        "A card transaction written without its reserve lines is saved but flagged as unreserved until fixed.",
      ),
      p("The Credit page lists each card with what it owes, its reserve and what is still to reserve. Record purchase is its main action, with Pay card beside it. Add all reserve lines appears only when a card has unreserved lines, and fixes them in one revision."),
{
      "type": "image",
      "src": "/screenshots/credit.webp",
      "alt": "Kabacus Credit page showing the Everyday Visa owing $176.75 with a matching reserve",
      "caption": "The Credit page. The Everyday Visa owes $176.75, its reserve holds the same, and nothing is left to reserve.",
      "width": 1440,
      "height": 640
},
{
      "type": "h2",
      "text": "Record a purchase and payment"
},
{
      "type": "ol",
      "items": [
            "Choose Record purchase on Credit, or Spent with the card as From. Give the category, the amount and what pays for it: free money or a reserve.",
            "Check the preview includes both the card debt and the matching reserve movement.",
            "To change a recorded purchase, open it: it edits in the same form and its reserve lines move with it.",
            "On Credit, compare owes, reserve and still to reserve.",
            "After the bank payment happens, use Pay a card. It consumes the reserve without reducing Cash on Hand again."
      ]
},
{
      "type": "image",
      "src": "/screenshots/card-purchase.webp",
      "alt": "Kabacus card purchase form for a $42.60 dinner on the Everyday Visa, with its preview",
      "caption": "A card purchase started from Spent. The preview shows four lines: the expense, the card’s debt, and $42.60 moving from Checking’s free money into the card’s reserve.",
      "width": 1440,
      "height": 1000
},
{
      "type": "h2",
      "text": "Fix mismatches carefully"
},
{
      "type": "p",
      "text": "Inspect unreserved transactions and add the missing reserve lines in the same transaction. A batch can fix several in one revision. If their total does not explain the difference, look for money moved directly in or out of the card reserve. Review older exclusive assertions before backdating reserve fixes; inclusive bank assertions are compatible with reserves."
},
{
      "type": "links",
      "slugs": [
            "troubleshooting",
            "reconcile"
      ]
}
    ],
  },
  {
    slug: "loans",
    group: "Everyday use",
    title: "Loans and mortgages",
    summary: "Loan accounts, and how principal is reported.",
    blocks: [
      h2("Read your loan balances"),
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
        "Use “settle up with someone” when money changes hands: choose whether you paid them or they paid you, and the bank account it left or reached. It nets against what is owed, paying down one side before building the other.",
        "Each person has a netted statement that runs from the start of last year.",
        "Export a statement as CSV or PDF; the app and MCP clients produce identical files.",
        "Receivables activity is also a report.",
      ),
{
      "type": "h2",
      "text": "Keep shared costs separate from income"
},
{
      "type": "p",
      "text": "A reimbursement clears a receivable; it is not salary. A loan payment’s principal changes the liability rather than an expense. The receivable for a co-owner’s share of principal should not credit your interest or expense category. Always inspect the netted person statement after a shared transaction."
},
{
      "type": "h2",
      "text": "Settle and verify"
},
{
      "type": "ol",
      "items": [
            "Open People and inspect what the person owes or is owed. Zero-balance people can be absent from summary lists.",
            "Record the actual repayment with Settle up with someone, on the date it happened.",
            "Open the statement and check its running balance and remaining open items.",
            "Export CSV or PDF when a shareable statement is needed."
      ]
},
{
      "type": "links",
      "slugs": [
            "bookkeeping-example",
            "reports"
      ]
}
    ],
  },
  {
    slug: "reports",
    group: "Everyday use",
    title: "Reports",
    summary: "The reports and what they count.",
    blocks: [
      p("The Reports page in both apps offers three reports for a month: Cash flow, Income statement and Categories. Overview charts Cash on Hand over time and People has each person’s statement. kabacus-cli report and MCP clients reach every report:"),
      ul(
        "Income statement, with loan principal shown as equity conversion.",
        "Balance sheet (command line and MCP).",
        "Spending by category.",
        "Cash on Hand over time, and a cash flow bridge from one day’s Cash on Hand to another’s.",
        "Receivables activity (command line and MCP).",
      ),
      p("Every report counts every transaction, voided ones and their reversals included, as hledger’s balance reports do. Income and equity, which hledger keeps negative, are shown positive and neutral. Amounts are coloured by sign."),
      p("kabacus-cli report prints them as JSON or, with --csv, a table."),
{
      "type": "h2",
      "text": "Choose the report for the question"
},
{
      "type": "table",
      "columns": [
            "Question",
            "Report"
      ],
      "rows": [
            [
                  "What came in and what did I spend?",
                  "Income statement; principal repayment is equity conversion."
            ],
            [
                  "What do I own and owe?",
                  "Balance sheet, from kabacus-cli report or MCP."
            ],
            [
                  "Where did spending go?",
                  "Spending by category."
            ],
            [
                  "How did available cash change?",
                  "Cash on Hand history or a cash flow bridge between two days."
            ],
            [
                  "What money is still owed to me?",
                  "Receivables activity and person statements."
            ]
      ]
},
{
      "type": "p",
      "text": "Check the period and as-of date before comparing reports. Future-dated transactions affect balances from their date onward. A reversal is included alongside its original; hiding one side would produce a different total."
},
{
      "type": "links",
      "slugs": [
            "cash-on-hand",
            "people"
      ]
}
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
{
      "type": "h2",
      "text": "If the difference is not zero"
},
{
      "type": "p",
      "text": "Check the statement date, beginning balance, duplicate payments, missing fees, refunds and cleared status before changing amounts. A suggested explanation is a lead to inspect, not proof. Do not manufacture an adjustment only to force the difference to zero."
},
{
      "type": "h2",
      "text": "After a match"
},
{
      "type": "p",
      "text": "The balance assertion protects the agreed end-of-day balance. If a later edit is refused, inspect the named assertion and the affected transaction. Changing an assertion is a gated rewrite; the previous version remains in history."
},
{
      "type": "links",
      "slugs": [
            "ledger-rules",
            "troubleshooting"
      ]
}
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
        "The Activity page lists every revision, newest first, with who made it and when in your local time, and opens the transaction it wrote. Filter it to this app, kabacus-cli, MCP or external edits.",
        "Any revision shows as a diff of the books’ text.",
        "The books can be read as they were at any revision.",
        "Rewrites (delete, rewrite outright, declare, rename or remove an account, change a balance assertion) are hidden behind three gates: the host allows them, you hold the ledger-rewrite role, and the app has them switched on. Even then history keeps the earlier versions.",
      ),
{
      "type": "image",
      "src": "/screenshots/activity.webp",
      "alt": "Kabacus Activity page listing numbered revisions with their summaries",
      "caption": "Activity in the sample books. Each revision has a number, a one-line summary naming the transaction, who made it and when.",
      "width": 1440,
      "height": 1000
},
{
      "type": "h2",
      "text": "Revisions are not transaction numbers"
},
{
      "type": "p",
      "text": "A batch may change many transactions in one revision. Editing #12 keeps transaction #12 but creates a later revision. A conflict or unchanged save consumes no revision. Use the diff to understand what changed, and the transaction number to locate the entry."
},
{
      "type": "links",
      "slugs": [
            "backup-and-recovery",
            "cli-reference"
      ]
}
    ],
  },
  {
    slug: "import-export",
    group: "Beyond the window",
    title: "Export to hledger",
    summary: "Take the books out as an hledger journal, and start books without importing one.",
    blocks: [
      p("Kabacus’s accounting follows hledger’s. Export writes the books as an hledger journal any time:"),
      code("kabacus-cli export household.kabacus -o household.journal"),
      h2("Starting without an import"),
      p("Journal import has been retired from kabacus-cli and kabacus-server. To move to Kabacus, make new books, record each account’s opening balance with Postings against equity:opening on the day you start, and reconcile each account against its statement. Keep your old journal as the record of earlier years."),
{
      "type": "h2",
      "text": "What export preserves"
},
{
      "type": "p",
      "text": "The current CLI exports rendered hledger journal text, not every historical revision or the original formatting. Keep a .kabacus copy for the database and history. Exchanging books as .kabacus files is planned; check the installed version’s help for the file-exchange operations it has."
},
{
      "type": "links",
      "slugs": [
            "getting-started",
            "reconcile",
            "backup-and-recovery"
      ]
}
    ],
  },
  {
    slug: "web-app",
    group: "Beyond the window",
    title: "The web app and PWA",
    summary: "The same app in a browser or as a desktop shell, and how it differs.",
    blocks: [
      p("The web app has the KDE app’s destinations, words, order and flows, so someone who uses one can use the other. A change to one ships in the other at the same time. It looks different: neutral light and dark surfaces with green accents, where the KDE app follows your system theme. Both use the same red abacus icon."),
      ul(
        "A desktop shell (Tauri) opens files and windows like the KDE app, with the same File menu.",
        "An installable PWA works offline and, once installed, can open .kabacus files from the file manager where the browser supports it.",
        "Books in a browser run the same libraries compiled to WebAssembly. Chromium saves back to the file you picked and asks once per file after a restart; other browsers keep the books in browser storage, and Save a Copy As… downloads them.",
        "One set of books per tab.",
        "Settings → About shows the version of the app you are running (the PWA or the desktop shell’s build), not the server’s.",
        "A server can host the web app at /app/; it then opens that server’s books after sign-in.",
      ),
{
      "type": "h2",
      "text": "Offline and storage boundaries"
},
{
      "type": "p",
      "text": "The PWA caches application assets, not server API responses or a backup of your books. Local books use the portable engine inside the page and write the whole file on save. A server outage does not turn shared books into an editable offline copy: loaded data stays readable and writes wait for reconnection without being queued."
},
{
      "type": "p",
      "text": "After a Chromium restart, approve reopening the chosen file before editing. In other browsers, download a copy before clearing site storage. The desktop shell uses native file access and stores refresh tokens outside the JavaScript workspace; a browser session has different persistence rules."
},
{
      "type": "links",
      "slugs": [
            "backup-and-recovery",
            "shortcuts"
      ]
}
    ],
  },
  {
    slug: "phone",
    group: "Beyond the window",
    title: "On a phone",
    summary: "Tabs, the Add sheet and recording with the keypad.",
    blocks: [
      h2("Navigate on a phone"),
      p("The KDE app and the web app have the same shape on a phone. Tablets keep the desktop layout with the sidebar as an icon rail."),
      ul(
        "Tabs at the bottom: Overview, Transactions, Reserves, Credit and More. More lists Loans, People, Reports, Activity, Settings and Books.",
        "The app bar shows the books’ name, which opens the Books sheet to switch books or connect to a server, with search and an overflow menu beside it.",
        "A floating Add button opens the Add sheet with the same eight choices.",
        "Recording is a full-screen form with Amount first and a numeric keypad. Review shows what changes, then Save.",
        "A register shows rows grouped by day. Search is in the app bar; Reconcile, Statement and Void are in the overflow menu.",
        "While editing, View as raw postings is in the overflow menu.",
        "Touch targets are at least 48 px.",
      ),
{
      "type": "image",
      "src": "/screenshots/phone-overview.webp",
      "alt": "Kabacus Overview on a phone, with Available to spend, the tab bar and the floating Add button",
      "caption": "The web app on a 390 px phone. The KDE app has the same tabs and Add button.",
      "width": 780,
      "height": 1688
},
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
      p("info, new, report, export, history, run, commands, mcp, completions and man. Reading subcommands take --json. --help prints to stdout and exits 0; usage errors exit 2 before any work; failures exit 1."),
      h2("Scripts"),
      p("run executes a script, one step per command. A step can name itself with “as” and later steps use its result. A script is all-or-nothing and saved as one revision. Writes are dry runs unless you pass --save. kabacus-cli commands lists every action."),
      h2("MCP"),
      ul(
        "Headless: kabacus-cli mcp --books FILE serves MCP over stdio on the books you name. --read-only lists only reading tools. It never reaches the network.",
        "Attached: kabacus-cli mcp --attach PORT drives a running app through its control channel so you watch every change. Turn the channel on in Settings → Automation. It listens on loopback only.",
        "Tools are the same everywhere, dry run by default; rewrite tools are listed only when usable.",
        "A revision made through MCP records your user and the agent’s name, for example “jordan.lee via Claude (agent)”, and Activity marks it.",
      ),
{
      "type": "h2",
      "text": "Review automation like any other write"
},
{
      "type": "p",
      "text": "Read-only MCP exposes only read tools. Write tools use dry runs by default, but a caller with permission can request a real write directly: there is no confirmation token that guarantees a human reviewed it. Give assistants only the books and capabilities they need and inspect their revisions in Activity."
},
{
      "type": "p",
      "text": "Attached automation is opt-in and binds to loopback. While an agent is attached the sidebar identifies it and changed rows are briefly outlined. A browser tab does not expose that channel."
},
{
      "type": "links",
      "slugs": [
            "cli-reference",
            "ledger-rules"
      ]
}
    ],
  },
  {
    slug: "server",
    group: "Running a server",
    title: "Running kabacus-server",
    summary: "Shared books over an HTTP API, the web app and an MCP endpoint.",
    blocks: [
      h2("Launch and connect"),
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
{
      "type": "h2",
      "text": "Permission denied or expired session"
},
{
      "type": "p",
      "text": "Distinguish an unreachable server, an expired login and an authenticated user without the required role. Reconnect or sign in when asked; if the operation is forbidden, have the host check the token claim and role_map. Turning authentication off is not a remedy for a broken remote login."
},
{
      "type": "p",
      "text": "A browser web session persists sign-in and refresh state in browser storage, with lifetime controlled by the provider. The native shell uses native token handling; on Linux refresh tokens use Secret Service. Signing out of the application and ending a provider’s SSO session are separate concerns."
},
{
      "type": "links",
      "slugs": [
            "server-operations",
            "troubleshooting"
      ]
}
    ],
  },
];

export function findArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
