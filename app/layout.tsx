import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { StatusBar } from "@/components/layout/status-bar";
import { CommandPaletteProvider } from "@/components/command/use-command-palette";
import { CommandPalette } from "@/components/command/command-palette";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
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
