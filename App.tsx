
import React, { useState, useEffect, useCallback } from 'react';
import DashboardHeader from './components/dashboard/DashboardHeader';
import Home from './pages/Home';
import LiveLocation from './pages/LiveLocation';
import PredictionTime from './pages/PredictionTime';
import NotificationsPage from './pages/Notifications';
import SettingsPage from './pages/Settings';
import ProfilePage from './pages/Profile';
import DeliveryProgressPage from './pages/DeliveryProgress';
import TrackingLanding from './components/dashboard/TrackingLanding';
import { Home as HomeIcon, Map as MapIcon, Zap, ClipboardList, Loader2 } from 'lucide-react';
import { PageType, ParcelData, NotificationItem, UserProfile, Language } from './types';
import { MOCK_PARCELS } from './constants';
import { predictDelay } from './ai/delayPredictor';
import { fetchWeather } from './services/weatherService';
import { translations } from './translations';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>(PageType.HOME);
  const [activeParcel, setActiveParcel] = useState<ParcelData | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('EN');
  
  const t = useCallback((key: string) => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key; 
      }
    }
    return typeof result === 'string' ? result : key;
  }, [language]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Welcome to India Post',
      message: 'Your smart tracking dashboard is ready.',
      type: 'success',
      timestamp: 'Just now',
      read: false
    }
  ]);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Suresh Kumar',
    email: 'suresh.k@example.in',
    phone: '+91 98765 43210',
    address: '123, Post Office Colony, New Delhi, 110001',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop'
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!activeParcel) return;

    const checkParcelStatus = async () => {
      const weather = await fetchWeather(activeParcel.current.lat, activeParcel.current.lng);
      const prediction = predictDelay(weather, activeParcel.isTrafficDelayed);
      
      if (prediction.delayHours > 0) {
        const newNotif: NotificationItem = {
          id: Date.now().toString(),
          title: t('weatherBasedDelayDetected') || 'System Delay Alert',
          message: `${t('estimatedDelay')} of ${prediction.delayHours}h for ${activeParcel.trackingId} due to ${activeParcel.isTrafficDelayed ? 'Heavy Traffic' : weather.condition}.`,
          type: 'warning',
          timestamp: 'Moments ago',
          read: false
        };
        
        setNotifications(prev => {
          if (prev.find(n => n.message.includes(activeParcel.trackingId))) return prev;
          return [newNotif, ...prev];
        });
      }
    };
    checkParcelStatus();
  }, [activeParcel, t]);

  const handleSearch = (id: string) => {
    if (!id) {
      setSearchError(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    setTimeout(() => {
      const found = MOCK_PARCELS[id];
      if (found) {
        setActiveParcel(found);
        setSearchError(null);
        setCurrentPage(PageType.HOME);
      } else {
        setSearchError(t('invalidId'));
      }
      setIsSearching(false);
    }, 600);
  };

  const renderPage = () => {
    const isTrackingPage = [PageType.HOME, PageType.LIVE, PageType.PREDICTION, PageType.PROGRESS].includes(currentPage);
    if (!activeParcel && isTrackingPage) {
      return <TrackingLanding t={t} onSearch={handleSearch} />;
    }

    switch (currentPage) {
      case PageType.HOME:
        return <Home parcel={activeParcel!} t={t} />;
      case PageType.LIVE:
        return <LiveLocation parcel={activeParcel!} t={t} />;
      case PageType.PREDICTION:
        return <PredictionTime parcel={activeParcel!} t={t} />;
      case PageType.PROGRESS:
        return <DeliveryProgressPage parcel={activeParcel!} t={t} />;
      case PageType.NOTIFICATIONS:
        return (
          <NotificationsPage 
            notifications={notifications} 
            onMarkRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))}
            t={t}
          />
        );
      case PageType.SETTINGS:
        return (
          <SettingsPage 
            isDarkMode={isDarkMode} 
            onToggleTheme={() => setIsDarkMode(!isDarkMode)} 
            language={language} 
            onLanguageChange={setLanguage}
            t={t}
          />
        );
      case PageType.PROFILE:
        return (
          <ProfilePage 
            profile={userProfile} 
            onUpdateProfile={setUserProfile}
            t={t}
          />
        );
      default:
        return <Home parcel={activeParcel!} t={t} />;
    }
  };

  const navItems = [
    { type: PageType.HOME, icon: HomeIcon, label: t('navHome') },
    { type: PageType.LIVE, icon: MapIcon, label: t('navLive') },
    { type: PageType.PREDICTION, icon: Zap, label: t('navPrediction') },
    { type: PageType.PROGRESS, icon: ClipboardList, label: t('navProgress') },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-20 sm:pb-0 font-sans selection:bg-red-100 selection:text-red-900 transition-colors duration-500 bg-white dark:bg-slate-950">
      <DashboardHeader 
        currentTrackingId={activeParcel?.trackingId || ''} 
        onSearch={handleSearch} 
        error={searchError}
        unreadNotifications={notifications.filter(n => !n.read).length}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
        t={t}
      />
      
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 overflow-y-auto relative transition-colors duration-500">
        {isSearching && (
          <div className="absolute inset-0 bg-white/60 dark:bg-black/80 backdrop-blur-[2px] z-[100] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="text-red-600 animate-spin" size={32} />
              <p className="text-sm font-bold text-gray-600 dark:text-gray-300 animate-pulse">Retrieving Parcel Data...</p>
            </div>
          </div>
        )}
        {renderPage()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 dark:border-slate-800 border-t border-gray-100 px-8 py-3 flex justify-between items-center z-[10001] shadow-[0_-8px_20px_rgba(0,0,0,0.05)] sm:max-w-2xl sm:mx-auto sm:bottom-6 sm:rounded-full sm:border sm:px-12 transition-all duration-300">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.type;
          
          return (
            <button
              key={item.type}
              onClick={() => setCurrentPage(item.type)}
              className={`flex flex-col items-center gap-1.5 transition-all duration-300 min-w-[70px] ${
                isActive ? 'text-red-600 scale-105' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <div className={`p-2.5 rounded-2xl transition-colors duration-200 ${isActive ? 'bg-red-50 dark:bg-red-900/20' : 'bg-transparent'}`}>
                <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold whitespace-nowrap tracking-tight transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0 h-0 pointer-events-none'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default App;
