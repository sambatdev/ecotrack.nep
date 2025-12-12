"use client"
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface Alert {
  id: string
  type: string
  severity: string
  title: string
  titleNepali: string
  location: string
  locationNepali: string
  lat: number
  lng: number
  message: string
}

interface NepalAlertMapProps {
  alerts: Alert[]
}

export default function NepalAlertMap({ alerts }: NepalAlertMapProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
      case "high":
        return "#dc2626"
      case "moderate":
        return "#f59e0b"
      case "low":
        return "#eab308"
      default:
        return "#6b7280"
    }
  }

  const getRadius = (severity: string) => {
    switch (severity) {
      case "critical":
        return 50000
      case "high":
        return 40000
      case "moderate":
        return 30000
      default:
        return 20000
    }
  }

  return (
    <MapContainer center={[28.3949, 84.124]} zoom={7} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {alerts.map((alert) => (
        <div key={alert.id}>
          <Circle
            center={[alert.lat, alert.lng]}
            radius={getRadius(alert.severity)}
            pathOptions={{
              color: getSeverityColor(alert.severity),
              fillColor: getSeverityColor(alert.severity),
              fillOpacity: 0.2,
            }}
          />
          <Marker position={[alert.lat, alert.lng]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-sm mb-1">{alert.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{alert.titleNepali}</p>
                <p className="text-xs mb-2">{alert.message.slice(0, 100)}...</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">{alert.location}</span>
                  <span
                    className={`px-2 py-1 rounded text-white ${alert.severity === "high" || alert.severity === "critical" ? "bg-red-600" : "bg-amber-500"}`}
                  >
                    {alert.severity}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        </div>
      ))}
    </MapContainer>
  )
}
