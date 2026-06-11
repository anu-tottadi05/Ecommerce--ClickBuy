import React from "react";
import { ShieldCheck, Truck, RefreshCw, Headset, Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Page } from "../types";

interface FooterProps {
  setCurrentPage: (page: Page) => void;
  onSubscribe: (email: string) => void;
  setSelectedCategory: (category: string) => void;
}

export default function Footer({ setCurrentPage, onSubscribe, setSelectedCategory }: FooterProps) {
  const [email, setEmail] = React.useState("");

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribe(email);
      setEmail("");
    }
  };

  const handleCategoryNav = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage("categories");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageNav = (page: Page) => {
    setCurrentPage(page);
    setSelectedCategory("All");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-neutral-900 text-gray-300 pt-16 pb-8" id="footer-section">
      {/* 4 Pillars Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-800 pb-12 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600/10 text-blue-500 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-1">Free & Fast Delivery</h4>
              <p className="text-sm text-gray-400">On all orders above $50. Rapid state-wide tracking.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600/10 text-blue-500 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-1">100% Secure Payment</h4>
              <p className="text-sm text-gray-400">Dual bank-grade AES 256-bit transactional security.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600/10 text-blue-500 rounded-xl">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-1">Easy 30-Day Returns</h4>
              <p className="text-sm text-gray-400">Hassle-free shipping collections & instant refunds.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600/10 text-blue-500 rounded-xl">
              <Headset className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-1">24/7 Premium Support</h4>
              <p className="text-sm text-gray-400">Helpful customer success crew for live troubleshooting.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 border-b border-neutral-800 pb-12 mb-8">
        
        {/* Brand Information */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              Click<span className="text-blue-500">Buy</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-6 max-w-sm">
            Click Buy is your premium destination for high-performance electronics, sustainable fashion apparel, stylish accessories, and organic lifestyle utilities designed to fit everyday excellence.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-3">
            <a href="#facebook" className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#twitter" className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#instagram" className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#youtube" className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Categories Quick Links */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Top Categories</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><button onClick={() => handleCategoryNav("Electronics")} className="hover:text-blue-500 transition cursor-pointer">Electronics</button></li>
            <li><button onClick={() => handleCategoryNav("Fashion")} className="hover:text-blue-500 transition cursor-pointer">Fashion</button></li>
            <li><button onClick={() => handleCategoryNav("Accessories")} className="hover:text-blue-500 transition cursor-pointer">Accessories</button></li>
            <li><button onClick={() => handleCategoryNav("Lifestyle")} className="hover:text-blue-500 transition cursor-pointer">Lifestyle</button></li>
          </ul>
        </div>

        {/* Company Quick Links */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><button onClick={() => handlePageNav("home")} className="hover:text-blue-500 transition cursor-pointer">Home Hub</button></li>
            <li><button onClick={() => handlePageNav("products")} className="hover:text-blue-500 transition cursor-pointer">Product Catalog</button></li>
            <li><button onClick={() => handlePageNav("offers")} className="hover:text-blue-500 transition cursor-pointer">Trending Deals</button></li>
            <li><button onClick={() => handlePageNav("about")} className="hover:text-blue-500 transition cursor-pointer">About Click Buy</button></li>
            <li><button onClick={() => handlePageNav("contact")} className="hover:text-blue-500 transition cursor-pointer">Support Channels</button></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Newsletter</h3>
          <p className="text-xs text-gray-400 mb-3">Get 10% off on your first order. Stay updated on catalog drops.</p>
          <form onSubmit={handleSubscribeSubmit} className="flex flex-col gap-2">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                placeholder="Enter email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-800 border-none rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-neutral-850"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Subscribe
            </button>
          </form>
          {/* Trust Seal */}
          <div className="mt-4 pt-4 border-t border-neutral-850 flex items-center gap-2">
            <div className="w-5 h-5 bg-emerald-600/10 text-emerald-500 rounded-full flex items-center justify-center text-[10px]">✓</div>
            <span className="text-[10px] text-gray-400">Trusted Google merchant partner</span>
          </div>
        </div>

      </div>

      {/* Under Footer Credit & Trust Badge Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-500">
          &copy; 1888-2026 Click Buy Corp. All rights reserved. Designed for optimal conversion and maximum shopper speed.
        </p>
        <div className="flex items-center space-x-3 text-xs text-gray-500">
          <span>Accepting Securely:</span>
          {/* Simulated icons for payments */}
          <div className="flex items-center gap-1">
            <span className="bg-neutral-800 py-1 px-1.5 rounded text-[10px] font-mono hover:text-white font-bold tracking-tight">STRIPE</span>
            <span className="bg-neutral-800 py-1 px-1.5 rounded text-[10px] font-mono hover:text-white font-bold tracking-tight">VISA</span>
            <span className="bg-neutral-800 py-1 px-1.5 rounded text-[10px] font-mono hover:text-white font-bold tracking-tight">MC</span>
            <span className="bg-neutral-800 py-1 px-1.5 rounded text-[10px] font-mono hover:text-white font-bold tracking-tight">AMEX</span>
            <span className="bg-neutral-800 py-1 px-1.5 rounded text-[10px] font-mono hover:text-white font-bold tracking-tight">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
