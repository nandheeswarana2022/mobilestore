export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  orderDate: Date;
}

export enum View {
  Home,
  ProductDetail,
  Cart,
  Checkout,
  OrderConfirmation,
  Login,
  SignUp,
  Profile
}