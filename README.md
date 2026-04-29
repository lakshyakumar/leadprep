# CRACKED — Engineer Interview Prep

A 7-day, execution-focused interview prep system for **every engineer** — from IC to Staff to Lead. Coding, system design, behavioral, and leadership prep, filterable by role and target company (MAANG + tier-1 startups: Stripe, OpenAI, Anthropic, Airbnb, Uber, Databricks, Coinbase, DoorDash). Built as a **React + Vite** single-page app.

(formerly LEADPREP)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
# → http://localhost:5173/
```

## 🎯 Who it's for

| Role | What you get |
|---|---|
| **IC / new grad** | Coding challenges, language deep-dives, IC behavioral prep, debugging & on-call scenarios |
| **Senior** | Everything above + system design, API design, code-review/standards, communication |
| **Staff** | Architecture, technical strategy, cross-functional influence, technical vision |
| **Lead / EM** | All of the above + people management, hiring, delegation, performance, advanced leadership |

A role pill in the nav (`All / IC / Senior / Staff / Lead / EM`) filters role-specific tracks. Default is `All` — toggle to focus.

## 📚 What's Inside

| Section | Description |
|---|---|
| **Overview** | Hero stats + clickable feature tiles |
| **7-Day Plan** | Full plan · 2hr/day compressed · Emergency top-20 |
| **Roadmap** | 8 interview categories — what's evaluated, how to prepare, common mistakes |
| **Challenges** | 1100+ coding/design/debugging problems, filterable by category, difficulty, and company (MAANG + startups) |
| **Standards** | Clean Code, SOLID, DRY/KISS/YAGNI, language guides |
| **Pair Programming** | Communication templates, narration tips, recovery protocol |
| **Behavioral & Leadership** | STAR framework, behavioral question banks for ICs and managers, advanced leadership areas |
| **Playbook** | Interactive checklists, hour-by-hour interview-day guide, questions to ask |

## 🏷️ Company tagging

Every question can be tagged with the company where it was originally asked. The taxonomy covers MAANG / Big Tech (Meta, Google, Amazon, Apple, Netflix, Microsoft) plus tier-1 startups (Stripe, Airbnb, Uber, OpenAI, Anthropic, Databricks, Coinbase, DoorDash), plus "Other". Filter the Challenges page by company to focus your prep.

**Contributing tags**: a `companies` tag must include a `source` field citing the public reference (LeetCode company tag page, Glassdoor interview report, Blind post, Levels.fyi thread, etc.). Tags without a citation will not be merged. An empty array is honest; speculative tags poison user trust.

Schema:

```js
{
  id, lang, diff, title, concepts, problem, why, examples, testInputs, explanation,
  // optional:
  companies: ['meta', 'google'],
  frequency: 'high' | 'medium' | 'low',
  source: 'leetcode' | 'glassdoor' | 'blind' | 'manual' | 'community',
  lastSeen: '2024-Q3',
}
```

Canonical taxonomy lives in [src/data/companies.js](src/data/companies.js).

## 🏗️ Project Structure

```
src/
├── main.jsx                     # Wraps App in RoleProvider
├── App.jsx                      # Section routing via useState
├── index.css                    # Global design system (dark theme, CSS vars)
├── data/
│   ├── data.js                  # All content (challenges, roadmap, checklists)
│   └── companies.js             # Company taxonomy (MAANG + startups)
├── context/
│   └── RoleContext.jsx          # Role pill state, persisted to localStorage
├── utils/
│   └── renderQ.js               # Tolerates both string and {q, companies} questions
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
