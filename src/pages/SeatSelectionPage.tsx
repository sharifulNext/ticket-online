import React from 'react';
import { ArrowLeft, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { SeatMap } from '../components/SeatMap';

export const SeatSelectionPage: React.FC = () => {
  const { selectedTicket, setCurrentPage } = useBooking();

  if (!selectedTicket) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <p className="text-slate-400 text-sm mb-4">No ticket selected for seat reservation.</p>
        <button
          onClick={() => setCurrentPage('tickets')}
          className="px-5 py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
        >
          Browse Tickets
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Back Navigation */}
        <button
          onClick={() => setCurrentPage('ticket-detail')}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" /> Back to Ticket Overview
        </button>

        {/* Journey Recap Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800">
              {selectedTicket.operator}
            </span>
            <h2 className="text-xl font-extrabold text-white mt-2">{selectedTicket.title}</h2>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {selectedTicket.destination} • {selectedTicket.date} at {selectedTicket.time}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3.5 py-2 rounded-2xl">
            <ShieldCheck className="w-4 h-4" /> Real-time seat reservation lock enabled
          </div>
        </div>

        {/* Seat Map Component */}
        <SeatMap ticket={selectedTicket} />
      </div>
    </div>
  );
};
