import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { RoleProvider } from "@/contexts/role-context";
import { SearchProvider } from "@/contexts/search-context";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Pitch OS",
  description: "Pitch OS is a platform for startups to pitch their ideas to investors",
  icons: {
    icon: "/assets/daftar.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-poppins">
        <AuthProvider>
          <SearchProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <RoleProvider>
                {children}
              </RoleProvider>
            </ThemeProvider>
          </SearchProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
