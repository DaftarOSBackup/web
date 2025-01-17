"use client"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRole } from "@/contexts/role-context"
import { studioNavItems, founderStudioNavItems } from "@/config/navigation"
import { ChevronDown } from "lucide-react"
import ProgramDetailsPage  from "@/components/studio/pitch-name"
import FounderPitchPage from "../studio/founders-pitch"
import { InvestorQuestionsContent } from "@/components/studio/investor-questions"
import StudioLayout from "@/app/(home)/programs/studio/layout"

interface StudioDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StudioDialog({ open, onOpenChange }: StudioDialogProps) {
  const { role } = useRole()
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null)
  
  const navItems = role === "founder" ? founderStudioNavItems : studioNavItems

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl p-0">
        <div className="flex h-[80vh]">
          <StudioLayout>
            <FounderPitchPage />
          </StudioLayout>
        </div>
      </DialogContent>
    </Dialog>
  )
} 