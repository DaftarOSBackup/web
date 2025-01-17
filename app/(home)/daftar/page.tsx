"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, ArrowUpRight, Plus } from "lucide-react"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CreateDaftarDialog } from "@/components/dialogs/create-daftar-dialog"

// Sample data
const daftars = [
  {
    id: "tech-innovation",
    name: "Tech Innovation Fund",
    pitches: [
      {
        name: "AI Healthcare Solution",
        status: "Accepted",
        date: "2024-03-15"
      },
      {
        name: "Fintech Platform",
        status: "Pending",
        date: "2024-03-20"
      }
    ]
  },
  {
    id: "sustainable-growth",
    name: "Sustainable Growth",
    pitches: [
      {
        name: "Green Energy Project",
        status: "Rejected",
        date: "2024-03-10"
      }
    ]
  }
]

const overview = {
  totalDaftars: 5,
  activePitches: 8,
  acceptedPitches: 3,
  rejectedPitches: 2,
  recentActivity: [
    {
      action: "Pitch Accepted",
      daftar: "Tech Innovation Fund",
      date: "2024-03-15"
    },
    {
      action: "New Pitch Submitted",
      daftar: "Sustainable Growth",
      date: "2024-03-14"
    },
    {
      action: "Daftar Created",
      daftar: "Healthcare Ventures",
      date: "2024-03-12"
    }
  ]
}

export default function DaftarPage() {
  const [selectedDaftar, setSelectedDaftar] = useState<typeof daftars[0] | null>(null)
  const [createDaftarOpen, setCreateDaftarOpen] = useState(false)

  return (
    <div className="space-y-6 container mx-auto px-4">
      {/* Header with Search and Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">My Daftar</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search daftars..." className="pl-8 w-[200px] h-9 text-sm" />
          </div>

          <Button size="sm" className="h-9 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setCreateDaftarOpen(true)}>
            New Daftar
          </Button>
          <Link href="/pitch-board">
          <Button size="sm" variant="outline" className="h-9">
            Pitch Board
          </Button>
          </Link>
          <Select>
            <SelectTrigger className="h-9 text-sm">
              <Filter className="h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Daftars</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          
        </div>
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-6">
        {/* Daftars and Pitches Section */}
        <div className="space-y-4">
          {daftars.map((daftar) => (
            <div
              key={daftar.name}
              className="border rounded-[0.3rem] divide-y cursor-pointer hover:border-blue-600"
              onClick={() => setSelectedDaftar(daftar)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{daftar.name}</h3>
                  <Link href={`/daftar/${daftar.id}`}>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Details
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                  </Link>
                </div>
              </div>
              <div className="divide-y">
                {daftar.pitches.map((pitch) => (
                  <div
                    key={pitch.name}
                    className="p-4 hover:bg-muted/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{pitch.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Pitched on {new Date(pitch.date).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          pitch.status === "Accepted" 
                            ? "bg-green-100 text-green-700" 
                            : pitch.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : ""
                        }
                      >
                        {pitch.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Daftar Details Section */}
        <div className="space-y-6">
          {selectedDaftar ? (
            <>
              <div className="p-4 border rounded-[0.3rem]">
                <h3 className="font-medium mb-4">{selectedDaftar.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-[0.3rem] bg-muted/50">
                    <p className="text-sm text-muted-foreground">Total Pitches</p>
                    <p className="text-xl font-bold">{selectedDaftar.pitches.length}</p>
                  </div>
                  <div className="p-3 rounded-[0.3rem] bg-muted/50">
                    <p className="text-sm text-muted-foreground">Accepted</p>
                    <p className="text-xl font-bold">
                      {selectedDaftar.pitches.filter(p => p.status === "Accepted").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-[0.3rem]">
                <div className="p-4 border-b">
                  <h3 className="font-medium">Recent Pitches</h3>
                </div>
                <div className="divide-y">
                  {selectedDaftar.pitches.map((pitch) => (
                    <div key={pitch.name} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{pitch.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(pitch.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            pitch.status === "Accepted" 
                              ? "bg-green-100 text-green-700" 
                              : pitch.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : ""
                          }
                        >
                          {pitch.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-sm text-muted-foreground">
              <p>Select a daftar to view details</p>
            </div>
          )}
        </div>
      </div>
      <CreateDaftarDialog 
        open={createDaftarOpen}
        onOpenChange={setCreateDaftarOpen}
      />
    </div>
  )
} 