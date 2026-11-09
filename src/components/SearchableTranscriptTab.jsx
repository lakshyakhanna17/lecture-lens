import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Play, 
  Copy, 
  Check, 
  User, 
  Filter, 
  Clock, 
  Sparkles,
  ArrowDownCircle
} from 'lucide-react';

export default function SearchableTranscriptTab({ 
  lecture, 
  currentTime, 
  onSeekToTime,
  onStartPlayback 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState('ALL');
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);

  const transcript = lecture.transcript || [];

  // Extract unique speakers & topics for filtering
  const speakers = useMemo(() => {
    const list = Array.from(new Set(transcript.map(s => s.speaker)));
    return ['ALL', ...list];
  }, [transcript]);

  const topics = useMemo(() => {
    const list = Array.from(new Set(transcript.map(s => s.topic).filter(Boolean)));
    return ['ALL', ...list];
  }, [transcript]);

  // Filter segments based on search query, speaker, and topic
  const filteredSegments = useMemo(() => {
    return transcript.filter(item => {
      const matchSearch = searchQuery.trim() === '' || 
        item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.topic && item.topic.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchSpeaker = selectedSpeaker === 'ALL' || item.speaker === selectedSpeaker;
      const matchTopic = selectedTopic === 'ALL' || item.topic === selectedTopic;

      return matchSearch && matchSpeaker && matchTopic;
    });
  }, [transcript, searchQuery, selectedSpeaker, selectedTopic]);

  // Current playing segment index
  const activeSegmentId = useMemo(() => {
    const sorted = [...transcript].sort((a, b) => b.seconds - a.seconds);
    const current = sorted.find(s => s.seconds <= currentTime);
    return current ? current.id : transcript[0]?.id;
  }, [transcript, currentTime]);

  const handleCopyQuote = (item) => {
    const textToCopy = `[${item.time}] ${item.speaker}: "${item.text}"`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSeekAndPlay = (seconds) => {
    onSeekToTime(seconds);
    if (onStartPlayback) onStartPlayback(true);
  };

  // Helper to highlight matching search words
  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 text-slate-900 rounded-xs px-0.5 font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="space-y-4 pb-24 max-w-4xl mx-auto">
      
      {/* Sticky Search and Filter Controls */}
      <div className="sticky top-16 z-20 bg-slate-50/95 backdrop-blur-md pt-2 pb-3 border-b border-slate-200">
        
        {/* Search Input Bar */}
        <div className="relative mb-2.5">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transcript by keywords, concepts, or speakers (e.g. 'quorum', 'split-brain', 'election')..."
            className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs text-slate-900 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <span className="text-slate-400 flex items-center gap-1 font-semibold text-[11px] uppercase tracking-wider shrink-0">
              <Filter className="w-3 h-3" /> Filter:
            </span>

            {/* Speaker chips */}
            {speakers.map(spk => (
              <button
                key={spk}
                onClick={() => setSelectedSpeaker(spk)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  selectedSpeaker === spk
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {spk === 'ALL' ? 'All Speakers' : spk}
              </button>
            ))}
          </div>

          {/* Search result count */}
          <div className="text-[11px] text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{filteredSegments.length}</span> of {transcript.length} segments
          </div>

        </div>

        {/* Topics Chips */}
        {topics.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 text-[11px]">
            <span className="text-slate-400 font-semibold text-[10px] uppercase shrink-0">Topic:</span>
            {topics.map(top => (
              <button
                key={top}
                onClick={() => setSelectedTopic(top)}
                className={`px-2 py-0.5 rounded-md font-medium transition-colors shrink-0 ${
                  selectedTopic === top
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-200/60 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {top === 'ALL' ? 'All Topics' : top}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* Transcript Segments List */}
      {filteredSegments.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No matching statements found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or reset your speaker and topic filters.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedSpeaker('ALL'); setSelectedTopic('ALL'); }}
            className="mt-4 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSegments.map((item) => {
            const isActive = item.id === activeSegmentId;
            const isProfessor = item.speaker.toLowerCase().includes('prof') || item.speaker.toLowerCase().includes('dr.');

            return (
              <div
                key={item.id}
                id={`seg-${item.id}`}
                className={`group relative p-4 sm:p-5 rounded-2xl border transition-all ${
                  isActive
                    ? 'bg-indigo-50/70 border-indigo-300 shadow-sm ring-1 ring-indigo-400/40'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  
                  {/* Left: Timestamp pill & Speaker */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleSeekAndPlay(item.seconds)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600'
                      }`}
                      title="Jump playback to this moment"
                    >
                      <Play className={`w-3 h-3 ${isActive ? 'fill-current' : ''}`} />
                      <span>{item.time}</span>
                    </button>

                    {/* Speaker badge */}
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md ${
                      isProfessor
                        ? 'bg-indigo-100/70 text-indigo-900'
                        : 'bg-emerald-100/70 text-emerald-900'
                    }`}>
                      <User className="w-3 h-3 opacity-60" />
                      {item.speaker}
                    </span>

                    {/* Topic tag */}
                    {item.topic && (
                      <span className="text-[11px] text-slate-400 font-medium">
                        • {item.topic}
                      </span>
                    )}
                  </div>

                  {/* Right: Copy segment button */}
                  <button
                    onClick={() => handleCopyQuote(item)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all text-xs flex items-center gap-1"
                    title="Copy statement with timestamp"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                </div>

                {/* Spoken Text */}
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isActive ? 'text-indigo-950 font-medium' : 'text-slate-700'
                }`}>
                  {highlightMatch(item.text, searchQuery)}
                </p>

                {isActive && (
                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-indigo-600 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                    <span>Currently Playing Audio Segment</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

