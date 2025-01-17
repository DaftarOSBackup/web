"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  UserCircle, 
  Users, 
  Building2, 
  Globe, 
  MapPin, 
  Mail, 
  Phone, 
  Languages,
  Settings 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DaftarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const navItems = [
  { title: "Profile", value: "profile", icon: UserCircle },
  { title: "Team", value: "team", icon: Users },
  { title: "Settings", value: "settings", icon: Settings },
]

export function DaftarDialog({ open, onOpenChange }: DaftarDialogProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)

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
                    : "text-muted-foreground hover:text-foreground"
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
                {/* Daftar Logo/Image */}
                <div className="space-y-4">
                  <div className="p-6 border rounded-lg space-y-4">
                    <div className="flex justify-center">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src="/assets/daftar.png" />
                        <AvatarFallback>DF</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="text-center space-y-1">
                      <h3 className="font-medium">Daftar Name</h3>
                      <p className="text-sm text-muted-foreground">Created on Jan 1, 2024</p>
                    </div>
                  </div>
                </div>

                {/* Daftar Details */}
                <div className="col-span-2 space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Daftar Details</h2>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant="outline"
                      size="sm"
                    >
                      {isEditing ? "Save Changes" : "Edit Details"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input disabled={!isEditing} defaultValue="Daftar Name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Structure</Label>
                      <Select disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select structure" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="llc">LLC</SelectItem>
                          <SelectItem value="corporation">Corporation</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Select disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="health">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
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
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">Team Members</h2>
                  <p className="text-sm text-muted-foreground">Manage your team members and their roles</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Users className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </div>

              <div className="space-y-4">
                {/* Team members list would go here */}
                <div className="text-sm text-muted-foreground text-center py-8">
                  No team members added yet
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold">Daftar Settings</h2>
                <p className="text-sm text-muted-foreground">Manage your Daftar preferences and configurations</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Visibility</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="restricted">Restricted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Notifications</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select notification preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All notifications</SelectItem>
                      <SelectItem value="important">Important only</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 