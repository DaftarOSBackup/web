"use client"
import { Suspense } from "react"
import { Loading } from "@/components/loading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { usePageParams } from "@/lib/utils/get-page-params"

function DocumentsContent() {
  const { mode, programId } = usePageParams()
  return (
    <div className="space-y-6 container mx-auto px-4">
      <div>
        <h1 className="text-2xl font-semibold">Documents</h1>
        <p className="text-sm text-muted-foreground">Manage your pitch documents</p>
      </div>

      <Tabs defaultValue="private">
        <TabsList>
          <TabsTrigger value="private">Private</TabsTrigger>
          <TabsTrigger value="received">Received</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
        </TabsList>

        <TabsContent value="private" className="space-y-4">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </TabsContent>

        <TabsContent value="received">
          <div className="text-sm text-muted-foreground">No documents received yet</div>
        </TabsContent>

        <TabsContent value="sent">
          <div className="text-sm text-muted-foreground">No documents sent yet</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DocumentsContent />
    </Suspense>
  )
} 