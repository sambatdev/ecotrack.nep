"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export default function NepalMapWidget() {
  // In production, integrate with Leaflet or Google Maps API
  const regions = [
    { name: "Kathmandu Valley", nepali: "काठमाडौं उपत्यका", users: 1250, color: "bg-primary" },
    { name: "Pokhara Region", nepali: "पोखरा क्षेत्र", users: 780, color: "bg-secondary" },
    { name: "Chitwan & Terai", nepali: "चितवन र तराई", users: 650, color: "bg-accent" },
    { name: "Mountain Districts", nepali: "पहाडी जिल्लाहरू", users: 420, color: "bg-primary/70" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Active Users by Region
          <span className="block text-sm nepali-text text-muted-foreground">क्षेत्र अनुसार सक्रिय प्रयोगकर्ताहरू</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {regions.map((region, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{region.name}</span>
                  <span className="nepali-text text-xs text-muted-foreground">({region.nepali})</span>
                </div>
                <span className="font-semibold">{region.users}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${region.color}`} style={{ width: `${(region.users / 1250) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
