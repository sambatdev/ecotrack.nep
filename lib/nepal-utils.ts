// Nepal Geographic Boundaries and Validation Utilities

// Nepal's geographic boundaries
export const NEPAL_BOUNDS = {
  minLat: 26.347,
  maxLat: 30.447,
  minLng: 80.056,
  maxLng: 88.201,
}

// Nepal Time Zone
export const NEPAL_TIMEZONE = "Asia/Kathmandu" // UTC+5:45

// Validate if coordinates are within Nepal
export function isInNepal(lat: number, lng: number): boolean {
  return (
    lat >= NEPAL_BOUNDS.minLat && lat <= NEPAL_BOUNDS.maxLat && lng >= NEPAL_BOUNDS.minLng && lng <= NEPAL_BOUNDS.maxLng
  )
}

// Major Nepali cities with coordinates (for validation and autocomplete)
export const NEPAL_CITIES = [
  { name: "Kathmandu", nepali: "काठमाडौं", lat: 27.7172, lng: 85.324, province: "Bagmati" },
  { name: "Pokhara", nepali: "पोखरा", lat: 28.2096, lng: 83.9856, province: "Gandaki" },
  { name: "Lalitpur", nepali: "ललितपुर", lat: 27.6667, lng: 85.3333, province: "Bagmati" },
  { name: "Biratnagar", nepali: "विराटनगर", lat: 26.4525, lng: 87.2718, province: "Koshi" },
  { name: "Bharatpur", nepali: "भरतपुर", lat: 27.6774, lng: 84.4354, province: "Bagmati" },
  { name: "Dharan", nepali: "धरान", lat: 26.8121, lng: 87.2823, province: "Koshi" },
  { name: "Butwal", nepali: "बुटवल", lat: 27.7006, lng: 83.4479, province: "Lumbini" },
  { name: "Hetauda", nepali: "हेटौडा", lat: 27.4281, lng: 85.0326, province: "Bagmati" },
  { name: "Nepalgunj", nepali: "नेपालगंज", lat: 28.0498, lng: 81.6169, province: "Lumbini" },
  { name: "Dhangadhi", nepali: "धनगढी", lat: 28.7049, lng: 80.5884, province: "Sudurpashchim" },
  { name: "Itahari", nepali: "इटहरी", lat: 26.6655, lng: 87.2847, province: "Koshi" },
  { name: "Janakpur", nepali: "जनकपुर", lat: 26.7288, lng: 85.9244, province: "Madhesh" },
  { name: "Birtamod", nepali: "बिर्तामोड", lat: 26.6711, lng: 87.9761, province: "Koshi" },
  { name: "Tulsipur", nepali: "तुलसीपुर", lat: 28.1302, lng: 82.2932, province: "Lumbini" },
  { name: "Chitwan", nepali: "चितवन", lat: 27.5291, lng: 84.3542, province: "Bagmati" },
] as const

// Nepal provinces
export const NEPAL_PROVINCES = [
  { name: "Koshi", nepali: "कोशी प्रदेश" },
  { name: "Madhesh", nepali: "मधेश प्रदेश" },
  { name: "Bagmati", nepali: "बागमती प्रदेश" },
  { name: "Gandaki", nepali: "गण्डकी प्रदेश" },
  { name: "Lumbini", nepali: "लुम्बिनी प्रदेश" },
  { name: "Karnali", nepali: "कर्णाली प्रदेश" },
  { name: "Sudurpashchim", nepali: "सुदूरपश्चिम प्रदेश" },
] as const

// Filter and validate location data to ensure it's within Nepal
export function validateNepalLocation(data: any): boolean {
  if (!data) return false

  // Check if location has coordinates
  if (data.lat && data.lng) {
    return isInNepal(data.lat, data.lng)
  }

  // Check if location name is in Nepal cities list
  if (data.name || data.city) {
    const locationName = (data.name || data.city).toLowerCase()
    return NEPAL_CITIES.some((city) => city.name.toLowerCase() === locationName || city.nepali === locationName)
  }

  return false
}

// Get nearest Nepal city from coordinates
export function getNearestNepalCity(lat: number, lng: number) {
  if (!isInNepal(lat, lng)) {
    console.warn("[v0] Coordinates outside Nepal bounds:", { lat, lng })
    return null
  }

  let nearestCity = NEPAL_CITIES[0]
  let minDistance = Number.POSITIVE_INFINITY

  for (const city of NEPAL_CITIES) {
    const distance = Math.sqrt(Math.pow(city.lat - lat, 2) + Math.pow(city.lng - lng, 2))
    if (distance < minDistance) {
      minDistance = distance
      nearestCity = city
    }
  }

  return nearestCity
}

// Format OpenWeatherMap API URL for Nepal cities only
export function getNepalWeatherUrl(cityName: string, apiKey: string): string {
  const city = NEPAL_CITIES.find((c) => c.name.toLowerCase() === cityName.toLowerCase())

  if (!city) {
    console.error("[v0] City not found in Nepal cities list:", cityName)
    return ""
  }

  // Use coordinates to ensure we get Nepal data
  return `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&appid=${apiKey}&units=metric`
}

// Nepal-specific disaster types (including monsoon)
export const NEPAL_DISASTER_TYPES = [
  { type: "flood", nepali: "बाढी", common: true },
  { type: "landslide", nepali: "पहिरो", common: true },
  { type: "earthquake", nepali: "भूकम्प", common: true },
  { type: "monsoon", nepali: "मनसुन", common: true },
  { type: "drought", nepali: "खडेरी", common: false },
  { type: "avalanche", nepali: "हिमपहिरो", common: false },
  { type: "glacial-lake-outburst", nepali: "हिमताल विस्फोट", common: false },
] as const

// Validate and get Nepal time
export function getNepalTime(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: NEPAL_TIMEZONE }))
}
