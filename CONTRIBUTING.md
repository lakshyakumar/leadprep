# Contributing to LEADPREP

Thanks for wanting to improve this project! Contributions of all kinds are welcome — new challenges, fixes, UI improvements, or new topic areas.

## What You Can Contribute

| Type | Examples |
|---|---|
| **New challenges** | Add questions to existing categories or propose a new category |
| **Content fixes** | Typos, outdated info, broken links in Standards |
| **UI improvements** | Better mobile layout, accessibility, new components |
| **New categories** | A whole new challenge topic (e.g. GraphQL, Mobile, ML Ops) |

---

## Project Structure

```
src/
├── components/
│   ├── Challenges.jsx      # Challenge browser with grouped category UI
│   ├── Standards.jsx       # Expandable best-practice tiles + language guides
│   ├── Home.jsx            # Landing page with stats and feature cards
│   ├── Roadmap.jsx         # Interview roadmap and checklist
│   ├── Calendar.jsx        # Study calendar/planner
│   └── Nav.jsx             # Navigation bar
├── data/
│   └── data.js             # ALL challenge and content data lives here
└── index.css               # Global styles and design tokens
```

---

## Adding New Challenges

All challenges live in `src/data/data.js`. Each challenge follows this schema:

```js
{
  id: 421,              // next sequential ID
  lang: "GraphQL",      // display label for the badge
  diff: "easy",         // "easy" | "medium" | "hard"
  title: "Schema Design Basics",
  concepts: "Schema, Types, Resolvers, SDL",
  problem: "Define a GraphQL schema for a blog: Post, User, Comment types. Write queries for getPosts and mutations for createPost. Include pagination.",
  why: "GraphQL schema design is the first skill in every GraphQL interview — SDL fluency is expected."
}
```

**Rules:**
- IDs must be sequential and unique (check the last ID in `data.js` before adding)
- `diff` must be one of `"easy"` `"medium"` `"hard"` — targeting roughly 1/3 each
- `concepts` should be a comma-separated list of 3–5 tags
- `problem` should be specific and actionable — something you can actually sit down and do
- `why` should explain the real-world relevance in one sentence

**Wiring a new category** — after adding your array, update `Challenges.jsx`:
1. Import it at the top
2. Add it to the `GROUPS` array with an icon, label, and count
3. Add it to the `ALL` spread and the `map` lookup

---

## Adding a New Language to Standards

Open `src/components/Standards.jsx` and add an entry to the `LANGS` array:

```js
{
  id: 'graphql',
  label: 'GraphQL',
  icon: '🔺',
  docs: [
    { label: 'GraphQL Official Docs', url: 'https://graphql.org/learn/' },
    { label: 'How to GraphQL', url: 'https://www.howtographql.com' },
  ],
  sections: [
    { title: 'Schema Design', body: '...' },
    { title: 'Resolvers', body: '...' },
    // 4-6 sections
  ],
}
```

---

## Pull Request Checklist

Before opening a PR, confirm:

- [ ] Challenge IDs are unique and sequential
- [ ] All 3 difficulty levels are represented if adding 15+ challenges
- [ ] No broken URLs in Standards links
- [ ] The app builds without errors (`npm run build`)
- [ ] Mobile layout still looks reasonable (test at 375px width)
- [ ] PR description explains what was added and why

---

## Running Locally

```bash
npm install
npm run dev
```

The app will be live at `http://localhost:5173`.

---

## Commit Style

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(data): add 20 GraphQL challenges (ids 421-440)
fix(standards): correct broken MDN link in Secure Coding tile
feat(ui): add GraphQL tab to Challenges category grid
docs: update CONTRIBUTING with GraphQL example
```

---

## Questions?

Open an issue and describe what you want to add. Happy to help scope it!
