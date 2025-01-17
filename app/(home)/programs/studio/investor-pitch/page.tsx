"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Play, Upload, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function InvestorPitchPage() {
  const router = useRouter()
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  const handleUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'video/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const url = URL.createObjectURL(file)
        setVideoUrl(url)
      }
    }
    input.click()
  }

  const handleDelete = () => {
    setVideoUrl(null)
  }

  const handleSave = () => {
    console.log("Saving video pitch")
    router.push("/studio/faqs")
  }

  return (
    <div className="space-y-6 container mx-auto px-4">
      <ScrollArea className="gap-8 pr-8 h-[calc(100vh-7rem)]">
        <div className="max-w-4xl mx-auto space-y-2">
          {/* Video Preview Section */}
          <div className="aspect-video bg-muted rounded-[0.3rem] relative overflow-hidden">
            {videoUrl ? (
              <video
                src={videoUrl}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <Upload className="h-8 w-8 mb-2" />
                <p className="text-sm">Upload your investor pitch video</p>
              </div>
            )}
          </div>

          <div className="bg-secondary px-2 py-1 text-sm rounded-[0.3rem] mt-2">
          Your investment is more than just money, and your story with the founders is more than a pitch. Daftar Operating System helps you share your vision with founders, so they understand the intent behind your investments. A simple message about your 'why' can help you connect with founders who share your values and are building a similar future
          </div>
          {/* Action Buttons */}

          <div className="flex justify-center gap-2 pt-4">
          <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="h-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-8"
            >
              <Play className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleUpload}
              className="h-8"
            >
              Upload
            </Button>

            <Button 
              onClick={handleSave}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
} 