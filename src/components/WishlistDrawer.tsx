import React, { useEffect, useState } from 'react';
import { X, Heart, Trash2, ArrowRight, Ticket as TicketIcon } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { Ticket } from '../types';

export const WishlistDrawer: React.FC = () => {
  const { isWishlistOpen, setIsWishlistOpen, currency, navigateToSeats } = useBooking();
  const { user, toggleWishlist } = useAuth();
  const [wishlistTickets, setWishlistTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchWishlist() {
      if (!user || !user.wishlist || user.wishlist.length === 0) {
        setWishlistTickets([]);
        return;
      }
      setLoading(true);
      try {
        const fetched: Ticket[] = [];
        for (let id of user.wishlist) {
          const res = await fetch(`/api/tickets/${id}`);
          if (res.ok) {
            const data = await res.json();
            fetched.push(data);
          }
        }
        setWishlistTickets(fetched);
      } catch (e) {
        console.error('Failed to fetch wishlist tickets:', e);
      } finally {
        setLoading(false);
      }
    }

    if (isWishlistOpen) {
      fetchWishlist();
    }
  }, [isWishlistOpen, user]);

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <h3 className="text-lg font-bold text-white">Saved Wishlist ({wishlistTickets.length})</h3>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar">
              {loading ? (
                <p className="text-xs text-slate-400">Loading saved tickets...</p>
              ) : wishlistTickets.length > 0 ? (
                wishlistTickets.map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3 relative group"
                  >
                    <img
                      src={t.images[0]}
                      alt={t.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{t.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{t.destination}</p>
                      <span className="text-xs font-bold text-cyan-400 mt-1 block">
                        {currency}
                        {t.price}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setIsWishlistOpen(false);
                          navigateToSeats(t);
                        }}
                        className="p-2 bg-cyan-500 text-slate-950 rounded-xl font-bold text-xs hover:bg-cyan-400 transition"
                        title="Book Ticket"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => toggleWishlist(t.id)}
                        className="p-2 text-slate-500 hover:text-rose-400 rounded-xl"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                  <p className="text-xs text-slate-400">Your wishlist is currently empty.</p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="w-full py-3 bg-slate-800 text-slate-200 text-xs font-bold rounded-2xl hover:bg-slate-700 transition"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
