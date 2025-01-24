"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Play } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import { QuestionsDialog } from "@/components/dialogs/questions-dialog"

const sampleQuestions = [
  "What problem are you solving?",
  "How big is the market opportunity?",
  "What's your unique solution?",
  "Who is your target customer?",
  "What's your business model?",
  "Who is on your team?",
  "What's your competitive advantage?",
  "What are your key metrics?",
]

export default function FounderPitchPage() {
  const router = useRouter()
  const [questionsOpen, setQuestionsOpen] = useState(false)

  const handleSave = () => {
    console.log("Saving pitch settings")
    router.push("/studio/investor-pitch")
  }

  return (
    <>
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="gap-8 pr-8">
          {/* Video Pitching Section */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="aspect-[9/16] bg-muted rounded-[0.3rem] relative group cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                      <Play className="h-6 w-6 text-white ml-1" />
                    </div>
                  </div>
                  <img 
                    src="/video-pitch.jpg" 
                    alt="Video Pitch"
                    className="w-full h-full object-cover rounded-[0.3rem] opacity-80"
                  />
                </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-medium">Why Video Pitching?</h2>
              <p className="text-sm text-muted-foreground">
              Pitch OS helps founders connect through video pitches in the language they're most comfortable with. By understanding the "why" and "what" of a founder's journey, it becomes easier to decide whether to meet them in person and offer support.
              <br/>
              <br/>
              We've reviewed thousands of startups and investors to create a set of simple questions that help your screening team quickly understand the founder's journey before deciding to meet.
              <br/>
              <br/>
              As a Daftar OS Elite member, you can fully customize these questions to match your investment or startup support program.
              </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end p-4 gap-3">
            <Button variant="default">
              Sample Pitch Board
            </Button>
            <Button
              variant="outline"
              onClick={() => setQuestionsOpen(true)}
            >
              Custom Pitch Questions
            </Button>
          </div>
          {/* Sample Pitch Section */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Sample Founder's Pitch</h3>
              <div className="aspect-video bg-muted rounded-[0.3rem] relative group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                    <Play className="h-6 w-6 text-white ml-1" />
                  </div>
                </div>
                <img 
                  src="/pitch-thumbnail.jpg" 
                  alt="Pitch Thumbnail"
                  className="w-full h-full object-cover rounded-[0.3rem] opacity-80"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                This is a sample pitch video that demonstrates how to effectively
                answer the pitch questions and present your startup.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Questions Covered</h3>
              <div className="space-y-2">
                {sampleQuestions.map((question, index) => (
                  <div 
                    key={index}
                    className="flex gap-3 items-start p-3 rounded-[0.3rem] bg-muted/50"
                  >
                    <span className="text-xs font-medium text-blue-600 mt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm">{question}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save
            </Button>
        </div>
      </ScrollArea>
      <QuestionsDialog 
      open={questionsOpen}
      onOpenChange={setQuestionsOpen}
    />
    </>
  )
} 