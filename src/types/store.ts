export type ProductCategory = 'all' | 'workspace' | 'audio' | 'living' | 'apparel' | 'carry';

export interface ProductColor {
  name: string;
  hex: string;
  inStock?: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  images: string[];
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  colors: ProductColor[];
  sizes?: string[];
  badge?: 'BESTSELLER' | 'NEW ARRIVAL' | 'LIMITED RUN' | 'STAFF PICK' | 'LOW STOCK';
  featured?: boolean;
  reviews?: ProductReview[];
}

export interface CartItem {
  id: string; // product.id + '-' + color + '-' + (size || '')
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize?: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export interface CheckoutCustomer {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface PaymentDetails {
  method: 'card' | 'apple-pay' | 'klarna';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  cardName?: string;
}

export interface Order {
  id?: string;
  orderNumber: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    color: string;
    size?: string;
    image: string;
  }[];
  customer: CheckoutCustomer;
  shippingMethod: ShippingMethod;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
  orderNote?: string;
  paymentMethod: string;
  status: 'confirmed' | 'processing' | 'shipped';
  createdAt: string;
}
