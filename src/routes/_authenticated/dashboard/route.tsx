import { useCurrentUser } from '@/lib/current-user-context'
import { useAuthActions } from '@convex-dev/auth/react'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
})

// CUSTOMIZE: Replace with your app's main content
function DashboardPage() {
  const currentUser = useCurrentUser()
  const { signOut } = useAuthActions()

  return (
    <div className="bg-bg min-h-screen">
      <header className="border-border border-b px-5 py-5 md:px-12 md:py-7">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between">
          <h2 className="font-display text-text-primary text-[20px] leading-6">
            My App
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-text-secondary font-body text-small">
              {currentUser.email}
            </span>
            <button
              onClick={() => void signOut()}
              className="text-text-secondary font-body hover:text-text-primary cursor-pointer text-small transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="px-5 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-6">
          <h1 className="font-display text-text-primary text-[32px] leading-[36px]">
            Welcome, {currentUser.name ?? 'there'}
          </h1>
          <p className="text-text-secondary font-body text-body max-w-[560px]">
            This is your dashboard. Start building your app here.
          </p>

          {currentUser.isAdmin && (
            <Link
              to="/admin/components"
              className="text-accent font-body hover:text-accent-hover w-fit text-body transition-colors"
            >
              Admin panel
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
