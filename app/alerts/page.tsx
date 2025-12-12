import { AlertsDashboard } from "@/components/alerts-dashboard"

export const metadata = {
  title: "Weather & Disaster Alerts - EcoTrack Pro Nepal",
  description: "Real-time weather forecasts and disaster alerts for Nepal",
  keywords: "Nepal weather, disaster alerts, मौसम चेतावनी, DHM, NDRRMA",
}

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AlertsDashboard />
      </div>
    </div>
  )
}
