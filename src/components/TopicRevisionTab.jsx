import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  RotateCw, 
  Check, 
  X, 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  Shuffle, 
  CheckCircle2, 
  FileText,
  Clock,
  Printer
} from 'lucide-react';

export default function TopicRevisionTab({ lecture }) {
  const revision = lecture.revision || {};
  const [subTab, setSubTab] = useState('flashcards'); // 'flashcards' | 'quiz' | 'chapters' | 'cheatsheet'

  // Flashcards State
  const flashcards = revision.flashcards || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [masteredIds, setMasteredIds] = useState(new Set());

  // Quiz State
  const quiz = revision.quiz || [];
  const [userAnswers, setUserAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Flashcard Actions
  const currentCard = flashcards[currentIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const toggleMastered = (id) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Quiz Actions
  const handleSelectOption = (qIdx, optIdx) => {
    if (showQuizResults) return;
    setUserAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const handleFinishQuiz = () => {
    setShowQuizResults(true);
    // Calculate score
    let correctCount = 0;
    quiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) correctCount++;
    });

    if (correctCount >= Math.ceil(quiz.length * 0.75)) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowQuizResults(false);
  };

  const score = quiz.reduce((acc, q, idx) => {
    return acc + (userAnswers[idx] === q.correctIndex ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto">
      
      {/* Revision Sub-Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'flashcards', label: `Flashcards (${flashcards.length})`, icon: BookOpen },
            { id: 'quiz', label: `Knowledge Quiz (${quiz.length})`, icon: Award },
            { id: 'chapters', label: `Topic Chapters (${revision.chapters?.length || 0})`, icon: Clock },
            { id: 'cheatsheet', label: `Printable Cheat Sheet`, icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  active
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {subTab === 'flashcards' && (
          <div className="text-xs text-slate-500 font-semibold px-2 flex items-center gap-2">
            <span>Mastered:</span>
            <span className="text-emerald-600 font-bold">{masteredIds.size}</span>
            <span>/ {flashcards.length}</span>
          </div>
        )}
      </div>

      {/* SUBTAB 1: FLASHCARDS (Active Recall) */}
      {subTab === 'flashcards' && currentCard && (
        <div className="space-y-4">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
            <span>Card {currentIndex + 1} of {flashcards.length}</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[11px]">
              {currentCard.difficulty} Difficulty
            </span>
          </div>

          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
            />
          </div>

          {/* Interactive Flip Card */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer group relative min-h-[300px] sm:min-h-[340px] rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all p-8 flex flex-col justify-between"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                {currentCard.topic}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-indigo-600 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Click anywhere to flip</span>
              </span>
            </div>

            {/* Card Content (Front / Back) */}
            <div className="my-auto py-6">
              {!isFlipped ? (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Question / Concept</p>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {currentCard.front}
                  </h3>
                  
                  {showHint && (
                    <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                      💡 Hint: {currentCard.hint}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Core Takeaway & Answer
                  </p>
                  <div className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed whitespace-pre-line">
                    {currentCard.back}
                  </div>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium p-1"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
              </button>

              <button
                onClick={() => toggleMastered(currentCard.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                  masteredIds.has(currentCard.id)
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{masteredIds.has(currentCard.id) ? 'Mastered!' : 'Mark Mastered'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={handlePrevCard}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Card</span>
            </button>

            <button
              onClick={handleNextCard}
              className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
            >
              <span>Next Card</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* SUBTAB 2: KNOWLEDGE QUIZ */}
      {subTab === 'quiz' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Self-Test Knowledge Check
              </h3>
              <p className="text-xs text-slate-500">
                Reinforce what you learned and identify weak spots before exams.
              </p>
            </div>

            {showQuizResults && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200">
                  Score: {score} / {quiz.length} ({Math.round((score / quiz.length) * 100)}%)
                </span>
                <button
                  onClick={handleResetQuiz}
                  className="px-3 py-1.5 text-xs font-bold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Retry Quiz
                </button>
              </div>
            )}
          </div>

          {/* Quiz Questions */}
          <div className="space-y-4">
            {quiz.map((q, qIdx) => {
              const selectedAnswer = userAnswers[qIdx];
              const isAnswered = selectedAnswer !== undefined;
              const isCorrect = selectedAnswer === q.correctIndex;

              return (
                <div 
                  key={qIdx}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {qIdx + 1}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h4>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700";
                      
                      if (showQuizResults) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500";
                        } else if (optIdx === selectedAnswer && !isCorrect) {
                          btnStyle = "bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400";
                        } else {
                          btnStyle = "opacity-60 border-slate-200 text-slate-500";
                        }
                      } else if (selectedAnswer === optIdx) {
                        btnStyle = "bg-indigo-50 border-indigo-500 text-indigo-950 font-semibold ring-1 ring-indigo-500";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={showQuizResults}
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {showQuizResults && optIdx === q.correctIndex && (
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {showQuizResults && optIdx === selectedAnswer && !isCorrect && (
                            <X className="w-4 h-4 text-rose-500 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation on submit */}
                  {showQuizResults && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      <span className="font-bold text-slate-900 block mb-0.5">Explanation:</span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!showQuizResults && (
            <button
              onClick={handleFinishQuiz}
              disabled={Object.keys(userAnswers).length === 0}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all"
            >
              Check Answers & Grade Quiz
            </button>
          )}

        </div>
      )}

      {/* SUBTAB 3: CHAPTER BREAKDOWN */}
      {subTab === 'chapters' && (
        <div className="space-y-4">
          {revision.chapters?.map((chap, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {chap.title}
                </h3>
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-slate-100 text-slate-600">
                  {chap.timestamp}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {chap.summary}
              </p>
              <div className="border-t border-slate-100 pt-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Key Takeaway Bullets</span>
                <ul className="space-y-1.5">
                  {chap.keyPoints?.map((pt, pIdx) => (
                    <li key={pIdx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 4: PRINTABLE CHEAT SHEET */}
      {subTab === 'cheatsheet' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{lecture.code} • Quick Reference</span>
              <h2 className="text-xl font-extrabold text-slate-900">{lecture.title}</h2>
              <p className="text-xs text-slate-500">Curated high-yield notes for pre-exam review</p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Sheet</span>
            </button>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-800 font-sans">
            {revision.cheatSheet}
          </div>
        </div>
      )}

    </div>
  );
}

