import React, { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Plane,
  Train,
  Bus,
  Music,
  Calendar,
  Film
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { TicketCard } from '../components/TicketCard';
import { Ticket, TicketCategory } from '../types';

export const TicketListingPage: React.FC = () => {
  const { filters, setFilters, updateFilters, resetFilters, currency } = useBooking();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    async function fetchFilteredTickets() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (filters.category && filters.category !== 'all') queryParams.append('category', filters.category);
        if (filters.destination) queryParams.append('destination', filters.destination);
        if (filters.origin) queryParams.append('origin', filters.origin);
        if (filters.date) queryParams.append('date', filters.date);
        if (filters.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
        if (filters.query) queryParams.append('query', filters.query);
        if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);

        const res = await fetch(`/api/tickets?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setTickets(data);
        }
      } catch (e) {
        console.error('Failed to fetch tickets:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchFilteredTickets();
  }, [filters]);

  const categories = [
    { id: 'all', label: 'All Types' },
    { id: 'flight', label: 'Flights' },
    { id: 'train', label: 'Trains' },
    { id: 'bus', label: 'Buses' },
    { id: 'concert', label: 'Concerts' },
    { id: 'event', label: 'Events' },
    { id: 'movie', label: 'Cinema' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white">Browse Available Tickets</h1>
          <p className="text-xs text-slate-400 mt-1">
            Filter long-haul flights, bullet trains, stadium concerts & tech events worldwide.
          </p>
        </div>

        {/* Search Bar & Sorting Bar */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          {/* Main Search Input */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search destination, operator, or title..."
              value={filters.query || ''}
              onChange={(e) => updateFilters({ query: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* Sort By Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-400 hidden sm:inline">Sort:</span>
              <select
                value={filters.sortBy || 'rating'}
                onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden px-4 py-2 bg-slate-800 border border-slate-700 text-xs font-bold text-white rounded-xl flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" /> Filters
            </button>
          </div>
        </div>

        {/* Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-6 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 h-fit shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" /> Search Filters
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-cyan-400 hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Category
              </label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => updateFilters({ category: cat.id as any })}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                      filters.category === cat.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {filters.category === cat.id && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-300 uppercase tracking-wider">Max Price</label>
                <span className="font-bold text-cyan-400">
                  {currency}
                  {filters.maxPrice || 1000}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={1000}
                step={10}
                value={filters.maxPrice || 1000}
                onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) })}
                className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Departure Date */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Departure Date
              </label>
              <input
                type="date"
                value={filters.date || ''}
                onChange={(e) => updateFilters({ date: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Ticket Cards Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-96 rounded-3xl bg-slate-900/50 border border-slate-800 animate-pulse"
                  />
                ))}
              </div>
            ) : tickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
                <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white">No Tickets Match Your Filter</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Try relaxing price filters, picking another date, or resetting your search filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
