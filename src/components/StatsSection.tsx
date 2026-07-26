import React from 'react';
import { Ticket, Users, Globe2, Award } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    { label: 'Tickets Issued', value: '250,000+', icon: Ticket, change: '+18% this month' },
    { label: 'Happy Travelers', value: '180,000+', icon: Users, change: '99.8% Satisfaction' },
    { label: 'Global Destinations', value: '120+ Cities', icon: Globe2, change: 'Across 45 countries' },
    { label: 'Industry Awards', value: '14 Tech Medals', icon: Award, change: 'Best UX 2025' }
  ];

  return (
    <section className="py-16 bg-slate-900/40 border-y border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.label}
                className="bg-slate-900/80 border border-slate-800/80 p-6 rounded-3xl text-center space-y-2 shadow-xl hover:border-cyan-500/30 transition group"
              >
                <div className="inline-flex p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 mb-1 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {st.value}
                </div>
                <div className="text-xs font-semibold text-slate-300">{st.label}</div>
                <div className="text-[10px] text-cyan-400 font-medium">{st.change}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
