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
import { cn } from "@/lib/utils"
import { useSearch } from "@/contexts/search-context"

// Add these interfaces at the top
interface TeamMember {
  name: string;
  role: string;
  email: string;
}

interface DaftarSubscription {
  plan: string;
  status: string;
  nextBilling: string;
  features: string[];
}

// Sample data
const daftars = [
  {
    id: "tech-innovation",
    name: "Tech Innovation Fund",
    team: {
      owner: "John Doe",
      members: [
        { name: "Sarah Smith", role: "Member", email: "sarah@example.com" },
        { name: "Mike Johnson", role: "Member", email: "mike@example.com" }
      ]
    },
    subscription: {
      plan: "Pro",
      status: "Active",
      nextBilling: "2024-04-15",
      features: [
        "Unlimited pitches",
        "Advanced analytics",
        "Priority support",
        "Custom branding"
      ]
    },
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
    team: {
      owner: "Jane Doe",
      members: [
        { name: "Alice Smith", role: "Member", email: "alice@example.com" },
        { name: "Bob Johnson", role: "Member", email: "bob@example.com" }
      ]
    },
    subscription: {
      plan: "Basic",
      status: "Inactive",
      nextBilling: "2024-05-15",
      features: [
        "Limited pitches",
        "Basic analytics",
        "Standard support"
      ]
    },
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

// Add date formatter
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export default function DaftarPage() {
  const { searchQuery, filterValue } = useSearch()
  const [selectedDaftar, setSelectedDaftar] = useState<typeof daftars[0] | null>(null)
  const [createDaftarOpen, setCreateDaftarOpen] = useState(false)

  // Filter daftars based on search query and filter value
  const filteredDaftars = daftars.filter(daftar => {
    const matchesSearch = daftar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      daftar.team.owner.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterValue === 'all' ||
      (filterValue === 'active' && daftar.subscription.status === 'Active') ||
      (filterValue === 'archived' && daftar.subscription.status === 'Inactive')
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6 container mx-auto px-4">

      <div className="flex gap-6">

        {/* Daftars and Pitches Section */}
        <div className="space-y-6 w-[70%]">
          {/* Header with Search and Actions */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">My Daftar</h2>
            <div className="flex items-center gap-2">
              <Button size="sm" className="h-9 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setCreateDaftarOpen(true)}>
                New Daftar
              </Button>
              <Link href="/pitch-board">
                <Button size="sm" variant="outline" className="h-9">
                  Pitch Board
                </Button>
              </Link>
            </div>
          </div>
          {filteredDaftars.map((daftar) => (
            <div
              key={daftar.name}
              className="border rounded-[0.3rem] divide-y cursor-pointer hover:border-blue-600"
              onClick={() => setSelectedDaftar(daftar)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{daftar.name}</h3>
                  <Link href={`/daftar/${daftar.id}`}>
                    <Button variant="secondary" size="sm" className="text-xs">
                      View Details
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
                          Pitched on {formatDate(pitch.date)}
                        </p>
                      </div>
                      <span className={cn(
                        "text-xs",
                        pitch.status === "Accepted" && "text-green-600",
                        pitch.status === "Rejected" && "text-red-600",
                        pitch.status === "Pending" && "text-muted-foreground"
                      )}>
                        {pitch.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Daftar Details Section */}
        <div className="space-y-6 w-[30%]">
          {selectedDaftar ? (
            <>
              {/* Team Section */}
              <div className="border rounded-[0.3rem]">
                <div className="p-4 border-b">
                  <h3 className="font-medium">Team</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Owner</p>
                    <p className="text-sm font-medium">{selectedDaftar.team.owner}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Members</p>
                    <div className="space-y-3">
                      {selectedDaftar.team.members.map((member) => (
                        <div key={member.email} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {member.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscription Section */}
              <div className="border rounded-[0.3rem]">
                <div className="p-4 border-b">
                  <h3 className="font-medium">Subscription</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{selectedDaftar.subscription.plan} Plan</p>
                      <p className="text-xs text-muted-foreground">
                        Next billing: {formatDate(selectedDaftar.subscription.nextBilling)}
                      </p>
                    </div>
                    <span className={cn(
                      "text-xs",
                      selectedDaftar.subscription.status === "Active" && "text-green-600",
                      selectedDaftar.subscription.status === "Inactive" && "text-red-600"
                    )}>
                      {selectedDaftar.subscription.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Features</p>
                    <ul className="space-y-2">
                      {selectedDaftar.subscription.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
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