# VESTIGE — Interplanetary Relic Atlas

VESTIGE is a bilingual (English / Arabic with full RTL support) interactive scientific atlas documenting the spacecraft, rovers, landers, and seismic stations humanity has left on the Moon and Mars.

## Features

- **Planetary Comparison & Orbital Dial**: Switch between Mars and the Moon with live environmental telemetry and catalog counts.
- **Chronicle Timeline**: Interactive mission chronology with planetary filtering and chronological sorting.
- **Hardware Registry**: Searchable and filterable engineering dossiers for 14 off-world vessels (rovers, landers, lunar buggies, helicopters, and seismic stations).
- **Interactive Landing Cartography**: Leaflet maps powered by NASA Moon Trek (LRO WAC) and Mars Trek (MGS MOLA) tiles with clickable landing markers.
- **Mission Dossiers & Live NASA Archive Imagery**: Multi-tab technical dossiers that fetch historical and orbital (LROC / HiRISE) imagery from the public NASA Image and Video Library API.
- **Last Signal Archive & Web Audio Synthesizer**: Real-time Web Audio synthesis simulating the final radio transmissions of Opportunity, Spirit, InSight, Apollo 17 ALSEP, and Ingenuity.
- **Signal Delay Physics Lab**: Interactive Earth–Mars speed-of-light round-trip communication simulator.
- **Deep Space Signal Acquisition Game**: Three-stage interactive simulation (carrier frequency lock, Rosetta packet decryption, and DSN delayed-uplink timing).
- **Lunar Heritage & Quiz**: Curated lunar artifacts, space-law context, and an interactive 5-question verification quiz.
- **Static SEO Journal (`/blog/`)**: Optional Markdown-driven blog pipeline under `seo/content/` with automatic prerendering and sitemap generation.

## Tech Stack

- React 18, TypeScript, Vite 5
- Tailwind CSS 3 + shadcn/ui + Radix UI primitives + Motion
- Leaflet (NASA Trek WMTS planetary basemaps)
- React Router v6, TanStack React Query, `markdown-to-jsx`
- Web Audio API (client-side telemetry & signal synthesis)

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm 10+ (or pnpm)

### Installation

```bash
npm install
```

### Local Development

```bash
cp .env.example .env
npm run dev
```

The development server starts on `http://localhost:3000` (override with `VITE_PORT`).

### Verification & Testing

```bash
# TypeScript type-checking (app + Vite/Node configs)
npm run typecheck

# ESLint check
npm run lint

# Plugin & prerender unit tests
npm run test:plugins
```

### Production Build & Preview

```bash
npm run build
npm run preview
```

The production bundle is emitted to `dist/`, including `sitemap.xml` and `robots.txt` (plus prerendered `/blog/` HTML pages if Markdown files are added under `seo/content/`).

## Deployment

`dist/` is a static single-page application bundle compatible with any static host:

- **Vercel / Netlify / Cloudflare Pages**: Build command `npm run build`, output directory `dist`. Configure SPA fallback rewrite to `/index.html`.
- **GitHub Pages (automatic via GitHub Actions)**: Push the project contents to `main` (or `master`), open **Settings → Pages**, and set **Source** to **GitHub Actions**. The included `.github/workflows/deploy.yml` automatically sets `VITE_BASE`, builds `dist/`, adds `404.html` + `.nojekyll`, and deploys. For manual builds, set `VITE_BASE=/<repo-name>/` before running `npm run build`.
- **Nginx / Caddy**: Serve `dist/` with `try_files $uri $uri/ /index.html;`.

### External APIs Used at Runtime

No secret API keys are required. The client communicates directly with public NASA endpoints:
- `https://images-api.nasa.gov/search` (NASA Image and Video Library)
- `https://trek.nasa.gov/tiles/...` (NASA Moon Trek & Mars Trek WMTS basemaps)
