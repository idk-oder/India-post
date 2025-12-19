
import React, { useState, useEffect } from 'react';
import { Bell, Settings, User, Search, AlertCircle } from 'lucide-react';
import { INDIA_POST_RED } from '../../constants';
import { PageType } from '../../types';

interface DashboardHeaderProps {
  currentTrackingId: string;
  onSearch: (id: string) => void;
  onNavigate: (page: PageType) => void;
  currentPage: PageType;
  error?: string | null;
  unreadNotifications: number;
  t: (key: string) => string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  currentTrackingId, 
  onSearch, 
  onNavigate, 
  currentPage,
  error, 
  unreadNotifications,
  t
}) => {
  const [inputValue, setInputValue] = useState(currentTrackingId);

  // Keep input in sync when tracking ID changes elsewhere
  useEffect(() => {
    setInputValue(currentTrackingId);
  }, [currentTrackingId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(inputValue.trim().toUpperCase());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    setInputValue(val);
  };

  return (
    <header className="bg-white dark:bg-slate-900 sticky top-0 z-[10000] border-b border-gray-100 dark:border-slate-800 shadow-sm px-4 py-3 flex items-center justify-between gap-4 transition-colors">
      {/* Logo Section - Authentically styled India Post Branding */}
      <div className="flex items-center gap-4 shrink-0 cursor-pointer group" onClick={() => onNavigate(PageType.HOME)}>
        <div className="relative">
          <div 
            className="w-12 h-10 rounded shadow-sm flex items-center justify-center transition-transform group-active:scale-95 bg-white border border-slate-100"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/India_Post_Logo.svg/1200px-India_Post_Logo.svg.png" 
              alt="India Post Logo" 
              className="h-8 w-auto object-contain"
            />
          </div>
        </div>
        <div className="hidden md:block">
          <h1 className="text-xl font-black leading-none text-slate-900 dark:text-white transition-colors tracking-tighter">
            {t('appTitle')}
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-black mt-0.5">
            {t('appSubtitle')}
          </p>
        </div>
      </div>

      {/* Search Input Container */}
      <div className="flex-1 max-w-sm relative">
        <div className={`flex items-center gap-2 bg-gray-50 dark:bg-slate-800 px-3 py-1.5 rounded-full border transition-all ${error ? 'border-red-300 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-slate-700 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100 dark:focus-within:ring-red-900/30'}`}>
          <Search size={16} className={error ? 'text-red-400' : 'text-gray-400'} />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={t('searchPlaceholder')}
            className="bg-transparent border-none outline-none text-sm font-mono font-bold text-gray-700 dark:text-gray-200 w-full placeholder:text-gray-300 dark:placeholder:text-gray-600 placeholder:font-sans"
          />
          <div className="relative flex h-2 w-2 shrink-0">
            {inputValue ? (
              <>
                <span className="animate-pulse-green absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-300 dark:bg-slate-600"></span>
            )}
          </div>
        </div>
        {error && (
          <div className="absolute top-full mt-1 left-2 flex items-center gap-1 text-red-500 text-[10px] font-bold bg-white dark:bg-slate-900 px-2 py-0.5 rounded shadow-sm border border-red-50">
            <AlertCircle size={10} /> {error}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 sm:gap-4 shrink-0">
        <button 
          onClick={() => onNavigate(PageType.NOTIFICATIONS)}
          className={`relative p-2 rounded-full transition-colors ${currentPage === PageType.NOTIFICATIONS ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
        >
          <Bell size={20} />
          {unreadNotifications > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[14px] h-[14px] flex items-center justify-center bg-red-500 text-[8px] font-bold text-white rounded-full border border-white dark:border-slate-900 px-0.5">
              {unreadNotifications > 9 ? '9+' : unreadNotifications}
            </span>
          )}
        </button>
        <button 
          onClick={() => onNavigate(PageType.SETTINGS)}
          className={`hidden sm:block p-2 rounded-full transition-colors ${currentPage === PageType.SETTINGS ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
        >
          <Settings size={20} />
        </button>
        <button 
          onClick={() => onNavigate(PageType.PROFILE)}
          className={`p-2 rounded-full transition-colors ${currentPage === PageType.PROFILE ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
        >
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
