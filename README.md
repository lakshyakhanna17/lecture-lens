# LectureLens 🎓⚡

> **Turn uploaded lecture recordings into structured summaries, searchable transcripts, and topic-wise revision material.**  
> Designed for students who miss crucial points during fast-paced college lectures.

[![Deployment Ready](https://img.shields.io/badge/Deployment-Ready-emerald)](https://vercel.com)
[![React 18](https://img.shields.io/badge/React-18.3-blue)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.x-purple)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)](https://tailwindcss.com)

---

## 💡 The Problem & The Solution

**The Problem**: During 60–90 minute university lectures, students frequently miss critical nuances, exam warnings, and core proofs due to cognitive overload, fast-talking professors, or momentary lapses in attention.

**The Solution**: **LectureLens** takes lecture audio/video recordings and instantly synthesizes them into three focused, study-optimized surfaces:
1. **Structured Summaries**: Executive synopsis, core conceptual pillars, high-yield exam alerts, and actionable assignments.
2. **Searchable Transcripts**: Instant keyword search, speaker tags, topic tags, and synchronized clickable timestamps that jump playback to the exact second.
3. **Topic-wise Revision Material**: Interactive 3D flip flashcards (with active recall mastery tracking), chapter-by-chapter breakdowns, self-grading knowledge quizzes (with confetti celebration), and printable 1-page cheat sheets.

---

## ✨ Core Features

- 📝 **Structured Summary View**:
  - Executive synopsis highlighting main theorems and arguments.
  - High-impact exam warning callouts ("Midterm Alert" callouts).
  - Categorized key takeaways with importance badges.
  - Core concepts glossary with formal definitions.
  - Follow-up homework, reading lists, and lab checklist with interactive checkboxes.
  - One-click **Copy to Markdown**, **Download Summary**, and **Print Sheet**.

- 🔍 **Interactive Searchable Transcript**:
  - Live full-text keyword search with real-time text highlight.
  - Speaker filtering (e.g. Professor vs Student questions) and topic filtering.
  - Synchronized audio player integration: click any timestamp pill `[14:35]` to jump playback immediately.
  - Active playing indicator highlighting the spoken statement in real time.
  - One-click quote copier.

- 🧠 **Topic-wise Revision Engine**:
  - **Flashcards**: 3D flip animation, difficulty rating, hint toggle, and "Mastered" progress tracker.
  - **Knowledge Quiz**: Interactive 4-choice questions with instant correct/incorrect feedback and deep explanations.
  - **Chapter Breakdowns**: Segmented timeline of major lecture topics with summary bullets.
  - **Printable Cheat Sheet**: Clean, high-yield revision sheet ready to skim 5 minutes before exams or print.

- 🎵 **Integrated Lecture Audio Player**:
  - Play / Pause controls with smooth simulated scrubber.
  - Playback speeds (0.75x, 1x, 1.25x, 1.5x, 2x).
  - Skip buttons (-10s, +10s).
  - Active speaker & topic display synced with playback.

- 🚀 **Preloaded University Lectures**:
  - `CS 301`: Distributed Systems & Raft Consensus (Prof. Elena Rostova)
  - `BIO 204`: Cellular Respiration & ATP Synthase (Dr. Marcus Vance)
  - `ECON 102`: Microeconomics & Price Elasticity (Prof. Sarah Sterling)
  - **Upload Modal**: Drop your own audio/video file or paste YouTube/Zoom link with simulated 4-stage AI processing pipeline.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 (Hooks, functional components)
- **Bundler & Tooling**: Vite 6
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti

---

## ⚡ Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/your-username/lecturelens.git
cd lecturelens
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
Creates a zero-warning, fully optimized bundle in `dist/`.

---

## 🚀 Direct Deployment

This project is completely static and ready for direct one-click deployment:

### Deploy to Vercel
1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Vercel automatically detects the `vercel.json` and Vite framework settings.
4. Click **Deploy**!

### Deploy to Netlify
1. Push this repository to GitHub.
2. Go to [netlify.com](https://netlify.com) and select "Add new site" > "Import an existing project".
3. Netlify will read the `netlify.toml` file automatically.
4. Click **Deploy site**!

---

## 📄 License
MIT License. Built for students worldwide to master their courses.
