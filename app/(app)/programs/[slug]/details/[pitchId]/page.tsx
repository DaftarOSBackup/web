"use client"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Mail, Phone, Download, Eye, Trash2, Search, Filter, Calendar, MapPin, Users, FileText, Check, X, Link, Upload, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ReportDialog } from "@/components/dialogs/report-dialog"
import { useRouter } from "next/navigation"
import { ScheduleMeetingDialog } from "@/components/dialogs/schedule-meeting-dialog"
import OfferPage from "@/app/(app)/programs/studio/offer/page"

// Sample data
const pitchDetails = {
  daftarName: "Tech Startup",
  pitchName: "AI Chatbot",
  status: "In Review",
  sections: {
    investorsNote: "This is a promising startup with great potential...",
    documentation: {
      private: [
        { 
          id: "1",
          name: "Financial_Model.xlsx",
          uploadedBy: "John Doe",
          daftarName: "Tech Startup",
          uploadedAt: "2024-03-20T14:30:00",
          type: "private"
        }
      ],
      received: [
        {
          id: "2", 
          name: "Pitch_Deck.pdf",
          uploadedBy: "Sarah Smith",
          daftarName: "AI Solutions",
          uploadedAt: "2024-03-19T10:15:00",
          type: "received"
        }
      ],
      sent: [
        {
          id: "3",
          name: "Term_Sheet.docx",
          uploadedBy: "Mike Johnson",
          daftarName: "Tech Fund",
          uploadedAt: "2024-03-18T09:30:00",
          type: "sent"
        }
      ]
    },
    foundersPitch: {
      video: "https://example.com/video",
      demoLink: "https://demo.example.com",
      location: "Dubai, UAE",
      stage: "Seed",
      sectors: ["AI/ML", "SaaS"],
      questions: [
        { question: "What's your go-to-market strategy?", answer: "..." },
        { question: "How do you plan to scale?", answer: "..." },
      ],
      status: "Under Review",
      pitchedAt: "2024-03-20T14:30:00",
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
        { language: "French", count: 3 },
      ]
    },
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
    analysis: {
      market: "Growing market with...",
      competition: "Main competitors include...",
      risks: "Key risks include...",
      teamAnalysis: [
        {
          id: "1",
          name: "John Doe",
          avatar: "https://github.com/shadcn.png",
          daftarName: "Tech Fund",
          date: "2024-03-20T14:30:00",
          believer: true,
          reason: "Strong technical team with proven track record..."
        },
        {
          id: "2",
          name: "Sarah Smith",
          avatar: "https://github.com/sarah.png",
          daftarName: "Innovation Hub",
          date: "2024-03-19T10:15:00",
          believer: false,
          reason: "Market seems too competitive with established players..."
        }
      ]
    },
    report: {
      summary: "Overall assessment...",
      recommendations: "Next steps include..."
    }
  }
}

const sections = [
  { id: "investors-note", label: "Investor's Note" },
  { 
    id: "documents", 
    label: "Documents",
    subsections: [
      { id: "private-docs", label: "Private" },
      { id: "received-docs", label: "Received" },
      { id: "sent-docs", label: "Sent" }
    ]
  },
  { id: "founders-pitch", label: "Founder's Pitch" },
  { id: "team", label: "Team" },
  { id: "meetings", label: "Meetings" },
  { id: "analysis", label: "Analysis" },
  { id: "offer", label: "Offers" }
]

// Add interface for meeting details
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

export default function PitchDetailsPage({ params }: { params: { slug: string; pitchId: string } }) {
  const [activeSection, setActiveSection] = useState("investors-note")
  const [selectedDocType, setSelectedDocType] = useState("private")
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null)
  const [selectedMeetingDetails, setSelectedMeetingDetails] = useState<MeetingDetails | null>(null)
    const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [scheduleMeetingOpen, setScheduleMeetingOpen] = useState(false)
  const router = useRouter()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  useEffect(() => {
    if (selectedMeeting) {
      const meetingDetails = pitchDetails.sections.meetings.find(
        meeting => meeting.id === selectedMeeting
      )
      setSelectedMeetingDetails(meetingDetails || null)
    }
  }, [selectedMeeting])

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
    <div className="flex gap-6 mr-8">
      {/* Sidebar - 20% */}
      <div className="w-[15%] space-y-6">
        {/* Pitch Info Card */}
        <div className="p-4 border rounded-[0.3rem] space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Daftar</p>
            <p className="text-sm font-semibold">{pitchDetails.daftarName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pitch</p>
            <p className="text-sm font-semibold">{pitchDetails.pitchName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge variant="secondary">{pitchDetails.status}</Badge>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-1">
          {sections.map((section) => (
            <div key={section.id}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-sm font-normal",
                  (!section.subsections && activeSection === section.id) && "bg-muted font-medium"
                )}
                onClick={() => {
                  if (section.subsections) {
                    setExpandedSection(expandedSection === section.id ? null : section.id)
                  } else {
                    setActiveSection(section.id)
                  }
                }}
            >
              {section.label}
                {section.subsections && (
                  <ChevronDown 
                    className={cn(
                      "ml-auto h-4 w-4 transition-transform",
                      expandedSection === section.id && "transform rotate-180"
                    )} 
                  />
                )}
              </Button>

              {section.subsections && expandedSection === section.id && (
                <div className="ml-4 mt-1 space-y-1">
                  {section.subsections.map((subsection) => (
                    <Button
                      key={subsection.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-sm font-normal",
                        activeSection === subsection.id && "bg-muted font-medium"
                      )}
                      onClick={() => setActiveSection(subsection.id)}
                    >
                      {subsection.label}
                      <span className="ml-auto text-xs text-muted-foreground">
                        {pitchDetails.sections.documentation[subsection.id.split('-')[0] as keyof typeof pitchDetails.sections.documentation].length}
                      </span>
            </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - 80% */}
      <div className="flex-1">
        {/* Investor's Note */}
        {activeSection === "investors-note" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Investor's Note</h2>
            <p className="text-sm">{pitchDetails.sections.investorsNote}</p>
          </div>
        )}

        {/* Documentation Sections */}
        {(activeSection === "private-docs" || 
          activeSection === "received-docs" || 
          activeSection === "sent-docs") && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {sections.find(s => s.id === activeSection)?.label}
              </h2>
            </div>

            <div className="space-y-4">
              {/* Header with Search and Upload */}
              <div className="flex items-center justify-end gap-2">
                <div className="relative w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search documents" className="pl-8" />
                </div>
                {(activeSection === "private-docs" || 
                activeSection === "sent-docs") && (
                  <Button variant="outline" className="text-white">
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Documents List */}
              <div className="space-y-3">
                {pitchDetails.sections.documentation[activeSection.split('-')[0] as keyof typeof pitchDetails.sections.documentation].map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-[0.3rem]"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{doc.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>
                            {activeSection === "received-docs" ? "From" : "Uploaded by"} {doc.uploadedBy}
                          </span>
                          <span>•</span>
                          <span>{doc.daftarName}</span>
                          <span>•</span>
                          <span>{new Date(doc.uploadedAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                        <Download className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      {activeSection === "private-docs" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Founder's Pitch */}
        {activeSection === "founders-pitch" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Founder's Pitch</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="secondary">{pitchDetails.sections.foundersPitch.status}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Pitched:</span>
                  <span>{new Date(pitchDetails.sections.foundersPitch.pitchedAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white" 
                    size="sm"
                  >
                    Withdraw
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setReportDialogOpen(true)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Report
                  </Button>
                </div>
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
                  <div key={item.title}>
                    <p className="text-sm text-muted-foreground">
                      {item.title}: <span className="text-sm font-medium">{item.value}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Team */}
        {activeSection === "team" && (
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
                  <PieChart width={300} height={200}>
                    <Pie
                      data={pitchDetails.sections.team.genderData}
                      cx={150}
                      cy={100}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#2563eb"
                      dataKey="value"
                    >
                      {pitchDetails.sections.team.genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#2563eb' : '#93c5fd'} />
                      ))}
                    </Pie>
                  </PieChart>
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
        )}

        {/* Meetings */}
        {activeSection === "meetings" && (
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
                  {pitchDetails.sections.meetings.map((meeting) => (
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
          </div>
        )}

        {/* Analysis */}
        {activeSection === "analysis" && (
          <div className="space-y-6">
            
            <div className="grid grid-cols-2 gap-6">
              {/* Your Analysis */}
              <div className="space-y-4">
                <h3 className="font-medium">Your Analysis</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Do you believe in this startup?</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your answer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Why?</Label>
                    <Textarea 
                      placeholder="Share your reasoning..."
                      className="min-h-[150px] resize-none"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Share
                  </Button>
                  </div>
                </div>
              </div>

              {/* Team Analysis */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-medium">Team Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                  believers {pitchDetails.sections.analysis.teamAnalysis.filter(a => a.believer).length}  out of 5
                  </p>
                </div>
                
                <div className="space-y-3">
                  {pitchDetails.sections.analysis.teamAnalysis.map((analysis) => (
                    <div 
                      key={analysis.id}
                      className="p-4 border rounded-[0.3rem] space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={analysis.avatar} />
                            <AvatarFallback>{analysis.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{analysis.name}</p>
                            <p className="text-xs text-muted-foreground">{analysis.daftarName}</p>
                            <p className="text-xs text-muted-foreground">
                          {new Date(analysis.date).toLocaleString()}
                        </p>
                          </div>
                        </div>
                        <Badge variant={analysis.believer ? "default" : "secondary"}>
                          {analysis.believer ? "Believer" : "Non-Believer"}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm">{analysis.reason}</p>
                        
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report */}
        {activeSection === "offer" && (
          <div className="space-y-4">
            <OfferPage />
          </div>
        )}
      </div>

      <ReportDialog 
        open={reportDialogOpen} 
        onOpenChange={setReportDialogOpen} 
      />
      <ScheduleMeetingDialog 
        open={scheduleMeetingOpen}
        onOpenChange={setScheduleMeetingOpen}
      />
    </div>
    </ScrollArea>
  )
} 