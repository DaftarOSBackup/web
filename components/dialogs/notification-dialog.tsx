"use client"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Bell, MessageSquare, AlertTriangle, RefreshCcw, Link2, BookOpen } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

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

const navItems = [
  { title: "Requests", value: "requests", icon: MessageSquare, count: requests.length },
  { title: "Alerts", value: "alerts", icon: AlertTriangle, count: alerts.length },
  { title: "Updates", value: "updates", icon: RefreshCcw, count: updates.length },
  { title: "Program Links", value: "program-links", icon: Link2, count: programLinks.length },
  { title: "Stories", value: "stories", icon: BookOpen, count: stories.length }
]

// Add this helper function at the top of the file
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function NotificationDialog({ open, onOpenChange }: NotificationDialogProps) {
  const [activeTab, setActiveTab] = useState("requests")
  const [activeRequests, setActiveRequests] = useState(requests)
  const { toast } = useToast()

  const handleAccept = (request: typeof requests[0]) => {
    toast({
      title: "Request Accepted",
      description: `You've accepted the ${request.type} invitation from ${request.daftar}`,
    })
    // Remove the request from the list
    setActiveRequests(prev => prev.filter(r => r.id !== request.id))
  }

  const handleDecline = (request: typeof requests[0]) => {
    toast({
      title: "Request Declined",
      description: `You've declined the ${request.type} invitation from ${request.daftar}`,
      variant: "destructive",
    })
    // Remove the request from the list
    setActiveRequests(prev => prev.filter(r => r.id !== request.id))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[600px] p-0 gap-0">
        {/* Top Navigation */}
        <div className="border-b">
          <nav className="flex items-center space-x-1 px-4 h-14">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                className={cn(
                  "relative px-3 py-2 text-sm rounded-md transition-colors",
                  "hover:bg-accent/50",
                  activeTab === item.value
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                  {item.count > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-1 h-5 px-1.5"
                    >
                      {item.count}
                    </Badge>
                  )}
                </span>
                {activeTab === item.value && (
                  <span className="absolute inset-x-0 -bottom-[10px] h-[2px] bg-foreground" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <ScrollArea className="h-[calc(600px-3.5rem)]">
          <div className="p-4">
            {/* Filter */}
            <div className="flex justify-end mb-4">
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Content for each tab */}
            <div className="space-y-4">
              {/* Keep existing content rendering logic for each tab */}
              {activeTab === "requests" && activeRequests.map((request) => (
                <div key={request.id} className="space-y-2">
                  <div className="flex justify-end">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(request.date)}
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleDecline(request)}
                      >
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleAccept(request)}
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {activeTab === "alerts" && alerts.map((alert) => (
                <div key={alert.id} className="space-y-2">
                  <div className="flex justify-end">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(alert.date)}
                    </span>
                  </div>
                  <div className="p-4 border rounded-[0.3rem] space-y-2">
                    <Badge variant="secondary" className="mb-2">{alert.type}</Badge>
                    <h4 className="font-medium">{alert.title}</h4>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                </div>
              ))}

              {activeTab === "updates" && updates.map((update) => (
                <div key={update.id} className="space-y-2">
                  <div className="flex justify-end">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(update.date)}
                    </span>
                  </div>
                  <div className="p-4 border rounded-[0.3rem] space-y-2">
                    <p className="text-sm text-muted-foreground">{update.daftar}</p>
                    <h4 className="font-medium">{update.title}</h4>
                    <p className="text-sm text-muted-foreground">{update.message}</p>
                  </div>
                </div>
              ))}

              {activeTab === "program-links" && programLinks.map((link) => (
                <div key={link.id} className="space-y-2">
                  <div className="flex justify-end">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(link.date)}
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

              {activeTab === "stories" && stories.map((story) => (
                <div key={story.id} className="space-y-2">
                  <div className="flex justify-end">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(story.date)}
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
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}