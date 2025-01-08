"use client"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Bell } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const sections = [
  { id: "requests", label: "Requests", count: 3 },
  { id: "alerts", label: "Alerts", count: 2 },
  { id: "updates", label: "Updates", count: 4 },
  { id: "program-links", label: "Program Links", count: 2 },
  { id: "stories", label: "Stories", count: 5 }
]

interface NotificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Update sample data
const requests = [
  {
    id: "1",
    type: "program",
    title: "Program Invitation",
    program: "Tech Innovation Fund",
    daftar: "Daftar OS",
    role: "Lead Investor",
    date: "2024-03-20T14:30:00"
  },
  {
    id: "2",
    type: "team",
    title: "Team Invitation",
    daftar: "MedTech Hub",
    role: "Mentor",
    date: "2024-03-19T09:15:00"
  }
]

const alerts = [
  {
    id: "1",
    title: "Meeting in 30 minutes",
    message: "Upcoming meeting with Tech Startup team",
    type: "meeting",
    date: "2024-03-21T09:30:00"
  },
  {
    id: "2",
    title: "New Document Shared",
    message: "Financial model has been shared by AI Solutions",
    type: "document",
    date: "2024-03-21T08:15:00"
  }
]

const updates = [
  {
    id: "1",
    daftar: "Tech Startup",
    title: "Pitch Updated",
    message: "The team has updated their pitch deck",
    date: "2024-03-20T15:45:00"
  },
  {
    id: "2",
    daftar: "AI Solutions",
    title: "Team Member Added",
    message: "New CTO joined the team",
    date: "2024-03-20T11:20:00"
  }
]

const programLinks = [
  {
    id: "1",
    program: "Tech Innovation Fund",
    daftar: "Daftar OS",
    type: "Featured",
    date: "2024-03-19T16:00:00",
    status: "Active"
  },
  {
    id: "2",
    program: "Healthcare Accelerator",
    daftar: "MedTech Hub",
    type: "Recommended",
    date: "2024-03-19T14:30:00",
    status: "Active"
  }
]

const stories = [
  {
    id: "1",
    title: "Successful Incubation",
    daftar: "Tech Startup",
    program: "Tech Innovation Fund",
    message: "We're excited to announce that Tech Startup has been accepted into our incubation program.",
    date: "2024-03-20T15:45:00"
  },
]

export function NotificationDialog({ open, onOpenChange }: NotificationDialogProps) {
  const [activeSection, setActiveSection] = useState("program-invite")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 gap-0">
        <div className="flex h-[28rem]">
          {/* Side Navigation */}
          <div className="w-52 border-r p-2 space-y-3 bg-muted/10">
            <div className="flex items-center gap-2 px-2">
              <div className="p-1.5 rounded-[0.3rem] bg-accent/50 text-accent-foreground">
                <Bell className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold">Notifications</h2>
            </div>

            <div className="space-y-1">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start rounded-[0.3rem] py-2 text-sm",
                    activeSection === section.id 
                      ? "bg-accent" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.label}
                  {section.count > 0 && (
                    <Badge 
                      variant="secondary" 
                      className="ml-auto"
                    >
                      {section.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* Filter only */}
            <div className="p-4 mr-8  flex justify-end">
              <Select>
                <SelectTrigger className="w-[120px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notifications List */}
            <ScrollArea className="h-[calc(100%-6rem)]">
              <div className="p-4 space-y-4">
                {activeSection === "requests" && requests.map((request) => (
                  <div key={request.id} className="space-y-2">
                    <div className="flex justify-end">
                      <span className="text-xs text-muted-foreground">
                        {new Date(request.date).toLocaleString()}
                      </span>
                    </div>
                    <div className="p-4 border rounded-[0.3rem] space-y-4">
                      <div className="space-y-1">
                        <h4 className="font-medium">{request.title}</h4>
                        <p className="text-sm text-muted-foreground">{request.daftar}</p>
                        <p className="text-sm text-muted-foreground">Role: {request.role}</p>
                        {request.program && (
                          <p className="text-sm text-muted-foreground">Program: {request.program}</p>
                        )}
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="text-red-500">Decline</Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Accept</Button>
                      </div>
                    </div>
                  </div>
                ))}

                {activeSection === "alerts" && alerts.map((alert) => (
                  <div key={alert.id} className="space-y-2">
                    <div className="flex justify-end">
                      <span className="text-xs text-muted-foreground">
                        {new Date(alert.date).toLocaleString()}
                      </span>
                    </div>
                    <div className="p-4 border rounded-[0.3rem] space-y-2">
                      <Badge variant="secondary" className="mb-2">{alert.type}</Badge>
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                    </div>
                  </div>
                ))}

                {activeSection === "updates" && updates.map((update) => (
                  <div key={update.id} className="space-y-2">
                    <div className="flex justify-end">
                      <span className="text-xs text-muted-foreground">
                        {new Date(update.date).toLocaleString()}
                      </span>
                    </div>
                    <div className="p-4 border rounded-[0.3rem] space-y-2">
                      <p className="text-sm text-muted-foreground">{update.daftar}</p>
                      <h4 className="font-medium">{update.title}</h4>
                      <p className="text-sm text-muted-foreground">{update.message}</p>
                    </div>
                  </div>
                ))}

                {activeSection === "program-links" && programLinks.map((link) => (
                  <div key={link.id} className="space-y-2">
                    <div className="flex justify-end">
                      <span className="text-xs text-muted-foreground">
                        {new Date(link.date).toLocaleString()}
                      </span>
                    </div>
                    <div className="p-4 border rounded-[0.3rem] space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{link.type}</Badge>
                        <Badge variant={link.status === 'Active' ? 'default' : 'secondary'}>
                          {link.status}
                        </Badge>
                      </div>
                      <h4 className="font-medium">{link.program}</h4>
                      <p className="text-sm text-muted-foreground">{link.daftar}</p>
                    </div>
                  </div>
                ))}

                {activeSection === "stories" && stories.map((story) => (
                  <div key={story.id} className="space-y-2">
                    <div className="flex justify-end">
                      <span className="text-xs text-muted-foreground">
                        {new Date(story.date).toLocaleString()}
                      </span>
                    </div>
                    <div className="p-4 border rounded-[0.3rem] space-y-2">
                      <h4 className="font-medium">{story.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{story.daftar} • {story.program}</p>
                      <p className="text-sm text-muted-foreground">{story.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}