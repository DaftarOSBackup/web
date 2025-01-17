"use client"
import { usePathname } from "next/navigation"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearch } from "@/contexts/search-context"

const filterOptions = {
  programs: [
    { value: 'all', label: 'All Programs' },
    { value: 'planning', label: 'Planning' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'open', label: 'Open' },
    { value: 'closed', label: 'Closed' },
  ],
  meetings: [
    { value: 'all', label: 'All Meetings' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ],
  incubation: [
    { value: 'all', label: 'All Programs' },
    { value: 'active', label: 'Active' },
    { value: 'upcoming', label: 'Upcoming' },
  ],
}

const searchPlaceholders = {
  programs: 'Search programs...',
  meetings: 'Search meetings...',
  incubation: 'Search incubation programs...',
}

export function SearchAndFilter() {
  const pathname = usePathname()
  const { searchQuery, setSearchQuery, filterValue, setFilterValue } = useSearch()
  
  // Get the first segment of the path after home
  const segment = pathname.split('/')[1]
  
  // If the current page doesn't have search/filter options, don't render
  if (!filterOptions[segment as keyof typeof filterOptions]) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={searchPlaceholders[segment as keyof typeof searchPlaceholders] || 'Search...'}
          className="pl-8 w-[250px] h-9" 
        />
      </div>
      <Select
        value={filterValue}
        onValueChange={setFilterValue}
      >
        <SelectTrigger className="w-fit gap-2 h-9">
          <Filter className="h-4 w-4" />
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          {filterOptions[segment as keyof typeof filterOptions]?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 