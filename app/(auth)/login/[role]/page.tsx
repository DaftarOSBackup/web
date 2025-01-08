"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRole } from "@/contexts/role-context"

export default function LoginPage({ params }: { params: { role: string } }) {
  const router = useRouter()
  const { setRole } = useRole()
  const role = params.role as "investor" | "founder"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setRole(role)
    router.push("/home")
  }

  return (
    <div className="w-full max-w-sm space-y-8 p-4">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray-500">Sign in to your {role} account</p>
      </div>
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
    </div>
  )
} 