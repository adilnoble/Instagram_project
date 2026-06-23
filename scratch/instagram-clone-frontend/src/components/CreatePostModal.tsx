import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { usePostsQuery } from '../hooks/usePostsQuery';
import { X } from 'lucide-react';

interface CreatePostForm {
  caption: string;
  media_url: string;
  media_type: 'image' | 'video';
}

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const { user, profile } = useAuth();
  const { useCreatePost } = usePostsQuery();
  const createPostMutation = useCreatePost();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreatePostForm>({
    defaultValues: {
      media_type: 'image',
      media_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80'
    }
  });

  if (!isOpen) return null;

  const onSubmit = (data: CreatePostForm) => {
    if (!user) return;
    createPostMutation.mutate({
      user_id: user.id,
      username: user.username,
      avatar_url: profile?.avatar_url || '',
      caption: data.caption,
      media_url: data.media_url,
      media_type: data.media_type,
    }, {
      onSuccess: () => {
        reset();
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-zinc-900">
          <span className="font-bold text-sm">Create new post</span>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full text-gray-500">
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          
          {/* Media URL Input */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-gray-500">Media URL</label>
            <input
              type="text"
              {...register('media_url', { required: 'Media URL is required' })}
              placeholder="Paste image or video URL (e.g. Unsplash URL)"
              className="w-full text-sm bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2 outline-none focus:border-ig-blue dark:focus:border-ig-blue"
            />
            {errors.media_url && (
              <p className="text-[10px] text-red-500 mt-1">{errors.media_url.message}</p>
            )}
          </div>

          {/* Media Type Selection */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-gray-500">Media Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  value="image"
                  {...register('media_type')}
                  className="text-ig-blue focus:ring-0"
                />
                <span>Image</span>
              </label>
              <label className="flex items-center space-x-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  value="video"
                  {...register('media_type')}
                  className="text-ig-blue focus:ring-0"
                />
                <span>Video</span>
              </label>
            </div>
          </div>

          {/* Caption textarea */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-gray-500">Caption</label>
            <textarea
              {...register('caption', { required: 'Caption is required' })}
              rows={4}
              placeholder="Write a caption for your post..."
              className="w-full text-sm bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2 outline-none focus:border-ig-blue dark:focus:border-ig-blue resize-none"
            />
            {errors.caption && (
              <p className="text-[10px] text-red-500 mt-1">{errors.caption.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 dark:border-zinc-800 text-xs font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createPostMutation.isPending}
              className="px-5 py-2 bg-ig-blue hover:bg-ig-hover-blue text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 transition"
            >
              {createPostMutation.isPending ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
