
import React, { useState } from 'react';
import { Search, Package, MapPin, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { INDIA_POST_RED } from '../../constants';

interface TrackingLandingProps {
  t: (key: string) => string;
  onSearch: (id: string) => void;
}

const TrackingLanding: React.FC<TrackingLandingProps> = ({ t, onSearch }) => {
  const [localInput, setLocalInput] = useState('');

  const sampleIds = [
    'IP123456789IN',
    'IP987654321IN',
    'IP456789123IN',
    'IP321654987IN'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localInput.trim()) {
      onSearch(localInput.trim().toUpperCase());
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[80vh]">
      <div 
        className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl shadow-red-100 dark:shadow-none animate-bounce-slow relative"
        style={{ backgroundColor: INDIA_POST_RED }}
      >
        <Package className="text-white w-12 h-12" />
        <div className="absolute -top-2 -right-2 bg-white dark:bg-slate-900 p-2 rounded-full shadow-lg border border-slate-100 dark:border-slate-800">
          <Sparkles className="text-yellow-500" size={16} />
        </div>
      </div>

      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {t('trackShipment')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed text-lg font-medium">
          {t('trackDesc')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xl relative group">
        <div className="absolute inset-0 bg-red-600 rounded-3xl blur opacity-10 group-focus-within:opacity-20 transition-opacity"></div>
        <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2 rounded-3xl shadow-2xl transition-all">
          <div className="pl-6 pr-3 text-slate-400">
            <Search size={24} />
          </div>
          <input 
            type="text" 
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value.toUpperCase())}
            placeholder={t('searchPlaceholder')}
            className="flex-1 bg-transparent border-none outline-none text-xl font-bold text-slate-800 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-700 py-4"
          />
          <button 
            type="submit"
            style={{ backgroundColor: INDIA_POST_RED }}
            className="px-8 py-4 rounded-2xl text-white font-black flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-red-100 dark:shadow-none"
          >
            {t('navHome')} <ArrowRight size={20} />
          </button>
        </div>
      </form>

      <div className="mt-10 flex flex-col items-center space-y-4">
        <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{t('sampleId')}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {sampleIds.map(id => (
            <button 
              key={id}
              onClick={() => onSearch(id)}
              className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 px-5 py-2.5 rounded-2xl border border-red-100 dark:border-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all hover:-translate-y-1 shadow-sm"
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 w-full">
        <div className="flex flex-col items-center text-center space-y-4 group">
          <div className="p-5 bg-blue-50 dark:bg-blue-900/10 rounded-3xl text-blue-600 group-hover:scale-110 transition-transform shadow-sm">
            <MapPin size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t('navLive')}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Real-time GPS tracking using India Post's satellite logistics network.</p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center space-y-4 group">
          <div className="p-5 bg-purple-50 dark:bg-purple-900/10 rounded-3xl text-purple-600 group-hover:scale-110 transition-transform shadow-sm">
            <Zap size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t('navPrediction')}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">AI analyzes local weather at transit hubs to predict potential delays.</p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center space-y-4 group">
          <div className="p-5 bg-green-50 dark:bg-green-900/10 rounded-3xl text-green-600 group-hover:scale-110 transition-transform shadow-sm">
            <Package size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t('sectionProgress')}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Detailed delivery status updates from collection to final destination.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingLanding;
