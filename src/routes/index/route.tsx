import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

// CUSTOMIZE: Your app name and landing page content
function HomePage() {
  return (
    <div className="bg-bg flex min-h-screen flex-col items-center justify-center gap-7 px-5">
      <div className="flex flex-col items-center gap-3">
        <h1 className="font-display text-text-primary text-display">
          My App
        </h1>
        <p className="text-text-secondary font-body text-body">
          Your next side project starts here.
        </p>
      </div>

      <Link
        to="/auth"
        className="bg-accent font-body hover:bg-accent-hover rounded-md px-8 py-3.5 text-[15px] leading-[18px] font-medium text-white transition-colors"
      >
        Sign in
      </Link>
    </div>
  )
}
