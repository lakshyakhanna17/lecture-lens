import React from 'react';
import { 
  Sparkles, 
  Upload, 
  BookOpen, 
  ChevronDown, 
  FileText, 
  Headphones,
  CheckCircle2
} from 'lucide-react';

export default function Navbar({ 
  lectures, 
  currentLecture, 
  onSelectLecture, 
  onOpenUpload,
  activeTab,
  setActiveTab
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Product Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-bold text-xl">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent">
                  LectureLens
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  AI Study Copilot
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Convert recordings into summaries, transcripts & revision
              </p>
            </div>
          </div>

          {/* Lecture Switcher Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative group">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-xs sm:text-sm font-medium text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-semibold text-slate-900 hidden md:inline">{currentLecture.code}:</span>
                <span className="truncate max-w-[140px] sm:max-w-[200px]">{currentLecture.title}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform" />
              </div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-1 w-72 sm:w-80 rounded-xl bg-white shadow-xl border border-slate-200 p-2 hidden group-hover:block transition-all z-50">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-1">
                  Switch Lecture
                </p>
                {lectures.map((lec) => (
                  <button
                    key={lec.id}
                    onClick={() => onSelectLecture(lec)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all flex items-start gap-2.5 ${
                      lec.id === currentLecture.id 
                        ? 'bg-indigo-50 text-indigo-900 font-semibold' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="mt-0.5">
                      {lec.id === currentLecture.id ? (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900">{lec.code}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {lec.duration}
                        </span>
                      </div>
                      <p className="text-slate-600 font-normal line-clamp-1 mt-0.5">{lec.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Button */}
            <button
              onClick={onOpenUpload}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-indigo-500/25 transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Lecture</span>
            </button>
          </div>

        </div>

        {/* Navigation Tabs for Mobile / Compact */}
        <div className="flex items-center gap-1 border-t border-slate-100 pt-1 pb-2 sm:hidden overflow-x-auto">
          {[
            { id: 'summary', label: 'Summary', icon: FileText },
            { id: 'transcript', label: 'Transcript', icon: Headphones },
            { id: 'revision', label: 'Revision & Quiz', icon: BookOpen }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 ${
                  active 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
