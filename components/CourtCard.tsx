
import React from 'react';
import { Court, SportType } from '../types';

interface CourtCardProps {
  court: Court;
  isSelected: boolean;
  onSelect: (court: Court) => void;
}

const CourtCard: React.FC<CourtCardProps> = ({ court, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(court)}
      className={`relative group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 ${isSelected
        ? 'border-black ring-2 ring-black shadow-xl scale-[1.02]'
        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg'
        }`}
    >
      <div className="flex flex-col h-full">
        {/* Image Container */}
        <div className="w-full h-32 sm:h-48 relative overflow-hidden flex-shrink-0">
          <img
            src={court.imageUrl}
            alt={court.name}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 to-transparent"></div>
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex gap-2">
            
          </div>
        </div>

        {/* Content Container */}
        <div className="p-3 sm:p-5 flex flex-col justify-between flex-grow bg-white">
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 sm:mb-2 gap-1">
              <h3 className="text-sm sm:text-xl font-display text-slate-900 leading-none tracking-wide uppercase truncate">
                {court.name}
              </h3>
              <div className="self-start flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-700">★ {court.rating}</span>
              </div>
            </div>
            <p className="text-slate-500 text-[10px] sm:text-xs font-medium flex items-center gap-1.5 uppercase tracking-widest truncate">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {court.location}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-3 sm:mt-6 gap-2">
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-2xl font-display text-slate-900">₹{court.pricePerHour}</span>
              <span className="text-slate-400 text-[8px] sm:text-[10px] uppercase font-bold tracking-widest">/ Hr</span>
            </div>

            <div className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-widest border transition-all text-center ${isSelected
                ? 'bg-black border-black text-white'
                : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
              {isSelected ? 'Selected' : 'Select'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtCard;
