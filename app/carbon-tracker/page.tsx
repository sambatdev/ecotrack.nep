"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Calendar, TrendingDown, Check } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const carbonCalculations = {
  travel: { unit: "miles/week", factor: 0.41 },
  diet: { unit: "meals/week", factor: 0.5 },
  energy: { unit: "kWh/month", factor: 0.92 },
  waste: { unit: "lbs/week", factor: 0.1 },
}

const reductionTips = [
  { title: "Switch to EV", savings: 2.1, category: "travel" },
  { title: "Use Public Transit", savings: 1.5, category: "travel" },
  { title: "Go Vegetarian", savings: 0.8, category: "diet" },
  { title: "Solar Panels", savings: 2.4, category: "energy" },
  { title: "Recycle More", savings: 0.3, category: "waste" },
]

const dailyLogsData = [
  { date: "Day 1", emissions: 3.2 },
  { date: "Day 2", emissions: 3.1 },
  { date: "Day 3", emissions: 2.9 },
  { date: "Day 4", emissions: 3.0 },
  { date: "Day 5", emissions: 2.7 },
  { date: "Day 6", emissions: 2.8 },
  { date: "Day 7", emissions: 2.6 },
]

interface TrackerState {
  travel: string
  diet: string
  energy: string
  waste: string
}

export default function CarbonTracker() {
  const [formData, setFormData] = useState<TrackerState>({
    travel: "",
    diet: "",
    energy: "",
    waste: "",
  })

  const [adoptedTips, setAdoptedTips] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("calculator")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const calculateEmissions = () => {
    let total = 0
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        const numValue = Number.parseFloat(value)
        total += numValue * carbonCalculations[key as keyof typeof carbonCalculations].factor
      }
    })
    return total.toFixed(2)
  }

  const toggleTipAdoption = (tip: string) => {
    setAdoptedTips((prev) => (prev.includes(tip) ? prev.filter((t) => t !== tip) : [...prev, tip]))
  }

  const currentEmissions = calculateEmissions()

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Carbon Footprint Tracker</h1>
          <p className="text-muted-foreground">Calculate and track your carbon emissions with precision.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="tips">Reduction Tips</TabsTrigger>
          </TabsList>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Input Form */}
              <div className="lg:col-span-2">
                <Card className="border">
                  <CardHeader>
                    <CardTitle>Calculate Your Emissions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Travel */}
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-foreground">Travel (miles per week)</label>
                      <Input
                        type="number"
                        name="travel"
                        placeholder="e.g., 150"
                        value={formData.travel}
                        onChange={handleInputChange}
                        className="border bg-card"
                      />
                      <p className="text-xs text-muted-foreground">
                        ℹ️ Based on average car emissions: 0.41 kg CO₂ per mile
                      </p>
                    </div>

                    {/* Diet */}
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-foreground">Meat Meals (per week)</label>
                      <Input
                        type="number"
                        name="diet"
                        placeholder="e.g., 10"
                        value={formData.diet}
                        onChange={handleInputChange}
                        className="border bg-card"
                      />
                      <p className="text-xs text-muted-foreground">ℹ️ Beef produces ~0.5 kg CO₂e per meal</p>
                    </div>

                    {/* Energy */}
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-foreground">
                        Home Energy Use (kWh per month)
                      </label>
                      <Input
                        type="number"
                        name="energy"
                        placeholder="e.g., 600"
                        value={formData.energy}
                        onChange={handleInputChange}
                        className="border bg-card"
                      />
                      <p className="text-xs text-muted-foreground">ℹ️ US average grid: 0.92 kg CO₂ per kWh</p>
                    </div>

                    {/* Waste */}
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-foreground">Waste (lbs per week)</label>
                      <Input
                        type="number"
                        name="waste"
                        placeholder="e.g., 15"
                        value={formData.waste}
                        onChange={handleInputChange}
                        className="border bg-card"
                      />
                      <p className="text-xs text-muted-foreground">ℹ️ Waste to landfill: 0.1 kg CO₂e per lb</p>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 gap-2">
                      <Plus className="w-4 h-4" />
                      Save Entry
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Results Card */}
              <div>
                <Card className="border bg-gradient-to-br from-primary/10 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-sm text-muted-foreground">Estimated Weekly Emissions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-5xl font-bold text-primary">{currentEmissions}</p>
                      <p className="text-sm text-muted-foreground mt-2">kg CO₂e per week</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">Breakdown:</p>
                      {Object.entries(formData).map(([key, value]) => {
                        if (!value) return null
                        const emissions = (
                          Number.parseFloat(value) * carbonCalculations[key as keyof typeof carbonCalculations].factor
                        ).toFixed(2)
                        return (
                          <div key={key} className="flex justify-between text-xs">
                            <span className="capitalize">{key}:</span>
                            <span className="font-semibold">{emissions} kg</span>
                          </div>
                        )
                      })}
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      <Calendar className="w-4 h-4 mr-2" />
                      Log Today
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card className="border">
              <CardHeader>
                <CardTitle>Weekly Emissions Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyLogsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="emissions"
                      stroke="var(--color-chart-1)"
                      strokeWidth={2}
                      name="Daily Emissions (kg CO₂e)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-2">Current Streak</p>
                  <p className="text-4xl font-bold text-primary">12</p>
                  <p className="text-xs text-muted-foreground mt-2">days logging consistently</p>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-2">Weekly Average</p>
                  <p className="text-4xl font-bold text-secondary">2.9</p>
                  <p className="text-xs text-muted-foreground mt-2">kg CO₂e per day</p>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-2">Monthly Reduction</p>
                  <p className="text-4xl font-bold text-primary">18%</p>
                  <p className="text-xs text-green-600 mt-2">vs previous month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <Card className="border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-primary" />
                  Reduction Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {reductionTips.map((tip, idx) => (
                    <AccordionItem key={idx} value={`tip-${idx}`} className="border-b">
                      <AccordionTrigger className="py-4 hover:no-underline">
                        <div className="flex items-center gap-3 text-left">
                          <Checkbox
                            checked={adoptedTips.includes(tip.title)}
                            onCheckedChange={() => toggleTipAdoption(tip.title)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div>
                            <p className="font-semibold">{tip.title}</p>
                            <p className="text-sm text-muted-foreground">Save up to {tip.savings} tons CO₂e/year</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="space-y-4 pl-8">
                          <p className="text-sm text-muted-foreground">
                            By adopting this strategy, you can reduce your annual carbon footprint by approximately{" "}
                            {tip.savings} tons of CO₂ equivalent. This is equivalent to planting{" "}
                            {Math.round(tip.savings * 16)} trees or driving {Math.round(tip.savings * 4000)} fewer
                            miles.
                          </p>
                          <Button
                            size="sm"
                            onClick={() => toggleTipAdoption(tip.title)}
                            className={adoptedTips.includes(tip.title) ? "bg-green-600" : ""}
                          >
                            {adoptedTips.includes(tip.title) ? (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                Adopted
                              </>
                            ) : (
                              "Adopt This Tip"
                            )}
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="border bg-gradient-to-br from-primary/10 to-transparent">
              <CardHeader>
                <CardTitle>Your Adopted Goals</CardTitle>
              </CardHeader>
              <CardContent>
                {adoptedTips.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No goals adopted yet. Select tips above to get started!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {adoptedTips.map((tip) => (
                      <div key={tip} className="flex items-center gap-2 p-3 bg-card rounded border border-primary/20">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="font-medium">{tip}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
