
import React from 'react';
import { AppRoute } from '../types';

interface HeaderProps {
  cartCount: number;
  currentRoute: AppRoute;
  setRoute: (route: AppRoute) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, currentRoute, setRoute }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setRoute(AppRoute.HOME)}
        >
          <div className="w-10 h-10 bg-slate-900 flex items-center justify-center rounded-xl rotate-12 group-hover:rotate-0 transition-transform duration-300">
            <i className="fas fa-gem text-white"></i>
          </div>
          <h1 className="text-2xl font-serif font-bold tracking-tight">LUMINA</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-slate-500">
          <button 
            onClick={() => setRoute(AppRoute.HOME)}
            className={`hover:text-slate-900 transition-colors ${currentRoute === AppRoute.HOME ? 'text-slate-900 border-b-2 border-slate-900' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => setRoute(AppRoute.SHOP)}
            className={`hover:text-slate-900 transition-colors ${currentRoute === AppRoute.SHOP ? 'text-slate-900 border-b-2 border-slate-900' : ''}`}
          >
            Shop
          </button>
          <button 
            onClick={() => setRoute(AppRoute.AI_CONCIERGE)}
            className={`hover:text-indigo-600 transition-colors flex items-center gap-2 ${currentRoute === AppRoute.AI_CONCIERGE ? 'text-indigo-600 font-bold' : ''}`}
          >
            <i className="fas fa-robot text-xs"></i>
            Concierge
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-slate-900 transition-colors">
            <i className="fas fa-search"></i>
          </button>
          <button 
            onClick={() => setRoute(AppRoute.CART)}
            className="p-2 text-slate-500 hover:text-slate-900 transition-colors relative"
          >
            <i className="fas fa-shopping-bag"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-900 transition-colors md:hidden">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
