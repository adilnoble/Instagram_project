import React, { useRef, useState, useEffect } from 'react';
import { Reel } from '../types';
import { useActivityQuery } from '../hooks/useActivityQuery';
import { Heart, MessageCircle, Volume2, VolumeX, Music } from 'lucide-react';

interface ReelCardProps {
  reel: Reel;
  isActive: boolean;
}

export const ReelCard: React.FC<ReelCardProps> = ({ reel, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const { useLikeReel } = useActivityQuery();
  const likeMutation = useLikeReel();

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log('Autoplay blocked:', err));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.error(err));
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMute = !isMuted;
      videoRef.current.muted = nextMute;
      setIsMuted(nextMute);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    likeMutation.mutate(reel.id);
  };

  return (
    <div className="reel-slide relative w-full max-w-[420px] aspect-[9/16] bg-zinc-950 rounded-none sm:rounded-xl overflow-hidden flex items-center justify-center shadow-xl select-none group border border-gray-100 dark:border-zinc-900">
      
      {/* Background/Base Video */}
      <video
        ref={videoRef}
        src={reel.video_url}
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Play/Pause overlay indicator */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer z-10"
        >
          <span className="bg-black/50 p-4 rounded-full text-white text-sm font-semibold select-none">
            Paused
          </span>
        </div>
      )}

      {/* Sound Controller overlay */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 bg-black/45 p-2 rounded-full text-white hover:bg-black/75 z-20 transition"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* Right Column Icons (Likes, Comments) */}
      <div className="absolute right-4 bottom-16 flex flex-col space-y-5 z-20 text-white items-center">
        
        {/* Like Button */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center space-y-1 group active:scale-125 transition-transform"
        >
          <div className={`p-3 rounded-full bg-black/45 hover:bg-black/75 transition ${
            reel.is_liked ? 'text-red-500' : 'text-white'
          }`}>
            <Heart size={22} className={reel.is_liked ? 'fill-red-500' : ''} />
          </div>
          <span className="text-xs font-semibold shadow-sm">{reel.likes_count.toLocaleString()}</span>
        </button>

        {/* Comment Button */}
        <div className="flex flex-col items-center space-y-1">
          <div className="p-3 rounded-full bg-black/45 hover:bg-black/75 text-white transition cursor-pointer">
            <MessageCircle size={22} />
          </div>
          <span className="text-xs font-semibold shadow-sm">{reel.comments_count.toLocaleString()}</span>
        </div>

        {/* Vinyl Disc Spin Animation */}
        <div className="w-8 h-8 rounded-full border-2 border-white/80 bg-zinc-800 flex items-center justify-center animate-spin-slow">
          <Music size={12} className="text-white" />
        </div>
      </div>

      {/* Bottom Info Details */}
      <div className="absolute left-4 bottom-4 right-16 z-20 text-white flex flex-col space-y-3 p-2 bg-gradient-to-t from-black/80 to-transparent rounded-lg">
        
        {/* Profile Card Header */}
        <div className="flex items-center space-x-2">
          <img
            src={reel.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
            alt={reel.username}
            className="w-8 h-8 rounded-full object-cover border border-white/20"
          />
          <span className="font-semibold text-sm">@{reel.username}</span>
          <button className="text-xs font-bold border border-white/40 px-2 py-0.5 rounded-md hover:bg-white/10 active:scale-95 transition">
            Follow
          </button>
        </div>

        {/* Caption */}
        <p className="text-xs line-clamp-2 leading-relaxed">
          {reel.caption}
        </p>

        {/* Audio tag */}
        <div className="flex items-center space-x-2 text-[10px] text-white/80">
          <Music size={10} />
          <span className="truncate">Original Audio &bull; {reel.username}</span>
        </div>
      </div>
    </div>
  );
};
