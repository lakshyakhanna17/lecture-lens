import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  Link as LinkIcon, 
  FileAudio, 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  BookOpen, 
  ArrowRight 
} from 'lucide-react';

export default function UploadModal({ isOpen, onClose, onUploadComplete, sampleLectures }) {
  const [activeMode, setActiveMode] = useState('file'); // 'file' | 'link' | 'sample'
  const [lectureTitle, setLectureTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);

  if (!isOpen) return null;

  const stages = [
    "Extracting audio & reducing ambient room reverberation...",
    "Transcribing speech with speaker diarization...",
    "Synthesizing structured executive summary & exam alerts...",
    "Formulating active-recall flashcards & test quiz..."
  ];

  const handleStartProcess = (customData = null) => {
    setIsProcessing(true);
    setCurrentStage(0);

    // Simulated animated pipeline
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < stages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            
            const newLecture = customData || {
              id: `lec-${Date.now()}`,
              code: courseCode || "GEN 101",
              title: lectureTitle || (fileName ? fileName.replace(/\.[^/.]+$/, "") : "Introduction to Neural Networks"),
              professor: "Dr. A. Turing",
              department: "Interdisciplinary Studies",
              duration: "38:40",
              durationSeconds: 2320,
              recordedDate: "Today",
              summary: {
                synopsis: `An automated summary generated from ${fileName || linkUrl || "uploaded recording"}. The lecture explores foundational concepts, core mechanisms, and real-world implications, emphasizing exam preparation and practical synthesis.`,
                keyTakeaways: [
                  {
                    badge: "Core Idea",
                    badgeColor: "indigo",
                    title: "First Principles Framing",
                    desc: "The instructor systematically derived fundamental equations and highlighted architectural trade-offs."
                  },
                  {
                    badge: "Crucial Nuance",
                    badgeColor: "amber",
                    title: "Common Pitfalls & Assumptions",
                    desc: "A common mistake students make is confusing correlation with causal mechanisms in distributed state models."
                  }
                ],
                examAlerts: [
                  "High probability exam question: Be prepared to derive the primary formula step-by-step.",
                  "Pay special attention to edge cases covered in the first 20 minutes."
                ],
                keyConcepts: [
                  { term: "Foundational Hypothesis", definition: "The primary theoretical assumption underlying the model presented in lecture." },
                  { term: "Convergence Criterion", definition: "The threshold condition required for system stability under varying load." }
                ],
                actionItems: [
                  { task: "Review practice derivation in notes", due: "Next Session", status: "Priority" },
                  { task: "Check supplementary slides on course portal", due: "Friday", status: "Recommended" }
                ]
              },
              transcript: [
                {
                  id: "gen-1",
                  time: "00:00",
                  seconds: 0,
                  speaker: "Professor",
                  text: "Welcome everyone. Let's begin today's lecture. We're going to dive into the core concepts and understand why this theory is essential for your upcoming exam.",
                  topic: "Introduction"
                },
                {
                  id: "gen-2",
                  time: "05:10",
                  seconds: 310,
                  speaker: "Professor",
                  text: "Notice that when you change this parameter, the system response is non-linear. Keep that in mind because it appears in problem set 3.",
                  topic: "Parameter Dynamics"
                },
                {
                  id: "gen-3",
                  time: "15:30",
                  seconds: 930,
                  speaker: "Student Question",
                  text: "Does this rule apply under boundary condition constraints?",
                  topic: "Q&A"
                },
                {
                  id: "gen-4",
                  time: "16:00",
                  seconds: 960,
                  speaker: "Professor",
                  text: "Yes, exactly! As long as the initial conditions are bounded, stability is guaranteed.",
                  topic: "Q&A Response"
                }
              ],
              revision: {
                flashcards: [
                  {
                    id: "gen-fc1",
                    topic: "Core Model",
                    front: "What is the primary governing equation discussed in this session?",
                    back: "The state transition function mapping initial inputs to bounded steady states.",
                    hint: "Review first 15 minutes of lecture.",
                    difficulty: "Medium"
                  },
                  {
                    id: "gen-fc2",
                    topic: "Exam Warning",
                    front: "What mistake do students frequently make with this topic?",
                    back: "Confusing steady-state equilibrium with transient dynamics.",
                    hint: "Mentioned during the Q&A segment.",
                    difficulty: "Hard"
                  }
                ],
                chapters: [
                  {
                    title: "1. Core Framework & Assumptions",
                    timestamp: "00:00 - 15:00",
                    summary: "Overview of basic terminology and framework constraints.",
                    keyPoints: ["Foundational equations", "Boundary constraints"]
                  },
                  {
                    title: "2. Real-world Case Study & Exam Tips",
                    timestamp: "15:00 - 38:40",
                    summary: "Detailed demonstration of practice problems and exam review.",
                    keyPoints: ["Midterm alert on problem set 3", "Interactive Q&A"]
                  }
                ],
                quiz: [
                  {
                    question: "Under what conditions does the model guarantee system stability?",
                    options: [
                      "Only when temperature is absolute zero",
                      "When initial state conditions are bounded",
                      "Only in single-node environments",
                      "Never"
                    ],
                    correctIndex: 1,
                    explanation: "As clarified in the student Q&A, bounded initial conditions ensure safe convergence."
                  }
                ],
                cheatSheet: `### Quick Revision Cheat Sheet
* **Primary Topic**: Core Foundations and Exam Review.
* **Key takeaway**: Always check boundary conditions before applying standard formulas.
* **Exam focus**: Practice question derivation from minute 15:30.`
              }
            };

            onUploadComplete(newLecture);
            onClose();
          }, 800);
          return prev;
        }
      });
    }, 1100);
  };

  const handleSelectPreloaded = (lec) => {
    onUploadComplete(lec);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity">
      <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Process Lecture Recording</h3>
              <p className="text-[11px] text-slate-500">Extract notes, transcripts & exam flashcards in seconds</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {isProcessing ? (
            /* Animated Processing State */
            <div className="py-8 text-center space-y-6">
              <div className="relative w-16 h-16 mx-auto">
                <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                <Sparkles className="w-6 h-6 text-indigo-600 absolute inset-0 m-auto" />
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Processing Lecture with AI...
                </h4>
                <p className="text-xs text-indigo-600 font-semibold mt-1">
                  {stages[currentStage]}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden max-w-xs mx-auto">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-700 ease-out"
                  style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
                />
              </div>

              <div className="text-[11px] text-slate-400">
                Step {currentStage + 1} of {stages.length} • Please wait a few seconds
              </div>
            </div>
          ) : (
            /* Upload Options Form */
            <div className="space-y-4">
              
              {/* Mode Switcher */}
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveMode('file')}
                  className={`py-2 rounded-lg transition-all ${
                    activeMode === 'file' 
                      ? 'bg-white text-indigo-600 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Audio/Video File
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode('link')}
                  className={`py-2 rounded-lg transition-all ${
                    activeMode === 'link' 
                      ? 'bg-white text-indigo-600 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Paste URL
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode('sample')}
                  className={`py-2 rounded-lg transition-all ${
                    activeMode === 'sample' 
                      ? 'bg-white text-indigo-600 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Quick Sample
                </button>
              </div>

              {/* MODE 1: FILE DRAG & DROP */}
              {activeMode === 'file' && (
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-indigo-50/20">
                    <input
                      type="file"
                      accept="audio/*,video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFileName(file.name);
                          if (!lectureTitle) setLectureTitle(file.name.replace(/\.[^/.]+$/, ""));
                        }
                      }}
                      className="hidden"
                      id="lecture-file-input"
                    />
                    <label htmlFor="lecture-file-input" className="cursor-pointer block">
                      <UploadCloud className="w-10 h-10 text-indigo-500 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-800">
                        {fileName ? fileName : "Click to select or drag audio/video recording"}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        MP3, WAV, M4A, MP4, WebM (up to 500MB)
                      </p>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Course Code</label>
                      <input
                        type="text"
                        placeholder="e.g. CS 301"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Lecture Topic / Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Distributed Consensus"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartProcess()}
                    disabled={!fileName && !lectureTitle}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Summary, Transcript & Revision</span>
                  </button>
                </div>
              )}

              {/* MODE 2: PASTE URL */}
              {activeMode === 'link' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Lecture Recording Link
                    </label>
                    <div className="relative">
                      <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        placeholder="Paste Zoom cloud recording, YouTube lecture, or Loom link..."
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Course Code & Topic (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. MATH 201: Multivariable Calculus"
                      value={lectureTitle}
                      onChange={(e) => setLectureTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    onClick={() => handleStartProcess()}
                    disabled={!linkUrl}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Import & Generate Revision Pack</span>
                  </button>
                </div>
              )}

              {/* MODE 3: SAMPLE QUICK LOAD */}
              {activeMode === 'sample' && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-500 mb-1">
                    Instantly preview LectureLens using curated university lecture recordings:
                  </p>
                  {sampleLectures.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => handleSelectPreloaded(s)}
                      className="p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-indigo-700">{s.code}</span>
                          <span className="text-[10px] text-slate-400">• {s.duration}</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 line-clamp-1">{s.title}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
