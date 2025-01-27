"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

interface ProgramDetails {
  name: string
  note: string
}

export default function ProgramDetailsPage() {
  const router = useRouter()
  const [details, setDetails] = useState<ProgramDetails>({
    name: "",
    note: "",
  })

  const handleSave = () => {
    // Add save logic here
    console.log("Saving program details:", details)
    // Navigate to next section
    router.push("/studio/document")
  }

  return (
    <div className="space-y-6 container mx-auto px-4">
      <div className="pr-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Program Name</Label>
          <Input
            id="name"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            placeholder="Enter program name"
            className="h-9 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">Quick Note for Founders</Label>
          <div className="text-xs text-muted-foreground mb-2">
            Provide a brief description of what founders need to know before applying.
          </div>
          <Textarea
            id="note"
            value={details.note}
            onChange={(e) => setDetails({ ...details, note: e.target.value })}
            placeholder="Write a quick note for founders..."
            className="min-h-[300px] text-sm resize-none"
          />
        </div>

        <div className="pt-4 flex justify-center">
          <Button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
} 
