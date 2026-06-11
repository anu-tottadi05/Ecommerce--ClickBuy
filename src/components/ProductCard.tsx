import React from "react";
import { Star, Heart, ShoppingCart, RefreshCw } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, event?: any) => void;
  isWishlisted: boolean;
  onToggleCompare?: (product: Product, event: React.MouseEvent) => void;
  isCompared?: boolean;
}

export default function ProductCard({
  product,
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onToggleCompare,
  isCompared = false,
}: ProductCardProps) {
  const getTagColor = (tag: string) => {
    switch (tag) {
      case "New":
        return "bg-emerald-500 text-white";
      case "Sale":
        return "bg-red-500 text-white";
      case "Best Seller":
        return "bg-amber-500 text-white";
      case "Trending":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onProductClick(product)}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col group cursor-pointer relative"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-107 transition-all duration-500"
        />

        {/* Dynamic Tag Badge */}
        {product.tag && (
          <span className={`absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm z-10 ${getTagColor(product.tag)}`}>
            {product.tag}
          </span>
        )}

        {/* Wishlist Circle Switch */}
        <button
          onClick={(e) => onToggleWishlist(product, e)}
          className="absolute top-3 right-3 w-9 h-9 bg-white/94 backdrop-blur-xs rounded-full flex items-center justify-center text-gray-500 hover:text-rose-500 hover:scale-110 active:scale-95 transition shadow-sm z-10 border border-gray-100/50 cursor-pointer"
          aria-label="Add to wishlist"
          id={`wishlist-btn-${product.id}`}
        >
          <Heart
            className={`w-4.5 h-4.5 transition-colors ${
              isWishlisted ? "fill-rose-500 text-rose-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Compare Circle Switch */}
        {onToggleCompare && (
          <button
            onClick={(e) => onToggleCompare(product, e)}
            className={`absolute top-14 right-3 w-9 h-9 backdrop-blur-xs rounded-full flex items-center justify-center transition-all shadow-sm z-10 border border-gray-100/50 cursor-pointer hover:scale-110 active:scale-95 ${
              isCompared
                ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                : "bg-white/94 text-gray-500 hover:text-blue-600"
            }`}
            aria-label="Compare product"
            title={isCompared ? "Remove from comparison" : "Add to side-by-side comparison"}
            id={`compare-btn-${product.id}`}
          >
            <RefreshCw
              className={`w-4 h-4 transition-all ${
                isCompared ? "rotate-180 text-white" : "text-gray-600"
              }`}
            />
          </button>
        )}

        {/* Hover quick review overlays (optional, stylized details) */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center z-10">
            <span className="bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-md">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Information Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Category & Ratings row */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">
            {product.category}
          </span>
          <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-[11px] font-semibold text-amber-700">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2 leading-tight mb-2 group-hover:text-blue-600 transition">
          {product.name}
        </h3>

        {/* Space Spacer */}
        <div className="flex-grow"></div>

        {/* Price layout */}
        <div className="mt-3 flex items-baseline justify-between gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-neutral-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.discountPercentage && (
            <span className="text-[10px] font-extrabold bg-red-105 text-red-600 px-1.5 py-0.5 rounded-md">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Core ADD TO CART Trigger */}
        <button
          onClick={(e) => onAddToCart(product, e)}
          disabled={!product.inStock}
          className={`mt-4 w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition duration-200 cursor-pointer ${
            product.inStock
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow-md hover:shadow-blue-500/10 active:scale-98"
              : "bg-gray-150 text-gray-400 cursor-not-allowed"
          }`}
          id={`add-to-cart-${product.id}`}
        >
          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
