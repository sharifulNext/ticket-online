import React from 'react';
import {
  Plane,
  Train,
  Bus,
  Music,
  Calendar,
  Film,
  Star,
  Clock,
  MapPin,
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Ticket } from '../types';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';

interface TicketCardProps {
  ticket: Ticket;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const { toggleWishlist, isWishlist } = useAuth();
  const { currency, navigateToTicket, navigateToSeats } = useBooking();

  const isFav = isWishlist(ticket.id);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'flight':
        return <Plane className="w-4 h-4 text-sky-400" />;
      case 'train':
        return <Train className="w-4 h-4 text-emerald-400" />;
      case 'bus':
        return <Bus className="w-4 h-4 text-amber-400" />;
      case 'concert':
        return <Music className="w-4 h-4 text-purple-400" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-blue-400" />;
      case 'movie':
        return <Film className="w-4 h-4 text-rose-400" />;
      default:
        return <Plane className="w-4 h-4 text-cyan-400" />;
    }
  };

  const totalSeats = ticket.seatLayout.rows * ticket.seatLayout.cols;
  const bookedSeatsCount = ticket.seatLayout.bookedSeats.length;
  const availableSeats = totalSeats - bookedSeatsCount;
  const isLowAvailability = availableSeats < 10;

  return (
    <div className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-950/30 transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={ticket.images[0] || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'}
          alt={ticket.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Category & Operator Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg">
            {getCategoryIcon(ticket.category)}
            <span className="capitalize">{ticket.category}</span>
          </span>
          {ticket.featured && (
            <span className="px-2.5 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/50 text-[10px] font-bold text-cyan-300 flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3 text-cyan-400" /> Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(ticket.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-2xl backdrop-blur-md transition shadow-lg ${
            isFav
              ? 'bg-rose-500/20 border border-rose-500 text-rose-400'
              : 'bg-slate-950/60 border border-slate-700/60 text-slate-300 hover:text-rose-400 hover:bg-slate-900'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Departure Time & Date badge at image bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 font-medium">
          <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            {ticket.date} • {ticket.time}
          </span>
          <span className="flex items-center gap-1 text-amber-400 bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-white">{ticket.rating}</span> ({ticket.reviewCount})
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-semibold text-cyan-400 mb-1 flex items-center gap-1.5">
            <span>{ticket.operatorLogo || '✨'}</span>
            <span>{ticket.operator}</span>
          </div>

          <h3
            onClick={() => navigateToTicket(ticket)}
            className="text-base font-bold text-white hover:text-cyan-300 transition cursor-pointer line-clamp-1"
          >
            {ticket.title}
          </h3>

          <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            {ticket.origin ? `${ticket.origin} ➔ ${ticket.destination}` : ticket.destination}
          </p>
        </div>

        {/* Seat Availability Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400">Available Seats:</span>
            <span className={`font-bold ${isLowAvailability ? 'text-rose-400' : 'text-emerald-400'}`}>
              {availableSeats} of {totalSeats} left
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isLowAvailability ? 'bg-rose-500' : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
              }`}
              style={{ width: `${(availableSeats / totalSeats) * 100}%` }}
            />
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Price per ticket</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-white">
                {currency}
                {ticket.price}
              </span>
              {ticket.originalPrice && (
                <span className="text-xs text-slate-500 line-through">
                  {currency}
                  {ticket.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateToSeats(ticket)}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center gap-1.5 group/btn"
            >
              <span>Select Seat</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
