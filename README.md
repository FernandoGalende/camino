# Camino Design System

**Camino** (Spanish for _trail_) is a personal design system project built to explore how a large-scale outdoor platform could scale its UI consistently across web and mobile — from foundations to production-ready components.

The name reflects both the product's purpose and the design philosophy behind it: every path is unique, every system must adapt.

---

## Why Camino exists

Most design systems stop at components. Camino started with a different question: **how do you build a system that can serve millions of users with different needs, devices, and contexts — without losing visual coherence or brand identity?**

The answer shaped every decision in this project: a strict separation between token layers, adaptive modes for different user needs, and a component API designed independently from any data model.

---

## Principles

**Diversity** — Empathise with user diversity. Every design decision prioritises accessibility, high readability, and visual neutrality so the system works for all types of users regardless of experience level.

**Community** — Design elements should facilitate connections. Components are built with social patterns in mind: ratings, feedback systems, user-generated content displays.

**Flexibility** — The system is designed to evolve. Tokens are structured in adaptive modes so the system can change context without breaking consistency.

---

## Architecture

The system is split into independent layers, each with a clear responsibility:

```
Icons (external library)
    ↓
Foundations (tokens, typography, color, spacing)
    ↑↓
camino-tokens (GitHub repo — tokens.json)
    ↓
Components
    ↓
Web / Mobile
```

Documentation lives in Supernova, connected to the same token pipeline.

The token repository is intentionally separate from the component library. This allows teams to consume foundations independently, update tokens without touching component code, and maintain a single source of truth across platforms.

---

## Token System

Tokens are structured in three adaptive modes:

- **Standard** — Default visual language for most users
- **High Accessibility** — Enhanced contrast and sizing for users who need it
- **Eco** — Reduced visual weight for low-bandwidth or low-distraction contexts

This structure was a deliberate architectural decision: instead of building one-size-fits-all components, the system adapts at the token level, keeping component code clean and context-agnostic.

---

## Design Decisions

**Color** — Nature-inspired palette: earthy browns as neutrals, greens and oranges as semantic accents. All color combinations are WCAG AA compliant.

**Typography** — P22 Mackinac Pro for headings (character and warmth), Inter for body text (readability at scale). The combination balances brand distinctiveness with functional clarity.

**Component APIs** — Designed independently from data models. A component should not know where its data comes from. This keeps components reusable across different product contexts without leaking business logic into the UI layer.

---

## Stack

- React 19 + TypeScript
- Vite — build tool
- Tailwind CSS v4
- Storybook 10
- Chromatic (visual testing and publishing)
- Tokens managed in a [separate repository](https://github.com/FernandoGalende/camino-tokens)

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Run Storybook
pnpm storybook

# Run dev app
pnpm dev

# Production build
pnpm build

# Storybook build
pnpm build-storybook
```

## Project Structure

```
src/
  components/
    Button/
      Button.tsx          # Component
      Button.stories.ts   # Stories
      index.ts            # Barrel export
    index.ts              # General barrel export
```

---

## Status

This is an ongoing personal project. Current focus:

- [x] Token architecture and adaptive modes
- [x] Foundations (color, typography, spacing)
- [x] First component batch published to Storybook
- [ ] Accessibility documentation per component
- [ ] CI/CD pipeline for automated Storybook deploys
- [ ] Demo UI built entirely with Camino components

---

## Live Storybook

[View Camino components →](https://69ec8388f0d5a90ec54de721-zwogguzvjk.chromatic.com/)

---

_Built by [Fernando Galende](https://github.com/FernandoGalende)_
