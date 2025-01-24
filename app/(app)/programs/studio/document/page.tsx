"use client"
import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Upload, File, X, Search, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DocumentDetails {
  files: File[]
}

export default function DocumentPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [document, setDocument] = useState<DocumentDetails>({
    files: []
  })
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === "application/pdf"
    )
    if (files.length > 0) {
      setDocument(prev => ({ files: [...prev.files, ...files] }))
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (files.length > 0) {
      setDocument(prev => ({ files: [...prev.files, ...files] }))
    }
  }

  const handleSave = () => {
    console.log("Saving documents:", document)
    router.push("/studio/audience")
  }

  const removeFile = (index: number) => {
    setDocument(prev => ({
      files: prev.files.filter((_, i) => i !== index)
    }))
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-6 container mx-auto px-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Documents uploaded here are only visible to investors
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search documents..." className="pl-8 w-[250px]" />
          </div>
          <Select>
            <SelectTrigger>
              <Filter className="h-4 w-4" />
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Documents</SelectItem>
              <SelectItem value="pdf">PDF Files</SelectItem>
              <SelectItem value="doc">Word Files</SelectItem>
              <SelectItem value="other">Other Files</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pr-8 space-y-6">
        <div className="space-y-4">
          <Label>Upload Documents</Label>
          <div className="text-xs text-muted-foreground mb-2">
            Upload your documents in PDF format (max 10MB each)
          </div>
          
          <div
            className={cn(
              "border-2 border-dashed rounded-[0.3rem] p-8 transition-colors",
              dragActive ? "border-blue-600 bg-blue-50/50" : "border-border"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-sm font-medium">
                {dragActive ? "Drop your files here" : "Drop your files here or"}
              </div>
              {!dragActive && (
                <Button
                  variant="outline"
                  onClick={handleButtonClick}
                >
                  Choose Files
                </Button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf"
                multiple
                onChange={handleFileChange}
              />
            </div>
          </div>

          {document.files.length > 0 && (
            <div className="space-y-2 pt-4">
              <Label className="text-sm text-muted-foreground">Uploaded Files</Label>
              <div className="space-y-2">
                {document.files.map((file, index) => (
                  <div 
                    key={`${file.name}-${index}`}
                    className="flex items-center gap-2 p-4 border rounded-[0.3rem] bg-muted/50"
                  >
                    <File className="h-4 w-4" />
                    <span className="text-sm flex-1">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 flex justify-center">
          <Button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={document.files.length === 0}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
} 