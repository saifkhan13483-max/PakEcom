export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subCategory: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  phoneNumber?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  area: string;
  city: string;
  postalCode?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'cod' | 'bank_transfer' | 'jazzcash' | 'easypaisa';
  shippingAddress: Address;
  createdAt: string;
}
