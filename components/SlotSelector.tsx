
import React from 'react';
import { TimeSlot } from '../types';

interface SlotSelectorProps {
  slots: TimeSlot[];
  loading: boolean;
  selectedSlots: TimeSlot[];
  onSlotSelect: (slot: TimeSlot) => void;
}

const SlotSelector: React.FC<SlotSelectorProps> = ({ slots, loading, selectedSlots, onSlotSelect }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-2xl border border-slate-200"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
      {slots.map((slot) => {
        const isSelected = selectedSlots.some(s => s.id === slot.id);
        const isStart = selectedSlots[0]?.id === slot.id;
        const isEnd = selectedSlots[selectedSlots.length - 1]?.id === slot.id;
        const isMiddle = isSelected && !isStart && !isEnd;

        return (
          <button
            key={slot.id}
            disabled={slot.isBooked}
            onClick={() => onSlotSelect(slot)}
            className={`
              relative h-16 flex flex-col items-center justify-center border transition-all duration-300
              ${slot.isBooked
                ? 'bg-slate-50 border-slate-100 opacity-40 cursor-not-allowed grayscale'
                : isSelected
                  ? 'border-black text-white shadow-lg z-10 scale-[1.02]'
                  : 'bg-white border-slate-200 hover:border-slate-400 text-slate-500 hover:text-slate-900'
              }
              ${isMiddle ? 'bg-slate-800' : isSelected ? 'bg-black' : ''}
            `}
          >
            <span className="text-sm font-display tracking-widest uppercase">
              {slot.startTime}
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
              to {slot.endTime}
            </span>

            {slot.isBooked && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-[1.5px] bg-slate-300 rotate-[-45deg]"></div>
              </div>
            )}

            {isSelected && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100">
                <svg className="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SlotSelector;
