import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Maximize2
} from 'lucide-react';

export default function PlayerBar({
  currentTime,
  onSeek,
  durationSeconds,
  isPlaying,
  onTogglePlay,
  currentLecture
}) {
  const [speed, setSpeed] = useState(1);
  const [muted, setMuted] = useState(false);

  // Auto-advance simulated playback
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        onSeek((prev) => {
          if (prev >= durationSeconds) {
            onTogglePlay(false);
            return 0;
          }
          return Math.min(prev + 1, durationSeconds);
        });
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, durationSeconds, onSeek, onTogglePlay]);

  // Format seconds into MM:SS or HH:MM:SS
  const formatTime = (secs) => {
    const s = Math.floor(secs);
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const remSecs = s % 60;
    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${remSecs < 10 ? '0' : ''}${remSecs}`;
    }
    return `${mins}:${remSecs < 10 ? '0' : ''}${remSecs}`;
  };

  const speeds = [0.75, 1, 1.25, 1.5, 2];

  // Determine current active transcript topic or speaker
  const currentSegment = currentLecture?.transcript?.slice().reverse().find(
    (item) => item.seconds <= currentTime
  ) || currentLecture?.transcript?.[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-2xl py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        
        {/* Lecture Meta & Active Segment */}
        <div className="flex items-center gap-3 w-full sm:w-1/4 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-600 font-bold text-xs">
            {currentLecture.code}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-900 truncate">
              {currentLecture.title}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate mt-0.5">
              <span className="font-medium text-indigo-600">{currentSegment?.speaker || currentLecture.professor}</span>
              <span>•</span>
              <span className="truncate">{currentSegment?.topic || 'Lecture'}</span>
            </div>
          </div>
        </div>

        {/* Center: Controls & Scrubber */}
        <div className="flex flex-col items-center gap-1.5 w-full sm:w-2/4">
          
          <div className="flex items-center gap-3 sm:gap-4">
            {/* -10s button */}
            <button
              onClick={() => onSeek((prev) => Math.max(0, prev - 10))}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Rewind 10s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Play / Pause button */}
            <button
              onClick={() => onTogglePlay(!isPlaying)}
              className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md shadow-indigo-600/30 transition-transform active:scale-95"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            {/* +10s button */}
            <button
              onClick={() => onSeek((prev) => Math.min(durationSeconds, prev + 10))}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Forward 10s"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Time Scrubber */}
          <div className="w-full flex items-center gap-2 text-[11px] font-mono text-slate-500">
            <span className="w-11 text-right">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={durationSeconds}
              value={currentTime}
              onChange={(e) => onSeek(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700"
            />
            <span className="w-11">{formatTime(durationSeconds)}</span>
          </div>

        </div>

        {/* Right: Speed & Volume */}
        <div className="flex items-center justify-end gap-3 w-full sm:w-1/4">
          
          {/* Speed Selector */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-[11px] font-medium text-slate-600">
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-1.5 py-0.5 rounded ${
                  speed === s
                    ? 'bg-white text-indigo-600 font-bold shadow-xs'
                    : 'hover:text-slate-900'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Mute button */}
          <button
            onClick={() => setMuted(!muted)}
            className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors"
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
          </button>

        </div>

      </div>
    </div>
  );
}
