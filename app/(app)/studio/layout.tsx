import { StudioNav } from "@/components/navbar/studio-nav"

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-[80%]">
      {/* Top Navigation */}
      <StudioNav/>

      {/* Main Content Area */}
      <div className="flex-1 w-full">
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}
