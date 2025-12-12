"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, Download, Zap, TrendingDown, BarChart3, Play } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

interface DataCenterConfig {
  serverCount: number
  coolingType: string
  workloadSchedule: string
  renewablePercentage: number
}

interface SimulationResult {
  baseline: {
    energyUsage: number
    annualCost: number
    co2Emissions: number
  }
  optimized: {
    energyUsage: number
    annualCost: number
    co2Emissions: number
  }
  savings: {
    energyPercent: number
    costSavings: number
    co2Reduction: number
  }
}

const comparisonData = [
  { metric: "Energy Use (kW)", baseline: 450, optimized: 280 },
  { metric: "Annual Cost ($K)", baseline: 540, optimized: 336 },
  { metric: "CO₂ Emissions (tons)", baseline: 2160, optimized: 1344 },
]

const optimalScheduleData = [
  { hour: "00:00", usage: 65, renewable: 45 },
  { hour: "06:00", usage: 45, renewable: 40 },
  { hour: "12:00", usage: 85, renewable: 70 },
  { hour: "18:00", usage: 95, renewable: 50 },
  { hour: "23:00", usage: 70, renewable: 45 },
]

export default function DataCenterOptimizer() {
  const [config, setConfig] = useState<DataCenterConfig>({
    serverCount: 100,
    coolingType: "traditional",
    workloadSchedule: "24/7",
    renewablePercentage: 30,
  })

  const [isSimulating, setIsSimulating] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [result, setResult] = useState<SimulationResult | null>(null)

  const runSimulation = async () => {
    setIsSimulating(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Calculate baseline
    const baselineEnergyPerServer = 4.5
    const baselineEnergy = config.serverCount * baselineEnergyPerServer
    const annualHours = config.workloadSchedule === "24/7" ? 8760 : 5000
    const costPerKwh = 0.12

    const baseline = {
      energyUsage: baselineEnergy,
      annualCost: baselineEnergy * annualHours * costPerKwh,
      co2Emissions: baselineEnergy * annualHours * 0.5,
    }

    // Calculate optimized (simulated improvements)
    const coolingEfficiency = config.coolingType === "liquid" ? 0.65 : 0.8
    const renewableBonus = config.renewablePercentage / 100
    const optimizationFactor = 0.6 + coolingEfficiency * 0.1 + renewableBonus * 0.3

    const optimized = {
      energyUsage: baselineEnergy * optimizationFactor,
      annualCost: baselineEnergy * annualHours * costPerKwh * optimizationFactor,
      co2Emissions: baselineEnergy * annualHours * 0.5 * optimizationFactor,
    }

    setResult({
      baseline,
      optimized,
      savings: {
        energyPercent: ((baseline.energyUsage - optimized.energyUsage) / baseline.energyUsage) * 100,
        costSavings: baseline.annualCost - optimized.annualCost,
        co2Reduction: baseline.co2Emissions - optimized.co2Emissions,
      },
    })

    setShowResults(true)
    setIsSimulating(false)
  }

  const handleConfigChange = (key: keyof DataCenterConfig, value: string | number) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
    setShowResults(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Data Center Energy Optimizer</h1>
          <p className="text-muted-foreground">
            Simulate and optimize your data center for maximum efficiency and minimal emissions.
          </p>
        </div>

        <Tabs defaultValue="config" className="space-y-6">
          <TabsList className="bg-card border">
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="schedule">Optimal Schedule</TabsTrigger>
          </TabsList>

          {/* Configuration Tab */}
          <TabsContent value="config" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Input Panel */}
              <div className="lg:col-span-2">
                <Card className="border">
                  <CardHeader>
                    <CardTitle>Data Center Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Server Count */}
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold">Number of Servers</label>
                      <div className="flex gap-4 items-center">
                        <Input
                          type="number"
                          value={config.serverCount}
                          onChange={(e) => handleConfigChange("serverCount", Number.parseInt(e.target.value))}
                          className="border bg-card flex-1"
                        />
                        <span className="text-muted-foreground text-sm font-medium">{config.serverCount} servers</span>
                      </div>
                      <Slider
                        value={[config.serverCount]}
                        onValueChange={(v) => handleConfigChange("serverCount", v[0])}
                        min={10}
                        max={500}
                        step={10}
                        className="mt-2"
                      />
                    </div>

                    {/* Cooling Type */}
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold">Cooling Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {["traditional", "liquid", "immersion"].map((type) => (
                          <button
                            key={type}
                            onClick={() => handleConfigChange("coolingType", type)}
                            className={`p-3 rounded border text-left transition ${
                              config.coolingType === type
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <p className="font-medium capitalize">{type}</p>
                            <p className="text-xs text-muted-foreground">
                              {type === "traditional" && "Air cooling"}
                              {type === "liquid" && "Liquid cooling"}
                              {type === "immersion" && "Immersion cooling"}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Workload Schedule */}
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold">Workload Schedule</label>
                      <div className="grid grid-cols-3 gap-3">
                        {["24/7", "Peak Hours", "Variable"].map((schedule) => (
                          <button
                            key={schedule}
                            onClick={() => handleConfigChange("workloadSchedule", schedule)}
                            className={`p-3 rounded border text-center transition ${
                              config.workloadSchedule === schedule
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <p className="font-medium text-sm">{schedule}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Renewable Percentage */}
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold">Renewable Energy Percentage</label>
                      <div className="flex gap-4 items-center">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={config.renewablePercentage}
                          onChange={(e) => handleConfigChange("renewablePercentage", Number.parseInt(e.target.value))}
                          className="border bg-card flex-1"
                        />
                        <span className="text-muted-foreground text-sm font-medium">{config.renewablePercentage}%</span>
                      </div>
                      <Slider
                        value={[config.renewablePercentage]}
                        onValueChange={(v) => handleConfigChange("renewablePercentage", v[0])}
                        min={0}
                        max={100}
                        step={5}
                        className="mt-2"
                      />
                    </div>

                    <Button
                      onClick={runSimulation}
                      disabled={isSimulating}
                      className="w-full bg-primary hover:bg-primary/90 gap-2"
                    >
                      <Play className="w-4 h-4" />
                      {isSimulating ? "Running Simulation..." : "Run Optimization"}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Info Panel */}
              <div>
                <Card className="border bg-gradient-to-br from-secondary/10 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Optimization Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <p className="font-semibold text-foreground mb-1">Liquid Cooling</p>
                      <p className="text-muted-foreground">
                        Most efficient option, 30-40% better than traditional air cooling.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Renewable Energy</p>
                      <p className="text-muted-foreground">
                        Each 10% increase in renewables saves 50+ tons CO₂ annually.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Peak Hours Scheduling</p>
                      <p className="text-muted-foreground">
                        Running only during peak hours reduces total consumption by 40%.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            {showResults && result ? (
              <>
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Energy Savings</p>
                        <Zap className="w-5 h-5 text-secondary" />
                      </div>
                      <p className="text-4xl font-bold text-secondary">{result.savings.energyPercent.toFixed(1)}%</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {(result.baseline.energyUsage - result.optimized.energyUsage).toFixed(1)} kW reduction
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Annual Cost Savings</p>
                        <BarChart3 className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-4xl font-bold text-primary">
                        ${(result.savings.costSavings / 1000).toFixed(0)}K
                      </p>
                      <p className="text-xs text-green-600 mt-2">Per year</p>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">CO₂ Reduction</p>
                        <TrendingDown className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-4xl font-bold text-primary">
                        {(result.savings.co2Reduction / 1000).toFixed(0)} tons
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">Per year</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Comparison Chart */}
                <Card className="border">
                  <CardHeader>
                    <CardTitle>Before & After Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="metric" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="baseline" fill="var(--color-chart-3)" name="Baseline" />
                        <Bar dataKey="optimized" fill="var(--color-chart-1)" name="Optimized" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Download Report */}
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Download className="w-4 h-4" />
                  Download Optimization Report
                </Button>
              </>
            ) : (
              <Card className="border">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    Configure your data center and run a simulation to see optimization results.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Optimal Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card className="border">
              <CardHeader>
                <CardTitle>Recommended Daily Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={optimalScheduleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="usage"
                      stroke="var(--color-chart-2)"
                      name="Server Usage (%)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="renewable"
                      stroke="var(--color-chart-1)"
                      name="Renewable Energy (%)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border bg-gradient-to-br from-primary/10 to-transparent">
              <CardHeader>
                <CardTitle>Scheduling Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Schedule heavy workloads during peak solar hours (10 AM - 4 PM)",
                  "Batch non-critical tasks during high renewable energy availability",
                  "Use predictive cooling 2-4 hours before peak usage",
                  "Migrate background jobs to off-peak hours (midnight - 6 AM)",
                ].map((rec, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
