# CLAUDE.md

This file provides context for AI assistants (like Claude) working on this codebase.

## Project Overview

Please refer to the `Heliograph - Design Document.md` for a high-level overview of the project.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Deployment**: Vercel
- **Language**: TypeScript

## Project Structure

```
heliograph/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   ├── lib/           # Utility functions and shared logic
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── docs/              # Additional documentation
```

## Development Commands

This project uses **pnpm** as the package manager. Do not use npm or yarn.

```bash
pnpm install  # Install dependencies (creates pnpm-lock.yaml, NOT package-lock.json)
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run Biome
```

### Remotion Video

To render the product demo video:

```bash
pnpm remotion:build  # Renders to public/videos/heliograph-demo.mp4
pnpm remotion:dev    # Opens Remotion Studio for preview
```

## When Working on This Codebase

- Use your skills regarding web design and web app best practices to inform your work
- Follow Next.js App Router conventions
- Use TypeScript strictly—avoid `any` types
- Components should be functional with hooks
- You are always encouraged to ask questions and seek clarification

## UI/Frontend Work

When working on UI components, pages, or frontend design:

1. **Always invoke design skills** before writing or reviewing UI code:
   - `/web-design-guidelines` — Review code for Web Interface Guidelines compliance (accessibility, semantics, focus states, animations, etc.)
   - `/frontend-design` — Create distinctive, production-grade interfaces that avoid generic AI aesthetics
   - ETC: use all the skills that are relevant to the task at hand

2. **Design principles for this project:**
   - Use **Clash Display** for headings and **Satoshi** for body text
   - Maintain the warm-to-cool gradient aesthetic (orange → blue)
   - Use glass morphism with noise textures for cards
   - Respect `prefers-reduced-motion` for all animations
   - Follow proper heading hierarchy (`h1` → `h2` → `h3`)
   - Add `aria-hidden="true"` to decorative elements
   - Use explicit CSS transition properties (never `transition: all`)
