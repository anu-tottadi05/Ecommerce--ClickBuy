import React, { useState } from "react";
import { X, CreditCard, ShieldCheck, CheckCircle, Truck, ShoppingBag, ArrowLeft } from "lucide-react";
import { CartItem, Coupon, Order } from "../types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  onClearCart: () => void;
  onPlaceOrder?: (order: Order) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  appliedCoupon,
  onClearCart,
  onPlaceOrder,
}: CheckoutModalProps) {
  // Input form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNum: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const [checkoutStep, setCheckoutStep] = useState<"form" | "success">("form");
  const [generatedOrderId, setGeneratedOrderId] = useState("");
  const [estimateDeliveryDate, setEstimateDeliveryDate] = useState("");

  if (!isOpen) return null;

  // Calculators
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const shippingCost = subtotal >= 50 || subtotal === 0 ? 0 : 9.99;
  
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percentage") {
      discountAmount = subtotal * (appliedCoupon.discount / 100);
    } else {
      discountAmount = appliedCoupon.discount;
    }
    if (discountAmount > subtotal) discountAmount = subtotal;
  }

  const grandTotal = subtotal - discountAmount + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Verify minimal inputs (HTML required flags take care of most, but let's assert basic sanity)
    if (!formData.name || !formData.email || !formData.address || !formData.city) {
      return;
    }

    // Generate random dynamic Order Parameters
    const randomId = "CB-" + Math.floor(100000 + Math.random() * 900000);
    setGeneratedOrderId(randomId);

    // Delivery calculation (approx 4 days from now)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 4);
    const dateOptions: Intl.DateTimeFormatOptions = { weekday: "long", month: "short", day: "numeric", year: "numeric" };
    const estDelivery = futureDate.toLocaleDateString("en-US", dateOptions);
    setEstimateDeliveryDate(estDelivery);

    if (onPlaceOrder) {
      const newOrder: Order = {
        id: randomId,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        customerName: formData.name,
        customerEmail: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        items: [...cartItems],
        subtotal: subtotal,
        discount: discountAmount,
        shipping: shippingCost,
        total: grandTotal,
        status: "Processing",
        estimatedDelivery: estDelivery,
      };
      onPlaceOrder(newOrder);
    }

    // Progress flow
    setCheckoutStep("success");
  };

  const handleCloseSuccess = () => {
    // Clear cart and close modal
    onClearCart();
    setCheckoutStep("form");
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      cardNum: "",
      cardExpiry: "",
      cardCvv: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="checkout-modal-root">
      {/* Backdrop */}
      <div 
        onClick={checkoutStep === "form" ? onClose : undefined}
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8 relative">
        <div className="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-scaleUp">
          
          {checkoutStep === "form" ? (
            /* ACTIVE CHECKOUT FORM VIEW */
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Form Input Container (Left portion) */}
              <div className="lg:col-span-7 p-6 sm:p-8 overflow-y-auto max-h-[80vh] sm:max-h-none">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
                    <ShieldCheck className="text-blue-600 w-6 h-6" /> Secure Client Checkout
                  </h2>
                  <button 
                    onClick={onClose}
                    className="p-1 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg cursor-pointer transition lg:hidden"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-5" id="checkout-shipping-form">
                  {/* Contact info details */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">1. Contact Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Elizabeth Bennett"
                          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="elizabeth@domain.com"
                          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 789-3242"
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {/* Delivery details */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">2. Delivery Address</h3>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 mb-1">Street Address *</label>
                      <input
                        type="text"
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Serene Boulevard, Suite 4B"
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-[11px] font-bold text-gray-500 mb-1">City *</label>
                        <input
                          type="text"
                          required
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Seattle"
                          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 mb-1">State *</label>
                        <input
                          type="text"
                          required
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="WA"
                          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 mb-1">ZIP / Postal *</label>
                        <input
                          type="text"
                          required
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          placeholder="98101"
                          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Details (Secure, SSL protected) */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                      <span>3. Secure Payment Credentials</span>
                      <span className="text-[10px] text-emerald-600 flex items-center gap-1 bg-emerald-50 px-1.5 py-0.2 rounded font-mono font-bold leading-none">
                        HTTPS SECURE
                      </span>
                    </div>
                    <div className="bg-blue-50/10 border border-blue-105 p-4 rounded-2xl space-y-3.5">
                      <div className="relative">
                        <label className="block text-[11px] font-bold text-gray-500 mb-0.5">Credit Card Number *</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-gray-400">
                            <CreditCard className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            required
                            name="cardNum"
                            value={formData.cardNum}
                            pattern="\d{16}"
                            maxLength={16}
                            onChange={handleInputChange}
                            placeholder="4111222233334444"
                            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 mb-0.5">Expiration MM/YY *</label>
                          <input
                            type="text"
                            required
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            placeholder="12/28"
                            maxLength={5}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 mb-0.5">CVV Code *</label>
                          <input
                            type="password"
                            required
                            name="cardCvv"
                            value={formData.cardCvv}
                            placeholder="•••"
                            maxLength={3}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex items-center justify-between gap-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={onClose}
                      className="bg-gray-100 hover:bg-gray-250 text-gray-700 font-bold py-2.5 px-5 rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Go Back
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl text-xs sm:text-sm shadow-xl shadow-blue-500/20 active:scale-98 transition flex items-center gap-1.5 cursor-pointer"
                      id="place-order-submit"
                    >
                      ✓ Complete Secure Order (${grandTotal.toFixed(2)})
                    </button>
                  </div>
                </form>
              </div>

              {/* Order Checkout Summary Panel (Right portion) */}
              <div className="lg:col-span-5 bg-gray-50 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-gray-150 flex flex-col justify-between">
                <div>
                  <div className="hidden lg:flex justify-between items-center mb-6">
                    <h3 className="font-bold text-neutral-900 text-sm sm:text-base">Order Summary</h3>
                    <button 
                      onClick={onClose}
                      className="p-1 px-1.5 text-gray-400 hover:text-black hover:bg-gray-200 rounded-lg cursor-pointer transition text-xs"
                    >
                      Close [X]
                    </button>
                  </div>

                  {/* Cart review items */}
                  <div className="space-y-3.5 max-h-[180px] lg:max-h-[300px] overflow-y-auto pr-1">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex gap-3 text-xs sm:text-sm items-center">
                        <div className="w-11 h-11 bg-white border border-gray-200 rounded-lg overflow-hidden shrink-0">
                          <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="truncate flex-grow leading-tight">
                          <h4 className="font-semibold text-gray-800 truncate">{item.product.name}</h4>
                          <span className="text-[10px] text-gray-450 font-bold">Qty: {item.quantity} {item.selectedSize && `• Size: ${item.selectedSize}`}</span>
                        </div>
                        <span className="font-bold text-gray-905 shrink-0">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bill details itemizations */}
                <div className="border-t border-gray-200 pt-5 mt-6 space-y-2 text-xs sm:text-sm text-gray-600 bg-white/50 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-gray-905 font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Coupon ({appliedCoupon.code})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Delivery</span>
                    <span>{shippingCost === 0 ? <strong className="text-emerald-650">FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-black text-gray-900 border-t border-gray-150 pt-2 text-sm sm:text-base">
                    <span>Total Bill</span>
                    <span className="text-blue-600">${grandTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="bg-blue-105/50 border border-dashed border-blue-200 p-2.5 rounded-lg text-[10px] text-blue-800 leading-normal mt-4">
                    🚛 Express tracking notifications will stream directly to your email automatically within minutes.
                  </div>
                </div>

              </div>

            </div>
          ) : (
            /* CONVERSION FOCUSED SUCCESS ANIMATED SCREEN */
            <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-6 max-w-xl mx-auto">
              {/* Success Ring animation keyframe */}
              <div className="w-18 h-18 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-pulse">
                <CheckCircle className="w-12 h-12 stroke-2" />
              </div>

              <div>
                <span className="bg-emerald-50 text-emerald-650 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-emerald-100 inline-block mb-3">
                  TRANSACTION COMPLETE SECURELY
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-tight">
                  Order Successfully Placed!
                </h2>
                <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
                  Thank you for shopping at Click Buy, <strong className="font-semibold text-neutral-850">{formData.name}</strong>. Your transaction was processed securely. A detailed payment invoice has been transmitted to <span className="font-mono text-xs font-semibold text-blue-600 underline">{formData.email}</span>.
                </p>
              </div>

              {/* Order specific detail parameters */}
              <div className="w-full bg-gray-50 border border-gray-150 rounded-2xl p-4 sm:p-5 text-left grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
                <div>
                  <span className="text-gray-400 font-semibold block mb-0.5">ORDER ID</span>
                  <span className="text-gray-905 font-black text-sm uppercase tracking-wider font-mono">{generatedOrderId}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block mb-0.5">ESTIMATED COURIER ARRIVAL</span>
                  <span className="text-blue-600 font-bold block">{estimateDeliveryDate}</span>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-gray-200 flex items-center justify-between text-gray-550">
                  <span>Shipping Address:</span>
                  <strong className="text-gray-850 font-bold">{formData.address}, {formData.city}, {formData.state}</strong>
                </div>
              </div>

              {/* Courier service icons and status */}
              <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                <Truck className="w-5 h-5 text-blue-605" />
                <span>Shipping partner: <strong>DHL Express Worldwide</strong></span>
              </div>

              {/* Dismiss CTA */}
              <button
                onClick={handleCloseSuccess}
                className="w-full max-w-sm bg-neutral-900 hover:bg-black text-white font-bold py-3.5 px-6 rounded-2xl text-sm sm:text-base leading-none transition cursor-pointer"
                id="close-success-dismiss"
              >
                Continue Browsing Click Buy
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
