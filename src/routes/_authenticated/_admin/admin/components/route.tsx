import { createFileRoute } from '@tanstack/react-router'
import { LoadingComponentsShowcase } from './-components/loading'

export const Route = createFileRoute('/_authenticated/_admin/admin/components')(
  {
    component: AdminComponentsPage,
  }
)

function AdminComponentsPage() {
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
          Isolated component playground for trying motion ideas before they
          become product defaults.
        </p>
      </div>

      <LoadingComponentsShowcase />
    </div>
  )
}
