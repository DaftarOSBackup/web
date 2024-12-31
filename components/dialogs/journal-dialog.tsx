"use client"
import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollText } from "lucide-react"

interface JournalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function JournalDialog({ open, onOpenChange }: JournalDialogProps) {
  const [note, setNote] = useState("")

  // Load saved note when dialog opens
  useEffect(() => {
    if (open) {
      const savedNote = localStorage.getItem("investorNote")
      if (savedNote) setNote(savedNote)
    }
  }, [open])

  const handleSave = () => {
    localStorage.setItem("investorNote", note)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="flex flex-col h-[28rem]">
          <div className="flex items-center gap-2 p-4">
            <ScrollText className="h-4 w-4" />
            <h2 className="text-sm font-medium">Journal Note</h2>
          </div>

          <div className="flex-1 p-4">
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your investment thoughts here..."
              className="h-full text-sm resize-none border-0 focus-visible:ring-0"
            />
          </div>

          <div className="flex justify-center gap-2 p-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-sm rounded-[0.3rem] h-8"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="text-sm rounded-[0.3rem] h-8 bg-blue-600 hover:bg-blue-700"
            >
              Save Note
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 