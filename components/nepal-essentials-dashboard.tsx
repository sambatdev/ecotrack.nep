"use client"

import { useState } from "react"
import { X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { RoadTrekkingStatusWidget } from "./road-trekking-status-widget"
import { BandhAlertWidget } from "./bandh-alert-widget"
import { LoadSheddingFuelWidget } from "./loadshedding-fuel-widget"
import { cn } from "@/lib/utils"

export function NepalEssentialsDashboard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 rounded-full px-6 shadow-lg transition-all hover:scale-105 md:bottom-8 md:right-8"
        size="lg"
      >
        <Menu className="mr-2 h-5 w-5" />
        <span className="font-semibold">Nepal Essentials</span>
        <span className="nepali-text ml-1">/ दैनिक</span>
      </Button>

      {/* Mobile: Bottom Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" className="h-[85vh] overflow-y-auto md:hidden">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <span>Nepal Daily Essentials</span>
              <span className="nepali-text">/ नेपाल दैनिक आवश्यक</span>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4 pb-6">
            <BandhAlertWidget />
            <RoadTrekkingStatusWidget />
            <LoadSheddingFuelWidget />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop: Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 z-40 hidden h-screen w-96 transform border-l bg-background shadow-2xl transition-transform duration-300 md:block",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <div>
              <h2 className="text-lg font-semibold">Nepal Daily Essentials</h2>
              <p className="nepali-text text-sm text-muted-foreground">नेपाल दैनिक आवश्यक</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <BandhAlertWidget />
              <RoadTrekkingStatusWidget />
              <LoadSheddingFuelWidget />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 hidden bg-black/50 backdrop-blur-sm md:block"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
