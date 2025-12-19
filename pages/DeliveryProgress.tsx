
import React, { useEffect, useState } from 'react';
import { Package, Truck, Home, CheckCircle, Clock, AlertTriangle, ChevronRight } from 'lucide-react';
import { ParcelData } from '../types';
import { fetchWeather } from '../services/weatherService';
import { predictDelay } from '../ai/delayPredictor';

interface DeliveryProgressPageProps {
  parcel: ParcelData;
  t: (key: string) => string;
}

const DeliveryProgressPage: React.FC<DeliveryProgressPageProps> = ({ parcel, t }) => {
  const [delayHours, setDelayHours] = useState(0);

  useEffect(() => {
    const checkDelay = async () => {
      const weather = await fetchWeather(parcel.current.lat, parcel.current.lng);
      const prediction = predictDelay(weather, parcel.isTrafficDelayed);
      setDelayHours(prediction.delayHours);
    };
    checkDelay();
  }, [parcel]);

  const baseDate = new Date(parcel.expectedDelivery);
  const finalDate = new Date(baseDate.getTime() + delayHours * 60 * 60 * 1000);
  const formattedDate = finalDate.toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const stepsConfig = [
    { label: t('steps.Collected'), icon: Package, key: 'Collected' },
    { label: t('steps.InTransit'), icon: Truck, key: 'In Transit' },
    { label: t('steps.OutForDelivery'), icon: Home, key: 'Out for Delivery' },
    { label: t('steps.Delivered'), icon: CheckCircle, key: 'Delivered' },
  ];

  const currentStepIndex = stepsConfig.findIndex(s => s.key === parcel.status);

  return (
    <div className="p-4 space-y-6 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-8 transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white transition-colors tracking-tight">
              {t('sectionProgress')}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Tracking: <span className="text-red-600 font-bold">{parcel.trackingId}</span></p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col items-end">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('finalExpected')}</span>
            <span className={`text-xl font-black ${delayHours > 0 ? 'text-red-600' : 'text-green-600'}`}>{formattedDate}</span>
          </div>
        </div>

        {/* Prediction Aware Journey Log */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center">
                <Clock size={18} />
             </div>
             <h2 className="text-lg font-bold text-slate-900 dark:text-white">End-to-End Journey Log</h2>
          </div>

          <div className="relative space-y-12 pl-12">
            <div className="absolute top-2 left-[23px] w-0.5 h-[calc(100%-24px)] bg-slate-100 dark:bg-slate-800"></div>

            {/* If there's a delay, insert a prediction event in the timeline */}
            {delayHours > 0 && parcel.status === 'In Transit' && (
               <div className="relative group">
                  <div className="absolute -left-12 top-0 w-12 flex justify-center">
                    <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-md">
                      <AlertTriangle size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-orange-600 uppercase tracking-tight">AI Delay Adjustment</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Transit Hub Analytics</p>
                    <div className="mt-2 bg-orange-50 dark:bg-orange-900/10 p-4 rounded-2xl border border-orange-100 dark:border-orange-900/20">
                       <p className="text-xs text-orange-700 dark:text-orange-300 leading-relaxed font-medium">
                          Our smart-route engine detected {parcel.isTrafficDelayed ? 'severe traffic' : 'adverse weather'} in the upcoming path. ETA has been automatically adjusted by +{delayHours} hours to reflect realistic transit times.
                       </p>
                    </div>
                  </div>
               </div>
            )}

            {parcel.activities.map((activity, idx) => (
              <div key={activity.id} className="relative group">
                <div className="absolute -left-12 top-0 w-12 flex justify-center">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-md transition-all ${
                    idx === 0 ? 'bg-red-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {idx === 0 ? <CheckCircle size={20} /> : <div className="w-2 h-2 rounded-full bg-slate-400" />}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className={`text-base font-black tracking-tight ${idx === 0 ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                      {activity.status}
                    </h3>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-bold bg-slate-50 dark:bg-slate-800/50 px-3 py-1 rounded-full">
                      {activity.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mt-1">
                    {activity.location}
                  </p>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-2 leading-relaxed font-medium border-l-2 border-slate-50 dark:border-slate-800 pl-4">
                    {activity.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="h-20" />
    </div>
  );
};

export default DeliveryProgressPage;
