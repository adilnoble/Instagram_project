import { apiClient } from '../api/client';
import { Profile } from '../types';
import { mockDb } from '../utils/mockDb';

export const profileService = {
  getProfiles: async (): Promise<Profile[]> => {
    try {
      const response = await apiClient.get<Profile[]>('/profiles');
      return response.data;
    } catch (error) {
      console.warn('FastAPI backend offline, falling back to local mock data for getProfiles:', error);
      return mockDb.getProfiles();
    }
  },

  getProfileById: async (profileId: string): Promise<Profile> => {
    try {
      const response = await apiClient.get<Profile>(`/profiles/${profileId}`);
      return response.data;
    } catch (error) {
      console.warn(`FastAPI backend offline, falling back to local mock data for getProfileById (${profileId}):`, error);
      const profile = mockDb.getProfile(profileId);
      if (!profile) throw new Error('Profile not found');
      return profile;
    }
  },

  createProfile: async (profile: Omit<Profile, 'id'>): Promise<Profile> => {
    try {
      const response = await apiClient.post<Profile>('/profiles', profile);
      mockDb.saveProfile(response.data);
      return response.data;
    } catch (error) {
      console.warn('FastAPI backend offline, falling back to local mock data for createProfile:', error);
      const newProfile: Profile = {
        id: `p_${Date.now()}`,
        ...profile
      };
      return mockDb.saveProfile(newProfile);
    }
  },

  updateProfile: async (profileId: string, data: Partial<Profile>): Promise<Profile> => {
    try {
      const response = await apiClient.put<Profile>(`/profiles/${profileId}`, data);
      mockDb.saveProfile(response.data);
      return response.data;
    } catch (error) {
      console.warn(`FastAPI backend offline, falling back to local mock data for updateProfile (${profileId}):`, error);
      const profile = mockDb.getProfile(profileId);
      if (!profile) throw new Error('Profile not found');
      const updated = { ...profile, ...data };
      return mockDb.saveProfile(updated);
    }
  }
};
