import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ticket, SearchFilters, Booking, Coupon } from '../types';

export type PageRoute =
  | 'home'
  | 'tickets'
  | 'ticket-detail'
  | 'seat-selection'
  | 'checkout'
  | 'payment-success'
  | 'user-dashboard'
  | 'admin-dashboard';

interface BookingContextType {
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  selectedTicket: Ticket | null;
  setSelectedTicket: (ticket: Ticket | null) => void;
  selectedSeats: string[];
  setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>;
  toggleSeat: (seatId: string) => void;
  clearSeats: () => void;
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  updateFilters: (newFilters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  appliedCoupon: Coupon | null;
  setAppliedCoupon: (coupon: Coupon | null) => void;
  latestBooking: Booking | null;
  setLatestBooking: (booking: Booking | null) => void;
  currency: string;
  setCurrency: (c: string) => void;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  navigateToTicket: (ticket: Ticket) => void;
  navigateToSeats: (ticket: Ticket) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialFilters: SearchFilters = {
  category: 'all',
  origin: '',
  destination: '',
  date: '',
  minPrice: 0,
  maxPrice: 1000,
  query: '',
  sortBy: 'rating'
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);
  const [currency, setCurrency] = useState<string>('$');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const toggleSeat = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const clearSeats = () => setSelectedSeats([]);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => setFilters(initialFilters);

  const navigateToTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setCurrentPage('ticket-detail');
  };

  const navigateToSeats = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setSelectedSeats([]);
    setCurrentPage('seat-selection');
  };

  return (
    <BookingContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedTicket,
        setSelectedTicket,
        selectedSeats,
        setSelectedSeats,
        toggleSeat,
        clearSeats,
        filters,
        setFilters,
        updateFilters,
        resetFilters,
        appliedCoupon,
        setAppliedCoupon,
        latestBooking,
        setLatestBooking,
        currency,
        setCurrency,
        isAiModalOpen,
        setIsAiModalOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        navigateToTicket,
        navigateToSeats
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within a BookingProvider');
  return context;
};
