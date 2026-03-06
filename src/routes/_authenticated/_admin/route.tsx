import { LoadingScreen } from '@/components/loading-screen'
import { api } from '@convex/_generated/api'
import {
  Link,
  Navigate,
  Outlet,
  createFileRoute,
  useLocation,
} from '@tanstack/react-router'
import { useQuery } from 'convex/react'

// CUSTOMIZE: Add/remove admin nav items, change redirect
const ADMIN_NAV_ITEMS = [
  {
    label: 'Components',
    to: '/admin/components' as const,
  },
  {
    label: 'Users',
    to: '/admin/users' as const,
  },
]

export const Route = createFileRoute('/_authenticated/_admin')({
  component: AdminGuard,
})

function AdminGuard() {
  const isAdmin = useQuery(api.admin.queries.isAdmin)
  const pathname = useLocation({ select: (location) => location.pathname })

  if (isAdmin === undefined) {
    return <LoadingScreen />
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="bg-bg min-h-screen">
      <header className="border-border border-b px-5 py-5 md:px-12 md:py-7">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-text-primary text-[20px] leading-6">
              My App
            </h2>
            <Link
              to="/dashboard"
              className="text-text-secondary font-body hover:text-text-primary text-small cursor-pointer transition-colors md:hidden"
            >
              Back to dashboard
            </Link>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <nav className="flex items-center gap-2">
              {ADMIN_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.to

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={[
                      'font-body rounded-full px-3 py-1.5 text-[13px] leading-4 transition-colors',
                      isActive
                        ? 'bg-text-primary text-bg'
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/40',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <Link
              to="/dashboard"
              className="text-text-secondary font-body hover:text-text-primary hidden text-[13px] leading-4 transition-colors md:inline"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="px-5 py-8 md:px-12 md:py-12">
        <div className="mx-auto max-w-[1120px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
