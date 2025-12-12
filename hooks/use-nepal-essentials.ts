"use client"

import { useState, useEffect } from "react"

export function useNepalData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  refreshInterval = 30 * 60 * 1000, // 30 minutes
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    let isMounted = true
    let intervalId: NodeJS.Timeout | null = null

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchFn()

        if (!isMounted) return

        setData(result)
        setLastUpdated(new Date())

        // Cache to localStorage for offline access
        if (typeof window !== "undefined") {
          localStorage.setItem(key, JSON.stringify({ data: result, timestamp: Date.now() }))
        }
      } catch (err) {
        if (!isMounted) return

        setError(err instanceof Error ? err.message : "Failed to fetch data")

        // Try to load from cache on error
        if (typeof window !== "undefined") {
          const cached = localStorage.getItem(key)
          if (cached) {
            try {
              const { data: cachedData, timestamp } = JSON.parse(cached)
              setData(cachedData)
              setLastUpdated(new Date(timestamp))
            } catch (parseError) {
              console.error("[v0] Failed to parse cached data:", parseError)
            }
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    // Load from cache first
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(key)
      if (cached) {
        try {
          const { data: cachedData, timestamp } = JSON.parse(cached)
          setData(cachedData)
          setLastUpdated(new Date(timestamp))
          setLoading(false)
        } catch (parseError) {
          console.error("[v0] Failed to parse cached data:", parseError)
        }
      }
    }

    // Fetch fresh data
    fetchData()

    // Set up auto-refresh
    intervalId = setInterval(fetchData, refreshInterval)

    return () => {
      isMounted = false
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, refreshInterval])

  const refresh = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFn()
      setData(result)
      setLastUpdated(new Date())

      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify({ data: result, timestamp: Date.now() }))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, lastUpdated, refresh }
}
