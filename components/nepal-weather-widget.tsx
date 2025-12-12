"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, Sun, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"
import { isInNepal } from "@/lib/nepal-utils"
import { fetchNepalWeather } from "@/app/actions/weather"

interface WeatherData {
  city: string
  cityNepali: string
  temp: number
  condition: string
  humidity: number
  lat: number
  lng: number
}

export default function NepalWeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([
    {
      city: "Kathmandu",
      cityNepali: "काठमाडौं",
      temp: 22,
      condition: "Partly Cloudy",
      humidity: 65,
      lat: 27.7172,
      lng: 85.324,
    },
    { city: "Pokhara", cityNepali: "पोखरा", temp: 24, condition: "Sunny", humidity: 55, lat: 28.2096, lng: 83.9856 },
    { city: "Chitwan", cityNepali: "चितवन", temp: 28, condition: "Humid", humidity: 80, lat: 27.5291, lng: 84.3542 },
  ])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Validate all weather data coordinates are within Nepal
    const invalidData = weatherData.filter((weather) => !isInNepal(weather.lat, weather.lng))

    if (invalidData.length > 0) {
      console.error("[v0] Invalid weather data detected outside Nepal:", invalidData)
      setError("Location error: Non-Nepal data detected")

      // Filter to only Nepal cities
      setWeatherData((prev) => prev.filter((weather) => isInNepal(weather.lat, weather.lng)))
    }
  }, [weatherData])

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true)
      try {
        const nepalCities = ["Kathmandu", "Pokhara", "Chitwan"]
        const data = await fetchNepalWeather(nepalCities)

        if (data.length > 0) {
          setWeatherData(data)
          setError(null)
        }
      } catch (err) {
        console.error("[v0] Failed to fetch weather data:", err)
        setError("Failed to load weather data")
      } finally {
        setLoading(false)
      }
    }

    // Fetch on mount and every 30 minutes
    loadWeather()
    const interval = setInterval(loadWeather, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (condition: string) => {
    if (condition.includes("Rain")) return <CloudRain className="w-6 h-6 text-secondary" />
    if (condition.includes("Cloud")) return <Cloud className="w-6 h-6 text-muted-foreground" />
    return <Sun className="w-6 h-6 text-primary" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Nepal Weather
          <span className="block text-sm nepali-text text-muted-foreground">नेपालको मौसम</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}
        <div className="space-y-4">
          {weatherData.map((weather, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                {getWeatherIcon(weather.condition)}
                <div>
                  <p className="font-semibold">{weather.city}</p>
                  <p className="text-xs nepali-text text-muted-foreground">{weather.cityNepali}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{weather.temp}°C</p>
                <p className="text-xs text-muted-foreground">{weather.humidity}% humidity</p>
              </div>
            </div>
          ))}
          {loading && <p className="text-xs text-center text-muted-foreground">Updating weather data...</p>}
        </div>
        <p className="text-xs text-muted-foreground mt-4 italic">
          Data source: Department of Hydrology & Meteorology (DHM), Nepal
        </p>
      </CardContent>
    </Card>
  )
}
