# CLAUDE.md

This file provides context for AI assistants working on the Heliograph codebase.

## Project Overview

Heliograph is an AI-native platform for forward-deployed engineers (FDEs) that combines project management, version control, and stakeholder tracking in one unified system. It replaces the need to juggle Linear, GitHub, Salesforce, Notion, and spreadsheets.

See `Heliograph - Design Document.md` for the full product vision and architecture.

**Current state:** Pre-release (v0.1.0) — marketing site + interactive demo app. Deployed on Vercel at https://www.heliograph.dev.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 4 (utility-first)
- **Linter/Formatter:** Biome 2
- **Package Manager:** pnpm
- **3D Graphics:** Three.js via @react-three/fiber
- **Video Generation:** Remotion 4
- **Icons:** lucide-react
- **Deployment:** Vercel (with Analytics + Speed Insights)

## Project Structure

```
heliograph/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (header, metadata, analytics)
│   ├── page.tsx                  # Landing/marketing page
│   ├── globals.css               # Global styles, Tailwind config, animations
│   ├── opengraph-image.tsx       # Dynamic OG image generation
│   ├── blog/                     # Blog page
│   ├── cube/                     # 3D cube demo page
│   ├── demo/                     # Product demo showcase
│   └── demo-app/                 # Interactive demo application
│       ├── page.tsx              # Demo app entry
│       ├── components/           # Demo-specific UI components
│       ├── context/              # React context + useReducer state management
│       ├── data/                 # Sample data
│       ├── types.ts              # TypeScript type definitions
│       ├── constants.ts          # Colors, status configs, view configs
│       └── utils.ts              # Utility functions
├── components/                   # Shared React components
│   ├── cube/                     # 3D cube components (CubeScene, CubeFace, etc.)
│   ├── DemoVideoSection.tsx      # Demo video embed
│   ├── ScrollAnimation.tsx       # Scroll-triggered animations
│   └── StaticCTA.tsx             # Call-to-action component
├── hooks/                        # Custom React hooks
│   ├── useScrollProgress.ts      # Scroll position tracking
│   └── useInView.ts              # Intersection Observer wrapper
├── remotion/                     # Remotion video generation
│   ├── index.ts                  # Remotion entry point
│   ├── Root.tsx                  # Root composition
│   ├── DemoVideo.tsx             # Main demo video
│   ├── scenes/demo/              # Video scenes
│   ├── components/               # Video-specific components + mockups
│   ├── data/                     # Video data
│   └── utils/                    # Video utilities (fonts, colors)
├── public/                       # Static assets (logos, videos)
├── scripts/                      # Utility scripts
├── biome.json                    # Linter/formatter configuration
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── remotion.config.ts            # Remotion video settings
└── postcss.config.mjs            # PostCSS + Tailwind plugin
```

## Development Commands

```bash
pnpm dev              # Start Next.js dev server (http://localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run Biome linter (biome check .)
pnpm format           # Auto-format with Biome (biome format --write .)
pnpm check            # Check and auto-fix with Biome (biome check --write .)
pnpm remotion:dev     # Open Remotion studio for video editing
pnpm remotion:build   # Render demo video to public/videos/
```

## Code Conventions

### TypeScript
- Strict mode is enabled — follow it rigorously
- Use proper types for all props and function signatures
- Path alias: `@/*` maps to the project root (e.g., `@/components/...`)
- Target: ES2017

### Formatting (Biome)
- **Quotes:** Double quotes for JS/TS
- **Indentation:** Spaces (not tabs)
- **Imports:** Auto-organized by Biome assist
- **CSS:** Tailwind directives and CSS modules supported
- Run `pnpm check` before committing to auto-fix lint/format issues

### Biome Rules
- Recommended rules are enabled
- `noExplicitAny` is turned off (but prefer specific types when possible)
- CSS `noUnknownAtRules` is off (to allow Tailwind directives like `@theme`)

### React / Next.js
- Functional components with hooks only — no class components
- Server Components by default (Next.js App Router convention)
- Mark client components explicitly with `"use client"` directive
- Use Next.js `<Image>` and `<Link>` components instead of raw HTML equivalents

### State Management (Demo App)
- React Context + `useReducer` pattern (see `app/demo-app/context/`)
- Discriminated union action types (see `app/demo-app/types.ts`)
- localStorage persistence with version-aware schema (see `app/demo-app/constants.ts` for `STORAGE_KEY` and `STORAGE_VERSION`)

## Design System

### Typography
- **Headings:** Clash Display (loaded from Fontshare API)
- **Body:** Satoshi (loaded from Fontshare API)
- Fallback to system fonts

### Color Palette
- Warm-to-cool gradient: orange (`#f97316`) → blue (`#3b82f6`)
- Brand colors defined in `app/demo-app/constants.ts` (`COLORS` object)
- Status/priority colors follow the config objects in `constants.ts`

### Visual Style
- Glass morphism with backdrop blur and noise textures for cards
- Background: linear gradient from orange to blue
- Semi-transparent white overlays (`bg-white/25`, `bg-white/80`)

### Accessibility
- Respect `prefers-reduced-motion` for all animations
- Proper heading hierarchy (`h1` → `h2` → `h3`)
- Mark decorative elements with `aria-hidden="true"`
- Use explicit CSS transition properties (never `transition: all`)
- Provide `aria-label` for icon-only interactive elements

### Animations
- Custom CSS keyframes defined in `globals.css`
- Scroll-based animations via `useScrollProgress` hook
- Intersection Observer animations via `useInView` hook
- Fade-in, float, and custom easing functions

## Key Application Routes

| Route | Description |
|-------|-------------|
| `/` | Landing/marketing page with hero, demo video, features |
| `/demo-app` | Interactive CRM/project management demo |
| `/cube` | 3D cube visualization of three product pillars |
| `/demo` | Product demo showcase page |
| `/blog` | Blog page |

## Demo App Architecture

The interactive demo at `/demo-app` is the most complex part of the codebase:

- **Entities:** Person, Task, Requirement, Activity
- **Views:** Dashboard, Kanban Board (Tasks), People, Requirements
- **State:** Centralized via `DemoContext` using `useReducer`
- **Persistence:** Debounced writes to `localStorage`
- **Data:** Pre-populated sample data in `app/demo-app/data/sampleData.ts`

### Component Hierarchy
```
DemoApp
├── DemoHeader (nav/view switcher)
├── Views (dynamic based on activeView)
│   ├── DashboardView
│   ├── KanbanView
│   ├── PeopleView
│   └── RequirementsView
├── Forms (modal-based)
│   ├── TaskForm
│   ├── PersonForm
│   └── RequirementForm
└── Common (Avatar, StatusBadge, PriorityBadge, Modal, EmptyState)
```

## Testing

No automated tests exist yet. There is no test framework configured.

## CI/CD

No GitHub Actions or CI pipeline is configured. Deployment is handled via Vercel's Git integration.

## When Working on This Codebase

1. Always run `pnpm check` to lint and format before considering work complete
2. Follow Next.js App Router conventions (server components by default, `"use client"` only when needed)
3. Use TypeScript strictly — prefer specific types over `any`
4. Keep the warm-to-cool gradient aesthetic consistent across UI changes
5. Reference the design document (`Heliograph - Design Document.md`) for product direction
6. Use `lucide-react` for icons, not custom SVGs (except for brand assets)
7. When modifying the demo app, ensure state actions follow the discriminated union pattern in `types.ts`
