import React, { useState, useEffect } from 'react';
import { ShieldCheck, Info, Sparkles, Check, Armchair, AlertCircle } from 'lucide-react';
import { Ticket } from '../types';
import { useBooking } from '../context/BookingContext';

interface SeatMapProps {
  ticket: Ticket;
  onProceedToCheckout?: () => void;
}

export const SeatMap: React.FC<SeatMapProps> = ({ ticket, onProceedToCheckout }) => {
  const { selectedSeats, toggleSeat, clearSeats, currency, setCurrentPage } = useBooking();
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);
  const [livePulseNotification, setLivePulseNotification] = useState<string | null>(null);

  const seatLayout = ticket.seatLayout;
  const rows = seatLayout.rows || 8;
  const cols = seatLayout.cols || 6;
  const bookedSeats = seatLayout.bookedSeats || [];
  const vipSeats = seatLayout.vipSeats || [];
  const vipPriceExtra = seatLayout.vipPriceExtra || 0;

  // Simulate real-time seat update pulse every 12 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const randomRow = String.fromCharCode(65 + Math.floor(Math.random() * Math.min(rows, 4)));
      const randomCol = Math.floor(Math.random() * cols) + 1;
      const seatCode = `${randomRow}${randomCol}`;
      if (!bookedSeats.includes(seatCode) && !selectedSeats.includes(seatCode)) {
        setLivePulseNotification(`Seat ${seatCode} was just checked by another traveler!`);
        setTimeout(() => setLivePulseNotification(null), 4000);
      }
    }, 12000);
    return () => clearInterval(timer);
  }, [rows, cols, bookedSeats, selectedSeats]);

  const rowLetters = Array.from({ length: rows }, (_, i) => String.fromCharCode(65 + i));
  const colNumbers = Array.from({ length: cols }, (_, i) => i + 1);

  const calculateSeatPrice = (seatCode: string) => {
    const isVip = vipSeats.includes(seatCode);
    return ticket.price + (isVip ? vipPriceExtra : 0);
  };

  const totalPrice = selectedSeats.reduce((sum, seatCode) => sum + calculateSeatPrice(seatCode), 0);

  return (
    <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
      {/* Real-time live pulse alert banner */}
      {livePulseNotification && (
        <div className="bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs px-4 py-2.5 rounded-2xl flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>{livePulseNotification}</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Live Updates</span>
        </div>
      )}

      {/* Seat Map Header & Legend */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Armchair className="w-5 h-5 text-cyan-400" />
            Interactive Seat Selection Map
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click available seats to reserve. Hover to view seat tier & amenities.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-slate-800 border border-slate-700" />
            <span className="text-slate-400">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-md shadow-cyan-500/30" />
            <span className="text-cyan-300 font-semibold">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-slate-950 border border-slate-900 opacity-50 cursor-not-allowed" />
            <span className="text-slate-500">Booked</span>
          </div>
          {vipSeats.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-md bg-amber-500/20 border border-amber-400/80 text-amber-300 font-bold text-[9px] flex items-center justify-center">
                VIP
              </div>
              <span className="text-amber-300 font-semibold">VIP Tier (+{currency}{vipPriceExtra})</span>
            </div>
          )}
        </div>
      </div>

      {/* Stage or Vehicle Front Indicator */}
      <div className="w-full py-2 bg-gradient-to-r from-cyan-950/40 via-indigo-950/60 to-cyan-950/40 border border-slate-800 rounded-xl text-center">
        <span className="text-[11px] font-bold tracking-widest uppercase text-cyan-400">
          {ticket.category === 'concert' || ticket.category === 'event' || ticket.category === 'movie'
            ? 'FRONT STAGE / SCREEN AREA'
            : 'VEHICLE FRONT / COCKPIT'}
        </span>
      </div>

      {/* Visual Seat Grid Container */}
      <div className="overflow-x-auto py-4 flex justify-center no-scrollbar">
        <div className="inline-block space-y-3">
          {rowLetters.map((rowLetter) => (
            <div key={rowLetter} className="flex items-center gap-3">
              {/* Row Label */}
              <span className="w-6 text-xs font-bold text-slate-500 text-center">
                {rowLetter}
              </span>

              {/* Seats in Row */}
              <div className="flex items-center gap-2">
                {colNumbers.map((colNum, colIndex) => {
                  const seatCode = `${rowLetter}${colNum}`;
                  const isBooked = bookedSeats.includes(seatCode);
                  const isSelected = selectedSeats.includes(seatCode);
                  const isVip = vipSeats.includes(seatCode);
                  const isAisle = seatLayout.aisles?.includes(colNum);

                  return (
                    <React.Fragment key={seatCode}>
                      {/* Insert Aisle gap if specified */}
                      {isAisle && colIndex > 0 && (
                        <div className="w-6 text-center text-[10px] text-slate-600 font-mono select-none">
                          AISLE
                        </div>
                      )}

                      <button
                        type="button"
                        disabled={isBooked}
                        onClick={() => toggleSeat(seatCode)}
                        onMouseEnter={() => setHoveredSeat(seatCode)}
                        onMouseLeave={() => setHoveredSeat(null)}
                        className={`relative w-9 h-10 rounded-xl font-bold text-xs flex flex-col items-center justify-center transition-all duration-200 ${
                          isBooked
                            ? 'bg-slate-950 border border-slate-900 text-slate-700 cursor-not-allowed opacity-40'
                            : isSelected
                            ? 'bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white border border-cyan-300 shadow-lg shadow-cyan-500/40 scale-105'
                            : isVip
                            ? 'bg-amber-950/40 border border-amber-500/60 text-amber-300 hover:border-amber-400 hover:scale-105'
                            : 'bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:border-cyan-400 hover:text-white hover:scale-105'
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <span>{colNum}</span>
                        )}

                        {/* VIP Mini Tag */}
                        {isVip && !isSelected && !isBooked && (
                          <span className="text-[8px] leading-none text-amber-400 -mt-0.5">VIP</span>
                        )}
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>

              <span className="w-6 text-xs font-bold text-slate-500 text-center">
                {rowLetter}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Seats Summary & Action Panel */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 block">Selected Seats ({selectedSeats.length}):</span>
          <div className="flex flex-wrap items-center gap-1.5 mt-1 min-h-[28px]">
            {selectedSeats.length > 0 ? (
              selectedSeats.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center gap-1"
                >
                  {s}
                  <button
                    onClick={() => toggleSeat(s)}
                    className="hover:text-rose-400 text-slate-500 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500 italic">No seats chosen yet. Click a seat on the map above.</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Total Amount</span>
            <span className="text-2xl font-extrabold text-white">
              {currency}
              {totalPrice}
            </span>
          </div>

          <button
            disabled={selectedSeats.length === 0}
            onClick={() => {
              if (onProceedToCheckout) {
                onProceedToCheckout();
              } else {
                setCurrentPage('checkout');
              }
            }}
            className={`px-6 py-3.5 rounded-2xl font-bold text-xs transition-all shadow-xl flex items-center gap-2 ${
              selectedSeats.length > 0
                ? 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 shadow-cyan-500/25 hover:shadow-cyan-500/40'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Proceed to Checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
