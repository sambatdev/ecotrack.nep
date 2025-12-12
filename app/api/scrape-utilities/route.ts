import { NextResponse } from "next/server"

// Mock data fallback for load-shedding and fuel prices
const MOCK_UTILITIES_DATA = {
  loadShedding: {
    status: "no_shedding",
    statusNp: "कुनै लोडशेडिङ छैन",
    message: "No scheduled load-shedding today",
    messageNp: "आज कुनै लोडशेडिङ तालिका छैन",
    note: "Dry season may cause occasional power cuts",
    groups: [], // Empty if no shedding
    lastUpdated: new Date().toISOString(),
  },
  fuelPrices: {
    regions: {
      kathmandu: {
        petrol: 158.5,
        diesel: 143.5,
        kerosene: 140.0,
        lpg: 1950.0,
      },
      terai: {
        petrol: 157.0,
        diesel: 142.0,
        kerosene: 139.0,
        lpg: 1900.0,
      },
      remote: {
        petrol: 165.0,
        diesel: 150.0,
        kerosene: 147.0,
        lpg: 2100.0,
      },
    },
    currency: "NPR",
    unit: "per liter (LPG per 14.2kg cylinder)",
    effectiveDate: "2025-12-01",
    lastUpdated: new Date().toISOString(),
  },
  lastUpdated: new Date().toISOString(),
}

export async function GET() {
  try {
    console.log("[v0] Attempting to fetch utilities data...")

    // Try fetching load-shedding from NEA
    try {
      const neaResponse = await fetch("https://www.nea.org.np/loadshedding", {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        next: { revalidate: 900 },
      })

      if (neaResponse.ok) {
        const html = await neaResponse.text()
        console.log("[v0] Successfully fetched NEA load-shedding data")
        // Parse HTML for schedule
      }
    } catch (error) {
      console.log("[v0] Failed to fetch NEA data:", error)
    }

    // Try fetching fuel prices from NOC
    try {
      const nocResponse = await fetch("https://noc.org.np/retailprice", {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        next: { revalidate: 3600 * 24 }, // Cache for 24 hours (prices change weekly)
      })

      if (nocResponse.ok) {
        const html = await nocResponse.text()
        console.log("[v0] Successfully fetched NOC fuel prices")
        // Parse HTML for prices
      }
    } catch (error) {
      console.log("[v0] Failed to fetch NOC data:", error)
    }

    console.log("[v0] Using mock data fallback for utilities")
    return NextResponse.json({
      success: true,
      data: MOCK_UTILITIES_DATA,
      source: "mock",
      message: "Using fallback data - Real-time updates temporarily unavailable",
    })
  } catch (error) {
    console.error("[v0] Error in scrape-utilities API:", error)
    return NextResponse.json(
      {
        success: false,
        data: MOCK_UTILITIES_DATA,
        source: "mock",
        error: "Failed to fetch utilities data",
      },
      { status: 500 },
    )
  }
}
