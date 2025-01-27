"use client"
import { useSearchParams } from "next/navigation"
import { StudioNav } from "@/components/navbar/studio-nav"

export default function StudioPage() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') // 'create' or 'edit'
  const programId = searchParams.get('programId') // Only present in edit mode

  // Debug log
  console.log("Studio Page Params:", { mode, programId })

  return (
    <div className="space-y-6">
      <StudioNav mode={mode} programId={programId} />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-[calc(100vh-10rem)] text-sm text-muted-foreground">
          <p>Select a tab to {mode === 'edit' ? 'edit' : 'create'} program details</p>
        </div>
      </div>
    </div>
  )
}