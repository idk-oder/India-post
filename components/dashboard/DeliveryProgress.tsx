
import React, { useEffect, useState } from 'react';
import { Package, Truck, Home, MapPin, CheckCircle } from 'lucide-react';
import { ParcelData } from '../../types';
import { fetchWeather } from '../../services/weatherService';
import { predictDelay } from '../../ai/delayPredictor';

interface DeliveryProgressProps {
  parcel: ParcelData;
  t: (key: string) => string;
}

const DeliveryProgress: React.FC<DeliveryProgressProps> = ({ parcel, t }) => {
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
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-all">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">
          {t('sectionProgress')}
        </h2>
        <div className="text-right">
          <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {delayHours > 0 ? t('finalExpected') : t('expected')}
          </p>
          <p className={`text-sm font-bold ${delayHours > 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-slate-300'}`}>
            {formattedDate}
          </p>
        </div>
      </div>

      <div className="relative flex justify-between items-start pt-2 px-2">
        <div className="absolute top-7 left-10 right-10 h-0.5 bg-gray-100 dark:bg-slate-800 -z-0">
          <div 
            className="h-full bg-red-600 transition-all duration-1000" 
            style={{ width: `${(currentStepIndex / (stepsConfig.length - 1)) * 100}%` }}
          ></div>
        </div>

        {stepsConfig.map((step, idx) => {
          const Icon = step.icon;
          const isComplete = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div key={idx} className="flex flex-col items-center gap-2 relative z-10 text-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isComplete ? 'bg-red-600 text-white shadow-lg shadow-red-100 dark:shadow-none' : 
                  isCurrent ? 'bg-white dark:bg-slate-900 border-2 border-red-600 text-red-600 shadow-xl shadow-red-50 dark:shadow-none' : 
                  'bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 text-gray-300'
                }`}
              >
                <Icon size={18} />
              </div>
              <p className={`text-[10px] font-bold max-w-[64px] ${isComplete || isCurrent ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-600'}`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-slate-50 dark:border-slate-800 grid grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-green-50 dark:bg-green-900/10 flex items-center justify-center text-green-600 shrink-0">
            <MapPin size={16} />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">{t('origin')}</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{parcel.origin.name}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-900/10 flex items-center justify-center text-red-600 shrink-0">
            <MapPin size={16} />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">{t('destination')}</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{parcel.destination.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryProgress;
