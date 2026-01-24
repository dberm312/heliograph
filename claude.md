# CLAUDE.md

This file provides context for AI assistants (like Claude) working on this codebase.

## Project Overview

**Heliograph** is an AI-native platform that helps B2B companies bridge the gap between customer-facing innovation and core product development. The name comes from the heliograph signaling device—just as it focused the sun's energy into precise signals, Heliograph channels frontline team insights into clear, actionable direction.

### The Problem We're Solving

B2B companies face "coordination chaos"—talented people and good ideas pulling in different directions:

1. **Product companies becoming services businesses**: Early-stage B2B companies must create custom approaches for every customer
2. **Services companies becoming product businesses**: Consulting firms racing to productize expertise (Bain, McKinsey, etc.)
3. **Both converge on the same pain**: Custom work and core capabilities need to flow seamlessly, but the tools don't exist

### Core Concepts

- **Edge-to-Core**: "Edge" refers to frontline teams (sales, FDEs, solutions engineers) who build custom solutions. "Core" refers to the main product/platform. Heliograph connects these.
- **Heliograms**: Lightweight, embeddable feedback forms (think Typeform meets Loom) for instant stakeholder input with full attribution
- **FDE (Forward-Deployed Engineer)**: Engineers embedded directly with clients to build custom solutions (pioneered by Palantir)

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

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Key Design Principles

1. **AI-native, not AI-bolted-on**: The platform should assume AI agents are first-class participants
2. **Embrace customization**: Unlike traditional tools, custom work is a feature, not a bug
3. **Cross-functional by default**: Break down silos between sales, engineering, product, and marketing
4. **Attribution matters**: All feedback and contributions should be traceable to their source

## Target Users

- B2B/B2B2C product companies with high-touch customer success models
- Enterprise software companies with forward-deployed engineering teams
- Consulting firms productizing their intellectual property
- Professional services firms going digital

## When Working on This Codebase

- Follow Next.js App Router conventions
- Use TypeScript strictly—avoid `any` types
- Components should be functional with hooks
- Keep the edge-to-core mental model in mind when designing features
- "Heliogram" is our term for feedback/polling forms—use it consistently

## UI/Frontend Work

When working on UI components, pages, or frontend design:

1. **Always invoke design skills** before writing or reviewing UI code:
   - `/web-design-guidelines` — Review code for Web Interface Guidelines compliance (accessibility, semantics, focus states, animations, etc.)
   - `/frontend-design` — Create distinctive, production-grade interfaces that avoid generic AI aesthetics

2. **Design principles for this project:**
   - Use **Clash Display** for headings and **Satoshi** for body text
   - Maintain the warm-to-cool gradient aesthetic (orange → blue)
   - Use glass morphism with noise textures for cards
   - Respect `prefers-reduced-motion` for all animations
   - Follow proper heading hierarchy (`h1` → `h2` → `h3`)
   - Add `aria-hidden="true"` to decorative elements
   - Use explicit CSS transition properties (never `transition: all`)
