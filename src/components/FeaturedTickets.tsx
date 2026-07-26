import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Filter } from 'lucide-react';
import { Ticket, TicketCategory } from '../types';
import { TicketCard } from './TicketCard';
import { useBooking } from '../context/BookingContext';

export const FeaturedTickets: React.FC = () => {
  const { setCurrentPage, updateFilters } = useBooking();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch('/api/tickets?featured=true');
        if (res.ok) {
          const data = await res.json();
          setTickets(data);
        }
      } catch (e) {
        console.error('Failed to fetch featured tickets:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  const categories = [
    { id: 'all', name: 'All Featured' },
    { id: 'flight', name: 'Flights' },
    { id: 'train', name: 'Rail Passes' },
    { id: 'concert', name: 'Concerts' },
    { id: 'bus', name: 'Sleeper Buses' },
    { id: 'event', name: 'Events' }
  ];

  const filteredTickets =
    activeCategory === 'all'
      ? tickets
      : tickets.filter((t) => t.category === activeCategory);

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Handpicked Selections
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Featured Available Tickets
            </h2>
          </div>

          <button
            onClick={() => {
              updateFilters({ category: 'all' });
              setCurrentPage('tickets');
            }}
            className="mt-4 md:mt-0 text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 group"
          >
            <span>Explore All 120+ Tickets</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Tickets Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 rounded-3xl bg-slate-900/50 border border-slate-800 animate-pulse p-6"
              />
            ))}
          </div>
        ) : filteredTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <p className="text-slate-400 text-sm">No featured tickets found in this category.</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-3 px-4 py-2 bg-slate-800 text-xs font-bold text-cyan-400 rounded-xl"
            >
              Show All Featured Tickets
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
