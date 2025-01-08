"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useRole } from "@/contexts/role-context"
import { studioNavItems, founderStudioNavItems } from "@/config/navigation"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface StudioSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StudioSidebar({ className }: StudioSidebarProps) {
  const pathname = usePathname()
  const { role } = useRole()
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  
  const navItems = role === 'investor' ? studioNavItems : founderStudioNavItems

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">
            {role === 'investor' ? 'Program Studio' : 'Pitch Studio'}
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <div key={item.title}>
                {item.subItems ? (
                  // Handle items with subitems
                  <div>
                    <button
                      onClick={() => setExpandedItem(expandedItem === item.title ? null : item.title)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg hover:bg-accent hover:text-accent-foreground",
                        pathname.includes(item.url) ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                        item.className
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        expandedItem === item.title && "transform rotate-180"
                      )} />
                    </button>
                    {expandedItem === item.title && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.url}
                            className={cn(
                              "block px-4 py-2 text-sm rounded-lg hover:bg-accent hover:text-accent-foreground",
                              pathname === subItem.url ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                            )}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular items without subitems
                  <Link
                    href={item.url}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === item.url ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                      item.className
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 