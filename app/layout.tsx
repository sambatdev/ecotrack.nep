import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { NepalEssentialsDashboard } from "@/components/nepal-essentials-dashboard"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _nepaliFont = Noto_Sans_Devanagari({ subsets: ["devanagari"] })

export const metadata: Metadata = {
  title: "EcoTrack Nepal - कार्बन फुटप्रिन्ट र जलवायु कार्य",
  description:
    "Nepal-focused climate action platform. Track carbon footprint, optimize energy, and prepare for Himalayan climate challenges. नेपालमा जलवायु परिवर्तन समाधान।",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <NepalEssentialsDashboard />
        <Analytics />
      </body>
    </html>
  )
}
