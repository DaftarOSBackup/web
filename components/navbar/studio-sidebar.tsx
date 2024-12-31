"use client"
import { cn } from "@/lib/utils"
import { studioNavItems } from "@/config/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface StudioSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}


export function StudioSidebar({ className }: StudioSidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("border-r bg-background", className)}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-2">
            <h2 className="text-md font-semibold">Program Studio</h2>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-2">
          <nav className="space-y-1">
            {studioNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "flex items-center gap-3 rounded-[0.3rem] px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === item.url ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
} 