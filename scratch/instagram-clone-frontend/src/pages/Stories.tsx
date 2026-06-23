import React, { useState } from 'react';
import { useActivityQuery } from '../hooks/useActivityQuery';
import { StoryCircle } from '../components/StoryCircle';
import { StoryViewer } from '../components/StoryViewer';
import { Tv, Compass, Heart } from 'lucide-react';

export const Stories: React.FC = () => {
  const { useGetStories } = useActivityQuery();
  const { data: stories, isLoading, error } = useGetStories();
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading stories.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold font-display tracking-tight text-gray-900 dark:text-white m-0">
          Stories Timeline
        </h1>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
          Click on any active circle to watch their latest shared clips or images.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ig-blue" />
        </div>
      ) : stories && stories.length > 0 ? (
        <div className="space-y-6">
          {/* Active Stories Tray Grid */}
          <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-wrap gap-6 items-center">
            {stories.map((story, index) => (
              <div key={story.id} className="flex flex-col items-center">
                <StoryCircle
                  story={story}
                  onClick={() => setActiveStoryIndex(index)}
                />
              </div>
            ))}
          </div>

          {/* Interactive info card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-ig-blue">
                <Tv size={18} />
                <span className="font-bold text-xs">Stories Guidelines</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed">
                Stories are transient photos or short videos that remain active for 24 hours. Users can view them as a slideshow. If you create a story, you can track views and reactions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-red-500">
                <Heart size={18} />
                <span className="font-bold text-xs">Reactions & Comments</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed">
                Interact with user stories by sending quick emoji reactions or text replies. Replies will be delivered directly to the user's direct messages inbox.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl py-20 flex flex-col items-center justify-center text-center space-y-3">
          <Compass size={36} className="text-gray-300" />
          <h3 className="font-bold text-sm">No stories available</h3>
          <p className="text-xs text-gray-400">All caught up! Check back later to see updates from your friends.</p>
        </div>
      )}

      {/* Story Viewer Slideshow Modal */}
      {activeStoryIndex !== null && stories && (
        <StoryViewer
          stories={stories}
          initialIndex={activeStoryIndex}
          onClose={() => setActiveStoryIndex(null)}
        />
      )}
    </div>
  );
};
