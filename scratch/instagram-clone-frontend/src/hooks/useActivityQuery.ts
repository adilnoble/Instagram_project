import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { activityService } from '../services/activityService';

export const useActivityQuery = () => {
  const queryClient = useQueryClient();

  const useGetReels = () => {
    return useQuery({
      queryKey: ['reels'],
      queryFn: () => activityService.getReels(),
    });
  };

  const useLikeReel = () => {
    return useMutation({
      mutationFn: (reelId: string) => activityService.likeReel(reelId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['reels'] });
      },
    });
  };

  const useGetStories = () => {
    return useQuery({
      queryKey: ['stories'],
      queryFn: () => activityService.getStories(),
    });
  };

  const useGetNotifications = () => {
    return useQuery({
      queryKey: ['notifications'],
      queryFn: () => activityService.getNotifications(),
      refetchInterval: 15000, // Poll notifications every 15s
    });
  };

  const useMarkNotificationRead = () => {
    return useMutation({
      mutationFn: (notificationId: string) => activityService.markNotificationRead(notificationId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
      },
    });
  };

  const useGetDashboardStats = () => {
    return useQuery({
      queryKey: ['stats'],
      queryFn: () => activityService.getDashboardStats(),
      refetchInterval: 30000, // Poll stats every 30s
    });
  };

  return {
    useGetReels,
    useLikeReel,
    useGetStories,
    useGetNotifications,
    useMarkNotificationRead,
    useGetDashboardStats,
  };
};
