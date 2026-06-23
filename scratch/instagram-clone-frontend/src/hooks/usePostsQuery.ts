import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '../services/postService';
import { Post } from '../types';

export const usePostsQuery = () => {
  const queryClient = useQueryClient();

  const useGetPosts = () => {
    return useQuery({
      queryKey: ['posts'],
      queryFn: () => postService.getPosts(),
    });
  };

  const useGetPost = (postId: string) => {
    return useQuery({
      queryKey: ['post', postId],
      queryFn: () => postService.getPostById(postId),
      enabled: !!postId,
    });
  };

  const useCreatePost = () => {
    return useMutation({
      mutationFn: (post: Omit<Post, 'id' | 'created_at' | 'likes_count' | 'comments_count' | 'comments'>) =>
        postService.createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({ queryKey: ['profiles'] });
        queryClient.invalidateQueries({ queryKey: ['stats'] });
      },
    });
  };

  const useUpdatePost = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<Post> }) =>
        postService.updatePost(id, data),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({ queryKey: ['post', data.id] });
      },
    });
  };

  const useDeletePost = () => {
    return useMutation({
      mutationFn: (postId: string) => postService.deletePost(postId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({ queryKey: ['profiles'] });
        queryClient.invalidateQueries({ queryKey: ['stats'] });
      },
    });
  };

  const useLikePost = () => {
    return useMutation({
      mutationFn: ({ postId, username }: { postId: string; username: string }) =>
        postService.likePost(postId, username),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({ queryKey: ['post', data.id] });
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
      },
    });
  };

  const useAddComment = () => {
    return useMutation({
      mutationFn: ({ postId, text, username }: { postId: string; text: string; username: string }) =>
        postService.addComment(postId, text, username),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
      },
    });
  };

  return {
    useGetPosts,
    useGetPost,
    useCreatePost,
    useUpdatePost,
    useDeletePost,
    useLikePost,
    useAddComment,
  };
};
