import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data/mockDatabase';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Real Traveler Feedback
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            Loved by 250,000+ Passengers
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            See what verified travelers say about our interactive seat selection and instant QR tickets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl relative shadow-xl hover:border-slate-700 transition"
            >
              <Quote className="w-8 h-8 text-cyan-500/20 absolute top-6 right-6" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6 italic">
                "{rev.comment}"
              </p>

              {/* User Avatar & Name */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <img
                  src={rev.userAvatar}
                  alt={rev.userName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-white">{rev.userName}</h4>
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" title="Verified Ticket Holder" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500">{rev.date} • Verified Traveler</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
