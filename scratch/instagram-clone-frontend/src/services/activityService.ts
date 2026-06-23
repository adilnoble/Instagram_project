import { apiClient } from '../api/client';
import { Reel, Story, Notification, DashboardStats } from '../types';
import { mockDb } from '../utils/mockDb';

export const activityService = {
  getReels: async (): Promise<Reel[]> => {
    try {
      const response = await apiClient.get<Reel[]>('/reels');
      return response.data;
    } catch (error) {
      console.warn('FastAPI backend offline, falling back to local mock data for getReels:', error);
      return mockDb.getReels();
    }
  },

  likeReel: async (reelId: string): Promise<Reel> => {
    try {
      const response = await apiClient.post<Reel>(`/reels/${reelId}/like`);
      mockDb.likeReel(reelId);
      return response.data;
    } catch (error) {
      console.warn(`FastAPI backend offline, falling back to local mock data for likeReel (${reelId}):`, error);
      const reel = mockDb.likeReel(reelId);
      if (!reel) throw new Error('Reel not found');
      return reel;
    }
  },

  getStories: async (): Promise<Story[]> => {
    try {
      const response = await apiClient.get<Story[]>('/stories');
      return response.data;
    } catch (error) {
      console.warn('FastAPI backend offline, falling back to local mock data for getStories:', error);
      return mockDb.getStories();
    }
  },

  getNotifications: async (): Promise<Notification[]> => {
    try {
      const response = await apiClient.get<Notification[]>('/notifications');
      return response.data;
    } catch (error) {
      console.warn('FastAPI backend offline, falling back to local mock data for getNotifications:', error);
      return mockDb.getNotifications();
    }
  },

  markNotificationRead: async (notificationId: string): Promise<void> => {
    try {
      await apiClient.put(`/notifications/${notificationId}/read`);
      mockDb.markNotificationRead(notificationId);
    } catch (error) {
      console.warn(`FastAPI backend offline, falling back to local mock data for markNotificationRead (${notificationId}):`, error);
      mockDb.markNotificationRead(notificationId);
    }
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      const response = await apiClient.get<DashboardStats>('/stats');
      return response.data;
    } catch (error) {
      console.warn('FastAPI backend offline, falling back to local mock data for getDashboardStats:', error);
      return mockDb.getStats();
    }
  }
};
