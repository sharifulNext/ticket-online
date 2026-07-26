export type TicketCategory = 'flight' | 'train' | 'bus' | 'event' | 'concert' | 'movie';

export interface SeatLayout {
  rows: number;
  cols: number;
  aisles?: number[];
  bookedSeats: string[];
  vipSeats?: string[];
  vipPriceExtra?: number;
}

export interface Ticket {
  id: string;
  title: string;
  category: TicketCategory;
  origin?: string;
  destination: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "08:30 AM"
  arrivalTime?: string; // e.g. "11:45 AM"
  duration?: string; // e.g. "3h 15m"
  operator: string;
  operatorLogo?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  amenities?: string[];
  seatLayout: SeatLayout;
  location?: string;
  venue?: string;
  featured?: boolean;
  popular?: boolean;
  availableSeatsCount?: number;
  totalSeatsCount?: number;
}

export interface Review {
  id: string;
  ticketId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Booking {
  id: string;
  ticketId: string;
  ticket: Ticket;
  userId: string;
  userEmail: string;
  passengerName: string;
  passengerPhone: string;
  seats: string[];
  totalAmount: number;
  discountAmount: number;
  couponCode?: string;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentMethod: 'stripe' | 'sslcommerz' | 'card' | 'wallet';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  qrCodeDataUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  phone?: string;
  wishlist: string[];
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount: number;
  validUntil: string;
}

export interface AdminStats {
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  ticketsSold: number;
  popularRoutes: { destination: string; category: string; count: number; revenue: number }[];
  categoryDistribution: { category: string; count: number }[];
  recentBookings: Booking[];
}

export interface SearchFilters {
  origin?: string;
  destination?: string;
  date?: string;
  category?: TicketCategory | 'all';
  minPrice?: number;
  maxPrice?: number;
  query?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'departure';
}
