"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Leaf, Zap, Cloud, TrendingDown, Users, Award } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const features = [
  {
    icon: Leaf,
    title: "Carbon Tracking",
    description: "Monitor your carbon footprint across travel, diet, energy, and waste with precision.",
  },
  {
    icon: Zap,
    title: "Data Center Optimization",
    description: "Optimize energy use and reduce emissions through intelligent data center management.",
  },
  {
    icon: Cloud,
    title: "Disaster Resilience",
    description: "Get real-time alerts and prepare for extreme weather events in your region.",
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, Green Tech Solutions",
    quote: "EcoTrack Pro helped us reduce our carbon footprint by 40% in just 6 months.",
    avatar: "👩‍💼",
  },
  {
    name: "Michael Rodriguez",
    role: "Data Center Manager",
    quote: "The optimization tools saved us $200k annually while cutting emissions significantly.",
    avatar: "👨‍💼",
  },
  {
    name: "Emma Thompson",
    role: "Environmental Officer",
    quote: "The disaster resilience features give us peace of mind for extreme weather events.",
    avatar: "👩‍🔬",
  },
]

export default function Home() {
  const [email, setEmail] = useState("")

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-bold text-balance">Track, Optimize, and Protect</h1>
                <p className="text-xl text-muted-foreground text-balance">
                  Your path to a greener future. Monitor carbon emissions, optimize energy use, and prepare for climate
                  risks.
                </p>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
              <div className="flex gap-8 pt-4 text-sm">
                <div>
                  <p className="font-semibold text-primary">10,000+</p>
                  <p className="text-muted-foreground">Active Users</p>
                </div>
                <div>
                  <p className="font-semibold text-primary">500K</p>
                  <p className="text-muted-foreground">Tons CO2 Prevented</p>
                </div>
              </div>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Leaf className="w-32 h-32 text-primary/40 mx-auto mb-4" />
                <p className="text-muted-foreground">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Comprehensive Climate Solutions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand, optimize, and respond to climate challenges.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Card key={idx} className="border hover:border-primary/50 hover:shadow-lg transition-all">
                <CardHeader>
                  <Icon className="w-12 h-12 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <TrendingDown className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">42%</p>
              <p className="text-muted-foreground">Average Emission Reduction</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">500+</p>
              <p className="text-muted-foreground">Enterprise Clients</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">5⭐</p>
              <p className="text-muted-foreground">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Trusted by Leaders</h2>
          <p className="text-lg text-muted-foreground">See what our users are achieving.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx}>
              <CardHeader>
                <p className="text-lg mb-4">"{testimonial.quote}"</p>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-primary/20 to-secondary/20 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated on Climate Action</h2>
          <p className="text-muted-foreground mb-8">
            Get the latest tips, features, and climate insights delivered to your inbox.
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
