"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { Plus, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FAQ {
  id: string
  question: string
  answer: string
}

export default function FAQsPage() {
  const router = useRouter()
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")

  const handleAddFAQ = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const newFAQ: FAQ = {
        id: Date.now().toString(),
        question: newQuestion,
        answer: newAnswer
      }
      setFaqs([...faqs, newFAQ])
      setNewQuestion("")
      setNewAnswer("")
    }
  }

  const handleDeleteFAQ = (id: string) => {
    setFaqs(faqs.filter(faq => faq.id !== id))
  }

  const handleSave = () => {
    console.log("Saving FAQs:", faqs)
    router.push("/studio/invite")
  }

  return (
    <div className="gap-8">
      <div className="max-w-6xl space-y-6">
        {/* Add FAQ Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Question</Label>
            <Input
              placeholder="Enter FAQ question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="space-y-2">
            <Label>Answer</Label>
            <Textarea
              placeholder="Enter FAQ answer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleAddFAQ}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add FAQ
            </Button>
          </div>
        </div>

        {/* FAQs List */}
          <div className="space-y-4">
            {faqs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-sm text-muted-foreground bg-muted/50 rounded-[0.3rem]">
                <p>No FAQs added yet</p>
              <p>Add questions and answers above</p>
            </div>
          ) : (
            faqs.map((faq, index) => (
              <div 
                key={faq.id}
                className="space-y-2 p-4 rounded-[0.3rem] bg-muted/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-blue-600">
                        Q{String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="font-medium">{faq.question}</p>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      {faq.answer}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteFAQ(faq.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
          </div>

        <div className="flex justify-center pt-4">
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