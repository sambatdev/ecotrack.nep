"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Droplets,
  Wind,
  Thermometer,
  AlertTriangle,
  Mountain,
  CloudRain,
  Bell,
  MapPin,
  Calendar,
  RefreshCw,
  TrendingUp,
  Zap,
} from "lucide-react"
import { fetchNepalWeather } from "@/app/actions/weather"
import { NEPAL_CITIES, NEPAL_PROVINCES, isInNepal } from "@/lib/nepal-utils"
import dynamic from "next/dynamic"
import { Clock } from "lucide-react" // Import Clock component

// Dynamically import Leaflet map to avoid SSR issues
const NepalAlertMap = dynamic(() => import("./nepal-alert-map"), { ssr: false })

interface WeatherData {
  city: string
  cityNepali: string
  temp: number
  condition: string
  humidity: number
  lat: number
  lng: number
}

interface DisasterAlert {
  id: string
  type: "flood" | "landslide" | "earthquake" | "monsoon" | "air-quality"
  severity: "low" | "moderate" | "high" | "critical"
  title: string
  titleNepali: string
  message: string
  messageNepali: string
  location: string
  locationNepali: string
  lat: number
  lng: number
  timestamp: string
  source: string
  affectedDistricts: string[]
}

interface HistoricalEvent {
  id: string
  date: string
  type: string
  title: string
  titleNepali: string
  impact: string
  affectedAreas: string[]
  casualties?: number
  severity: "low" | "moderate" | "high" | "critical"
}

// Sample disaster alerts with Nepal-specific data
const sampleAlerts: DisasterAlert[] = [
  {
    id: "alert-001",
    type: "monsoon",
    severity: "high",
    title: "Heavy Monsoon Rainfall Expected",
    titleNepali: "भारी मनसुनी वर्षाको सम्भावना",
    message: "DHM forecasts heavy rainfall (100-150mm) in next 24 hours. High risk of flash floods in Terai regions.",
    messageNepali: "अर्को २४ घण्टामा भारी वर्षाको सम्भावना। तराई क्षेत्रमा अकस्मात बाढीको उच्च जोखिम।",
    location: "Chitwan",
    locationNepali: "चितवन",
    lat: 27.5291,
    lng: 84.3542,
    timestamp: new Date().toISOString(),
    source: "DHM Nepal",
    affectedDistricts: ["Chitwan", "Nawalparasi", "Makwanpur"],
  },
  {
    id: "alert-002",
    type: "landslide",
    severity: "high",
    title: "Landslide Warning - Hill Districts",
    titleNepali: "पहिरो चेतावनी - पहाडी जिल्लाहरू",
    message: "Continuous rainfall may trigger landslides on highways. Avoid unnecessary travel in mountain areas.",
    messageNepali: "निरन्तर वर्षाले राजमार्गहरूमा पहिरो आउन सक्छ। पहाडी क्षेत्रमा अनावश्यक यात्रा नगर्नुहोस्।",
    location: "Pokhara",
    locationNepali: "पोखरा",
    lat: 28.2096,
    lng: 83.9856,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: "NDRRMA",
    affectedDistricts: ["Kaski", "Syangja", "Parbat"],
  },
  {
    id: "alert-003",
    type: "air-quality",
    severity: "moderate",
    title: "Poor Air Quality Alert",
    titleNepali: "वायु गुणस्तर खराब",
    message: "AQI above 150. Sensitive groups should limit outdoor activities. Wear masks if necessary.",
    messageNepali: "वायु गुणस्तर सूचकांक १५० भन्दा माथि। संवेदनशील समूहले बाहिरी गतिविधि सीमित गर्नुहोस्।",
    location: "Kathmandu",
    locationNepali: "काठमाडौं",
    lat: 27.7172,
    lng: 85.324,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: "DoE Nepal",
    affectedDistricts: ["Kathmandu", "Bhaktapur", "Lalitpur"],
  },
]

// Historical disaster events in Nepal
const historicalEvents: HistoricalEvent[] = [
  {
    id: "hist-001",
    date: "2024-09-28",
    type: "flood",
    title: "September 2024 Floods",
    titleNepali: "सेप्टेम्बर २०२४ बाढी",
    impact: "Severe flooding caused 240+ casualties, displaced thousands across 44 districts during monsoon peak.",
    affectedAreas: ["Kathmandu", "Kavrepalanchok", "Lalitpur", "Dhading"],
    casualties: 244,
    severity: "critical",
  },
  {
    id: "hist-002",
    date: "2023-11-03",
    type: "earthquake",
    title: "Jajarkot Earthquake 6.4M",
    titleNepali: "जाजरकोट भूकम्प ६.४ म्याग्निच्युड",
    impact: "Earthquake centered in Jajarkot killed 153 people and damaged 35,000+ houses in Western Nepal.",
    affectedAreas: ["Jajarkot", "Rukum West", "Salyan"],
    casualties: 153,
    severity: "high",
  },
  {
    id: "hist-003",
    date: "2021-07-30",
    type: "landslide",
    title: "Sindhupalchok Landslides",
    titleNepali: "सिन्धुपाल्चोक पहिरो",
    impact: "Heavy monsoon rains triggered multiple landslides, killing 30+ people and blocking highways.",
    affectedAreas: ["Sindhupalchok", "Melamchi"],
    casualties: 32,
    severity: "high",
  },
  {
    id: "hist-004",
    date: "2017-08-13",
    type: "flood",
    title: "2017 Terai Floods",
    titleNepali: "२०१७ तराई बाढी",
    impact: "Extensive flooding across Terai killed 150+ people and affected over 1.7 million people.",
    affectedAreas: ["Saptari", "Rautahat", "Bara", "Banke"],
    casualties: 151,
    severity: "critical",
  },
  {
    id: "hist-005",
    date: "2015-04-25",
    type: "earthquake",
    title: "Gorkha Earthquake 7.8M",
    titleNepali: "गोर्खा भूकम्प ७.८ म्याग्निच्युड",
    impact: "Devastating earthquake killed 9,000+ people, destroyed 500,000+ homes across central Nepal.",
    affectedAreas: ["Gorkha", "Sindhupalchok", "Kathmandu", "Nuwakot"],
    casualties: 8964,
    severity: "critical",
  },
]

export function AlertsDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [selectedLocation, setSelectedLocation] = useState("Kathmandu")
  const [selectedProvince, setSelectedProvince] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [activeAlerts, setActiveAlerts] = useState<DisasterAlert[]>(sampleAlerts)

  // Load weather data on mount and when location changes
  useEffect(() => {
    loadWeatherData()
    const interval = setInterval(loadWeatherData, 30 * 60 * 1000) // Refresh every 30 minutes
    return () => clearInterval(interval)
  }, [])

  const loadWeatherData = async () => {
    setIsLoading(true)
    try {
      const cities = ["Kathmandu", "Pokhara", "Chitwan", "Biratnagar", "Nepalgunj"]
      const data = await fetchNepalWeather(cities)

      // Validate all data is within Nepal
      const validData = data.filter((d) => isInNepal(d.lat, d.lng))
      if (validData.length !== data.length) {
        console.warn("[v0] Some weather data was outside Nepal and filtered out")
      }

      setWeatherData(validData)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("[v0] Error loading weather:", error)
    }
    setIsLoading(false)
  }

  const filteredAlerts =
    selectedProvince === "all"
      ? activeAlerts
      : activeAlerts.filter((alert) => {
          const city = NEPAL_CITIES.find((c) => c.name === alert.location)
          return city?.province === selectedProvince
        })

  const criticalAlertsCount = activeAlerts.filter((a) => a.severity === "high" || a.severity === "critical").length

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600 text-white"
      case "high":
        return "bg-red-500 text-white"
      case "moderate":
        return "bg-amber-500 text-white"
      case "low":
        return "bg-yellow-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flood":
        return Droplets
      case "landslide":
        return Mountain
      case "monsoon":
        return CloudRain
      case "earthquake":
        return Zap
      case "air-quality":
        return Wind
      default:
        return AlertTriangle
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">Weather & Disaster Alerts Dashboard</h1>
          <p className="text-lg nepali-text text-primary/80">मौसम र विपद् चेतावनी ड्यासबोर्ड</p>
          <p className="text-sm text-muted-foreground mt-2">Real-time weather and disaster monitoring for Nepal</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={loadWeatherData} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
          <div className="text-sm text-muted-foreground text-right">
            <p>Last updated:</p>
            <p className="font-mono">{lastUpdate.toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-red-200 dark:border-red-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-sm nepali-text text-muted-foreground">गम्भीर चेतावनी</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{criticalAlertsCount}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-sm nepali-text text-muted-foreground">सक्रिय चेतावनी</p>
                <p className="text-3xl font-bold text-primary mt-2">{activeAlerts.length}</p>
              </div>
              <Bell className="w-10 h-10 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monitoring Cities</p>
                <p className="text-sm nepali-text text-muted-foreground">निगरानी शहरहरू</p>
                <p className="text-3xl font-bold text-primary mt-2">{weatherData.length}</p>
              </div>
              <MapPin className="w-10 h-10 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Data Sources</p>
                <p className="text-sm nepali-text text-muted-foreground">डाटा स्रोतहरू</p>
                <p className="text-3xl font-bold text-primary mt-2">3</p>
              </div>
              <TrendingUp className="w-10 h-10 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weather" className="space-y-6">
        <TabsList className="bg-card border">
          <TabsTrigger value="weather">
            <Thermometer className="w-4 h-4 mr-2" />
            Weather / मौसम
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Active Alerts / चेतावनी
          </TabsTrigger>
          <TabsTrigger value="history">
            <Calendar className="w-4 h-4 mr-2" />
            Historical / इतिहास
          </TabsTrigger>
          <TabsTrigger value="map">
            <MapPin className="w-4 h-4 mr-2" />
            Map View / नक्सा
          </TabsTrigger>
        </TabsList>

        {/* Weather Tab */}
        <TabsContent value="weather" className="space-y-6">
          <Card className="border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Current Weather Conditions - Nepal</CardTitle>
                <Badge variant="outline">
                  Updated {Math.floor((Date.now() - lastUpdate.getTime()) / 60000)} min ago
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {weatherData.length === 0 ? (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Weather data unavailable. Add OPENWEATHERMAP_API_KEY to enable live weather updates.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {weatherData.map((weather) => (
                    <Card key={weather.city} className="border hover:border-primary/50 transition">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-bold text-lg">{weather.city}</p>
                              <p className="text-sm nepali-text text-muted-foreground">{weather.cityNepali}</p>
                            </div>
                            <Thermometer className="w-6 h-6 text-primary" />
                          </div>

                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-primary">{weather.temp}°</span>
                            <span className="text-muted-foreground">C</span>
                          </div>

                          <div className="space-y-2 pt-2 border-t">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Condition:</span>
                              <span className="font-semibold">{weather.condition}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Humidity:</span>
                              <span className="font-semibold">{weather.humidity}%</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              <span>
                                {weather.lat.toFixed(4)}, {weather.lng.toFixed(4)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-2">Data Sources / डाटा स्रोतहरू:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Department of Hydrology and Meteorology (DHM) - dhm.gov.np</li>
                  <li>• OpenWeatherMap API (Nepal coordinates only: 26-30°N, 80-88°E)</li>
                  <li>• Updates every 30 minutes</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <Select value={selectedProvince} onValueChange={setSelectedProvince}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Filter by Province" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Provinces</SelectItem>
                {NEPAL_PROVINCES.map((province) => (
                  <SelectItem key={province.name} value={province.name}>
                    {province.name} ({province.nepali})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Showing {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const Icon = getTypeIcon(alert.type)
              const timeSince = Math.floor((Date.now() - new Date(alert.timestamp).getTime()) / (60 * 60 * 1000))

              return (
                <Card key={alert.id} className="border-2 hover:border-primary/50 transition">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div
                            className={`p-2 rounded-lg ${alert.severity === "high" || alert.severity === "critical" ? "bg-red-100 dark:bg-red-900/30" : "bg-amber-100 dark:bg-amber-900/30"}`}
                          >
                            <Icon
                              className={`w-6 h-6 ${alert.severity === "high" || alert.severity === "critical" ? "text-red-600" : "text-amber-600"}`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-lg">{alert.title}</h3>
                                <p className="text-sm nepali-text text-muted-foreground">{alert.titleNepali}</p>
                              </div>
                              <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                            </div>

                            <p className="text-sm text-muted-foreground mb-1">{alert.message}</p>
                            <p className="text-sm nepali-text text-muted-foreground mb-3">{alert.messageNepali}</p>

                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span className="font-semibold">{alert.location}</span>
                                <span className="nepali-text text-muted-foreground">({alert.locationNepali})</span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>{timeSince}h ago</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {alert.source}
                              </Badge>
                            </div>

                            {alert.affectedDistricts.length > 0 && (
                              <div className="mt-3 p-3 bg-muted rounded-lg">
                                <p className="text-xs font-semibold mb-1">Affected Districts:</p>
                                <div className="flex flex-wrap gap-2">
                                  {alert.affectedDistricts.map((district) => (
                                    <Badge key={district} variant="secondary" className="text-xs">
                                      {district}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Alert
                        className={
                          alert.severity === "high" || alert.severity === "critical"
                            ? "border-red-200 bg-red-50 dark:bg-red-950/20"
                            : "border-amber-200 bg-amber-50 dark:bg-amber-950/20"
                        }
                      >
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          <span className="font-semibold">Recommended Actions:</span> Monitor DHM bulletins, avoid
                          affected areas, keep emergency supplies ready, follow local authority instructions.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="border bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold mb-2">Stay Informed / सूचित रहनुहोस्</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Subscribe to SMS alerts from NDRRMA (send SMS to 1155)</li>
                    <li>• Follow DHM weather bulletins at dhm.gov.np</li>
                    <li>• Keep Nepal Police emergency number handy: 100</li>
                    <li>• Download BIPAD Portal mobile app for real-time updates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Historical Events Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card className="border">
            <CardHeader>
              <CardTitle>Historical Disaster Timeline - Nepal</CardTitle>
              <p className="text-sm nepali-text text-muted-foreground">नेपालको विपद् इतिहास</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {historicalEvents.map((event, index) => {
                  const Icon = getTypeIcon(event.type)
                  const eventDate = new Date(event.date)

                  return (
                    <div key={event.id} className="relative">
                      {index !== historicalEvents.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />
                      )}

                      <div className="flex gap-4">
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getSeverityColor(event.severity)}`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        <Card className="flex-1 border hover:border-primary/50 transition">
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-bold text-lg">{event.title}</h4>
                                <p className="text-sm nepali-text text-muted-foreground">{event.titleNepali}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold">
                                  {eventDate.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                                <Badge className={`mt-1 ${getSeverityColor(event.severity)}`}>{event.severity}</Badge>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3">{event.impact}</p>

                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              {event.casualties && (
                                <div className="flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold">
                                  <AlertTriangle className="w-4 h-4" />
                                  <span>{event.casualties.toLocaleString()} casualties</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{event.affectedAreas.length} areas affected</span>
                              </div>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {event.affectedAreas.map((area) => (
                                <Badge key={area} variant="outline" className="text-xs">
                                  {area}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-2">Data Sources:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• National Disaster Risk Reduction and Management Authority (NDRRMA)</li>
                  <li>• Open Data Nepal historical datasets</li>
                  <li>• BIPAD Portal (bipadportal.gov.np)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Map View Tab */}
        <TabsContent value="map" className="space-y-6">
          <Card className="border">
            <CardHeader>
              <CardTitle>Nepal Alert Map</CardTitle>
              <p className="text-sm nepali-text text-muted-foreground">नेपाल चेतावनी नक्सा</p>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] rounded-lg overflow-hidden border">
                <NepalAlertMap alerts={activeAlerts} />
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-600" />
                  <span className="text-sm">Critical / High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500" />
                  <span className="text-sm">Moderate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500" />
                  <span className="text-sm">Low</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-600" />
                  <span className="text-sm">Weather Station</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Data Verification Notice */}
      <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <AlertTriangle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-sm">
          <span className="font-semibold">Nepal Data Verification:</span> All location data is validated within Nepal's
          geographic boundaries (26-30°N, 80-88°E). Data sources include DHM, NDRRMA, and verified Nepal-only APIs.
        </AlertDescription>
      </Alert>
    </div>
  )
}
