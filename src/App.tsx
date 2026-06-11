import React, { useState, useEffect } from "react";
import { 
  Star, Heart, ShoppingBag, ArrowRight, ShieldCheck, Mail, Sparkles, 
  ChevronRight, SlidersHorizontal, Search, RefreshCw, Layers, CheckCircle2,
  Trash2, Plus, Minus, Tag
} from "lucide-react";
import { Page, Product, CartItem, Coupon, Order } from "./types";
import { PRODUCTS, COUPONS } from "./data";

// Custom Subcomponents Imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import ProductDetails from "./components/ProductDetails";
import PromoOffers from "./components/PromoOffers";
import CheckoutModal from "./components/CheckoutModal";
import { AboutSection, ContactSection } from "./components/AboutContact";
import OrderHistory from "./components/OrderHistory";
import { ProductCompareTray, ProductCompareModal } from "./components/ProductCompare";

export default function App() {
  // Navigation & Page routing States
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart & Wishlist storage engines
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("clickbuy_cart");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem("clickbuy_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem("clickbuy_coupon");
    return saved ? JSON.parse(saved) : null;
  });

  // Dynamic user orders array synced with localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("clickbuy_orders");
    return saved ? JSON.parse(saved) : [];
  });

  // Dynamic product comparison list synced with localStorage
  const [compareList, setCompareList] = useState<Product[]>(() => {
    const saved = localStorage.getItem("clickbuy_compare");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // UI Drawer & Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Search, Filters & Sorting in Catalog view
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<number>(250);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>("Popular");

  // Notifications / Toast alerts system
  const [toasts, setToasts] = useState<{ id: string; message: string; type: "success" | "info" | "wishlist" }[]>([]);

  // Synced local Storage hooks
  useEffect(() => {
    localStorage.setItem("clickbuy_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("clickbuy_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("clickbuy_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("clickbuy_compare", JSON.stringify(compareList));
  }, [compareList]);

  // Order tracking methods
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Order ${newOrder.id} placed successfully!`, "success");
    setCurrentPage("orders");
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" as const } : o))
    );
    showToast(`Order ${orderId} has been cancelled successfully.`, "info");
  };

  const handleAdvanceOrderStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        let nextStatus: Order["status"] = o.status;
        if (o.status === "Processing") nextStatus = "Shipped";
        else if (o.status === "Shipped") nextStatus = "Out For Delivery";
        else if (o.status === "Out For Delivery") nextStatus = "Delivered";
        return { ...o, status: nextStatus };
      })
    );
    showToast("Advanced shipping status simulated!", "success");
  };

  // Product comparison methods
  const handleToggleCompare = (product: Product, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from comparisons.`, "info");
        return prev.filter((p) => p.id !== product.id);
      } else {
        if (prev.length >= 3) {
          showToast("Comparison shelf is full! You can compare up to 3 products.", "info");
          return prev;
        }
        showToast(`Added "${product.name}" to comparison matrix.`, "success");
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromCompare = (product: Product) => {
    setCompareList((prev) => prev.filter((p) => p.id !== product.id));
    showToast(`Removed "${product.name}" from comparison shelf.`, "info");
  };

  const handleClearCompare = () => {
    setCompareList([]);
    showToast("Comparison tray reset.", "info");
  };

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem("clickbuy_coupon", JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem("clickbuy_coupon");
    }
  }, [appliedCoupon]);

  // Toast dynamic trigger helper
  const showToast = (message: string, type: "success" | "info" | "wishlist" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // CART STATE OPERATIONAL LOGIC
  const handleAddToCart = (product: Product, quantity: number = 1, size?: string, color?: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    
    // Assert and assign default attributes if not provided but available
    const resolvedSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
    const resolvedColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => 
          item.product.id === product.id && 
          item.selectedSize === resolvedSize && 
          item.selectedColor === resolvedColor
      );

      if (existingIdx > -1) {
        const cloned = [...prev];
        cloned[existingIdx].quantity += quantity;
        return cloned;
      } else {
        return [...prev, { product, quantity, selectedSize: resolvedSize, selectedColor: resolvedColor }];
      }
    });

    const label = resolvedSize || resolvedColor 
      ? `(${resolvedSize ? "Size: " + resolvedSize : ""}${resolvedSize && resolvedColor ? ", " : ""}${resolvedColor ? "Color: " + resolvedColor : ""})` 
      : "";
    showToast(`Added ${quantity}x ${product.name} ${label} to your shopping cart!`, "success");
  };

  const handleUpdateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId, size, color);
      return;
    }
    setCart((prev) => 
      prev.map((item) => 
        item.product.id === productId && 
        item.selectedSize === size && 
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string, size?: string, color?: string) => {
    setCart((prev) => 
      prev.filter(
        (item) => 
          !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
      )
    );
    showToast("Removed item from cart.", "info");
  };

  const handleClearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // WISHLIST STATE OPERATIONAL LOGIC
  const handleToggleWishlist = (product: Product, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();

    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed "${product.name}" from your wishlist.`, "info");
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Added "${product.name}" to your wishlist!`, "wishlist");
    }
  };

  // COUPON VALIDATION ENGINE
  const handleApplyCoupon = (code: string) => {
    const couponObj = COUPONS.find((c) => c.code === code.trim().toUpperCase());
    if (couponObj) {
      setAppliedCoupon(couponObj);
      showToast(`Discount coupon code "${couponObj.code}" applied successfully!`, "success");
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast("Promo discount code removed.", "info");
  };

  // BUY NOW EXPLICIT PATHWAY
  const handleBuyNow = (product: Product, quantity: number = 1, size?: string, color?: string) => {
    // Add to cart first
    const resolvedSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
    const resolvedColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
    
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => 
          item.product.id === product.id && 
          item.selectedSize === resolvedSize && 
          item.selectedColor === resolvedColor
      );
      if (existingIdx > -1) {
        const cloned = [...prev];
        cloned[existingIdx].quantity = quantity; // overwrite to match detail quantities
        return cloned;
      } else {
        return [...prev, { product, quantity, selectedSize: resolvedSize, selectedColor: resolvedColor }];
      }
    });

    // Close product inspect overlay and boot secure checkout flow instantly!
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // PRODUCT FILTERING COMPILATIONS
  const filteredProducts = PRODUCTS.filter((product) => {
    // 1. Category check
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    
    // 2. Search check (Name / Categories / description query match)
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // 3. Price limit check
    const matchesPrice = product.price <= priceRange;

    // 4. Rating limit check
    const matchesRating = product.rating >= ratingFilter;

    return matchesCategory && matchesSearch && matchesPrice && matchesRating;
  });

  // SORTING SELECTION LOGIC
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "Newest") {
      // Tags with "New" always floats to top
      const aNew = a.tag === "New" ? 1 : 0;
      const bNew = b.tag === "New" ? 1 : 0;
      return bNew - aNew;
    }
    if (sortOption === "LowToHigh") {
      return a.price - b.price;
    }
    if (sortOption === "HighToLow") {
      return b.price - a.price;
    }
    // "Popular" by default uses ratings and review counts
    return (b.rating * b.reviewCount) - (a.rating * a.reviewCount);
  });

  // Reset all filters shortcut
  const handleResetFilters = () => {
    setPriceRange(250);
    setRatingFilter(0);
    setSearchQuery("");
    setSortOption("Popular");
    setSelectedCategory("All");
    showToast("Catalog filters restored to default.", "info");
  };

  // Navigating to exact category hub helper
  const handleCategoryCardClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentPage("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Static items count
  const cartItemTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Demo Newsletter form dispatch action
  const handleNewsletterSubscribe = (email: string) => {
    showToast(`Subscribed! Check your inbox ${email} for your 10% coupon: CLICKBUY10!`, "success");
  };

  // Contact form submission action
  const handleContactSubmission = (data: { name: string; email: string }) => {
    showToast(`Thank you ${data.name}! Our Customer team will email you soon.`, "success");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-800 font-sans flex flex-col justify-between selection:bg-blue-600/10 selection:text-blue-600">
      
      {/* GLOBAL HEADER MODULE */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartItemTotalCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          setSelectedCategory("All");
          setCurrentPage("products");
          // Instant search or filter by wishlist elements by setting search or rating parameters
          showToast("Scroll down to find products. You can trace check wishlisted stars!", "info");
        }}
        setSelectedCategory={setSelectedCategory}
      />

      {/* ACTIVE PAGE CONTENT ROUTING STAGE */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* --- PAGE: HOME HUB --- */}
        {currentPage === "home" && (
          <div className="space-y-16 animate-fadeIn" id="home-page-stage">
            
            {/* HERO PROMOTIONS SECTION */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-100 shadow-xs relative overflow-hidden">
              {/* Abstract decorative graphic spots */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl -z-10 -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-orange-50 rounded-full blur-2xl -z-10 -ml-20 -mb-20"></div>

              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
                  <Sparkles className="w-4 h-4 text-orange-505" />
                  <span>Your Premium Dynamic E-Store</span>
                </div>
                
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-none">
                  Shop Smart.<br />
                  Click Fast.<br />
                  <span className="text-blue-600">Buy Better.</span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                  Discover top-performance electronics, high-quality organic fashion, stylish daily accessories, and sustainable lifestyle products at the best prices with fully verified customer support.
                </p>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setCurrentPage("products");
                    }}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 px-8 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition cursor-pointer"
                  >
                    Shop Intelligent Catalog <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentPage("offers")}
                    className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 px-8 rounded-2xl text-sm sm:text-base border border-gray-200/60 transition cursor-pointer"
                  >
                    View Seasonal Offers
                  </button>
                </div>

                {/* Secure Badge indicators */}
                <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-gray-450 font-medium">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4.5 h-4.5 text-emerald-500" /> Secure SSL Checked Out</span>
                  <span className="flex items-center gap-1.5">★ 4.9 Buyer Rating</span>
                  <span className="flex items-center gap-1.5">✓ 30-Day Money-Back Warranty</span>
                </div>
              </div>

              {/* Visually stunning Featured hero visual (Electronics headset or smartwatch sample image) */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="w-full max-w-sm aspect-square bg-gray-50 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 p-4 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
                    alt="Featured Product Headset"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-6 bottom-6 bg-white/94 backdrop-blur-md p-4 rounded-xl border border-gray-100 shadow-lg flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest leading-none">Best Seller</span>
                      <h4 className="text-xs sm:text-sm font-extrabold text-gray-800 truncate max-w-[150px] mt-0.5">SonicPro ANC Headset</h4>
                      <p className="font-mono text-xs font-black text-gray-900 mt-1">$189.99</p>
                    </div>
                    <button
                      onClick={() => {
                        const headphones = PRODUCTS.find((p) => p.id === "elec-1");
                        if (headphones) setSelectedProduct(headphones);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-3 rounded-lg transition shrink-0 cursor-pointer"
                    >
                      Inspect Details
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURED CATEGORIES SECTION */}
            <section className="space-y-6">
              <div className="flex justify-between items-baseline">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">Featured Categories</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Explore premium inventory categorized cleanly by shopper requirements.</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setCurrentPage("products");
                  }}
                  className="text-xs sm:text-sm text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  See All Categories <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { name: "Electronics", items: "4 Items Available", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=350&q=80", bg: "bg-blue-50" },
                  { name: "Fashion", items: "3 Items Available", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=350&q=80", bg: "bg-emerald-50" },
                  { name: "Accessories", items: "3 Items Available", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=350&q=80", bg: "bg-amber-50" },
                  { name: "Lifestyle", items: "4 Items Available", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=350&q=80", bg: "bg-pink-50" },
                ].map((cat) => (
                  <div
                    key={cat.name}
                    id={`cat-card-${cat.name.toLowerCase()}`}
                    onClick={() => handleCategoryCardClick(cat.name)}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer"
                  >
                    <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-106 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent"></div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <h4 className="font-bold text-neutral-850 text-base sm:text-lg group-hover:text-blue-600 transition">
                        {cat.name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">{cat.items}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* TRENDING PRODUCTS COLLECTION */}
            <section className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">Trending Collections</h2>
                <p className="text-xs text-gray-400 mt-1">High satisfaction ratings across early-season reviewers.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {PRODUCTS.slice(0, 4).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onProductClick={setSelectedProduct}
                    onAddToCart={(p, e) => handleAddToCart(p, 1, undefined, undefined, e)}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlist.some((w) => w.id === p.id)}
                    onToggleCompare={handleToggleCompare}
                    isCompared={compareList.some((c) => c.id === p.id)}
                  />
                ))}
              </div>
            </section>

            {/* SPLID-OUT FLASH BEST DEALS BANNER */}
            <section className="bg-orange-50/55 border border-orange-100 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 max-w-lg text-center md:text-left">
                <span className="text-[10px] bg-orange-500 text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Limited flash Sale
                </span>
                <h3 className="font-black text-gray-900 text-xl sm:text-2xl mt-2 tracking-tight">
                  Hot Deals! Save Up to 33% on Horizon Classic Sunglasses
                </h3>
                <p className="text-xs sm:text-sm text-gray-550 leading-relaxed">
                  Polarized classic sunglasses with lightweight frames and full UV400 rated protection. Only $39.99 (usually $59.99). Active coupon compatible!
                </p>
              </div>
              
              <div className="flex gap-3 shrink-0 w-full sm:w-auto justify-center">
                <button
                  onClick={() => {
                    const glasses = PRODUCTS.find((p) => p.id === "acc-1");
                    if (glasses) setSelectedProduct(glasses);
                  }}
                  className="bg-neutral-900 hover:bg-black text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition cursor-pointer"
                >
                  Claim Hot Offer
                </button>
                <button
                  onClick={() => setCurrentPage("offers")}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-md shadow-orange-500/10 transition cursor-pointer"
                >
                  View All Offers
                </button>
              </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="bg-gray-50 border border-gray-100 py-10 px-6 sm:p-12 rounded-3xl space-y-8">
              <div className="text-center space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">What Click Buy Shoppers Say</h2>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">Real verified testimonials from across our global buyer system.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Robert Cheney", role: "Verified Buyer", stars: 5, quote: "Ordered the SonicPro Wireless NC Headset on Monday morning, and it landed on my porch Wednesday. ANC quality is elite and matches my high-end studio models easily." },
                  { name: "Samantha Ross", role: "Premium Club member", stars: 5, quote: "Applied SAVEMORE20 coupon instantly on my cart without issues. Click Buy has an incredibly beautiful interface. Returning sizes is also completely free." },
                  { name: "Li Na", role: "Frequent Shopper", stars: 5, quote: "The organic combed cotton tee feels exceptionally breathable. Kept its shape perfectly across repeated wash protocols. Hands-down the best minimal apparel I own." }
                ].map((test, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex text-amber-500">
                        {[...Array(test.stars)].map((_, s) => <Star key={s} className="w-3.5 h-3.5 fill-amber-500" />)}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                        "{test.quote}"
                      </p>
                    </div>
                    <div className="border-t border-gray-100 pt-3 mt-4 flex justify-between items-center">
                      <div>
                        <span className="text-xs font-bold text-gray-950 block">{test.name}</span>
                        <span className="text-[10px] text-gray-450 uppercase tracking-wider">{test.role}</span>
                      </div>
                      <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-bold text-[10px] flex items-center justify-center">✔</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* HOME NEWSLETTER BANNER */}
            <section className="bg-gradient-to-r from-neutral-900 to-stone-900 text-white rounded-3xl p-8 sm:p-10 lg:p-12 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                <div className="md:col-span-7 space-y-4 text-center md:text-left">
                  <span className="bg-orange-500/15 text-orange-400 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-orange-500/10 inline-block font-mono">
                    EXCLUSIVE BENCHMARK SAVINGS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                    Get 10% Off Your First Purchase
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto md:mx-0 leading-relaxed">
                    Subscribe to our exclusive shopper list and retrieve a secure <strong className="text-orange-400 font-bold">10% discount promo code</strong> directly in your inbox within minutes. Stay current on weekly inventory drops.
                  </p>
                </div>

                <div className="md:col-span-5">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = (e.target as any).elements.emailInput;
                      if (input && input.value) {
                        handleNewsletterSubscribe(input.value);
                        input.value = "";
                      }
                    }}
                    className="flex flex-col gap-2.5"
                  >
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-gray-500">
                        <Mail className="w-4.5 h-4.5" />
                      </span>
                      <input
                        id="emailInput"
                        name="emailInput"
                        type="email"
                        required
                        placeholder="Elizabeth@bennett.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white/10"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md transition cursor-pointer"
                    >
                      Retrieve My 10% Voucher
                    </button>
                  </form>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* --- PAGE: PRODUCTS CATALOG HUB --- */}
        {currentPage === "products" && (
          <div className="space-y-8 animate-fadeIn" id="catalog-page-stage">
            
            {/* Catalog Page Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-150">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">Product Catalog</h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Active Filter: <span className="text-blue-650 font-bold uppercase tracking-wide">{selectedCategory}</span> • Showing <strong>{sortedProducts.length}</strong> catalog items
                </p>
              </div>

              {/* Sorting and quick Reset options */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="text-gray-400 font-semibold uppercase tracking-wider">Sort by:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg py-1 px-3.5 text-xs text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-504/10"
                  >
                    <option value="Popular">Best Customer Match</option>
                    <option value="Newest">New Arrivals First</option>
                    <option value="LowToHigh">Price: Low to High</option>
                    <option value="HighToLow">Price: High to Low</option>
                  </select>
                </div>

                <button
                  onClick={handleResetFilters}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-1 px-3 text-xs font-bold border border-gray-200 transition cursor-pointer"
                >
                  Reset Layout
                </button>
              </div>
            </div>

            {/* Split layout: left sidebars filters, right products grids */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* left sidebar filters */}
              <div className="lg:col-span-3 bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 space-y-6">
                
                {/* Search sidebar filter descriptor */}
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-gray-905 text-sm uppercase tracking-wider">Filters Panel</h3>
                </div>

                {/* Categories selector stack */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-widest block">Categories</label>
                  <div className="flex flex-col gap-1 text-xs">
                    {["All", "Electronics", "Fashion", "Accessories", "Lifestyle"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left py-2 px-3.5 rounded-lg font-bold transition flex items-center justify-between cursor-pointer ${
                          selectedCategory === cat
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-black"
                        }`}
                      >
                        <span>{cat}</span>
                        <span className="text-[10px] text-gray-300 font-semibold bg-gray-100/50 py-0.2 px-1.5 rounded-full group-hover:bg-blue-100">
                          {cat === "All" ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Slider */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-baseline">
                    <label className="text-xs font-bold text-gray-800 uppercase tracking-widest block">Max Price</label>
                    <span className="text-sm font-extrabold text-blue-600">${priceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="250"
                    step="5"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
                    <span>$15 min</span>
                    <span>$250 max</span>
                  </div>
                </div>

                {/* Ratings Slider / selection */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-widest block">Minimum Rating</label>
                  <div className="flex flex-col gap-1">
                    {[0, 4.5, 4.7, 4.8].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setRatingFilter(rating)}
                        className={`text-xs font-bold text-left py-1.5 px-3 rounded-lg flex items-center justify-between transition cursor-pointer ${
                          ratingFilter === rating
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "text-gray-650 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          {rating === 0 ? "All Ratings" : `${rating}+ Stars`}
                        </span>
                        {rating > 0 && (
                          <div className="flex text-amber-500">
                            {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-amber-500 text-amber-500" : "text-gray-100"}`} />)}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wishlist Highlight Filters toggle */}
                <div className="pt-3 border-t border-gray-150">
                  <div className="bg-rose-50/40 border border-rose-100/50 rounded-xl p-3 text-xs leading-normal">
                    <span className="text-rose-600 font-extrabold text-[10px] block mb-1 uppercase tracking-wider">Wishlisted Items</span>
                    <p className="text-gray-550 mb-2">Filters count showing wishlisted stars on click actions.</p>
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span>My Wishlist Size</span>
                      <span className="bg-rose-500 text-white px-2 py-0.5 rounded-full">{wishlist.length}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* right products grids */}
              <div className="lg:col-span-9 space-y-6">
                
                {/* Search term summary block */}
                {searchQuery && (
                  <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-3 flex justify-between items-center text-xs">
                    <span>Active Search results for: <strong className="text-blue-700">"{searchQuery}"</strong></span>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-blue-600 hover:text-black font-bold underline cursor-pointer"
                    >
                      Clear Search
                    </button>
                  </div>
                )}

                {sortedProducts.length === 0 ? (
                  /* Zero Match Case */
                  <div className="bg-white rounded-3xl p-12 text-center border border-gray-150 relative">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-4">
                      <Search className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-gray-905 text-lg mb-1">No products match your parameters</h3>
                    <p className="text-xs text-gray-400 max-w-[280px] mx-auto mb-6 leading-relaxed">
                      We couldn't spot any items under that price range, classification star, or search query term.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="bg-neutral-900 hover:bg-black text-white font-bold py-2.5 px-6 rounded-xl text-xs transition cursor-pointer"
                    >
                      Restore All Defaults
                    </button>
                  </div>
                ) : (
                  /* Standard Card Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onProductClick={setSelectedProduct}
                        onAddToCart={(p, e) => handleAddToCart(p, 1, undefined, undefined, e)}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={wishlist.some((w) => w.id === p.id)}
                        onToggleCompare={handleToggleCompare}
                        isCompared={compareList.some((c) => c.id === p.id)}
                      />
                    ))}
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* --- PAGE: CATEGORIES GATEWAY SECTION --- */}
        {currentPage === "categories" && (
          <div className="space-y-12 animate-fadeIn" id="categories-page-stage">
            
            <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 py-1 px-3 rounded-full inline-block">
                Curated Store Hubs
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                Shop Our Structured Categories
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                Pick a designated wing to narrow down your preferences across electronics specs, comfort items, organic clothing, and clay aesthetics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: "Electronics", items: "Premium smart watches, hybrid noise-isolating ANC wireless headphones, tactile mechanical backlit boards, and outdoor heavy bass party speakers.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", count: 4 },
                { name: "Fashion", items: "Classic genuine top-grain cafe leather jackets, sustainable cotton interlock knitted basic tee essentials, and fleece jogging sweatpants.", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80", count: 3 },
                { name: "Accessories", items: "Horizon polarized classic acetate shades, RFID-blocking full-grain slim wallets, and waterproof technical nomad technical travel backpacks.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80", count: 3 },
                { name: "Lifestyle", items: "HydraSip double leakproof stainless steel thermal flasks, biodegradable lavender relaxation candles, and CertiPUR-US scented foam neck cushions.", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80", count: 4 }
              ].map((c) => (
                <div 
                  key={c.name}
                  onClick={() => handleCategoryCardClick(c.name)}
                  className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group cursor-pointer"
                >
                  <div className="w-full sm:w-44 lg:w-52 bg-gray-100 aspect-video sm:aspect-auto overflow-hidden shrink-0">
                    <img 
                      src={c.image} 
                      alt={c.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition" 
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{c.name} Dept</span>
                        <span className="text-[10px] bg-blue-50 text-blue-600 font-extrabold px-1.5 py-0.2 rounded-full font-mono">{c.count} items</span>
                      </div>
                      <h3 className="font-extrabold text-neutral-850 text-lg mb-1 leading-tight group-hover:text-blue-600 transition">
                        {c.name} Catalog
                      </h3>
                      <p className="text-xs text-gray-400 leading-normal">
                        {c.items}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between text-xs font-bold text-blue-600">
                      <span>Explore products dept</span>
                      <span className="group-hover:translate-x-1 transition-transform">➔</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* --- PAGE: OFFERS SEASON STAGE --- */}
        {currentPage === "offers" && (
          <PromoOffers 
            onApplyCoupon={handleApplyCoupon}
            onNavigateToProducts={() => {
              setSelectedCategory("All");
              setCurrentPage("products");
            }}
          />
        )}

        {/* --- PAGE: ABOUT STORY STAGE --- */}
        {currentPage === "about" && (
          <AboutSection 
            onExploreProducts={() => {
              setSelectedCategory("All");
              setCurrentPage("products");
            }}
          />
        )}

        {/* --- PAGE: CONTACT & SUPPORT CLASS --- */}
        {currentPage === "contact" && (
          <ContactSection 
            onContactSubmit={handleContactSubmission}
          />
        )}

        {/* --- PAGE: LIVE ORDER SHIPMENT TRACKING --- */}
        {currentPage === "orders" && (
          <OrderHistory
            orders={orders}
            onCancelOrder={handleCancelOrder}
            onAdvanceStatus={handleAdvanceOrderStatus}
            onShopNow={() => {
              setSelectedCategory("All");
              setCurrentPage("products");
            }}
          />
        )}

      </main>

      {/* GLOBAL FOOTER SECTION */}
      <Footer 
        setCurrentPage={setCurrentPage}
        onSubscribe={handleNewsletterSubscribe}
        setSelectedCategory={setSelectedCategory}
      />

      {/* --- FLOATING / INTERACTIVE DETAILED SPECIFICATIONS MODAL --- */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlist.some((w) => w.id === selectedProduct.id)}
          onProductClick={(p) => {
            setSelectedProduct(p);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      {/* --- SLIDING SHOPPING CART DRAWERS PANEL --- */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        onShopNow={() => {
          setSelectedCategory("All");
          setCurrentPage("products");
        }}
      />

      {/* --- INTEGRATED SECURE CHECKOUT MODAL WINDOW --- */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        appliedCoupon={appliedCoupon}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* --- PRODUCT COMPARISON FLOATING TRAY & SPEC MATRIX MODAL --- */}
      <ProductCompareTray
        compareList={compareList}
        onRemoveFromCompare={handleRemoveFromCompare}
        onClearCompare={handleClearCompare}
        onOpenCompareModal={() => setIsCompareOpen(true)}
      />

      <ProductCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareList={compareList}
        onRemoveFromCompare={handleRemoveFromCompare}
        onAddToCart={(p, e) => handleAddToCart(p, 1, undefined, undefined, e)}
      />

      {/* --- GLOBAL FLOATING REAL-TIME TOASTS CONSOLE --- */}
      <div 
        className="fixed bottom-6 right-6 z-50 space-y-2.5 max-w-sm w-full pointer-events-none"
        id="toast-notifications-portal"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-xl flex items-start gap-2.5 text-xs font-semibold animate-slideLeft ${
              toast.type === "success" 
                ? "bg-neutral-900 text-white border-l-4 border-l-emerald-500"
                : toast.type === "wishlist"
                  ? "bg-rose-500 text-white"
                  : "bg-blue-600 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-504 shrink-0" />
            ) : (
              <Sparkles className="w-5 h-5 text-white animate-pulse shrink-0" />
            )}
            <div className="flex-grow">
              {toast.message}
            </div>
            <button 
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-white/60 hover:text-white font-bold ml-1.5 cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
