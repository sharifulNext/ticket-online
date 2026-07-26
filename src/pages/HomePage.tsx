import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { PopularDestinations } from '../components/PopularDestinations';
import { FeaturedTickets } from '../components/FeaturedTickets';
import { HowItWorks } from '../components/HowItWorks';
import { CustomerReviews } from '../components/CustomerReviews';
import { StatsSection } from '../components/StatsSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <HeroSection />
      <PopularDestinations />
      <FeaturedTickets />
      <HowItWorks />
      <CustomerReviews />
      <StatsSection />
    </div>
  );
};
