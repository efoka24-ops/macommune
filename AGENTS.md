# macommune — Agent Instructions

Campaign management web app for a commune-level election in Cameroon (inspired by [wadagnitalata.bj](https://wadagnitalata.bj)). French-language UI. React 19 + Vite frontend with a custom Express 5 REST API backed by flat-file JSON storage.

## Dev Commands

```bash
npm run dev      # Start both API server (port 3001) AND Vite (port 5173) — always use this
npm run build    # Production build (frontend only; deploy server.js separately)
npm run lint     # ESLint
```

> **Critical:** Running `vite` alone causes all `/api` calls to 404. Always use `npm run dev`.

## Architecture

| Layer | Entry point | Notes |
|---|---|---|
| Frontend shell | `src/Layout.jsx` | **Not** `src/App.jsx` — App.jsx is dead Vite scaffold code, never edit it for routing |
| API server | `server.js` | Express 5, port 3001 |
| Data storage | `data/*.json` | Flat files; no concurrency protection |
| API client | `src/api/base44Client.js` | Wraps fetch; proxied by Vite in dev |

### Routing

All routes and the nav bar are defined in `src/Layout.jsx`. Route paths are derived by `createPageUrl(name)` in `src/utils.js`:
- `'Home'` → `/`
- Any other name → `/${name.toLowerCase()}` (e.g. `'AdminNews'` → `/adminnews`)

To add a new page: add the component to `src/Pages/`, import it in `Layout.jsx`, add a `<Route>`, and add a nav entry if public-facing.

### Data Layer

**Entities** (news, supporters, testimonials) — use `base44.entities.*`:
```js
import { base44 } from '@/api/base44Client';

const articles = await base44.entities.NewsArticle.list('created_date'); // sort ascending
const item     = await base44.entities.NewsArticle.create({ title, content });
await base44.entities.NewsArticle.update(id, patch);
await base44.entities.NewsArticle.delete(id);
```

**Page content** (CMS hero text, values, etc.) — use `base44.pages.*`:
```js
const content = await base44.pages.get('about');     // key = lowercase page name
await base44.pages.update('about', { hero: '...' });
```

Entity schemas (documentation only, not runtime-enforced) live in `src/Entities/*.json`.

### Canton enum

All entities share the same canton values: `figuil | lam | biou | bidzar_1 | bidzar_2`. NewsArticle also accepts `tous`.

## Component Conventions

Two UI layers coexist — keep them separate:

| Layer | Path | Used by |
|---|---|---|
| Custom primitives | `src/components/` | Public-facing pages |
| shadcn-style UI | `src/components/ui/` | Admin pages |

- Icons: `lucide-react` only
- Animation: `framer-motion` — standard pattern is `initial={{ opacity: 0, y: 30 }}` + `whileInView` + `viewport={{ once: true }}`
- Styling: Tailwind CSS v3; brand colors via CSS variables in `Layout.jsx`: `--primary: #172554`, `--primary-mid: #1e3a8a`, `--accent: #16a34a`, `--accent-dark: #15803d`
- Import alias: `@` → `src/` (e.g. `@/api/base44Client`)
- Data fetching: `@tanstack/react-query` v5 (`useQuery`, `useMutation`) — `QueryClientProvider` is in `main.jsx`

## Known Gaps / Pitfalls

- **No auth on admin routes** — `/admin`, `/adminnews`, etc. are publicly accessible. Flag this before any production deploy.
- **Entity schemas are not validated server-side** — add client-side validation where needed.
- **Concurrent writes to `data/*.json`** can corrupt files — not a concern for single-user local use.
