import { AppSidebar } from "@/components/navbar/side-nav";
import { TopNav } from "@/components/navbar/top-nav";
import { Toaster } from "@/components/ui/toaster";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 w-full">
        <TopNav />
        <main className="p-4">{children}</main>
        <Toaster />
      </div>
    </div>
  )
} 