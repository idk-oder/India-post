
import React, { useEffect, useState } from 'react';
import { AlertCircle, Zap, CheckCircle2, ThermometerSun, Plus, Calendar, Clock, ArrowRight } from 'lucide-react';
import { fetchWeather } from '../../services/weatherService';
import { predictDelay } from '../../ai/delayPredictor';
import { WeatherData, PredictionResult, LatLng } from '../../types';

interface DeliveryPredictionProps {
  currentCoords: LatLng;
  baseEta: string;
  isDetailed?: boolean;
  isTrafficDelayed?: boolean;
  t: (key: string) => string;
}

const DeliveryPrediction: React.FC<DeliveryPredictionProps> = ({ 
  currentCoords, 
  baseEta, 
  isDetailed = false, 
  isTrafficDelayed = false,
  t 
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const w = await fetchWeather(currentCoords.lat, currentCoords.lng);
      setWeather(w);
      setPrediction(predictDelay(w, isTrafficDelayed));
      setLoading(false);
    };
    getData();
  }, [currentCoords, isTrafficDelayed]);

  if (loading) return <div className="animate-pulse h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>;
  if (!prediction || !weather) return null;

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (prediction.confidence / 100) * circumference;

  let gaugeColor = 'stroke-green-500';
  let textColor = 'text-green-600';
  let statusLabel = t('onTime');

  if (prediction.delayHours > 12) {
    gaugeColor = 'stroke-red-500';
    textColor = 'text-red-600';
    statusLabel = t('delayed');
  } else if (prediction.delayHours > 0) {
    gaugeColor = 'stroke-yellow-500';
    textColor = 'text-yellow-600';
    statusLabel = t('minorDelay');
  }

  const baseDate = new Date(baseEta);
  const finalDate = new Date(baseDate.getTime() + prediction.delayHours * 60 * 60 * 1000);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const translatedReason = isTrafficDelayed ? t('trafficDelay') : (t(`weatherReasons.${weather.condition}`) || t('optimalConditions'));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">
          {t('sectionPrediction')}
        </h2>
        <span className="bg-red-50 dark:bg-red-900/10 text-red-600 text-[10px] font-black px-2 py-1 rounded-md uppercase flex items-center gap-1 border border-red-100 dark:border-red-900/20 tracking-tighter">
          <Zap size={10} fill="currentColor" /> {t('aiPrediction')}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center justify-between transition-all">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${isTrafficDelayed ? 'bg-orange-50 dark:bg-orange-900/10 text-orange-600' : 'bg-blue-50 dark:bg-blue-900/10 text-blue-600'}`}>
              <ThermometerSun size={24} />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">{isTrafficDelayed ? 'Logistics Impact' : t('localWeather')}</p>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">
                {isTrafficDelayed ? 'Traffic Alert' : `${weather?.temp}°C · ${weather?.condition}`}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{isTrafficDelayed ? t('trafficDesc') : weather?.description}</p>
            </div>
          </div>
          <img src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`} alt="weather icon" className={`w-14 h-14 ${isTrafficDelayed ? 'grayscale' : ''}`} />
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center justify-between overflow-hidden transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/10 rounded-2xl text-purple-600 self-start mt-1">
              <Zap size={24} />
            </div>
            <div className="flex-1">
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">{t('confidence')}</p>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {prediction.delayHours === 0 ? t('onTimeDelivery') : `+${prediction.delayHours}h ${t('estimatedDelay')}`}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed max-w-[180px]">
                {translatedReason}
              </p>
            </div>
          </div>

          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-50 dark:text-slate-800" />
              <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={circumference} style={{ strokeDashoffset, transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} strokeLinecap="round" className={`${gaugeColor} drop-shadow-sm`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-1 text-center">
              <span className="text-lg font-black text-slate-900 dark:text-white leading-none">{prediction.confidence}%</span>
              <span className={`text-[8px] font-black uppercase tracking-tighter mt-1 px-1.5 py-0.5 rounded-full ${textColor} bg-opacity-10`}>{statusLabel}</span>
            </div>
          </div>
        </div>

        {isDetailed && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4 transition-all">
            <h3 className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">{t('etaCalc')}</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
              <div className="flex flex-col items-center gap-1 min-w-[120px]">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 shadow-sm border border-slate-100 dark:border-slate-700">
                  <Calendar size={20} />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-wider">{t('expected')}</p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{formatDate(baseDate)}</p>
              </div>
              <Plus size={16} className="text-slate-300 dark:text-slate-700 hidden sm:block" />
              <div className={`flex flex-col items-center gap-1 min-w-[120px] transition-transform duration-500 ${prediction.delayHours > 0 ? 'scale-110' : ''}`}>
                <div className={`p-4 rounded-2xl shadow-sm border ${prediction.delayHours > 0 ? 'bg-orange-50 dark:bg-orange-900/10 text-orange-600 border-orange-100 dark:border-orange-900/20' : 'bg-green-50 dark:bg-green-900/10 text-green-600 border-green-100 dark:border-green-900/20'}`}>
                  <Clock size={20} />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-wider">{t('plusDelay')}</p>
                <p className={`text-xs font-black ${prediction.delayHours > 0 ? 'text-orange-600' : 'text-green-600'}`}>{prediction.delayHours > 0 ? `+${prediction.delayHours} hrs` : '0 hrs'}</p>
              </div>
              <ArrowRight size={16} className="text-slate-300 dark:text-slate-700 rotate-90 sm:rotate-0" />
              <div className={`flex flex-col items-center gap-1 min-w-[120px] transition-transform duration-500 ${prediction.delayHours > 0 ? 'scale-125' : ''}`}>
                <div className={`p-5 rounded-3xl shadow-xl transition-all ${prediction.delayHours > 0 ? 'bg-red-600 text-white shadow-red-100 dark:shadow-none' : 'bg-green-600 text-white shadow-green-100 dark:shadow-none'}`}>
                  <CheckCircle2 size={24} />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-3 tracking-wider">{t('equalsFinal')}</p>
                <p className={`text-sm font-black transition-colors ${prediction.delayHours > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{formatDate(finalDate)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {prediction.delayHours > 0 ? (
        <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/20 p-5 rounded-2xl flex items-start gap-4">
          <AlertCircle className="text-orange-600 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-bold text-orange-800 dark:text-orange-400">{isTrafficDelayed ? 'Logistics Route Disruption' : t('transitAdvisory')}</p>
            <p className="text-xs text-orange-700 dark:text-orange-300 leading-relaxed font-medium">
              {prediction.reason} Logistics teams are adapting to current conditions.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/20 p-5 rounded-2xl flex items-start gap-4">
          <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-bold text-green-800 dark:text-green-400">{t('clearPath')}</p>
            <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed font-medium">{t('optimalConditions')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryPrediction;
