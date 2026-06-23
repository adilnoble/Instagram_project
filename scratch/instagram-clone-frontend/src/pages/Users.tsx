import React, { useState } from 'react';
import { useUsersQuery } from '../hooks/useUsersQuery';
import { User } from '../types';
import { UserModal } from '../components/UserModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { Search, UserPlus, Edit2, Trash2, Eye, ShieldCheck, UserX } from 'lucide-react';

export const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [detailUser, setDetailUser] = useState<User | null>(null);

  const { useGetUsers, useDeleteUser } = useUsersQuery();
  const { data: users, isLoading, error } = useGetUsers(searchTerm);
  const deleteMutation = useDeleteUser();

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedUser(null);
    setIsUserModalOpen(true);
  };

  const handleDeleteClick = (userId: string) => {
    setUserIdToDelete(userId);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userIdToDelete) {
      deleteMutation.mutate(userIdToDelete, {
        onSuccess: () => {
          setIsConfirmOpen(false);
          setUserIdToDelete(null);
          if (detailUser?.id === userIdToDelete) setDetailUser(null);
        }
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-gray-900 dark:text-white m-0">
            User Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Search, view, update status, and manage system user records.
          </p>
        </div>
        <button
          onClick={handleCreateClick}
          className="flex items-center space-x-2 px-4 py-2 bg-ig-blue hover:bg-ig-hover-blue text-white rounded-lg text-xs font-semibold shadow-sm transition active:scale-95 self-start"
        >
          <UserPlus size={16} />
          <span>Add User</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md w-full">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          <Search size={16} />
        </span>
        <input
          type="text"
          placeholder="Search by username, email, phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:border-ig-blue dark:focus:border-ig-blue"
        />
      </div>

      {error ? (
        <div className="text-red-500 py-4 text-center">Error fetching users.</div>
      ) : isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ig-blue" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table Container */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 dark:bg-zinc-900/50 text-gray-400 dark:text-zinc-500 uppercase tracking-wider font-semibold border-b border-gray-200 dark:border-zinc-800">
                    <th className="px-5 py-3">Username</th>
                    <th className="px-5 py-3">Role</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                  {users && users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-900/30">
                        <td className="px-5 py-3">
                          <div>
                            <span className="font-bold text-gray-800 dark:text-zinc-100">@{user.username}</span>
                            <span className="block text-[10px] text-gray-400 truncate max-w-[150px]">{user.email}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 font-medium">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            user.role === 'Admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400' : 'bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-400'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`flex items-center space-x-1 font-semibold ${
                            user.status === 'active' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span>{user.status === 'active' ? 'Active' : 'Suspended'}</span>
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right space-x-2">
                          <button
                            onClick={() => setDetailUser(user)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                            title="View details"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => handleEditClick(user)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded text-gray-500 dark:text-zinc-400 hover:text-ig-blue dark:hover:text-ig-blue"
                            title="Edit User"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user.id)}
                            className="p-1 hover:bg-red-50 dark:hover:bg-red-950/20 rounded text-gray-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400"
                            title="Delete User"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-gray-400">
                        No users match this criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Details Sidebar */}
          <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-sm mb-4 text-gray-900 dark:text-white">User Inspector</h3>
            {detailUser ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-gray-100 dark:border-zinc-850">
                  <div className="instagram-gradient p-2.5 rounded-full text-white">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">@{detailUser.username}</h4>
                    <p className="text-[10px] text-gray-400">ID: {detailUser.id}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-gray-400 dark:text-zinc-500 font-medium block">Email Address</span>
                    <span className="font-semibold text-gray-800 dark:text-zinc-200">{detailUser.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 dark:text-zinc-500 font-medium block">Phone Number</span>
                    <span className="font-semibold text-gray-800 dark:text-zinc-200">{detailUser.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 dark:text-zinc-500 font-medium block">Registration Date</span>
                    <span className="font-semibold text-gray-800 dark:text-zinc-200">
                      {new Date(detailUser.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 dark:text-zinc-500 font-medium block">Role Privilege</span>
                    <span className="font-semibold text-gray-800 dark:text-zinc-200">{detailUser.role}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400 space-y-2">
                <UserX size={32} className="text-gray-300" />
                <p className="text-xs">Select a user from the list to view their detailed metrics.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* User Actions Modal */}
      <UserModal
        user={selectedUser}
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Confirm User Deletion"
        message="Are you sure you want to delete this user? This will also remove their profile and cannot be undone."
        onConfirm={handleConfirmDelete}
        onClose={() => setIsConfirmOpen(false)}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
