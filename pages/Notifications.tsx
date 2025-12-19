
import React from 'react';
import { NotificationItem } from '../types';
import { Bell, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface NotificationsPageProps {
  notifications: NotificationItem[];
  onMarkRead: (id: string) => void;
  t: (key: string) => string;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ notifications, onMarkRead, t }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="text-orange-500" size={20} />;
      case 'success': return <CheckCircle2 className="text-green-500" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl">
            <Bell size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">{t('notifications')}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">{t('notifSubtitle')}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 transition-colors">
            <Bell size={40} className="mx-auto text-gray-300 dark:text-gray-700 mb-3" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">{t('noNotifs')}</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id}
              onClick={() => onMarkRead(notif.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                notif.read 
                  ? 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800' 
                  : 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20 shadow-md shadow-red-100 dark:shadow-none'
              }`}
            >
              <div className="shrink-0 mt-1">{getIcon(notif.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-sm font-bold ${notif.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{notif.timestamp}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  {notif.message}
                </p>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2"></div>
              )}
            </div>
          ))
        )}
      </div>
      
      <div className="h-20" />
    </div>
  );
};

export default NotificationsPage;
