import React, { useState } from "react";
import { Search, ShoppingBag, Heart, Menu, X, ArrowUpRight, Percent } from "lucide-react";
import { Page } from "../types";

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  setSelectedCategory: (category: string) => void;
}

export default function Header({
  currentPage,
  setCurrentPage,
  searchQuery,
  setSearchQuery,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  setSelectedCategory,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigations: { name: string; value: Page }[] = [
    { name: "Home", value: "home" },
    { name: "Products", value: "products" },
    { name: "Categories", value: "categories" },
    { name: "Offers", value: "offers" },
    { name: "My Orders", value: "orders" },
    { name: "About Us", value: "about" },
    { name: "Contact", value: "contact" },
  ];

  const handleNavClick = (value: Page) => {
    setCurrentPage(value);
    setMobileMenuOpen(false);
    if (value !== "categories") {
      setSelectedCategory("All");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (currentPage !== "products" && currentPage !== "categories") {
      setCurrentPage("products");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-xs">
      {/* Top Banner Accent */}
      <div className="bg-neutral-900 text-white text-xs py-2 px-4 text-center flex items-center justify-center gap-2">
        <Percent className="w-3.5 h-3.5 text-orange-400" />
        <span>LIMITED OFFER: Use Coupon <span className="font-mono font-semibold text-orange-400">CLICKBUY10</span> for 10% Off! FREE Shipping on orders over $50.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 cursor-pointer group"
            id="header-logo"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition">
              C
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-neutral-900 group-hover:text-blue-600 transition">
                Click<span className="text-blue-600 group-hover:text-neutral-900 transition">Buy</span>
              </span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest font-mono font-bold leading-none">Smart Shopping</span>
            </div>
          </div>

          {/* Core Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigations.map((item) => (
              <button
                key={item.value}
                id={`nav-${item.value}`}
                onClick={() => handleNavClick(item.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 cursor-pointer ${
                  currentPage === item.value
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center relative max-w-xs w-full mx-4">
            <span className="absolute left-3 text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition bg-gray-50/50"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-gray-400 hover:text-gray-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Utility Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-gray-700">
            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2.5 rounded-lg hover:bg-gray-100/80 transition relative group cursor-pointer"
              title="Open Wishlist"
              id="header-wishlist"
            >
              <Heart className="w-5.5 h-5.5 text-gray-700 group-hover:text-rose-500 group-hover:-translate-y-0.5 transition" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] sm:text-xs font-bold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="p-2.5 rounded-lg hover:bg-gray-100/80 transition relative group cursor-pointer"
              title="Open Shopping Cart"
              id="header-cart"
            >
              <ShoppingBag className="w-5.5 h-5.5 text-gray-700 group-hover:text-blue-600 group-hover:-translate-y-0.5 transition" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-600 text-white rounded-full text-[10px] sm:text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-lg hover:bg-gray-100 transition cursor-pointer"
              aria-label="Toggle Menu"
              id="header-mobile-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Search - under header bar on screens < md */}
      <div className="md:hidden px-4 pb-3 border-b border-gray-100 bg-white">
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search electronics, fashion, etc..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 text-sm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Responsive Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50 animate-fadeIn">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navigations.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition ${
                  currentPage === item.value
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-2 border-t border-gray-100 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWishlist();
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" /> My Wishlist
                </span>
                <span className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  {wishlistCount}
                </span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-600" /> Shopping Cart
                </span>
                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
