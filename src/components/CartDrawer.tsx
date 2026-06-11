import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Ticket } from "lucide-react";
import { CartItem, Coupon } from "../types";
import { COUPONS } from "../data";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  onRemoveItem: (productId: string, size?: string, color?: string) => void;
  onCheckout: () => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  onShopNow: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onShopNow,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  if (!isOpen) return null;

  // Pricing calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const shippingThreshold = 50;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 9.99;
  
  // Calculate discount based on applied coupon
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percentage") {
      discountAmount = subtotal * (appliedCoupon.discount / 100);
    } else {
      discountAmount = appliedCoupon.discount;
    }
    // If discount was larger than subtotal
    if (discountAmount > subtotal) discountAmount = subtotal;
  }

  const grandTotal = subtotal - discountAmount + shippingCost;

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const code = couponCode.trim().toUpperCase();
    const couponObj = COUPONS.find((c) => c.code === code);

    if (!couponObj) {
      setCouponError("Invalid coupon code.");
      return;
    }

    if (subtotal < couponObj.minPurchase) {
      setCouponError(`Min purchase of $${couponObj.minPurchase} required.`);
      return;
    }

    onApplyCoupon(code);
    setCouponError("");
    setCouponCode("");
  };

  const handleSelectSuggestedCoupon = (code: string) => {
    onApplyCoupon(code);
    setCouponError("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-overlay">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full transform transition duration-300 animate-slideLeft">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Your Shopping Cart</h2>
              <span className="bg-blue-50 text-blue-600 ml-1.5 px-2 py-0.5 rounded-full text-xs font-bold leading-none">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 transition cursor-pointer"
              aria-label="Close cart"
              id="close-cart-btn"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto py-4 px-6">
            
            {/* Free Shipping Alert Tracker */}
            {subtotal > 0 && (
              <div className="bg-blue-50 rounded-xl p-3 mb-5 border border-blue-100 text-xs">
                {subtotal >= shippingThreshold ? (
                  <p className="text-blue-800 font-semibold flex items-center gap-1.5">
                    🎉 Congratulations! Your order qualifies for <strong>FREE Shipping!</strong>
                  </p>
                ) : (
                  <div>
                    <div className="flex justify-between text-blue-800 font-medium mb-1">
                      <span>Add <strong>${(shippingThreshold - subtotal).toFixed(2)}</strong> more for FREE shipping</span>
                      <span>{Math.round((subtotal / shippingThreshold) * 100)}%</span>
                    </div>
                    <div className="w-full bg-blue-105 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full rounded-full transition-all duration-350"
                        style={{ width: `${(subtotal / shippingThreshold) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="h-full flex flex-col items-center justify-center py-10 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4 border border-dashed border-gray-200">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Your cart is empty</h3>
                <p className="text-sm text-gray-400 max-w-[250px] mb-6 leading-relaxed">
                  Looks like you haven't clicked anything into your shopping list yet.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onShopNow();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-sm transition shadow-sm cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              /* Cart Item List */
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize || "nosize"}-${item.selectedColor || "nocolor"}-${index}`}
                    className="flex items-stretch gap-4 p-3 bg-gray-50/50 border border-gray-100 rounded-xl hover:border-gray-200 transition"
                  >
                    {/* Item Image */}
                    <div className="w-18 h-18 bg-white rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow flex flex-col justify-between text-xs sm:text-sm">
                      <div>
                        <h4 className="font-semibold text-gray-800 line-clamp-1">
                          {item.product.name}
                        </h4>
                        
                        {/* Attributes row */}
                        {(item.selectedSize || item.selectedColor) && (
                          <div className="flex flex-wrap gap-2 mt-1 text-[11px] text-gray-500 font-medium">
                            {item.selectedSize && (
                              <span className="bg-gray-100 px-1.5 py-0.5 rounded">
                                Size: {item.selectedSize}
                              </span>
                            )}
                            {item.selectedColor && (
                              <span className="bg-gray-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                                Color: {item.selectedColor}
                              </span>
                            )}
                          </div>
                        )}
                        
                        <div className="font-bold text-gray-900 mt-1">
                          ${(item.product.price).toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Controls and Trash */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100/60">
                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                            className="p-1 rounded text-gray-500 hover:bg-gray-50 active:scale-95 transition cursor-pointer"
                            id={`qty-minus-${item.product.id}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                            className="p-1 rounded text-gray-500 hover:bg-gray-50 active:scale-95 transition cursor-pointer"
                            id={`qty-plus-${item.product.id}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)}
                          className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50/50 transition cursor-pointer"
                          aria-label="Remove item"
                          id={`item-trash-${item.product.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing Breakdown & Checkout Trigger */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-5 bg-gray-50/80">
              
              {/* Coupon Form */}
              <div className="mb-4">
                {appliedCoupon ? (
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-lg py-2 px-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <Ticket className="w-4 h-4 text-emerald-600" />
                      <span>Code <strong>{appliedCoupon.code}</strong> applied (-${discountAmount.toFixed(2)})</span>
                    </div>
                    <button 
                      onClick={onRemoveCoupon}
                      className="text-emerald-700 hover:text-emerald-950 underline font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCouponSubmit} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="PROMO CODE"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-grow bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-neutral-800 placeholder-gray-400 uppercase font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="submit"
                      className="bg-neutral-800 hover:bg-black text-white font-bold py-1.5 px-4 rounded-lg text-xs transition uppercase tracking-wider cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-red-500 text-[11px] mt-1.5 font-medium">{couponError}</p>}

                {/* Available Coupons Shortcut Chips */}
                {!appliedCoupon && (
                  <div className="mt-2">
                    <p className="text-[10px] text-gray-400 font-semibold mb-1">CRAVING DISCOUNTS? PRESS TO USE:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {COUPONS.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => handleSelectSuggestedCoupon(c.code)}
                          disabled={subtotal < c.minPurchase}
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                            subtotal >= c.minPurchase
                              ? "bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100"
                              : "bg-gray-150 text-gray-400 cursor-not-allowed border border-transparent"
                          }`}
                          title={c.description}
                        >
                          {c.code}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Precise Breakdown List */}
              <div className="space-y-1.5 text-sm pb-4 border-b border-gray-200/60 text-gray-600">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="text-gray-900 font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Coupon Discount</span>
                    <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Protection</span>
                  <span className="text-gray-900 font-semibold">
                    {shippingCost === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base text-gray-950 font-bold pt-1.5">
                  <span>Grand Total</span>
                  <span className="text-blue-600">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={onCheckout}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-99 transition cursor-pointer"
                id="cart-proceed-checkout"
              >
                <ShieldCheck className="w-5 h-5" /> Proceed to Checkout
              </button>
              
              <p className="text-[10px] text-gray-400 text-center mt-2 font-medium">
                🛡️ Complete SSL encryption. Secured transaction.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
