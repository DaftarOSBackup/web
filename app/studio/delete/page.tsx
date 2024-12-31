"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function DeletePage() {
  const router = useRouter()

  const handleDelete = () => {
    // Add delete logic
    router.push("/programs")
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-destructive">Delete Program</h1>
      <div className="max-w-2xl space-y-6">
        <p className="text-muted-foreground">
          Are you sure you want to delete this program? This action cannot be undone.
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/studio/details")}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Delete Program
          </Button>
        </div>
      </div>
    </div>
  )
} 