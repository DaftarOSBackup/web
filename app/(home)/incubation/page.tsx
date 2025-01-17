"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Calendar, Bookmark } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {BookmarkFilled} from "@/components/icons"
import { useRouter } from "next/navigation"
import Image from "next/image"
import torrickeBarton from "@/public/assets/torricke-barton.jpg"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample data
const programs = [
  {
    name: "Tech Startup Fund",
    createdBy: "John Smith",
    lastPitchDate: "2024-04-15T14:30:00",
    isBookmarked: false,
    pitchCount: 15,
  },
  {
    name: "Healthcare Innovation",
    createdBy: "Sarah Johnson",
    lastPitchDate: "2024-05-01T09:45:00",
    isBookmarked: true,
    pitchCount: 23,
  },
]

const founders = [
  {
    name: "Alex Chen",
    company: "AI Solutions",
    industry: "Technology",
    stage: "Seed",
    image: "/avatars/founder-1.png"
  },
  {
    name: "Maria Garcia",
    company: "HealthTech Pro",
    industry: "Healthcare",
    stage: "Pre-seed",
    image: "/avatars/founder-2.png"
  },
]

export default function IncubationPage() {
  const [bookmarkedPrograms, setBookmarkedPrograms] = useState(
    new Set(programs.filter(p => p.isBookmarked).map(p => p.name))
  )
  const [showBookmarked, setShowBookmarked] = useState(false)
  const router = useRouter()

  const toggleBookmark = (name: string) => {
    setBookmarkedPrograms(prev => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }

  const filteredPrograms = showBookmarked
    ? programs.filter(p => bookmarkedPrograms.has(p.name))
    : programs

  return (
      <div className="space-y-4 w-full container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Programs</h2>
            <div className="text-xs text-muted-foreground bg-muted rounded-[0.3rem] px-2 py-1">
              {programs.length}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBookmarked(!showBookmarked)}
              className="h-9"
            >
              {showBookmarked ? (
                <BookmarkFilled className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search programs..." className="pl-8 w-[200px]" />
            </div>
            <Select>
              <SelectTrigger className="">
                <Filter className="h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-6">


          <div className="space-y-4 w-[80%]">
            {filteredPrograms.map((program) => (
              <div key={program.name}>
                <div className="text-xs flex justify-end text-muted-foreground mb-2">
                  {program.pitchCount} pitches submitted
                </div>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(program.name);
                    }}
                    className="absolute -top-3 -left-3 h-8 w-8 bg-background border rounded-[0.3rem] z-10 hover:bg-background"
                  >
                    {bookmarkedPrograms.has(program.name) ? (
                      <BookmarkFilled className="h-4 w-4" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </Button>
                  <div
                    className="flex items-center justify-between p-4 rounded-[0.3rem] bg-card border cursor-pointer hover:border-blue-600"
                    onClick={() => router.push(`/incubation/${program.name.toLowerCase().replace(/ /g, '-')}`)}
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium text-sm">{program.name}</h3>
                      <p className="text-xs text-muted-foreground">collaboration with {program.createdBy}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="flex justify-end">Last date to pitch</span>
                      <p className="text-[10px]">{new Date(program.lastPitchDate).toLocaleString('en-GB', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Founders Section */}
        <div className="w-[20%]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Founders on Daftar</h2>
          </div>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-4 pr-4">
              {/* First Card */}
              <div className="rounded-[0.3rem] bg-card border overflow-hidden flex flex-col items-center">
                <div className="relative h-[10rem] w-2/3 my-4">
                  <Image
                    src={torrickeBarton}
                    alt="Why Daftar OS"
                    fill
                    className="object-cover rounded-[0.3rem]"
                    priority
                  />
                </div>
                <div className="p-4 w-full">
                  <h3 className="font-medium">Why Daftar OS?</h3>
                  <p className="text-sm text-muted-foreground">Speaker</p>
                  <p className="text-xs text-muted-foreground">Language</p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search language..." className="pl-8" />
              </div>

              {/* Second Card */}
              <div className="rounded-[0.3rem] bg-card border overflow-hidden flex flex-col items-center">
                <div className="relative h-[10rem] w-2/3 my-4">
                  <Image
                    src={torrickeBarton}
                    alt="Startup Journey"
                    fill
                    className="object-cover rounded-[0.3rem]"
                    priority
                  />
                </div>
                <div className="p-4 w-full">
                  <h3 className="font-medium">Startup Journey</h3>
                  <p className="text-sm text-muted-foreground">Speaker</p>
                  <p className="text-xs text-muted-foreground">Language</p>
                </div>
              </div>

              {/* Third Card */}
              <div className="rounded-[0.3rem] bg-card border overflow-hidden flex flex-col items-center">
                <div className="relative h-[10rem] w-2/3 my-4">
                  <Image
                    src={torrickeBarton}
                    alt="Tech Innovation"
                    fill
                    className="object-cover rounded-[0.3rem]"
                    priority
                  />
                </div>
                <div className="p-4 w-full">
                  <h3 className="font-medium">Tech Innovation</h3>
                  <p className="text-sm text-muted-foreground">Speaker</p>
                  <p className="text-xs text-muted-foreground">Language</p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
        </div>


      </div>
  )
} 