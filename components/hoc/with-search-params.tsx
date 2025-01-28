"use client"
import { Suspense } from "react"
import { Loading } from "@/components/loading"

export function withSearchParams<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithSearchParamsWrapper(props: P) {
    return (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    )
  }
} 