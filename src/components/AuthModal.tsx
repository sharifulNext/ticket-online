import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, login, register } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>(authMode || 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (mode === 'login') {
      const success = await login(email || 'user@ticketsphere.com');
      if (!success) setErrorMsg('Failed to sign in. Please verify credentials.');
    } else {
      const success = await register(name, email, phone);
      if (!success) setErrorMsg('User registration failed.');
    }
    setLoading(false);
  };

  const handleDemoLogin = (type: 'user' | 'admin') => {
    if (type === 'admin') {
      setEmail('admin@ticketsphere.com');
      login('admin@ticketsphere.com');
    } else {
      setEmail('user@ticketsphere.com');
      login('user@ticketsphere.com');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-white">
            {mode === 'login' ? 'Welcome Back to TicketSphere' : 'Create Customer Account'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Access digital QR tickets, booking history, & real-time seat locks.
          </p>
        </div>

        {/* Demo Quick Logins Bar */}
        <div className="mb-6 p-3 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block text-center">
            ⚡ Quick Test Logins (1-Click)
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('user')}
              className="py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Test Passenger</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-purple-300 rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Shariful Islam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-3 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                  required
                />
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="user@ticketsphere.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-3 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                required
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-3 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                required
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+1 415 890 2341"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-3 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              </div>
            </div>
          )}

          {errorMsg && <p className="text-xs text-rose-400 font-semibold">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-xl shadow-cyan-500/20 transition"
          >
            {loading ? 'Authenticating...' : mode === 'login' ? 'Sign In to Account' : 'Register Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-cyan-400 font-bold hover:underline"
              >
                Create One
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-cyan-400 font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
