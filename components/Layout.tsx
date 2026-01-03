
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center transform rotate-12">
              <span className="text-slate-900 font-bold text-xl font-display">C</span>
            </div>
            <h1 className="text-2xl font-display tracking-wider text-white">CRIDAA</h1>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-lime-400 transition-colors">Find Courts</a>
            <a href="#" className="hover:text-lime-400 transition-colors">Tournaments</a>
            <a href="#" className="hover:text-lime-400 transition-colors">About Us</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 rounded-full text-sm font-semibold bg-lime-500 text-slate-950 hover:bg-lime-400 transition-all active:scale-95 shadow-lg shadow-lime-500/20">
              Get App
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-display text-white mb-4">CRIDAA SPORTS</h3>
              <p className="text-slate-400 max-w-sm">
                Empowering athletes with the easiest way to find, book, and play. Join the revolution of amateur sports management.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-lime-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-lime-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-lime-400">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-lime-500 hover:text-slate-900 transition-all">
                  <span className="text-xs">IG</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-lime-500 hover:text-slate-900 transition-all">
                  <span className="text-xs">TW</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-900 text-center text-slate-500 text-xs">
            © 2024 Cridaa Technology. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
