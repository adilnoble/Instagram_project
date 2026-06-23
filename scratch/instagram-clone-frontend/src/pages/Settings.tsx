import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useProfilesQuery } from '../hooks/useProfilesQuery';
import { User, Sun, Moon, Lock, ShieldCheck, Check } from 'lucide-react';

export const Settings: React.FC = () => {
  const { profile, refreshProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { useUpdateProfile } = useProfilesQuery();
  const updateMutation = useUpdateProfile();

  const [activeTab, setActiveTab] = useState<'profile' | 'theme' | 'account'>('profile');

  // Profile Form state
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [website, setWebsite] = useState(profile?.website || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [successMsg, setSuccessMsg] = useState('');

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) {
      updateMutation.mutate({
        id: profile.id,
        data: {
          full_name: fullName,
          bio,
          website,
          avatar_url: avatarUrl
        }
      }, {
        onSuccess: () => {
          setSuccessMsg('Profile updated successfully!');
          refreshProfile();
          setTimeout(() => setSuccessMsg(''), 3000);
        }
      });
    }
  };

  const tabs = [
    { id: 'profile' as const, label: 'Edit Profile', icon: User },
    { id: 'theme' as const, label: 'Theme Settings', icon: Moon },
    { id: 'account' as const, label: 'Account Safety', icon: Lock }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold font-display tracking-tight text-gray-900 dark:text-white m-0">
          Preferences
        </h1>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
          Customize profile details, change display themes, and manage privacy settings.
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[420px]">
        {/* Left Tab selector */}
        <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/10 p-4 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                  active
                    ? 'bg-gray-150 dark:bg-zinc-900 text-black dark:text-white'
                    : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900/50 hover:text-black dark:hover:text-white'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Active Viewport panel */}
        <div className="flex-1 p-6 md:p-8">
          
          {/* SUCCESS MESSAGE */}
          {successMsg && (
            <div className="mb-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-xs px-3.5 py-2.5 rounded-lg flex items-center space-x-2 font-medium">
              <Check size={14} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: EDIT PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">Profile details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Full name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full text-xs bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 outline-none focus:border-ig-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Avatar URL</label>
                  <input
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="w-full text-xs bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 outline-none focus:border-ig-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Website</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full text-xs bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 outline-none focus:border-ig-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">Biography</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full text-xs bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 outline-none focus:border-ig-blue resize-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="px-5 py-2.5 bg-ig-blue hover:bg-ig-hover-blue text-white text-xs font-semibold rounded-lg shadow-sm transition"
                >
                  {updateMutation.isPending ? 'Saving details...' : 'Save Settings'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: THEME PREFERENCES */}
          {activeTab === 'theme' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">Theme preferences</h3>
              <p className="text-xs text-gray-500">
                Choose the visual style of your dashboard. Switching will update class references instantly.
              </p>

              {/* Theme toggle panel card */}
              <div className="bg-gray-50 dark:bg-zinc-900/50 p-4 border border-gray-150 dark:border-zinc-850 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {theme === 'dark' ? (
                    <Moon size={22} className="text-purple-400" />
                  ) : (
                    <Sun size={22} className="text-orange-500" />
                  )}
                  <div>
                    <span className="text-xs font-bold block capitalize">{theme} Mode Active</span>
                    <span className="text-[10px] text-gray-450 dark:text-zinc-500">
                      Toggle to switch between light and dark backgrounds.
                    </span>
                  </div>
                </div>
                
                {/* Switch Slider */}
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 bg-zinc-850 dark:bg-white text-white dark:text-black hover:opacity-90 rounded-lg text-[10px] font-bold shadow-sm transition active:scale-95"
                >
                  Toggle Theme
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ACCOUNT SAFETY */}
          {activeTab === 'account' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4">Account safety & Privacy</h3>
              <p className="text-xs text-gray-550 dark:text-zinc-400">
                Manage your credentials, delete data parameters, and configure active session timeouts.
              </p>

              <div className="border border-gray-200 dark:border-zinc-800 rounded-xl divide-y divide-gray-150 dark:divide-zinc-850">
                <div className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold block">Account Status Verified</span>
                    <span className="text-[10px] text-gray-400">Your profile meets standard requirements.</span>
                  </div>
                  <span className="text-green-500">
                    <ShieldCheck size={20} />
                  </span>
                </div>

                <div className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold block">Change Account Password</span>
                    <span className="text-[10px] text-gray-400">Regularly update your credentials for safety.</span>
                  </div>
                  <button className="px-3 py-1.5 border border-gray-200 dark:border-zinc-800 rounded-lg text-[10px] font-semibold hover:bg-gray-50 dark:hover:bg-zinc-900">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
