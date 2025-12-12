import { NextResponse } from "next/server"

// Mock data fallback for road/trekking status
const MOCK_ROAD_DATA = {
  highways: [
    {
      name: "Prithvi Highway",
      nameNp: "पृथ्वी राजमार्ग",
      status: "open",
      districts: ["Kathmandu", "Chitwan", "Pokhara"],
      lastUpdated: new Date().toISOString(),
    },
    {
      name: "Siddhartha Highway",
      nameNp: "सिद्धार्थ राजमार्ग",
      status: "open",
      districts: ["Butwal", "Pokhara"],
      lastUpdated: new Date().toISOString(),
    },
    {
      name: "BP Highway",
      nameNp: "बीपी राजमार्ग",
      status: "partial",
      districts: ["Sindhuli", "Dhankuta"],
      reason: "Landslide clearing in progress",
      lastUpdated: new Date().toISOString(),
    },
    {
      name: "Mahendra Highway",
      nameNp: "महेन्द्र राजमार्ग",
      status: "open",
      districts: ["East-West Terai"],
      lastUpdated: new Date().toISOString(),
    },
    {
      name: "Karnali Highway",
      nameNp: "कर्णाली राजमार्ग",
      status: "closed",
      districts: ["Jumla", "Surkhet"],
      reason: "Heavy snowfall",
      lastUpdated: new Date().toISOString(),
    },
    {
      name: "Koshi Highway",
      nameNp: "कोशी राजमार्ग",
      status: "open",
      districts: ["Biratnagar", "Dharan"],
      lastUpdated: new Date().toISOString(),
    },
  ],
  treks: [
    {
      name: "Annapurna Circuit",
      nameNp: "अन्नपूर्ण परिक्रमा",
      status: "open",
      difficulty: "Moderate",
      permits: "Required",
      lastUpdated: new Date().toISOString(),
    },
    {
      name: "Everest Base Camp",
      nameNp: "सगरमाथा आधार शिविर",
      status: "open",
      difficulty: "Challenging",
      permits: "Required",
      lastUpdated: new Date().toISOString(),
    },
    {
      name: "Langtang Valley",
      nameNp: "लाङटाङ उपत्यका",
      status: "partial",
      difficulty: "Moderate",
      reason: "Weather advisory",
      permits: "Required",
      lastUpdated: new Date().toISOString(),
    },
    {
      name: "Manaslu Circuit",
      nameNp: "मनास्लु परिक्रमा",
      status: "open",
      difficulty: "Challenging",
      permits: "Required",
      lastUpdated: new Date().toISOString(),
    },
  ],
  lastUpdated: new Date().toISOString(),
}

export async function GET() {
  try {
    // Attempt to scrape real data from Nepal government sources
    // Using CORS-friendly proxy approach

    console.log("[v0] Attempting to fetch road status from Nepal sources...")

    // Try fetching from Department of Roads
    try {
      const response = await fetch("https://dor.gov.np/home/page/highway-traffic-updates", {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        next: { revalidate: 900 }, // Cache for 15 minutes
      })

      if (response.ok) {
        const html = await response.text()
        // In production, you would parse HTML with cheerio here
        // For now, check if we got valid data
        if (html.length > 1000) {
          console.log("[v0] Successfully fetched road data from DoR")
          // Parse HTML (simplified - in production use cheerio)
          // Return parsed data
        }
      }
    } catch (error) {
      console.log("[v0] Failed to fetch from DoR:", error)
    }

    // If scraping fails, return mock data
    console.log("[v0] Using mock data fallback for road status")
    return NextResponse.json({
      success: true,
      data: MOCK_ROAD_DATA,
      source: "mock",
      message: "Using fallback data - Real-time updates temporarily unavailable",
    })
  } catch (error) {
    console.error("[v0] Error in scrape-roads API:", error)
    return NextResponse.json(
      {
        success: false,
        data: MOCK_ROAD_DATA,
        source: "mock",
        error: "Failed to fetch road status",
      },
      { status: 500 },
    )
  }
}
