import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  AlertTriangle, 
  BookMarked, 
  Calendar, 
  Clock, 
  GraduationCap, 
  CheckSquare, 
  Square,
  FileDown,
  Printer
} from 'lucide-react';

export default function StructuredSummaryTab({ lecture }) {
  const [copied, setCopied] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState({});

  const summary = lecture.summary;

  const toggleTask = (index) => {
    setCheckedTasks(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleCopyMarkdown = () => {
    let md = `# ${lecture.code}: ${lecture.title}\n`;
    md += `Professor: ${lecture.professor} | Duration: ${lecture.duration} | Date: ${lecture.recordedDate}\n\n`;
    md += `## Executive Synopsis\n${summary.synopsis}\n\n`;
    md += `## Key Takeaways\n`;
    summary.keyTakeaways.forEach(kt => {
      md += `* **${kt.title}** (${kt.badge}): ${kt.desc}\n`;
    });
    md += `\n## Exam & Test Alerts\n`;
    summary.examAlerts.forEach(ea => {
      md += `* ⚠️ ${ea}\n`;
    });
    md += `\n## Core Concepts\n`;
    summary.keyConcepts.forEach(kc => {
      md += `* **${kc.term}**: ${kc.definition}\n`;
    });
    md += `\n## Action Items & Homework\n`;
    summary.actionItems.forEach(ai => {
      md += `* [ ] ${ai.task} (Due: ${ai.due})\n`;
    });

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    let text = `${lecture.code} - ${lecture.title}\nProfessor: ${lecture.professor}\nDate: ${lecture.recordedDate}\n\n`;
    text += `EXECUTIVE SYNOPSIS:\n${summary.synopsis}\n\n`;
    text += `KEY TAKEAWAYS:\n` + summary.keyTakeaways.map(t => `- [${t.badge}] ${t.title}: ${t.desc}`).join('\n') + '\n\n';
    text += `EXAM ALERTS:\n` + summary.examAlerts.map(a => `! ${a}`).join('\n') + '\n\n';
    text += `KEY CONCEPTS:\n` + summary.keyConcepts.map(c => `* ${c.term}: ${c.definition}`).join('\n') + '\n\n';
    text += `ACTION ITEMS:\n` + summary.actionItems.map(a => `[ ] ${a.task} (${a.due})`).join('\n');

    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${lecture.code}_Lecture_Summary.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 pb-24 max-w-5xl mx-auto">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
              {lecture.code}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
              {lecture.professor}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {lecture.recordedDate}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {lecture.duration}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {lecture.title}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sheet</span>
          </button>
        </div>
      </div>

      {/* Executive Synopsis */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/40 p-6 border border-indigo-100 shadow-xs">
        <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Executive Synopsis</span>
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
          {summary.synopsis}
        </p>
      </div>

      {/* Exam & Midterm Alerts (Crucial for students who miss points!) */}
      <div className="rounded-2xl bg-amber-50/60 border border-amber-200/80 p-5">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>High-Yield Exam Alerts & Common Pitfalls</span>
        </div>
        <ul className="space-y-2.5">
          {summary.examAlerts.map((alert, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-950 font-medium">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{alert}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Key Takeaways Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Structured Takeaways</span>
            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-semibold">
              {summary.keyTakeaways.length} Core Pillars
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summary.keyTakeaways.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 mb-2">
                  {item.badge}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Concepts Glossary */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-indigo-600" />
          <span>Core Concepts & Definitions</span>
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 overflow-hidden shadow-xs">
          {summary.keyConcepts.map((concept, idx) => (
            <div key={idx} className="p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
              <span className="text-xs font-bold text-indigo-600 font-mono tracking-tight block sm:inline-block sm:w-1/3 mb-1 sm:mb-0">
                {concept.term}
              </span>
              <span className="text-xs sm:text-sm text-slate-700 leading-relaxed block sm:inline-block sm:w-2/3">
                {concept.definition}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items & Lab Prep */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-emerald-600" />
          <span>Follow-up Action Items & Homework</span>
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-2.5 shadow-xs">
          {summary.actionItems.map((item, idx) => {
            const isDone = !!checkedTasks[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleTask(idx)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isDone 
                    ? 'bg-emerald-50/40 border-emerald-200 text-slate-400 line-through' 
                    : 'bg-slate-50/50 border-slate-200/60 hover:bg-slate-100/60 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className="text-xs sm:text-sm font-medium">{item.task}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 font-medium">Due: {item.due}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-200 text-slate-700">
                    {item.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
