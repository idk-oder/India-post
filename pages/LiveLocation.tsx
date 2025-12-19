
import React from 'react';
import ParcelMap from '../components/map/ParcelMap';
import { LocateFixed, Navigation, Activity } from 'lucide-react';
import { ParcelData } from '../types';

interface LiveLocationProps {
  parcel: ParcelData;
  t: (key: string) => string;
}

const LiveLocation: React.FC<LiveLocationProps> = ({ parcel, t }) => {
  return (
    <div className="relative w-full h-[calc(100vh-140px)] min-h-[500px]">
      <ParcelMap 
        className="h-full w-full" 
        origin={parcel.origin}
        destination={parcel.destination}
        current={parcel.current}
        t={t}
      />
      
      {/* HUD overlays */}
      <div className="absolute top-4 left-4 right-4 space-y-3 pointer-events-none">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/50 dark:border-slate-800/50 flex items-center justify-between pointer-events-auto transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100 dark:shadow-blue-900/20">
              <Navigation size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">{t('liveTracking')}</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white leading-none mt-0.5">{t(`steps.${parcel.status.replace(/\s+/g, '')}`)}</p>
            </div>
          </div>
          
          <div className="h-8 w-px bg-gray-200 dark:bg-slate-700"></div>
          
          <div className="text-right">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">{t('nextStop')}</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white leading-none mt-0.5">{parcel.destination.name?.split(' ')[0]}</p>
          </div>
        </div>

        <div className="flex gap-2 pointer-events-auto">
          <div className="bg-green-500/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg border border-green-400/50">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">{t('liveSignal')}</span>
          </div>
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg border border-gray-100 dark:border-slate-800 transition-colors">
            <Activity size={12} className="text-blue-500" />
            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">{t('ping')}: 42ms</span>
          </div>
        </div>
      </div>

      <button 
        className="absolute bottom-10 right-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl text-red-600 border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 active:scale-95 transition-all z-10"
        onClick={() => window.location.reload()}
        title="Refresh Location"
      >
        <LocateFixed size={24} />
      </button>
    </div>
  );
};

export default LiveLocation;
