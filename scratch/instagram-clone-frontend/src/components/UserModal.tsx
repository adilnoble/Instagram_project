import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../types';
import { useUsersQuery } from '../hooks/useUsersQuery';
import { X } from 'lucide-react';

interface UserFormInput {
  username: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'suspended';
}

interface UserModalProps {
  user: User | null; // Null means create mode, otherwise edit mode
  isOpen: boolean;
  onClose: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose }) => {
  const { useCreateUser, useUpdateUser } = useUsersQuery();
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<UserFormInput>({
    defaultValues: {
      role: 'User',
      status: 'active'
    }
  });

  useEffect(() => {
    if (user) {
      setValue('username', user.username);
      setValue('email', user.email);
      setValue('phone', user.phone || '');
      setValue('role', user.role || 'User');
      setValue('status', user.status || 'active');
    } else {
      reset({
        username: '',
        email: '',
        phone: '',
        role: 'User',
        status: 'active'
      });
    }
  }, [user, setValue, reset]);

  if (!isOpen) return null;

  const onSubmit = (data: UserFormInput) => {
    if (user) {
      updateMutation.mutate({
        id: user.id,
        data: {
          username: data.username,
          email: data.email,
          phone: data.phone,
          role: data.role,
          status: data.status
        }
      }, {
        onSuccess: () => {
          onClose();
        }
      });
    } else {
      createMutation.mutate({
        username: data.username,
        email: data.email,
        phone: data.phone,
        role: data.role,
        status: data.status
      }, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-zinc-900">
          <span className="font-bold text-sm">{user ? 'Edit User Details' : 'Create New User'}</span>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full text-gray-500">
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          
          {/* Username */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-gray-500">Username</label>
            <input
              type="text"
              {...register('username', { required: 'Username is required' })}
              placeholder="e.g. janesmith"
              className="w-full text-sm bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2 outline-none focus:border-ig-blue dark:focus:border-ig-blue"
            />
            {errors.username && (
              <p className="text-[10px] text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-gray-500">Email Address</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="e.g. jane@example.com"
              className="w-full text-sm bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2 outline-none focus:border-ig-blue dark:focus:border-ig-blue"
            />
            {errors.email && (
              <p className="text-[10px] text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-gray-500">Phone Number</label>
            <input
              type="text"
              {...register('phone')}
              placeholder="e.g. +1 (555) 019-2834"
              className="w-full text-sm bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2 outline-none focus:border-ig-blue dark:focus:border-ig-blue"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Role selection */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-gray-500">User Role</label>
              <select
                {...register('role')}
                className="w-full text-sm bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2 outline-none focus:border-ig-blue dark:focus:border-ig-blue"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Status selection */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-gray-500">Account Status</label>
              <select
                {...register('status')}
                className="w-full text-sm bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2 outline-none focus:border-ig-blue dark:focus:border-ig-blue"
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
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
              disabled={isPending}
              className="px-5 py-2 bg-ig-blue hover:bg-ig-hover-blue text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 transition"
            >
              {isPending ? 'Saving...' : user ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
