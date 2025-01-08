"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreateDaftarDialog } from "@/components/dialogs/create-daftar-dialog"
import { Search, Filter } from "lucide-react"
import Link from "next/link"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Sample data
const pitches = [
    {
        id: "1",
        name: "AI Healthcare Solution",
        program: "Tech Innovation Fund",
        postedby: "John Doe",
        daftar: "Daftar 1",
        status: "planning"
    },
    {
        id: "2",
        name: "Sustainable Energy Platform",
        program: "Green Tech Fund",
        postedby: "John Doe",
        daftar: "Daftar 1",
        status: "pitched"
    },
    {
        id: "3",
        name: "EdTech Platform",
        program: "Education Fund",
        postedby: "John Doe",
        daftar: "Daftar 1",
        status: "offer-received"
    },
    {
        id: "4",
        name: "FinTech Solution",
        program: "Finance Innovation",
        postedby: "John Doe",
        daftar: "Daftar 2",
        status: "accepted"
    },
    {
        id: "5",
        name: "E-commerce Platform",
        program: "Retail Tech Fund",
        postedby: "John Doe",
        daftar: "Daftar 2",
        status: "deal-cancelled"
    },
]

const columns = [
    { id: "planning", label: "Planning" },
    { id: "pitched", label: "Pitched" },
    { id: "offer-received", label: "Offer Received" },
    { id: "accepted", label: "Accepted" },
    { id: "deal-cancelled", label: "Deal Cancelled" }
]

export default function PitchBoardPage() {
    const [createDaftarOpen, setCreateDaftarOpen] = useState(false)
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">Pitch Board</h2>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search pitches..." className="pl-8 w-[200px]" />
                    </div>
                    <Button size="sm" className="h-9 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setCreateDaftarOpen(true)}>
                        New Daftar
                    </Button>
                    <Link href="/home/daftar">
                        <Button size="sm" variant="outline" className="h-9">
                            My Daftar
                        </Button>
                    </Link>
                    <Select>
                        <SelectTrigger className="">
                            <Filter className="h-4 w-4" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Pitches</SelectItem>
                            <SelectItem value="recent">Recent</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Board */}
            <div className="grid grid-cols-5 gap-4">
                {columns.map((column) => (
                    <div key={column.id} className="space-y-4">
                        {/* Column Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-medium">{column.label}</h3>
                                <span className="text-xs text-muted-foreground bg-muted rounded-[0.3rem] px-2 py-0.5">
                                    {pitches.filter(p => p.status === column.id).length}
                                </span>
                            </div>
                        </div>

                        {/* Column Content */}
                        <div className="space-y-3">
                            {pitches
                                .filter(pitch => pitch.status === column.id)
                                .map((pitch) => (
                                    <div
                                        key={pitch.id}
                                        className="p-3 rounded-[0.3rem] bg-card border hover:border-blue-600 cursor-pointer"
                                    >
                                        <div className="space-y-4">
                                            <div>

                                                <h4 className="text-sm font-medium">{pitch.program}</h4>
                                                <p className="text-xs text-muted-foreground">{pitch.postedby}</p>
                                            </div>
                                            <div className="text-xs">
                                                <p className="text-muted-foreground">{pitch.name}</p>
                                                <p className="text-muted-foreground">
                                                    {pitch.daftar}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <CreateDaftarDialog 
        open={createDaftarOpen}
        onOpenChange={setCreateDaftarOpen}
      />
        </div>
    )
} 