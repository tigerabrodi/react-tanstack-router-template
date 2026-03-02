import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="bg-bg flex min-h-screen items-center justify-center">
      <h1 className="font-display text-display text-text-primary">
        Hello World
      </h1>
    </div>
  )
}
