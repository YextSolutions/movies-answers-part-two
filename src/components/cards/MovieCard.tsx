import React, { useState, useRef, useEffect } from 'react';
import { Pause, Play, Volume2, VolumeX, X } from "lucide-react";

export default function FilmStage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  if (!isVisible) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <button 
          onClick={() => setIsVisible(true)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg font-medium"
        >
          Reopen Film Stage
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 p-4 md:p-8 font-sans">
      <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/20 ring-1 ring-white/10 group">
        
        {/* Top Action Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white/90 font-medium tracking-wide text-sm px-2 bg-black/50 rounded-md py-1">
            Grok Video Player
          </span>
          <button 
            onClick={() => setIsVisible(false)} 
            className="text-white/70 hover:text-rose-400 hover:bg-white/10 p-2 rounded-full transition-all"
            aria-label="Close video"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Placeholder Area */}
        <div 
          className="aspect-video w-full bg-zinc-900 flex items-center justify-center cursor-pointer relative"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <video 
            ref={videoRef}
            src="bGVnYWN5_f2e21fbf-eeaf-46f1-b74c-ef24abba1007" 
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            playsInline
          />
          
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
               <div className="bg-indigo-600/90 p-4 rounded-full text-white shadow-[0_0_30px_rgba(79,70,229,0.5)] transform transition-transform hover:scale-110">
                  <Play size={40} className="ml-1" />
               </div>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-4 cursor-pointer hover:h-2 transition-all">
            <div 
              className="h-full bg-indigo-500 rounded-full relative" 
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transform scale-0 group-hover:scale-100 transition-transform"></div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }} 
              className="text-white hover:text-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <div className="flex items-center gap-3 group/volume">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }} 
                className="text-white hover:text-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              {/* Volume Slider (Visual only for mock) */}
              <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300 ease-in-out">
                <div className="h-1 bg-white/20 rounded-full w-20">
                   <div className="h-full bg-white rounded-full w-2/3"></div>
                </div>
              </div>
            </div>
            
            <div className="flex-1"></div>
            
            <span className="text-white/70 text-xs font-medium font-mono">
              Live Preview
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
}
