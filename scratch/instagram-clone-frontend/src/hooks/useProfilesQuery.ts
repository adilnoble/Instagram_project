import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profileService';
import { Profile } from '../types';

export const useProfilesQuery = () => {
  const queryClient = useQueryClient();

  const useGetProfiles = () => {
    return useQuery({
      queryKey: ['profiles'],
      queryFn: () => profileService.getProfiles(),
    });
  };

  const useGetProfile = (profileId: string) => {
    return useQuery({
      queryKey: ['profile', profileId],
      queryFn: () => profileService.getProfileById(profileId),
      enabled: !!profileId,
    });
  };

  const useUpdateProfile = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<Profile> }) =>
        profileService.updateProfile(id, data),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['profiles'] });
        queryClient.invalidateQueries({ queryKey: ['profile', data.id] });
        queryClient.invalidateQueries({ queryKey: ['profile', data.user_id] });
      },
    });
  };

  return {
    useGetProfiles,
    useGetProfile,
    useUpdateProfile,
  };
};
