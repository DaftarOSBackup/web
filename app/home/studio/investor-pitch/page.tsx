"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Play, Upload, Trash2 } from "lucide-react"

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
      <div className="gap-8 pr-8">
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

          {/* Action Buttons */}
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="h-8"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleUpload}
              className="h-8"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>

          <div className="flex justify-center pt-4">
            <Button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
  )
} 