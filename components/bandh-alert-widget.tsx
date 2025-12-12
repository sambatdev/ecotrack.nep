"use client"

import { AlertTriangle, Calendar, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useNepalData } from "@/hooks/use-nepal-essentials"

interface BandhEvent {
  date: string // YYYY-MM-DD
  title: string
  titleNepali: string
  districts: string[]
  source: string
  isToday?: boolean
}

interface BandhData {
  todayBandh: BandhEvent | null
  upcomingBandhs: BandhEvent[]
}

// Mock fetch function - Replace with actual API calls
async function fetchBandhAlerts(): Promise<BandhData> {
  // TODO: Replace with real data from:
  // - Kantipur RSS feed
  // - Setopati API
  // - OnlineKhabar
  // - Political party/union Facebook pages

  const today = new Date().toISOString().split("T")[0]

  // Simulated data
  return {
    todayBandh: null, // Set to a bandh object if there's one today
    upcomingBandhs: [
      {
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        title: "Transport Workers Strike",
        titleNepali: "यातायात कामदार हडताल",
        districts: ["Kathmandu", "Lalitpur", "Bhaktapur"],
        source: "Nepal Transport Workers Union",
      },
      {
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        title: "Student Union Bandh",
        titleNepali: "विद्यार्थी संघ बन्द",
        districts: ["Nationwide"],
        source: "All Nepal National Free Students Union",
      },
    ],
  }
}

export function BandhAlertWidget() {
  const { data, loading, lastUpdated } = useNepalData<BandhData>("nepal-bandh-alerts", fetchBandhAlerts)

  if (loading && !data) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-primary" />
          <span>Bandh / Strike Alerts</span>
          <span className="nepali-text text-base">/ बन्द अलर्ट</span>
        </CardTitle>
        {lastUpdated && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            Updated: {lastUpdated.toLocaleTimeString("en-NP")}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {data?.todayBandh ? (
          <Alert className="border-destructive bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="ml-6">
              <p className="font-semibold text-destructive">आज नेपाल बन्द छ – Nepal Bandh Today</p>
              <p className="mt-1 text-sm">{data.todayBandh.title}</p>
              <p className="nepali-text mt-1 text-sm">{data.todayBandh.titleNepali}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {data.todayBandh.districts.map((district) => (
                  <Badge key={district} variant="outline" className="text-xs">
                    <MapPin className="mr-1 h-3 w-3" />
                    {district}
                  </Badge>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="border-accent bg-accent/10">
            <AlertDescription className="text-sm">
              <span className="font-medium">No bandh today</span>
              <span className="nepali-text"> / आज कुनै बन्द छैन</span>
            </AlertDescription>
          </Alert>
        )}

        <div>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Calendar className="h-4 w-4" />
            Upcoming Bandhs / आगामी बन्दहरू
          </h3>
          {data?.upcomingBandhs && data.upcomingBandhs.length > 0 ? (
            <div className="space-y-2">
              {data.upcomingBandhs.map((bandh, index) => (
                <div key={index} className="rounded-md border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{bandh.title}</p>
                      <p className="nepali-text text-xs text-muted-foreground">{bandh.titleNepali}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Source: {bandh.source}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {new Date(bandh.date).toLocaleDateString("en-NP", { month: "short", day: "numeric" })}
                    </Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {bandh.districts.map((district) => (
                      <Badge key={district} variant="secondary" className="text-xs">
                        <MapPin className="mr-1 h-3 w-3" />
                        {district}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No upcoming bandhs scheduled / कुनै आगामी बन्द छैन</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
