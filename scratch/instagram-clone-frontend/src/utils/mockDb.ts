import { User, Profile, Post, Reel, Story, Notification, DashboardStats, Comment } from '../types';

const INITIAL_USERS: User[] = [
  { id: '1', username: 'sarah_travels', email: 'sarah@example.com', phone: '+1234567890', created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(), role: 'User', status: 'active' },
  { id: '2', username: 'alex_chef', email: 'alex@example.com', phone: '+1987654321', created_at: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(), role: 'User', status: 'active' },
  { id: '3', username: 'emily_art', email: 'emily@example.com', phone: '+1472583690', created_at: new Date(Date.now() - 60 * 24 * 3600 * 1000).toISOString(), role: 'Admin', status: 'active' },
  { id: '4', username: 'michael_fitness', email: 'mike@example.com', phone: '+1369258147', created_at: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(), role: 'User', status: 'active' }
];

const INITIAL_PROFILES: Profile[] = [
  {
    id: 'p1',
    user_id: '1',
    username: 'sarah_travels',
    full_name: 'Sarah Jenkins',
    bio: 'Wanderlust ✈️ | Travel Photographer 📸 | Exploring the world one city at a time. Currently in Tokyo!',
    website: 'https://sarahjtravels.com',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    followers_count: 14200,
    following_count: 482,
    posts_count: 3
  },
  {
    id: 'p2',
    user_id: '2',
    username: 'alex_chef',
    full_name: 'Alex Martinez',
    bio: 'Culinary Artist 🍳 | Restaurateur 🍽️ | Bringing flavor to your feeds. New recipes every Wednesday!',
    website: 'https://alexs-kitchen.com',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    followers_count: 8500,
    following_count: 924,
    posts_count: 1
  },
  {
    id: 'p3',
    user_id: '3',
    username: 'emily_art',
    full_name: 'Emily Davis',
    bio: 'Visual Artist 🎨 | Sculptor | Painting life in vibrant colors. Open for commissions.',
    website: 'https://emilydavisart.space',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    followers_count: 23100,
    following_count: 1210,
    posts_count: 2
  },
  {
    id: 'p4',
    user_id: '4',
    username: 'michael_fitness',
    full_name: 'Michael Chen',
    bio: 'Certified Personal Trainer 💪 | Fitness Motivator | Helping you achieve your physical goals. Train hard, eat clean.',
    website: 'https://mikechenfit.co',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    followers_count: 5100,
    following_count: 180,
    posts_count: 1
  }
];

const INITIAL_POSTS: Post[] = [
  {
    id: 'post1',
    user_id: '1',
    username: 'sarah_travels',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    caption: 'Mount Fuji rising above the morning clouds. Absolutely breathtaking views today! 🏔️✨ #Japan #MtFuji #TravelPhotography',
    media_url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&auto=format&fit=crop&q=80',
    media_type: 'image',
    likes_count: 2341,
    comments_count: 3,
    created_at: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    is_liked: false,
    comments: [
      { id: 'c1', post_id: 'post1', username: 'emily_art', text: 'This composition is spectacular, Sarah! 😍', created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString() },
      { id: 'c2', post_id: 'post1', username: 'alex_chef', text: 'Stunning! Makes me want to pack my bags right now.', created_at: new Date(Date.now() - 1.5 * 3600 * 1000).toISOString() }
    ]
  },
  {
    id: 'post2',
    user_id: '3',
    username: 'emily_art',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    caption: 'Finished my latest canvas piece. Title: "Rhythms of Summer". Acrylic and mixed media. Let me know what you think! 🎨🖌️',
    media_url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
    media_type: 'image',
    likes_count: 1892,
    comments_count: 2,
    created_at: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    is_liked: true,
    comments: [
      { id: 'c3', post_id: 'post2', username: 'sarah_travels', text: 'The color palette is so energetic!', created_at: new Date(Date.now() - 10 * 3600 * 1000).toISOString() }
    ]
  },
  {
    id: 'post3',
    user_id: '2',
    username: 'alex_chef',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    caption: 'Homemade handmade pasta with wild mushroom sauce. Simplest recipes are always the best! 🍝🍄 #ChefLife #ItalianFood',
    media_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', // Beautiful forest background (simulated nature theme)
    media_type: 'image',
    likes_count: 942,
    comments_count: 1,
    created_at: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
    is_liked: false,
    comments: [
      { id: 'c4', post_id: 'post3', username: 'michael_fitness', text: 'Cheat meal sorted! Looks tasty!', created_at: new Date(Date.now() - 18 * 3600 * 1000).toISOString() }
    ]
  }
];

const INITIAL_REELS: Reel[] = [
  {
    id: 'reel1',
    user_id: '1',
    username: 'sarah_travels',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    caption: 'Neon lights and rainy nights in Shinjuku, Tokyo 🇯🇵🌧️✨ #tokyolife #neonaesthetics #reels',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-in-a-rainy-night-42407-large.mp4',
    likes_count: 5630,
    comments_count: 124,
    created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    is_liked: false
  },
  {
    id: 'reel2',
    user_id: '4',
    username: 'michael_fitness',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    caption: 'Consistency is key. Morning beach workouts hits different! 🌊💪 #morningmotivation #fitnesscoach #fitnessreels',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-waves-breaking-in-the-ocean-1527-large.mp4', // Simulated beach vibe
    likes_count: 3120,
    comments_count: 98,
    created_at: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
    is_liked: true
  },
  {
    id: 'reel3',
    user_id: '3',
    username: 'emily_art',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    caption: 'Nature stream ASMR. Pure serenity. Finding art inspiration in nature 🌲💧 #nature #peaceful #asmr',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
    likes_count: 4210,
    comments_count: 55,
    created_at: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    is_liked: false
  }
];

const INITIAL_STORIES: Story[] = [
  {
    id: 'story1',
    user_id: '1',
    username: 'sarah_travels',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    media_url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80',
    media_type: 'image',
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  },
  {
    id: 'story2',
    user_id: '2',
    username: 'alex_chef',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    media_url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
    media_type: 'image',
    created_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
  },
  {
    id: 'story3',
    user_id: '3',
    username: 'emily_art',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    media_url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&auto=format&fit=crop&q=80',
    media_type: 'image',
    created_at: new Date(Date.now() - 6 * 3600 * 1000).toISOString()
  }
];

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'like', user_id: '3', username: 'emily_art', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', text: 'liked your post.', created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(), read: false },
  { id: 'n2', type: 'comment', user_id: '2', username: 'alex_chef', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', text: 'commented on your post: "This composition is spectacular!"', created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(), read: false },
  { id: 'n3', type: 'follow', user_id: '4', username: 'michael_fitness', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', text: 'started following you.', created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), read: true }
];

const initializeDB = () => {
  if (!localStorage.getItem('ig_users')) {
    localStorage.setItem('ig_users', JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem('ig_profiles')) {
    localStorage.setItem('ig_profiles', JSON.stringify(INITIAL_PROFILES));
  }
  if (!localStorage.getItem('ig_posts')) {
    localStorage.setItem('ig_posts', JSON.stringify(INITIAL_POSTS));
  }
  if (!localStorage.getItem('ig_reels')) {
    localStorage.setItem('ig_reels', JSON.stringify(INITIAL_REELS));
  }
  if (!localStorage.getItem('ig_stories')) {
    localStorage.setItem('ig_stories', JSON.stringify(INITIAL_STORIES));
  }
  if (!localStorage.getItem('ig_notifications')) {
    localStorage.setItem('ig_notifications', JSON.stringify(INITIAL_NOTIFICATIONS));
  }
};

export const mockDb = {
  init: () => {
    initializeDB();
  },

  // Users
  getUsers: (): User[] => {
    initializeDB();
    return JSON.parse(localStorage.getItem('ig_users') || '[]');
  },
  saveUser: (user: User): User => {
    const users = mockDb.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      users[idx] = user;
    } else {
      users.push(user);
      // Automatically create a profile for new users
      const profiles = mockDb.getProfiles();
      profiles.push({
        id: `p_${user.id}`,
        user_id: user.id,
        username: user.username,
        full_name: user.username,
        bio: 'No bio yet.',
        followers_count: 0,
        following_count: 0,
        posts_count: 0
      });
      localStorage.setItem('ig_profiles', JSON.stringify(profiles));
    }
    localStorage.setItem('ig_users', JSON.stringify(users));
    return user;
  },
  deleteUser: (id: string) => {
    const users = mockDb.getUsers().filter(u => u.id !== id);
    const profiles = mockDb.getProfiles().filter(p => p.user_id !== id);
    localStorage.setItem('ig_users', JSON.stringify(users));
    localStorage.setItem('ig_profiles', JSON.stringify(profiles));
  },

  // Profiles
  getProfiles: (): Profile[] => {
    initializeDB();
    return JSON.parse(localStorage.getItem('ig_profiles') || '[]');
  },
  getProfile: (id: string): Profile | undefined => {
    return mockDb.getProfiles().find(p => p.id === id || p.user_id === id);
  },
  saveProfile: (profile: Profile): Profile => {
    const profiles = mockDb.getProfiles();
    const idx = profiles.findIndex(p => p.id === profile.id);
    if (idx >= 0) {
      profiles[idx] = profile;
    } else {
      profiles.push(profile);
    }
    localStorage.setItem('ig_profiles', JSON.stringify(profiles));
    return profile;
  },

  // Posts
  getPosts: (): Post[] => {
    initializeDB();
    return JSON.parse(localStorage.getItem('ig_posts') || '[]');
  },
  getPost: (id: string): Post | undefined => {
    return mockDb.getPosts().find(p => p.id === id);
  },
  savePost: (post: Post): Post => {
    const posts = mockDb.getPosts();
    const idx = posts.findIndex(p => p.id === post.id);
    if (idx >= 0) {
      posts[idx] = post;
    } else {
      posts.unshift(post);
      // Increment profile posts count
      const profiles = mockDb.getProfiles();
      const pIdx = profiles.findIndex(p => p.user_id === post.user_id || p.username === post.username);
      if (pIdx >= 0) {
        profiles[pIdx].posts_count += 1;
        localStorage.setItem('ig_profiles', JSON.stringify(profiles));
      }
    }
    localStorage.setItem('ig_posts', JSON.stringify(posts));
    return post;
  },
  deletePost: (id: string) => {
    const post = mockDb.getPost(id);
    if (post) {
      const posts = mockDb.getPosts().filter(p => p.id !== id);
      localStorage.setItem('ig_posts', JSON.stringify(posts));
      // Decrement profile posts count
      const profiles = mockDb.getProfiles();
      const pIdx = profiles.findIndex(p => p.user_id === post.user_id || p.username === post.username);
      if (pIdx >= 0) {
        profiles[pIdx].posts_count = Math.max(0, profiles[pIdx].posts_count - 1);
        localStorage.setItem('ig_profiles', JSON.stringify(profiles));
      }
    }
  },
  likePost: (id: string, username: string): Post | undefined => {
    const posts = mockDb.getPosts();
    const idx = posts.findIndex(p => p.id === id);
    if (idx >= 0) {
      const post = posts[idx];
      const wasLiked = post.is_liked;
      post.is_liked = !wasLiked;
      post.likes_count += wasLiked ? -1 : 1;
      posts[idx] = post;
      localStorage.setItem('ig_posts', JSON.stringify(posts));

      // Add a notification if liked (and it is not own post)
      if (!wasLiked && post.username !== username) {
        const notifications = mockDb.getNotifications();
        notifications.unshift({
          id: `n_like_${Date.now()}`,
          type: 'like',
          user_id: 'current',
          username: username,
          text: 'liked your post.',
          created_at: new Date().toISOString(),
          read: false
        });
        localStorage.setItem('ig_notifications', JSON.stringify(notifications));
      }
      return post;
    }
    return undefined;
  },
  addComment: (postId: string, text: string, username: string): Comment | undefined => {
    const posts = mockDb.getPosts();
    const idx = posts.findIndex(p => p.id === postId);
    if (idx >= 0) {
      const post = posts[idx];
      const comment: Comment = {
        id: `c_${Date.now()}`,
        post_id: postId,
        username,
        text,
        created_at: new Date().toISOString()
      };
      post.comments = post.comments || [];
      post.comments.push(comment);
      post.comments_count += 1;
      posts[idx] = post;
      localStorage.setItem('ig_posts', JSON.stringify(posts));

      // Add notification
      if (post.username !== username) {
        const notifications = mockDb.getNotifications();
        notifications.unshift({
          id: `n_comment_${Date.now()}`,
          type: 'comment',
          user_id: 'current',
          username,
          text: `commented on your post: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`,
          created_at: new Date().toISOString(),
          read: false
        });
        localStorage.setItem('ig_notifications', JSON.stringify(notifications));
      }
      return comment;
    }
    return undefined;
  },

  // Reels
  getReels: (): Reel[] => {
    initializeDB();
    return JSON.parse(localStorage.getItem('ig_reels') || '[]');
  },
  likeReel: (id: string): Reel | undefined => {
    const reels = mockDb.getReels();
    const idx = reels.findIndex(r => r.id === id);
    if (idx >= 0) {
      const reel = reels[idx];
      const wasLiked = reel.is_liked;
      reel.is_liked = !wasLiked;
      reel.likes_count += wasLiked ? -1 : 1;
      reels[idx] = reel;
      localStorage.setItem('ig_reels', JSON.stringify(reels));
      return reel;
    }
    return undefined;
  },

  // Stories
  getStories: (): Story[] => {
    initializeDB();
    return JSON.parse(localStorage.getItem('ig_stories') || '[]');
  },

  // Notifications
  getNotifications: (): Notification[] => {
    initializeDB();
    return JSON.parse(localStorage.getItem('ig_notifications') || '[]');
  },
  markNotificationRead: (id: string) => {
    const notifications = mockDb.getNotifications();
    const idx = notifications.findIndex(n => n.id === id);
    if (idx >= 0) {
      notifications[idx].read = true;
      localStorage.setItem('ig_notifications', JSON.stringify(notifications));
    }
  },

  // Dashboard Stats
  getStats: (): DashboardStats => {
    const users = mockDb.getUsers();
    const posts = mockDb.getPosts();
    const reels = mockDb.getReels();
    
    // Combine activities
    const activities = [
      ...users.map(u => ({ id: `act_u_${u.id}`, type: 'user_registered' as const, user: u.username, target: 'System', timestamp: u.created_at })),
      ...posts.map(p => ({ id: `act_p_${p.id}`, type: 'post_created' as const, user: p.username, target: 'Feed', timestamp: p.created_at }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10);

    return {
      users_count: users.length,
      posts_count: posts.length,
      reels_count: reels.length,
      active_users_today: Math.floor(users.length * 0.75) + 1,
      recent_activities: activities
    };
  }
};
