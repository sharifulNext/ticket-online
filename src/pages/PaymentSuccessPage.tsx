import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  QrCode,
  Download,
  Mail,
  Calendar,
  Clock,
  MapPin,
  User as UserIcon,
  Ticket as TicketIcon,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const PaymentSuccessPage: React.FC = () => {
  const { latestBooking, currency, setCurrentPage } = useBooking();

  useEffect(() => {
    // Fire confetti celebration animation on mount
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error('Confetti trigger error:', e);
    }
  }, []);

  if (!latestBooking) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <p className="text-slate-400 text-sm mb-4">No recent booking found.</p>
        <button
          onClick={() => setCurrentPage('home')}
          className="px-5 py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handlePrintDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Celebration Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-cyan-950 border border-cyan-500/50 text-cyan-400 shadow-2xl shadow-cyan-500/20">
            <CheckCircle2 className="w-10 h-10 animate-pulse" />
          </div>
          <h1 className="text-3xl font-extrabold text-white">Booking Confirmed!</h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Your payment was authorized successfully. We sent a booking confirmation email to{' '}
            <strong className="text-cyan-400">{latestBooking.userEmail}</strong>.
          </p>
        </div>

        {/* Digital QR Pass Luxury Card */}
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Top Decorative Banner */}
          <div className="bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 p-4 text-slate-950 font-bold flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-white">
              <TicketIcon className="w-5 h-5" />
              <span className="uppercase tracking-widest text-sm font-extrabold">TICKETSPHERE PASS</span>
            </div>
            <span className="bg-slate-950 text-cyan-400 px-3 py-1 rounded-full text-[11px] font-mono border border-cyan-500/40">
              ID: {latestBooking.id}
            </span>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Pass Details Left */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">
                  {latestBooking.ticket.operator} • {latestBooking.ticket.category}
                </span>
                <h2 className="text-xl font-extrabold text-white mt-0.5">
                  {latestBooking.ticket.title}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Passenger</span>
                  <span className="font-bold text-white">{latestBooking.passengerName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Reserved Seats</span>
                  <span className="font-bold text-cyan-300 font-mono">{latestBooking.seats.join(', ')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Date & Time</span>
                  <span className="font-bold text-white">{latestBooking.ticket.date} at {latestBooking.ticket.time}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Total Paid</span>
                  <span className="font-extrabold text-emerald-400">{currency}{latestBooking.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* QR Code Digital Pass Right */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
              {latestBooking.qrCodeDataUrl ? (
                <img
                  src={latestBooking.qrCodeDataUrl}
                  alt="QR Pass Code"
                  className="w-36 h-36 rounded-xl border border-slate-800 p-1 bg-white"
                />
              ) : (
                <QrCode className="w-28 h-28 text-cyan-400" />
              )}
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                SCAN AT GATE / TERMINAL
              </span>
            </div>
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handlePrintDownload}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download / Print Digital Pass
          </button>

          <button
            onClick={() => setCurrentPage('user-dashboard')}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition"
          >
            <span>View All My Bookings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
