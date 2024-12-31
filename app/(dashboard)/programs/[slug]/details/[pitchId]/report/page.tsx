"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Phone, Mail, PieChart as PieChartIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { LineChart, Line, Cell, PieChart, Pie, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import Link from "next/link"
// Sample data
const programDetails = {
    collaboration: "Daftar",
    daftarName: "Daftar",
    structure: "Structure",
    team: "Team",
    website: "Website",
    location: "Location",
    memberSince: "2024-01-01",
    vision: "Vision"
}

const collaborationDetails = {
    image: "https://github.com/shadcn.png",
    daftarName: "Daftar",
    structure: "Structure",
    team: "Team",
    website: "Website",
    location: "Location",
    memberSince: "2024-01-01",
    vision: "Vision"
}

const programs = [
    { id: "1", name: "Tech Innovation Fund" },
    { id: "2", name: "Healthcare Ventures" },
    { id: "3", name: "Green Energy Program" },
]

// Add sample data
const pitchDetails = {
    sections: {
        foundersPitch: {
            video: "https://example.com/video",
            demoLink: "https://demo.example.com",
            location: "Dubai, UAE",
            status: "Pitched",
            stage: "Seed",
            sectors: ["AI/ML", "SaaS"],
            questions: [
                { question: "What's your go-to-market strategy?", answer: "..." },
                { question: "How do you plan to scale?", answer: "..." },
            ],
            foundersAsk: [
                { title: "Investment Amount", value: "$500,000" },
                { title: "Equity Offered", value: "10%" },
                { title: "Valuation", value: "$5M" },
                { title: "Min Investment", value: "$50,000" },
                { title: "Use of Funds", value: "Product Development, Marketing" },
            ]
        },
        team: {
            size: 2,
            members: [
                {
                    name: "John Doe",
                    avatar: "https://github.com/shadcn.png",
                    designation: "CEO",
                    age: 35,
                    email: "john@example.com",
                    phone: "+971 50 123 4567",
                    gender: "male",
                    preferredLanguages: ["English", "Arabic"]
                },
                // Add more team members...
            ],
            ageData: [
                { age: "20-25", count: 2 },
                { age: "26-30", count: 4 },
                { age: "31-35", count: 3 },
                { age: "36-40", count: 3 },
            ],
            genderData: [
                { name: "Male", value: 7 },
                { name: "Female", value: 5 },
            ],
            languagePreferences: [
                { language: "English", count: 12 },
                { language: "Arabic", count: 8 },
                { language: "Hindi", count: 5 },
            ]
        },
    }
}

export default function ReportPage({ params }: { params: { slug: string; pitchId: string } }) {
    const router = useRouter()
    const [selectedProgram, setSelectedProgram] = useState<string>("")

    return (
        <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-8 mr-8">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-lg font-semibold">Daftars Report</h1>
                </div>

                {/* Latest Updates Section */}
                <div className="space-y-4">
                    <h2 className="text-sm font-medium">Latest Updates</h2>
                    <div className="h-[200px] w-full bg-muted rounded-[0.3rem]">
                        
                    </div>
                </div>

                {/* Program Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Select Program</label>
                    <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Choose a program" />
                        </SelectTrigger>
                        <SelectContent>
                            {programs.map((program) => (
                                <SelectItem key={program.id} value={program.id}>
                                    {program.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
            <Button variant="link" className="text-sm font-medium p-0 h-auto">
                readmore
              </Button>
                </div>
                

                {/* Founder's Pitch Section */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold">Pitch</h2>
                        <div className="text-sm">
                            <span className="text-muted-foreground">Status:</span>
                            <Badge variant="secondary">{pitchDetails.sections.foundersPitch.status}</Badge>
                        </div>

                    </div>


                    {/* Video and Investor Questions - Two Columns */}
                    <div className="flex gap-6">
                        {/* Video Section */}
                        <div className="flex-1">
                            <div className="aspect-video bg-muted rounded-[0.3rem]">
                                {/* Video player component */}
                            </div>
                        </div>

                        {/* Investor Questions */}
                        <div className="flex-1 space-y-4">
                            <h3 className="font-medium">Investor Questions</h3>
                            <div className="space-y-3">
                                {pitchDetails.sections.foundersPitch.questions.map((item, index) => (
                                    <div key={index}>
                                        <p className="text-sm font-medium">{item.question}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pitch Details - Full Width */}
                    <div className="p-4 border rounded-[0.3rem]">
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">Location: </p>
                            <span className="text-sm font-medium">{pitchDetails.sections.foundersPitch.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">Stage: </p>
                            <span className="text-sm font-medium">{pitchDetails.sections.foundersPitch.stage}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">Demo Link: </p>
                            <a
                                href={pitchDetails.sections.foundersPitch.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                View Demo
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">Sectors: </p>
                            {pitchDetails.sections.foundersPitch.sectors.map((sector) => (
                                <Badge key={sector} variant="secondary" className="text-xs">
                                    {sector}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Founder's Ask - Full Width */}
                    <div className="border rounded-[0.3rem]">
                        <div className="p-3">
                            <h3 className="font-medium">Founder's Ask</h3>
                        </div>
                        <div className="p-4">
                            {pitchDetails.sections.foundersPitch.foundersAsk.map((item) => (
                                <div
                                    key={item.title}
                                >
                                    <p className="text-sm text-muted-foreground">{item.title}: <span className="text-sm font-medium">{item.value}</span></p>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold">Team Size: {pitchDetails.sections.team.size}</h2>


                    <div className="grid grid-cols-3 gap-6">
                        {/* Team Members Column */}
                        <div className="space-y-4">
                            <div className="space-y-3">
                                {pitchDetails.sections.team.members.map((member) => (
                                    <div key={member.name} className="p-4 border rounded-[0.3rem] space-y-4">
                                        <div className="flex items-start gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={member.avatar} />
                                                <AvatarFallback>{member.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{member.name}</p>
                                                <p className="text-sm text-muted-foreground">{member.designation}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-muted-foreground">Age:</span>
                                                <span>{member.age}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                <span>{member.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                <span>{member.phone}</span>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-muted-foreground">Preferred Languages:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {member.preferredLanguages.map((lang) => (
                                                        <Badge key={lang} variant="secondary" className="text-xs">
                                                            {lang}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Charts Column */}
                        <div className="space-y-6">
                            <div className="p-4 border rounded-[0.3rem]">
                                <h3 className="font-medium mb-4">Age Distribution</h3>
                                <LineChart width={300} height={200} data={pitchDetails.sections.team.ageData}>
                                    <Line type="monotone" dataKey="count" stroke="#2563eb" />
                                </LineChart>
                            </div>
                            <div className="p-4 border rounded-[0.3rem]">
                                <h3 className="font-medium mb-4">Gender Distribution</h3>
                                <div className="h-[200px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pitchDetails.sections.team.genderData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {pitchDetails.sections.team.genderData.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={index === 0 ? '#3b82f6' : '#f43f5e'}
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Language Preferences Column */}
                        <div className="space-y-4">
                            <h3 className="font-medium">Language Preferences</h3>
                            <div className="space-y-2">
                                {pitchDetails.sections.team.languagePreferences.map((item) => (
                                    <div
                                        key={item.language}
                                        className="flex items-center justify-between p-3 border rounded-[0.3rem]"
                                    >
                                        <span className="text-sm">{item.language}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollArea>
    )
} 