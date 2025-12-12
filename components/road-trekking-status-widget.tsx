"use client"

import { Mountain, Route, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useNepalData } from "@/hooks/use-nepal-essentials"

type RoadStatus = "open" | "partial" | "closed"
type TrekStatus = "open" | "caution" | "closed"

interface Highway {
  name: string
  nameNepali: string
  status: RoadStatus
  reason?: string
}

interface Trek {
  name: string
  nameNepali: string
  status: TrekStatus
  notice?: string
}

interface RoadTrekkingData {
  highways: Highway[]
  treks: Trek[]
}

// Mock fetch function - Replace with actual API calls
async function fetchRoadTrekkingStatus(): Promise<RoadTrekkingData> {
  // TODO: Replace with real data from:
  // - Nepal Police Highway: https://traffic.nepalpolice.gov.np/
  // - Department of Roads: dor.gov.np
  // - Nepal Tourism Board: welcomenepal.com

  // Simulated data
  return {
    highways: [
      { name: "Prithvi Highway", nameNepali: "पृथ्वी राजमार्ग", status: "open" },
      { name: "BP Highway", nameNepali: "बी पी राजमार्ग", status: "open" },
      {
        name: "Karnali Highway",
        nameNepali: "कर्णाली राजमार्ग",
        status: "partial",
        reason: "One-way traffic due to maintenance",
      },
      { name: "Mahendra Highway", nameNepali: "महेन्द्र राजमार्ग", status: "open" },
      { name: "Siddhartha Highway", nameNepali: "सिद्धार्थ राजमार्ग", status: "open" },
      { name: "Koshi Highway", nameNepali: "कोशी राजमार्ग", status: "closed", reason: "Landslide at Dharan section" },
    ],
    treks: [
      { name: "Annapurna Circuit", nameNepali: "अन्नपूर्ण सर्किट", status: "open" },
      { name: "Everest 3-Passes", nameNepali: "एवरेस्ट ३-पासेस", status: "open" },
      { name: "Langtang Valley", nameNepali: "लाङटाङ उपत्यका", status: "caution", notice: "Heavy snow above 4000m" },
      { name: "Manaslu Circuit", nameNepali: "मनास्लु सर्किट", status: "open" },
    ],
  }
}

function getStatusColor(status: RoadStatus | TrekStatus) {
  switch (status) {
    case "open":
      return "bg-accent text-accent-foreground"
    case "partial":
    case "caution":
      return "bg-yellow-500 text-white"
    case "closed":
      return "bg-destructive text-destructive-foreground"
  }
}

function getStatusIcon(status: RoadStatus | TrekStatus) {
  switch (status) {
    case "open":
      return <CheckCircle2 className="h-4 w-4" />
    case "partial":
    case "caution":
      return <AlertCircle className="h-4 w-4" />
    case "closed":
      return <AlertCircle className="h-4 w-4" />
  }
}

function getStatusLabel(status: RoadStatus | TrekStatus) {
  switch (status) {
    case "open":
      return { en: "Open", np: "खुला" }
    case "partial":
      return { en: "Partial", np: "आंशिक" }
    case "caution":
      return { en: "Caution", np: "सावधान" }
    case "closed":
      return { en: "Closed", np: "बन्द" }
  }
}

export function RoadTrekkingStatusWidget() {
  const { data, loading, lastUpdated } = useNepalData<RoadTrekkingData>("nepal-road-trekking", fetchRoadTrekkingStatus)

  if (loading && !data) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Route className="h-5 w-5 text-primary" />
          <span>Road & Trekking Status</span>
          <span className="nepali-text text-base">/ सडक र ट्रेकिंग स्थिति</span>
        </CardTitle>
        {lastUpdated && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            Updated: {lastUpdated.toLocaleTimeString("en-NP")}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-semibold">Major Highways / मुख्य राजमार्ग</h3>
          <div className="space-y-2">
            {data?.highways.map((highway) => {
              const statusLabel = getStatusLabel(highway.status)
              return (
                <div key={highway.name} className="flex items-start justify-between gap-2 rounded-md border p-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{highway.name}</p>
                    <p className="nepali-text text-xs text-muted-foreground">{highway.nameNepali}</p>
                    {highway.reason && <p className="mt-1 text-xs text-muted-foreground">{highway.reason}</p>}
                  </div>
                  <Badge className={getStatusColor(highway.status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(highway.status)}
                      <span>{statusLabel.en}</span>
                      <span className="nepali-text">/ {statusLabel.np}</span>
                    </span>
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Mountain className="h-4 w-4" />
            Popular Treks / लोकप्रिय ट्रेक
          </h3>
          <div className="space-y-2">
            {data?.treks.map((trek) => {
              const statusLabel = getStatusLabel(trek.status)
              return (
                <div key={trek.name} className="flex items-start justify-between gap-2 rounded-md border p-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{trek.name}</p>
                    <p className="nepali-text text-xs text-muted-foreground">{trek.nameNepali}</p>
                    {trek.notice && <p className="mt-1 text-xs text-muted-foreground">{trek.notice}</p>}
                  </div>
                  <Badge className={getStatusColor(trek.status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(trek.status)}
                      <span>{statusLabel.en}</span>
                      <span className="nepali-text">/ {statusLabel.np}</span>
                    </span>
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
