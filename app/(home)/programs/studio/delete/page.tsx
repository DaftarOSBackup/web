"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CheckCircle2, XCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample data
const approvalRequests = [
  {
    id: "1",
    daftarName: "Tech Innovation Fund",
    approvedBy: "John Smith",
    designation: "Investment Manager",
    date: "2024-03-20T14:30:00",
    status: "approved"
  },
  {
    id: "2",
    daftarName: "Healthcare Ventures",
    approvedBy: "Sarah Johnson",
    designation: "Program Director",
    date: "2024-03-19T10:15:00",
    status: "pending"
  }
]

export default function DeletePage() {
  const router = useRouter()
  const deletionDate = new Date().toLocaleString()

  const handleDelete = () => {
    // Add delete logic
    router.push("/home/programs")
  }

  return (
    <div className="space-y-6 container mx-auto px-4">
      <ScrollArea className="h-[calc(100vh-11rem)]">
      <h1 className="text-2xl font-semibold text-destructive">Delete Program</h1>
      
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Are you sure you want to delete this program? This action cannot be undone.
        </p>
        
        <div className="flex gap-2">
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Delete Program
          </Button>
        </div>

        {/* Agreement Section */}
        <div className="flex items-start gap-2 p-4 border rounded-[0.3rem] bg-muted/50 w">
          <p className="text-sm text-muted-foreground">
            I agree that I have read all the data, and we're good to delete the program.
          </p>
        </div>

        {/* Approval Cards */}
        <div className="space-y-3">
          {approvalRequests.map((request) => (
            <div 
              key={request.id}
              className="flex items-center justify-between p-4 border rounded-[0.3rem]"
            >
              <div className="space-y-1">
                <h3 className="font-medium">{request.daftarName}</h3>
                <div className="space-y-0.5">
                  <p className="text-sm">
                    Approved by <span className="text-blue-600">{request.approvedBy}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{request.designation}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(request.date).toLocaleString()}
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

        {/* Deletion Notice */}
        <div className="space-y-2 pt-4">
          <p className="text-sm text-muted-foreground">
            All data related to the program has been deleted, and the offer has been withdrawn. 
            The program is no longer available.
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