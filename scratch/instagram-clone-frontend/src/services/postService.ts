import { apiClient } from '../api/client';
import { Post, Comment } from '../types';
import { mockDb } from '../utils/mockDb';

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    try {
      const response = await apiClient.get<Post[]>('/posts');
      return response.data;
    } catch (error) {
      console.warn('FastAPI backend offline, falling back to local mock data for getPosts:', error);
      return mockDb.getPosts();
    }
  },

  getPostById: async (postId: string): Promise<Post> => {
    try {
      const response = await apiClient.get<Post>(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.warn(`FastAPI backend offline, falling back to local mock data for getPostById (${postId}):`, error);
      const post = mockDb.getPost(postId);
      if (!post) throw new Error('Post not found');
      return post;
    }
  },

  createPost: async (post: Omit<Post, 'id' | 'created_at' | 'likes_count' | 'comments_count' | 'comments'>): Promise<Post> => {
    try {
      const response = await apiClient.post<Post>('/posts', post);
      mockDb.savePost(response.data);
      return response.data;
    } catch (error) {
      console.warn('FastAPI backend offline, falling back to local mock data for createPost:', error);
      const newPost: Post = {
        id: `post_${Date.now()}`,
        created_at: new Date().toISOString(),
        likes_count: 0,
        comments_count: 0,
        comments: [],
        ...post
      };
      return mockDb.savePost(newPost);
    }
  },

  updatePost: async (postId: string, data: Partial<Post>): Promise<Post> => {
    try {
      const response = await apiClient.put<Post>(`/posts/${postId}`, data);
      mockDb.savePost(response.data);
      return response.data;
    } catch (error) {
      console.warn(`FastAPI backend offline, falling back to local mock data for updatePost (${postId}):`, error);
      const post = mockDb.getPost(postId);
      if (!post) throw new Error('Post not found');
      const updated = { ...post, ...data };
      return mockDb.savePost(updated);
    }
  },

  deletePost: async (postId: string): Promise<void> => {
    try {
      await apiClient.delete(`/posts/${postId}`);
      mockDb.deletePost(postId);
    } catch (error) {
      console.warn(`FastAPI backend offline, falling back to local mock data for deletePost (${postId}):`, error);
      mockDb.deletePost(postId);
    }
  },

  likePost: async (postId: string, username: string): Promise<Post> => {
    try {
      // Assuming a /posts/{postId}/like endpoint exists
      const response = await apiClient.post<Post>(`/posts/${postId}/like`, { username });
      mockDb.likePost(postId, username);
      return response.data;
    } catch (error) {
      console.warn(`FastAPI backend offline, falling back to local mock data for likePost (${postId}):`, error);
      const post = mockDb.likePost(postId, username);
      if (!post) throw new Error('Post not found');
      return post;
    }
  },

  addComment: async (postId: string, text: string, username: string): Promise<Comment> => {
    try {
      // Assuming a /posts/{postId}/comments endpoint exists
      const response = await apiClient.post<Comment>(`/posts/${postId}/comments`, { text, username });
      mockDb.addComment(postId, text, username);
      return response.data;
    } catch (error) {
      console.warn(`FastAPI backend offline, falling back to local mock data for addComment (${postId}):`, error);
      const comment = mockDb.addComment(postId, text, username);
      if (!comment) throw new Error('Post not found');
      return comment;
    }
  }
};
