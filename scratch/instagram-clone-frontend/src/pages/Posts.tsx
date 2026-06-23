import React, { useState } from 'react';
import { usePostsQuery } from '../hooks/usePostsQuery';
import { useActivityQuery } from '../hooks/useActivityQuery';
import { useProfilesQuery } from '../hooks/useProfilesQuery';
import { useAuth } from '../context/AuthContext';
import { PostCard } from '../components/PostCard';
import { StoryCircle } from '../components/StoryCircle';
import { StoryViewer } from '../components/StoryViewer';
import { CreatePostModal } from '../components/CreatePostModal';
import { EditPostModal } from '../components/EditPostModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { Post } from '../types';
import { PlusCircle, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Posts: React.FC = () => {
  const { user } = useAuth();
  const { useGetPosts, useDeletePost } = usePostsQuery();
  const { useGetStories } = useActivityQuery();
  const { useGetProfiles } = useProfilesQuery();

  const { data: posts, isLoading: isPostsLoading } = useGetPosts();
  const { data: stories } = useGetStories();
  const { data: profiles } = useGetProfiles();
  const deleteMutation = useDeletePost();

  // Modals States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);

  // Story Viewer state
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  const handleEditInit = (post: Post) => {
    setSelectedPost(post);
    setIsEditOpen(true);
  };

  const handleDeleteInit = (postId: string) => {
    setPostIdToDelete(postId);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (postIdToDelete) {
      deleteMutation.mutate(postIdToDelete, {
        onSuccess: () => {
          setIsConfirmOpen(false);
          setPostIdToDelete(null);
        }
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fadeIn">
      {/* Left Column: Feed + Stories */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Stories Horizontal Tray */}
        {stories && stories.length > 0 && (
          <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg p-4 flex space-x-4 overflow-x-auto shadow-sm">
            {stories.map((story, index) => (
              <StoryCircle
                key={story.id}
                story={story}
                onClick={() => setActiveStoryIndex(index)}
              />
            ))}
          </div>
        )}

        {/* Create Post Banner */}
        <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-ig-blue/10 text-ig-blue flex items-center justify-center">
              <PlusCircle size={22} />
            </div>
            <div>
              <span className="font-bold text-xs block">Share a new adventure</span>
              <span className="text-[10px] text-gray-400">Add an image or video with your thoughts.</span>
            </div>
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-1.5 bg-ig-blue hover:bg-ig-hover-blue text-white rounded-lg text-xs font-semibold shadow-sm transition active:scale-95"
          >
            Create Post
          </button>
        </div>

        {/* Feed Posts */}
        {isPostsLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ig-blue" />
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={handleEditInit}
                onDelete={handleDeleteInit}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg py-16 flex flex-col items-center justify-center text-center space-y-3">
            <Compass size={40} className="text-gray-300" />
            <h3 className="font-bold text-sm">Welcome to your feed</h3>
            <p className="text-xs text-gray-400 max-w-xs">Follow people or post your own photos to fill your home feed.</p>
          </div>
        )}
      </div>

      {/* Right Column: Recommendations Sidebar (Desktop only) */}
      <div className="hidden lg:block space-y-6">
        
        {/* Current user card preview */}
        {user && (
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" // Default Sarah avatar
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-zinc-800"
              />
              <div>
                <span className="font-bold text-xs block hover:underline cursor-pointer">
                  {user.username}
                </span>
                <span className="text-[10px] text-gray-400">{user.email}</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-ig-blue cursor-pointer hover:text-ig-hover-blue">
              Switch
            </span>
          </div>
        )}

        {/* Suggestions Title */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-gray-400 dark:text-zinc-500">Suggestions for you</span>
            <span className="font-bold text-gray-700 dark:text-zinc-300 hover:text-gray-400 cursor-pointer">
              See All
            </span>
          </div>

          {/* List of profiles recommendations */}
          <div className="space-y-3 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
            {profiles && profiles.length > 0 ? (
              profiles.filter(p => p.username !== user?.username).slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <img
                      src={p.avatar_url}
                      alt={p.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <Link to={`/profiles/${p.id}`} className="font-bold block hover:underline text-gray-800 dark:text-zinc-200">
                        {p.username}
                      </Link>
                      <span className="text-[9px] text-gray-400">Popular member</span>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold text-ig-blue hover:text-ig-hover-blue active:scale-95 transition">
                    Follow
                  </button>
                </div>
              ))
            ) : (
              <p className="text-[10px] text-gray-400 text-center py-2">No recommendations today.</p>
            )}
          </div>
        </div>

        {/* Micro-footer */}
        <div className="text-[9px] text-gray-300 dark:text-zinc-600 space-y-1">
          <p>About &bull; Help &bull; Press &bull; API &bull; Jobs &bull; Privacy &bull; Terms</p>
          <p>&copy; {new Date().getFullYear()} INSTAGRAM CLONE BY ANTIGRAVITY</p>
        </div>
      </div>

      {/* Story Viewer Modal */}
      {activeStoryIndex !== null && stories && (
        <StoryViewer
          stories={stories}
          initialIndex={activeStoryIndex}
          onClose={() => setActiveStoryIndex(null)}
        />
      )}

      {/* Create Post Dialog */}
      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      {/* Edit Caption Dialog */}
      <EditPostModal
        post={selectedPost}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedPost(null);
        }}
      />

      {/* Delete Post Confirm */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Delete Post"
        message="Are you sure you want to permanently delete this post? This operation is irreversible."
        onConfirm={handleConfirmDelete}
        onClose={() => {
          setIsConfirmOpen(false);
          setPostIdToDelete(null);
        }}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
