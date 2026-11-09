import React, { useState } from 'react';
import { 
  FileText, 
  Headphones, 
  BookOpen, 
  Sparkles, 
  Share2, 
  Search, 
  ExternalLink,
  Flame,
  CheckCircle2,
  Clock
} from 'lucide-react';

import { SAMPLE_LECTURES } from './data/sampleLectures';
import Navbar from './components/Navbar';
import PlayerBar from './components/PlayerBar';
import StructuredSummaryTab from './components/StructuredSummaryTab';
import SearchableTranscriptTab from './components/SearchableTranscriptTab';
import TopicRevisionTab from './components/TopicRevisionTab';
import UploadModal from './components/UploadModal';

export default function App() {
  const [lectures, setLectures] = useState(SAMPLE_LECTURES);
  const [currentLecture, setCurrentLecture] = useState(SAMPLE_LECTURES[0]);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'transcript' | 'revision'
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Audio Playback simulation state
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle switching lectures
  const handleSelectLecture = (lec) => {
    setCurrentLecture(lec);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  // Handle newly uploaded lecture
  const handleUploadComplete = (newLecture) => {
    setLectures((prev) => [newLecture, ...prev]);
    setCurrentLecture(newLecture);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  // Handle seeking time from transcript
  const handleSeek = (timeOrUpdater) => {
    if (typeof timeOrUpdater === 'function') {
      setCurrentTime(timeOrUpdater);
    } else {
      setCurrentTime(timeOrUpdater);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        lectures={lectures}
        currentLecture={currentLecture}
        onSelectLecture={handleSelectLecture}
        onOpenUpload={() => setIsUploadOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Navigation Tab Bar (Desktop / Tablet) */}
        <div className="hidden sm:flex items-center justify-between border-b border-slate-200/90 pb-3 mb-6">
          <div className="flex items-center gap-2">
            {[
              {
                id: 'summary',
                label: 'Structured Summary',
                icon: FileText,
                badge: `${currentLecture.summary?.keyTakeaways?.length || 0} Takeaways`
              },
              {
                id: 'transcript',
                label: 'Searchable Transcript',
                icon: Headphones,
                badge: `${currentLecture.transcript?.length || 0} Segments`
              },
              {
                id: 'revision',
                label: 'Topic-wise Revision',
                icon: BookOpen,
                badge: `${currentLecture.revision?.flashcards?.length || 0} Cards + Quiz`
              }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200/70 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick study mode badge */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Study Assistant Active</span>
          </div>
        </div>

        {/* Tab Views */}
        <div>
          {activeTab === 'summary' && (
            <StructuredSummaryTab lecture={currentLecture} />
          )}

          {activeTab === 'transcript' && (
            <SearchableTranscriptTab
              lecture={currentLecture}
              currentTime={currentTime}
              onSeekToTime={handleSeek}
              onStartPlayback={(play) => setIsPlaying(play)}
            />
          )}

          {activeTab === 'revision' && (
            <TopicRevisionTab lecture={currentLecture} />
          )}
        </div>

      </main>

      {/* Floating Bottom Audio Player Bar */}
      <PlayerBar
        currentTime={currentTime}
        onSeek={handleSeek}
        durationSeconds={currentLecture.durationSeconds || 1800}
        isPlaying={isPlaying}
        onTogglePlay={setIsPlaying}
        currentLecture={currentLecture}
      />

      {/* Upload & Processing Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadComplete={handleUploadComplete}
        sampleLectures={lectures}
      />

    </div>
  );
}
