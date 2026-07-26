import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIAssistantModal } from './components/AIAssistantModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './pages/HomePage';
import { TicketListingPage } from './pages/TicketListingPage';
import { TicketDetailPage } from './pages/TicketDetailPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentPage } = useBooking();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'tickets':
        return <TicketListingPage />;
      case 'ticket-detail':
        return <TicketDetailPage />;
      case 'seat-selection':
        return <SeatSelectionPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'payment-success':
        return <PaymentSuccessPage />;
      case 'user-dashboard':
        return <UserDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <AIAssistantModal />
      <WishlistDrawer />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <AppContent />
      </BookingProvider>
    </AuthProvider>
  );
}
