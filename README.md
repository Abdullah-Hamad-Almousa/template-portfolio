# Mindloop — Dark Monochrome Content-Platform Landing

Pure-black monochrome newsletter / content-platform landing page for **Mindloop**. Built as a full Vite + React + TypeScript + Tailwind + Framer Motion project, matching the active skill's locked HSL design system exactly.

## Stack

- React 18 + TypeScript + Vite 5
- Tailwind CSS 3 (custom theme bound to HSL tokens)
- Framer Motion 11 (fadeUp + scroll-driven word-by-word reveal)
- HLS.js (CTA background video)
- @fontsource/inter + @fontsource/instrument-serif
- lucide-react (Instagram, LinkedIn, Twitter icons)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run typecheck
```

## Project layout

```
.
├── index.html                  Vite entry
├── package.json
├── vite.config.ts
├── tailwind.config.js          Theme tokens (HSL passthrough)
├── postcss.config.js
├── tsconfig*.json
└── src
    ├── main.tsx                React root mount
    ├── App.tsx                 Page composition
    ├── index.css               HSL :root, .liquid-glass, .serif, .mw, base reset
    ├── assets.ts               Hero / Mission / Solution / CTA media + data-URI icons
    └── components
        ├── FadeUp.tsx          Reusable fadeUp wrapper (Framer Motion variants)
        ├── Navbar.tsx          Fixed top nav with 3 liquid-glass social buttons
        ├── Hero.tsx            Fullscreen video hero + email form (liquid-glass)
        ├── SearchSection.tsx   "Search has changed" + 3 AI platform cards
        ├── MissionSection.tsx  Mission video + scroll-driven word-by-word reveal
        ├── SolutionSection.tsx Solution label, 3:1 video, 4-column feature grid
        ├── CtaSection.tsx      HLS video bg via hls.js, Subscribe + Start Writing
        └── Footer.tsx          Copyright + Privacy/Terms/Contact
```

## Design system (locked)

All color tokens are HSL triplets, consumed via `hsl(var(--token) / <alpha-value>)`:

| Token             | Value         | Role                                    |
|-------------------|---------------|-----------------------------------------|
| `--background`    | `0 0% 0%`     | Pure-black canvas                       |
| `--foreground`    | `0 0% 100%`   | Pure-white text                         |
| `--card`          | `0 0% 5%`     | Subtle elevated surface                 |
| `--muted`         | `0 0% 15%`    | Soft elevated surface                   |
| `--muted-foreground` | `0 0% 65%` | Subtitle / meta text                    |
| `--border`        | `0 0% 20%`    | Hairline dividers                       |
| `--hero-subtitle` | `210 17% 95%` | Near-white body copy in hero/mission    |
| `--accent`        | `170 15% 45%` | Reserved (not used in visible UI)       |

The page is hard-monochrome. The only non-grey token in play is `--hero-subtitle`, used to keep large body copy slightly off-pure-white.

## Liquid glass effect

Locked `.liquid-glass` utility in `src/index.css`: `rgba(255,255,255,0.01)` background, `backdrop-filter: blur(4px)`, inset highlight, and the 1.4px masked gradient border that reads as a top/bottom rim. Applied to the 3 navbar social buttons (circular), the hero email-form container (rounded-full), and the "Start Writing" CTA button (rounded-lg).

## Animation

- `FadeUp` component (Framer Motion `whileInView`, `once: true`, `margin: "-100px"`, `easeOut`, 600ms) — reusable for any staggered reveal. Children of the same parent get increasing `delay` for cascade.
- `MissionSection` uses `useScroll` + per-word `useTransform` (one `MotionValue<number>` per word, mapped to opacity `0.15 → 1`). Highlight words ("curiosity", "meets", "clarity") snap to `--foreground` once the word's progress passes ~60%; the rest stay in `--hero-subtitle`.

## Media

All four large video assets (hero, mission, solution, CTA) and the 3 inlined data-URI avatars / 3 AI platform icons are stored in `src/assets.ts` so the URLs and tokens stay in one place. The skill's hard rule — no `i.pravatar.cc`, no `api.dicebear.com`, no remote avatar/icon hosts — is preserved by keeping all avatars and icons as inlined `data:image/svg+xml;base64,…` URIs.