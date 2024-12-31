"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Settings, UserCircle, CreditCard, Trash2, Upload, Globe, MapPin, Users, Mail, Phone, Languages } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
const sections = [
  { title: "Profile", value: "profile", icon: UserCircle },
  { title: "Team", value: "team", icon: Users },
  { title: "Billing", value: "billing", icon: CreditCard },
  { title: "Delete Daftar", value: "delete", icon: Trash2, className: "text-red-500 hover:text-red-600" },
]

const teamMembers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    designation: "CEO",
    age: 35,
    email: "john@example.com",
    phone: "+971 50 123 4567",
    image: "https://github.com/shadcn.png",
    preferredLanguages: ["English", "Arabic", "French"]
  },
  // Add more team members...
]

const pendingInvites = [
  {
    id: 1,
    email: "sarah@example.com",
    designation: "CTO",
    sentAt: "2024-03-20"
  },
  // Add more pending invites...
]


const daftarData = {
  name: "Daftar OS",
  logo: "https://github.com/shadcn.png",
  structure: "Private Limited",
  team: "15 Members",
  website: "https://daftar.com",
  location: "Dubai, UAE",
  billing: {
    plan: "Enterprise",
    status: "Active",
    nextBilling: "2024-04-01",
    amount: "$999/month",
    paymentMethod: "Visa ending in 4242"
  }
}

interface DaftarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}



export function DaftarDialog({ open, onOpenChange }: DaftarDialogProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    email: ""
  })

  const handleSendInvite = () => {
    console.log("Sending invite:", formData)
    // Add your invite logic here
  }

  const handleSave = () => {
    console.log("Saving changes:", formData)
    // Add your save logic here
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0">
        <div className="flex h-[28rem]">
          {/* Side Navigation */}
          <div className="w-52 border-r p-2 space-y-3 bg-muted/10">
            <div className="flex items-center gap-2 px-2">
              <div className="p-1.5 rounded-[0.3rem] bg-accent/50 text-accent-foreground">
                <Settings className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-semibold">Daftar Settings</h2>
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
            <div className="p-4 space-y-6">
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={daftarData.logo} />
                      <AvatarFallback>DO</AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                    >
                      <Upload className="h-3.5 w-3.5 mr-2" />
                      Change Photo
                    </Button>
                  </div>

                  <div className="space-y-4">

                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label>Daftar Name</Label>
                        {isEditing ? (
                          <Input defaultValue={daftarData.name} className="h-9" />
                        ) : (
                          <div className="p-2 bg-muted rounded-md text-sm">{daftarData.name}</div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Structure</Label>
                        {isEditing ? (
                          <Input defaultValue={daftarData.structure} className="h-9" />
                        ) : (
                          <div className="p-2 bg-muted rounded-md text-sm">{daftarData.structure}</div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Team Size</Label>
                        {isEditing ? (
                          <Input defaultValue={daftarData.team} className="h-9" />
                        ) : (
                          <div className="p-2 bg-muted rounded-md text-sm">{daftarData.team}</div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Website</Label>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          {isEditing ? (
                            <Input defaultValue={daftarData.website} className="h-9" />
                          ) : (
                            <a
                              href={daftarData.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {daftarData.website}
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Location</Label>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {isEditing ? (
                            <Input defaultValue={daftarData.location} className="h-9" />
                          ) : (
                            <div className="text-sm">{daftarData.location}</div>
                          )}
                        </div>
                      </div>
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

              {activeTab === "team" && (
                <Tabs defaultValue="team" className="w-full h-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="team" className="flex items-center gap-1">
                      Team
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-[0.3rem]">
                        {teamMembers.length}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="flex items-center gap-1">
                      Pending
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-[0.3rem]">
                        {pendingInvites.length}
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </div>
      
                <TabsContent value="team" className="mt-0 h-[calc(100%-4rem)] overflow-auto">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Team Members List */}
                    <div className="space-y-4">
                      {teamMembers.map((member) => (
                        <div 
                          key={member.id}
                          className="p-4 rounded-[0.3rem] border space-y-4"
                        >
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={member.image} />
                              <AvatarFallback>
                                {member.firstName[0]}{member.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">
                                {member.firstName} {member.lastName}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {member.designation}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{member.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{member.phone}</span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <Languages className="h-4 w-4" />
                                Preferred languages to connect with investors:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {member.preferredLanguages.map((lang) => (
                                  <span 
                                    key={lang}
                                    className="text-xs px-2 py-1 bg-muted rounded-[0.3rem]"
                                  >
                                    {lang}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
      
                    {/* Invite Form */}
                    <div className="p-4 rounded-[0.3rem] border space-y-4 h-fit">
                      <h3 className="font-medium">Invite Team Member</h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          />
                          <Input
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          />
                        </div>
                        <Input
                          placeholder="Designation"
                          value={formData.designation}
                          onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                        />
                        <Input
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          onClick={handleSendInvite}
                        >
                          Send Invite
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
      
                <TabsContent value="pending" className="mt-0 h-[calc(100%-4rem)] overflow-auto">
                  <div className="space-y-4">
                    {pendingInvites.map((invite) => (
                      <div 
                        key={invite.id}
                        className="p-4 rounded-[0.3rem] border flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium">{invite.email}</p>
                          <p className="text-xs text-muted-foreground">{invite.designation}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Sent on {new Date(invite.sentAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
                
              )}

                    {activeTab === "billing" && (
                      <div className="space-y-6">
                        <div className="p-4 rounded-md space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{daftarData.billing.plan}</h3>
                              <p className="text-sm text-muted-foreground">{daftarData.billing.amount}</p>
                            </div>
                            <Badge>{daftarData.billing.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Next billing date: {new Date(daftarData.billing.nextBilling).toLocaleDateString()}
                          </p>
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span className="text-sm">{daftarData.billing.paymentMethod}</span>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full">
                          Update Payment Method
                        </Button>
                      </div>
                    )}

                    {activeTab === "delete" && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-md space-y-4">
                          <div className="space-y-2">
                            <h3 className="font-medium text-red-600">Delete Daftar</h3>
                            <p className="text-sm text-red-600">
                              This action cannot be undone. This will permanently delete your
                              Daftar account and remove all associated data.
                            </p>
                          </div>
                          <div className="pt-2">
                            <Button variant="destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Daftar
                            </Button>
                          </div>
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