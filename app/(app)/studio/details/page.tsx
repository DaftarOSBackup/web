"use client"
import { useState, useEffect, Suspense } from "react"
import { useUrlParams } from "@/lib/utils/get-url-params"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loading } from "@/components/loading"

interface ProgramDetails {
  name: string;
  description: string;
  // Add other fields as needed
}

function DetailsContent() {
  const { mode, programId } = useUrlParams()
  const [details, setDetails] = useState<ProgramDetails>({
    name: "",
    description: "",
  })

  useEffect(() => {
    if (mode === 'edit' && programId) {
      // Fetch program details and set them
      // This is where you'd make an API call to get the program details
      fetchProgramDetails(programId)
    }
  }, [mode, programId])

  const fetchProgramDetails = async (id: string) => {
    // Simulate API call
    const data = {
      name: "Example Program",
      description: "Program description..."
    }
    setDetails(data)
  }

  const handleSave = async () => {
    if (mode === 'edit') {
      // Update existing program
      console.log("Updating program:", programId, details)
    } else {
      // Create new program
      console.log("Creating new program:", details)
    }
  }

  return (
    <div className="space-y-6 container mx-auto px-4">
      <div>
        <h1 className="text-2xl font-semibold">
          {mode === 'edit' ? 'Edit Program Details' : 'Create New Program'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {mode === 'edit' ? 'Update your program information' : 'Enter details for your new program'}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Program Name</Label>
          <Input
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            placeholder="Enter program name"
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={details.description}
            onChange={(e) => setDetails({ ...details, description: e.target.value })}
            placeholder="Enter program description"
            className="min-h-[200px]"
          />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {mode === 'edit' ? 'Update Program' : 'Create Program'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function DetailsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DetailsContent />
    </Suspense>
  )
}

