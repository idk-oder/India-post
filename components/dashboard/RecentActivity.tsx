
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ActivityLog } from '../../types';

interface RecentActivityProps {
  activities: ActivityLog[];
  t: (key: string) => string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities, t }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-5 transition-all">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">
          {t('sectionActivity')}
        </h2>
        <button className="text-xs font-bold text-red-600 hover:underline px-2 py-1 bg-red-50 dark:bg-red-900/10 rounded-lg">
          {t('viewAll')}
        </button>
      </div>

      <div className="space-y-6">
        {activities.map((activity, idx) => (
          <div key={activity.id} className="relative flex gap-5 group">
            {idx !== activities.length - 1 && (
              <div className="absolute top-7 left-[9px] w-px h-[calc(100%+12px)] bg-slate-100 dark:bg-slate-800"></div>
            )}
            
            <div className={`w-5 h-5 rounded-full border-4 shrink-0 z-10 transition-transform group-hover:scale-110 ${
              idx === 0 ? 'bg-red-500 border-red-100 dark:border-red-900/20' : 'bg-slate-200 dark:bg-slate-700 border-slate-50 dark:border-slate-800'
            }`}></div>

            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between gap-4">
                <h3 className={`text-sm font-bold tracking-tight ${idx === 0 ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                  {activity.status}
                </h3>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap">
                  {activity.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-0.5 tracking-tight">
                {activity.location}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 leading-relaxed italic border-l-2 border-slate-100 dark:border-slate-800 pl-4 transition-colors">
                {activity.details}
              </p>
            </div>
            
            <div className="flex items-center">
              <ChevronRight size={16} className="text-slate-300 dark:text-slate-700 group-hover:text-red-400 transition-colors" />
            </div>
          </div>
        ))}
        {activities.length === 0 && (
          <p className="text-center text-xs text-slate-400 py-6 font-medium">No activity recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
