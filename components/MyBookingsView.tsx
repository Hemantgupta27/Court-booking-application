
import React, { useEffect, useState } from 'react';
import { Booking, ApiResponse } from '../types';
import { backend } from '../services/mockBackend';
import { COURTS } from '../constants';

const MyBookingsView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    refreshBookings(email);
  };

  const refreshBookings = async (userEmail: string) => {
    setLoading(true);
    setHasSearched(true);
    // Slight delay for better UX
    await new Promise(r => setTimeout(r, 800));

    const response = await backend.getMyBookings(userEmail);
    if (response.success && response.data) {
      setBookings(response.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
    setLoading(false);
  };

  const handleCancel = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) return;

    setLoading(true);
    const response = await backend.cancelBooking(bookingId);
    if (response.success) {
      await refreshBookings(email);
    } else {
      alert(response.error || 'Failed to cancel booking');
      setLoading(false);
    }
  };

  if (!hasSearched) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <div className="bg-black rounded-[32px] p-8 border border-slate-800 shadow-2xl">
          <h2 className="text-2xl font-display text-white tracking-widest uppercase mb-2">My Bookings</h2>
          <p className="text-white text-sm mb-8">Enter your registered email used for booking.</p>

          <form onSubmit={handleSearch}>
            <input
              type="email"
              required
              placeholder="Ex: abcd@example.com"
              className="w-full bg-black border border-white rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-center"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-full py-3 bg-white text-black rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-200 transition-all font-display"
            >
              Find My Matches
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <div className="animate-spin w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-slate-400 font-medium">Updating records...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="mb-8">
          <button onClick={() => setHasSearched(false)} className="text-slate-500 hover:text-white text-xs uppercase font-bold tracking-widest">
            ← Search Different Email
          </button>
        </div>

        <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-display text-white tracking-widest uppercase mb-2">No Bookings Found</h2>
        <p className="text-black mb-8 max-w-sm mx-auto text-sm">We couldn't find any bookings for <span className="text-white">{email}</span>.</p>
        <button onClick={() => setHasSearched(false)} className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-display text-white tracking-widest uppercase">My History</h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-slate-400 text-sm">Tracking {bookings.length} upcoming and past bookings for <span className="text-black">{email}</span></p>
            <button onClick={() => setHasSearched(false)} className="text-indigo-400 text-xs hover:underline">(Change)</button>
          </div>
        </div>
        <div className="px-4 py-2 bg-black border border-white/20 rounded-xl text-white text-xs font-bold uppercase tracking-widest">
          Recent First
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => {
          const court = COURTS.find(c => c.id === booking.courtId);
          // Safely handle slotId format
          const parts = booking.slotId ? booking.slotId.split('-') : [];
          const time = parts.length >= 3 ? parts[parts.length - 1] : '00:00';

          return (
            <div key={booking.id} className="bg-black border border-white/20 rounded-3xl overflow-hidden flex flex-col hover:border-slate-700 transition-all group">
              <div className="w-full h-48 overflow-hidden relative">
                <img src={court?.imageUrl} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight mb-1">{court?.name || 'Unknown Court'}</h3>
                    <div className="flex items-center gap-2 text-xs text-white">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {court?.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Date</div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        {booking.date}
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Time</div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        {time}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="text-xs">
                      <span className="text-slate-500 font-medium block">Booking ID</span>
                      <span className="text-slate-300 font-mono uppercase text-[10px]">{booking.id.substring(0, 8)}...</span>
                    </div>
                    <div className="text-right">
                      <div className="text-indigo-400 font-bold text-lg">₹{court?.pricePerHour}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="w-[200px] py-2.5 rounded-xl text-red-500 text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookingsView;
