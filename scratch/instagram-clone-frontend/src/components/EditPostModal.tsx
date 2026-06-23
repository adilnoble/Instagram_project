import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Post } from '../types';
import { usePostsQuery } from '../hooks/usePostsQuery';
import { X } from 'lucide-react';

interface EditPostForm {
  caption: string;
}

interface EditPostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditPostModal: React.FC<EditPostModalProps> = ({ post, isOpen, onClose }) => {
  const { useUpdatePost } = usePostsQuery();
  const updateMutation = useUpdatePost();
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<EditPostForm>();

  useEffect(() => {
    if (post) {
      setValue('caption', post.caption);
    }
  }, [post, setValue]);

  if (!isOpen || !post) return null;

  const onSubmit = (data: EditPostForm) => {
    updateMutation.mutate({
      id: post.id,
      data: { caption: data.caption }
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
          <span className="font-bold text-sm">Edit caption</span>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full text-gray-500">
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          
          {/* Caption textarea */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-gray-500">Caption</label>
            <textarea
              {...register('caption', { required: 'Caption is required' })}
              rows={4}
              placeholder="Update your post caption..."
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
              disabled={updateMutation.isPending}
              className="px-5 py-2 bg-ig-blue hover:bg-ig-hover-blue text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 transition"
            >
              {updateMutation.isPending ? 'Updating...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
