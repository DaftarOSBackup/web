"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bookmark } from "lucide-react"
import { BookmarkFilled } from "@/components/icons"
import { SelectDaftarDialog } from "@/components/dialogs/select-daftar-dialog"
import Link from "next/link"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"


const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// This would come from your API
const programDetails = {
  title: "Tech Startup Fund",
  collaboration: "Daftar OS",
  description: "Early stage technology companies investment program focused on innovative solutions",
  videoUrl: "https://example.com/video.mp4",
  about: `Our program focuses on early-stage technology startups with innovative solutions. 
         We provide not just funding, but also mentorship and networking opportunities.`,
  details: {
    Community: "Christian",
    Location: "UAE",
    Gender: "All",
    Age: "18-35",
    Stage: "Seed to Series A",
    Sector: "Big Data",
  },
  faqs: [
    {
      question: "What stage companies do you invest in?",
      answer: "We typically invest in seed to series A stage companies."
    },
    // ... more FAQs
  ],
  updates: [
    {
      date: formatDate("2024-03-15"),
      content: "Successfully launched the program with 10 startups"
    },
    {
      date: formatDate("2024-03-15"),
      content: "Successfully launched the program with 10 startups"
    },

  ],
  lastPitchDate: formatDate("2024-04-15"),
  isBookmarked: false
}

// Add collaboration details to your data
const collaborationDetails = {
  image: "https://github.com/shadcn.png",
  daftarName: "Daftar OS",
  structure: "Technology Platform",
  team: "25+ members",
  website: "https://daftar.com",
  location: "Dubai, UAE",
  vision: "Building the future of investment and startup collaboration in MENA region",
  memberSince: "2022-01-15"
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  // const [activeTab, setActiveTab] = useState("about")
  // const router = useRouter()
  const [selectDaftarOpen, setSelectDaftarOpen] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(programDetails.isBookmarked)

  return (
    <div className="space-y-6 container mx-auto px-4">
      <ScrollArea className="h-[calc(100vh-8rem)] ">
        <div className="space-y-6 flex pr-8">
          {/* Video Section */}
          <div className="">
            <div className="flex justify-center">
              <div className="relative aspect-video h-[30rem]">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="absolute top-4 left-4 h-8 w-8 bg-background/80 backdrop-blur-sm border rounded-[0.3rem] z-10 hover:bg-background"
                >
                  {isBookmarked ? (
                    <BookmarkFilled className="h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
                <video
                  src={programDetails.videoUrl}
                  controls
                  className="w-full h-full object-cover rounded-[0.3rem]"
                />
              </div>
            </div>

            {/* Title and Actions Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{programDetails.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="text-sm text-muted-foreground">
                    In collaboration with{" "}
                    <HoverCard>
                      <HoverCardTrigger className="inline-flex items-center gap-1 text-blue-600 hover:underline cursor-pointer">
                        {programDetails.collaboration}
                      </HoverCardTrigger>
                      <HoverCardContent className="w-72">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={collaborationDetails.image} />
                            <AvatarFallback>DO</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-sm font-medium">{collaborationDetails.daftarName}</h4>
                            <p className="text-xs text-muted-foreground">{collaborationDetails.structure}</p>
                          </div>
                        </div>

                        <div className="mt-3 space-y-2 text-xs">
                          <div className="flex items-center gap-2">
                            <p className="text-muted-foreground">Team:</p>
                            <p>{collaborationDetails.team}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-muted-foreground">Website:</p>
                            <Link href={collaborationDetails.website} target="_blank" className="text-blue-600 hover:underline">{collaborationDetails.website}</Link>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-muted-foreground">Location:</p>
                            <p>{collaborationDetails.location}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-muted-foreground">Member since:</p>
                            <p>{new Date(collaborationDetails.memberSince).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="mt-3 pt-3">
                          <p className="text-xs text-muted-foreground">The Big Picture</p>
                          <p className="text-xs mt-1">{collaborationDetails.vision}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-bold mt-2">
                  Last date for pitch: {new Date(programDetails.lastPitchDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline">
                  Share
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setSelectDaftarOpen(true)}
                >
                  Pitch Now
                </Button>
              </div>
            </div>
          </div>
          <div className=" ml-6 pl-3 h-full">
            {/* Tabs Section */}
            <Tabs defaultValue="about" className="space-y-4">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="faqs" className="flex items-center gap-1">
                  FAQs
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-[0.3rem]">
                    {programDetails.faqs.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="updates" className="flex items-center gap-1">
                  Updates
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-[0.3rem]">
                    {programDetails.updates.length}
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4 ">
                <div className="prose max-w-none border-l-4  px-5 py-5">
                  <p className="text-sm text-muted-foreground">{programDetails.about}</p>
                </div>
              </TabsContent>

              <TabsContent value="details" className="border-l-4 px-5 py-5">
                <div className="p-2 bg-muted/50 space-y-2">
                  {Object.entries(programDetails.details).map(([key, value]) => (
                    <div key={key} className="rounded-[0.3rem] ">
                      <p className="text-sm text-muted-foreground capitalize">{key}: <span className="font-medium">{value}</span></p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="faqs" className="border-l-4 px-5 py-5">
                <div className="space-y-4">
                  {programDetails.faqs.map((faq, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="updates" className="border-l-4 px-5 py-5">
                <div className="space-y-4">
                  {programDetails.updates.map((update, index) => (
                    <div key={index} className="p-4 rounded-[0.3rem] bg-muted/50">
                      <p className="text-sm text-muted-foreground">{new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      <p className="text-sm text-muted-foreground">{update.content}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <SelectDaftarDialog
          open={selectDaftarOpen}
          onOpenChange={setSelectDaftarOpen}
        />
      </ScrollArea>
    </div>
  )
} 