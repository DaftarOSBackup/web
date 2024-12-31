"use client"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, Languages } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface TeamDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Sample data
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

export function TeamDialog({ open, onOpenChange }: TeamDialogProps) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-2/3">
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
      </DialogContent>
    </Dialog>
  )
} 