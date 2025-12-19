
import React from 'react';
import DeliveryPrediction from '../components/dashboard/DeliveryPrediction';
import { Info, Sparkles } from 'lucide-react';
import { LatLng, ParcelData } from '../types';

interface PredictionTimeProps {
  parcel: ParcelData;
  t: (key: string) => string;
}

const PredictionTime: React.FC<PredictionTimeProps> = ({ parcel, t }) => {
  return (
    <div className="p-4 space-y-6 max-w-5xl mx-auto">
      <div className="bg-red-600 dark:bg-red-700 p-8 rounded-3xl text-white shadow-xl shadow-red-100 dark:shadow-none transition-all overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={20} className="text-red-200" />
            <h1 className="text-2xl font-bold tracking-tight">{t('logisticsInsight')}</h1>
          </div>
          <p className="text-red-100 text-sm opacity-90 leading-relaxed max-w-2xl font-medium">
            {t('insightDesc')}
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles size={120} />
        </div>
      </div>

      <DeliveryPrediction 
        currentCoords={parcel.current} 
        baseEta={parcel.expectedDelivery} 
        isDetailed={true}
        isTrafficDelayed={parcel.isTrafficDelayed}
        t={t} 
      />

      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-all">
        <div className="flex items-center gap-3 text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-800 pb-4">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
            <Info size={20} className="text-blue-500" />
          </div>
          <h3 className="text-lg font-bold tracking-tight">{t('howItWorks')}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm leading-relaxed">
          <div className="space-y-2">
            <p className="font-bold text-slate-800 dark:text-slate-200">1. Data Ingestion</p>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              We monitor both atmospheric conditions and regional traffic density at the parcel's last known geo-coordinates 
              <span className="font-mono text-blue-500 bg-blue-50 dark:bg-blue-900/10 px-1 rounded mx-1">
                ({parcel.current.lat.toFixed(2)}, {parcel.current.lng.toFixed(2)})
              </span>.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-slate-800 dark:text-slate-200">2. Bottleneck Analysis</p>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Conditions like <em className="text-red-500 not-italic font-bold">Severe Congestion</em> or thunderstorms trigger high-priority alerts to adjust sorting schedules.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-slate-800 dark:text-slate-200">3. Prediction Confidence</p>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Predictions are weighted based on the severity and consistency of the real-time sensor network data.
            </p>
          </div>
        </div>
      </div>
      
      <div className="h-20" />
    </div>
  );
};

export default PredictionTime;
