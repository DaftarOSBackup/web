"use client"
import { useEffect, useState } from "react"

interface PageParams {
  mode: string | null
  programId: string | null
}

export function usePageParams(): PageParams {
  const [params, setParams] = useState<PageParams>({ mode: null, programId: null })

  useEffect(() => {
    const url = new URL(window.location.href)
    setParams({
      mode: url.searchParams.get('mode'),
      programId: url.searchParams.get('programId')
    })
  }, [])

  return params
} 