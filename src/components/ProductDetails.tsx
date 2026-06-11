import React, { useState, useEffect } from "react";
import { X, Star, Heart, ShoppingBag, CreditCard, ChevronRight, MessageSquare, Check, ShieldCheck, RefreshCw } from "lucide-react";
import { Product, Review } from "../types";
import { PRODUCTS } from "../data";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  onBuyNow: (product: Product, quantity: number, size?: string, color?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onProductClick: (product: Product) => void;
}

export default function ProductDetails({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onProductClick,
}: ProductDetailsProps) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  
  // Review form state
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [localReviews, setLocalReviews] = useState<Review[]>(product.reviews);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState("");

  // Whenever product changes, update main image and state
  useEffect(() => {
    setActiveImage(product.image);
    setQuantity(1);
    setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : "");
    setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0].name : "");
    setLocalReviews(product.reviews);
    setReviewSuccessMsg("");
    // Scroll modal contents to top
    const modalEl = document.getElementById("product-detail-layout");
    if (modalEl) modalEl.scrollTop = 0;
  }, [product]);

  // Adjust quantity helpers
  const handleIncreaseQty = () => setQuantity(prev => prev + 1);
  const handleDecreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Handle Review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRevObj: Review = {
      id: `local-rev-${Date.now()}`,
      name: newReviewName.trim(),
      rating: newReviewRating,
      date: new Date().toISOString().split("T")[0],
      comment: newReviewComment.trim(),
      verified: true
    };

    setLocalReviews(prev => [newRevObj, ...prev]);
    setNewReviewName("");
    setNewReviewRating(5);
    setNewReviewComment("");
    setReviewSuccessMsg("Thank you! Your verified review has been published instantly.");
  };

  // Filter in-category related products (excluding the current product)
  const relatedProducts = PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="product-detail-modal">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-10 relative">
        <div 
          id="product-detail-layout"
          className="relative bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-y-auto max-h-[90vh] sm:max-h-[85vh] animate-slideUp flex flex-col"
        >
          {/* Top Sticky Close */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-black shadow-md border border-gray-100 transition hover:scale-105 cursor-pointer"
              aria-label="Close product specs"
              id="close-details-btn"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Breadcrumb path */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-6 uppercase tracking-wider">
              <span>Home</span>
              <ChevronRight className="w-3 h-3" />
              <span>{product.category}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
            </div>

            {/* Core Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-10 border-b border-gray-100">
              
              {/* Image & Thumbnails Gallery column */}
              <div className="flex flex-col gap-4">
                {/* Main Large Stage */}
                <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative group flex items-center justify-center">
                  <img
                    src={activeImage}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {product.tag && (
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Thumbnails Gallery */}
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-1.5">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(img)}
                        className={`w-18 h-18 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0 border transition-all ${
                          activeImage === img
                            ? "border-blue-600 ring-2 ring-blue-500/10"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info, Attributes, and CTAs column */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 py-1 px-3 rounded-full inline-block mb-3">
                    {product.category}
                  </span>
                  
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-2">
                    {product.name}
                  </h1>

                  {/* Rating & Review quickstats */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "fill-amber-500" : "text-gray-200"
                          }`}
                        />
                      ))}
                      <span className="text-sm font-semibold text-gray-800 ml-1.5">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">|</span>
                    <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> {localReviews.length} Verified Reviews
                    </span>
                  </div>

                  {/* Pricing Layout */}
                  <div className="flex items-center gap-3 mb-6 bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                    <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-sm sm:text-base text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                        <span className="text-xs font-extrabold bg-red-105 text-red-600 px-2 py-0.5 rounded-md uppercase">
                          Save {product.discountPercentage}%
                        </span>
                      </>
                    )}
                  </div>

                  {/* Product Narrative Description */}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* ATTRIBUTES FOR APPAREL SIZING */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="mb-5">
                      <div className="flex justify-between items-baseline mb-2">
                        <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                          Select Size
                        </label>
                        <span className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer">
                          Size Chart
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition border cursor-pointer ${
                              selectedSize === size
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "bg-white border-gray-200 hover:border-gray-400 text-gray-700"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ATTRIBUTES FOR COLORS */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mb-6">
                      <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2">
                        Select Color: <span className="font-semibold text-gray-650">{selectedColor}</span>
                      </label>
                      <div className="flex items-center gap-3">
                        {product.colors.map(color => (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColor(color.name)}
                            className={`w-8 h-8 rounded-full ${color.class} relative flex items-center justify-center border border-gray-300 transition-transform ${
                              selectedColor === color.name ? "scale-110 ring-2 ring-blue-500/30" : "hover:scale-105"
                            } cursor-pointer`}
                            title={color.name}
                          >
                            {selectedColor === color.name && (
                              <Check className={`w-4 h-4 ${color.name.includes("White") ? "text-gray-900" : "text-white"}`} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* QUANTITY CHOICE SELECTOR */}
                  {product.inStock && (
                    <div className="mb-6 flex items-center gap-4">
                      <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                        Quantity
                      </label>
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1">
                        <button
                          onClick={handleDecreaseQty}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-white hover:text-black transition cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-bold text-neutral-900 text-sm">
                          {quantity}
                        </span>
                        <button
                          onClick={handleIncreaseQty}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-white hover:text-black transition cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs text-emerald-600 font-semibold">✓ Ready to Ship</span>
                    </div>
                  )}
                </div>

                {/* CTAs BUTTONS GROUP */}
                <div className="space-y-3.5">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => onAddToCart(product, quantity, selectedSize, selectedColor)}
                      disabled={!product.inStock}
                      className="flex-1 bg-neutral-900 hover:bg-black text-white font-bold py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xs transition cursor-pointer active:scale-98"
                    >
                      <ShoppingBag className="w-4.5 h-4.5" /> Add to Cart
                    </button>
                    <button
                      onClick={() => onBuyNow(product, quantity, selectedSize, selectedColor)}
                      disabled={!product.inStock}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition cursor-pointer active:scale-98"
                      id="buy-now-btn"
                    >
                      <CreditCard className="w-4.5 h-4.5" /> Buy Now
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 py-2 border-t border-gray-100">
                    <button
                      onClick={() => onToggleWishlist(product)}
                      className="flex items-center gap-1.5 font-bold text-gray-650 hover:text-rose-500 transition cursor-pointer"
                    >
                      <Heart className={`w-4.5 h-4.5 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
                      {isWishlisted ? "Added to Wishlist!" : "Add to My Wishlist"}
                    </button>
                    <span className="flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure 256-bit bank checkout
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Structured Specifications Row */}
            <div className="py-10 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4">Technical Details & Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between items-center py-2.5 px-4 bg-gray-50/60 rounded-xl text-xs sm:text-sm">
                    <span className="text-gray-500 font-medium">{spec.label}</span>
                    <span className="text-gray-900 font-bold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Immersive Verified Reviews Section */}
            <div className="py-10 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Customer Reviews ({localReviews.length})</h3>
                  <p className="text-xs text-gray-400 mt-1">Verified purchases on the Click Buy network</p>
                </div>
                {/* Score breakdown metrics if any */}
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-extrabold text-neutral-900">{product.rating}</span>
                  <div className="text-xs">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-amber-500" : "text-gray-200"}`} />
                      ))}
                    </div>
                    <span className="text-gray-500 font-medium">Global satisfaction rating</span>
                  </div>
                </div>
              </div>

              {/* Verified reviews history */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-8">
                {localReviews.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No customer reviews yet. Be the first to express feedback!</p>
                ) : (
                  localReviews.map(r => (
                    <div key={r.id} className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xs font-bold text-gray-900">{r.name}</span>
                          {r.verified && (
                            <span className="ml-2 inline-flex items-center text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded uppercase">
                              ✔ Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 font-semibold">{r.date}</span>
                      </div>
                      <div className="flex text-amber-400 mb-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < r.rating ? "fill-amber-400" : "text-gray-200"}`} />
                        ))}
                      </div>
                      <p className="text-xs text-gray-650 leading-relaxed italic">
                        "{r.comment}"
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Dynamic Review Submission Form */}
              <div className="bg-gray-50/30 border border-gray-150 p-5 rounded-2xl">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Add Your Verified Review</h4>
                {reviewSuccessMsg && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl text-xs font-medium mb-4">
                    {reviewSuccessMsg}
                  </div>
                )}
                <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-850 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Star Rating</label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-850 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value={5}>5 Stars - Outstanding</option>
                        <option value={4}>4 Stars - Great</option>
                        <option value={3}>3 Stars - Average</option>
                        <option value={2}>2 Stars - Subpar</option>
                        <option value={1}>1 Star - Poor</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Detailed Comment</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share your honest assessment of the product acoustics, fabrics, or materials..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-805 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-neutral-800 hover:bg-black text-white font-bold py-2.5 px-6 rounded-xl text-xs transition cursor-pointer"
                  >
                    Post Review
                  </button>
                </form>
              </div>
            </div>

            {/* In-Category Related Products Grid */}
            <div className="pt-10">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-6">Related Recommendations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => onProductClick(p)}
                    className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md cursor-pointer group transition p-2 flex flex-col justify-between"
                  >
                    <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 relative">
                      <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 transition truncate">{p.name}</h4>
                      <p className="text-xs text-gray-550 font-bold mt-1">${p.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
