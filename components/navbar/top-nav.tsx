"use client"
import { useState } from "react"
import { Play, FileText, Bell, ChevronRight, Folder } from "lucide-react"
import { usePathname } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { ProfileDialog } from "@/components/dialogs/profile-dialog"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { JournalDialog } from "@/components/dialogs/journal-dialog"
import { NotificationDialog } from "@/components/dialogs/notification-dialog"
import { useRole } from "@/contexts/role-context"
import { topNavConfig } from "@/config/navigation"
import { DaftarDialog } from "@/components/dialogs/daftar-dialog"

export function TopNav() {
  const { role } = useRole()
  const navActions = topNavConfig[role]
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)
  const [profileOpen, setProfileOpen] = useState(false)
  const [journalOpen, setJournalOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [daftarOpen, setDaftarOpen] = useState(false)

  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-background">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center overflow-hidden">
            <Breadcrumb className="flex items-center">
              {paths.map((path, index) => (
                <BreadcrumbItem key={path} className="flex items-center min-w-fit">
                  <BreadcrumbLink 
                    href={`/${paths.slice(0, index + 1).join('/')}`}
                    className="text-xs truncate"
                  >
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </BreadcrumbLink>
                  <ChevronRight className="h-4 w-4 shrink-0 mx-1" />
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
          </div>

          <div className="ml-auto flex items-center space-x-2">
            {navActions.map((action) => (
              <Button 
                key={action.action}
                variant="ghost" 
                size="icon"
                onClick={() => {
                  if (action.action === 'journal') {
                    setJournalOpen(true)
                  }
                  if (action.action === 'notifications') {
                    setNotificationOpen(true)
                  }
                  if (action.action === 'daftar') {
                    setDaftarOpen(true)
                  }
                }}
              >
                <action.icon className="h-5 w-5" />
              </Button>
            ))}

            <div className="px-1">
              <ThemeToggle />
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-[0.3rem]"
              onClick={() => setProfileOpen(true)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </div>

      <ProfileDialog 
        open={profileOpen} 
        onOpenChange={setProfileOpen}
      />
      <JournalDialog 
        open={journalOpen}
        onOpenChange={setJournalOpen}
      />
      <DaftarDialog 
        open={daftarOpen}
        onOpenChange={setDaftarOpen}
      />
      <NotificationDialog 
        open={notificationOpen}
        onOpenChange={setNotificationOpen}
      />
    </>
  )
}
