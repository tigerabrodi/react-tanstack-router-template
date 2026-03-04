# React + Convex Template

My personal starter for quickly spinning up side projects. Opinionated defaults I reach for every time: Vite, React, TypeScript, TanStack Router, Tailwind v4, and Convex.

## Quick start

```bash
bun install
bun run dev
```

For Convex, run `npx convex dev` in a separate terminal.

## Scripts

| Command          | Description                   |
| ---------------- | ----------------------------- |
| `bun run dev`    | Start dev server              |
| `bun run build`  | Type-check + production build |
| `bun run lint`   | Run ESLint                    |
| `bun run tsc`    | Type-check only               |
| `bun run test`   | Run tests with Vitest         |
| `bun run format` | Format with Prettier          |

## What to customize for your project

### Project name

- `"name"` in `package.json`
- `<title>` in `index.html`

### Fonts

Ships with **Fraunces** (display) and **DM Sans** (body). To swap them:

1. `bun add @fontsource-variable/<name>`
2. `bun remove @fontsource-variable/fraunces @fontsource-variable/dm-sans`
3. Update imports in `src/main.tsx`
4. Update module declarations in `src/declarations.d.ts`
5. Update `--font-display` and `--font-body` in `src/app.css`

### Colors

The `@theme` block in `src/app.css` has a warm light palette with a terracotta accent. Replace the `--color-*` variables with your own. The shadow values also reference warm tones via `rgba(45, 42, 38, ...)` — update those if your base tone changes.

### Convex

The template is wired up for Convex out of the box:

- `@convex/*` path alias in `tsconfig.app.json` and `vite.config.ts`
- `vitest.config.ts` mirrors the same aliases so tests resolve correctly
- `vercel.json` uses `npx convex deploy --cmd 'bun run build'` as the build command

**If you're using Convex:** add your `convex/` directory, run `npx convex init`, and you're good to go.

**If you're not using Convex:** the aliases are harmless — they just won't resolve to anything. You can remove them from `tsconfig.app.json`, `vite.config.ts`, and `vitest.config.ts` if you want a clean setup. Also update the `buildCommand` in `vercel.json` to just `bun run build`.

### Vercel

`vercel.json` is preconfigured with:

- `installCommand`: `bun install`
- `buildCommand`: `npx convex deploy --cmd 'bun run build'` (deploys Convex functions + builds the frontend)
- SPA rewrites so client-side routing works on all paths

If not using Convex, change `buildCommand` to `bun run build`.

#### Production deploy with Convex

To deploy Convex functions automatically when Vercel builds:

1. Go to the [Convex dashboard](https://dashboard.convex.dev) > your project > **Settings**
2. Click **"Generate Production Deploy Key"** and copy it
3. In Vercel > your project > **Settings** > **Environment Variables**, add:
   - Name: `CONVEX_DEPLOY_KEY`
   - Value: the key you just copied
   - Environment: **Production only** (uncheck Preview and Development)
4. Push to main — Vercel will deploy your Convex functions and build the frontend in one step

The `npx convex deploy` command in `vercel.json` reads this key and automatically sets `VITE_CONVEX_URL` during the build, so you don't need to configure that separately.

### Meta tags

`index.html` is bare — add your own `og:image`, `og:title`, `twitter:card`, favicon, etc. before shipping.

## Conventions

### Path aliases — always use `@/`

Never use relative imports like `../../components/foo`. Always use the aliases:

```ts
import { Button } from '@/components/button'
import { useAuth } from '@/lib/auth'
import { api } from '@convex/_generated/api'
```

| Alias       | Maps to      | Use for                           |
| ----------- | ------------ | --------------------------------- |
| `@/*`       | `./src/*`    | Components, lib, icons, etc.      |
| `@convex/*` | `./convex/*` | Convex functions, generated types |

### Route structure — folders, not flat files

Every route is a folder with a `route.tsx`. Never use the flat dot-separated naming. The only exception is `__root.tsx` which stays flat per TanStack Router convention.

Page-specific components go in a `-components/` directory next to `route.tsx`. The `-` prefix tells TanStack Router to ignore it.

```
src/routes/
├── __root.tsx
├── index/
│   ├── route.tsx
│   └── -components/
│       └── hero.tsx
├── dashboard/
│   ├── route.tsx              ← layout with <Outlet />
│   ├── index/
│   │   └── route.tsx          ← /dashboard
│   └── settings/
│       ├── route.tsx          ← /dashboard/settings
│       └── -components/
```

**Layout routes** use `_prefix` for pathless layouts: `_authenticated/route.tsx` wraps children without adding a URL segment.

## What's included

- **Vite** with React plugin and auto code-splitting
- **Tailwind v4** as a Vite plugin with a full `@theme` block
- **TanStack Router** with file-based routing
- **Vitest** for testing with path aliases matching the app
- **ESLint** with type-checked rules
- **Prettier** with Tailwind class sorting
- **Vercel** config with bun + Convex deploy + SPA rewrites
