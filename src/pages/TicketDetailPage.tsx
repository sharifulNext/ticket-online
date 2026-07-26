import React, { useState, useEffect } from 'react';
import {
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  CheckCircle2,
  Heart,
  ArrowRight,
  Send,
  Plane,
  Train,
  Bus,
  Music,
  Calendar as CalendarIcon,
  Film,
  Wifi,
  Coffee,
  Tv,
  Zap,
  Luggage,
  User as UserIcon
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { Review } from '../types';

export const TicketDetailPage: React.FC = () => {
  const { selectedTicket, currency, navigateToSeats, setCurrentPage } = useBooking();
  const { isWishlist, toggleWishlist, user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    if (selectedTicket) {
      setActiveImage(selectedTicket.images[0] || '');
      fetchReviews(selectedTicket.id);
    }
  }, [selectedTicket]);

  const fetchReviews = async (ticketId: string) => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (e) {
      console.error('Failed to fetch reviews:', e);
    }
  };

  if (!selectedTicket) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <p className="text-slate-400 text-sm mb-4">No ticket selected for details.</p>
        <button
          onClick={() => setCurrentPage('tickets')}
          className="px-5 py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
        >
          Browse Tickets
        </button>
      </div>
    );
  }

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmittingReview(true);
    try {
      const res = await fetch(`/api/tickets/${selectedTicket.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: user?.name || 'Anonymous Traveler',
          userAvatar: user?.avatar,
          rating: newRating,
          comment: newComment
        })
      });

      if (res.ok) {
        setNewComment('');
        fetchReviews(selectedTicket.id);
      }
    } catch (e) {
      console.error('Failed to post review:', e);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const isFav = isWishlist(selectedTicket.id);

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Gallery & Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Gallery Left */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-96 w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
              <img
                src={activeImage}
                alt={selectedTicket.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleWishlist(selectedTicket.id)}
                className={`absolute top-4 right-4 p-3 rounded-2xl backdrop-blur-md transition shadow-xl ${
                  isFav
                    ? 'bg-rose-500/20 border border-rose-500 text-rose-400'
                    : 'bg-slate-950/60 border border-slate-700 text-slate-300 hover:text-rose-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnail selector */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {selectedTicket.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition ${
                    activeImage === img ? 'border-cyan-400 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Ticket Information Right */}
          <div className="lg:col-span-5 bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold text-[11px] rounded-full uppercase">
                  {selectedTicket.category}
                </span>
                <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{selectedTicket.rating}</span> ({reviews.length || selectedTicket.reviewCount} reviews)
                </div>
              </div>

              <h1 className="text-2xl font-extrabold text-white leading-snug">
                {selectedTicket.title}
              </h1>

              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                {selectedTicket.origin ? `${selectedTicket.origin} ➔ ${selectedTicket.destination}` : selectedTicket.destination}
              </p>

              {/* Schedule Timeline */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span>Operator: <strong className="text-cyan-400">{selectedTicket.operator}</strong></span>
                  <span className="text-slate-500">Duration: {selectedTicket.duration || 'Direct'}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Departure</span>
                    <span className="font-bold text-white text-sm">{selectedTicket.time}</span>
                    <span className="block text-[10px] text-slate-400">{selectedTicket.date}</span>
                  </div>

                  <div className="flex-1 px-4 text-center">
                    <div className="w-full h-0.5 bg-slate-800 relative my-1">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400" />
                    </div>
                    <span className="text-[10px] text-cyan-400 font-bold">Direct Journey</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase">Arrival</span>
                    <span className="font-bold text-white text-sm">{selectedTicket.arrivalTime || 'Est. Evening'}</span>
                    <span className="block text-[10px] text-slate-400">{selectedTicket.date}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed mt-4">
                {selectedTicket.description}
              </p>

              {/* Included Amenities */}
              {selectedTicket.amenities && selectedTicket.amenities.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Included Amenities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedTicket.amenities.map((am) => (
                      <span
                        key={am}
                        className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-medium flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" /> {am}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price & Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Starting Price</span>
                <span className="text-3xl font-extrabold text-white">
                  {currency}
                  {selectedTicket.price}
                </span>
              </div>

              <button
                onClick={() => navigateToSeats(selectedTicket)}
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs rounded-2xl shadow-xl shadow-cyan-500/25 flex items-center gap-2 group"
              >
                <span>Select Seat Map</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            Passenger Reviews & Verified Feedback
          </h3>

          {/* Add Review Form */}
          <form onSubmit={handleAddReview} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-200">Share your journey experience</h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  className="p-1"
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              rows={2}
              placeholder="Write your review here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />

            <button
              type="submit"
              disabled={isSubmittingReview || !newComment.trim()}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Submit Review
            </button>
          </form>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={rev.userAvatar}
                      alt={rev.userName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-white">{rev.userName}</h5>
                      <span className="text-[10px] text-slate-500">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
