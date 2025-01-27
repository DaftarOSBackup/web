"use client"
import { useState, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { investorStudioNavItems, founderStudioNavItems } from "@/config/navigation"
import { useRole } from "@/contexts/role-context"
import Link from "next/link"

interface StudioNavProps {
  className?: string;
  mode?: string | null;
  programId?: string | null;
}

export function StudioNav({ className, mode, programId }: StudioNavProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { role } = useRole()
  const [isScrolled, setIsScrolled] = useState(false)

  // Get nav items based on role
  const navItems = role === 'investor' ? investorStudioNavItems : founderStudioNavItems

  // Debug log
  console.log("StudioNav Props:", { mode, programId, pathname })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Create URL with preserved query parameters
  const createTabUrl = (baseUrl: string) => {
    // Create a new URLSearchParams instance
    const params = new URLSearchParams(searchParams.toString())
    
    // Ensure mode and programId are set
    if (mode) params.set('mode', mode)
    if (programId) params.set('programId', programId)
    
    // Debug log
    console.log("Created URL:", `${baseUrl}?${params.toString()}`)
    
    return `${baseUrl}?${params.toString()}`
  }

  return (
    <div
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-150",
        isScrolled ? "border-b bg-background/80 backdrop-blur-sm" : "bg-background",
        className
      )}
    >
      <div className="flex h-14 items-center justify-between px-4 border-b">
        <div className="flex items-center space-x-2">
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => {
              const href = createTabUrl(item.url)
              // Debug log
              console.log(`Nav Item ${item.title}:`, href)
              
              return (
                <Link 
                  key={item.url} 
                  href={href}
                  className={cn(
                    "relative px-3 py-2 text-sm rounded-md transition-colors",
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
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
