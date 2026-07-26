import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  DollarSign,
  Ticket as TicketIcon,
  Users,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  Download,
  Tag,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { AdminStats, Ticket, TicketCategory, Booking } from '../types';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { currency } = useBooking();

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [activeSection, setActiveSection] = useState<'overview' | 'tickets' | 'bookings' | 'coupons'>('overview');
  const [loading, setLoading] = useState(true);

  // Ticket Modal state
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TicketCategory>('flight');
  const [destination, setDestination] = useState('');
  const [operator, setOperator] = useState('');
  const [price, setPrice] = useState(100);
  const [date, setDate] = useState('2026-08-20');
  const [time, setTime] = useState('10:00 AM');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [sRes, tRes, bRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/tickets'),
        fetch('/api/bookings?role=admin')
      ]);

      if (sRes.ok) setStats(await sRes.json());
      if (tRes.ok) setTickets(await tRes.json());
      if (bRes.ok) setAllBookings(await bRes.json());
    } catch (e) {
      console.error('Failed to fetch admin stats:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenTicketModal = (ticketToEdit?: Ticket) => {
    if (ticketToEdit) {
      setEditingTicket(ticketToEdit);
      setTitle(ticketToEdit.title);
      setCategory(ticketToEdit.category);
      setDestination(ticketToEdit.destination);
      setOperator(ticketToEdit.operator);
      setPrice(ticketToEdit.price);
      setDate(ticketToEdit.date);
      setTime(ticketToEdit.time);
      setDescription(ticketToEdit.description);
    } else {
      setEditingTicket(null);
      setTitle('');
      setCategory('flight');
      setDestination('');
      setOperator('');
      setPrice(150);
      setDate('2026-08-20');
      setTime('10:00 AM');
      setDescription('');
    }
    setIsTicketModalOpen(true);
  };

  const handleSaveTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      category,
      destination,
      operator,
      price: Number(price),
      date,
      time,
      description,
      images: [
        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'
      ],
      seatLayout: editingTicket?.seatLayout || {
        rows: 8,
        cols: 6,
        bookedSeats: [],
        vipSeats: ['A1', 'A2', 'A3', 'A4'],
        vipPriceExtra: 30
      }
    };

    try {
      if (editingTicket) {
        const res = await fetch(`/api/tickets/${editingTicket.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) fetchAdminData();
      } else {
        const res = await fetch('/api/tickets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) fetchAdminData();
      }
    } catch (e) {
      console.error('Failed to save ticket:', e);
    } finally {
      setIsTicketModalOpen(false);
    }
  };

  const handleDeleteTicket = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;
    try {
      const res = await fetch(`/api/tickets/${id}`, { method: 'DELETE' });
      if (res.ok) fetchAdminData();
    } catch (e) {
      console.error('Failed to delete ticket:', e);
    }
  };

  const handleDownloadReport = () => {
    const reportStr = `TicketSphere Executive Report - ${new Date().toLocaleDateString()}
Total Revenue: $${stats?.totalRevenue || 0}
Total Bookings: ${stats?.totalBookings || 0}
Total Users: ${stats?.totalUsers || 0}
Active Routes: ${tickets.length}`;

    const blob = new Blob([reportStr], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'TicketSphere_Admin_Report.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Admin Header */}
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white">TicketSphere Control Center</h1>
              <p className="text-xs text-slate-400">Admin Management Portal & Real-time Analytics</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadReport}
              className="px-4 py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200 rounded-2xl flex items-center gap-2 transition"
            >
              <Download className="w-4 h-4 text-cyan-400" /> Export CSV/PDF Report
            </button>
            <button
              onClick={() => handleOpenTicketModal()}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2 transition"
            >
              <Plus className="w-4 h-4" /> Add New Ticket
            </button>
          </div>
        </div>

        {/* Analytics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase">Total Revenue</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">
              {currency}
              {stats?.totalRevenue.toLocaleString() || '482,910'}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">+24% vs last quarter</span>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase">Total Bookings</span>
              <TicketIcon className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-white">
              {stats?.totalBookings.toLocaleString() || '3,420'}
            </div>
            <span className="text-[10px] text-cyan-400 font-medium">+18% growth speed</span>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase">Active Passengers</span>
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white">
              {stats?.totalUsers.toLocaleString() || '12,850'}
            </div>
            <span className="text-[10px] text-indigo-400 font-medium">Registered user base</span>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase">Available Routes</span>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-white">{tickets.length}</div>
            <span className="text-[10px] text-purple-400 font-medium">Live inventory items</span>
          </div>
        </div>

        {/* Navigation Section Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          {(['overview', 'tickets', 'bookings'] as const).map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
                activeSection === sec
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              Manage {sec}
            </button>
          ))}
        </div>

        {/* Manage Tickets View */}
        {(activeSection === 'tickets' || activeSection === 'overview') && (
          <div className="bg-slate-900/70 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Inventory Ticket Routes ({tickets.length})</h3>
              <button
                onClick={() => handleOpenTicketModal()}
                className="px-3.5 py-1.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-400 transition"
              >
                + Add Route
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="text-[10px] text-slate-500 uppercase bg-slate-950/80 border-b border-slate-800">
                  <tr>
                    <th className="p-3">ID & Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Destination</th>
                    <th className="p-3">Operator</th>
                    <th className="p-3">Price</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {tickets.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-900/50 transition">
                      <td className="p-3">
                        <span className="font-mono text-cyan-400 font-bold block text-[11px]">{t.id}</span>
                        <span className="font-bold text-white line-clamp-1">{t.title}</span>
                      </td>
                      <td className="p-3 capitalize">{t.category}</td>
                      <td className="p-3">{t.destination}</td>
                      <td className="p-3">{t.operator}</td>
                      <td className="p-3 font-bold text-white">{currency}{t.price}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenTicketModal(t)}
                            className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-950 rounded-lg border border-slate-800"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTicket(t.id)}
                            className="p-2 text-slate-400 hover:text-rose-400 bg-slate-950 rounded-lg border border-slate-800"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Add or Edit Ticket */}
        {isTicketModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar">
              <button
                onClick={() => setIsTicketModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-base font-bold text-white">
                {editingTicket ? 'Update Ticket Listing' : 'Create New Ticket Route'}
              </h3>

              <form onSubmit={handleSaveTicket} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Ticket Title</label>
                  <input
                    type="text"
                    placeholder="e.g. SkySphere: New York to Paris"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                    >
                      <option value="flight">Flight</option>
                      <option value="train">Train</option>
                      <option value="bus">Bus</option>
                      <option value="concert">Concert</option>
                      <option value="event">Event</option>
                      <option value="movie">Cinema</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Price ({currency})</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Destination / Venue</label>
                    <input
                      type="text"
                      placeholder="e.g. Paris (CDG)"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Operator Name</label>
                    <input
                      type="text"
                      placeholder="e.g. SkySphere Express"
                      value={operator}
                      onChange={(e) => setOperator(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Travel Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none [color-scheme:dark]"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Time</label>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 font-bold text-xs text-white rounded-xl shadow-lg"
                >
                  Save Ticket Route
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
