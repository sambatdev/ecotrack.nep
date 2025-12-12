"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mountain, Zap, CloudRain, TrendingDown, Users, Award, MapPin, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const features = [
  {
    icon: Mountain,
    title: "Carbon Tracking",
    titleNepali: "कार्बन ट्र्याकिङ",
    description: "Monitor your carbon footprint across Nepal's diverse terrain - from Terai to Himalayan regions.",
  },
  {
    icon: Zap,
    title: "Energy Optimization",
    titleNepali: "ऊर्जा अनुकूलन",
    description: "Optimize hydroelectric and solar energy use across Nepal's data centers and businesses.",
  },
  {
    icon: AlertTriangle,
    title: "Weather & Disaster Alerts",
    titleNepali: "मौसम र विपद् चेतावनी",
    description: "Real-time weather forecasts, monsoon warnings, and disaster alerts from DHM and NDRRMA.",
  },
  {
    icon: CloudRain,
    title: "Monsoon & Climate Resilience",
    titleNepali: "मनसुन तयारी",
    description: "Get alerts for monsoon floods, landslides, and extreme weather in Himalayan regions.",
  },
]

const testimonials = [
  {
    name: "Ramesh Shrestha",
    nameNepali: "रमेश श्रेष्ठ",
    role: "CEO, Kathmandu Tech Solutions",
    quote: "EcoTrack Nepal helped reduce our data center emissions by 45% while optimizing hydropower usage.",
    avatar: "👨‍💼",
  },
  {
    name: "Sita Gurung",
    nameNepali: "सीता गुरुङ",
    role: "Environmental Officer, Pokhara Municipality",
    quote: "Perfect for tracking carbon footprint across our tourism sector and preparing for monsoon challenges.",
    avatar: "👩‍💼",
  },
  {
    name: "Bikram Rai",
    nameNepali: "बिक्रम राई",
    role: "Manager, Himalayan Energy Group",
    quote: "The climate resilience tools help us prepare facilities in mountain regions for extreme weather.",
    avatar: "👨‍🔬",
  },
]

export default function Home() {
  const [email, setEmail] = useState("")

  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Himalayan-inspired gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-bold text-balance">
                  Track, Optimize, Protect
                  <span className="block text-4xl mt-2 nepali-text text-primary">
                    ट्र्याक गर्नुहोस्, अनुकूलन गर्नुहोस्, संरक्षण गर्नुहोस्
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground text-balance">
                  Nepal's climate action platform. Monitor emissions, optimize energy, and prepare for Himalayan climate
                  challenges.
                </p>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get Started
                    <span className="ml-2 nepali-text">सुरु गर्नुहोस्</span>
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
              <div className="flex gap-8 pt-4 text-sm">
                <div>
                  <p className="font-semibold text-primary">5,000+</p>
                  <p className="text-muted-foreground">Nepali Users</p>
                </div>
                <div>
                  <p className="font-semibold text-primary">200K</p>
                  <p className="text-muted-foreground">Tons CO₂ Prevented</p>
                </div>
                <div>
                  <p className="font-semibold text-primary">14</p>
                  <p className="text-muted-foreground">Districts Covered</p>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src="/mount-everest-and-himalayas-mountain-range-with-pr.jpg"
                alt="Himalayas"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end justify-center pb-6">
                <div className="text-center">
                  <Mountain className="w-16 h-16 text-primary mx-auto mb-2" />
                  <p className="text-lg font-semibold">Powered by Himalayan Data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Climate Solutions for Nepal
            <span className="block text-2xl mt-2 nepali-text text-primary">नेपालको लागि जलवायु समाधान</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tools designed for Nepal's unique geography - from the Terai plains to the Himalayan peaks.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Card key={idx} className="border-2 hover:border-primary/50 hover:shadow-lg transition-all">
                <CardHeader>
                  <Icon className="w-12 h-12 text-primary mb-2" />
                  <CardTitle className="text-base">
                    {feature.title}
                    <span className="block text-sm nepali-text text-muted-foreground mt-1">{feature.titleNepali}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <div className="text-center mt-12">
          <Link href="/alerts">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 bg-transparent"
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              View Live Weather & Disaster Alerts
              <span className="ml-2 nepali-text">मौसम चेतावनी हेर्नुहोस्</span>
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Coverage Across Nepal</h2>
            <p className="text-muted-foreground nepali-text">नेपालभरि कभरेज</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
              <p className="font-semibold mb-1">Kathmandu Valley</p>
              <p className="text-sm text-muted-foreground nepali-text">काठमाडौं उपत्यका</p>
            </div>
            <div className="text-center">
              <MapPin className="w-10 h-10 text-secondary mx-auto mb-3" />
              <p className="font-semibold mb-1">Pokhara Region</p>
              <p className="text-sm text-muted-foreground nepali-text">पोखरा क्षेत्र</p>
            </div>
            <div className="text-center">
              <MapPin className="w-10 h-10 text-accent mx-auto mb-3" />
              <p className="font-semibold mb-1">Chitwan & Terai</p>
              <p className="text-sm text-muted-foreground nepali-text">चितवन र तराई</p>
            </div>
            <div className="text-center">
              <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
              <p className="font-semibold mb-1">Mountain Districts</p>
              <p className="text-sm text-muted-foreground nepali-text">पहाडी जिल्लाहरू</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <TrendingDown className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-4xl font-bold mb-2">38%</p>
            <p className="text-muted-foreground">Average Emission Reduction</p>
          </div>
          <div className="text-center">
            <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
            <p className="text-4xl font-bold mb-2">150+</p>
            <p className="text-muted-foreground">Nepali Businesses</p>
          </div>
          <div className="text-center">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-4xl font-bold mb-2">4.8⭐</p>
            <p className="text-muted-foreground">User Rating</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Trusted by Nepali Leaders
            <span className="block text-2xl mt-2 nepali-text text-primary">नेपाली नेताहरूद्वारा विश्वसनीय</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="border-2">
              <CardHeader>
                <p className="text-lg mb-4">"{testimonial.quote}"</p>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm nepali-text text-muted-foreground mb-1">{testimonial.nameNepali}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-primary/20 to-secondary/20 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Stay Updated on Nepal Climate Action</h2>
          <p className="nepali-text text-xl text-muted-foreground mb-4">नेपालको जलवायु कार्यमा अद्यावधिक रहनुहोस्</p>
          <p className="text-muted-foreground mb-8">
            Get climate insights for Nepal's regions, monsoon alerts, and energy optimization tips.
          </p>
          <div className="flex gap-3 max-w-sm mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
