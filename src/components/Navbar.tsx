import React, { useState } from 'react';
import {
  Ticket as TicketIcon,
  Search,
  Sparkles,
  Heart,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  ChevronDown,
  Globe,
  Compass,
  Plane,
  Train,
  Bus,
  Music,
  Calendar,
  Film
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking, PageRoute } from '../context/BookingContext';

export const Navbar: React.FC = () => {
  const { user, logout, openAuthModal } = useAuth();
  const {
    currentPage,
    setCurrentPage,
    currency,
    setCurrency,
    setIsAiModalOpen,
    setIsWishlistOpen,
    updateFilters
  } = useBooking();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const wishlistCount = user?.wishlist?.length || 0;

  const handleCategoryClick = (cat: string) => {
    updateFilters({ category: cat as any });
    setCurrentPage('tickets');
    setIsMobileMenuOpen(false);
  };

  const navItemClass = (page: PageRoute) =>
    `px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg flex items-center gap-1.5 ${
      currentPage === page
        ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30'
        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <TicketIcon className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent tracking-tight">
              Ticket<span className="text-cyan-400">Sphere</span>
            </span>
            <span className="block text-[10px] font-medium tracking-widest uppercase text-slate-400 -mt-1">
              Premium Booking Platform
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          <button onClick={() => setCurrentPage('home')} className={navItemClass('home')}>
            <Compass className="w-4 h-4" />
            Home
          </button>

          <button onClick={() => setCurrentPage('tickets')} className={navItemClass('tickets')}>
            <Search className="w-4 h-4" />
            Browse Tickets
          </button>

          {/* Quick Categories */}
          <div className="relative group px-1">
            <button className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all flex items-center gap-1 hover:bg-slate-800/50 rounded-lg">
              Categories <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 transform group-hover:translate-y-0 -translate-y-2 z-50">
              <button
                onClick={() => handleCategoryClick('flight')}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/40 rounded-xl flex items-center gap-2.5 transition"
              >
                <Plane className="w-4 h-4 text-cyan-400" /> Flights
              </button>
              <button
                onClick={() => handleCategoryClick('train')}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/40 rounded-xl flex items-center gap-2.5 transition"
              >
                <Train className="w-4 h-4 text-emerald-400" /> Trains & Railways
              </button>
              <button
                onClick={() => handleCategoryClick('bus')}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-300 hover:text-amber-300 hover:bg-amber-950/40 rounded-xl flex items-center gap-2.5 transition"
              >
                <Bus className="w-4 h-4 text-amber-400" /> Luxury Coaches
              </button>
              <button
                onClick={() => handleCategoryClick('concert')}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-300 hover:text-purple-300 hover:bg-purple-950/40 rounded-xl flex items-center gap-2.5 transition"
              >
                <Music className="w-4 h-4 text-purple-400" /> Concerts & Gigs
              </button>
              <button
                onClick={() => handleCategoryClick('event')}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-300 hover:text-blue-300 hover:bg-blue-950/40 rounded-xl flex items-center gap-2.5 transition"
              >
                <Calendar className="w-4 h-4 text-blue-400" /> Tech Summits
              </button>
              <button
                onClick={() => handleCategoryClick('movie')}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-300 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl flex items-center gap-2.5 transition"
              >
                <Film className="w-4 h-4 text-rose-400" /> Cinema & IMAX
              </button>
            </div>
          </div>

          {/* AI Assistant Banner */}
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="ml-2 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 bg-gradient-to-r from-cyan-950/60 via-indigo-950/60 to-purple-950/60 border border-cyan-500/40 hover:border-cyan-400 rounded-full flex items-center gap-2 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 transition-all group"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse group-hover:rotate-12 transition-transform" />
            <span>Sphere AI Assistant</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-medium flex items-center gap-1 transition"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {isCurrencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-1 z-50">
                {['$', '€', '£', '¥'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition ${
                      currency === curr
                        ? 'bg-cyan-500/20 text-cyan-400 font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {curr} Currency
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Heart */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2.5 text-slate-300 hover:text-rose-400 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl transition group"
            title="Wishlist"
          >
            <Heart className="w-4 h-4 transition-transform group-hover:scale-110" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* User Auth Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-2xl transition"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                  alt={user.name}
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-cyan-500/30"
                />
                <div className="text-left hidden sm:block">
                  <span className="block text-xs font-semibold text-slate-200 leading-tight">
                    {user.name.split(' ')[0]}
                  </span>
                  <span className="block text-[10px] text-cyan-400 font-medium capitalize">
                    {user.role}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                    <p className="text-xs font-bold text-slate-200">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentPage('user-dashboard');
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-800/80 rounded-xl flex items-center gap-2.5 transition"
                  >
                    <UserIcon className="w-4 h-4 text-cyan-400" /> My Bookings & Profile
                  </button>

                  {user.role === 'admin' && (
                    <button
                      onClick={() => {
                        setCurrentPage('admin-dashboard');
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-purple-300 hover:bg-purple-950/40 rounded-xl flex items-center gap-2.5 transition mt-1"
                    >
                      <LayoutDashboard className="w-4 h-4 text-purple-400" /> Admin Control Panel
                    </button>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setIsUserDropdownOpen(false);
                      setCurrentPage('home');
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-950/30 rounded-xl flex items-center gap-2.5 transition mt-1 border-t border-slate-800/80 pt-2"
                  >
                    <LogOut className="w-4 h-4 text-rose-400" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center gap-2"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Sign In / Register</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 p-4 space-y-3">
          <button
            onClick={() => {
              setCurrentPage('home');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-xl flex items-center gap-3"
          >
            <Compass className="w-4 h-4 text-cyan-400" /> Home
          </button>
          <button
            onClick={() => {
              setCurrentPage('tickets');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-xl flex items-center gap-3"
          >
            <Search className="w-4 h-4 text-cyan-400" /> Browse All Tickets
          </button>
          <button
            onClick={() => {
              setIsAiModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-800/50 rounded-xl flex items-center gap-3"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" /> AI Ticket Assistant
          </button>
        </div>
      )}
    </header>
  );
};
