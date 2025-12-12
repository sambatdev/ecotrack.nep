"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Droplets, Wind, Zap, AlertTriangle, Map, Clock, CheckCircle, TrendingUp, Mountain } from "lucide-react"
import { NEPAL_DISASTER_TYPES, isInNepal } from "@/lib/nepal-utils"

const alerts = [
  {
    type: "flood",
    title: "Monsoon Flood Risk / मनसुन बाढी जोखिम",
    severity: "high",
    message: "Heavy monsoon rainfall expected in Terai region with 60% chance of flooding in low-lying areas.",
    location: "Chitwan, Nepal",
    locationNepali: "चितवन, नेपाल",
    lat: 27.5291,
    lng: 84.3542,
    icon: Droplets,
  },
  {
    type: "landslide",
    title: "Landslide Warning / पहिरो चेतावनी",
    severity: "high",
    message: "Heavy rainfall may trigger landslides in hilly regions. Exercise caution on mountain roads.",
    location: "Pokhara, Nepal",
    locationNepali: "पोखरा, नेपाल",
    lat: 28.2096,
    lng: 83.9856,
    icon: Mountain,
  },
  {
    type: "air-quality",
    title: "Air Quality Alert / वायु गुणस्तर चेतावनी",
    severity: "moderate",
    message: "Elevated pollution levels in Kathmandu Valley. Limit outdoor activities for sensitive groups.",
    location: "Kathmandu, Nepal",
    locationNepali: "काठमाडौं, नेपाल",
    lat: 27.7172,
    lng: 85.324,
    icon: Wind,
  },
]

const preparationChecklists = {
  flood: [
    "Create emergency contact list with local authorities",
    "Identify elevated evacuation routes",
    "Stock emergency supplies (water, food for 1 week)",
    "Secure important documents in waterproof container",
    "Prepare emergency lighting (candles, batteries)",
    "Know location of nearest relief camp",
  ],
  landslide: [
    "Monitor weather forecasts during monsoon",
    "Identify safe areas away from slopes",
    "Clear drainage channels around home",
    "Avoid building on steep slopes",
    "Watch for warning signs (cracks, tilting trees)",
    "Keep emergency kit ready",
  ],
  earthquake: [
    "Identify safe spots in each room (under tables)",
    "Secure heavy furniture and objects",
    "Keep emergency supplies accessible",
    "Practice drop, cover, and hold on",
    "Know your building's evacuation plan",
    "Learn basic first aid",
  ],
  monsoon: [
    "Check roof and drainage systems",
    "Store adequate drinking water",
    "Keep monsoon health kit ready",
    "Avoid waterlogged areas",
    "Monitor DHM weather bulletins",
    "Prepare for power outages",
  ],
}

const scenarioData = [
  { level: 0.5, impact: "Increased monsoon flooding in Terai plains, affecting Chitwan and Janakpur areas" },
  { level: 1.0, impact: "Significant Terai flooding, glacial lake concerns in Himalayan region" },
  { level: 1.5, impact: "Major displacement in Terai, infrastructure damage, increased landslide risk" },
  { level: 2.0, impact: "Catastrophic impact on Terai agriculture, severe Himalayan glacial melt" },
]

const communityTips = [
  {
    author: "Rajesh K. (Kathmandu)",
    authorNepali: "राजेश के. (काठमाडौं)",
    tip: "During monsoon, always keep emergency numbers of local ward office and Nepal Police handy.",
    likes: 234,
  },
  {
    author: "Sunita T. (Pokhara)",
    authorNepali: "सुनिता टी. (पोखरा)",
    tip: "Create a family communication plan. Network towers often fail during disasters in mountain areas.",
    likes: 189,
  },
  {
    author: "Binod M. (Chitwan)",
    authorNepali: "बिनोद एम. (चितवन)",
    tip: "Stock oral rehydration solution (ORS) packets. Water-borne diseases spike during floods in Terai.",
    likes: 445,
  },
]

export default function DisasterResilience() {
  const [activeAlert, setActiveAlert] = useState(0)
  const [selectedPrep, setSelectedPrep] = useState("flood")
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean[]>>({
    flood: preparationChecklists.flood.map(() => false),
    landslide: preparationChecklists.landslide.map(() => false),
    earthquake: preparationChecklists.earthquake.map(() => false),
    monsoon: preparationChecklists.monsoon.map(() => false),
  })
  const [seaLevelRise, setSeaLevelRise] = useState(1)

  useEffect(() => {
    const invalidAlerts = alerts.filter((alert) => !isInNepal(alert.lat, alert.lng))

    if (invalidAlerts.length > 0) {
      console.error("[v0] Invalid alert locations detected outside Nepal:", invalidAlerts)
    }

    const current = alerts[activeAlert]
    if (current && !isInNepal(current.lat, current.lng)) {
      console.error("[v0] Active alert outside Nepal:", current)
      const validIndex = alerts.findIndex((a) => isInNepal(a.lat, a.lng))
      if (validIndex !== -1) {
        setActiveAlert(validIndex)
      }
    }
  }, [activeAlert])

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [selectedPrep]: prev[selectedPrep].map((v, i) => (i === index ? !v : v)),
    }))
  }

  const prepProgress = (checkedItems[selectedPrep] || []).filter(Boolean).length
  const totalPreps = preparationChecklists[selectedPrep as keyof typeof preparationChecklists].length
  const progressPercent = (prepProgress / totalPreps) * 100

  const currentAlert = alerts[activeAlert]
  const AlertIcon = currentAlert.icon

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Disaster Resilience & Preparedness</h1>
          <p className="nepali-text text-lg text-primary/80 mb-2">विपद् लचीलापन र तयारी</p>
          <p className="text-muted-foreground">
            Monitor Nepal-specific disaster alerts, prepare for monsoon and earthquakes, access community resilience
            tips.
          </p>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="bg-card border">
            <TabsTrigger value="alerts">Active Alerts / सक्रिय चेतावनी</TabsTrigger>
            <TabsTrigger value="prep">Preparation / तयारी</TabsTrigger>
            <TabsTrigger value="scenario">Scenario Planner</TabsTrigger>
            <TabsTrigger value="community">Community Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {alerts.map((alert, idx) => {
                const Icon = alert.icon
                const isActive = idx === activeAlert
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveAlert(idx)}
                    className={`text-left p-4 rounded-lg border transition ${
                      isActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Icon
                        className={`w-5 h-5 ${alert.severity === "high" ? "text-red-500" : alert.severity === "moderate" ? "text-amber-500" : "text-yellow-500"}`}
                      />
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          alert.severity === "high"
                            ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                            : alert.severity === "moderate"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="font-semibold text-sm mb-1">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.location}</p>
                    <p className="text-xs nepali-text text-muted-foreground">{alert.locationNepali}</p>
                  </button>
                )
              })}
            </div>

            <Card className="border">
              <CardHeader className="border-b">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <AlertIcon className="w-6 h-6 text-red-500 mt-1" />
                    <div>
                      <CardTitle>{currentAlert.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{currentAlert.location}</p>
                      <p className="text-xs nepali-text text-muted-foreground">{currentAlert.locationNepali}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      currentAlert.severity === "high"
                        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                        : currentAlert.severity === "moderate"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {currentAlert.severity.toUpperCase()}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription>{currentAlert.message}</AlertDescription>
                </Alert>

                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <p className="font-semibold text-sm">Recommended Actions / सिफारिस गरिएका कार्यहरू:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-primary">→</span>
                      <span>Monitor DHM (dhm.gov.np) for real-time updates</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">→</span>
                      <span>Review your {currentAlert.type} preparation checklist</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">→</span>
                      <span>Contact local ward office or Nepal Police (100) for guidance</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">→</span>
                      <span>Share alert with neighbors in your community</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-card border rounded-lg text-center">
                    <Clock className="w-5 h-5 text-secondary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Update Frequency</p>
                    <p className="font-semibold">Every 3 hours</p>
                  </div>
                  <div className="p-3 bg-card border rounded-lg text-center">
                    <TrendingUp className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Trend</p>
                    <p className="font-semibold">Monsoon Peak</p>
                  </div>
                  <div className="p-3 bg-card border rounded-lg text-center">
                    <Map className="w-5 h-5 text-secondary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Coverage</p>
                    <p className="font-semibold">Province-wide</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground italic">
                  Alert verified within Nepal boundaries (Lat: {currentAlert.lat.toFixed(4)}, Lng:{" "}
                  {currentAlert.lng.toFixed(4)})
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prep" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <Card className="border sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-sm">Select Disaster Type</CardTitle>
                    <p className="text-xs nepali-text text-muted-foreground">विपद प्रकार चयन गर्नुहोस्</p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {["flood", "landslide", "earthquake", "monsoon"].map((scenario) => {
                      const disasterType = NEPAL_DISASTER_TYPES.find((d) => d.type === scenario)
                      return (
                        <button
                          key={scenario}
                          onClick={() => setSelectedPrep(scenario)}
                          className={`w-full text-left p-3 rounded border transition ${
                            selectedPrep === scenario
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <p className="font-semibold capitalize text-sm">{scenario}</p>
                          {disasterType && (
                            <p className="text-xs nepali-text text-muted-foreground">{disasterType.nepali}</p>
                          )}
                        </button>
                      )
                    })}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="border">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <CardTitle className="capitalize">{selectedPrep} Preparation Checklist</CardTitle>
                        {NEPAL_DISASTER_TYPES.find((d) => d.type === selectedPrep) && (
                          <p className="text-sm nepali-text text-muted-foreground mt-1">
                            {NEPAL_DISASTER_TYPES.find((d) => d.type === selectedPrep)?.nepali} तयारी सूची
                          </p>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        {prepProgress}/{totalPreps}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {preparationChecklists[selectedPrep as keyof typeof preparationChecklists].map((item, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-3 p-3 hover:bg-muted rounded transition cursor-pointer"
                      >
                        <Checkbox
                          checked={checkedItems[selectedPrep]?.[idx] || false}
                          onCheckedChange={() => toggleCheck(idx)}
                        />
                        <span className={checkedItems[selectedPrep]?.[idx] ? "line-through text-muted-foreground" : ""}>
                          {item}
                        </span>
                      </label>
                    ))}
                  </CardContent>
                </Card>

                {progressPercent === 100 && (
                  <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20 mt-4">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700 dark:text-green-200">
                      Great job! You've completed all preparation steps for {selectedPrep}. तपाईं राम्रोसँग तयार हुनुभयो!
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scenario" className="space-y-6">
            <Card className="border">
              <CardHeader>
                <CardTitle>Climate Impact Scenario Planner for Nepal</CardTitle>
                <p className="text-sm nepali-text text-muted-foreground">नेपालको लागि जलवायु प्रभाव परिदृश्य योजनाकार</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold">Temperature Rise Projection (°C)</label>
                    <span className="font-bold text-primary">{seaLevelRise.toFixed(1)}°C</span>
                  </div>
                  <Slider
                    value={[seaLevelRise]}
                    onValueChange={(v) => setSeaLevelRise(v[0])}
                    min={0.5}
                    max={2.5}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  {scenarioData.map((scenario, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border transition ${
                        Math.abs(scenario.level - seaLevelRise) < 0.15
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{scenario.level}°C Rise Scenario</p>
                          <p className="text-sm text-muted-foreground mt-1">{scenario.impact}</p>
                        </div>
                        {Math.abs(scenario.level - seaLevelRise) < 0.15 && (
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    This scenario planner is based on Nepal-specific climate studies. Data sourced from Nepal Climate
                    Change Knowledge Management Center and DHM.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="space-y-4">
              {communityTips.map((tip, idx) => (
                <Card key={idx} className="border hover:border-primary/50 transition">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{tip.author}</p>
                        <p className="text-xs nepali-text text-muted-foreground">{tip.authorNepali}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-muted rounded">Nepal Community</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{tip.tip}</p>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Zap className="w-4 h-4" />
                      Helpful ({tip.likes})
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border bg-gradient-to-br from-primary/10 to-transparent">
              <CardHeader>
                <CardTitle>Share Your Resilience Tips</CardTitle>
                <p className="text-sm nepali-text text-primary/80">आफ्नो लचीलापन सुझावहरू साझा गर्नुहोस्</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Help fellow Nepalis prepare by sharing your disaster preparedness experiences and tips.
                </p>
                <Button className="bg-primary hover:bg-primary/90">Submit Your Tip</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
