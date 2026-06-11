import React, { useState } from "react";
import { Mail, Phone, MapPin, Target, Compass, Award, ShieldCheck, Heart, Send, Sparkles, AlertCircle } from "lucide-react";
import { FAQS } from "../data";

interface AboutProps {
  onExploreProducts: () => void;
}

export function AboutSection({ onExploreProducts }: AboutProps) {
  return (
    <div className="space-y-12 animate-fadeIn" id="about-us-container">
      
      {/* Editorial Trust Headline */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 py-1 px-3.5 rounded-full inline-block">
          Discover Our Heritage
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">
          Trust, Speed & Better Value. Custom Engineered for You.
        </h2>
        <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
          Click Buy began with a simple belief: Everyone deserves access to premium quality electronics, sustainable fashion apparel, and organic lifestyle tools without the high markup.
        </p>
      </div>

      {/* Grid of Perks and Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
            ✓
          </div>
          <h4 className="font-bold text-neutral-850 text-base mb-1.5">Uncompromising Quality</h4>
          <p className="text-xs text-gray-550 leading-relaxed">
            All inventory on our store is source-checked double times. We stand by strict verification checklists.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
            🚀
          </div>
          <h4 className="font-bold text-neutral-850 text-base mb-1.5">Instant Fast Shipping</h4>
          <p className="text-xs text-gray-550 leading-relaxed">
            Equipped with state-wide fulfillment bays and tracking codes, shipping completes within days.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
            🛡
          </div>
          <h4 className="font-bold text-neutral-850 text-base mb-1.5">Complete Security</h4>
          <p className="text-xs text-gray-550 leading-relaxed">
            Every dollar processed on our pipeline utilizes premium bank-grade SSL and certified gateways.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition">
          <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
            ❦
          </div>
          <h4 className="font-bold text-neutral-850 text-base mb-1.5">Elite Level Support</h4>
          <p className="text-xs text-gray-550 leading-relaxed">
            Available 24 hours daily, our customer success experts solve any questions in minutes.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section (Two columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        
        {/* Mission Column */}
        <div className="bg-gradient-to-br from-neutral-900 to-stone-900 p-8 sm:p-10 rounded-3xl text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl"></div>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2.5 bg-blue-600/15 text-blue-500 rounded-xl">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg sm:text-xl uppercase tracking-wider">Our Core Mission</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            To provide a frictionless and incredibly delightful e-commerce journey that delivers state-of-the-art products right to your door with unmatched integrity, speed, and affordability. we bridge local creators and smart consumers.
          </p>
          <ul className="space-y-2 text-xs text-blue-200">
            <li className="flex items-center gap-1.5">✦ Sustainable sourcing checklists for apparel</li>
            <li className="flex items-center gap-1.5">✦ Standard carbon offset protocols for shipping</li>
            <li className="flex items-center gap-1.5">✦ High performance testing of acoustic parts</li>
          </ul>
        </div>

        {/* Vision Column */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-150 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg sm:text-col text-neutral-900 uppercase tracking-wider">Our Strategic Vision</h3>
            </div>
            <p className="text-sm text-gray-650 leading-relaxed">
              We look forward to becoming the most loved, conversion-friendly online shopping portal globally, continually enriching customers' lifestyle experiences with modern electronics, eco-friendly textile designs, and high-quality homeward assets.
            </p>
          </div>
          
          <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold">JD</div>
                <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-[10px] font-bold">AS</div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[10px] font-bold">MP</div>
              </div>
              <span className="text-xs text-gray-400 font-semibold">120K+ Satisfied Shoppers</span>
            </div>
            <button
              onClick={onExploreProducts}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer"
            >
              Browse Catalog
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

interface ContactProps {
  onContactSubmit: (data: { name: string; email: string; subject: string; message: string }) => void;
}

export function ContactSection({ onContactSubmit }: ContactProps) {
  // Contact Form Inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  
  // Accordion active index for FAQs
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    onContactSubmit({ name, email, subject, message });
    setSuccess(true);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");

    setTimeout(() => setSuccess(false), 5000);
  };

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-fadeIn" id="contact-us-container">
      
      {/* Contact Form Portion (Left column) */}
      <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs">
        <div className="space-y-2 mb-6">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 py-1 px-3 rounded-full inline-block">
            Support Headquarters
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Write To Our Help Desk Team
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Have query questions about your custom electronics specs or cargo location? Fill out the details below. Our typical response latency is less than 3 hours.
          </p>
        </div>

        {success && (
          <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl text-xs font-medium mb-5 flex items-start gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong>Inbound Message Dispatched Successfully!</strong>
              <p className="text-emerald-700 text-[11px] mt-0.5">Please check your inbox. A support crew has assigned you ticket ID #{Math.floor(10000 + Math.random() * 90000)}.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" id="contact-us-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="Jane Austen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Email address *</label>
              <input
                type="email"
                required
                placeholder="jane@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Subject Matter</label>
            <input
              type="text"
              placeholder="Query regarding smart watch charge or return setup"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Detailed Message *</label>
            <textarea
              required
              rows={4}
              placeholder="State your item questions clearly. If referencing a specific package, add your tracking code..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-md shadow-blue-500/10 transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" /> Dispatch Secure Message
          </button>
        </form>

        {/* Immersive FAQ Accordion in contact tab */}
        <div className="pt-10 mt-8 border-t border-gray-100">
          <h3 className="font-extrabold text-neutral-900 text-sm sm:text-base uppercase tracking-wider mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-gray-150 rounded-xl overflow-hidden transition bg-gray-50/20"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-4 py-3.5 font-bold text-xs sm:text-sm text-gray-800 hover:text-blue-600 transition flex justify-between items-center cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="text-gray-405 text-xs">
                    {activeFaqIndex === idx ? "▲" : "▼"}
                  </span>
                </button>
                {activeFaqIndex === idx && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-gray-550 leading-relaxed pt-1 animate-slideDown">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Office Locations Details (Right column) */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Rapid coordinates Card */}
        <div className="bg-neutral-900 text-white p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-xl">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-600/15 rounded-full blur-2xl"></div>
          
          <div>
            <h3 className="font-extrabold text-lg uppercase tracking-wider text-white">HQ Office Channels</h3>
            <p className="text-xs text-gray-400 mt-1">Visit or call during normal working intervals.</p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3.5">
              <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Click Buy Global Center #78</strong>
                <span className="text-gray-400 leading-normal">500 Pine Street, Waterfront Square, Seattle, WA 98101, USA</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 border-t border-neutral-800 pt-4">
              <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Electronic Inbound Support</strong>
                <span className="text-blue-450 font-mono underline">delivery@clickbuy.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 border-t border-neutral-800 pt-4">
              <Phone className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Interactive Help Line</strong>
                <span className="text-gray-400">+1 (800) 555-CLICK (2542)</span>
                <span className="block text-[10px] text-gray-500 mt-0.5">Mon - Fri • 9:00 AM - 6:00 PM EST</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-gray-400">
            <span>D&B D-U-N-S Registered</span>
            <span className="bg-emerald-600/25 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-mono font-bold">
              ACTIVE SERVICE
            </span>
          </div>
        </div>

        {/* Global warehouse alerts card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-6 flex gap-4">
          <AlertCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1">
            <h4 className="font-bold text-neutral-850">Local Standard Delivery Intact</h4>
            <p className="text-gray-600 leading-normal">
              Our regional freight grids in Seattle and Chicago are fully operational. Tracking reports are generated live immediately upon processing. No unexpected delays occur.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
