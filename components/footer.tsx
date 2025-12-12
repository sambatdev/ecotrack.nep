import Link from "next/link"
import { Leaf } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-primary mb-4">
              <Leaf className="w-5 h-5" />
              <span>EcoTrack Pro</span>
            </div>
            <p className="text-sm text-muted-foreground">Track, optimize, and protect your path to a greener future.</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/carbon-tracker" className="text-muted-foreground hover:text-primary transition">
                  Carbon Tracker
                </Link>
              </li>
              <li>
                <Link href="/data-center-optimizer" className="text-muted-foreground hover:text-primary transition">
                  Data Center Optimizer
                </Link>
              </li>
              <li>
                <Link href="/disaster-resilience" className="text-muted-foreground hover:text-primary transition">
                  Disaster Resilience
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2025 EcoTrack Pro. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition text-sm">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition text-sm">
              LinkedIn
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition text-sm">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
