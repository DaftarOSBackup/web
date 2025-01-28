"use client"
import { useUrlParams } from "@/lib/utils/get-url-params"

export default function StudioPage() {
  const { mode, programId } = useUrlParams()

  // Debug log
  console.log("Studio Page Params:", { mode, programId })

  return (
    <div className="space-y-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-[calc(100vh-10rem)] text-sm text-muted-foreground">
          <p>Select a tab to {mode === 'edit' ? 'edit' : 'create'} program details</p>
        </div>
      </div>
    </div>
  )
}