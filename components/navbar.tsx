"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Mountain, ChevronDown, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState<"en" | "ne">("en")

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Mountain className="w-6 h-6" />
            <span>EcoTrack Nepal</span>
            <span className="text-sm nepali-text text-muted-foreground">इकोट्र्याक नेपाल</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition">
              Dashboard
            </Link>
            <Link href="/carbon-tracker" className="text-sm font-medium hover:text-primary transition">
              Tracker
            </Link>
            <Link href="/data-center-optimizer" className="text-sm font-medium hover:text-primary transition">
              Optimizer
            </Link>
            <Link href="/alerts" className="text-sm font-medium hover:text-primary transition">
              Alerts
            </Link>
            <Link href="/disaster-resilience" className="text-sm font-medium hover:text-primary transition">
              Resilience
            </Link>
            <Link href="/profile" className="text-sm font-medium hover:text-primary transition">
              Profile
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Globe className="w-4 h-4 mr-2" />
                  {language === "en" ? "English" : "नेपाली"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ne")}>नेपाली (Nepali)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Account
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/dashboard" className="block px-4 py-2 hover:bg-muted rounded">
              Dashboard
            </Link>
            <Link href="/carbon-tracker" className="block px-4 py-2 hover:bg-muted rounded">
              Tracker
            </Link>
            <Link href="/data-center-optimizer" className="block px-4 py-2 hover:bg-muted rounded">
              Optimizer
            </Link>
            <Link href="/alerts" className="block px-4 py-2 hover:bg-muted rounded">
              Alerts
            </Link>
            <Link href="/disaster-resilience" className="block px-4 py-2 hover:bg-muted rounded">
              Resilience
            </Link>
            <Link href="/profile" className="block px-4 py-2 hover:bg-muted rounded">
              Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
