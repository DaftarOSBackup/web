"use client"
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

export default function CollaborationPage() {
  return (
    <div className="space-y-6 mr-8">
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

      {/* Search and Filter */}
      <div className="flex items-center justify-end gap-2">
      <div className="relative w-[200px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search collaborators..." className="pl-8" />
        </div>
        <Select>
          <SelectTrigger className="w-fit">
            <Filter className="h-4 w-4" />
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="program-manager">Program Manager</SelectItem>
            <SelectItem value="analyst">Analyst</SelectItem>
          </SelectContent>
        </Select>
        
      </div>

      {/* Collaborators List */}
      <div className="space-y-3">
        {collaborators.map((collaborator) => (
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
                  {new Date(collaborator.addedAt).toLocaleString()}
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
    </div>
  )
} 