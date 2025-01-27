"use client"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

const pitchHistory = [
  {
    id: "1",
    type: "received",
    date: "2024-03-20T14:30:00",
    message: "We're interested in your startup and would like to extend an offer for investment.",
    status: "pending",
    user: "John Smith",
    designation: "Investment Manager",
    program: "Tech Innovation Fund",
    daftar: "Venture Capital LLC"
  },
  {
    id: "2",
    type: "accepted",
    date: "2024-03-15T10:15:00",
    message: "Thank you for considering our investment offer. We look forward to working together.",
    status: "completed",
    user: "Sarah Johnson",
    designation: "Program Director",
    program: "Healthcare Ventures",
    daftar: "Medical Innovations",
    acceptedBy: [
      {
        name: "Michael Chen",
        designation: "Co-Founder & CTO",
        date: "2024-03-16T09:30:00"
      },
      {
        name: "Emma Wilson",
        designation: "CFO",
        date: "2024-03-16T11:45:00"
      }
    ]
  },
  {
    id: "3",
    type: "withdrawn",
    date: "2024-03-10T16:45:00",
    message: "After careful consideration, we have decided to withdraw our investment offer.",
    status: "withdrawn",
    user: "David Brown",
    designation: "Investment Analyst",
    program: "Seed Fund",
    daftar: "Early Stage VC"
  }
]

export default function OfferPage() {
  return (
    <div className="space-y-6 container mx-auto px-4">
      <ScrollArea className="h-[calc(100vh-7rem)]">
        <div className="space-y-8">
          <div>
          <h1 className="text-2xl font-semibold">Offer</h1>
          <p className="text-sm text-muted-foreground">View and manage program offers</p>
        </div>

        {/* Pitch History */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Pitch History</h2>
          <div className="space-y-4">
            {pitchHistory.map((history) => (
              <div
                key={history.id}
                className="border rounded-[0.3rem] p-4 space-y-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        history.type === "received"
                          ? "default"
                          : history.type === "accepted"
                          ? "secondary"
                          : "destructive"
                      }
                      className="capitalize"
                    >
                      {history.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(history.date).toLocaleString()}</span>
                    </div>
                  </div>
                  {history.status === "pending" && (
                    <Badge variant="outline">Pending Response</Badge>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <p className="text-sm">{history.message}</p>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="text-muted-foreground">From:</span> {history.user}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Designation:</span> {history.designation}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Program:</span> {history.program}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Daftar:</span> {history.daftar}
                    </p>
                  </div>

                  {history.acceptedBy && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Accepted By:</p>
                        {history.acceptedBy.map((person, index) => (
                          <div key={index} className="space-y-1">
                            <p className="text-sm">{person.name}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{person.designation}</span>
                              <span>{new Date(person.date).toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {history.status === "pending" && (
                    <>
                      <Separator />
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Status: Pending</Badge>
                          <span className="text-xs text-muted-foreground">
                            Received on {new Date(history.date).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            className="text-red-500 hover:text-red-600"
                          >
                            Reject Offer
                          </Button>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Accept Offer
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
            </div>
        </div>
    </ScrollArea>
    </div>
  )
} 