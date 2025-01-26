"use client"
import { Building2, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useRole } from "@/contexts/role-context"
import { investorNavItems, founderNavItems } from "@/config/navigation"
import { useState } from "react"
import { CreateDaftarDialog } from "@/components/dialogs/create-daftar-dialog"
import { Button } from "@/components/ui/button"

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

interface SideNavProps extends React.HTMLAttributes<HTMLDivElement> { }

export function AppSidebar() {
  const { role } = useRole()
  const navItems = role === 'investor' ? investorNavItems : founderNavItems
  const Header = role === 'investor' ? 'Investor Platform' : 'Founder Platform'
  const pathname = usePathname()
  const [createDaftarOpen, setCreateDaftarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleDaftarSelect = (value: string) => {
    if (value === "new") {
      setCreateDaftarOpen(true)
    }
  }

  return (
    <>
      <div className={cn(
        "border-r bg-background relative transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[60px]" : "w-[240px]"
      )}>
        <div className="absolute -right-3 top-6">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-full border shadow-sm bg-background"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft className={cn(
              "h-3 w-3 transition-transform duration-200",
              isCollapsed && "rotate-180"
            )} />
          </Button>
        </div>

        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="px-4 py-5">
            <Link href={'/'} className={cn("flex hover:cursor-pointer items-center  gap-2 overflow-hidden", isCollapsed && "justify-center")}>
              <Building2 className="h-6 w-6" />
              {!isCollapsed &&
                (<h2 className={cn(
                  "text-md font-semibold  transition-opacity duration-300",
                  isCollapsed && "opacity-0"
                )}>
                  {Header}
                </h2 >)}
            </Link >
          </div>

          {/* Navigation */}
          <div className="flex-1 px-2">
            <nav className={cn("space-y-3 mt-2", isCollapsed && "space-y-5")}>
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === item.url ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    isCollapsed && "justify-center my-4 flex "
                  )}
                >
                  <item.icon className="h-6 w-6" />
                  {!isCollapsed && (
                    <span className={cn(
                      "transition-opacity duration-300 overflow-hidden whitespace-nowrap",
                      isCollapsed && "opacity-0"
                    )}>
                      {item.title}
                    </span>)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className={cn(
            "p-4 transition-opacity duration-300",
            isCollapsed && "opacity-0"
          )}>
            <Select onValueChange={handleDaftarSelect}>
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

      <CreateDaftarDialog
        open={createDaftarOpen}
        onOpenChange={setCreateDaftarOpen}
      />
    </>
  )
}
