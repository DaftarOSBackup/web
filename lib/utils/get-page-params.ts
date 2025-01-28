"use client"

export function getPageParams() {
  if (typeof window === 'undefined') return {}
  
  const url = new URL(window.location.href)
  const mode = url.searchParams.get('mode')
  const programId = url.searchParams.get('programId')
  
  return {
    mode,
    programId
  }
} 