import React from 'react';
import { MapPin, ArrowUpRight, Plane, Train, Music } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const PopularDestinations: React.FC = () => {
  const { updateFilters, setCurrentPage } = useBooking();

  const destinations = [
    {
      name: 'Paris, France',
      tagline: 'The City of Lights & Romance',
      category: 'flight',
      startingPrice: 649,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      routesCount: '12 Flights Daily'
    },
    {
      name: 'Tokyo, Japan',
      tagline: 'Futuristic Metropolises & Anime Summits',
      category: 'concert',
      startingPrice: 199,
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      routesCount: 'Tokyo Dome Concerts'
    },
    {
      name: 'Amsterdam, Netherlands',
      tagline: 'Historic Canals & High-Speed EuroStar',
      category: 'train',
      startingPrice: 129,
      image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80',
      routesCount: 'Express Railways'
    },
    {
      name: 'San Francisco, USA',
      tagline: 'Silicon Valley AI & Tech Summits',
      category: 'event',
      startingPrice: 299,
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
      routesCount: 'Tech Summits'
    }
  ];

  const handleDestinationClick = (destName: string, category: string) => {
    updateFilters({
      destination: destName.split(',')[0],
      category: category as any
    });
    setCurrentPage('tickets');
  };

  return (
    <section className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Curated Destinations
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Top Trending Global Hubs
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md mt-2 md:mt-0">
            Discover handpicked international destinations with direct high-speed flights, bullet trains, and stadium entertainment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.name}
              onClick={() => handleDestinationClick(dest.name, dest.category)}
              className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer border border-slate-800 hover:border-cyan-500/50 shadow-2xl transition-all duration-500"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              {/* Price Tag Badge */}
              <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-2xl text-xs font-bold text-white shadow-xl">
                From <span className="text-cyan-400 font-extrabold">${dest.startingPrice}</span>
              </div>

              {/* Destination Details Bottom Card */}
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-2">
                <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/80 border border-cyan-800/60 px-2.5 py-1 rounded-full inline-block">
                  {dest.routesCount}
                </span>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition flex items-center justify-between">
                  <span>{dest.name}</span>
                  <ArrowUpRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </h3>

                <p className="text-xs text-slate-300 line-clamp-1">{dest.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
