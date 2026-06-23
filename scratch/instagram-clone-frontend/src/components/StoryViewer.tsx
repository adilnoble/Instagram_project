import React, { useEffect, useState } from 'react';
import { Story } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryViewerProps {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ stories, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);

  const story = stories[currentIndex];

  useEffect(() => {
    // Reset progress when index changes
    setProgress(0);
  }, [currentIndex]);

  useEffect(() => {
    // Tick progress bar by 2% every 100ms (completes in 5 seconds)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      // Loop or reset progress
      setProgress(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  if (!story) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-0 sm:p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 p-2 focus:outline-none"
      >
        <X size={28} />
      </button>

      {/* Main Story Card */}
      <div className="relative w-full max-w-[420px] h-full sm:h-[80vh] sm:rounded-xl overflow-hidden bg-zinc-950 flex flex-col justify-between shadow-2xl">
        
        {/* Top Progress & Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 to-transparent z-40">
          
          {/* Progress Indicators */}
          <div className="flex space-x-1.5 mb-3">
            {stories.map((_, idx) => (
              <div key={idx} className="flex-1 h-[3px] bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{
                    width:
                      idx < currentIndex
                        ? '100%'
                        : idx === currentIndex
                        ? `${progress}%`
                        : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Profile Header */}
          <div className="flex items-center space-x-3 text-white">
            <img
              src={story.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
              alt={story.username}
              className="w-9 h-9 rounded-full object-cover border border-white/20"
            />
            <span className="font-semibold text-sm">{story.username}</span>
            <span className="text-xs text-white/50">
              {new Date(story.created_at).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Arrows */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="hidden sm:flex absolute left-[-60px] top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-zinc-900/80 text-white hover:bg-zinc-800 disabled:opacity-30 border border-white/10"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={handleNext}
          className="hidden sm:flex absolute right-[-60px] top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-zinc-900/80 text-white hover:bg-zinc-800 border border-white/10"
        >
          <ChevronRight size={24} />
        </button>

        {/* Tappable Left/Right Half Viewport Controls (Mobile Friendly) */}
        <div className="absolute inset-0 z-20 flex">
          <div onClick={handlePrev} className="w-1/2 h-full cursor-w-resize" />
          <div onClick={handleNext} className="w-1/2 h-full cursor-e-resize" />
        </div>

        {/* Story Media */}
        <div className="w-full h-full flex items-center justify-center bg-black">
          {story.media_type === 'video' ? (
            <video
              src={story.media_url}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={story.media_url}
              alt="Story Media Content"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};
