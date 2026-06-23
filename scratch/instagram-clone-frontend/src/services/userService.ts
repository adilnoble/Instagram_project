import { apiClient } from '../api/client';
import { User } from '../types';
import { mockDb } from '../utils/mockDb';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await apiClient.get<User[]>('/users');
      return response.data;
    } catch (error) {
      console.warn('FastAPI backend offline, falling back to local mock data for getUsers:', error);
      return mockDb.getUsers();
    }
  },

  createUser: async (user: Omit<User, 'id' | 'created_at'>): Promise<User> => {
    try {
      const response = await apiClient.post<User>('/users', user);
      // Synchronize back to local database
      mockDb.saveUser(response.data);
      return response.data;
    } catch (error) {
      console.warn('FastAPI backend offline, falling back to local mock data for createUser:', error);
      const newMockUser: User = {
        id: String(mockDb.getUsers().length + 1),
        created_at: new Date().toISOString(),
        role: 'User',
        status: 'active',
        ...user,
      };
      return mockDb.saveUser(newMockUser);
    }
  },

  getUserById: async (userId: string): Promise<User> => {
    try {
      const response = await apiClient.get<User>(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.warn(`FastAPI backend offline, falling back to local mock data for getUserById (${userId}):`, error);
      const user = mockDb.getUsers().find(u => u.id === userId);
      if (!user) throw new Error('User not found in mock database.');
      return user;
    }
  },

  updateUser: async (userId: string, data: Partial<User>): Promise<User> => {
    try {
      // Put/patch endpoint if available
      const response = await apiClient.put<User>(`/users/${userId}`, data);
      mockDb.saveUser(response.data);
      return response.data;
    } catch (error) {
      console.warn(`FastAPI backend offline, falling back to local mock data for updateUser (${userId}):`, error);
      const users = mockDb.getUsers();
      const userIdx = users.findIndex(u => u.id === userId);
      if (userIdx === -1) throw new Error('User not found');
      const updatedUser = { ...users[userIdx], ...data };
      return mockDb.saveUser(updatedUser);
    }
  },

  deleteUser: async (userId: string): Promise<void> => {
    try {
      await apiClient.delete(`/users/${userId}`);
      mockDb.deleteUser(userId);
    } catch (error) {
      console.warn(`FastAPI backend offline, falling back to local mock data for deleteUser (${userId}):`, error);
      mockDb.deleteUser(userId);
    }
  }
};
