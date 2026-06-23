import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onClose,
  isLoading = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-zinc-900">
          <div className="flex items-center space-x-2 text-red-500">
            <AlertTriangle size={18} />
            <span className="font-bold text-sm">{title}</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full text-gray-500">
            <X size={18} />
          </button>
        </div>

        {/* Message */}
        <div className="p-5">
          <p className="text-sm text-gray-600 dark:text-zinc-400">
            {message}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end space-x-3 px-5 pb-5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 dark:border-zinc-800 text-xs font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900/50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 transition"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};
