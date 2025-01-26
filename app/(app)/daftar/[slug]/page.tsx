"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChartBar, Send, Video, ArrowUpRight, Globe2, Search, Filter } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api-client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { TeamDialog } from "@/components/dialogs/team-dialog"

const tabs = [
    { id: 'analysis', icon: ChartBar, label: 'Analysis' },
    { id: 'pitches', icon: Send, label: 'Pitches' },
]
const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};


// Sample data - replace with real data
const pitchDetails = {
    name: "AI Healthcare Solution",
    video: "https://example.com/video.mp4",
    language: "English",
    location: "Dubai, UAE",
    stage: "Seed",
    demoLink: "https://demo.example.com",
    status: "Under Review",
    submittedDate: formatDate("2024-03-15"),
    investorVideo: "https://example.com/investor-video.mp4",
    program: {
        name: "Tech Innovation Fund",
        collaboration: "Daftar OS",
        lastPitchDate: formatDate("2024-04-15"),
        description: "Early stage technology companies investment program focused on innovative solutions..."
    },
    questions: [
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
            question: "What's your aim?"
        },
        {
            no: 4,
            question: "What's your target market?"
        },
        {
            no: 5,
            question: "What's your unique selling point?"
        },
        // ... more questions
    ]
}

export default function DaftarDetailsPage({ params }: { params: { slug: string } }) {
    const [activeTab, setActiveTab] = useState('pitches')
    const [selectedLanguage, setSelectedLanguage] = useState("english")
    const [teamDialogOpen, setTeamDialogOpen] = useState(false)
    const [isWithdrawing, setIsWithdrawing] = useState(false)
    const { deleteOrWithdraw } = api.founderPitch
    const { toast } = useToast()
    const withdrawPitch = async () => {
        setIsWithdrawing(true)
        try {
            const response = await deleteOrWithdraw({ pitch_id: params.slug, action: 'withdraw' })
            console.log(response);
            toast({
                title: "Pitch withdrawn successfully!",
                description: "Your pitch has been withdrawn.",
                variant: "success",
            })
        } catch (error) {
            console.error("Error withdrawing pitch:", error)
            toast({
                title: "Error withdrawing pitch",
                description: (error as Error).message,
                variant: "error"
            })
        } finally {
            setIsWithdrawing(false)
        }
    }
    return (
        <div className="h-[calc(100vh-10rem)] container mx-auto px-4">
            {/* Header with Search and Actions */}
            <div className="flex items-center justify-start">
                <div className="flex items-center gap-2">
                    <Button size="sm" className="h-9 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setTeamDialogOpen(true)}>
                        Team
                    </Button>

                </div>
            </div>
            <div className="flex gap-6 mt-6">
                {/* Left Sidebar - Tabs */}
                <div className="w-[10%] border-r">
                    <div className="p-2">
                        {tabs.map((tab) => (
                            <Button
                                key={tab.id}
                                variant={activeTab === tab.id ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start gap-2",
                                    activeTab === tab.id ? "bg-accent" : ""
                                )}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <tab.icon className="h-4 w-4" />
                                <span className="text-xs">{tab.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <ScrollArea className="w-[65%] pr-6">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold">{pitchDetails.name}</h2>
                        </div>

                        {/* Video Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-evenly">
                                <div>
                                    <div className="aspect-video bg-muted rounded-[0.3rem] relative mb-4">
                                        <video
                                            src={pitchDetails.video}
                                            controls
                                            className="w-full h-full object-cover rounded-[0.3rem]"
                                        />
                                    </div>
                                    <Select
                                        value={selectedLanguage}
                                        onValueChange={setSelectedLanguage}
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
                                {/* Investor Questions */}
                                <div className="space-y-4">
                                    <h3 className="font-medium">Investor Questions</h3>
                                    {pitchDetails.questions.map((q, i) => (
                                        <div
                                            key={i}
                                            className="space-y-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">{q.no}. {q.question}</span>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>

                            {/* Pitch Info */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 rounded-[0.3rem] bg-muted/50">
                                    <p className="text-sm text-muted-foreground">Location</p>
                                    <p className="font-medium">{pitchDetails.location}</p>
                                </div>
                                <div className="p-4 rounded-[0.3rem] bg-muted/50">
                                    <p className="text-sm text-muted-foreground">Stage</p>
                                    <p className="font-medium">{pitchDetails.stage}</p>
                                </div>
                                <div className="p-4 rounded-[0.3rem] bg-muted/50">
                                    <p className="text-sm text-muted-foreground">Demo Link</p>
                                    <a
                                        href={pitchDetails.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                    >
                                        View Demo
                                        <ArrowUpRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>


                        </div>
                    </div>
                </ScrollArea>

                {/* Right Sidebar */}
                <div className="w-[25%] border-l pl-6 space-y-6">
                    <div className="space-y-4">
                        <div className="">
                            <p className="text-sm text-muted-foreground">Status: <span className="font-semibold">{pitchDetails.status}</span></p>
                            <span className="text-xs text-muted-foreground"> {pitchDetails.submittedDate}</span>
                        </div>

                        <Button onClick={withdrawPitch} disabled={isWithdrawing} size="sm" className=" bg-blue-600 hover:bg-blue-700">
                            Withdraw Pitch
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <div className="aspect-video bg-muted rounded-[0.3rem]">
                            <video
                                src={pitchDetails.investorVideo}
                                controls
                                className="w-full h-full object-cover rounded-[0.3rem]"
                            />
                        </div>

                        <div>
                            <h3 className="font-medium">{pitchDetails.program.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                In collaboration with {pitchDetails.program.collaboration}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Last day to pitch: {pitchDetails.program.lastPitchDate}
                            </p>
                            <Button variant="link" className="text-xs p-0 h-auto text-blue-600 hover:text-blue-700 mt-2">
                                <Link href={`/incubation/${pitchDetails.program.name}`}> Read more</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <TeamDialog
                open={teamDialogOpen}
                onOpenChange={setTeamDialogOpen}
            />
        </div>
    )
} 