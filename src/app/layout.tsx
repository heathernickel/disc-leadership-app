import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-semibold text-slate-900">Leadership DISC Profile</Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/assessment">Assessment</Link>
              <Link href="/sample-report">Sample Report</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto min-h-[calc(100vh-68px)] max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
