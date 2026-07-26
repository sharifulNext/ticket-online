import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  Sparkles,
  Plane,
  Train,
  Bus,
  Music,
  Calendar as EventIcon,
  Film,
  ArrowRight,
  ShieldAlert,
  Users
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { TicketCategory } from '../types';

export const HeroSection: React.FC = () => {
  const { updateFilters, setCurrentPage, setIsAiModalOpen } = useBooking();

  const [activeTab, setActiveTab] = useState<TicketCategory | 'all'>('all');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({
      category: activeTab,
      origin,
      destination,
      date,
      query: destination || origin
    });
    setCurrentPage('tickets');
  };

  const categories = [
    { id: 'all', label: 'All Categories', icon: Search, color: 'text-cyan-400' },
    { id: 'flight', label: 'Flights', icon: Plane, color: 'text-sky-400' },
    { id: 'train', label: 'Trains', icon: Train, color: 'text-emerald-400' },
    { id: 'bus', label: 'Buses', icon: Bus, color: 'text-amber-400' },
    { id: 'concert', label: 'Concerts', icon: Music, color: 'text-purple-400' },
    { id: 'event', label: 'Events', icon: EventIcon, color: 'text-blue-400' },
    { id: 'movie', label: 'Cinema', icon: Film, color: 'text-rose-400' }
  ];

  return (
    <section className="relative pt-12 pb-24 overflow-hidden bg-slate-950">
      {/* Background Ambient Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/20 via-indigo-600/15 to-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Eyebrow Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-semibold bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Next-Gen Glassmorphic Ticket Reservation Engine
            </span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 ml-1" />
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Book Your Journey to{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Extraordinary Destinations
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Reserve premium seats on flights, high-speed bullet trains, luxury sleeper coaches, and global arena concerts in seconds with real-time seat mapping.
          </p>
        </div>

        {/* Search Booking Glass Card */}
        <div className="max-w-5xl mx-auto bg-slate-900/70 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-4 sm:p-6 shadow-2xl shadow-cyan-950/20">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-4 border-b border-slate-800/80 no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id as any)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/50 text-cyan-300 shadow-lg shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${cat.color}`} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Inputs Form */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            {/* Origin (for transit) */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" /> Origin / From
              </label>
              <input
                type="text"
                placeholder="e.g. New York, London, Singapore"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-3.5 py-3 bg-slate-950/80 border border-slate-800 focus:border-cyan-500/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
              />
            </div>

            {/* Destination */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" /> Destination / Venue
              </label>
              <input
                type="text"
                placeholder="e.g. Paris, Tokyo, Amsterdam"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3.5 py-3 bg-slate-950/80 border border-slate-800 focus:border-cyan-500/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
              />
            </div>

            {/* Travel Date */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-cyan-400" /> Departure Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-3 bg-slate-950/80 border border-slate-800 focus:border-cyan-500/80 rounded-xl text-xs text-white focus:outline-none transition shadow-inner [color-scheme:dark]"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Search Tickets</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          {/* Quick AI Search Trigger Bar */}
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Unsure where to travel? Ask our AI Assistant for recommendations!</span>
            </div>
            <button
              type="button"
              onClick={() => setIsAiModalOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 hover:no-underline transition"
            >
              Launch AI Concierge
            </button>
          </div>
        </div>

        {/* Quick Popular Tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="font-medium text-slate-500">Popular Searches:</span>
          {['Paris Flights', 'Coldplay Tokyo', 'EuroStar Rail', 'GreenLine Coach', 'Avatar IMAX 3D'].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                updateFilters({ query: tag.split(' ')[0] });
                setCurrentPage('tickets');
              }}
              className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
