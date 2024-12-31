import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const programStatus = {
  planning: [
    {
      title: "Green Energy Initiative",
      postedby: "John Doe",
      status: "Planning",
    },
    {
      title: "Healthcare Tech Fund",
      postedby: "Sarah Johnson",
      status: "Planning",
    },
  ],
  scheduled: [
    {
      title: "AI Ventures",
      postedby: "John Doe",
      status: "Scheduled",
    },
  ],
  open: [
    {
      title: "Tech Startup Fund",
      postedby: "John Doe",
      status: "Open",
    },
    {
      title: "Real Estate Growth",
      postedby: "John Doe",
      status: "Open",
    },
  ],
  closed: [
    {
      title: "Fintech Innovation",
      postedby: "John Doe",
      status: "Closed",
    },
  ],
}

export default function ProgramsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search programs..." 
              className="pl-8 w-[200px] h-9 text-sm" 
            />
          </div>
          <Select>
            <SelectTrigger className="h-9 text-sm">
              <Filter className="h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Link href="/studio/details">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-9 text-white">
              New Program
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Planning Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Planning</h2>
            <Badge variant="secondary" className="text-xs">
              {programStatus.planning.length}
            </Badge>
          </div>
          <div className="space-y-3">
            {programStatus.planning.map((program) => (
              <Link
                key={program.title}
                href={`/programs/${program.title.toLowerCase().replace(/ /g, '-')}`}
              >
                <div className="p-3 rounded-[0.3rem] bg-card border shadow-sm mt-2 cursor-pointer hover:border-blue-600">
                  <h3 className="font-medium text-sm">{program.title}</h3>
                  <p className="text-sm text-muted-foreground">{program.postedby}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scheduled Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Scheduled</h2>
            <Badge variant="secondary" className="text-xs">
              {programStatus.scheduled.length}
            </Badge>
          </div>
          <div className="space-y-3">
            {programStatus.scheduled.map((program) => (
              <Link
                key={program.title}
                href={`/programs/${program.title.toLowerCase().replace(/ /g, '-')}`}
              >
                <div className="p-3 rounded-[0.3rem] bg-card border shadow-sm mt-2 cursor-pointer hover:border-blue-600">
                  <h3 className="font-medium text-sm">{program.title}</h3>
                  <p className="text-sm text-muted-foreground">{program.postedby}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Open Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Open</h2>
            <Badge variant="secondary" className="text-xs">
              {programStatus.open.length}
            </Badge>
          </div>
          <div className="space-y-3">
            {programStatus.open.map((program) => (
              <Link
                key={program.title}
                href={`/programs/${program.title.toLowerCase().replace(/ /g, '-')}`}
              >
                <div className="p-3 rounded-[0.3rem] bg-card border shadow-sm mt-2 cursor-pointer hover:border-blue-600">
                  <h3 className="font-medium text-sm">{program.title}</h3>
                  <p className="text-sm text-muted-foreground">{program.postedby}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Closed Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Closed</h2>
            <Badge variant="secondary" className="text-xs">
              {programStatus.closed.length}
            </Badge>
          </div>
          <div className="space-y-3">
            {programStatus.closed.map((program) => (
              <Link
                key={program.title}
                href={`/programs/${program.title.toLowerCase().replace(/ /g, '-')}`}
              >
                <div className="p-3 rounded-[0.3rem] bg-card border shadow-sm mt-2 cursor-pointer hover:border-blue-600">
                  <h3 className="font-medium text-sm">{program.title}</h3>
                  <p className="text-sm text-muted-foreground">{program.postedby}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 