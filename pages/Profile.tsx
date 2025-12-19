
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Camera, Mail, Phone, MapPin, User, Save, Check } from 'lucide-react';

interface ProfilePageProps {
  profile: UserProfile;
  onUpdateProfile: (p: UserProfile) => void;
  t: (key: string) => string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, onUpdateProfile, t }) => {
  const [formData, setFormData] = useState(profile);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAvatarChange = () => {
    const randomImg = `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=400&h=400&fit=crop`;
    setFormData({ ...formData, avatar: randomImg });
  };

  return (
    <div className="p-4 space-y-8 max-w-3xl mx-auto">
      <div className="flex flex-col items-center gap-6 py-6">
        <div className="relative">
          <div className="w-28 h-28 rounded-full border-4 border-red-500 p-1.5 shadow-2xl overflow-hidden bg-white dark:bg-slate-800 transition-all">
            <img src={formData.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
          </div>
          <button 
            onClick={handleAvatarChange}
            className="absolute bottom-1 right-1 p-2.5 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all scale-95"
          >
            <Camera size={18} />
          </button>
        </div>
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white transition-colors tracking-tight">{formData.name}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">{t('profileSubtitle')}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-all">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t('fullName')}</label>
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 px-5 py-4 rounded-2xl border border-slate-50 dark:border-slate-700 focus-within:ring-2 focus-within:ring-red-100 dark:focus-within:ring-red-900/20 transition-all">
              <User size={20} className="text-slate-400" />
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-transparent border-none outline-none text-base font-bold text-slate-800 dark:text-slate-200 w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t('email')}</label>
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 px-5 py-4 rounded-2xl border border-slate-50 dark:border-slate-700 focus-within:ring-2 focus-within:ring-red-100 dark:focus-within:ring-red-900/20 transition-all">
              <Mail size={20} className="text-slate-400" />
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-transparent border-none outline-none text-base font-bold text-slate-800 dark:text-slate-200 w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t('phone')}</label>
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 px-5 py-4 rounded-2xl border border-slate-50 dark:border-slate-700 focus-within:ring-2 focus-within:ring-red-100 dark:focus-within:ring-red-900/20 transition-all">
              <Phone size={20} className="text-slate-400" />
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-transparent border-none outline-none text-base font-bold text-slate-800 dark:text-slate-200 w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t('address')}</label>
            <div className="flex items-start gap-4 bg-slate-50 dark:bg-slate-800 px-5 py-4 rounded-2xl border border-slate-50 dark:border-slate-700 focus-within:ring-2 focus-within:ring-red-100 dark:focus-within:ring-red-900/20 transition-all">
              <MapPin size={20} className="text-slate-400 mt-1" />
              <textarea 
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-transparent border-none outline-none text-base font-bold text-slate-800 dark:text-slate-200 w-full resize-none leading-relaxed"
              />
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={saved}
            className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-lg transition-all shadow-xl ${
              saved ? 'bg-green-600 text-white shadow-green-100' : 'bg-red-600 text-white shadow-red-100 hover:bg-red-700 active:scale-95'
            }`}
          >
            {saved ? <Check size={24} strokeWidth={3} /> : <Save size={24} />}
            {saved ? t('changesSaved') : t('saveProfile')}
          </button>
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
};

export default ProfilePage;
