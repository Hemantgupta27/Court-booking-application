
import React from 'react';

interface NavbarProps {
  activeView: 'explore' | 'my-bookings';
  setActiveView: (view: 'explore' | 'my-bookings') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView }) => {
  return (
    <header className="sticky top-0 z-[60] bg-zinc-950 border-b border-zinc-900 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Modern Logo */}
        <div className="flex items-center gap-3 group cursor-pointer select-none" onClick={() => setActiveView('explore')}>
          <div className="relative">
            <div className="absolute inset-0"></div>
            <h1 className="relative text-3xl font-display font-black italic text-white">
              CRIDAA<span className="text-white">.</span>
            </h1>
          </div>
        </div>

        {/* Improved Navigation */}
        <nav className="flex bg-zinc-900/50 p-1.5 rounded-full border border-zinc-800 overflow-x-auto mx-4 no-scrollbar backdrop-blur-sm">
          <button
            onClick={() => setActiveView('explore')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap duration-300 ${activeView === 'explore'
              ? 'bg-white text-black shadow-lg shadow-white/10 scale-95'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
          >
            Explore
          </button>
          <button
            onClick={() => setActiveView('my-bookings')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap duration-300 ${activeView === 'my-bookings'
              ? 'bg-white text-black shadow-lg shadow-white/10 scale-95'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
          >
            My Bookings
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
