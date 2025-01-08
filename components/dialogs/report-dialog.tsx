"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const reportReasons = [
  { id: "false-claim", label: "False Claims" },
  { id: "scam", label: "Scam" },
  { id: "fraud", label: "Fraud" },
  { id: "plagiarism", label: "Plagiarism" },
  { id: "violence", label: "Violence" },
  { id: "threat", label: "Threat" },
  { id: "offensive", label: "Offensive Content" },
  { id: "illegal", label: "Illegal Activities" },
  { id: "cyberbully", label: "Cyberbullying" },
  { id: "nudity", label: "Nudity" },
  { id: "abusive", label: "Abusive Language" },
  { id: "deepfake", label: "Deep Fake" },
  { id: "misleading", label: "Misleading Data" }
]

interface ReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReportDialog({ open, onOpenChange }: ReportDialogProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([])

  const handleSubmit = () => {
    console.log("Reported reasons:", selectedReasons)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Report Startup</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Red flag this startup and help Daftar build a better startup ecosystem
          </p>

          <div className="grid grid-cols-2 gap-3">
            {reportReasons.map((reason) => (
              <div key={reason.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={reason.id}
                  checked={selectedReasons.includes(reason.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedReasons([...selectedReasons, reason.id])
                    } else {
                      setSelectedReasons(selectedReasons.filter(id => id !== reason.id))
                    }
                  }}
                />
                <label
                  htmlFor={reason.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {reason.label}
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 