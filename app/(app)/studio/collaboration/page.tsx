"use client"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Loading } from "@/components/loading"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Trash2, Building2, Users, Calendar } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { SearchAndFilter } from "@/components/navbar/search-and-filter"
import { useSearch } from "@/contexts/search-context"

// Format date helper
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Sample data
const collaborators = [
  {
    id: "1",
    daftarId: "DAF001",
    daftarName: "Tech Innovation Fund",
    type: "Program Manager",
    status: "Accepted",
    addedAt: "2024-03-20T14:30:00",
    daftarDetails: {
      owner: "John Doe",
      ownerAvatar: "https://github.com/shadcn.png",
      industry: "Technology",
      stage: "Seed",
      teamSize: "10-50",
      location: "Dubai, UAE",
      founded: "2023",
      vision: "To be the best in the world",
      website: "https://www.google.com"
    }
  },
  {
    id: "2",
    daftarId: "DAF002",
    daftarName: "Healthcare Program",
    type: "Analyst",
    status: "Pending",
    addedAt: "2024-03-19T10:15:00",
    daftarDetails: {
      owner: "John Doe",
      ownerAvatar: "https://github.com/shadcn.png",
      industry: "Healthcare",
      stage: "Seed",
      teamSize: "10-50",
      location: "Dubai, UAE",
      founded: "2023",
      vision: "To be the best in the world",
      website: "https://www.google.com"
    }
  },
]

interface CollaborationDetails {
  partner: string;
  // Add other fields
}

function CollaborationContent() {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const programId = searchParams.get('programId')
  const { searchQuery, filterValue } = useSearch()
  const [details, setDetails] = useState<CollaborationDetails>({
    partner: "",
  })

  // Filter collaborators based on search and filter
  const filteredCollaborators = collaborators.filter(collaborator => {
    const matchesSearch = collaborator.daftarName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collaborator.daftarId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterValue === 'all' || collaborator.type.toLowerCase() === filterValue.toLowerCase()
    return matchesSearch && matchesFilter
  })

  useEffect(() => {
    if (mode === 'edit' && programId) {
      fetchCollaborationDetails(programId)
    }
  }, [mode, programId])

  const fetchCollaborationDetails = async (id: string) => {
    // Simulate API call
    const data = {
      partner: "Example Partner"
    }
    setDetails(data)
  }

  const handleSave = async () => {
    if (mode === 'edit') {
      console.log("Updating collaboration:", programId, details)
    } else {
      console.log("Creating collaboration:", details)
    }
  }

  return (
    <div className="space-y-6 container mx-auto px-4">
      <div>
        <h1 className="text-2xl font-semibold">
          {mode === 'edit' ? 'Edit Collaboration' : 'Add Collaboration'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {mode === 'edit' ? 'Update collaboration details' : 'Add collaboration details'}
        </p>
      </div>

      

      {/* Daftar ID Input */}
      <div className="max-w-md">
        <label className="text-sm font-medium">
          Daftar ID
        </label>
        <div className="flex items-center gap-2">
          <Input placeholder="Enter Daftar ID" className="" />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Add Collaborator
          </Button>
        </div>
      </div>

      {/* Collaborators List */}
      <div className="space-y-3">
        {filteredCollaborators.map((collaborator) => (
          <div 
            key={collaborator.id}
            className="flex items-center justify-between p-4 border rounded-[0.3rem]"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
              <HoverCard>
                <HoverCardTrigger className="inline-flex items-center gap-1 text-blue-600 hover:underline cursor-pointer">
                  {collaborator.daftarName}
                </HoverCardTrigger>
                <HoverCardContent className="w-72">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={collaborator.daftarDetails?.ownerAvatar} />
                      <AvatarFallback>DO</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-medium">{collaborator.daftarName}</h4>
                      <p className="text-xs text-muted-foreground">{collaborator.daftarDetails?.industry}</p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground">Team:</p>
                      <p>{collaborator.daftarDetails?.teamSize}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground">Website:</p>
                        <Link href={collaborator.daftarDetails?.website} target="_blank" className="text-blue-600 hover:underline">{collaborator.daftarDetails?.website}</Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground">Location:</p>
                      <p>{collaborator.daftarDetails?.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground">Member since:</p>
                      <p>{new Date(collaborator.daftarDetails?.founded).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3">
                    <p className="text-xs text-muted-foreground">The Big Picture</p>
                    <p className="text-xs mt-1">{collaborator.daftarDetails?.vision}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              </div>
              <p className="text-sm text-muted-foreground">{collaborator.type}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <Badge 
                  variant={collaborator.status === "Accepted" ? "default" : "secondary"}
                  className="mb-1"
                >
                  {collaborator.status}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {formatDate(collaborator.addedAt)}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
          {mode === 'edit' ? 'Update' : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default function CollaborationPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CollaborationContent />
    </Suspense>
  )
} 