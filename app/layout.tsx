import type { Metadata } from "next";
import "./globals.css";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { StatusBar } from "@/components/layout/status-bar";
import { CommandPaletteProvider } from "@/components/command/use-command-palette";
import { CommandPalette } from "@/components/command/command-palette";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Life OS — private dashboard",
  description:
    "A private personal dashboard for tracking life, growth, habits, goals, and reflection.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fonts loaded via <link> instead of next/font so the project compiles
            on platforms where Next's SWC can't load (e.g. Termux/Android) and
            we have to fall back to Babel. next/font requires SWC. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg text-ink antialiased">
        <CommandPaletteProvider>
          <TooltipProvider delayDuration={200}>
            <div className="flex h-screen w-screen overflow-hidden">
              {/* Desktop sidebar */}
              <div className="hidden md:flex md:w-60 lg:w-64 shrink-0">
                <Sidebar />
              </div>

              {/* Main column */}
              <div className="flex flex-col flex-1 min-w-0">
                <Topbar />
                <main className="flex-1 overflow-y-auto">
                  <div className="px-5 md:px-8 py-7 md:py-9 max-w-[1400px] mx-auto animate-fade-in">
                    {children}
                  </div>
                </main>
                <StatusBar />
              </div>
            </div>

            <CommandPalette />
          </TooltipProvider>
        </CommandPaletteProvider>
      </body>
    </html>
  );
}
