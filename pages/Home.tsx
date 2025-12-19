
import React from 'react';
import ParcelMap from '../components/map/ParcelMap';
import DeliveryProgress from '../components/dashboard/DeliveryProgress';
import DeliveryPrediction from '../components/dashboard/DeliveryPrediction';
import RecentActivity from '../components/dashboard/RecentActivity';
import { ParcelData } from '../types';

interface HomeProps {
  parcel: ParcelData;
  t: (key: string) => string;
}

const Home: React.FC<HomeProps> = ({ parcel, t }) => {
  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto">
      {/* 1. Delivery Progress */}
      <DeliveryProgress parcel={parcel} t={t} />

      {/* 2. Side-by-Side: Prediction (Summary) + Location */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Delivery Prediction Summary */}
        <div className="h-full">
          <DeliveryPrediction 
            currentCoords={parcel.current} 
            baseEta={parcel.expectedDelivery} 
            isDetailed={false}
            isTrafficDelayed={parcel.isTrafficDelayed}
            t={t} 
          />
        </div>

        {/* Current Location (Map) */}
        <section className="space-y-4 h-full flex flex-col">
          <div className="flex items-center h-[28px]">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">
              {t('sectionLocation')}
            </h2>
          </div>
          <div className="flex-1 min-h-[350px] lg:min-h-0 w-full shadow-lg border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 transition-colors">
            <ParcelMap 
              origin={parcel.origin} 
              destination={parcel.destination} 
              current={parcel.current} 
              className="h-full w-full"
              t={t}
            />
          </div>
        </section>
      </div>

      {/* 3. Recent Activity */}
      <div className="w-full">
        <RecentActivity activities={parcel.activities} t={t} />
      </div>
      
      <div className="h-20" />
    </div>
  );
};

export default Home;
