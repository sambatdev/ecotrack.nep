"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Leaf, Zap, AlertCircle, TrendingDown, Target, Share2 } from "lucide-react"
import Link from "next/link"

const emissionTrendData = [
  { month: "Jan", emissions: 8.5, target: 7 },
  { month: "Feb", emissions: 8.2, target: 7 },
  { month: "Mar", emissions: 7.8, target: 7 },
  { month: "Apr", emissions: 7.3, target: 6.8 },
  { month: "May", emissions: 6.9, target: 6.5 },
  { month: "Jun", emissions: 6.5, target: 6.2 },
]

const emissionSourcesData = [
  { name: "Travel", value: 35, fill: "var(--color-chart-1)" },
  { name: "Energy", value: 30, fill: "var(--color-chart-2)" },
  { name: "Diet", value: 20, fill: "var(--color-chart-3)" },
  { name: "Waste", value: 15, fill: "var(--color-chart-4)" },
]

const quickActions = [
  {
    title: "Track Carbon",
    description: "Log your daily activities",
    href: "/carbon-tracker",
    icon: Leaf,
  },
  {
    title: "View Alerts",
    description: "Check weather & disaster alerts",
    href: "/disaster-resilience",
    icon: AlertCircle,
  },
  {
    title: "Optimize Data Center",
    description: "Run energy optimization",
    href: "/data-center-optimizer",
    icon: Zap,
  },
  {
    title: "View Goals",
    description: "Track your reduction targets",
    href: "#",
    icon: Target,
  },
]

export default function Dashboard() {
  const userType = "personal" // Could be 'personal' or 'corporate'

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Welcome, Alex</h1>
          <p className="text-muted-foreground">Track your climate impact and take action today.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border hover:border-primary/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Current Carbon Footprint</span>
                <Leaf className="w-5 h-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">6.5</p>
              <p className="text-sm text-muted-foreground mt-2">tons CO₂e per month</p>
              <p className="text-xs text-green-600 mt-2">↓ 23% from last year</p>
            </CardContent>
          </Card>

          <Card className="border hover:border-primary/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Energy Savings Potential</span>
                <Zap className="w-5 h-5 text-secondary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-secondary">38%</p>
              <p className="text-sm text-muted-foreground mt-2">of current consumption</p>
              <p className="text-xs text-green-600 mt-2">Could save $2,400/year</p>
            </CardContent>
          </Card>

          <Card className="border hover:border-primary/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Active Alerts</span>
                <AlertCircle className="w-5 h-5 text-amber-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-amber-500">2</p>
              <p className="text-sm text-muted-foreground mt-2">weather notifications</p>
              <p className="text-xs text-amber-600 mt-2">Flood risk in your area</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="trends" className="mb-8">
          <TabsList className="bg-card border">
            <TabsTrigger value="trends">Emission Trends</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Emissions vs Target</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={emissionTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="emissions"
                      stroke="var(--color-chart-1)"
                      name="Your Emissions"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="var(--color-chart-2)"
                      name="Target"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Emissions by Source</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={emissionSourcesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {emissionSourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => {
              const Icon = action.icon
              return (
                <Link key={idx} href={action.href}>
                  <Card className="h-full border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                    <CardContent className="pt-6">
                      <Icon className="w-8 h-8 text-primary mb-3" />
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Reduction Tips */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              Top Reduction Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Switch to Electric Vehicle", savings: "2.1 tons/year", status: "Recommended" },
                { title: "Use Public Transportation", savings: "1.5 tons/year", status: "Recommended" },
                { title: "Reduce Meat Consumption", savings: "0.8 tons/year", status: "In Progress" },
              ].map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-card border rounded-lg hover:border-primary/50"
                >
                  <div>
                    <p className="font-medium">{tip.title}</p>
                    <p className="text-sm text-muted-foreground">Potential: {tip.savings}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-primary">{tip.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Share Stats */}
        <div className="flex justify-center">
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Share2 className="w-4 h-4" />
            Share Your Progress
          </Button>
        </div>
      </div>
    </div>
  )
}
