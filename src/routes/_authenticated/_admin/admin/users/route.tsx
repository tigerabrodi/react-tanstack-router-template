import { useAuthActions } from '@convex-dev/auth/react'
import { createFileRoute } from '@tanstack/react-router'
import { api } from '@convex/_generated/api'
import { useMutation } from 'convex/react'
import { useState } from 'react'
import { getConvexErrorMessage } from '@/lib/convex-error'

export const Route = createFileRoute('/_authenticated/_admin/admin/users')({
  component: AdminUsersPage,
})

function AdminUsersPage() {
  const clearAllUsers = useMutation(api.admin.mutations.clearAllUsers)
  const { signOut } = useAuthActions()
  const [status, setStatus] = useState<string | null>(null)
  const [isClearing, setIsClearing] = useState(false)

  async function handleClearAllUsers() {
    // CUSTOMIZE: Update confirmation message for your app's data
    const isConfirmed = window.confirm(
      'This will delete all users and auth records. Continue?'
    )

    if (!isConfirmed) {
      return
    }

    setIsClearing(true)
    setStatus(null)

    try {
      const result = await clearAllUsers()

      setStatus(
        `Cleared ${result.deletedUsers} users. Redirecting to landing page.`
      )

      window.localStorage.clear()
      window.sessionStorage.clear()

      try {
        await signOut()
      } catch {
        // Session records may already be deleted by the admin mutation.
      }

      window.location.href = '/'
    } catch (error) {
      setStatus(getConvexErrorMessage(error))
      setIsClearing(false)
    }
  }

  return (
    <section className="flex max-w-[720px] flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-text-secondary font-body text-[12px] tracking-[0.08em] uppercase">
          Admin
        </p>
        <h1 className="font-display text-text-primary text-[32px] leading-[36px]">
          Users
        </h1>
        <p className="text-text-secondary font-body max-w-[560px] text-[15px] leading-6">
          Local-development utility for wiping auth tables and users in one
          action.
        </p>
      </div>

      <div className="border-border bg-surface flex flex-col gap-6 rounded-[16px] border p-6 md:p-8">
        <div className="flex flex-col gap-3">
          <h2 className="font-body text-text-primary text-[15px] leading-5 font-medium">
            Clear all users
          </h2>
          <p className="text-text-secondary font-body text-[14px] leading-6">
            This is intentionally destructive. Use it to reset local auth state
            while developing admin and onboarding flows. Browser cookies may
            still need manual clearing after the redirect.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            disabled={isClearing}
            onClick={() => void handleClearAllUsers()}
            className="font-body bg-accent hover:bg-accent-hover w-full cursor-pointer rounded-md px-5 py-3 text-[15px] leading-[18px] font-medium text-white transition-colors disabled:cursor-default disabled:opacity-50 md:w-auto"
          >
            {isClearing ? 'Clearing users...' : 'Clear all users'}
          </button>

          <p className="text-text-muted font-body text-[13px] leading-5">
            You may still need to clear browser cookies manually afterward.
          </p>
        </div>

        {status && (
          <div className="border-border bg-bg rounded-md border px-4 py-3">
            <p className="text-text-secondary font-body text-[13px] leading-5">
              {status}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
