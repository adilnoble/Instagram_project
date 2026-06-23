import React from 'react';
import { useActivityQuery } from '../hooks/useActivityQuery';
import { Users, Image, Clapperboard, Activity, ArrowUpRight, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { useGetDashboardStats } = useActivityQuery();
  const { data: stats, isLoading, error } = useGetDashboardStats();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-ig-blue" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading statistics. Please reload the page.
      </div>
    );
  }

  const statCards = [
    { label: 'Total Users', value: stats.users_count, icon: Users, color: 'from-blue-500 to-indigo-600', detail: '+12% this week' },
    { label: 'Total Posts', value: stats.posts_count, icon: Image, color: 'from-pink-500 to-rose-600', detail: '+8% this week' },
    { label: 'Total Reels', value: stats.reels_count, icon: Clapperboard, color: 'from-purple-500 to-violet-600', detail: '+18% this week' },
    { label: 'Active Sessions', value: stats.active_users_today, icon: Activity, color: 'from-green-400 to-emerald-600', detail: '75% daily active rate' }
  ];

  // Custom Chart Mock Data - representation using pure CSS/Tailwind
  const chartBars = [
    { day: 'Mon', count: 18, height: 'h-[40%]' },
    { day: 'Tue', count: 32, height: 'h-[65%]' },
    { day: 'Wed', count: 24, height: 'h-[50%]' },
    { day: 'Thu', count: 45, height: 'h-[85%]' },
    { day: 'Fri', count: 38, height: 'h-[75%]' },
    { day: 'Sat', count: 55, height: 'h-[100%]' },
    { day: 'Sun', count: 42, height: 'h-[80%]' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold font-display tracking-tight text-gray-900 dark:text-white m-0">
          Professional Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
          Monitor users table statistics, posts engagement, and system analytics.
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900/60 border border-gray-200/80 dark:border-zinc-800 rounded-xl p-5 flex items-center justify-between shadow-sm hover:shadow transition duration-200"
            >
              <div className="space-y-2">
                <span className="text-xs text-gray-400 dark:text-zinc-500 font-semibold uppercase tracking-wider block">
                  {card.label}
                </span>
                <span className="text-3xl font-display font-extrabold text-gray-900 dark:text-white block">
                  {card.value}
                </span>
                <span className="text-[10px] font-medium text-emerald-500 flex items-center space-x-1">
                  <TrendingUp size={12} className="inline mr-1" />
                  <span>{card.detail}</span>
                </span>
              </div>
              <div className={`p-3.5 rounded-xl bg-gradient-to-tr ${card.color} text-white shadow-md`}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mock Chart Widget */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Engagement Volume</h3>
              <p className="text-xs text-gray-400 dark:text-zinc-500">Weekly post and like activities</p>
            </div>
            <span className="text-xs text-ig-blue font-bold flex items-center space-x-1 cursor-pointer hover:underline">
              <span>View details</span>
              <ArrowUpRight size={14} />
            </span>
          </div>

          {/* Bar Chart Container */}
          <div className="flex items-end justify-between h-48 pt-4 px-2 border-b border-gray-100 dark:border-zinc-800">
            {chartBars.map((bar, idx) => (
              <div key={idx} className="flex flex-col items-center w-10 space-y-2 group">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[10px] font-bold bg-zinc-800 dark:bg-zinc-700 text-white px-1.5 py-0.5 rounded shadow-sm">
                  {bar.count}
                </span>
                <div
                  className={`w-5 ${bar.height} instagram-gradient rounded-t-md transition-all duration-1000 ease-out origin-bottom scale-y-0 animate-[scaleUp_0.8s_ease-out_forwards]`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                />
                <span className="text-[10px] font-semibold text-gray-400 dark:text-zinc-500">
                  {bar.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Logs */}
        <div className="bg-white dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Recent Activities</h3>
            <p className="text-xs text-gray-400 dark:text-zinc-500">Latest actions performed in-app</p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 max-h-[220px]">
            {stats.recent_activities && stats.recent_activities.length > 0 ? (
              stats.recent_activities.map((act) => (
                <div key={act.id} className="flex items-start space-x-3 text-xs">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-ig-blue" />
                  <div className="flex-1 space-y-0.5">
                    <p className="text-gray-700 dark:text-zinc-300">
                      <span className="font-bold">@{act.user}</span>{' '}
                      {act.type === 'user_registered' ? 'registered a new account.' : 'shared a new post.'}
                    </p>
                    <span className="text-[10px] text-gray-400 dark:text-zinc-500">
                      {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-gray-400">
                No recent activity logged.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
