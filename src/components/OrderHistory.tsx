import React, { useState } from "react";
import { Order } from "../types";
import { Package, Truck, Calendar, ShoppingBag, MapPin, CheckCircle, RefreshCcw, HelpCircle, XCircle } from "lucide-react";

interface OrderHistoryProps {
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onAdvanceStatus: (orderId: string) => void;
  onShopNow: () => void;
}

export default function OrderHistory({
  orders,
  onCancelOrder,
  onAdvanceStatus,
  onShopNow,
}: OrderHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some((item) => item.product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Processing":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Shipped":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "Out For Delivery":
        return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "Delivered":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Cancelled":
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const getStatusStepIndex = (status: Order["status"]) => {
    switch (status) {
      case "Processing":
        return 0;
      case "Shipped":
        return 1;
      case "Out For Delivery":
        return 2;
      case "Delivered":
        return 3;
      case "Cancelled":
        return -1;
      default:
        return 0;
    }
  };

  const steps = [
    { label: "Order Placed", desc: "Warehouse processing begun" },
    { label: "With Courier", desc: "DHL Express worldwide" },
    { label: "Out For Delivery", desc: "En route to property" },
    { label: "Delivered", desc: "Handed over & validated" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn" id="order-history-viewport">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 py-1 px-3 rounded-full inline-block mb-2">
            Personal Account Desk
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">
            My Purchases & Order Tracker
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track real-time shipment status, review receipt vouchers, and manage your e-store deliveries.
          </p>
        </div>

        {/* Search / Filter box */}
        {orders.length > 0 && (
          <div className="relative w-full max-w-xs shrink-0">
            <input
              type="text"
              placeholder="Search by Order ID or Product Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-black font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {orders.length === 0 ? (
        /* Empty Purchase History Page */
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-150 max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 text-lg mb-1">No Orders Placed Yet</h3>
            <p className="text-xs text-gray-400 max-w-[340px] mx-auto leading-relaxed">
              You haven't checked out our premium inventory yet. Add top rated items to your cart and complete secure checkout to track live delivery metrics here.
            </p>
          </div>
          <button
            onClick={onShopNow}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl text-sm leading-none transition shadow-lg shadow-blue-500/10 cursor-pointer"
          >
            Start Smart Shopping
          </button>
        </div>
      ) : filteredOrders.length === 0 ? (
        /* Zero matches after matching filter */
        <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200">
          <h4 className="font-bold text-gray-700 text-sm">No results match your search term</h4>
          <p className="text-xs text-gray-400 mt-1">Try typing a different order code number or product term.</p>
        </div>
      ) : (
        /* Orders list */
        <div className="space-y-8">
          {filteredOrders.map((order) => {
            const stepIdx = getStatusStepIndex(order.status);
            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-gray-150 shadow-xs hover:border-gray-250 transition-all duration-300 overflow-hidden"
              >
                {/* Order Top Banner Details */}
                <div className="bg-gray-50/50 border-b border-gray-100 p-5 sm:p-6 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">ORDER ID</span>
                      <span className="font-mono text-sm font-black text-gray-900 uppercase">{order.id}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">DATE OF ORDER</span>
                      <span className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" /> {order.date}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">TOTAL AMOUNT</span>
                      <span className="text-xs font-black text-blue-600">${order.total.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">COURIER PARTNER</span>
                      <span className="text-xs font-semibold text-gray-800 select-all">DHL Express Standard</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className={`px-3 py-1 font-bold text-xs uppercase tracking-wider rounded-lg border flex items-center gap-1 leading-none ${getStatusColor(order.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {order.status}
                    </span>

                    {/* Simulation buttons */}
                    {order.status !== "Delivered" && order.status !== "Cancelled" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => onAdvanceStatus(order.id)}
                          className="p-1 px-2.5 bg-neutral-900 hover:bg-black text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition cursor-pointer"
                          title="Simulate DHL shipment travel progress"
                        >
                          <RefreshCcw className="w-3 h-3 animate-spin" /> Advance Step
                        </button>
                        <button
                          onClick={() => onCancelOrder(order.id)}
                          className="p-1 px-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-[10px] font-bold rounded-lg flex items-center gap-1 transition border border-rose-100 cursor-pointer"
                        >
                          Cancel Order
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery Tracker Content */}
                <div className="p-6 sm:p-8 space-y-8">
                  {order.status !== "Cancelled" ? (
                    <div>
                      {/* Interactive Couriers Shipment Progress Stepper */}
                      <div className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-6 flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-blue-600" /> DHL Live Tracking Status Timeline
                      </div>

                      <div className="block lg:flex justify-between items-start gap-4 space-y-6 lg:space-y-0 relative">
                        {/* Connecting background bar */}
                        <div className="absolute top-4 left-4 lg:left-0 lg:top-4 right-0 bottom-4 lg:bottom-auto h-full lg:h-1 bg-gray-100 -z-10 lg:w-[calc(100%-40px)]">
                          <div
                            className="bg-blue-600 h-full lg:h-full transition-all duration-500"
                            style={{
                              width: typeof window !== "undefined" && window.innerWidth >= 1024 
                                ? `${(stepIdx / (steps.length - 1)) * 100}%` 
                                : "2px",
                              height: typeof window !== "undefined" && window.innerWidth < 1024
                                ? `${(stepIdx / (steps.length - 1)) * 100}%`
                                : "auto"
                            }}
                          />
                        </div>

                        {steps.map((step, idx) => {
                          const isCompleted = idx <= stepIdx;
                          const isActive = idx === stepIdx;
                          return (
                            <div key={idx} className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-2 flex-1 relative z-10">
                              {/* Indicator circle */}
                              <div
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all text-xs font-bold ${
                                  isCompleted
                                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                                    : "bg-white border-gray-200 text-gray-400"
                                }`}
                              >
                                {isCompleted ? "✓" : idx + 1}
                              </div>
                              {/* Label text */}
                              <div className="text-left mt-0.5 max-w-[170px]">
                                <h4 className={`font-extrabold text-xs tracking-tight ${isCompleted ? "text-neutral-900" : "text-gray-400"}`}>
                                  {step.label} {isActive && <span className="text-blue-600 font-mono text-[9px] font-bold block lg:inline-block lg:ml-1 py-0.2 px-1 bg-blue-50 uppercase tracking-wider rounded">Current</span>}
                                </h4>
                                <p className="text-[10px] text-gray-400 font-medium leading-tight">
                                  {step.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* Cancelled order state visual */
                    <div className="bg-rose-50/40 border border-dashed border-rose-200 p-5 rounded-2xl flex items-center gap-4 text-xs font-medium text-rose-850">
                      <XCircle className="w-10 h-10 text-rose-500 shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm text-rose-950 mb-0.5">Order Cancelled (Refund Complete)</h4>
                        <p className="text-gray-500">
                          This order was successfully cancelled on your request. A total sum of <strong className="font-bold text-gray-900">${order.total.toFixed(2)}</strong> has been voided and fully credited back to your bank account ledger automatically.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Delivery Info and Items Details Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-gray-100">
                    {/* Items Breakdown list */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="text-xs font-bold text-gray-800 uppercase tracking-widest">
                        Item Summary ({order.items.reduce((acc, item) => acc + item.quantity, 0)})
                      </div>
                      <div className="space-y-3">
                        {order.items.map((item, id) => (
                          <div key={id} className="flex gap-4 p-3 bg-gray-50/50 rounded-2xl border border-gray-100 items-center justify-between">
                            <div className="flex gap-3 items-center min-w-0">
                              <div className="w-12 h-12 bg-white rounded-xl overflow-hidden border border-gray-150 shrink-0">
                                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-extrabold text-xs sm:text-sm text-neutral-850 truncate">{item.product.name}</h4>
                                <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-400 font-semibold mt-0.5">
                                  <span>Price: ${item.product.price.toFixed(2)}</span>
                                  <span>• Qty: {item.quantity}</span>
                                  {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                                  {item.selectedColor && <span>• Color: {item.selectedColor}</span>}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-gray-900 shrink-0">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Courier delivery target card */}
                    <div className="lg:col-span-5 bg-gray-50 p-6 rounded-2xl border border-gray-150 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="text-xs font-bold text-gray-800 uppercase tracking-widest flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-400" /> Delivery Address
                        </div>
                        <div className="text-xs text-gray-650 space-y-0.5">
                          <p className="font-bold text-neutral-900 text-sm">{order.customerName}</p>
                          <p className="font-medium text-[11px] text-blue-600">{order.customerEmail}</p>
                          <p className="pt-2">{order.address}</p>
                          <p>{order.city}, {order.state} {order.zip}</p>
                          <p>United States</p>
                        </div>
                      </div>

                      <div className="border-t border-gray-200/80 pt-4 mt-6 space-y-1.5 text-xs text-gray-500 font-medium">
                        <div className="flex justify-between">
                          <span>Items Subtotal</span>
                          <span className="font-bold text-neutral-900">${order.subtotal.toFixed(2)}</span>
                        </div>
                        {order.discount > 0 && (
                          <div className="flex justify-between text-emerald-600">
                            <span>Voucher Applied</span>
                            <span>-${order.discount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Express Delivery</span>
                          <span>{order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between font-bold text-neutral-900 border-t border-gray-200/50 pt-2 text-sm">
                          <span>Verified Total Paid</span>
                          <span className="text-blue-600 font-extrabold">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
