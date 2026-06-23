import React, { useState } from 'react';
import { Post } from '../types';
import { useAuth } from '../context/AuthContext';
import { usePostsQuery } from '../hooks/usePostsQuery';
import { Heart, MessageCircle, Send, MoreHorizontal, Edit, Trash2 } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onEdit, onDelete }) => {
  const { user } = useAuth();
  const { useLikePost, useAddComment } = usePostsQuery();
  const likeMutation = useLikePost();
  const commentMutation = useAddComment();
  const [commentText, setCommentText] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const isOwner = user?.username === post.username || user?.id === post.user_id;

  const handleLike = () => {
    if (user) {
      likeMutation.mutate({ postId: post.id, username: user.username });
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;
    commentMutation.mutate(
      { postId: post.id, text: commentText, username: user.username },
      {
        onSuccess: () => setCommentText(''),
      }
    );
  };

  return (
    <article className="w-full bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-sm transition-all duration-300">
      
      {/* Header Info */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-zinc-900">
        <div className="flex items-center space-x-3">
          <img
            src={post.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
            alt={post.username}
            className="w-9 h-9 rounded-full object-cover border border-gray-100 dark:border-zinc-800"
          />
          <div>
            <span className="font-semibold text-sm hover:underline cursor-pointer">
              {post.username}
            </span>
            <p className="text-[10px] text-gray-400 dark:text-zinc-500">
              {new Date(post.created_at).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>

        {/* Options Button */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-500 hover:text-black dark:hover:text-white transition"
          >
            <MoreHorizontal size={20} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg z-30 overflow-hidden">
              {isOwner ? (
                <>
                  <button
                    onClick={() => {
                      onEdit(post);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300"
                  >
                    <Edit size={14} />
                    <span>Edit Caption</span>
                  </button>
                  <button
                    onClick={() => {
                      onDelete(post.id);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-xs hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 border-t border-gray-100 dark:border-zinc-800"
                  >
                    <Trash2 size={14} />
                    <span>Delete Post</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full text-center px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-500"
                >
                  No Actions Available
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post Media content */}
      <div className="relative aspect-square w-full bg-gray-50 dark:bg-zinc-900 flex items-center justify-center overflow-hidden">
        {post.media_type === 'video' ? (
          <video
            src={post.media_url}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={post.media_url}
            alt="Instagram Post Media"
            className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-500"
            loading="lazy"
          />
        )}
      </div>

      {/* Post Actions & Comments */}
      <div className="p-4 flex flex-col space-y-2.5">
        
        {/* Interaction Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`p-1 transition-transform duration-200 active:scale-125 ${
              post.is_liked ? 'text-red-500 fill-red-500' : 'text-gray-700 dark:text-zinc-300 hover:text-red-500'
            }`}
          >
            <Heart size={24} />
          </button>
          <button className="p-1 text-gray-700 dark:text-zinc-300 hover:text-ig-blue transition">
            <MessageCircle size={24} />
          </button>
        </div>

        {/* Likes Count */}
        <span className="font-bold text-sm block">
          {post.likes_count.toLocaleString()} likes
        </span>

        {/* Caption */}
        <p className="text-sm">
          <span className="font-bold mr-2 hover:underline cursor-pointer">
            {post.username}
          </span>
          {post.caption}
        </p>

        {/* Comment log list */}
        {post.comments && post.comments.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-zinc-900 max-h-36 overflow-y-auto">
            {post.comments.map((comment) => (
              <p key={comment.id} className="text-xs">
                <span className="font-bold mr-1.5 hover:underline cursor-pointer">
                  {comment.username}
                </span>
                <span className="text-gray-800 dark:text-zinc-300">{comment.text}</span>
              </p>
            ))}
          </div>
        )}

        {/* Add Comment input form */}
        <form
          onSubmit={handleCommentSubmit}
          className="flex items-center space-x-2 pt-2 border-t border-gray-100 dark:border-zinc-900"
        >
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-none text-xs focus:ring-0 focus:border-0 dark:placeholder-zinc-600"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="text-xs font-bold text-ig-blue hover:text-ig-hover-blue disabled:opacity-30 disabled:hover:text-ig-blue transition-colors duration-200"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </article>
  );
};
