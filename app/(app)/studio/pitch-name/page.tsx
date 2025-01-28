"use client"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Loading } from "@/components/loading"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const stages = [
  "Idea",
  "Prototyping To MVP",
  "Product-Market Fit",
  "Early Traction",
  "Growth",
]

const sectors = [
  "Accounting Technology",
  "Agriculture Technology",
  "AI (Artificial Intelligence)",
  "Aging and Elderly Care Tech",
  "Amazon Delivery Services",
  "Augmented Reality",
  "Automated Bookkeeping",
  "Automation",
  "Beauty Tech",
  "Biotechnology",
  "Blockchain",
  "B2B Platforms",
  "B2C Platforms", 
  "Catering Technology",
  "Cloud Computing",
  "Cloud Storage",
  "Community Engagement",
  "Community Supported Agriculture (CSA)",
  "Compliance Technology",
  "Content Aggregators",
  "Content Creation",
  "Corporate Training",
  "Crowdsourced Content Platforms",
  "Crowdfunding",
  "Cyber Insurance",
  "Cybersecurity",
  "Cyber-Physical Systems",
  "Data Analytics",
  "Data Visualization",
  "Digital Entertainment",
  "Digital Identity Verification",
  "Digital Libraries",
  "Digital Marketing",
  "Digital Wallets",
  "Disaster Management Technology",
  "E-learning Platforms",
  "Edge Computing",
  "Esports",
  "Event Management Platforms",
  "Fashion Tech",
  "Fitness Apps",
  "Fitness Tech",
  "Food Delivery",
  "Food Waste Solutions",
  "Gaming",
  "Green Building Technology",
  "Health Monitoring",
  "Health Insurance Platforms",
  "Healthtech",
  "Healthcare",
  "Home Automation Systems",
  "Home Decor",
  "Home Improvement",
  "Home Healthcare",
  "HR Tech",
  "Hydroponics",
  "Insurtech",
  "Investment Platforms",
  "LegalTech",
  "Loyalty Programs",
  "Machine Learning (ML)",
  "Marketplace Lending",
  "Meal Kit Services",
  "Mental Health Platforms",
  "Mobile Apps",
  "Mobile Communication",
  "Nutritional Apps",
  "Online Fashion Retail",
  "Online Gaming",
  "Online Learning",
  "Online Market Research",
  "Online Retail Platforms",
  "Online Therapy Services",
  "Podcasting Platforms",
  "Personal Care Products",
  "Personal Finance",
  "Personal Savings Apps",
  "Plant-Based Foods",
  "Predictive Analytics",
  "Proptech",
  "Real Estate",
  "Recycling Technology",
  "Remote Work Solutions",
  "Reputation Management",
  "Robotics",
  "SaaS (Software as a Service)",
  "Silicon Chips",
  "Smart Asset Tracking",
  "Smart Contracts",
  "Smart Fitness Devices",
  "Smart Grids",
  "Smart Home Devices",
  "Social Impact",
  "Social Media",
  "Streaming Services",
  "Sustainability Solutions",
  "Sustainable Food",
  "Sustainable Packaging Solutions",
  "Telecommunications",
  "Telemedicine",
  "Transportation",
  "Transportation Network Companies"
]

function PitchNameContent() {
  const searchParams = useSearchParams()
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])

  return (
    <div className="space-y-6 container mx-auto px-4">
      <div>
        <h1 className="text-2xl font-semibold">Pitch Name</h1>
        <p className="text-sm text-muted-foreground">Name your pitch for the program</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Pitch Name</Label>
            <Input placeholder="Enter pitch name" />
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Input placeholder="Enter startup location" />
          </div>

          <div className="space-y-2">
            <Label>Demo Link</Label>
            <Input placeholder="https://..." />
          </div>

          <div className="space-y-2">
            <Label>Startup Stage</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage} value={stage.toLowerCase()}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Focus Sectors</Label>
            <Select
              value=""
              onValueChange={(value) => {
                if (!selectedSectors.includes(value)) {
                  setSelectedSectors(prev => [...prev, value])
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Add sectors" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector.toLowerCase()}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2 mt-3">
              {selectedSectors.map((sector) => (
                <Badge 
                  key={sector}
                  variant="secondary"
                  className="text-xs cursor-pointer hover:bg-muted"
                  onClick={() => {
                    setSelectedSectors(prev => prev.filter(s => s !== sector))
                  }}
                >
                  {sector}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
        </div>
      </div>
    </div>
  )
}

export default function PitchNamePage() {
  return (
    <Suspense fallback={<Loading />}>
      <PitchNameContent />
    </Suspense>
  )
} 