# React Template

Vite + React + TypeScript + TanStack Router + Tailwind v4.

## Getting started

```bash
bun install
bun run dev
```

## Scripts

| Command          | Description                   |
| ---------------- | ----------------------------- |
| `bun run dev`    | Start dev server              |
| `bun run build`  | Type-check + production build |
| `bun run lint`   | Run ESLint                    |
| `bun run tsc`    | Type-check only               |
| `bun run format` | Format with Prettier          |

## What to customize

### Fonts

The template ships with **Fraunces** (display) and **DM Sans** (body) as example fonts. To change them:

1. Install your fonts: `bun add @fontsource-variable/<name>`
2. Remove the old ones: `bun remove @fontsource-variable/fraunces @fontsource-variable/dm-sans`
3. Update the imports in `src/main.tsx`
4. Update the module declarations in `src/declarations.d.ts`
5. Update `--font-display` and `--font-body` in `src/app.css`

### Colors

The color palette in `src/app.css` under `@theme` is a warm light theme with a terracotta accent. Replace the `--color-*` variables with your own palette. The shadow values also reference these warm tones via `rgba(45, 42, 38, ...)` — update those too if your base tone changes.

### Project name

- `"name"` in `package.json`
- `<title>` in `index.html`

## Conventions

### Path aliases — always use `@/`

**Never use relative imports like `../../components/foo`.** Always use the aliases:

```ts
// GOOD
import { Button } from '@/components/button'
import { useAuth } from '@/lib/auth'
import { api } from '@convex/_generated/api'

// BAD — never do this
import { Button } from '../../components/button'
import { api } from '../../../convex/_generated/api'
```

Two aliases are preconfigured in both `tsconfig.app.json` and `vite.config.ts`:

| Alias       | Maps to      | Use for                           |
| ----------- | ------------ | --------------------------------- |
| `@/*`       | `./src/*`    | Components, lib, icons, etc.      |
| `@convex/*` | `./convex/*` | Convex functions, generated types |

The `@convex/` alias is harmless if you don't use Convex — it simply won't resolve to anything.

### Route structure — always use folders, never flat files

**Every route is a folder with a `route.tsx` file.** Never use the flat dot-separated naming (`_auth.dashboard.settings.tsx`). The only exception is `__root.tsx` which stays flat per TanStack Router convention.

Page-specific components go in a `-components/` directory next to `route.tsx`. The `-` prefix tells TanStack Router to ignore the directory.

```
src/routes/
├── __root.tsx                        ← only file that stays flat
├── index/
│   ├── route.tsx                     ← /
│   └── -components/
│       ├── hero.tsx
│       └── feature-card.tsx
├── dashboard/
│   ├── route.tsx                     ← /dashboard (layout with <Outlet />)
│   ├── index/
│   │   ├── route.tsx                 ← /dashboard (default content)
│   │   └── -components/
│   └── settings/
│       ├── route.tsx                 ← /dashboard/settings
│       └── -components/
```

**Layout routes** (routes that wrap children with `<Outlet />`) get their own folder with a `route.tsx`. Pathless layout routes use the `_prefix` convention: `_authenticated/route.tsx` creates a layout that doesn't add a URL segment.

**Path grouping folders** (like `workspaces/` containing `index/` and `$workspaceId/`) don't need their own `route.tsx` — they're just organizational folders.

This keeps every route self-contained and scales cleanly as the app grows.

## What's included

- **Tailwind v4** as a Vite plugin with a full `@theme` block (colors, typography, spacing, radii, shadows)
- **TanStack Router** with file-based routing and auto code-splitting
- **ESLint** with type-checked rules: `no-await-in-loop`, `no-nested-ternary`, `array-type: generic`, boolean naming convention (`is/has/should/...` prefix)
- **Prettier** with Tailwind class sorting plugin
