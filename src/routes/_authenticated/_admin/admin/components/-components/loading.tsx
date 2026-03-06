import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { useState } from 'react'

// CUSTOMIZE: Replace with your app's loading patterns

function Showcase({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: (key: number) => ReactNode
}) {
  const [key, setKey] = useState(0)

  return (
    <section className="border-border bg-surface flex flex-col gap-5 rounded-[16px] border p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-[520px] flex-col gap-2">
          <h2 className="font-body text-text-primary text-[15px] leading-5 font-medium">
            {title}
          </h2>
          <p className="text-text-secondary font-body text-[14px] leading-6">
            {description}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setKey((currentKey) => currentKey + 1)}
          className="text-text-secondary font-body hover:text-text-primary w-fit cursor-pointer text-[13px] leading-4 transition-colors"
        >
          Reset animation
        </button>
      </div>

      <div className="bg-bg rounded-[14px] p-4 md:p-6">{children(key)}</div>
    </section>
  )
}

function PreviewStage({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="border-border bg-surface flex min-h-[160px] items-center justify-center rounded-[12px] border px-4 py-8">
        {children}
      </div>
      <p className="text-text-muted font-body text-[12px] leading-4">{label}</p>
    </div>
  )
}

function LoadingVariationSpinner() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0.24, ease: 'easeOut' }
          : {
              opacity: { duration: 0.4, ease: 'easeOut' },
              y: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            }
      }
    >
      <div className="border-border border-t-accent h-10 w-10 animate-spin rounded-full border-2" />
    </motion.div>
  )
}

function LoadingVariationPulseDots() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="bg-accent h-2.5 w-2.5 rounded-full"
          initial={{ scale: 0.6, opacity: 0.4 }}
          animate={
            shouldReduceMotion
              ? { scale: 1, opacity: 1 }
              : { scale: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0.24, ease: 'easeOut' }
              : {
                  duration: 1.2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  delay: i * 0.15,
                }
          }
        />
      ))}
    </div>
  )
}

function LoadingVariationAccentBar() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="bg-border h-1 w-48 overflow-hidden rounded-full">
      <motion.div
        className="bg-accent h-full rounded-full"
        initial={{ width: '0%', x: 0 }}
        animate={
          shouldReduceMotion
            ? { width: '100%' }
            : { width: ['0%', '60%', '100%', '60%', '0%'], x: ['0%', '0%', '0%', '40%', '100%'] }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0.24, ease: 'easeOut' }
            : { duration: 2, ease: 'easeInOut', repeat: Infinity }
        }
      />
    </div>
  )
}

function LoadingComponentsShowcase() {
  return (
    <Showcase
      title="Loading variations"
      description="Three motion directions for loading states. Use these as starting points for your app's loading patterns."
    >
      {(key) => (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <PreviewStage label="1. Fade-in spinner (default loading screen)">
            <LoadingVariationSpinner key={`spinner-${key}`} />
          </PreviewStage>

          <PreviewStage label="2. Pulse dots">
            <LoadingVariationPulseDots key={`dots-${key}`} />
          </PreviewStage>

          <PreviewStage label="3. Accent bar">
            <LoadingVariationAccentBar key={`bar-${key}`} />
          </PreviewStage>
        </div>
      )}
    </Showcase>
  )
}

export { LoadingComponentsShowcase }
