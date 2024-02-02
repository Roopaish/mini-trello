import Header from "@/components/layout/header";
import ThemeProvider from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { isUserAuthenticated } from "@/lib/session";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini-trello",
  description: "Trello clone using Nextjs, Shadcn-ui and zustand",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await isUserAuthenticated();

  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <body className={inter.className}>
          <Header isAuthenticated={isAuthenticated} />
          <main className="w-full pt-16">{children}</main>
          <Toaster richColors closeButton />
        </body>
      </ThemeProvider>
    </html>
  );
}
