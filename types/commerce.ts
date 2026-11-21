export type ProductCategory = "kit" | "addon" | "scent";

export interface ProductVariant {
  id: string;
  label: string;
  description?: string;
  priceDelta?: number;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  shortDescription: string;
  description: string[];
  highlights: string[];
  inTheBox: { label: string; qty: number }[];
  specs: { label: string; value: string }[];
  images: ProductImage[];
  variants?: ProductVariant[];
  stock: "in_stock" | "low_stock" | "out_of_stock";
}

export interface CartLine {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: "India";
}

export type OrderStatus =
  | "confirmed"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  variantId?: string;
  name: string;
  variantLabel?: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  image: string;
}

export interface Order {
  id: string;
  trackingId: string;
  clientOrderId?: string;
  createdAt: string;
  status: OrderStatus;
  customer: Customer;
  shipping: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  currency: "INR";
  payment: { method: "cod"; status: "pending" };
  estimatedDelivery: string;
  tracking: { status: OrderStatus; at: string; note: string }[];
  notes?: string;
}
