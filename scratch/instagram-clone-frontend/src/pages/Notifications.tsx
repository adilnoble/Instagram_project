import React from 'react';
import { useActivityQuery } from '../hooks/useActivityQuery';
import { Bell, Heart, MessageSquare, UserPlus, CheckCircle, Check, Eye } from 'lucide-react';

export const Notifications: React.FC = () => {
  const { useGetNotifications, useMarkNotificationRead } = useActivityQuery();
  const { data: notifications, isLoading, error } = useGetNotifications();
  const readMutation = useMarkNotificationRead();

  const handleMarkRead = (id: string) => {
    readMutation.mutate(id);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return (
          <div className="p-2 rounded-full bg-red-50 dark:bg-red-950/20 text-red-500">
            <Heart size={16} className="fill-red-500" />
          </div>
        );
      case 'comment':
        return (
          <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-950/20 text-blue-500">
            <MessageSquare size={16} />
          </div>
        );
      case 'follow':
        return (
          <div className="p-2 rounded-full bg-green-50 dark:bg-green-950/20 text-green-500">
            <UserPlus size={16} />
          </div>
        );
      default:
        return (
          <div className="p-2 rounded-full bg-gray-50 dark:bg-zinc-800 text-gray-500">
            <Bell size={16} />
          </div>
        );
    }
  };

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading notifications feed.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-gray-900 dark:text-white m-0">
            Notifications
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
            Stay updated with likes, comments, and new followers.
          </p>
        </div>
        <div className="p-2 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-400">
          <Bell size={18} />
        </div>
      </div>

      {/* List Container */}
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ig-blue" />
        </div>
      ) : notifications && notifications.length > 0 ? (
        <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm divide-y divide-gray-150 dark:divide-zinc-850">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => !notif.read && handleMarkRead(notif.id)}
              className={`p-4 flex items-center justify-between gap-4 cursor-pointer transition duration-150 ${
                notif.read
                  ? 'hover:bg-gray-50 dark:hover:bg-zinc-900/30'
                  : 'bg-ig-blue/[0.03] hover:bg-ig-blue/[0.06] dark:bg-ig-blue/[0.02] dark:hover:bg-ig-blue/[0.04]'
              }`}
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {/* Left Action Icon */}
                {getIcon(notif.type)}
                
                {/* Avatar */}
                <img
                  src={notif.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                  alt={notif.username}
                  className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-zinc-850"
                />

                {/* Text Description */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-800 dark:text-zinc-200 leading-normal">
                    <span className="font-bold text-black dark:text-white hover:underline cursor-pointer">
                      @{notif.username}
                    </span>{' '}
                    {notif.text}
                  </p>
                  <span className="text-[10px] text-gray-400 dark:text-zinc-500">
                    {new Date(notif.created_at).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              {/* Status Badge Action */}
              <div>
                {!notif.read ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkRead(notif.id);
                    }}
                    className="p-1.5 bg-ig-blue hover:bg-ig-hover-blue text-white rounded-md text-[10px] font-bold flex items-center space-x-1 shadow-sm transition"
                    title="Mark as read"
                  >
                    <Check size={10} />
                    <span className="hidden sm:inline">Mark Read</span>
                  </button>
                ) : (
                  <span className="text-gray-300 dark:text-zinc-700 p-1" title="Read">
                    <CheckCircle size={16} />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl py-16 flex flex-col items-center justify-center text-center space-y-3">
          <Eye size={36} className="text-gray-300" />
          <h3 className="font-bold text-sm">No new notifications</h3>
          <p className="text-xs text-gray-400 max-w-xs">All activity reports will appear here as likes, comments, and mentions happen.</p>
        </div>
      )}
    </div>
  );
};
