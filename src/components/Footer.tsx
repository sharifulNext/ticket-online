import React from 'react';
import { Ticket, ShieldCheck, Zap, Headphones, Mail, Heart } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const Footer: React.FC = () => {
  const { setCurrentPage, updateFilters, setIsAiModalOpen } = useBooking();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle Glow backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badges Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800/80">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200">100% Verified Tickets</h4>
              <p className="text-xs text-slate-400 mt-0.5">Instant QR codes & guaranteed seating</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200">Instant AI Booking</h4>
              <p className="text-xs text-slate-400 mt-0.5">Smart recommendations & zero fees</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200">24/7 Global Concierge</h4>
              <p className="text-xs text-slate-400 mt-0.5">Live chat support & flexible cancellations</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Ticket className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Ticket<span className="text-cyan-400">Sphere</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              TicketSphere is the next-generation digital ticketing platform for long-haul flights, high-speed rail, luxury coaches, stadium concerts, and technology summits.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-slate-400">Supported Gateways:</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-[10px] font-bold text-slate-300">
                  STRIPE
                </span>
                <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-[10px] font-bold text-slate-300">
                  SSLCommerz
                </span>
                <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-[10px] font-bold text-cyan-400">
                  VISA/MC
                </span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Categories
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    updateFilters({ category: 'flight' });
                    setCurrentPage('tickets');
                  }}
                  className="hover:text-cyan-400 transition"
                >
                  Flight Tickets
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateFilters({ category: 'train' });
                    setCurrentPage('tickets');
                  }}
                  className="hover:text-cyan-400 transition"
                >
                  Train & Rail Passes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateFilters({ category: 'concert' });
                    setCurrentPage('tickets');
                  }}
                  className="hover:text-cyan-400 transition"
                >
                  Live Concerts & Festivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateFilters({ category: 'bus' });
                    setCurrentPage('tickets');
                  }}
                  className="hover:text-cyan-400 transition"
                >
                  Luxury Sleeper Buses
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateFilters({ category: 'event' });
                    setCurrentPage('tickets');
                  }}
                  className="hover:text-cyan-400 transition"
                >
                  Tech Conventions & Summits
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Quick Links
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-cyan-400 transition">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('tickets')} className="hover:text-cyan-400 transition">
                  Search All Tickets
                </button>
              </li>
              <li>
                <button onClick={() => setIsAiModalOpen(true)} className="hover:text-cyan-400 transition flex items-center gap-1 text-cyan-300">
                  <span>✨ AI Concierge</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('user-dashboard')} className="hover:text-cyan-400 transition">
                  My Bookings
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('admin-dashboard')} className="hover:text-cyan-400 transition text-purple-400">
                  Admin Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Stay Informed
            </h5>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe for exclusive flash coupon codes & early access passes.
            </p>
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              </div>
              <button className="w-full py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl transition shadow-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 TicketSphere Inc. All rights reserved. Built with precision for modern travelers.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
