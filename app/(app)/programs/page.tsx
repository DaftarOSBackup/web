"use client"
import { useSearch } from "@/contexts/search-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState } from "react"
import { BarChart2 } from "lucide-react"
import { StudioDialog } from "@/components/dialogs/studio-dialog"

const programStatus = {
  planning: [
    {
      title: "Green Energy Initiative",
      postedby: "John Doe",
      status: "Planning",
    },
    {
      title: "Healthcare Tech Fund",
      postedby: "Sarah Johnson",
      status: "Planning",
    },
  ],
  scheduled: [
    {
      title: "AI Ventures",
      postedby: "John Doe",
      status: "Scheduled",
    },
  ],
  open: [
    {
      title: "Tech Startup Fund",
      postedby: "John Doe",
      status: "Open",
    },
    {
      title: "Real Estate Growth",
      postedby: "John Doe",
      status: "Open",
    },
  ],
  closed: [
    {
      title: "Fintech Innovation",
      postedby: "John Doe",
      status: "Closed",
    },
  ],
}

export default function ProgramsPage() {
  const { searchQuery, filterValue } = useSearch()
  const [insightsOpen, setInsightsOpen] = useState(false)
  const [studioOpen, setStudioOpen] = useState(false)

  // Filter programs based on search query and filter value
  const filteredPrograms = Object.entries(programStatus).reduce((acc, [key, programs]) => {
    const filtered = programs.filter(program => {
      const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          program.postedby.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = filterValue === 'all' || program.status.toLowerCase() === filterValue.toLowerCase()
      return matchesSearch && matchesFilter
    })
    return { ...acc, [key]: filtered }
  }, {} as typeof programStatus)

  return (
    <div className="space-y-6 container mx-auto">
      <div className="flex items-center justify-end gap-2">
        
        <Link href="/programs/studio/details">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-9 text-white">
            New Program
          </Button>
        </Link>

        {/* <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-9 text-white"
        onClick={() => setStudioOpen(true)}>
            New Program
          </Button> */}

        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setInsightsOpen(true)}
          className="h-9"
        >
          <BarChart2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Object.entries(filteredPrograms).map(([status, programs]) => (
          <div key={status} className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold capitalize">{status}</h2>
              <Badge variant="secondary" className="text-xs">
                {programs.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {programs.map((program) => (
                <Link
                  key={program.title}
                  href={`/programs/${program.title.toLowerCase().replace(/ /g, '-')}`}
                >
                  <div className="p-3 rounded-[0.3rem] bg-card border shadow-sm mt-2 cursor-pointer hover:border-blue-600">
                    <h3 className="font-medium text-sm">{program.title}</h3>
                    <p className="text-sm text-muted-foreground">{program.postedby}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <StudioDialog 
        open={studioOpen} 
        onOpenChange={setStudioOpen}
      />
    </div>
  )
} 
