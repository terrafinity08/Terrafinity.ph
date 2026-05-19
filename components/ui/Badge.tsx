import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'muted'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full',
        {
          'bg-ink text-canvas': variant === 'default',
          'bg-emerald-100 text-emerald-800': variant === 'success',
          'bg-amber-100 text-amber-800': variant === 'warning',
          'bg-red-100 text-red-700': variant === 'danger',
          'bg-stone-100 text-stone-500': variant === 'muted',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
