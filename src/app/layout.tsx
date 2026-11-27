import type { Metadata } from "next";
import Link from "next/link";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const display = Fraunces({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TryOn Guinée — Essayage virtuel de tenues guinéennes",
  description:
    "Essaie virtuellement abayas, boubous, léppi et pagnes sur ta propre photo grâce à l'IA.",
};

function FlagStripe() {
  return (
    <div className="flex h-1 w-full" aria-hidden>
      <span className="flex-1 bg-gn-red" />
      <span className="flex-1 bg-gn-yellow" />
      <span className="flex-1 bg-gn-green" />
    </div>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${sans.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <FlagStripe />
        <header className="border-b border-border bg-background/90 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-display text-xl font-semibold tracking-tight">
              TryOn <span className="text-accent">Guinée</span>
            </Link>
            <Link
              href="/essayer"
              className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-accent"
            >
              Studio
            </Link>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border py-6 text-center text-sm text-muted">
          TryOn Guinée — la mode guinéenne, essayée avant d&apos;être portée.
        </footer>
      </body>
    </html>
  );
}
