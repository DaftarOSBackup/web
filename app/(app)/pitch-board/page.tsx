"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearch } from "@/contexts/search-context"
import { CreateDaftarDialog } from "@/components/dialogs/create-daftar-dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

// Sample data
const pitches = {
    planning: [
        {
            id: "1",
            programName: "Tech Startup Fund",
            postedBy: "John Doe",
            daftar: "AI Innovation",
            pitchName: "AI Healthcare Assistant",
            date: "2024-03-20",
            status: "Planning"
        },
    ],
    pitched: [
        {
            id: "2",
            programName: "Green Energy Initiative",
            postedBy: "Sarah Smith",
            daftar: "Sustainable Tech",
            pitchName: "Solar Power Solution",
            date: "2024-03-19",
            status: "Pitched"
        },
    ],
    offerReceived: [
        {
            id: "3",
            programName: "FinTech Innovation",
            postedBy: "Mike Johnson",
            daftar: "Financial Solutions",
            pitchName: "Digital Payment Platform",
            date: "2024-03-18",
            status: "Offer Received"
        },
    ],
    accepted: [
        {
            id: "4",
            programName: "E-commerce Program",
            postedBy: "Alice Brown",
            daftar: "Digital Commerce",
            pitchName: "Online Marketplace Platform",
            date: "2024-03-17",
            status: "Accepted"
        },
    ],
    dealCancelled: [
        {
            id: "5",
            programName: "Education Initiative",
            postedBy: "Tom Wilson",
            daftar: "EdTech",
            pitchName: "Learning Management System",
            date: "2024-03-16",
            status: "Deal Cancelled"
        },
    ]
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

export default function PitchBoardPage() {
    const { searchQuery, filterValue } = useSearch()
    const [createDaftarOpen, setCreateDaftarOpen] = useState(false)

    // Filter pitches based on search query and filter value
    const filteredPitches = Object.entries(pitches).reduce((acc, [status, statusPitches]) => {
        const filtered = statusPitches.filter(pitch => {
            const matchesSearch = 
                pitch.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pitch.postedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pitch.pitchName.toLowerCase().includes(searchQuery.toLowerCase())
            
            const matchesFilter = filterValue === 'all' || 
                (filterValue === 'planning' && status === 'planning') ||
                (filterValue === 'pitched' && status === 'pitched') ||
                (filterValue === 'offer' && status === 'offerReceived') ||
                (filterValue === 'accepted' && status === 'accepted') ||
                (filterValue === 'cancelled' && status === 'dealCancelled')

            return matchesSearch && matchesFilter
        })
        return { ...acc, [status]: filtered }
    }, {} as typeof pitches)

    return (
        <div className="space-y-6 container mx-auto px-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Pitch Board</h2>
                <div className="flex items-center gap-2">
                    <Button 
                        size="sm" 
                        className="h-9 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setCreateDaftarOpen(true)}
                    >
                        New Daftar
                    </Button>
                    <Link href="/daftar">
                        <Button size="sm" variant="outline" className="h-9">
                            My Daftar
                        </Button>
                    </Link>
                </div>
            </div>

            <ScrollArea className="w-[calc(100vw-14rem)] whitespace-nowrap rounded-lg">
                <div className="flex gap-6 p-1">
                    {Object.entries(filteredPitches).map(([status, pitches]) => (
                        <div 
                            key={status} 
                            className="flex-none w-[300px] bg-muted/30 rounded-lg p-4 min-h-[calc(100vh-12rem)]"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-medium capitalize">
                                        {status.replace(/([A-Z])/g, ' $1').trim()}
                                    </h3>
                                    <div className="text-xs text-muted-foreground bg-muted rounded-[0.3rem] px-2 py-1">
                                        {pitches.length}
                                    </div>
                                </div>
                            </div>

                            <ScrollArea className="h-[calc(100vh-16rem)]">
                                <div className="space-y-3 pr-4">
                                    {pitches.map((pitch) => (
                                        <Link
                                            key={pitch.id}
                                            href={`/pitch-board/${pitch.id}`}
                                        >
                                            <div className="p-4 rounded-[0.3rem] mb-2 bg-background border shadow-sm hover:border-blue-600 transition-colors">
                                                <div className="space-y-3">
                                                    <div>
                                                        <h4 className="font-medium text-sm">{pitch.programName}</h4>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            Posted by {pitch.postedBy}
                                                        </p>
                                                    </div>
                                                    <div className="pt-2">
                                                        <p className="text-xs mt-1">
                                                            Pitched by {pitch.daftar}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground font-medium">{pitch.pitchName}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}

                                    {pitches.length === 0 && (
                                        <div className="text-center py-8 text-sm text-muted-foreground">
                                            No pitches in {status.replace(/([A-Z])/g, ' $1').trim()}
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <CreateDaftarDialog 
                open={createDaftarOpen} 
                onOpenChange={setCreateDaftarOpen} 
            />
        </div>
    )
} 