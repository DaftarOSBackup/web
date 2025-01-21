"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRole } from "@/contexts/role-context"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function LoginPage({ params }: { params: { role: string } }) {
  const router = useRouter()
  const { setRole } = useRole()
  const role = params.role as "investor" | "founder"
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setRole(role)
      if (role === "investor") {
        router.push("/programs")
      } else {
        router.push("/incubation") 
      }
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  return (
    <div className="w-full max-w-sm space-y-8 p-4">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray-500">Sign in to your {role} account</p>
      </div>
      
      {!isLoading ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              required
              type="password"
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      ) : (
        <div className="py-8 text-center space-y-4">
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium">Signing you in</p>
            <p className="text-sm text-muted-foreground">
              Please wait while we verify your credentials and prepare your workspace.
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 