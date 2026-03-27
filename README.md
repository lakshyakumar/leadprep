# LEADPREP — Engineering Leadership Interview Prep

A complete, execution-focused preparation system for Engineering Leadership interviews, built as a **React + Vite** single-page application.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
# → http://localhost:5173/
```

## 📚 What's Inside

| Section | Description |
|---|---|
| **Overview** | Hero stats + clickable feature tiles |
| **7-Day Plan** | Full plan · 2hr/day compressed · Emergency top-20 |
| **Roadmap** | 8 interview categories — what's evaluated, how to prepare, common mistakes |
| **100 Challenges** | 50 JS + 50 Go problems, filterable by difficulty, expandable details |
| **Standards** | Clean Code, SOLID, DRY/KISS/YAGNI, JS, Go, Ops & DORA |
| **Pair Programming** | Communication templates, narration tips, recovery protocol |
| **Leadership** | STAR framework, 150 behavioral questions, advanced leadership areas |
| **Playbook** | Interactive checklists, hour-by-hour interview-day guide, questions to ask |

## 🏗️ Project Structure

```
src/
├── main.jsx
├── App.jsx                 # Section routing via useState
├── index.css               # Global design system (dark theme, CSS vars)
├── data/
│   └── data.js             # All content data (100 challenges, roadmap, checklists…)
└── components/
    ├── Nav.jsx
    ├── Home.jsx
    ├── Calendar.jsx
    ├── Roadmap.jsx
    ├── Challenges.jsx
    ├── Standards.jsx
    ├── Pairing.jsx
    ├── Leadership.jsx
    └── Playbook.jsx
```

## 🎨 Tech Stack

- **React 18** — UI components
- **Vite 5** — dev server & build
- **Vanilla CSS** — custom dark theme with CSS variables
- **Google Fonts** — Syne (headings) · Plus Jakarta Sans (body) · JetBrains Mono (code)

## 📦 Build for Production

```bash
npm run build
npm run preview
```
