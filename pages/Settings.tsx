
import React from 'react';
import { Moon, Sun, Languages } from 'lucide-react';
import { Language } from '../types';

interface SettingsPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  t: (key: string) => string;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ 
  isDarkMode, 
  onToggleTheme, 
  language, 
  onLanguageChange,
  t
}) => {
  return (
    <div className="p-4 space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white transition-colors tracking-tight">{t('settings')}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors font-medium mt-1">{t('settingsSubtitle')}</p>
      </div>

      <div className="space-y-6">
        {/* Appearance Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-all">
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-b border-gray-100 dark:border-slate-800 flex items-center gap-3">
            <Sun size={18} className="text-orange-500" />
            <h2 className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('appearance')}</h2>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 shadow-sm">
                {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
              </div>
              <div>
                <p className="text-base font-bold text-slate-900 dark:text-white tracking-tight">{t('darkMode')}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('reduceStrain')}</p>
              </div>
            </div>
            <button 
              onClick={onToggleTheme}
              className={`w-14 h-7 rounded-full p-1 transition-colors duration-500 shadow-inner ${isDarkMode ? 'bg-red-600' : 'bg-slate-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-500 ${isDarkMode ? 'translate-x-7' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </section>

        {/* Language Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-all">
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-b border-gray-100 dark:border-slate-800 flex items-center gap-3">
            <Languages size={18} className="text-blue-500" />
            <h2 className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t('language')}</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {(['EN', 'HI', 'TE'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`py-4 rounded-2xl border-2 font-black text-sm transition-all shadow-sm ${
                    language === lang 
                      ? 'border-red-600 bg-red-50 dark:bg-red-900/20 text-red-600 scale-[1.02]' 
                      : 'border-slate-50 dark:border-slate-800 text-slate-400 dark:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600'
                  }`}
                >
                  {lang === 'EN' ? 'English' : lang === 'HI' ? 'हिंदी' : 'తెలుగు'}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="h-20" />
    </div>
  );
};

export default SettingsPage;
