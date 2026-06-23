import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProfilesQuery } from '../hooks/useProfilesQuery';
import { usePostsQuery } from '../hooks/usePostsQuery';
import { useAuth } from '../context/AuthContext';
import { User, Link as LinkIcon, Edit3, Grid, Camera } from 'lucide-react';

export const Profiles: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, refreshProfile: refreshAuthProfile } = useAuth();
  
  const { useGetProfiles, useGetProfile, useUpdateProfile } = useProfilesQuery();
  const { useGetPosts } = usePostsQuery();

  const { data: profiles, isLoading: isProfilesLoading } = useGetProfiles();
  const { data: profile, isLoading: isProfileLoading } = useGetProfile(id || '');
  const { data: posts } = useGetPosts();

  const updateProfileMutation = useUpdateProfile();

  // Edit Mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editFullName, setEditFullName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editWebsite, setEditWebsite] = useState('');
  const [editAvatar, setEditAvatar] = useState('');

  const isOwnProfile = profile && currentUser && profile.user_id === currentUser.id;

  const handleEditInit = () => {
    if (profile) {
      setEditFullName(profile.full_name);
      setEditBio(profile.bio);
      setEditWebsite(profile.website || '');
      setEditAvatar(profile.avatar_url || '');
      setIsEditing(true);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) {
      updateProfileMutation.mutate({
        id: profile.id,
        data: {
          full_name: editFullName,
          bio: editBio,
          website: editWebsite,
          avatar_url: editAvatar
        }
      }, {
        onSuccess: () => {
          setIsEditing(false);
          refreshAuthProfile();
        }
      });
    }
  };

  // Filter posts created by this profile owner
  const profilePosts = posts?.filter(
    p => p.username === profile?.username || p.user_id === profile?.user_id
  ) || [];

  // 1. DETAIL PROFILE SUBPAGE VIEW
  if (id) {
    if (isProfileLoading) {
      return (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ig-blue" />
        </div>
      );
    }

    if (!profile) {
      return (
        <div className="text-center py-10 text-red-500">
          Profile not found.{' '}
          <button onClick={() => navigate('/profiles')} className="text-ig-blue hover:underline font-semibold">
            Go back to all profiles
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn">
        {/* Profile Card Header Info */}
        <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8 shadow-sm">
          {/* Avatar image */}
          <div className="relative group">
            <img
              src={profile.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
              alt={profile.username}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-gray-200 dark:border-zinc-800 shadow-sm"
            />
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-4 text-center sm:text-left w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold tracking-tight m-0 text-gray-900 dark:text-white">
                @{profile.username}
              </h2>
              {isOwnProfile && !isEditing && (
                <button
                  onClick={handleEditInit}
                  className="flex items-center space-x-1.5 px-3 py-1.5 border border-gray-200 dark:border-zinc-850 hover:bg-gray-50 dark:hover:bg-zinc-900/60 rounded-md text-xs font-semibold self-center sm:self-start transition"
                >
                  <Edit3 size={14} />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {/* Statistics */}
            <div className="flex justify-center sm:justify-start space-x-8 text-sm">
              <div>
                <span className="font-bold text-gray-900 dark:text-white mr-1">
                  {profilePosts.length}
                </span>
                <span className="text-gray-400 dark:text-zinc-500">posts</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white mr-1">
                  {profile.followers_count.toLocaleString()}
                </span>
                <span className="text-gray-400 dark:text-zinc-500">followers</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white mr-1">
                  {profile.following_count.toLocaleString()}
                </span>
                <span className="text-gray-400 dark:text-zinc-500">following</span>
              </div>
            </div>

            {/* Bio and Links */}
            {!isEditing ? (
              <div className="space-y-1">
                <span className="font-bold text-sm block">{profile.full_name}</span>
                <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {profile.bio}
                </p>
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-ig-blue hover:underline pt-1"
                  >
                    <LinkIcon size={12} />
                    <span>{profile.website.replace(/(^\w+:|^)\/\//, '')}</span>
                  </a>
                )}
              </div>
            ) : (
              /* Inline Edit Form */
              <form onSubmit={handleEditSubmit} className="space-y-3 pt-2 bg-gray-50 dark:bg-zinc-900/40 p-4 rounded-lg border border-gray-100 dark:border-zinc-850">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Edit profile details</h4>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400">Full Name</label>
                  <input
                    type="text"
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    required
                    className="w-full text-xs bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded px-2 py-1.5 mt-0.5 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400">Avatar Image URL</label>
                  <input
                    type="text"
                    value={editAvatar}
                    onChange={(e) => setEditAvatar(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full text-xs bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded px-2 py-1.5 mt-0.5 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400">Biography</label>
                  <textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    rows={3}
                    className="w-full text-xs bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded px-2 py-1.5 mt-0.5 outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400">Website URL</label>
                  <input
                    type="text"
                    value={editWebsite}
                    onChange={(e) => setEditWebsite(e.target.value)}
                    className="w-full text-xs bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded px-2 py-1.5 mt-0.5 outline-none"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 border border-gray-200 dark:border-zinc-800 text-[10px] rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    className="px-4 py-1.5 bg-ig-blue hover:bg-ig-hover-blue text-white text-[10px] font-bold rounded"
                  >
                    {updateProfileMutation.isPending ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* 3-Column Posts Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 border-t border-gray-200 dark:border-zinc-800 pt-4">
            <Grid size={16} className="text-gray-500" />
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">Posts</span>
          </div>

          {profilePosts.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {profilePosts.map((post) => (
                <Link
                  key={post.id}
                  to="/posts"
                  className="relative aspect-square bg-gray-150 dark:bg-zinc-900 rounded-md overflow-hidden group border border-gray-200/50 dark:border-zinc-800"
                >
                  <img
                    src={post.media_url}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-6 text-white text-xs font-bold transition-opacity duration-200">
                    <span>❤️ {post.likes_count}</span>
                    <span>💬 {post.comments_count}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400 space-y-2">
              <Camera size={36} className="text-gray-300" />
              <p className="text-xs">No posts uploaded yet by @{profile.username}.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. GRID LIST OF ALL PROFILES (Default fallback View)
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold font-display tracking-tight text-gray-900 dark:text-white m-0">
          Explore Profiles
        </h1>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
          Explore other members on the platform and check their travel or art posts.
        </p>
      </div>

      {isProfilesLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ig-blue" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {profiles?.map((profile) => (
            <div
              key={profile.id}
              className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow transition duration-200"
            >
              <img
                src={profile.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                alt={profile.full_name}
                className="w-20 h-20 rounded-full object-cover border border-gray-100 dark:border-zinc-800 mb-3"
              />
              <span className="font-bold text-sm text-gray-900 dark:text-white block">
                {profile.full_name}
              </span>
              <span className="text-xs text-gray-400 dark:text-zinc-500 block mb-2">
                @{profile.username}
              </span>
              <p className="text-xs text-gray-500 dark:text-zinc-400 line-clamp-2 h-8 px-2">
                {profile.bio}
              </p>
              
              <div className="flex space-x-6 text-[10px] text-gray-400 font-semibold my-4">
                <span>{profile.posts_count} posts</span>
                <span>{profile.followers_count.toLocaleString()} followers</span>
              </div>

              <Link
                to={`/profiles/${profile.id}`}
                className="w-full text-center py-2 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 text-xs font-semibold rounded-lg text-gray-700 dark:text-zinc-300 transition"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
