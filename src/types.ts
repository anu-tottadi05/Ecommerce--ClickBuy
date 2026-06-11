export interface Product {
  id: string;
  name: string;
  category: "Electronics" | "Fashion" | "Accessories" | "Lifestyle";
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  tag?: "New" | "Sale" | "Best Seller" | "Trending";
  inStock: boolean;
  sizes?: string[];
  colors?: { name: string; class: string }[];
  specs: { label: string; value: string }[];
  reviews: Review[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Coupon {
  code: string;
  discount: number; // Percentage or flat amount
  type: "percentage" | "flat";
  minPurchase: number;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: "Processing" | "Shipped" | "Out For Delivery" | "Delivered" | "Cancelled";
  estimatedDelivery: string;
}

export type Page = "home" | "products" | "categories" | "offers" | "about" | "contact" | "orders";
