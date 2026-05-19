import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users } from 'lucide-react'
import { cn, formatPrice, getSpotsLeft } from '@/lib/utils'
import type { Workshop } from '@/lib/types'
import { format, parseISO } from 'date-fns'

interface WorkshopCardProps {
  workshop: Workshop
  className?: string
}

export default function WorkshopCard({ workshop, className }: WorkshopCardProps) {
  const upcomingDates = (workshop.dates ?? [])
    .filter((d) => d.active && new Date(d.date) >= new Date())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)

  return (
    <div
      className={cn(
        'group bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-glass',
        'hover:shadow-glass-lg hover:-translate-y-1 transition-all duration-500',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-video bg-stone-50 overflow-hidden">
        {workshop.image_url ? (
          <Image
            src={workshop.image_url}
            alt={workshop.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
            <span className="text-stone-300 font-serif text-2xl">Workshop</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-ink mb-2">{workshop.title}</h3>
          {workshop.short_description && (
            <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">
              {workshop.short_description}
            </p>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-stone-400">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {workshop.duration_minutes >= 60
              ? `${Math.floor(workshop.duration_minutes / 60)}h${workshop.duration_minutes % 60 ? ` ${workshop.duration_minutes % 60}m` : ''}`
              : `${workshop.duration_minutes}m`}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Max {workshop.max_participants}
          </span>
        </div>

        {/* Upcoming dates */}
        {upcomingDates.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-stone-400">
              Upcoming dates
            </span>
            <div className="flex flex-wrap gap-2">
              {upcomingDates.map((d) => {
                const left = getSpotsLeft(d)
                return (
                  <span
                    key={d.id}
                    className={cn(
                      'text-xs px-3 py-1.5 rounded-full border',
                      left > 0
                        ? 'border-stone-200 text-stone-600 bg-stone-50'
                        : 'border-stone-100 text-stone-300 bg-stone-50 line-through'
                    )}
                  >
                    {format(parseISO(d.date), 'MMM d')}
                    {left > 0 && left <= 3 && (
                      <span className="ml-1 text-amber-600 font-medium">{left} left</span>
                    )}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <span className="font-bold text-lg text-ink">{formatPrice(workshop.price)}</span>
          <Link
            href={`/workshops/${workshop.slug}`}
            className="text-xs font-semibold tracking-widest uppercase px-5 py-2.5 bg-ink text-canvas rounded-full hover:bg-stone-800 transition-colors"
          >
            Book
          </Link>
        </div>
      </div>
    </div>
  )
}
