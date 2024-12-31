"use client"
import { Building2, LayoutDashboard, Users, Calendar, Crown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useRole } from "@/contexts/role-context"
import { investorNavItems, founderNavItems } from "@/config/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const daftars = [
  { value: "new", label: "Create New Daftar", isAction: true },
  { value: "daftar-1", label: "Daftar 1" },
  { value: "daftar-2", label: "Daftar 2" },
  { value: "daftar-3", label: "Daftar 3" },
]

interface SideNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AppSidebar({ className }: SideNavProps) {
  const { role } = useRole()
  const navItems = role === 'investor' ? investorNavItems : founderNavItems
  const Header = role === 'investor' ? 'Investor Platform' : 'Founder Platform'
  const pathname = usePathname()

  return (
    <div className={cn("border-r bg-background", className)}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <h2 className="text-md font-semibold">{Header}</h2>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-2">
          <nav>
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === item.url ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select daftar" />
            </SelectTrigger>
            <SelectContent>
              {daftars.map((daftar) => (
                <SelectItem 
                  key={daftar.value} 
                  value={daftar.value}
                  className={cn(
                    daftar.isAction && "text-blue-600 font-medium border-b"
                  )}
                >
                  {daftar.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
