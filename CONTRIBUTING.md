# Contributing to CRACKED

Thanks for wanting to improve this project! Contributions of all kinds are welcome — new challenges, fixes, UI improvements, new topic areas, and **FAANG company tags on existing questions**.

## What You Can Contribute

| Type | Examples |
|---|---|
| **New challenges** | Add questions to existing categories or propose a new category |
| **FAANG tags** | Tag an existing question with the company that asks it (with a citation) |
| **Content fixes** | Typos, outdated info, broken links in Standards |
| **UI improvements** | Better mobile layout, accessibility, new components |
| **New categories** | A whole new challenge topic (e.g. GraphQL, Mobile, ML Ops) |

---

## 🏷️ Tagging Questions with FAANG Companies

Every challenge or question can be tagged with the company that asks it. Tags surface as filter buttons and small badges in the UI, so users can prep for a specific target company.

**Canonical taxonomy** lives in [src/data/companies.js](src/data/companies.js): `meta`, `google`, `amazon`, `apple`, `netflix`, `microsoft`, `other`.

**Schema** — add `companies`, `source`, and optionally `frequency` / `lastSeen` fields to any challenge or question object:

```js
{
  id: 21, lang: "Code", diff: "medium", title: "LRU Cache",
  // existing fields...
  companies: ["meta", "google", "amazon", "microsoft"],
  source: "https://leetcode.com/company/facebook/",   // or "community" for aggregated public reports
  frequency: "high",     // optional: high | medium | low
  lastSeen: "2024-Q3",   // optional, freshness signal
}
```

For bare-string question arrays (e.g. `roadmapData[i].questions`), upgrade the entry to an object:

```js
// before
"How do you handle an underperformer?"

// after
{ q: "How do you handle an underperformer?", companies: ["google","meta"], source: "community" }
```

The `renderQ` helper handles both shapes, so untagged entries can stay as strings.

### The hard rule

**A `companies` tag without a citable `source` will not be merged.**

Empty array (`companies: []`, or no `companies` field at all) is honest — it means we have no public source yet. Speculative tags poison user trust and we'd rather have 100 well-sourced tags than 600 guesses.

Acceptable `source` values:
- A specific URL — LeetCode company tag page, Glassdoor interview report, levels.fyi thread, Blind post, official job board screen recording.
- `"community"` — for tags supported by multiple corroborating public reports across LeetCode + Glassdoor + Blind. Use sparingly; prefer a specific URL.
- `"manual"` — for questions you personally have seen asked, with at least the year and round type ("Meta Staff E5 onsite, Q4 2024").

### How to add tags via PR

1. Open `src/data/data.js`, find the question/challenge by `title` and `id`.
2. Add the `companies`, `source` fields per the schema above.
3. In the PR description, summarize: "tagging N questions with K sources" and link the sources.
4. If a question is asked by 4+ companies, consider whether it's actually company-agnostic — tag it sparingly.

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
