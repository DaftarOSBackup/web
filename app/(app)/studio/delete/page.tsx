"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CheckCircle2, XCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRole } from "@/contexts/role-context"

// Sample data for both roles
const approvalRequests = {
  investor: [
    {
      id: "1",
      name: "Tech Innovation Fund",
      approvedBy: "John Smith",
      designation: "Investment Manager",
      date: "2024-03-20T14:30:00",
      status: "approved"
    },
  ],
  founder: [
    {
      id: "1",
      name: "AI Healthcare Assistant",
      approvedBy: "Sarah Johnson",
      designation: "Program Director",
      date: "2024-03-19T10:15:00",
      status: "approved"
    },
  ]
}

// Add the formatDate function
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export default function DeletePage() {
  const router = useRouter()
  const { role } = useRole()
  const deletionDate = formatDate(new Date().toISOString())

  const handleDelete = () => {
    router.push(role === 'investor' ? "/programs" : "/daftar")
  }

  const isInvestor = role === 'investor'
  const requests = isInvestor ? approvalRequests.investor : approvalRequests.founder

  return (
    <div className="space-y-6 container mx-auto px-4">
      <ScrollArea className="h-[calc(100vh-11rem)]">
        <h1 className="text-2xl font-semibold text-destructive">
          Delete {isInvestor ? "Program" : "Pitch"}
        </h1>
      
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Are you sure you want to delete this {isInvestor ? "program" : "pitch"}? This action cannot be undone.
          </p>
          
          <div className="flex gap-2">
            <Button variant="destructive" onClick={handleDelete}>
              Delete {isInvestor ? "Program" : "Pitch"}
            </Button>
          </div>

          <div className="flex items-start gap-2 p-4 border rounded-[0.3rem] bg-muted/50">
            <p className="text-sm text-muted-foreground">
              I agree that I have read all the data, and we're good to delete the {isInvestor ? "program" : "pitch"}.
            </p>
          </div>

          <div className="space-y-3">
            {requests.map((request) => (
              <div 
                key={request.id}
                className="flex items-center justify-between p-4 border rounded-[0.3rem]"
              >
                <div className="space-y-1">
                  <h3 className="font-medium">{request.name}</h3>
                  <div className="space-y-0.5">
                    <p className="text-sm">
                      Approved by <span className="text-blue-600">{request.approvedBy}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{request.designation}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(request.date)}
                    </p>
                  </div>
                </div>
                {request.status === "approved" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4">
            <p className="text-sm text-muted-foreground">
              All data related to the {isInvestor ? "program" : "pitch"} has been deleted
              {isInvestor && ", and the offer has been withdrawn"}. 
              The {isInvestor ? "program" : "pitch"} is no longer available.
            </p>
            <p className="text-xs text-muted-foreground">
              Deletion Date: {deletionDate}
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
} 