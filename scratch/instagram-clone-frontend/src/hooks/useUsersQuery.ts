import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { User } from '../types';

export const useUsersQuery = () => {
  const queryClient = useQueryClient();

  const useGetUsers = (search?: string) => {
    return useQuery({
      queryKey: ['users', search],
      queryFn: async () => {
        const users = await userService.getUsers();
        if (search) {
          const lower = search.toLowerCase();
          return users.filter(
            u =>
              u.username.toLowerCase().includes(lower) ||
              u.email.toLowerCase().includes(lower) ||
              (u.phone && u.phone.includes(lower))
          );
        }
        return users;
      },
    });
  };

  const useGetUser = (userId: string) => {
    return useQuery({
      queryKey: ['user', userId],
      queryFn: () => userService.getUserById(userId),
      enabled: !!userId,
    });
  };

  const useCreateUser = () => {
    return useMutation({
      mutationFn: (user: Omit<User, 'id' | 'created_at'>) => userService.createUser(user),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    });
  };

  const useUpdateUser = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
        userService.updateUser(id, data),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        queryClient.invalidateQueries({ queryKey: ['user', data.id] });
        queryClient.invalidateQueries({ queryKey: ['profile', data.id] });
      },
    });
  };

  const useDeleteUser = () => {
    return useMutation({
      mutationFn: (userId: string) => userService.deleteUser(userId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        queryClient.invalidateQueries({ queryKey: ['profiles'] });
      },
    });
  };

  return {
    useGetUsers,
    useGetUser,
    useCreateUser,
    useUpdateUser,
    useDeleteUser,
  };
};
