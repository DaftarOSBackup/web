"use client"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

const tabs = [
  { id: "program-invite", label: "Program Invite", count: 3 },
  { id: "alert", label: "Alert", count: 2 },
  { id: "announcement", label: "Announcement", count: 5 },
  { id: "broadcast", label: "Broadcast", count: 1 }
]

interface NotificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Add this sample data
const programInvites = [
  {
    id: "1",
    programName: "Tech Innovation Fund",
    daftarName: "Daftar OS",
    designation: "Lead Investor",
    invitedAt: "2024-03-20T14:30:00",
    notifiedAt: "2024-03-20T14:35:00",
    status: "pending"
  },
  {
    id: "2",
    programName: "Healthcare Accelerator",
    daftarName: "MedTech Hub",
    designation: "Mentor",
    invitedAt: "2024-03-19T09:15:00",
    notifiedAt: "2024-03-19T09:20:00",
    status: "pending"
  }
]

const alerts = [
  {
    id: "1",
    title: "Meeting Reminder",
    message: "Upcoming meeting in 30 minutes",
    notifiedAt: "2024-03-21T09:30:00"
  },
  {
    id: "2",
    title: "Document Update",
    message: "New documents have been shared with you",
    notifiedAt: "2024-03-21T08:15:00"
  }
]

const announcements = [
  {
    id: "1",
    title: "Daftar Name has been offered incubation",
    message: "We're happy to share that [Daftar Name] has been offered incubation, featured by [Program Name], and published  by [Daftar Name], focusing on [Sector] at the [Stage] stage.Based in [Location], the team, with an average age of [Age], is making steady progress. It's great to see founders working towards making a positive impact. Wishing them all the best for what's ahead",
    notifiedAt: "2024-03-20T15:45:00"
  },
  {
    id: "2",
    title: "Platform Update",
    message: "We've improved our matching algorithm",
    notifiedAt: "2024-03-20T11:20:00"
  }
]

const broadcasts = [
  {
    id: "1",
    title: "System Maintenance",
    message: "Scheduled maintenance this weekend",
    notifiedAt: "2024-03-19T16:00:00"
  },
  {
    id: "2",
    title: "Holiday Notice",
    message: "Platform support hours during holidays",
    notifiedAt: "2024-03-19T14:30:00"
  }
]

export function NotificationDialog({ open, onOpenChange }: NotificationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <Tabs defaultValue="program-invite" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="relative">
                  {tab.label}
                  {tab.count > 0 && (
                    <Badge 
                      variant="secondary" 
                      className="ml-2 h-5 px-1.5"
                    >
                      {tab.count}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex items-center gap-2 mr-8">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search notifications..." className="pl-8 w-[200px]" />
              </div>
              <Select>
                <SelectTrigger>
                  <Filter className="h-4 w-4" />
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="h-[400px]">
            <ScrollArea className="h-full pr-4">
              <TabsContent value="program-invite" className="space-y-4 mt-0">
                {programInvites.map((invite) => (
                  <div key={invite.id} className="space-y-2">
                    <div className="flex justify-end">
                      <span className="text-xs text-muted-foreground">
                        {new Date(invite.notifiedAt).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="p-4 border rounded-[0.3rem] space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">{invite.programName}</h4>
                          <div className="space-y-0.5">
                            <p className="text-sm text-muted-foreground">
                              {invite.daftarName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Role: {invite.designation}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Invited: {new Date(invite.invitedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                        >
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="alert" className="space-y-4 mt-0">
                {alerts.map((alert) => (
                  <div key={alert.id} className="space-y-2">
                    <div className="flex justify-end">
                      <span className="text-xs text-muted-foreground">
                        {new Date(alert.notifiedAt).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="p-4 border rounded-[0.3rem] space-y-2">
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="announcement" className="space-y-4 mt-0">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="space-y-2">
                    <div className="flex justify-end">
                      <span className="text-xs text-muted-foreground">
                        {new Date(announcement.notifiedAt).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="p-4 border rounded-[0.3rem] space-y-2">
                      <h4 className="font-medium">{announcement.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {announcement.message}
                      </p>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="broadcast" className="space-y-4 mt-0">
                {broadcasts.map((broadcast) => (
                  <div key={broadcast.id} className="space-y-2">
                    <div className="flex justify-end">
                      <span className="text-xs text-muted-foreground">
                        {new Date(broadcast.notifiedAt).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="p-4 border rounded-[0.3rem] space-y-2">
                      <h4 className="font-medium">{broadcast.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {broadcast.message}
                      </p>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </ScrollArea>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}