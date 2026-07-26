import React from 'react';
import { Search, MousePointerClick, ShieldCheck, QrCode } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Search & AI Discovery',
      description: 'Enter your preferred origin, destination, or travel date. Use our AI assistant to discover curated journeys tailored to your budget.',
      icon: Search,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      step: '02',
      title: 'Interactive Seat Selection',
      description: 'Pick your exact seat on real-time interactive plane, train, coach, or stadium layouts with clear VIP & window indicators.',
      icon: MousePointerClick,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      step: '03',
      title: '1-Click Express Checkout',
      description: 'Pay securely using Stripe credit card or SSLCommerz mobile wallet gateways with instant promo coupon discounts.',
      icon: ShieldCheck,
      color: 'from-purple-500 to-pink-600'
    },
    {
      step: '04',
      title: 'Digital QR Ticket',
      description: 'Receive an instant encrypted QR pass directly on your phone and email. Scan directly at boarding gates with zero paper printing.',
      icon: QrCode,
      color: 'from-emerald-500 to-cyan-600'
    }
  ];

  return (
    <section className="py-20 bg-slate-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Streamlined Experience
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            How TicketSphere Works
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Book your tickets in four simple, secure steps without waiting in line.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-slate-700 p-6 rounded-3xl group transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${s.color} p-0.5 shadow-lg`}>
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <span className="text-3xl font-black text-slate-800 group-hover:text-slate-700 transition">
                    {s.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
