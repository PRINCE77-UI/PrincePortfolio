# Prince Kumar — Portfolio

A single-page developer portfolio (React + Vite) with a working contact form backed by Express and MongoDB.

**Design:** deep-ink dark theme (with a warm "paper" light theme) built around a lime + ember accent pair, glass cards, a bento-style skills grid, and a rotating gradient frame around the hero photo. Fonts: **Bricolage Grotesque** (headings) + **Manrope** (body). Includes a typing role line, scroll-reveal animations, animated stat counters, tilt-on-hover project cards, a cursor spotlight, an entrance animation, a scroll progress bar and a persistent dark/light toggle. Respects `prefers-reduced-motion`.

```
prince-portfolio/
├── client/                    React 18 + Vite frontend
│   ├── public/                favicon, prince.webp, Prince_Kumar_Resume.pdf
│   └── src/
│       ├── data/              ← edit your content here (profile, skills, projects, timeline)
│       ├── components/        Navbar, Hero, About, Skills, Projects, Journey, Resume, Contact, Footer…
│       ├── hooks/             useTheme, useTyping, useCountUp
│       └── index.css          design system + all styles
└── server/                    Express + MongoDB (Mongoose) — stores contact messages
```

## Run locally

```bash
# 1. Backend
cd server
npm install
cp .env.example .env      # set MONGODB_URI (local Mongo or a free Atlas cluster)
npm run dev               # http://localhost:5000  (health check: /api/health)

# 2. Frontend (new terminal)
cd client
npm install
npm run dev               # http://localhost:5173  (proxies /api to the backend)
```

Production build: `cd client && npm run build` (output in `client/dist`).

## Editing content

Everything lives in `client/src/data/`:

- `profile.js` — name, contact links, hero/about copy, stat counters (keep these to real numbers)
- `skills.js` — grouped skill chips
- `projects.js` — projects; add a `repo` and/or `live` URL and the buttons appear automatically
- `timeline.js` — experience, education, certifications

To update the resume, replace `client/public/Prince_Kumar_Resume.pdf` (keep the filename).

## Deploy

- **Frontend (Vercel/Netlify):** root directory `client`, build command `npm run build`, output `dist`. Add the env var `VITE_API_URL=https://<your-backend>.onrender.com`. Then replace the `og:image` path in `client/index.html` with the full URL of your site's `/prince.webp` so link previews work.
- **Backend (Render):** root directory `server`, build `npm install`, start `npm start`. Set `MONGODB_URI` (Atlas) and `CORS_ORIGIN` (your frontend URL).

## Tech stack

React 18 · Vite · react-router-dom · Express · MongoDB/Mongoose · plain CSS
