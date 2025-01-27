"use client"
import { useSearchParams } from "next/navigation"
import { StudioNav } from "@/components/navbar/studio-nav"

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const programId = searchParams.get('programId')

  return (
    <div className="space-y-6">
      <StudioNav mode={mode} programId={programId} />
      {children}
    </div>
  )
}
