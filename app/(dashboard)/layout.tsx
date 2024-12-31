import { AppSidebar } from "@/components/navbar/side-nav";
import { TopNav } from "@/components/navbar/top-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar className="w-60" />
      <div className="flex-1 w-full">
        <TopNav />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
} 