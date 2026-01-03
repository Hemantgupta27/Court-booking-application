
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import CourtCard from './components/CourtCard';
import SlotSelector from './components/SlotSelector';
import BookingModal from './components/BookingModal';
import MyBookingsView from './components/MyBookingsView';
import { COURTS } from './constants';
import { Court, TimeSlot, SportType } from './types';
import { backend } from './services/mockBackend';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'explore' | 'my-bookings'>('explore');
  const [activeFilter, setActiveFilter] = useState<SportType | 'All'>('All');
  const [selectedCourt, setSelectedCourt] = useState<Court>(COURTS[0]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredCourts = activeFilter === 'All'
    ? COURTS
    : COURTS.filter(c => c.type === activeFilter);

  // Auto-select first available court in filter
  useEffect(() => {
    if (!filteredCourts.some(c => c.id === selectedCourt.id)) {
      setSelectedCourt(filteredCourts[0] || COURTS[0]);
    }
  }, [activeFilter, filteredCourts, selectedCourt.id]);

  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      full: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const fetchSlots = useCallback(async () => {
    setLoadingSlots(true);
    const response = await backend.getSlots(selectedCourt.id, selectedDate);
    if (response.success && response.data) {
      setSlots(response.data);
    }
    setLoadingSlots(false);
  }, [selectedCourt.id, selectedDate]);

  useEffect(() => {
    if (activeView === 'explore') fetchSlots();
  }, [fetchSlots, activeView]);

  const handleSlotSelect = (slot: TimeSlot) => {
    if (selectedSlots.length === 0 || selectedSlots.length > 1) {
      // Start new selection
      setSelectedSlots([slot]);
    } else {
      // Handle second click (range selection)
      const startSlot = selectedSlots[0];
      const startIndex = slots.findIndex(s => s.id === startSlot.id);
      const endIndex = slots.findIndex(s => s.id === slot.id);

      if (startIndex === -1 || endIndex === -1) return;

      const [start, end] = startIndex < endIndex ? [startIndex, endIndex] : [endIndex, startIndex];
      const range = slots.slice(start, end + 1);

      // Check for any booked slots in range
      const hasBooked = range.some(s => s.isBooked);
      if (hasBooked) {
        alert("Some slots in this range are already booked. Please select a valid range.");
        setSelectedSlots([slot]); // Reset to just the clicked slot
      } else {
        setSelectedSlots(range);
      }
    }
  };

  const handleBookingSubmit = async (userData: { name: string; email: string; phone: string }) => {
    if (selectedSlots.length === 0) return;

    setIsSubmitting(true);
    let successCount = 0;

    // Process all slots
    for (const slot of selectedSlots) {
      const response = await backend.createBooking({
        courtId: selectedCourt.id,
        slotId: slot.id,
        date: selectedDate,
        userName: userData.name,
        userEmail: userData.email,
        userPhone: userData.phone
      });
      if (response.success) successCount++;
    }

    if (successCount === selectedSlots.length) {
      setIsSubmitting(false);
      setIsModalOpen(false);
      setSelectedSlots([]);
      setShowSuccess(true);
      fetchSlots();
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      setIsSubmitting(false);
      alert(`Successfully booked ${successCount} out of ${selectedSlots.length} slots.`);
      fetchSlots();
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {activeView === 'explore' ? (
        <main className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Hero Content */}
          <section className="relative py-12 md:py-24 px-4 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-6xl md:text-8xl font-display text-slate-900 mb-6 leading-[0.9] tracking-tight max-w-4xl mx-auto">
                ELEVATE YOUR <span className="text-bold bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">GAMEPLAY</span>
              </h2>
              <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto mb-12 font-medium">
                The world's most intuitive sports booking platform. Select, book, and compete at the finest venues in your city.
              </p>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-16">
                {['All', 'Football', 'Cricket', 'Badminton', 'Tennis'].map(sport => (
                  <button
                    key={sport}
                    onClick={() => setActiveFilter(sport as any)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${activeFilter === sport
                      ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-900/20 scale-105 ring-2 ring-zinc-900 ring-offset-2'
                      : 'bg-white border border-slate-200 text-slate-500 hover:border-zinc-900 hover:text-black hover:bg-slate-50'
                      }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Booking Section */}
          <section className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">

            {/* Date Selection Bar */}
            <div className="mb-12 overflow-x-auto pb-4 no-scrollbar">
              <div className="flex justify-center gap-3 min-w-max px-4">
                {dateOptions.map((opt) => (
                  <button
                    key={opt.full}
                    onClick={() => {
                      setSelectedDate(opt.full);
                      setSelectedSlots([]);
                    }}
                    className={`
                        flex-shrink-0 w-[4.5rem] h-20 flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 relative overflow-hidden group
                        ${selectedDate === opt.full
                        ? 'bg-zinc-900 border-zinc-900 text-white shadow-xl  z-10'
                        : 'bg-white border-slate-200 text-slate-400 hover:border-zinc-300 hover:text-slate-600 hover:bg-slate-50'
                      }
                      `}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider mb-0.5">{opt.day}</span>
                    <span className="text-xl font-display font-bold tracking-tight">{opt.date}</span>
                    <span className={`text-[9px] font-bold uppercase mt-0.5 ${selectedDate === opt.full ? 'text-zinc-400' : 'text-slate-300 group-hover:text-slate-400'}`}>{opt.month}</span>

                    {/* Active Indicator */}
                    {selectedDate === opt.full && (
                      <div className="absolute bottom-1 w-1 h-1 rounded-full bg-white"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Court Cards Grid */}
              <div className="flex-1">
                <div className="flex items-end justify-between px-2 mb-6">
                  <h3 className="text-2xl font-display text-slate-900 tracking-widest uppercase">Select Arena</h3>
                  <span className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest">{filteredCourts.length} Options Near You</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-6">
                  {filteredCourts.map(court => (
                    <CourtCard
                      key={court.id}
                      court={court}
                      isSelected={selectedCourt.id === court.id}
                      onSelect={(c) => {
                        setSelectedCourt(c);
                        setSelectedSlots([]);
                      }}
                    />
                  ))}
                </div>

                {filteredCourts.length === 0 && (
                  <div className="py-12 px-6 bg-slate-50 border border-slate-200 border-dashed rounded-3xl text-center">
                    <p className="text-slate-500 font-medium">No venues found for this category.</p>
                  </div>
                )}
              </div>

              {/* Sticky Slot Selection Sidebar (Visible when court selected) */}
              <div className="w-full lg:w-96 flex-shrink-0">
                <div className="sticky top-24 bg-white border border-slate-200 rounded-[32px] p-6 shadow-xl shadow-slate-200/50">
                  <div className="mb-6 pb-6 border-b border-slate-100">
                    <h3 className="text-xl font-display text-slate-900 mb-1">{selectedCourt.name}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">{selectedCourt.location}</p>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Available Slots</h4>
                  <div className="mb-8 max-h-[400px] overflow-y-auto">
                    <SlotSelector
                      slots={slots}
                      loading={loadingSlots}
                      selectedSlots={selectedSlots}
                      onSlotSelect={handleSlotSelect}
                    />
                  </div>

                  <button
                    disabled={selectedSlots.length === 0}
                    onClick={() => setIsModalOpen(true)}
                    className={`
                          w-full py-4 rounded-xl font-bold text-sm uppercase tracking-[0.2em] transition-all
                          ${selectedSlots.length > 0
                        ? 'bg-white text-black shadow-lg hover:bg-white hover:text-black'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }
                        `}
                  >
                    {selectedSlots.length > 0
                      ? `Book ${selectedSlots.length} Slots • ₹${selectedCourt.pricePerHour * selectedSlots.length}`
                      : 'Select Time Range'
                    }
                  </button>
                </div>
              </div>

            </div>
          </section>
        </main>
      ) : (
        <main className="animate-in fade-in slide-in-from-right-4 duration-500">
          <MyBookingsView />
        </main>
      )}

      {/* Booking Form Modal Overlay */}
      {selectedSlots.length > 0 && isModalOpen && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleBookingSubmit}
          court={selectedCourt}
          slots={selectedSlots}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Global Success Banner */}
      {showSuccess && (
        <div className="fixed top-24 right-4 md:right-10 z-[110] glass bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-right-10 duration-500">
          <div className="bg-emerald-500 text-slate-950 rounded-2xl p-2 shadow-lg shadow-emerald-500/20">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          </div>
          <div>
            <h4 className="font-bold text-base uppercase tracking-widest leading-none mb-1">Victory!</h4>
            <p className="text-xs font-medium opacity-70">Your arena is secured. Get ready to play!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
