
import React, { useState, useRef, useEffect } from 'react';
import { User, View } from '../types';
import { Icon } from './common/Icon';

interface HeaderProps {
  cartItemCount: number;
  currentUser: User | null;
  setView: (view: View) => void;
  onLogout: () => void;
  onOpenThemeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, currentUser, setView, onLogout, onOpenThemeModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-brand-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => setView(View.Home)} className="flex-shrink-0 text-2xl font-bold tracking-tighter text-brand-text-primary">
              ElectroMobile
            </button>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button onClick={onOpenThemeModal} className="rounded-full p-2 text-brand-text-secondary hover:text-brand-text-primary transition" aria-label="Customize theme">
                <Icon name="palette" className="h-6 w-6" />
            </button>
            <button onClick={() => setView(View.Cart)} className="relative rounded-full p-2 text-brand-text-secondary hover:text-brand-text-primary transition" aria-label="Open shopping cart">
              <Icon name="cart" className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-brand-primary text-xs font-medium text-white flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                  {cartItemCount}
                </span>
              )}
            </button>
            {currentUser ? (
              <div className="relative" ref={menuRef}>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center space-x-2 rounded-full p-1 hover:bg-brand-surface transition">
                 <div className="h-8 w-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-semibold">
                    {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline text-sm font-medium text-brand-text-primary">{currentUser.name}</span>
                <Icon name="chevron-down" className={`h-4 w-4 text-brand-text-secondary transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-brand-surface shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
                    <button onClick={() => { setView(View.Profile); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-brand-text-primary hover:bg-white/5 transition-colors">My Orders</button>
                    <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-white/5 transition-colors">Sign Out</button>
                </div>
              )}
              </div>
            ) : (
                <button onClick={() => setView(View.Login)} className="text-sm font-semibold text-brand-primary hover:text-blue-400 transition">
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
