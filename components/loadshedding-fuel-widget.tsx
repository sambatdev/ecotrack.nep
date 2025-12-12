"use client"

import { Zap, Fuel, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNepalData } from "@/hooks/use-nepal-essentials"
import { useState } from "react"

interface LoadSheddingSchedule {
  group: string
  todaySchedule: { start: string; end: string }[]
}

interface FuelPrices {
  petrol: number
  diesel: number
  kerosene: number
  lpgDomestic: number
  lpgCommercial: number
  lastUpdated: string
}

interface LoadSheddingFuelData {
  loadShedding: LoadSheddingSchedule[]
  fuelPrices: FuelPrices
}

// Mock fetch function - Replace with actual API calls
async function fetchLoadSheddingFuel(): Promise<LoadSheddingFuelData> {
  // TODO: Replace with real data from:
  // - NEA: nea.org.np
  // - Kulbir API: kulbir.com
  // - Nepal Oil Corporation: noc.org.np

  // Simulated data
  return {
    loadShedding: [
      {
        group: "Group 1",
        todaySchedule: [
          { start: "06:00", end: "08:00" },
          { start: "18:00", end: "20:00" },
        ],
      },
      {
        group: "Group 2",
        todaySchedule: [
          { start: "08:00", end: "10:00" },
          { start: "20:00", end: "22:00" },
        ],
      },
      { group: "Group 3", todaySchedule: [{ start: "10:00", end: "12:00" }] },
      { group: "Group 4", todaySchedule: [{ start: "12:00", end: "14:00" }] },
      { group: "Group 5", todaySchedule: [{ start: "14:00", end: "16:00" }] },
      { group: "Group 6", todaySchedule: [] }, // No load-shedding
      { group: "Group 7", todaySchedule: [{ start: "16:00", end: "18:00" }] },
    ],
    fuelPrices: {
      petrol: 175,
      diesel: 162,
      kerosene: 164,
      lpgDomestic: 1850,
      lpgCommercial: 2050,
      lastUpdated: new Date().toISOString(),
    },
  }
}

export function LoadSheddingFuelWidget() {
  const { data, loading, lastUpdated } = useNepalData<LoadSheddingFuelData>(
    "nepal-loadshedding-fuel",
    fetchLoadSheddingFuel,
  )
  const [selectedGroup, setSelectedGroup] = useState("Group 1")

  if (loading && !data) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    )
  }

  const currentSchedule = data?.loadShedding.find((g) => g.group === selectedGroup)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Zap className="h-5 w-5 text-primary" />
          <span>Load-shedding & Fuel Prices</span>
          <span className="nepali-text text-base">/ लोडशेडिङ र इन्धन मूल्य</span>
        </CardTitle>
        {lastUpdated && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            Updated: {lastUpdated.toLocaleTimeString("en-NP")}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Load-shedding Section */}
        <div className="space-y-3 rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Today's Schedule / आजको तालिका</h3>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger className="h-8 w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {data?.loadShedding.map((group) => (
                  <SelectItem key={group.group} value={group.group}>
                    {group.group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentSchedule && currentSchedule.todaySchedule.length > 0 ? (
            <div className="space-y-2">
              {currentSchedule.todaySchedule.map((slot, index) => (
                <div key={index} className="flex items-center justify-between rounded-md bg-muted/50 p-2">
                  <span className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-destructive" />
                    Power Cut {index + 1}
                  </span>
                  <Badge variant="outline">
                    {slot.start} - {slot.end}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md bg-accent/10 p-3 text-center">
              <p className="text-sm font-medium text-accent-foreground">No load-shedding today!</p>
              <p className="nepali-text text-xs text-muted-foreground">आज लोडशेडिङ छैन!</p>
            </div>
          )}
        </div>

        {/* Fuel Prices Section */}
        <div className="space-y-3 rounded-lg border p-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Fuel className="h-4 w-4" />
            Fuel Prices (NPR) / इन्धन मूल्य
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md border p-2">
              <p className="text-xs text-muted-foreground">Petrol / पेट्रोल</p>
              <p className="text-lg font-semibold">₨ {data?.fuelPrices.petrol}</p>
            </div>
            <div className="rounded-md border p-2">
              <p className="text-xs text-muted-foreground">Diesel / डिजेल</p>
              <p className="text-lg font-semibold">₨ {data?.fuelPrices.diesel}</p>
            </div>
            <div className="rounded-md border p-2">
              <p className="text-xs text-muted-foreground">Kerosene / मट्टितेल</p>
              <p className="text-lg font-semibold">₨ {data?.fuelPrices.kerosene}</p>
            </div>
            <div className="rounded-md border p-2">
              <p className="text-xs text-muted-foreground">LPG (Domestic)</p>
              <p className="text-lg font-semibold">₨ {data?.fuelPrices.lpgDomestic}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Last updated:{" "}
            {data?.fuelPrices.lastUpdated && new Date(data.fuelPrices.lastUpdated).toLocaleDateString("en-NP")}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
