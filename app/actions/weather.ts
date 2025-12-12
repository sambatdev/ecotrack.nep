"use server"

import { NEPAL_CITIES, isInNepal } from "@/lib/nepal-utils"

interface WeatherData {
  city: string
  cityNepali: string
  temp: number
  condition: string
  humidity: number
  lat: number
  lng: number
}

export async function fetchNepalWeather(cityNames: string[]): Promise<WeatherData[]> {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY

  if (!apiKey) {
    console.error("[v0] OpenWeatherMap API key not configured")
    return []
  }

  const weatherPromises = cityNames.map(async (cityName) => {
    const city = NEPAL_CITIES.find((c) => c.name.toLowerCase() === cityName.toLowerCase())

    if (!city) {
      console.error("[v0] City not found in Nepal cities list:", cityName)
      return null
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&appid=${apiKey}&units=metric`

    try {
      const response = await fetch(url, { next: { revalidate: 1800 } }) // Cache for 30 minutes
      const data = await response.json()

      if (!isInNepal(data.coord.lat, data.coord.lon)) {
        console.error("[v0] API returned non-Nepal coordinates:", data)
        return null
      }

      return {
        city: cityName,
        cityNepali: city.nepali,
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        lat: data.coord.lat,
        lng: data.coord.lon,
      }
    } catch (error) {
      console.error("[v0] Weather API error for", cityName, error)
      return null
    }
  })

  const results = await Promise.all(weatherPromises)
  return results.filter((r): r is WeatherData => r !== null)
}
