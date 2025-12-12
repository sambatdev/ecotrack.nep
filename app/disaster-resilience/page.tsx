"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Cloud, Droplets, Wind, Zap, AlertTriangle, Map, Clock, CheckCircle, TrendingUp } from "lucide-react"

const alerts = [
  {
    type: "flood",
    title: "Flood Risk",
    severity: "high",
    message: "Heavy rainfall expected in your area with 40% chance of flooding.",
    location: "San Francisco, CA",
    icon: Droplets,
  },
  {
    type: "wildfire",
    title: "Air Quality Alert",
    severity: "moderate",
    message: "Smoke from nearby wildfires affecting air quality.",
    location: "San Francisco, CA",
    icon: Wind,
  },
  {
    type: "hurricane",
    title: "Storm Warning",
    severity: "low",
    message: "Tropical storm forming 500 miles away. Monitor updates.",
    location: "Pacific Ocean",
    icon: Cloud,
  },
]

const preparationChecklists = {
  flood: [
    "Create emergency contact list",
    "Prepare evacuation route",
    "Stock emergency supplies (water, food)",
    "Secure important documents",
    "Install battery backup for essentials",
    "Check home insurance coverage",
  ],
  wildfire: [
    "Clear leaves and branches from roof",
    "Maintain 30-feet firebreak around house",
    "Use fire-resistant landscaping",
    "Install metal gutters",
    "Have evacuation plan ready",
    "Prepare go-bag with essentials",
  ],
  hurricane: [
    "Secure outdoor furniture",
    "Reinforce doors and windows",
    "Stock supplies (3 weeks)",
    "Fill bathtub for emergency water",
    "Know evacuation zones",
    "Update emergency contacts",
  ],
}

const scenarioData = [
  { level: 0.5, impact: "Minor flooding in low areas" },
  { level: 1.0, impact: "Significant flooding in urban areas" },
  { level: 1.5, impact: "Widespread flooding, evacuations likely" },
  { level: 2.0, impact: "Catastrophic flooding, major infrastructure damage" },
]

const communityTips = [
  {
    author: "Sarah M.",
    tip: "Install a sump pump before flood season starts. Saved my basement!",
    likes: 234,
  },
  {
    author: "Marcus L.",
    tip: "Create an emergency fund specifically for disaster recovery. Helped after the wildfire.",
    likes: 189,
  },
  {
    author: "Emma T.",
    tip: "Document your home and possessions with photos for insurance claims.",
    likes: 445,
  },
]

export default function DisasterResilience() {
  const [activeAlert, setActiveAlert] = useState(0)
  const [selectedPrep, setSelectedPrep] = useState("flood")
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean[]>>({
    flood: preparationChecklists.flood.map(() => false),
    wildfire: preparationChecklists.wildfire.map(() => false),
    hurricane: preparationChecklists.hurricane.map(() => false),
  })
  const [seaLevelRise, setSeaLevelRise] = useState(1)

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Disaster Resilience & Preparedness</h1>
          <p className="text-muted-foreground">
            Monitor extreme weather alerts, prepare for disasters, and access community resilience tips.
          </p>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="bg-card border">
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
            <TabsTrigger value="prep">Preparation</TabsTrigger>
            <TabsTrigger value="scenario">Scenario Planner</TabsTrigger>
            <TabsTrigger value="community">Community Tips</TabsTrigger>
          </TabsList>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            {/* Alert Summary */}
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
                    <p className="font-semibold">{alert.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.location}</p>
                  </button>
                )
              })}
            </div>

            {/* Detailed Alert */}
            <Card className="border">
              <CardHeader className="border-b">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <AlertIcon className="w-6 h-6 text-red-500 mt-1" />
                    <div>
                      <CardTitle>{currentAlert.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{currentAlert.location}</p>
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
                  <p className="font-semibold text-sm">Recommended Actions:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-primary">→</span>
                      <span>Enable push notifications for real-time updates</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">→</span>
                      <span>
                        Review your{" "}
                        {currentAlert.type === "flood"
                          ? "flood"
                          : currentAlert.type === "wildfire"
                            ? "wildfire"
                            : "storm"}{" "}
                        preparation checklist
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">→</span>
                      <span>Contact local emergency management for latest guidance</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-card border rounded-lg text-center">
                    <Clock className="w-5 h-5 text-secondary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Update Frequency</p>
                    <p className="font-semibold">Every 1 hour</p>
                  </div>
                  <div className="p-3 bg-card border rounded-lg text-center">
                    <TrendingUp className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Trend</p>
                    <p className="font-semibold">Intensifying</p>
                  </div>
                  <div className="p-3 bg-card border rounded-lg text-center">
                    <Map className="w-5 h-5 text-secondary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Coverage</p>
                    <p className="font-semibold">5 mile radius</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preparation Tab */}
          <TabsContent value="prep" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Scenario Selector */}
              <div>
                <Card className="border sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-sm">Select Scenario</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {["flood", "wildfire", "hurricane"].map((scenario) => (
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
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Checklist */}
              <div className="lg:col-span-2">
                <Card className="border">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="capitalize">{selectedPrep} Preparation Checklist</CardTitle>
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
                      Great job! You've completed all preparation steps for {selectedPrep}. You're well-prepared!
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Scenario Planner Tab */}
          <TabsContent value="scenario" className="space-y-6">
            <Card className="border">
              <CardHeader>
                <CardTitle>Sea Level Rise Scenario Planner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold">Sea Level Rise Projection</label>
                    <span className="font-bold text-primary">{seaLevelRise.toFixed(1)} meters</span>
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
                          <p className="font-semibold">{scenario.level}m Rise Scenario</p>
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
                    This scenario planner helps you understand potential impacts. Consult local climate studies for
                    accurate projections for your area.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Tips Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="space-y-4">
              {communityTips.map((tip, idx) => (
                <Card key={idx} className="border hover:border-primary/50 transition">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <p className="font-semibold">{tip.author}</p>
                      <span className="text-xs px-2 py-1 bg-muted rounded">Community</span>
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
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Help others prepare by sharing your disaster preparedness experiences and tips.
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
