"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, Search, Filter, Share2, 
  BarChart2, Bell, Pencil, PlayCircle, 
  StopCircle, Building 
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EndScoutingDialog } from "@/components/dialogs/end-scouting-dialog"
import { useState } from "react"
import { UpdatesDialog } from "@/components/dialogs/updates-dialog"
import { LaunchProgramDialog } from "@/components/dialogs/launch-program-dialog"
import Link from "next/link"
import { InsightsDialog } from "@/components/dialogs/insights-dialog"

const columns = {
  iceBox: {
    title: "Ice Box",
    pitches: [
      {
        id: "1",
        pitchName: "AI Chatbot",
        daftarName: "Tech Startup",
        Believer: "3"
      },
      // Add more pitches
    ]
  },
  dealCancelled: {
    title: "Deal Cancelled",
    pitches: [
      {
        id: "2",
        pitchName: "Green Energy",
        daftarName: "HealthTech",
        Believer: "3"
      }
    ]
  },
  invitationSent: {
    title: "Invitation Sent",
    pitches: [
      {
        id: "3",
        pitchName: "Stock Market",
        daftarName: "FinTech Pro",
        Believer: "3"
      }
    ]
  },
  accepted: {
    title: "Accepted",
    pitches: [
      {
        id: "4",
        pitchName: "Learning Platform",
        daftarName: "EduTech",
        Believer: "5"
      }
    ]
  }
}

const programDetails = {
  updates: [
    { id: "1", content: "Update 1", date: "2024-03-15" },
    { id: "2", content: "Update 2", date: "2024-03-14" },
    // Add more updates
  ]
}

export default function ProgramDetailsPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [endScoutingOpen, setEndScoutingOpen] = useState(false)
  const [updatesOpen, setUpdatesOpen] = useState(false)
  const [launchProgramOpen, setLaunchProgramOpen] = useState(false)
  const [insightsOpen, setInsightsOpen] = useState(false)

  const handleEndScouting = () => {
    // Add your end scouting logic here
    console.log("Ending scouting process...")
  }

  const handleAddUpdate = (content: string) => {
    // Add your update logic here
    console.log("Adding update:", content)
  }

  const handleDeleteUpdate = (id: string) => {
    // Add your delete logic here
    console.log("Deleting update:", id)
  }

  const handleFeedbackSubmit = (feedback: string) => {
    // Add your feedback submission logic here
    console.log("Submitting feedback:", feedback)
  }

  const handleSubmitFeedback = (feedback: string) => {
    // Add your feedback submission logic here
    console.log("Submitting feedback:", feedback)
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-[0.3rem]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Tech Startup Fund</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setLaunchProgramOpen(true)}
          >
            <span className="text-xs">Launch Program</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setEndScoutingOpen(true)}
          >
            End Scouting
          </Button>
          <Button variant="outline" size="sm">
            <span className="text-xs">Studio</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUpdatesOpen(true)}
          >
            Updates
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInsightsOpen(true)}
          >
            <BarChart2 className="h-4 w-4" />
          </Button>
          
          <Button variant={"outline"} className=" text-white" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats and Search Section */}
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Pitches:</span>
            <span className="text-xs font-medium">24</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Shared:</span>
            <span className="text-xs font-medium">12</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Last date to pitch:</span>
            <span className="text-xs font-medium">March 30, 2024</span>
          </div>
        </div>

        <div className="flex items-center w-fit gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
          <Select>
            <SelectTrigger className="w-fit">
              <Filter className="h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pitches</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="shared">Shared</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(columns).map(([key, column]) => (
          <div key={key} className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{column.title}</h3>
              <Badge variant="secondary" className="text-xs">
                {column.pitches.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {column.pitches.map((pitch) => (
                <Link
                  key={pitch.id}
                  href={`/home/programs/${params.slug}/details/${pitch.id}`}
                >
                  <div 
                    className="flex flex-col gap-2 p-3 border rounded-[0.3rem] cursor-pointer hover:border-blue-600"
                  >
                    <div>
                      <h4 className="font-medium text-sm">{pitch.pitchName}</h4>
                      <p className="text-xs text-muted-foreground">{pitch.daftarName}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Believer {pitch.Believer} out of 5</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <EndScoutingDialog 
        open={endScoutingOpen}
        onOpenChange={setEndScoutingOpen}
        onConfirm={handleEndScouting}
      />

      <UpdatesDialog 
        open={updatesOpen}
        onOpenChange={setUpdatesOpen}
        updates={programDetails.updates}
        onAddUpdate={handleAddUpdate}
        onDeleteUpdate={handleDeleteUpdate}
      />

      <LaunchProgramDialog 
        open={launchProgramOpen}
        onOpenChange={setLaunchProgramOpen}
        onSubmitFeedback={handleSubmitFeedback}
      />

      <InsightsDialog 
        open={insightsOpen}
        onOpenChange={setInsightsOpen}
      />
    </div>
  )
} 