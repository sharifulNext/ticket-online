import React, { useState } from 'react';
import { Sparkles, X, Send, Ticket as TicketIcon, ArrowRight, Loader2, Bot } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Ticket } from '../types';

export const AIAssistantModal: React.FC = () => {
  const { isAiModalOpen, setIsAiModalOpen, currency, navigateToSeats } = useBooking();

  const [prompt, setPrompt] = useState('');
  const [preferredCategory, setPreferredCategory] = useState<string>('all');
  const [budget, setBudget] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{
    recommendations: { ticketId: string; reason: string }[];
    aiAdvice: string;
  } | null>(null);
  const [recommendedTickets, setRecommendedTickets] = useState<Ticket[]>([]);

  if (!isAiModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setAiResult(null);

    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          preferredCategory: preferredCategory !== 'all' ? preferredCategory : undefined,
          budget: budget ? Number(budget) : undefined
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiResult(data);

        // Fetch full ticket details for recommended IDs
        if (data.recommendations && data.recommendations.length > 0) {
          const fetchedTickets: Ticket[] = [];
          for (let rec of data.recommendations) {
            const tRes = await fetch(`/api/tickets/${rec.ticketId}`);
            if (tRes.ok) {
              const tData = await tRes.json();
              fetchedTickets.push(tData);
            }
          }
          setRecommendedTickets(fetchedTickets);
        }
      }
    } catch (err) {
      console.error('AI recommendation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl shadow-cyan-950/50 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Close button */}
        <button
          onClick={() => setIsAiModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">TicketSphere AI Concierge</h3>
            <p className="text-xs text-slate-400">
              Powered by Gemini 2.5 Flash • Smart travel & event recommendations
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              What kind of ticket or trip are you looking for?
            </label>
            <textarea
              rows={3}
              placeholder="e.g., 'Looking for a high-speed bullet train or flight from London to Paris for 2 people under $700 with great views...'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Category Preference</label>
              <select
                value={preferredCategory}
                onChange={(e) => setPreferredCategory(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="all">Any Category</option>
                <option value="flight">Flights</option>
                <option value="train">Trains</option>
                <option value="concert">Concerts</option>
                <option value="bus">Sleeper Buses</option>
                <option value="event">Events</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Max Budget ({currency})</label>
              <input
                type="number"
                placeholder="e.g. 500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-xl shadow-cyan-500/20 transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI is analyzing available inventory...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Generate Recommendations</span>
              </>
            )}
          </button>
        </form>

        {/* AI Result View */}
        {aiResult && (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 animate-fadeIn">
            {/* Advice Box */}
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 text-xs text-cyan-200 flex items-start gap-3">
              <Bot className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{aiResult.aiAdvice}</p>
            </div>

            {/* Recommendations List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Recommended Tickets ({recommendedTickets.length})
              </h4>

              {recommendedTickets.map((t, idx) => {
                const recReason = aiResult.recommendations.find((r) => r.ticketId === t.id)?.reason;
                return (
                  <div
                    key={t.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-cyan-400">{t.operator}</span>
                        <span className="text-[10px] text-slate-500 uppercase px-2 py-0.5 bg-slate-900 rounded">
                          {t.category}
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-white">{t.title}</h5>
                      {recReason && (
                        <p className="text-[11px] text-slate-400 italic">💡 {recReason}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-base font-extrabold text-white">
                        {currency}
                        {t.price}
                      </span>
                      <button
                        onClick={() => {
                          setIsAiModalOpen(false);
                          navigateToSeats(t);
                        }}
                        className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1"
                      >
                        <span>Book Seats</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
