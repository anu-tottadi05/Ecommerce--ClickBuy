import React, { useState, useEffect } from "react";
import { Copy, Check, Timer, Tag, Sparkles, ShoppingBag, Percent, ArrowUpRight } from "lucide-react";
import { COUPONS } from "../data";

interface PromoOffersProps {
  onApplyCoupon: (code: string) => void;
  onNavigateToProducts: () => void;
}

export default function PromoOffers({ onApplyCoupon, onNavigateToProducts }: PromoOffersProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Simulated Flash Sale Countdown Clock
  const [timeLeft, setTimeLeft] = useState({ HOURS: 12, MINUTES: 59, SECONDS: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { HOURS, MINUTES, SECONDS } = prev;
        if (SECONDS > 0) {
          SECONDS--;
        } else {
          SECONDS = 59;
          if (MINUTES > 0) {
            MINUTES--;
          } else {
            MINUTES = 59;
            if (HOURS > 0) {
              HOURS--;
            } else {
              // Reset to simulated 12 hours for next loop
              HOURS = 12;
            }
          }
        }
        return { HOURS, MINUTES, SECONDS };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Pre-packaged special combo items content
  const comboDeals = [
    {
      title: "The Smart Nomad Bundle",
      discount: "Save $60",
      description: "AeroWatch Chrono Series-7 + Nomad Waterproof Technical Backpack. The perfect combination for remote commuters.",
      price: "229.98",
      originalPrice: "289.98",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "The Ultimate Deep Sleep Set",
      discount: "Save $30",
      description: "SleepLux Orthopedic Scented memory pillow + Serene lavender soy wax candle. Wake up fully charged.",
      price: "49.98",
      originalPrice: "79.98",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80",
    }
  ];

  return (
    <div className="space-y-12 animate-fadeIn" id="offers-page-layout">
      
      {/* Immersive Summer Splash Season Offer Banner */}
      <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl overflow-hidden shadow-xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-2xl -ml-20 -mb-20"></div>

        <div className="space-y-4 max-w-lg relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span>Summer Carnivals Bonanza</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Up to <span className="text-orange-400">50% Off</span> on Premium Drops!
          </h2>
          <p className="text-sm sm:text-base text-blue-100 font-medium">
            Step into the next tier of smart purchasing. Discover high-quality electronic gear and apparel designed with responsive comfort parameters on massive markdowns.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button 
              onClick={onNavigateToProducts}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-3 px-6 rounded-xl transition duration-200 cursor-pointer text-sm shadow-md shadow-orange-500/10"
            >
              Shop the Sale Now
            </button>
            <span className="text-xs text-blue-100 font-medium">Ends June 30, 2026. Free shipping applies.</span>
          </div>
        </div>

        {/* Real-time Urgency countdown clock */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center w-full max-w-[280px] shrink-0">
          <div className="flex items-center justify-center gap-1.5 text-orange-400 mb-3">
            <Timer className="w-4 h-4 animate-bounce" />
            <span className="text-xs uppercase tracking-widest font-bold">Flash Sale Ends In:</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold bg-neutral-900/40 w-12 h-12 flex items-center justify-center rounded-xl font-mono border border-white/5">
                {String(timeLeft.HOURS).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-blue-100 uppercase tracking-wider mt-1 font-semibold">Hours</span>
            </div>
            <span className="text-xl font-bold leading-none -mt-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold bg-neutral-900/40 w-12 h-12 flex items-center justify-center rounded-xl font-mono border border-white/5">
                {String(timeLeft.MINUTES).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-blue-100 uppercase tracking-wider mt-1 font-semibold">Mins</span>
            </div>
            <span className="text-xl font-bold leading-none -mt-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold bg-neutral-900/40 w-12 h-12 flex items-center justify-center rounded-xl font-mono border border-white/5">
                {String(timeLeft.SECONDS).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-blue-100 uppercase tracking-wider mt-1 font-semibold">Secs</span>
            </div>
          </div>
          <p className="text-[10px] text-blue-100 mt-4 italic font-medium">Limited catalog inventory left</p>
        </div>
      </div>

      {/* Dynamic Mystery Scratch & Reveal Promo Card */}
      <section className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Background visual graphics */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-50 rounded-full blur-2xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-blue-50 rounded-full blur-2xl -ml-16 -mb-16"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-md text-center lg:text-left">
            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
              Interactive Member Bonus
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight leading-tight">
              Interactive Mystery Coupon Center
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-semibold">
              Click the virtual scratcher panel on the right to strip away the gold foil layer and reveal your matching secret high-tier promo discount code! Valid for 2 hours only.
            </p>
          </div>

          {/* Interactive scratcher box */}
          <div className="w-full max-w-[340px] shrink-0 bg-gray-50 border border-gray-200 p-4 rounded-2xl flex flex-col items-center">
            <MysteryScratcher onApplyCoupon={onApplyCoupon} />
          </div>
        </div>
      </section>

      {/* Dynamic Claimable Store Coupons */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 flex items-center gap-2">
            <Tag className="w-5 h-5 text-blue-600" /> Click-to-Apply Coupons
          </h3>
          <p className="text-xs text-gray-400 mt-1">Click the code to apply instant savings during cart review.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COUPONS.map((c) => (
            <div 
              key={c.code}
              className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col justify-between hover:shadow-lg transition relative overflow-hidden group border-l-4 border-l-blue-600"
            >
              {/* Scissors clip styling circle */}
              <div className="absolute top-1/2 -left-2.5 w-5 h-5 bg-gray-50 border border-gray-150 rounded-full"></div>
              <div className="absolute top-1/2 -right-2.5 w-5 h-5 bg-gray-50 border border-gray-150 rounded-full"></div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-600 font-mono tracking-wide uppercase bg-blue-50 py-0.5 px-2 rounded">
                    {c.type === "percentage" ? `${c.discount}% OFF` : `$${c.discount} FLAT SAVINGS`}
                  </span>
                  <Percent className="w-4 h-4 text-gray-300" />
                </div>
                
                <h4 className="font-extrabold text-neutral-850 text-xl tracking-tight mb-1">
                  {c.code}
                </h4>
                <p className="text-xs text-gray-400 font-semibold mb-2 leading-tight">
                  {c.description}
                </p>
                <p className="text-[10px] text-gray-400 font-medium">
                  {c.minPurchase > 0 ? `Minimum shopping spend: $${c.minPurchase}` : "No minimum transaction spend required"}
                </p>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyCode(c.code)}
                  className="flex-shrink-0 p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition cursor-pointer"
                  title="Copy Code"
                >
                  {copiedCode === c.code ? <Check className="w-4 h-4 text-emerald-650" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onApplyCoupon(c.code);
                    handleCopyCode(c.code);
                  }}
                  className="flex-grow bg-neutral-900 hover:bg-black text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
                >
                  Apply to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Combo Deals Section */}
      <section className="space-y-6">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" /> Best Curated Combo Deals
          </h3>
          <p className="text-xs text-gray-400 mt-1">Pre-packaged premium pairings delivering maximum value with single-click checkouts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {comboDeals.map((combo, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl transition duration-300 flex flex-col sm:flex-row items-stretch"
            >
              {/* Combo Image */}
              <div className="w-full sm:w-44 lg:w-48 bg-gray-50 shrink-0 relative aspect-video sm:aspect-auto">
                <img 
                  src={combo.image} 
                  alt={combo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase">
                  {combo.discount}
                </span>
              </div>

              {/* Combo Details */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="font-extrabold text-neutral-850 text-base sm:text-lg mb-1 leading-tight group-hover:text-blue-600">
                    {combo.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    {combo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-4 mt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-black text-neutral-900">${combo.price}</span>
                    <span className="text-xs text-gray-400 line-through">${combo.originalPrice}</span>
                  </div>
                  <button 
                    onClick={onNavigateToProducts}
                    className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 transition cursor-pointer"
                  >
                    Explore Items <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

function MysteryScratcher({ onApplyCoupon }: { onApplyCoupon: (code: string) => void }) {
  const [scratchState, setScratchState] = useState<"hidden" | "scratching" | "revealed">("hidden");
  const [revealedCode, setRevealedCode] = useState<{ code: string; label: string; desc: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const bonusPool = [
    { code: "MYSTERY25", label: "25% OFF EX-VIP", desc: "Slashes full 25% off storewide above $50!" },
    { code: "LUCKY50", label: "$50 COURIER GIFT", desc: "Flat $50 off on total carts above $180!" },
    { code: "FREESHIP", label: "FREE SHIPPING MATCH", desc: "$10 flat savings on standard checkouts!" },
  ];

  const handleScratchReveal = () => {
    if (scratchState !== "hidden") return;
    setScratchState("scratching");
    
    setTimeout(() => {
      // Pick a random code from pool
      const picked = bonusPool[Math.floor(Math.random() * bonusPool.length)];
      setRevealedCode(picked);
      setScratchState("revealed");
    }, 1800);
  };

  const handleCopy = () => {
    if (!revealedCode) return;
    navigator.clipboard.writeText(revealedCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full text-center py-2 space-y-4">
      {scratchState === "hidden" && (
        <button
          onClick={handleScratchReveal}
          type="button"
          className="w-full aspect-video bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 rounded-xl relative shadow-md hover:shadow-lg hover:scale-101 transition-all duration-300 border border-amber-500/30 flex flex-col items-center justify-center cursor-pointer group"
        >
          <div className="absolute inset-2 border border-dashed border-white/40 rounded-lg flex flex-col items-center justify-center p-3 text-amber-950">
            <Sparkles className="w-8 h-8 text-white animate-pulse mb-1.5 drop-shadow-xs" />
            <span className="font-extrabold text-sm uppercase tracking-widest drop-shadow-xs text-white">Mystery Scratcher</span>
            <span className="text-[10px] text-white/95 font-bold mt-1">Tap to rub & scratch foil</span>
          </div>
        </button>
      )}

      {scratchState === "scratching" && (
        <div className="w-full aspect-video bg-gray-200 rounded-xl flex flex-col items-center justify-center space-y-2 border border-dashed border-gray-300 animate-pulse">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-extrabold text-orange-600 block uppercase tracking-widest">Stripping gold foil...</p>
        </div>
      )}

      {scratchState === "revealed" && revealedCode && (
        <div className="w-full aspect-video bg-neutral-900 rounded-xl border-l-4 border-l-orange-500 p-4 flex flex-col justify-between text-left shadow-lg animate-fadeIn relative overflow-hidden">
          {/* Sparkles background */}
          <div className="absolute top-0 right-0 p-1 text-orange-400 animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>

          <div>
            <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest block mb-0.5">Voucher Unveiled</span>
            <h4 className="text-white text-base font-black font-mono tracking-wider">{revealedCode.code}</h4>
            <p className="text-xs font-bold text-white mt-1 uppercase tracking-wide">{revealedCode.label}</p>
            <p className="text-[10px] text-gray-400 font-semibold mt-1 leading-snug">{revealedCode.desc}</p>
          </div>

          <div className="flex gap-2 mt-3 z-10">
            <button
              onClick={handleCopy}
              type="button"
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-extrabold px-3 py-1.5 rounded-lg text-[10px] transition cursor-pointer border border-neutral-700"
            >
              {copied ? "Copied!" : "Copy Code"}
            </button>
            <button
              onClick={() => {
                onApplyCoupon(revealedCode.code);
              }}
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-3 py-1.5 rounded-lg text-[10px] transition cursor-pointer flex-grow text-center"
            >
              Apply instantly
            </button>
          </div>
        </div>
      )}

      <div className="text-[10px] text-gray-400 font-semibold leading-normal">
        {scratchState === "hidden" && "🔒 Reward is randomized. Click the scratchcard to draw."}
        {scratchState === "scratching" && "🎁 Drawing from pool..."}
        {scratchState === "revealed" && "🎉 Congratulations! Tap Apply instantly to apply to your active bag."}
      </div>
    </div>
  );
}
