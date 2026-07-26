import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Lock,
  Loader2,
  User as UserIcon,
  Mail,
  Phone,
  Ticket as TicketIcon,
  Building,
  Smartphone,
  Wallet
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';

export const CheckoutPage: React.FC = () => {
  const {
    selectedTicket,
    selectedSeats,
    currency,
    appliedCoupon,
    setAppliedCoupon,
    setLatestBooking,
    setCurrentPage
  } = useBooking();

  const { user } = useAuth();

  const [passengerName, setPassengerName] = useState(user?.name || '');
  const [passengerEmail, setPassengerEmail] = useState(user?.email || '');
  const [passengerPhone, setPassengerPhone] = useState(user?.phone || '');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [paymentGateway, setPaymentGateway] = useState<'stripe' | 'sslcommerz'>('stripe');

  // Stripe Card form states
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');

  // SSLCommerz state
  const [sslMethod, setSslMethod] = useState<'bkash' | 'nagad' | 'cards' | 'dbbl'>('bkash');

  const [isProcessing, setIsProcessing] = useState(false);

  if (!selectedTicket || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <p className="text-slate-400 text-sm mb-4">No seats selected for checkout.</p>
        <button
          onClick={() => setCurrentPage('tickets')}
          className="px-5 py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
        >
          Select Seats First
        </button>
      </div>
    );
  }

  // Calculate prices
  const basePricePerSeat = selectedTicket.price;
  const rawSubtotal = selectedSeats.reduce((sum, seatCode) => {
    const isVip = selectedTicket.seatLayout.vipSeats?.includes(seatCode);
    return sum + basePricePerSeat + (isVip ? selectedTicket.seatLayout.vipPriceExtra || 0 : 0);
  }, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount = Math.min(
      (rawSubtotal * appliedCoupon.discountPercent) / 100,
      appliedCoupon.maxDiscount
    );
  }

  const taxAmount = Math.round(rawSubtotal * 0.05); // 5% service tax
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + taxAmount);

  const handleVerifyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (!couponInput.trim()) return;

    try {
      const res = await fetch(`/api/coupons/verify?code=${couponInput.trim()}`);
      if (res.ok) {
        const couponData = await res.json();
        setAppliedCoupon(couponData);
        setCouponSuccess(`Applied code ${couponData.code}: ${couponData.discountPercent}% discount!`);
      } else {
        setCouponError('Invalid or expired promo code');
      }
    } catch (err) {
      setCouponError('Coupon verification error');
    }
  };

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: selectedTicket.id,
          userId: user?.id || 'usr-guest',
          userEmail: passengerEmail,
          passengerName,
          passengerPhone,
          seats: selectedSeats,
          totalAmount: finalTotal,
          discountAmount,
          couponCode: appliedCoupon?.code,
          paymentMethod: paymentGateway
        })
      });

      if (res.ok) {
        const bookingData = await res.json();
        setLatestBooking(bookingData);
        setTimeout(() => {
          setIsProcessing(false);
          setCurrentPage('payment-success');
        }, 1500);
      }
    } catch (err) {
      console.error('Payment booking failed:', err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Encrypted Checkout
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Complete Your Booking</h1>
          <p className="text-xs text-slate-400 mt-1">
            Fill in passenger details and choose your preferred payment gateway.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Left */}
          <div className="lg:col-span-7 space-y-6">
            {/* Passenger Information */}
            <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-cyan-400" />
                Passenger Contact Details
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Full Legal Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Shariful Islam"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-3 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                      required
                    />
                    <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="passenger@example.com"
                        value={passengerEmail}
                        onChange={(e) => setPassengerEmail(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-3 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                        required
                      />
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Mobile Phone</label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+1 415 890 2341"
                        value={passengerPhone}
                        onChange={(e) => setPassengerPhone(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-3 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                        required
                      />
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Gateway Selection */}
            <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                Select Payment Gateway
              </h3>

              {/* Gateway Tabs */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentGateway('stripe')}
                  className={`p-4 rounded-2xl border transition-all text-left space-y-1 ${
                    paymentGateway === 'stripe'
                      ? 'bg-gradient-to-r from-cyan-950/80 to-indigo-950/80 border-cyan-500 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-300">
                      STRIPE
                    </span>
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-[11px] text-slate-300">Credit / Debit Card (Global)</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentGateway('sslcommerz')}
                  className={`p-4 rounded-2xl border transition-all text-left space-y-1 ${
                    paymentGateway === 'sslcommerz'
                      ? 'bg-gradient-to-r from-cyan-950/80 to-indigo-950/80 border-cyan-500 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-300">
                      SSLCommerz
                    </span>
                    <Smartphone className="w-4 h-4 text-indigo-400" />
                  </div>
                  <p className="text-[11px] text-slate-300">bKash, Nagad, Local Cards</p>
                </button>
              </div>

              {/* Stripe Credit Card Form View */}
              {paymentGateway === 'stripe' && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-fadeIn">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Card Information</span>
                    <span className="text-[10px] text-cyan-400 font-mono">256-Bit SSL Encrypted</span>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="password"
                      placeholder="CVC"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

              {/* SSLCommerz Gateway View */}
              {paymentGateway === 'sslcommerz' && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-fadeIn">
                  <span className="text-xs text-slate-400 block">Select SSLCommerz Payment Method</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'bkash', label: 'bKash Wallet', color: 'text-pink-400' },
                      { id: 'nagad', label: 'Nagad Pay', color: 'text-orange-400' },
                      { id: 'cards', label: 'Visa / MC', color: 'text-cyan-400' },
                      { id: 'dbbl', label: 'Rocket', color: 'text-purple-400' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSslMethod(m.id as any)}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold transition ${
                          sslMethod === m.id
                            ? 'bg-slate-900 border-cyan-400 text-cyan-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className={m.color}>{m.label}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 italic">
                    Simulating SSLCommerz sandbox payment redirect for {sslMethod.toUpperCase()}.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Right */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                Booking Summary
              </h3>

              {/* Selected Ticket Mini Info */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800/80">
                <img
                  src={selectedTicket.images[0]}
                  alt={selectedTicket.title}
                  className="w-14 h-14 rounded-2xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{selectedTicket.title}</h4>
                  <p className="text-[11px] text-slate-400">{selectedTicket.destination}</p>
                  <p className="text-[11px] text-cyan-400 font-semibold">{selectedTicket.date} • {selectedTicket.time}</p>
                </div>
              </div>

              {/* Seats breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Reserved Seats ({selectedSeats.length}):</span>
                  <span className="font-mono font-bold text-cyan-300">{selectedSeats.join(', ')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Ticket Subtotal:</span>
                  <span>{currency}{rawSubtotal}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Platform & Service Fee (5%):</span>
                  <span>{currency}{taxAmount}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount ({appliedCoupon.code}):</span>
                    <span>-{currency}{discountAmount}</span>
                  </div>
                )}
              </div>

              {/* Promo Coupon Form */}
              <form onSubmit={handleVerifyCoupon} className="pt-3 border-t border-slate-800 space-y-2">
                <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-cyan-400" /> Have a Coupon Code? (Try "SPHERE10" or "VIP20")
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="SPHERE10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white uppercase focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-400 rounded-xl transition"
                  >
                    Apply
                  </button>
                </div>
                {couponSuccess && <p className="text-[11px] text-emerald-400 font-medium">{couponSuccess}</p>}
                {couponError && <p className="text-[11px] text-rose-400 font-medium">{couponError}</p>}
              </form>

              {/* Total Amount */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase block font-semibold">Total Payable</span>
                  <span className="text-3xl font-black text-white">
                    {currency}
                    {finalTotal}
                  </span>
                </div>
              </div>

              {/* Confirm Pay Button */}
              <button
                type="button"
                disabled={isProcessing || !passengerName || !passengerEmail}
                onClick={handleConfirmPayment}
                className={`w-full py-4 rounded-2xl font-bold text-xs transition-all shadow-xl flex items-center justify-center gap-2 ${
                  isProcessing || !passengerName || !passengerEmail
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-cyan-500/25'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Authorizing Payment Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay {currency}{finalTotal} & Generate QR Ticket</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
