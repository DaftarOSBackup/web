import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { RoleProvider } from "@/contexts/role-context";

export const metadata: Metadata = {
  title: "Investment Platform",
  description: "Connect investors with promising startups",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RoleProvider>
            {children}
          </RoleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
