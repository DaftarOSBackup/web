import { LayoutDashboard, Users, DollarSign, Building, Play, ScrollText, Folder, Bell, Calendar, Crown, FileText, Video, MessageCircle, HelpCircle, UserPlus, Trash2, FileSpreadsheet, Users2, CheckCircle } from "lucide-react"

export const investorNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Programs",
    url: "/programs",
    icon: Users,
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Calendar,
  },
  {
    title: "Go Premium",
    url: "/premium",
    icon: Crown,
  }
]


export const founderNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Incubation",
    url: "/incubation",
    icon: Building,
  },
  {
    title: "My Daftar",
    url: "/daftar",
    icon: DollarSign,
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Calendar,
  },
  {
    title: "Go Premium",
    url: "/premium",
    icon: Crown,
  }
]

export const topNavConfig = {
  investor: [
    { icon: Play, action: 'play' },
    { icon: ScrollText, action: 'journal' },
    { icon: Folder, action: 'daftar' },
    { icon: Bell, action: 'notifications' },
  ],
  founder: [
    { icon: Play, action: 'play' },
    { icon: ScrollText, action: 'journal' },
    { icon: Bell, action: 'notifications' },
  ]
}

export const studioNavItems = [
  {
    title: "Program Details",
    url: "/studio/details",
    icon: FileSpreadsheet,
  },
  {
    title: "Collaboration",
    url: "/studio/collaboration",
    icon: Users2,
  },
  {
    title: "Program Document",
    url: "/studio/document",
    icon: FileText,
  },
  {
    title: "Audience",
    url: "/studio/audience",
    icon: Users,
  },
  {
    title: "Founder's Pitch",
    url: "/studio/founder-pitch",
    icon: Video,
  },
  {
    title: "Investor's Pitch",
    url: "/studio/investor-pitch",
    icon: MessageCircle,
  },
  {
    title: "FAQs",
    url: "/studio/faqs",
    icon: HelpCircle,
  },
  {
    title: "Invite from Database",
    url: "/studio/invite",
    icon: UserPlus,
  },
  {
    title: "Approval",
    url: "/studio/approval",
    icon: CheckCircle,
  },
  {
    title: "Schedule",
    url: "/studio/schedule",
    icon: Calendar,
  },
  {
    title: "Delete",
    url: "/studio/delete",
    icon: Trash2,
    className: "text-red-500 hover:text-red-600",
  },
] 