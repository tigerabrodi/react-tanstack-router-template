import { createFileRoute, Link } from '@tanstack/react-router'

// CUSTOMIZE: Add a new entry here for each component showcase you create.
// Each showcase lives in its own sub-route under /admin/components/<name>.
const COMPONENT_SHOWCASES = [
  {
    title: 'Loading screen',
    description: 'Loading state motion variations (spinner, pulse, accent bar).',
    to: '/admin/components/loading-screen' as const,
  },
] as const

export const Route = createFileRoute('/_authenticated/_admin/admin/components')(
  {
    component: AdminComponentsIndexPage,
  }
)

function AdminComponentsIndexPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-text-secondary font-body text-[12px] tracking-[0.08em] uppercase">
          Admin
        </p>
        <h1 className="font-display text-text-primary text-[32px] leading-[36px]">
          Components
        </h1>
        <p className="text-text-secondary font-body max-w-[680px] text-[15px] leading-6">
          Isolated component playground. Each showcase has its own dedicated
          route — pick one to view it in isolation.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {COMPONENT_SHOWCASES.map((showcase) => (
          <ComponentShowcaseCard key={showcase.to} showcase={showcase} />
        ))}
      </div>
    </div>
  )
}

function ComponentShowcaseCard({
  showcase,
}: {
  showcase: (typeof COMPONENT_SHOWCASES)[number]
}) {
  return (
    <Link
      to={showcase.to}
      className="border-border bg-surface hover:border-text-primary group flex flex-col gap-2 rounded-[16px] border p-6 transition-colors"
    >
      <h2 className="font-body text-text-primary text-[15px] leading-5 font-medium">
        {showcase.title}
      </h2>
      <p className="text-text-secondary font-body text-[14px] leading-6">
        {showcase.description}
      </p>
      <span className="text-text-muted font-body group-hover:text-text-primary mt-2 text-[12px] leading-4 transition-colors">
        View →
      </span>
    </Link>
  )
}
