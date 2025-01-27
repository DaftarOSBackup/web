"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { investorStudioNavItems, founderStudioNavItems } from "@/config/navigation"
import { useRole } from "@/contexts/role-context"
import Link from "next/link"

interface StudioNavProps {
  className?: string
}

export function StudioNav({ className }: StudioNavProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const { role } = useRole()

  // Get nav items based on role
  const navItems = role === 'investor' ? investorStudioNavItems : founderStudioNavItems
  // const navItems = investorStudioNavItems

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-150 ",
        isScrolled ? "border-b bg-background/80 backdrop-blur-sm" : "bg-background",
        className
      )}
    >
      <div className="flex h-14 items-center justify-between container mx-auto px-4 border-b">
        <div className="flex items-center space-x-2">
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.url} 
                href={item.url}
                className={cn(
                  "relative px-3 py-2 text-xs rounded-md transition-colors",
                  "hover:bg-accent/50",
                  pathname === item.url 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.title}
                {pathname === item.url && (
                  <span className="absolute inset-x-0 -bottom-[10px] h-[2px] bg-foreground " />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
