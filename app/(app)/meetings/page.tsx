"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Check, X, Trash2, Video, MapPin, Folder, Presentation } from "lucide-react"
import { format } from "date-fns"
import { ScheduleMeetingDialog } from "@/components/dialogs/schedule-meeting-dialog"
import { useToast } from "@/hooks/use-toast"


interface Meeting {
  id: string
  title: string
  date: string
  time: string
  status: "Pending" | "Confirmed"
  attendees: string[]
  description: string
  createdBy: string
  daftar?: string
  pitch?: string
  location: "virtual" | "in-person"
  agenda: string
}

const meetings: Meeting[] = [
  {
    id: "1",
    title: "Q1 Investment Review",
    date: format(new Date(), "yyyy-MM-dd"), // Today's date
    time: "10:00 AM",
    status: "Confirmed",
    attendees: ["John Doe", "Sarah Smith"],
    description: "Quarterly review of investment portfolio and strategy discussion",
    createdBy: "John Doe",
    daftar: "Q1 Investment Review",
    pitch: "Q1 Investment Review",
    location: "virtual",
    agenda: "Quarterly review of investment portfolio and strategy discussion"
  },
  {
    id: "2",
    title: "Program Strategy Discussion",
    date: format((new Date(Date.now() + 86400000).toISOString()), "yyyy-MM-dd"),
    time: "2:00 PM",
    status: "Pending",
    attendees: ["Mike Johnson", "Emily Brown"],
    description: "Strategic planning for upcoming investment programs",
    createdBy: "Mike Johnson",
    daftar: "Program Strategy Discussion",
    pitch: "Program Strategy Discussion",
    location: "in-person",
    agenda: "Strategic planning for upcoming investment programs"
  },
]

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const isToday = (dateString: string) => {
  const today = new Date()
  const date = new Date(dateString)
  return date.toDateString() === today.toDateString()
}

export default function MeetingsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const { toast } = useToast()

  const pendingMeetings = meetings.filter(m => m.status === "Pending")
  const todayMeetings = meetings.filter(m => m.date === format(new Date(), "yyyy-MM-dd"))

  const currentUser = "John Doe"

  const handleAccept = async (meetingId: string) => {
    try {
      // Simulating API call - replace with actual API call
      // await api.meetings.accept(meetingId)

      // Update local state
      const updatedMeeting = meetings.find(m => m.id === meetingId)
      if (updatedMeeting) {
        updatedMeeting.status = "Confirmed"
        // Add to today's meetings if it's today
        if (isToday(updatedMeeting.date)) {
          todayMeetings.push(updatedMeeting)
        }
      }

      toast({
        title: "Meeting Accepted",
        description: "The meeting has been added to your schedule",
        variant: "success",
      })

      // Optionally close or update UI
      setSelectedMeeting(null)
    } catch (error) {
      toast({
        title: "Error accepting meeting",
        description: (error as Error).message,
        variant: "error",
      })
    }
  }

  const handleReject = (meetingId: string) => {
    console.log("Rejecting meeting:", meetingId)
  }

  const handleDelete = (meetingId: string) => {
    console.log("Deleting meeting:", meetingId)
  }

  return (
    <div className="space-y-6 container mx-auto px-4">
      {/* Header - Removed local search, kept only Schedule button */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Meetings</h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setScheduleOpen(true)}
        >
          <span className="text-xs">Schedule Meeting</span>
        </Button>
      </div>

      {/* Three Column Layout */}
      <div className="flex gap-6">
        {/* Calendar and Pending Column */}
        <div className="space-y-6">
          <div className="border rounded-[0.3rem] p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Waiting Confirmation</h3>
            {pendingMeetings.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No pending meetings
              </div>
            ) : (
              pendingMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="p-3 border rounded-[0.3rem] space-y-2 cursor-pointer hover:border-blue-600"
                  onClick={() => setSelectedMeeting(meeting)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{meeting.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(meeting.date)} at {meeting.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Today's Schedule Column */}
        <div className="w-1/3 border-l px-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Today's Schedule</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(), "MMM d, yyyy")}
              </p>
            </div>
            <div className="text-xl font-medium">
              {format(new Date(), "h:mm a")}
            </div>
          </div>

          <div className="space-y-2">
            {todayMeetings.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No meetings scheduled for today
              </div>
            ) : (
              todayMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center gap-4 p-3 border rounded-[0.3rem] cursor-pointer hover:border-blue-600"
                  onClick={() => setSelectedMeeting(meeting)}
                >
                  <div className="w-20 text-sm font-medium">
                    {meeting.time}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{meeting.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {meeting.attendees.join(", ")}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Meeting Details Column */}
        <div className="border-l px-6">
          {selectedMeeting ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold">{selectedMeeting.title}</h2>
                    <div className="flex gap-2">
                      <Badge variant="secondary">
                        {selectedMeeting.status}
                      </Badge>
                      {isToday(selectedMeeting.date) && (
                        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                          Today
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(selectedMeeting.date)} at {selectedMeeting.time}</span>
                </div>

                {selectedMeeting.location === "virtual" ? (
                  <div className="flex items-center gap-2 text-sm">
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <span>Virtual Meeting</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>In-Person Meeting</span>
                  </div>
                )}

                {selectedMeeting.daftar && (
                  <div className="flex items-center gap-2 text-sm">
                    <Folder className="h-4 w-4 text-muted-foreground" />
                    <span>Daftar: {selectedMeeting.daftar}</span>
                  </div>
                )}

                {selectedMeeting.pitch && (
                  <div className="flex items-center gap-2 text-sm">
                    <Presentation className="h-4 w-4 text-muted-foreground" />
                    <span>Pitch: {selectedMeeting.pitch}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Attendees</span>
                  </div>
                  <div className="pl-6">
                    {selectedMeeting.attendees.map((attendee) => (
                      <div key={attendee} className="text-sm">
                        {attendee}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Agenda</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedMeeting.agenda}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-[0.3rem]"
                    onClick={() => handleAccept(selectedMeeting.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 rounded-[0.3rem] text-white"
                    onClick={() => handleReject(selectedMeeting.id)}
                  >
                    Reject
                  </Button>
                  {selectedMeeting.createdBy === currentUser && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(selectedMeeting.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Select a meeting to view details
            </div>
          )}
        </div>
      </div>

      <ScheduleMeetingDialog
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
      />
    </div>
  )
} 