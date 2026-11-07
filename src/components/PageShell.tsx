import type { ReactNode } from "react";
import type { NavPath } from "@/content/site";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageShell({ current, children }: { current?: NavPath; children: ReactNode }) {
  return (
    <>
      <SiteHeader current={current} />
      <main id="main" className="container">
        {children}
      </main>
      <SiteFooter tagline={["Kabacus", "Books you can check"]} />
    </>
  );
}
