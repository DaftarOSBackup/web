"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AudienceDetails {
  location: string
  community: string
  gender: string
  ageMin: string
  ageMax: string
  stage: string
  sector: string
}

export default function AudiencePage() {
  const router = useRouter()
  const [audience, setAudience] = useState<AudienceDetails>({
    location: "",
    community: "",
    gender: "",
    ageMin: "",
    ageMax: "",
    stage: "",
    sector: "",
  })

  const handleSave = () => {
    console.log("Saving audience:", audience)
    router.push("/studio/founder-pitch")
  }

  return (
    <div className="space-y-6">
      <div className="pr-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Location</Label>
            <Select
              value={audience.location}
              onValueChange={(value) => setAudience(prev => ({ ...prev, location: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uae">UAE</SelectItem>
                <SelectItem value="ksa">KSA</SelectItem>
                <SelectItem value="qatar">Qatar</SelectItem>
                <SelectItem value="kuwait">Kuwait</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Community</Label>
            <Select
              value={audience.community}
              onValueChange={(value) => setAudience(prev => ({ ...prev, community: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select community" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="social">Social Impact</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <Select
              value={audience.gender}
              onValueChange={(value) => setAudience(prev => ({ ...prev, gender: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Age Range</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={audience.ageMin}
                onChange={(e) => setAudience(prev => ({ ...prev, ageMin: e.target.value }))}
                className="h-9"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={audience.ageMax}
                onChange={(e) => setAudience(prev => ({ ...prev, ageMax: e.target.value }))}
                className="h-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Stage</Label>
            <Select
              value={audience.stage}
              onValueChange={(value) => setAudience(prev => ({ ...prev, stage: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="idea">Idea Stage</SelectItem>
                <SelectItem value="mvp">MVP</SelectItem>
                <SelectItem value="early">Early Traction</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Sector</Label>
            <Select
              value={audience.sector}
              onValueChange={(value) => setAudience(prev => ({ ...prev, sector: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="health">Healthcare</SelectItem>
                <SelectItem value="edu">Education</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <Button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
} 