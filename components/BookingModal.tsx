
import React, { useState } from 'react';
import { Court, TimeSlot } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; phone: string }) => void;
  court: Court;
  slots: TimeSlot[];
  isSubmitting: boolean;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onSubmit, court, slots, isSubmitting }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const startTime = slots[0]?.startTime;
  const endTime = slots[slots.length - 1]?.endTime;
  const totalPrice = court.pricePerHour * slots.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose}></div>

      <div className="relative bg-slate-900 w-full max-w-lg rounded-[32px] border border-slate-800 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-10 duration-500">
        <div className="flex flex-col">

          {/* Summary Panel */}
          <div className="p-6 bg-black flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-xl font-display tracking-widest uppercase mb-1">Confirm Booking</h2>
              <p className="text-white/70 text-xs font-medium">Verify your details below</p>

              <div className="mt-6 flex items-center justify-between text-left bg-white/10 rounded-xl p-4">
                <div>
                  <div className="text-white/50 text-[10px] uppercase font-bold tracking-[0.2em]">Venue</div>
                  <div className="text-sm font-bold uppercase tracking-wide leading-tight">{court.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/50 text-[10px] uppercase font-bold tracking-[0.2em]">Total</div>
                  <span className="text-xl font-display">₹{totalPrice}</span>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-4 text-left px-2">
                <div>
                  <label className="text-white/50 text-[9px] uppercase font-bold tracking-[0.2em] block">Date</label>
                  <div className="text-xs font-bold">{slots[0]?.date}</div>
                </div>
                <div>
                  <label className="text-white/50 text-[9px] uppercase font-bold tracking-[0.2em] block">Time</label>
                  <div className="text-xs font-bold">{startTime} - {endTime}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="p-6 bg-black flex flex-col justify-between text-white relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold text-white uppercase tracking-[0.2em] mb-1.5 px-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-black border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-xs font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-white uppercase tracking-[0.2em] mb-1.5 px-1">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="abcd@example.com"
                    className="w-full bg-black border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-xs font-medium"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-white uppercase tracking-[0.2em] mb-1.5 px-1">Phone</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91..."
                    className="w-full bg-black border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-xs font-medium"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-grow py-3 rounded-xl bg-white text-black font-bold text-xs shadow-lg shadow-black/30 hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 uppercase tracking-wider"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs hover:text-white hover:bg-slate-700 transition-all uppercase tracking-wider"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingModal;
