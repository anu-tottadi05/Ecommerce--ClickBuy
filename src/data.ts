import { Product, Coupon, FAQ } from "./types";

export const PRODUCTS: Product[] = [
  // --- ELECTRONICS ---
  {
    id: "elec-1",
    name: "AeroBook Pro 15 Ultra Laptop",
    category: "Electronics",
    price: 899.99,
    originalPrice: 1099.99,
    discountPercentage: 18,
    rating: 4.8,
    reviewCount: 342,
    image: "https://images.unsplash.com/photo-1496181130204-755241544e35?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1496181130204-755241544e35?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Empower your creative and technical workflows. The AeroBook Pro features an ultra-sleek aerospace-grade aluminum chassis, a stunning 15.6-inch ultra-high-definition lifelike display, a state-of-the-art multi-core processor, and exceptional battery stamina up to 16 hours for all your professional needs.",
    tag: "Best Seller",
    inStock: true,
    colors: [
      { name: "Space Gray", class: "bg-gray-700" },
      { name: "Slate Silver", class: "bg-gray-300 ring-1 ring-gray-400" },
      { name: "Stealth Midnight", class: "bg-neutral-900" }
    ],
    specs: [
      { label: "Processor", value: "Intel Core i7 12-Gen Multi-Core" },
      { label: "Memory & Storage", value: "16GB LPDDR5 RAM / 512GB NVMe PCIe Gen4 SSD" },
      { label: "Battery Stamina", value: "Sustained up to 16 hours productivity" },
      { label: "Connections", value: "HDMI, Thunderbolt 4, High-Speed USB-C, Wifi-6E" }
    ],
    reviews: [
      { id: "rev-e1-1", name: "David K.", rating: 5, date: "2026-05-12", comment: "An incredibly fast performance machine! The thin design looks amazing on my desk and compiling code is near instant.", verified: true },
      { id: "rev-e1-2", name: "Rachel M.", rating: 4, date: "2026-05-28", comment: "Exceptional screen quality with vivid colors. Battery easily gets me through a full day of productive creative tasks.", verified: true }
    ]
  },
  {
    id: "elec-2",
    name: "AeroWatch Chrono Smartwatch Series-7",
    category: "Electronics",
    price: 199.99,
    originalPrice: 249.99,
    discountPercentage: 20,
    rating: 4.6,
    reviewCount: 218,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Stay connected, active, and healthy. AeroWatch Series-7 provides active continuous heart monitoring, sleep phase staging, fitness metrics, as well as an elegant Always-On AMOLED screen customized with unique stylish templates.",
    tag: "Trending",
    inStock: true,
    colors: [
      { name: "Space Gray", class: "bg-gray-700" },
      { name: "Rose Gold", class: "bg-pink-300" },
      { name: "Forest Green", class: "bg-emerald-900" }
    ],
    specs: [
      { label: "Display Size", value: "1.92-inch Curved AMOLED" },
      { label: "Water Resistance", value: "IP68 & 5ATM Premium Rating" },
      { label: "Smart Sensors", value: "Heart Rate, SpO2 Oxygen, Sleep tracker, Compass" },
      { label: "Compatibility", value: "Compatible with iOS 12+ and Android 8+" }
    ],
    reviews: [
      { id: "rev-e2-1", name: "Suresh P.", rating: 5, date: "2026-04-18", comment: "The AMOLED screen is beautiful! Tracking analytics are very detailed and accurate. Best smartwatch at this range.", verified: true },
      { id: "rev-e2-2", name: "Emma G.", rating: 4, date: "2026-05-02", comment: "Highly customisable. Charge lasts about 6 days with Always-On turned off, which is highly impressive.", verified: true }
    ]
  },
  {
    id: "elec-3",
    name: "PulseBass Outdoor Waterproof Speaker",
    category: "Electronics",
    price: 69.99,
    originalPrice: 89.99,
    discountPercentage: 22,
    rating: 4.7,
    reviewCount: 154,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Ignite your adventure with PulseBass. Heavy dual passive bass radiators coupled with 20W high fidelity drivers bring rich, clear acoustics outdoors. Sporting a durable fabric material and military drop resistance, it's the optimal party sidekick.",
    tag: "Sale",
    inStock: true,
    colors: [
      { name: "Active Blue", class: "bg-blue-600" },
      { name: "Charcoal Black", class: "bg-neutral-800" },
      { name: "Camo Green", class: "bg-yellow-800" }
    ],
    specs: [
      { label: "Audio Output", value: "20W Stereo Sound Boost" },
      { label: "Waterproof Level", value: "IP67 Fully Waterproof & Dustproof" },
      { label: "Dual Sync", value: "Sync up to 100 speakers together" },
      { label: "Battery Life", value: "Up to 24 Hours of Playtime" }
    ],
    reviews: [
      { id: "rev-e3-1", name: "Nathan S.", rating: 5, date: "2026-05-19", comment: "Perfect for pool parties! It floats in water and the bass is deep. Volume is powerful enough for outdoor spaces.", verified: true }
    ]
  },
  {
    id: "elec-4",
    name: "ApexClick Tactile Mechanical Keyboard",
    category: "Electronics",
    price: 129.99,
    rating: 4.5,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Type faster and more comfortably with ApexClick. Equipped with tactile brown mechanical switches, fully customisable 16.8M RGB backlighting, and heavy premium aluminum base plates, engineered for work and performance.",
    inStock: true,
    colors: [
      { name: "Sleek Silver", class: "bg-gray-300 ring-1 ring-gray-400" },
      { name: "Titanium Gray", class: "bg-gray-600" }
    ],
    specs: [
      { label: "Switch Type", value: "Silent Tactile Switches (Brown)" },
      { label: "Backlight", value: "16.8M RGB Per-Key Customize Patterns" },
      { label: "Connectivity", value: "USB-C Wired, Bluetooth 5.1 & Lag-Free 2.4Ghz" },
      { label: "Layout Size", value: "75% Minimalist Space-saving Form Factor" }
    ],
    reviews: [
      { id: "rev-e4-1", name: "Jordan W.", rating: 5, date: "2026-03-10", comment: "Such a beautiful tactile sound! Feels incredibly robust, battery on wireless lasts more than a week.", verified: true }
    ]
  },

  // --- FASHION ---
  {
    id: "fash-1",
    name: "Classic Roadster Premium Leather Jacket",
    category: "Fashion",
    price: 149.99,
    originalPrice: 199.99,
    discountPercentage: 25,
    rating: 4.9,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80"
    ],
    description: "A timeless masterpiece. Crafted from genuine top-grain cowhide leather, the Classic Roadster boasts comfortable inner polyester linings, secure heavy metal YKK zippers, and functional pockets. Becomes richer and softer as it ages.",
    tag: "Best Seller",
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Vantage Black", class: "bg-neutral-900" },
      { name: "Tobacco Brown", class: "bg-amber-900" }
    ],
    specs: [
      { label: "Material Type", value: "100% Top-Grain Cowhide Leather" },
      { label: "Closure", value: "Asymmetrical Heavy-Duty YKK zippers" },
      { label: "Fit Style", value: "Tailored Slim Fit Roadster Model" },
      { label: "Care Instruction", value: "Professional Leather dry clean only" }
    ],
    reviews: [
      { id: "rev-f1-1", name: "Tyler B.", rating: 5, date: "2026-05-15", comment: "Smells wonderful, real heavy cowhide leather. Fits exactly by size chart. Highly recommended premium product.", verified: true }
    ]
  },
  {
    id: "fash-2",
    name: "Everyday Premium Organic Cotton Tee",
    category: "Fashion",
    price: 24.99,
    rating: 4.5,
    reviewCount: 180,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Redefining minimal comfort. Made entirely from sustainable 100% combed organic long-staple cotton, this basic tee features breathable fibers, anti-shrink fabric construction, and a double-needle stitch durability.",
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Cream White", class: "bg-yellow-50 ring-1 ring-gray-200" },
      { name: "Heather Gray", class: "bg-gray-400" },
      { name: "Vintage Navy", class: "bg-blue-950" }
    ],
    specs: [
      { label: "Thread Count", value: "220 GSM Dense Interlock Knit" },
      { label: "Composition", value: "100% GOTS Certified Organic Cotton" },
      { label: "Eco-Benefit", value: "Sourced sustainably with water-recycling steps" }
    ],
    reviews: [
      { id: "rev-f2-1", name: "Mark D.", rating: 5, date: "2026-04-20", comment: "Softer than any other tee I own. Kept its shape perfectly even after three wash cycles.", verified: true }
    ]
  },
  {
    id: "fash-3",
    name: "SoftFleece Active Joggers & Sweatpants",
    category: "Fashion",
    price: 34.99,
    originalPrice: 49.99,
    discountPercentage: 30,
    rating: 4.4,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Kick back or step out. SoftFleece features custom thermal cotton-fleece lining, high elastic waistband with metal drawcords, and reliable zip-secured side pockets to hold your wallet and phones securely.",
    tag: "Sale",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Carbon Black", class: "bg-neutral-800" },
      { name: "Sport Melange Grey", class: "bg-gray-300 ring-1 ring-gray-400" }
    ],
    specs: [
      { label: "Material", value: "80% Cotton, 20% Polyester Premium blend" },
      { label: "Pockets", value: "2 Concealed side zip pockets, 1 back patch pocket" },
      { label: "Waist", value: "Flex Ribbed Waistband with adjustable drawcord" }
    ],
    reviews: [
      { id: "rev-f3-1", name: "Jessica L.", rating: 4, date: "2026-05-30", comment: "Warm, cozy, fits great. The zippered side pockets are super useful so things do not fall out while running.", verified: true }
    ]
  },

  // --- ACCESSORIES ---
  {
    id: "acc-1",
    name: "Horizon Polarized Classic Sunglasses",
    category: "Accessories",
    price: 39.99,
    originalPrice: 59.99,
    discountPercentage: 33,
    rating: 4.7,
    reviewCount: 165,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Glance clearly through strong summer glare. Horizon sunglasses combine lightweight tortoise frame durability with scratch-resistant premium TAC polarized lenses, granting complete UVA/UVB eye defense.",
    tag: "Trending",
    inStock: true,
    colors: [
      { name: "Classic Tortoise", class: "bg-amber-800" },
      { name: "Polished Obsidian", class: "bg-stone-900" }
    ],
    specs: [
      { label: "Lens Protection", value: "100% UV400 Rated Defense" },
      { label: "Frame Composition", value: "Eco-Acetate Hypoallergenic Complex" },
      { label: "Lens Width", value: "54mm Sports-Classic Aperture" }
    ],
    reviews: [
      { id: "rev-a1-1", name: "Chris F.", rating: 4, date: "2026-05-14", comment: "Outstanding polarized clarity. Glare when driving is completely gone. Extremely lightweight.", verified: true }
    ]
  },
  {
    id: "acc-2",
    name: "Sentry RFID-Blocking Slim Leather Wallet",
    category: "Accessories",
    price: 29.99,
    rating: 4.8,
    reviewCount: 184,
    image: "https://images.unsplash.com/photo-1627124118123-04e401096679?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1627124118123-04e401096679?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Compact and stylish wallet built for the modern citizen. Sentry holds up to 10 credit cards and custom currency without bulk, using an integrated military RFID-damping grid to safeguard wireless card data.",
    tag: "Best Seller",
    inStock: true,
    colors: [
      { name: "Vintage Tan", class: "bg-amber-700" },
      { name: "Midnight Onyx", class: "bg-stone-900" },
      { name: "Cognac Brown", class: "bg-yellow-900" }
    ],
    specs: [
      { label: "Capacity", value: "10 Cards, Built-in Quick-Access ID Windows" },
      { label: "Shielding", value: "13.56 MHz RFID / NFC Secure Block" },
      { label: "Material", value: "Genuine Full-Grain Napa Leather" }
    ],
    reviews: [
      { id: "rev-a2-1", name: "Albert V.", rating: 5, date: "2026-06-01", comment: "Fits comfortably in front pockets. Very sleek stitching and feels like premium leather.", verified: true }
    ]
  },
  {
    id: "acc-3",
    name: "Nomad Waterproof Commuter Backpack",
    category: "Accessories",
    price: 89.99,
    originalPrice: 119.99,
    discountPercentage: 25,
    rating: 4.6,
    reviewCount: 92,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1509762774605-f07235a08f1f?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Engineered to safeguard technical tools anywhere. The Nomad features robust 900D ballistic water-defying nylon, an isolated cushioned 16-inch laptop pocket, custom hidden passport slots, and external quick USB charger nodes.",
    inStock: true,
    colors: [
      { name: "Tactical Gray", class: "bg-gray-500" },
      { name: "Stealth Black", class: "bg-neutral-900" }
    ],
    specs: [
      { label: "Volume Capacity", value: "28 Liters Expandable Storage" },
      { label: "Laptop Sleeve", value: "Fits up to 16-inch Macbook Pro" },
      { label: "Outer Shell", value: "Waterproof 900D Ballistic Poly-Weave" }
    ],
    reviews: [
      { id: "rev-a3-1", name: "Brandon T.", rating: 5, date: "2026-05-24", comment: "Spacious with wonderful tech slots. Kept laptop bone-dry in heavy sudden rain yesterday.", verified: true }
    ]
  },

  // --- LIFESTYLE ---
  {
    id: "life-1",
    name: "HydraSip Double-Wall Insulated Flask",
    category: "Lifestyle",
    price: 24.99,
    originalPrice: 34.99,
    discountPercentage: 28,
    rating: 4.9,
    reviewCount: 224,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Sustain refreshing beverage chills for longer. Integrating advanced TempLock dual vacuum walls, HydraSip keeps ice-drinks chilled for full 24 hours, or winter tea steaming-hot for up to 12 hours straight.",
    tag: "Best Seller",
    inStock: true,
    colors: [
      { name: "Ocean Blue", class: "bg-blue-400" },
      { name: "Alpine Teal", class: "bg-teal-500" },
      { name: "Slate", class: "bg-zinc-600" }
    ],
    specs: [
      { label: "Material Composition", value: "18/8 Pro-Grade BPA-Free Stainless Steel" },
      { label: "Thermal Retention", value: "Hot: 12 Hours | Cold: 24 Hours Shield" },
      { label: "Lid leak rating", value: "Leakproof Flex Cap with solid handle" }
    ],
    reviews: [
      { id: "rev-l1-1", name: "Lisa W.", rating: 5, date: "2026-05-10", comment: "No condensation whatsoever. Still had ice chips inside after sitting on the hot beach all day!", verified: true }
    ]
  },
  {
    id: "life-2",
    name: "Serene Moments Lavender Soy Candle Set",
    category: "Lifestyle",
    price: 18.99,
    rating: 4.6,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1603006905393-0d36746f3aef?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1603006905393-0d36746f3aef?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Melt down daily stressful thoughts with sensory therapy. Formulated with organic pure soy-wax compounds and true essential lavender distillations, it promotes deeper breathing and sleep quality.",
    inStock: true,
    specs: [
      { label: "Wax Blend", value: "100% Biodegradable Soy Wax" },
      { label: "Burn Time", value: "55 Hours Clean soot-free burn" },
      { label: "Wick Profile", value: "Lead-Free organic pure woven cotton" }
    ],
    reviews: [
      { id: "rev-l2-1", name: "Maria E.", rating: 4, date: "2026-04-12", comment: "Smells incredibly authentic and natural, not like cheap synthetic chemicals. Very relaxing scent.", verified: true }
    ]
  },
  {
    id: "life-3",
    name: "SleepLux Scented Memory Foam Pillow",
    category: "Lifestyle",
    price: 49.99,
    originalPrice: 69.99,
    discountPercentage: 28,
    rating: 4.8,
    reviewCount: 135,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Align your cervical spine perfectly for deep sleep. SleepLux features responsive high-density neck support foam infused with micro-lavender calm oils and wrapped in cool-touch, highly breathable natural bamboo cases.",
    tag: "Best Seller",
    inStock: true,
    specs: [
      { label: "Foam Type", value: "CertiPUR-US Confirmed Neck Orthopedic Foam" },
      { label: "Case Cover", value: "Double washable luxury bamboo-rayon shell" },
      { label: "Scent", value: "Subtle Micro-encapsulated Lavender Calmer" }
    ],
    reviews: [
      { id: "rev-l3-1", name: "George H.", rating: 5, date: "2026-05-11", comment: "Drastically reduced my morning neck aches. Hard to sleep on any standard pillow after this.", verified: true }
    ]
  },
  {
    id: "life-4",
    name: "Artisan Glazed Ceramic Planter Pair",
    category: "Lifestyle",
    price: 34.99,
    rating: 4.7,
    reviewCount: 64,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Add timeless clay accent styling to living rooms. These hand-glazed ceramic planters feature premium ochre colors, integrated drainage nodes for healthy plant roots, and secure wooden stands.",
    tag: "New",
    inStock: true,
    specs: [
      { label: "Material", value: "High-Temperature Glazed Stoneware Clay" },
      { label: "Pot Dimensions", value: "Large: 6\" D x 5\" H | Medium: 4.5\" D x 4.2\" H" },
      { label: "Features", value: "Includes optional rubber drainage plugs & wooden stands" }
    ],
    reviews: [
      { id: "rev-l4-1", name: "Zoe C.", rating: 5, date: "2026-05-04", comment: "Beautiful earthy tones. Replanted my succulents and pothos. High-quality look and feel.", verified: true }
    ]
  }
];

export const COUPONS: Coupon[] = [
  { code: "CLICKBUY10", discount: 10, type: "percentage", minPurchase: 0, description: "Get 10% off on your first order" },
  { code: "SAVEMORE20", discount: 20, type: "flat", minPurchase: 100, description: "$20 flat discount on orders over $100" },
  { code: "ELECTRONICVIP", discount: 15, type: "percentage", minPurchase: 150, description: "15% off on electronic orders above $150" },
  { code: "MYSTERY25", discount: 25, type: "percentage", minPurchase: 50, description: "Mystery 25% Off discount coupon" },
  { code: "LUCKY50", discount: 50, type: "flat", minPurchase: 180, description: "Super Lucky $50 Flat discount on orders over $180" },
  { code: "FREESHIP", discount: 10, type: "flat", minPurchase: 30, description: "Free Courier Shipping discount equivalent" }
];

export const FAQS: FAQ[] = [
  {
    question: "How long does shipping and parcel delivery take?",
    answer: "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. All orders over $50 quality for free shipping!"
  },
  {
    question: "What is your refund and return policy?",
    answer: "We offer a hassle-free 30-day dynamic return window. If you are not satisfied with any items, we will arrange free shipping pick-ups and issue immediate refunds."
  },
  {
    question: "Are payment transactions protected on Click Buy?",
    answer: "Yes, Click Buy utilizes dual bank-level SSL encryption and industry-approved Stripe gateways. Your precise payment data is never stored on our host."
  },
  {
    question: "How can I track my modern parcel?",
    answer: "Upon order placement, a high-fidelity tracking ID is sent to your email immediately. You can track its location in real-time."
  }
];
