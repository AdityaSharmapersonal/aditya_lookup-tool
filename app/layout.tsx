import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Country Lookup",
  description: "Search countries and read grounded AI explanations."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="page-shell">
          <header className="topbar">
            <Link href="/search" className="brand">
              Country Lookup
            </Link>
          </header>
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
