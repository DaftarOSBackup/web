"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { PitchForm } from "@/components/forms/pitch-form"
import Link from "next/link"

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const tabs = [
  { id: 'new-pitch', icon: Send, label: 'New Pitch' }
]

// Sample data - replace with real data
const daftarDetails = {
  program: {
    name: "tech-startup-fund",
    collaboration: "Daftar OS",
    lastPitchDate: formatDate("2024-04-15"),
    description: "Early stage technology companies investment program focused on innovative solutions..."
  }
}

const pitchDetails = {
  status: "In Progress",
  submittedDate: formatDate("2024-04-15"),
  investorVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  program: daftarDetails.program
}

export default function NewPitchPage({ params }: { params: { daftarId: string } }) {
  const [activeTab] = useState('new-pitch')
  return (
    <div className="flex gap-6 h-[calc(100vh-10rem)] container mx-auto px-4">
      {/* Left Sidebar - Tabs */}
      <div className="w-[10%] border-r">
        <div className="p-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                activeTab === tab.id ? "bg-accent" : ""
              )}
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-xs">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <ScrollArea className="w-[65%] pr-6">
        <PitchForm programDetails={daftarDetails.program} />
      </ScrollArea>

      {/* Right Sidebar */}
      <div className="w-[25%] border-l pl-6 space-y-6">
        <div className="space-y-4">
          <div className="">
            <p className="text-sm text-muted-foreground">Status: <span className="font-semibold">{pitchDetails.status}</span></p>
            <span className="text-xs text-muted-foreground">
              {pitchDetails.submittedDate}
            </span>
          </div>

          <Button size="sm" className=" bg-blue-600 hover:bg-blue-700 text-white">
            Withdraw Pitch
          </Button>
        </div>

        <div className="space-y-4">
          <div className="aspect-video bg-muted rounded-[0.3rem]">
            <video
              src={pitchDetails.investorVideo}
              controls
              className="w-full h-full object-cover rounded-[0.3rem]"
            />
          </div>

          <div>
            <h3 className="font-medium">{pitchDetails.program.name}</h3>
            <p className="text-sm text-muted-foreground">
              In collaboration with {pitchDetails.program.collaboration}
            </p>
            <p className="text-sm text-muted-foreground">
              Last day to pitch: {pitchDetails.program.lastPitchDate}
            </p>
            <Link href={`/incubation/${pitchDetails.program.name}`}>
              <Button variant="link" className="text-xs p-0 h-auto text-blue-600 hover:text-blue-700 mt-2"
              >
                Read more
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 