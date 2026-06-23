import React, { useState, useEffect, useRef } from 'react';
import { useActivityQuery } from '../hooks/useActivityQuery';
import { ReelCard } from '../components/ReelCard';
import { Film } from 'lucide-react';

export const Reels: React.FC = () => {
  const { useGetReels } = useActivityQuery();
  const { data: reels, isLoading, error } = useGetReels();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !reels || reels.length === 0) return;

    const observerOptions = {
      root: container,
      rootMargin: '0px',
      threshold: 0.6, // Reel is active if 60% of it is visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const childNodes = container.querySelectorAll('.reel-slide');
    childNodes.forEach((node) => observer.observe(node));

    return () => {
      childNodes.forEach((node) => observer.unobserve(node));
      observer.disconnect();
    };
  }, [reels]);

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading reels feed.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center animate-fadeIn">
      {/* Page Title */}
      <div className="w-full max-w-[420px] mb-4 flex items-center justify-between px-2 sm:px-0">
        <div className="flex items-center space-x-2">
          <Film size={20} className="text-gray-900 dark:text-white" />
          <span className="font-bold text-sm tracking-tight text-gray-900 dark:text-white">Reels Feed</span>
        </div>
        <span className="text-[10px] text-gray-400">Scroll to view</span>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ig-blue" />
        </div>
      ) : reels && reels.length > 0 ? (
        /* Vertical Scroll Snapped Container */
        <div
          ref={containerRef}
          className="reel-scroll-container w-full max-w-[420px] rounded-none sm:rounded-xl shadow-inner bg-zinc-950 flex flex-col items-center"
        >
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              data-index={index}
              className="reel-slide w-full flex justify-center"
            >
              <ReelCard
                reel={reel}
                isActive={index === activeIndex}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          No reels found.
        </div>
      )}
    </div>
  );
};
