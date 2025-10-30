
import React from 'react';
import { Icon } from './common/Icon';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectColor: (color: string) => void;
  currentColor: string;
}

const themeColors = [
  { name: 'Default Blue', hex: '#007AFF' },
  { name: 'Vibrant Green', hex: '#34C759' },
  { name: 'Sunny Orange', hex: '#FF9500' },
  { name: 'Electric Pink', hex: '#FF2D55' },
  { name: 'Cool Purple', hex: '#AF52DE' },
  { name: 'Cyber Yellow', hex: '#FFD60A' },
];

export const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose, onSelectColor, currentColor }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-brand-surface rounded-xl shadow-2xl p-6 w-full max-w-sm m-4 border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-brand-text-primary">Customize Theme</h2>
          <button onClick={onClose} className="text-brand-text-secondary hover:text-brand-text-primary transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-brand-text-secondary mb-6">Choose an accent color for the interface.</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {themeColors.map(({ name, hex }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <button
                aria-label={`Select theme color: ${name}`}
                onClick={() => onSelectColor(hex)}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-primary"
                style={{ backgroundColor: hex }}
              >
                {currentColor.toLowerCase() === hex.toLowerCase() && (
                  <Icon name="check" className="w-7 h-7 text-white" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
