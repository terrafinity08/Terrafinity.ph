import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  className?: string
}

export default function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-stone-100 p-6 shadow-glass flex flex-col gap-4',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-400">{title}</p>
        <div className="w-9 h-9 bg-stone-50 rounded-xl flex items-center justify-center border border-stone-100">
          <Icon className="h-4 w-4 text-stone-500" />
        </div>
      </div>
      <div>
        <p className="font-serif text-3xl font-bold text-ink">{value}</p>
        {trend && <p className="text-xs text-stone-400 mt-1">{trend}</p>}
      </div>
    </div>
  )
}
