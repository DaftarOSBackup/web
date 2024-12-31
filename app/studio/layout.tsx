import { TopNav } from "@/components/navbar/top-nav"
import { StudioSidebar } from "@/components/navbar/studio-sidebar"

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <StudioSidebar className="w-60" />
      <div className="flex-1 w-full">
        <TopNav />
        <main className="px-4 py-2">{children}</main>
      </div>
    </div>
  )
} 