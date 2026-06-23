import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useActivityQuery } from '../hooks/useActivityQuery';
import {
  Home,
  Search,
  Clapperboard,
  Tv,
  LayoutDashboard,
  Bell,
  User,
  Settings,
  LogOut,
  Camera,
  Menu
} from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { user, profile, logout } = useAuth();
  const location = useLocation();
  const { useGetNotifications } = useActivityQuery();
  const { data: notifications } = useGetNotifications();

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { label: 'Feed', path: '/posts', icon: Home },
    { label: 'Search Users', path: '/users', icon: Search },
    { label: 'Reels', path: '/reels', icon: Clapperboard },
    { label: 'Stories', path: '/stories', icon: Tv },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    {
      label: 'Notifications',
      path: '/notifications',
      icon: Bell,
      badge: unreadCount
    },
    { label: 'Profile', path: `/profiles/${profile?.id || 'current'}`, icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-zinc-100 flex flex-col md:flex-row transition-colors duration-300">
      
      {/* MOBILE TOP HEADER */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="flex items-center space-x-2">
          <div className="instagram-gradient p-1.5 rounded-lg text-white">
            <Camera size={18} />
          </div>
          <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Instagram
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/notifications" className="relative p-1">
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] font-bold flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </Link>
          <button onClick={logout} className="p-1 text-gray-500 dark:text-zinc-400 hover:text-red-500">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-[240px] xl:w-[280px] h-screen bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 p-6 sticky top-0 z-40 transition-colors duration-300">
        {/* Brand Header */}
        <div className="flex items-center space-x-2 mb-10">
          <div className="instagram-gradient p-2 rounded-xl text-white">
            <Camera size={22} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Instagram
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-4 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                  active
                    ? 'bg-gray-100 dark:bg-zinc-900 text-black dark:text-white font-bold scale-[1.02]'
                    : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900/50 hover:text-black dark:hover:text-white'
                }`}
              >
                <div className="relative">
                  <Icon size={22} className={active ? 'text-ig-blue' : ''} />
                  {item.badge && item.badge > 0 ? (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 text-[9px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Active Profile & Logout */}
        <div className="pt-6 border-t border-gray-100 dark:border-zinc-900 space-y-4">
          {profile && (
            <Link
              to={`/profiles/${profile.id}`}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900"
            >
              <img
                src={profile.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                alt={profile.full_name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-zinc-800"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">{profile.full_name}</p>
                <p className="text-xs text-gray-400 dark:text-zinc-500 truncate">@{profile.username}</p>
              </div>
            </Link>
          )}

          <button
            onClick={logout}
            className="w-full flex items-center space-x-4 px-4 py-3 rounded-lg text-sm font-semibold text-gray-500 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
          >
            <LogOut size={22} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-16 md:pb-0">
        <div className="w-full max-w-6xl mx-auto px-4 py-6 md:p-8 flex-1">
          <Outlet />
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 flex justify-around items-center z-50 transition-colors duration-300">
        {navItems.filter(item => item.label !== 'Dashboard' && item.label !== 'Settings').map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link key={item.path} to={item.path} className="relative p-2 text-gray-600 dark:text-zinc-400">
              <Icon size={22} className={active ? 'text-ig-blue scale-110 font-bold' : ''} />
              {item.badge && item.badge > 0 ? (
                <span className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full w-3.5 h-3.5 text-[8px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
        {/* Additional mobile icons */}
        <Link to="/settings" className="p-2 text-gray-600 dark:text-zinc-400">
          <Settings size={22} className={isActive('/settings') ? 'text-ig-blue scale-110' : ''} />
        </Link>
      </nav>
    </div>
  );
};
