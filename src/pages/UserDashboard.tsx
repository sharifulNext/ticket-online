import React, { useEffect, useState } from 'react';
import {
  User as UserIcon,
  Ticket as TicketIcon,
  QrCode,
  X,
  XCircle,
  Download,
  Clock,
  Heart,
  CheckCircle2,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { Booking } from '../types';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { currency, setCurrentPage } = useBooking();

  const [activeTab, setActiveTab] = useState<'bookings' | 'profile'>('bookings');
  const [bookingFilter, setBookingFilter] = useState<'all' | 'confirmed' | 'cancelled'>('all');
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Active QR Modal
  const [selectedQrBooking, setSelectedQrBooking] = useState<Booking | null>(null);

  // Cancel Modal
  const [cancelBookingTarget, setCancelBookingTarget] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    async function fetchBookings() {
      if (!user) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/bookings?userId=${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setUserBookings(data);
        }
      } catch (e) {
        console.error('Failed to fetch user bookings:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [user]);

  const handleCancelBooking = async () => {
    if (!cancelBookingTarget) return;
    setCancelling(true);
    try {
      const res = await fetch(`/api/bookings/${cancelBookingTarget.id}/cancel`, {
        method: 'PUT'
      });
      if (res.ok) {
        setUserBookings((prev) =>
          prev.map((b) => (b.id === cancelBookingTarget.id ? { ...b, status: 'cancelled' } : b))
        );
        setCancelBookingTarget(null);
      }
    } catch (e) {
      console.error('Failed to cancel booking:', e);
    } finally {
      setCancelling(false);
    }
  };

  const filteredBookings =
    bookingFilter === 'all'
      ? userBookings
      : userBookings.filter((b) => b.status === bookingFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Header Profile Banner */}
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name || 'User'}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-cyan-500/40"
            />
            <div>
              <h1 className="text-xl font-extrabold text-white">{user?.name || 'Passenger Portal'}</h1>
              <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold text-[10px] rounded-full uppercase">
                {user?.role} Account
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'bookings'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <TicketIcon className="w-4 h-4" /> My Bookings
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <UserIcon className="w-4 h-4" /> Profile Info
            </button>
          </div>
        </div>

        {/* Tab Content: Bookings */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Booking History ({userBookings.length})</h2>

              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
                {(['all', 'confirmed', 'cancelled'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setBookingFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-bold capitalize transition ${
                      bookingFilter === st
                        ? 'bg-cyan-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-32 bg-slate-900/50 border border-slate-800 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={b.ticket.images[0]}
                        alt={b.ticket.title}
                        className="w-16 h-16 rounded-2xl object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            {b.id}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-rose-950 text-rose-400 border border-rose-800'
                            }`}
                          >
                            {b.status}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white mt-1">{b.ticket.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Seats: <span className="font-mono text-cyan-300 font-bold">{b.seats.join(', ')}</span> • Date:{' '}
                          {b.ticket.date} at {b.ticket.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block uppercase font-semibold">Total Paid</span>
                        <span className="text-base font-extrabold text-white">
                          {currency}
                          {b.totalAmount}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {b.status === 'confirmed' && (
                          <>
                            <button
                              onClick={() => setSelectedQrBooking(b)}
                              className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                            >
                              <QrCode className="w-4 h-4" /> QR Ticket
                            </button>

                            <button
                              onClick={() => setCancelBookingTarget(b)}
                              className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-800 transition"
                              title="Cancel Ticket"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-3xl">
                <TicketIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">No Bookings Found</h3>
                <p className="text-xs text-slate-400 mt-1">Start browsing flights, trains & concerts today.</p>
                <button
                  onClick={() => setCurrentPage('tickets')}
                  className="mt-4 px-5 py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
                >
                  Browse Available Tickets
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Profile */}
        {activeTab === 'profile' && (
          <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl mx-auto space-y-4">
            <h3 className="text-base font-bold text-white">Account Details</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={user?.name || ''}
                  disabled
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Mobile Phone</label>
                <input
                  type="text"
                  value={user?.phone || '+1 415 890 2341'}
                  disabled
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300"
                />
              </div>
            </div>
          </div>
        )}

        {/* Modal: View Digital QR Pass */}
        {selectedQrBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
              <button
                onClick={() => setSelectedQrBooking(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-base font-bold text-white">Digital QR Ticket Pass</h3>
              <p className="text-xs text-slate-400">{selectedQrBooking.ticket.title}</p>

              <div className="p-4 bg-white rounded-2xl w-48 h-48 mx-auto flex items-center justify-center shadow-inner">
                {selectedQrBooking.qrCodeDataUrl ? (
                  <img src={selectedQrBooking.qrCodeDataUrl} alt="QR Code" className="w-full h-full object-contain" />
                ) : (
                  <QrCode className="w-24 h-24 text-slate-900" />
                )}
              </div>

              <div className="text-xs text-slate-300 space-y-1 pt-2">
                <p>Booking ID: <strong className="font-mono text-cyan-400">{selectedQrBooking.id}</strong></p>
                <p>Passenger: <strong>{selectedQrBooking.passengerName}</strong></p>
                <p>Seats: <strong className="font-mono text-cyan-300">{selectedQrBooking.seats.join(', ')}</strong></p>
              </div>

              <button
                onClick={() => window.print()}
                className="w-full py-3 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Print / Save Ticket
              </button>
            </div>
          </div>
        )}

        {/* Modal: Cancel Booking Confirmation */}
        {cancelBookingTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
              <h3 className="text-base font-bold text-white">Cancel Ticket Reservation?</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to cancel booking <strong className="text-cyan-400">{cancelBookingTarget.id}</strong>?
                Estimated refund: <strong className="text-emerald-400">{currency}{cancelBookingTarget.totalAmount * 0.9}</strong> (10% processing fee).
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setCancelBookingTarget(null)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancelBooking}
                  disabled={cancelling}
                  className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl"
                >
                  {cancelling ? 'Cancelling...' : 'Confirm Cancellation'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
