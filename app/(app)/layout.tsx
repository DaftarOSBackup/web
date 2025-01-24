import { AppSidebar } from "@/components/navbar/side-nav";
import { TopNav } from "@/components/navbar/top-nav";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar className="w-60" />
      <div className="flex-1 w-full">
        <TopNav />
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
} 