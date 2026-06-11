import React from "react";
import { Product } from "../types";
import { X, Scale, ShoppingCart, CheckCircle2, ChevronRight, HelpCircle, Star } from "lucide-react";

interface ProductCompareTrayProps {
  compareList: Product[];
  onRemoveFromCompare: (product: Product) => void;
  onClearCompare: () => void;
  onOpenCompareModal: () => void;
}

export function ProductCompareTray({
  compareList,
  onRemoveFromCompare,
  onClearCompare,
  onOpenCompareModal,
}: ProductCompareTrayProps) {
  if (compareList.length === 0) return null;

  return (
    <div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl bg-neutral-900 text-white rounded-2xl shadow-2xl border border-neutral-800 p-4 animate-slideUp flex flex-col sm:flex-row items-center justify-between gap-4"
      id="compare-tray-portal"
    >
      <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto">
        <div className="bg-blue-600 p-2 rounded-xl text-white shrink-0">
          <Scale className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Compare Products ({compareList.length}/3)</h4>
          <p className="text-[10px] text-gray-400">Add up to 3 items for side-by-side specifications.</p>
        </div>

        {/* Thumbnail grid */}
        <div className="flex gap-2 ml-4">
          {compareList.map((product) => (
            <div key={product.id} className="relative w-10 h-10 aspect-square bg-neutral-800 rounded-lg overflow-hidden border border-neutral-700 group shrink-0">
              <img src={product.image} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => onRemoveFromCompare(product)}
                className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center text-[8px] font-bold shadow-md cursor-pointer transition-transform group-hover:scale-105"
                title="Remove product"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
        <button
          onClick={onClearCompare}
          className="text-xs text-gray-400 hover:text-white font-medium hover:underline cursor-pointer transition"
        >
          Clear All
        </button>
        <button
          onClick={onOpenCompareModal}
          disabled={compareList.length < 2}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            compareList.length >= 2
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 active:scale-97"
              : "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700"
          }`}
        >
          Compare Side-By-Side <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface ProductCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareList: Product[];
  onRemoveFromCompare: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
}

export function ProductCompareModal({
  isOpen,
  onClose,
  compareList,
  onRemoveFromCompare,
  onAddToCart,
}: ProductCompareModalProps) {
  if (!isOpen) return null;

  // Gather all unique spec keys across compared items
  const allSpecKeysMap = new Map<string, string>();
  compareList.forEach((prod) => {
    prod.specs.forEach((s) => {
      allSpecKeysMap.set(s.label, s.label);
    });
  });
  const allSpecKeys = Array.from(allSpecKeysMap.keys());

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="compare-modal-root">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-10 relative">
        <div className="relative bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden animate-scaleUp flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 text-blue-600 p-2.5 rounded-2xl">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900">Side-By-Side Product Comparison</h2>
                <p className="text-xs text-gray-500">Evaluating specifications, pricing, and buyer parameters directly.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl cursor-pointer transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrolling Matrix Layout */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-grow space-y-6">
            <div className="grid grid-cols-12 gap-4 border-b border-gray-100 pb-6 items-stretch">
              
              {/* Row Specs Left Marker Header */}
              <div className="hidden md:flex col-span-3 items-center text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">
                Core Metrics
              </div>

              {/* Dynamic products columns */}
              <div className={`col-span-12 md:col-span-9 grid gap-4`} style={{ gridTemplateColumns: `repeat(${compareList.length}, minmax(0, 1fr))` }}>
                {compareList.map((product) => (
                  <div key={product.id} className="relative bg-gray-50/50 border border-gray-150 p-4 rounded-2xl flex flex-col justify-between group">
                    {/* Remove individual column */}
                    <button
                      onClick={() => onRemoveFromCompare(product)}
                      className="absolute top-2 right-2 p-1 text-gray-405 hover:text-rose-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                      title="Remove from comparison list"
                    >
                      <X className="w-4.5 h-4.5" />
                    </button>

                    <div>
                      <div className="aspect-square bg-white border border-gray-150 rounded-xl overflow-hidden mb-3.5 max-w-[140px] mx-auto">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">
                        {product.category}
                      </span>
                      <h4 className="font-extrabold text-neutral-850 text-xs sm:text-sm line-clamp-2 leading-snug">
                        {product.name}
                      </h4>
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-4 flex flex-col gap-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm sm:text-base font-black text-neutral-900">${product.price.toFixed(2)}</span>
                        {product.originalPrice && <span className="text-[10px] text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>}
                      </div>

                      <button
                        onClick={(e) => onAddToCart(product, e)}
                        disabled={!product.inStock}
                        className={`w-full py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition ${
                          product.inStock
                            ? "bg-blue-600 hover:bg-blue-700 text-white active:scale-97 cursor-pointer"
                            : "bg-gray-150 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> In Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Matrix rows itemizations */}
            <div className="space-y-3">
              
              {/* Row: In Stock details */}
              <div className="grid grid-cols-12 gap-4 py-2.5 border-b border-gray-100 text-xs items-center">
                <span className="col-span-12 md:col-span-3 font-bold text-gray-500 uppercase tracking-wider">Availability</span>
                <div className="col-span-12 md:col-span-9 grid gap-4" style={{ gridTemplateColumns: `repeat(${compareList.length}, minmax(0, 1fr))` }}>
                  {compareList.map((product) => (
                    <div key={product.id} className="pl-1">
                      {product.inStock ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">✓ In Stock</span>
                      ) : (
                        <span className="text-rose-500 font-bold">✗ Out of Stock</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Row: Rating details */}
              <div className="grid grid-cols-12 gap-4 py-2.5 border-b border-gray-100 text-xs items-center">
                <span className="col-span-12 md:col-span-3 font-bold text-gray-500 uppercase tracking-wider">Customer Rating</span>
                <div className="col-span-12 md:col-span-9 grid gap-4" style={{ gridTemplateColumns: `repeat(${compareList.length}, minmax(0, 1fr))` }}>
                  {compareList.map((product) => (
                    <div key={product.id} className="flex items-center gap-1.5 pl-1">
                      <div className="flex text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      </div>
                      <span className="font-bold text-neutral-850">{product.rating}</span>
                      <span className="text-[10px] text-gray-400 font-semibold">({product.reviewCount} reviews)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unique technical specifications loops */}
              {allSpecKeys.map((key) => (
                <div key={key} className="grid grid-cols-12 gap-4 py-3 border-b border-gray-100 text-xs items-center">
                  <span className="col-span-12 md:col-span-3 font-bold text-gray-500 uppercase tracking-wider">{key}</span>
                  <div className="col-span-12 md:col-span-9 grid gap-4" style={{ gridTemplateColumns: `repeat(${compareList.length}, minmax(0, 1fr))` }}>
                    {compareList.map((product) => {
                      const spec = product.specs.find((s) => s.label === key);
                      return (
                        <div key={product.id} className="pl-1">
                          <span className="font-semibold text-gray-800 leading-normal block">
                            {spec ? spec.value : <span className="text-gray-300 italic">N/A</span>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Row: Description Summary */}
              <div className="grid grid-cols-12 gap-4 py-3 text-xs items-start">
                <span className="col-span-12 md:col-span-3 font-bold text-gray-500 uppercase tracking-wider">Product Story</span>
                <div className="col-span-12 md:col-span-9 grid gap-4" style={{ gridTemplateColumns: `repeat(${compareList.length}, minmax(0, 1fr))` }}>
                  {compareList.map((product) => (
                    <div key={product.id} className="pl-1">
                      <p className="text-gray-500 leading-relaxed font-medium">
                        {product.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-400">
            <span>Click Buy Automated Comparison Engine</span>
            <span>Up to 3 products are selectable for side-by-side spec diagnostics.</span>
          </div>

        </div>
      </div>
    </div>
  );
}
