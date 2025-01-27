"use client"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, XCircle } from "lucide-react"

// Sample approval data
const approvalRequests = [
  {
    id: "1",
    username: "John Smith",
    designation: "Co-Founder & CTO",
    date: "2024-03-20T14:30:00",
    status: "approved"
  },
  {
    id: "2",
    username: "Sarah Johnson",
    designation: "Product Lead",
    date: "2024-03-19T10:15:00",
    status: "pending"
  },
  {
    id: "3",
    username: "Michael Chen",
    designation: "Technical Advisor",
    date: "2024-03-18T16:45:00",
    status: "approved"
  }
]

export default function PitchPage() {
  return (
    <div className="space-y-6 container mx-auto px-4">
      <ScrollArea className="h-[calc(100vh-7rem)]">
        <div className="space-y-8">
          <div>
          <h1 className="text-2xl font-semibold">Pitch</h1>
          <p className="text-sm text-muted-foreground">What are you looking for from the investor?</p>
        </div>

        {/* Specific Asks Section */}
        <div className="max-w-2xl space-y-2">
          <Label>Specific Asks for Investor</Label>
          <Textarea
            placeholder="What specific support or resources are you looking for?"
            className="min-h-[120px] ml-2 resize-none"
          />
        </div>

        {/* Approval Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Team Approvals</h2>
          <div className="space-y-3">
            {approvalRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 border rounded-[0.3rem]"
              >
                <div className="space-y-1">
                  <h3 className="font-medium">{request.username}</h3>
                  <p className="text-sm text-muted-foreground">{request.designation}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(request.date).toLocaleString()}
                  </p>
                </div>

                {request.status === "approved" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
    </div>
  )
} 