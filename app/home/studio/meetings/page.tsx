"use client"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, Users, FileText, Filter, Search, MapPin, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScheduleMeetingDialog } from "@/components/dialogs/schedule-meeting-dialog"

interface MeetingDetails {
    agenda: string;
    date: string;
    time: string;
    location: string;
    program: string;
    collaboration: string;
    pitchName: string;
    daftarName: string;
    attendees: string[];
    status: string;
    name: string;
    // Add other meeting properties as needed
}

const pitchDetails = {
    meetings: [
        {
            id: "1",
            name: "Initial Discussion",
            status: "Scheduled",
            date: "2024-03-20",
            time: "14:30",
            location: "Virtual Meeting",
            program: "Tech Innovation Fund",
            collaboration: "Daftar OS",
            pitchName: "AI Chatbot",
            daftarName: "Tech Startup",
            attendees: ["John Doe", "Sarah Smith", "Mike Johnson"],
            agenda: "Discuss project scope, timeline, and initial requirements"
        },
        // Add more meetings...
    ],
}

export default function MeetingsPage() {

    const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null)
    const [selectedMeetingDetails, setSelectedMeetingDetails] = useState<MeetingDetails | null>(null)
    const [scheduleMeetingOpen, setScheduleMeetingOpen] = useState(false)

    useEffect(() => {
        if (selectedMeeting) {
            const meetingDetails = pitchDetails.meetings.find(
                meeting => meeting.id === selectedMeeting
            )
            setSelectedMeetingDetails(meetingDetails || null)
        }
    }, [selectedMeeting])

    return (
        <ScrollArea className="h-[calc(100vh-7rem)]">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Meetings</h2>
                    <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setScheduleMeetingOpen(true)}
                    >
                        Schedule Meeting
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Meeting History */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium">History</h3>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search meetings..." className="pl-8 w-[200px]" />
                                </div>
                                <Select>
                                    <SelectTrigger>
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2024">2024</SelectItem>
                                        <SelectItem value="2023">2023</SelectItem>
                                        <SelectItem value="2022">2022</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {pitchDetails.meetings.map((meeting) => (
                                <div
                                    key={meeting.id}
                                    className="p-4 border rounded-[0.3rem] space-y-2 cursor-pointer hover:border-blue-600"
                                    onClick={() => setSelectedMeeting(meeting.id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-medium text-sm">{meeting.name}</h4>
                                        <Badge variant="secondary">{meeting.status}</Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(`${meeting.date}T${meeting.time}`).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Meeting Details */}
                    {selectedMeetingDetails && (
                        <div className="border rounded-[0.3rem] p-4 space-y-4">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium">{selectedMeetingDetails.name}</h3>
                                    <p className="text-sm text-muted-foreground">{selectedMeetingDetails.program}</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>{selectedMeetingDetails.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>
                                            {new Date(`${selectedMeetingDetails.date}T${selectedMeetingDetails.time}`).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Collaboration</p>
                                    <p className="text-sm">{selectedMeetingDetails.collaboration}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Pitch</p>
                                    <p className="text-sm">{selectedMeetingDetails.pitchName}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Daftar</p>
                                    <p className="text-sm">{selectedMeetingDetails.daftarName}</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Attendees</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {selectedMeetingDetails.attendees.map((attendee) => (
                                            <Badge key={attendee} variant="secondary" className="text-xs">
                                                {attendee}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">Agenda</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {selectedMeetingDetails.agenda}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 hover:text-red-600"
                                >
                                    Reject
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Accept
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                <ScheduleMeetingDialog
                    open={scheduleMeetingOpen}
                    onOpenChange={setScheduleMeetingOpen}
                />
            </div>
        </ScrollArea>
    )
} 