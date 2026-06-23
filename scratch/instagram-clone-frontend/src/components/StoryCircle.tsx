import React from 'react';
import { Story } from '../types';

interface StoryCircleProps {
  story: Story;
  onClick: () => void;
}

export const StoryCircle: React.FC<StoryCircleProps> = ({ story, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center space-y-1.5 focus:outline-none group active:scale-95 transition-transform duration-100"
    >
      <div className="story-ring-active p-[2px] rounded-full">
        <div className="bg-white dark:bg-black p-[2px] rounded-full transition-colors duration-300">
          <img
            src={story.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
            alt={story.username}
            className="w-14 h-14 rounded-full object-cover border border-gray-100 dark:border-zinc-800"
          />
        </div>
      </div>
      <span className="text-[11px] font-medium text-gray-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white truncate max-w-[70px]">
        {story.username}
      </span>
    </button>
  );
};
