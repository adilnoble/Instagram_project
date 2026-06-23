export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  created_at: string;
  role?: string;
  status?: 'active' | 'suspended';
}

export interface Profile {
  id: string;
  user_id: string;
  username: string;
  full_name: string;
  bio: string;
  website?: string;
  avatar_url?: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
}

export interface Comment {
  id: string;
  post_id: string;
  username: string;
  avatar_url?: string;
  text: string;
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  caption: string;
  media_url: string;
  media_type: 'image' | 'video';
  likes_count: number;
  comments_count: number;
  created_at: string;
  is_liked?: boolean;
  comments?: Comment[];
}

export interface Reel {
  id: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  caption: string;
  video_url: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  is_liked?: boolean;
}

export interface Story {
  id: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  media_url: string;
  media_type: 'image' | 'video';
  created_at: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user_id: string;
  username: string;
  avatar_url?: string;
  text: string;
  created_at: string;
  read: boolean;
}

export interface DashboardStats {
  users_count: number;
  posts_count: number;
  reels_count: number;
  active_users_today: number;
  recent_activities: Array<{
    id: string;
    type: 'user_registered' | 'post_created' | 'like_added' | 'comment_added';
    user: string;
    target: string;
    timestamp: string;
  }>;
}
