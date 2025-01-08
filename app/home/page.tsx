"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Building, ChartBar, Target } from "lucide-react"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample statistics
const stats = [
  {
    title: "Total Programs",
    value: "12",
    icon: Building,
    description: "Active investment programs"
  },
  {
    title: "Total Startups",
    value: "48",
    icon: Users,
    description: "Registered startups"
  },
  {
    title: "Investment Made",
    value: "$2.4M",
    icon: ChartBar,
    description: "Total investments"
  },
  {
    title: "Success Rate",
    value: "76%",
    icon: Target,
    description: "Program success rate"
  }
]

export default function HomePage() {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)] space-y-8">

      
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Welcome to Daftar OS</h1>
        <p className="text-muted-foreground">
          Your centralized platform for startup investments and program management
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-2xl font-semibold">{stat.value}</span>
              </div>
              <h3 className="font-medium mt-4">{stat.title}</h3>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/programs">
            <Card className="hover:border-blue-600 transition-colors cursor-pointer">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">View Programs</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse active investment programs
                  </p>
                </div>
                <ArrowRight className="h-5 w-5" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/meetings">
            <Card className="hover:border-blue-600 transition-colors cursor-pointer">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Schedule Meetings</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your meetings and calendar
                  </p>
                </div>
                <ArrowRight className="h-5 w-5" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/studio/details">
            <Card className="hover:border-blue-600 transition-colors cursor-pointer">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Create Program</h3>
                  <p className="text-sm text-muted-foreground">
                    Start a new investment program
                  </p>
                </div>
                <ArrowRight className="h-5 w-5" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Platform Updates */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Platform Updates</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-medium">New Features Released</h3>
                <p className="text-sm text-muted-foreground">
                  We've added new features to help you manage your investments more effectively:
                </p>
              </div>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Enhanced analytics dashboard</li>
                <li>Improved meeting scheduling system</li>
                <li>New program templates</li>
                <li>Advanced filtering options</li>
              </ul>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      </ScrollArea>
  )
} 