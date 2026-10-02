# KRITS

Science, explained and tested — plus the DIY STEM kits KRITS builds and donates.

Live at [krits.net](https://www.krits.net).

## What's here

- **Explainers** (`/explainers`) — 129 newspaper-style articles on physics, chemistry, space, Earth and life science, each paired with a YouTube explainer.
- **Quizzes** (`/quizzes`) — 62 type-the-answer quizzes. Answers fill in as you type; best scores are saved in the browser.
- **Kits** (`/kits`) — the KRITS construction kits, the founder, impact and the get-involved form.

## Run locally

```bash
npm install
npm run dev
```

## Editing content

- Articles live in `src/data/articles/*.js`. Body text uses blank lines between paragraphs and `## ` for subheads.
- Quizzes live in `src/data/quizzes/*.js`. Each line is `clue | answer | alias | alias` (or `answer | alias` for list quizzes).
- Videos are in `src/data/videos.json`. To find videos for new articles, run `python3 scripts/find-videos.py` (it only fills in missing ones; pass slugs to redo specific articles).
