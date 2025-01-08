import { LayoutDashboard, Users, DollarSign, Building, Play, ScrollText, Folder, Bell, Calendar, Crown, FileText, Video, MessageCircle, HelpCircle, UserPlus, Trash2, FileSpreadsheet, Users2, CheckCircle } from "lucide-react"

export const investorNavItems = [
  // {
  //   title: "Dashboard",
  //   url: "/dashboard",
  //   icon: LayoutDashboard,
  // },
  {
    title: "Programs",
    url: "/home/programs",
    icon: Users,
  },
  {
    title: "Meetings",
    url: "/home/meetings",
    icon: Calendar,
  },
  {
    title: "Go Premium",
    url: "/home/premium",
    icon: Crown,
  }
]


export const founderNavItems = [
  // {
  //   title: "Dashboard",
  //   url: "/dashboard",
  //   icon: LayoutDashboard,
  // },
  {
    title: "Incubation",
    url: "/home/incubation",
    icon: Building,
  },
  {
    title: "My Daftar",
    url: "/home/daftar",
    icon: DollarSign,
  },
  {
    title: "Meetings",
    url: "/home/meetings",
    icon: Calendar,
  },
  {
    title: "Go Premium",
    url: "/home/premium",
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
    url: "/home/studio/details",
    icon: FileSpreadsheet,
  },
  {
    title: "Collaboration",
    url: "/home/studio/collaboration",
    icon: Users2,
  },
  {
    title: "Program Document",
    url: "/home/studio/document",
    icon: FileText,
  },
  {
    title: "Audience",
    url: "/home/studio/audience",
    icon: Users,
  },
  {
    title: "Founder's Pitch",
    url: "/home/studio/founder-pitch",
    icon: Video,
  },
  {
    title: "Investor's Pitch",
    url: "/home/studio/investor-pitch",
    icon: MessageCircle,
  },
  {
    title: "FAQs",
    url: "/home/studio/faqs",
    icon: HelpCircle,
  },
  {
    title: "Invite from Database",
    url: "/home/studio/invite",
    icon: UserPlus,
  },
  {
    title: "Approval",
    url: "/home/studio/approval",
    icon: CheckCircle,
  },
  {
    title: "Schedule",
    url: "/home/studio/schedule",
    icon: Calendar,
  },
  {
    title: "Delete",
    url: "/home/studio/delete",
    icon: Trash2,
    className: "text-red-500 hover:text-red-600",
  },
]

export const founderStudioNavItems = [
  {
    title: "Pitch Name",
    url: "/home/studio/pitch-name",
    icon: FileText,
  },
  {
    title: "Investor's Questions",
    url: "/home/studio/investor-questions",
    icon: HelpCircle,
  },
  {
    title: "Pitch",
    url: "/home/studio/pitch",
    icon: Video,
  },
  {
    title: "Meetings",
    url: "/home/studio/meetings",
    icon: Calendar,
  },
  {
    title: "Documents",
    url: "/home/studio/documents",
    icon: Folder,
    subItems: [
      {
        title: "Private",
        url: "/home/studio/documents/private",
      },
      {
        title: "Received",
        url: "/home/studio/documents/received",
      },
      {
        title: "Sent",
        url: "/home/studio/documents/sent",
      }
    ]
  },
  {
    title: "Offer",
    url: "/home/studio/offer",
    icon: FileSpreadsheet,
  },
  {
    title: "Delete",
    url: "/home/studio/delete",
    icon: Trash2,
    className: "text-red-500 hover:text-red-600",
  },
] 