"use client"

import { Heart, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">PRANAY PREMIUM</h3>
                <p className="text-stone-400 text-sm">LOOTS & DEALS</p>
              </div>
            </div>
            <p className="text-stone-400 mb-6 max-w-md">
              Your trusted platform for discovering premium deals from top Indian e-commerce platforms. Save money while
              shopping for the best products.
            </p>
            <div className="flex items-center space-x-2 text-stone-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>in India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#fashion" className="text-stone-400 hover:text-orange-400 transition-colors">
                  Men's Fashion
                </a>
              </li>
              <li>
                <a href="#footwear" className="text-stone-400 hover:text-orange-400 transition-colors">
                  Footwear
                </a>
              </li>
              <li>
                <a href="#tech" className="text-stone-400 hover:text-orange-400 transition-colors">
                  Tech & Gadgets
                </a>
              </li>
              <li>
                <a href="#grooming" className="text-stone-400 hover:text-orange-400 transition-colors">
                  Grooming
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-stone-400">hello@pranayloots.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="text-stone-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="text-stone-400">Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-stone-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-stone-400 text-sm mb-4 md:mb-0">© 2024 Pranay Premium Loots. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-stone-400 hover:text-orange-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-stone-400 hover:text-orange-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-stone-400 hover:text-orange-400 transition-colors text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
