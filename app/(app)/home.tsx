"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="max-w-3xl mx-auto space-y-16 py-8">
        {/* Welcome Section */}
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight">
            Welcome to Daftar OS
          </h1>
          <p className="text-xl text-muted-foreground">
            Your centralized platform for startup investments and program management
          </p>
        </div>

        {/* About Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-blue-600" />
            <h2 className="text-2xl font-medium">About Daftar OS</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Daftar OS is a comprehensive platform designed to streamline the investment process 
            and facilitate meaningful connections between investors and startups. Our platform 
            provides tools for program management, startup evaluation, and portfolio tracking.
          </p>
        </div>

        {/* Mission Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-blue-600" />
            <h2 className="text-2xl font-medium">Our Mission</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We aim to revolutionize how investments are made and managed in the startup ecosystem. 
            By providing powerful tools and insights, we help create successful partnerships 
            between investors and founders.
          </p>
        </div>

        {/* Getting Started Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-blue-600" />
            <h2 className="text-2xl font-medium">Getting Started</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore our platform features, manage your investment programs, and connect with 
            innovative startups. Use the navigation menu to access different sections of the platform.
          </p>
        </div>
      </div>
    </ScrollArea>
  )
} 