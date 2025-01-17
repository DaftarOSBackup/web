"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const questions = [
  {
    no: 1,
    question: "What's your go-to-market strategy?"
  },
  {
    no: 2,
    question: "How do you plan to scale?"
  },
  {
    no: 3,
    question: "What's your competitive advantage?"
  }
]

const languages = [
  "English",
  "Arabic",
  "Hindi",
  "French",
  "Spanish",
  "German"
]

export function InvestorQuestionsContent() {
  const [video, setVideo] = useState<File | null>(null)
  const [language, setLanguage] = useState("")

  const handleVideoUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'video/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setVideo(file)
      }
    }
    input.click()
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Investor's Questions</h1>
        <p className="text-sm text-muted-foreground">Upload your pitch video and answer the questions</p>
      </div>

      <div className="space-y-6">
        {/* Video Upload */}
        <div 
          onClick={handleVideoUpload}
          className="relative aspect-video rounded-md border-2 border-dashed cursor-pointer hover:border-blue-600"
        >
          {video ? (
            <video
              src={URL.createObjectURL(video)}
              controls
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Click to upload your pitch video</p>
              <p className="text-xs text-muted-foreground mt-1">MP4, WebM or Ogg (Max. 100MB)</p>
            </div>
          )}
        </div>

        {/* Language Selection */}
        <div className="w-full">
          <Select
            value={language}
            onValueChange={setLanguage}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang.toLowerCase()}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Questions Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Questions from Investor</h2>
          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q.no} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Q{q.no}.</span>
                  <span className="text-sm">{q.question}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          Submit
        </Button>
      </div>
    </div>
  )
} 