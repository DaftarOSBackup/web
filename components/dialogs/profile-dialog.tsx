"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pencil, Save, Settings, UserCircle, MessageSquarePlus, Shield, LogOut, Camera, Building, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useRole } from "@/contexts/role-context"

interface ProfileData {
  name: string
  email: string
  phone: string
  gender: string
  language: string
  bio: string
  createdAt: string
}

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const investorSections = [
  { title: "Profile", value: "profile", icon: UserCircle },
  { title: "Feature Request", value: "feature", icon: MessageSquarePlus },
  { title: "Privacy Policy", value: "privacy", icon: Shield },
  { title: "Logout", value: "logout", icon: LogOut, className: "text-red-500 hover:text-red-600" },
]

const founderSections = [
  { title: "Profile", value: "profile", icon: UserCircle },
  { title: "Company", value: "company", icon: Building },
  { title: "Team", value: "team", icon: Users },
  { title: "Privacy Policy", value: "privacy", icon: Shield },
  { title: "Logout", value: "logout", icon: LogOut, className: "text-red-500 hover:text-red-600" },
]

interface CompanyData {
  name: string
  website: string
  industry: string
  stage: string
  description: string
  founded: string
}

interface TeamMember {
  name: string
  role: string
  email: string
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const { role } = useRole()
  const sections = role === 'investor' ? investorSections : founderSections
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [featureName, setFeatureName] = useState("")
  const [featureMessage, setFeatureMessage] = useState("")

  const [profile, setProfile] = useState<ProfileData>({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    gender: "male",
    language: "english",
    bio: "Passionate about technology and innovation.",
    createdAt: "2024-01-15",
  })

  const [editedProfile, setEditedProfile] = useState<ProfileData>(profile)

  const [company, setCompany] = useState<CompanyData>({
    name: "TechCorp Inc",
    website: "www.techcorp.com",
    industry: "Software",
    stage: "Series A",
    description: "Building innovative solutions for enterprise customers",
    founded: "2023",
  })

  const [editedCompany, setEditedCompany] = useState<CompanyData>(company)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: "John Smith", role: "CEO", email: "john@techcorp.com" },
    { name: "Sarah Lee", role: "CTO", email: "sarah@techcorp.com" },
  ])

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleFeatureSubmit = () => {
    console.log({ featureName, featureMessage })
    setFeatureName("")
    setFeatureMessage("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0">
        <div className="flex h-[28rem]">
          {/* Side Navigation */}
          <div className="w-52 border-r p-2 space-y-3 bg-muted/10">
            <div className="flex items-center gap-2 px-2">
              <div className="p-1.5 rounded-[0.3rem] bg-accent/50 text-accent-foreground">
                <Settings className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold">Profile Settings</h2>
            </div>
            <div>
              {sections.map((item) => (
                <Button
                  key={item.value}
                  variant={activeTab === item.value ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start rounded-[0.3rem] py-2 text-sm",
                    activeTab === item.value 
                      ? "bg-accent" 
                      : "text-muted-foreground hover:text-foreground",
                    item.className
                  )}
                  onClick={() => setActiveTab(item.value)}
                >
                  <item.icon className="mr-2 h-3.5 w-3.5" />
                  {item.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <ScrollArea className="flex-1">
            <div className="p-4">
              {activeTab === "profile" && (
                <div className="space-y-6 pt-4">
                  <div className="flex items-center flex-col gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-8 text-xs rounded-[0.3rem]"
                    >
                      Change Photo
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-sm">Name</Label>
                        {isEditing ? (
                          <Input
                            value={editedProfile.name}
                            onChange={(e) =>
                              setEditedProfile({ ...editedProfile, name: e.target.value })
                            }
                            className="h-9 text-sm rounded-[0.3rem]"
                          />
                        ) : (
                          <div className="px-3 py-2 text-sm bg-muted/50 rounded-[0.3rem]">
                            {profile.name}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Email</Label>
                        <div className="px-3 py-2 text-sm bg-muted/50 rounded-[0.3rem]">
                          {profile.email}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Phone</Label>
                        {isEditing ? (
                          <Input
                            value={editedProfile.phone}
                            onChange={(e) =>
                              setEditedProfile({ ...editedProfile, phone: e.target.value })
                            }
                            className="h-9 text-sm rounded-[0.3rem]"
                          />
                        ) : (
                          <div className="px-3 py-2 text-sm bg-muted/50 rounded-[0.3rem]">
                            {profile.phone}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Gender</Label>
                        {isEditing ? (
                          <Select
                            value={editedProfile.gender}
                            onValueChange={(value) =>
                              setEditedProfile({ ...editedProfile, gender: value })
                            }
                          >
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="px-3 py-2 text-sm bg-muted/50 rounded-[0.3rem] capitalize">
                            {profile.gender}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Bio</Label>
                      {isEditing ? (
                        <Textarea
                          value={editedProfile.bio}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, bio: e.target.value })
                          }
                          className="min-h-[100px] text-sm resize-none rounded-[0.3rem]"
                        />
                      ) : (
                        <div className="px-3 py-2 text-sm bg-muted/50 rounded-[0.3rem] whitespace-pre-wrap">
                          {profile.bio}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center gap-2">
                      {isEditing ? (
                        <>
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(false)}
                            className="h-8 rounded-[0.3rem]"
                          >
                            Cancel
                          </Button>
                          <Button 
                            size="sm"
                            onClick={handleSave}
                            className="bg-blue-600 hover:bg-blue-700 rounded-[0.3rem]"
                          >
                            Save Changes
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => setIsEditing(true)}
                          className="bg-blue-600 hover:bg-blue-700 rounded-[0.3rem]"
                        >
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "feature" && (
                <div className="space-y-4 pt-4">
                  <div className="grid gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-sm">Feature Name</Label>
                      <Input
                        placeholder="Enter feature name"
                        value={featureName}
                        onChange={(e) => setFeatureName(e.target.value)}
                        className="h-8 text-sm rounded-[0.3rem]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm">Description</Label>
                      <Textarea
                        placeholder="Describe the feature you'd like to see..."
                        value={featureMessage}
                        onChange={(e) => setFeatureMessage(e.target.value)}
                        className="min-h-[120px] text-sm rounded-[0.3rem] resize-none"
                      />
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button 
                        size="sm"
                        onClick={handleFeatureSubmit}
                        className="h-8 bg-blue-600 hover:bg-blue-700 rounded-[0.3rem]"
                      >
                        Submit Request
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "privacy" && (
                <div className="space-y-4 pt-4">
                  <div className="space-y-4 text-sm">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium mb-1">1. Information We Collect</h3>
                        <p className="text-muted-foreground">
                          We collect information you provide directly to us, including name,
                          email address, and any other information you choose to provide.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">2. How We Use Your Information</h3>
                        <p className="text-muted-foreground">
                          We use the information we collect to provide, maintain, and improve
                          our services, communicate with you, and comply with legal obligations.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">3. Information Sharing</h3>
                        <p className="text-muted-foreground">
                          We do not share your personal information with third parties
                          except as described in this privacy policy.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">4. Data Security</h3>
                        <p className="text-muted-foreground">
                          We take reasonable measures to help protect your personal information
                          from loss, theft, misuse, and unauthorized access.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "company" && (
                <div className="space-y-6 pt-4">
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-sm">Company Name</Label>
                        {isEditing ? (
                          <Input
                            value={editedCompany.name}
                            onChange={(e) =>
                              setEditedCompany({ ...editedCompany, name: e.target.value })
                            }
                            className="h-9 text-sm rounded-[0.3rem]"
                          />
                        ) : (
                          <div className="px-3 py-2 text-sm bg-muted/50 rounded-[0.3rem]">
                            {company.name}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Website</Label>
                        {isEditing ? (
                          <Input
                            value={editedCompany.website}
                            onChange={(e) =>
                              setEditedCompany({ ...editedCompany, website: e.target.value })
                            }
                            className="h-9 text-sm rounded-[0.3rem]"
                          />
                        ) : (
                          <div className="px-3 py-2 text-sm bg-muted/50 rounded-[0.3rem]">
                            {company.website}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Industry</Label>
                        {isEditing ? (
                          <Input
                            value={editedCompany.industry}
                            onChange={(e) =>
                              setEditedCompany({ ...editedCompany, industry: e.target.value })
                            }
                            className="h-9 text-sm rounded-[0.3rem]"
                          />
                        ) : (
                          <div className="px-3 py-2 text-sm bg-muted/50 rounded-[0.3rem]">
                            {company.industry}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Stage</Label>
                        {isEditing ? (
                          <Select
                            value={editedCompany.stage}
                            onValueChange={(value) =>
                              setEditedCompany({ ...editedCompany, stage: value })
                            }
                          >
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                              <SelectItem value="seed">Seed</SelectItem>
                              <SelectItem value="series-a">Series A</SelectItem>
                              <SelectItem value="series-b">Series B</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="px-3 py-2 text-sm bg-muted/50 rounded-[0.3rem]">
                            {company.stage}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Company Description</Label>
                      {isEditing ? (
                        <Textarea
                          value={editedCompany.description}
                          onChange={(e) =>
                            setEditedCompany({ ...editedCompany, description: e.target.value })
                          }
                          className="min-h-[100px] text-sm resize-none rounded-[0.3rem]"
                        />
                      ) : (
                        <div className="px-3 py-2 text-sm bg-muted/50 rounded-[0.3rem] whitespace-pre-wrap">
                          {company.description}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center gap-2">
                      {isEditing ? (
                        <>
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(false)}
                            className="h-8 rounded-[0.3rem]"
                          >
                            Cancel
                          </Button>
                          <Button 
                            size="sm"
                            onClick={handleSave}
                            className="h-8 bg-blue-600 hover:bg-blue-700 rounded-[0.3rem]"
                          >
                            Save Changes
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => setIsEditing(true)}
                          className="h-8 bg-blue-600 hover:bg-blue-700 rounded-[0.3rem]"
                        >
                          Edit Company
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "team" && (
                <div className="space-y-6 pt-4">
                  <div className="space-y-4">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="p-4 border rounded-[0.3rem] space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-sm">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    ))}
                    <div className="flex justify-center">
                      <Button 
                        size="sm"
                        className="h-8 bg-blue-600 hover:bg-blue-700 rounded-[0.3rem]"
                      >
                        Add Team Member
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "logout" && (
                <div className="space-y-4 pt-4">
                  <div className="text-sm text-muted-foreground">
                    Are you sure you want to sign out? You will need to log in again to access your account.
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("profile")}
                      className="h-8 rounded-[0.3rem]"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        console.log("Logging out...")
                        onOpenChange(false)
                      }}
                      className="h-8 rounded-[0.3rem]"
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
} 