"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Globe2, Save, Trash2, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface ProgramDetails {
  name: string
  collaboration: string
  lastPitchDate: string
}

interface PitchFormProps {
  programDetails: ProgramDetails
}

export function PitchForm({ programDetails }: PitchFormProps) {
  const [formData, setFormData] = useState({
    pitchName: "",
    location: "",
    stage: "",
    demoLink: "",
    language: "english",
    video: null as File | null,
    description: "",
    investorQuestion: "",
    sectors: [] as string[]
  })

  const handleVideoUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'video/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setFormData(prev => ({ ...prev, video: file }))
      }
    }
    input.click()
  }

  const handleSubmit = () => {
    console.log("Submitting pitch:", formData)
  }

  // Sample questions
  const questions = [
    { no: 1, question: "What's your go-to-market strategy?" },
    { no: 2, question: "How do you plan to scale?" },
    { no: 3, question: "What's your aim?" },
    { no: 4, question: "What's your target market?" },
    { no: 5, question: "What's your unique selling point?" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">New Pitch</h2>
        <p className="text-sm text-muted-foreground">
          Submit your pitch for {programDetails.name}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Pitch Name</Label>
          <Input
            placeholder="Enter pitch name"
            value={formData.pitchName}
            onChange={(e) => setFormData(prev => ({ ...prev, pitchName: e.target.value }))}
          />
        </div>

        {/* Video and Questions Section */}
        <div className="flex items-center justify-evenly">
          <div>
            <div className="aspect-video bg-muted rounded-[0.3rem] relative mb-4 w-[400px]">
              {formData.video ? (
                <video
                  src={URL.createObjectURL(formData.video)}
                  controls
                  className="w-full h-full object-cover rounded-[0.3rem]"
                />
              ) : (
                <div
                  onClick={handleVideoUpload}
                  className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload your pitch video
                  </p>
                </div>
              )}
            </div>
            <Select
              value={formData.language}
              onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
            >
              <SelectTrigger className="w-[200px]">
                <Globe2 className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="arabic">Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Questions Section */}
          <div className="space-y-4">
            <h3 className="font-medium">Questions to Answer</h3>
            {questions.map((q) => (
              <div key={q.no} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{q.no}. {q.question}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pitch Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-[0.3rem] bg-muted/50">
            <p className="text-sm text-muted-foreground">Location</p>
            <Input
              placeholder="Enter location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="mt-2"
            />
          </div>
          <div className="p-4 rounded-[0.3rem] bg-muted/50">
            <p className="text-sm text-muted-foreground">Stage</p>
            <Select
              value={formData.stage}
              onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value }))}
            >
              <SelectTrigger className="mt-2">
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
          <div className="p-4 rounded-[0.3rem] bg-muted/50">
            <p className="text-sm text-muted-foreground">Demo Link</p>
            <Input
              placeholder="Enter demo link"
              value={formData.demoLink}
              onChange={(e) => setFormData(prev => ({ ...prev, demoLink: e.target.value }))}
              className="mt-2"
            />
          </div>
          <div className="p-4 rounded-[0.3rem] bg-muted/50">
            <p className="text-sm text-muted-foreground">Sectors</p>
            <div className="mt-2 space-y-2">
              <Select
                value=""
                onValueChange={(value) => {
                  if (!formData.sectors.includes(value)) {
                    setFormData(prev => ({
                      ...prev,
                      sectors: [...prev.sectors, value]
                    }))
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Add sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fintech">Fintech</SelectItem>
                  <SelectItem value="healthtech">Healthtech</SelectItem>
                  <SelectItem value="edtech">Edtech</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="ai">AI/ML</SelectItem>
                  <SelectItem value="blockchain">Blockchain</SelectItem>
                  <SelectItem value="iot">IoT</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex flex-wrap gap-2">
                {formData.sectors.map((sector) => (
                  <Badge 
                    key={sector}
                    variant="secondary"
                    className="text-xs cursor-pointer hover:bg-muted"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        sectors: prev.sectors.filter(s => s !== sector)
                      }))
                    }}
                  >
                    {sector}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2 px-2">
            <Label>Ask Investor</Label>
            <div className="text-xs text-muted-foreground mb-2">
              What would you like to ask the investor? (e.g., advice, connections, etc.)
            </div>
            <Textarea 
              placeholder="Type your question here..."
              value={formData.investorQuestion}
              onChange={(e) => setFormData(prev => ({ ...prev, investorQuestion: e.target.value }))}
              className="min-h-[100px] rounded-[0.3rem] resize-none"
            />
          </div>

          <div className="flex justify-end gap-2">
          <Button
              variant="outline"
              onClick={() => console.log("Deleting pitch...")}
              size="sm"
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log("Saving draft...")}
              className="text-muted-foreground"
            >
              Save Draft
            </Button>
            
            <Button
              onClick={handleSubmit}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Submit Pitch
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 