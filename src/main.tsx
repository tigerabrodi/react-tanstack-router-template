// CUSTOMIZE: Replace these font imports with your own.
// Install via: bun add @fontsource-variable/<name>
// Also update declarations.d.ts when changing fonts.
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/fraunces'
import { ConvexAuthProvider } from '@convex-dev/auth/react'
import { ConvexReactClient } from 'convex/react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './app.css'
import { routeTree } from './routeTree.gen'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const root = document.getElementById('root')!
ReactDOM.createRoot(root).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <RouterProvider router={router} />
    </ConvexAuthProvider>
  </StrictMode>
)
