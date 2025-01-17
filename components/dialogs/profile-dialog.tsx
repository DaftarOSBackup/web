"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Camera, Trash2, UserCircle, MessageSquarePlus, Shield, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  gender: string
  language: string
  country: string
  city: string
  company: string
  position: string
  industry: string
  experience: string
}

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const navItems = [
  { title: "Profile", value: "profile", icon: UserCircle },
  { title: "Feature Request", value: "feature", icon: MessageSquarePlus },
  { title: "Privacy Policy", value: "privacy", icon: Shield },
  { title: "Delete Account", value: "delete", icon: Trash2, className: "text-red-500 hover:text-red-600" },
]

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [featureRequest, setFeatureRequest] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[600px] p-0 gap-0">
        {/* Top Navigation */}
        <div className="border-b">
          <nav className="flex items-center space-x-1 px-4 h-14">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                className={cn(
                  "relative px-3 py-2 text-sm rounded-md transition-colors",
                  "hover:bg-accent/50",
                  activeTab === item.value 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground",
                  item.className
                )}
              >
                <span className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </span>
                {activeTab === item.value && (
                  <span className="absolute inset-x-0 -bottom-[10px] h-[2px] bg-foreground" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <ScrollArea className="h-[calc(600px-3.5rem)]">
          {activeTab === "profile" && (
            <div className="p-6">
              <div className="grid grid-cols-3 gap-8">
                {/* Profile Photo Card */}
                <div className="space-y-4">
                  <div className="p-6 border rounded-lg space-y-4">
                    <div className="flex justify-center">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>UN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        size="sm"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full text-red-500 hover:text-red-600"
                        size="sm"
                        onClick={() => {
                          console.log("Signing out...")
                          onOpenChange(false)
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="col-span-2 space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Profile Details</h2>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant="outline"
                      size="sm"
                    >
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input disabled={!isEditing} defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input disabled={!isEditing} defaultValue="Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input disabled={!isEditing} defaultValue="john@example.com" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input disabled={!isEditing} defaultValue="+1234567890" />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input disabled={!isEditing} defaultValue="Acme Inc" />
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input disabled={!isEditing} defaultValue="CEO" />
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Select disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input disabled={!isEditing} defaultValue="New York" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "feature" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold">Feature Request</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Help us improve by suggesting new features or improvements
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <p className="text-sm font-medium">Before submitting:</p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>Check if the feature already exists</li>
                    <li>Be specific about the problem you're trying to solve</li>
                    <li>Include use cases where possible</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <Label>Your Request</Label>
                  <Textarea 
                    placeholder="Describe the feature you'd like to see..."
                    value={featureRequest}
                    onChange={(e) => setFeatureRequest(e.target.value)}
                    className="h-[150px] resize-none"
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!featureRequest.trim()}
                  >
                    Submit Request
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold">Privacy Policy</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Last updated: January 1, 2024
                </p>
              </div>

              <div className="space-y-6 text-sm">
                <section className="space-y-2">
                  <h3 className="font-medium">Data Collection</h3>
                  <p className="text-muted-foreground">
                    We collect information that you provide directly to us, including your name, email address,
                    and any other information you choose to provide. We also automatically collect certain
                    information about your device when you use our platform.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-medium">Use of Information</h3>
                  <p className="text-muted-foreground">
                    We use the information we collect to provide, maintain, and improve our services,
                    to develop new features, and to protect our platform and users.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-medium">Data Sharing</h3>
                  <p className="text-muted-foreground">
                    We do not share your personal information with third parties except as described in this policy.
                    We may share your information with service providers who assist in our operations.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-medium">Security</h3>
                  <p className="text-muted-foreground">
                    We take reasonable measures to help protect your personal information from loss, theft,
                    misuse, unauthorized access, disclosure, alteration, and destruction.
                  </p>
                </section>
              </div>
            </div>
          )}

          {activeTab === "delete" && (
            <div className="p-6">
              <div className="max-w-md mx-auto space-y-6">
                <div className="text-center space-y-2">
                  <Trash2 className="h-12 w-12 mx-auto text-destructive" />
                  <h2 className="text-lg font-semibold">Delete Account</h2>
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <p className="text-sm font-medium">Before deleting:</p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>All your programs will be removed</li>
                    <li>Your profile data will be deleted</li>
                    <li>Access to all services will be terminated</li>
                    <li>This action is irreversible</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      // Add delete account logic here
                      console.log("Deleting account...")
                      onOpenChange(false)
                    }}
                  >
                    Delete Account
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("profile")}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 