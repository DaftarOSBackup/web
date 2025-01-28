"use client"
import { useState, useEffect } from 'react'

interface UrlParams {
  mode: string | null
  programId: string | null
}

export function useUrlParams(): UrlParams {
  const [params, setParams] = useState<UrlParams>({ mode: null, programId: null })

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setParams({
      mode: searchParams.get('mode'),
      programId: searchParams.get('programId')
    })
  }, [])

  return params
} 