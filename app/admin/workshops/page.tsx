import Link from 'next/link'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { getWorkshops } from '@/lib/actions/workshops'
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import DeleteWorkshopButton from './DeleteWorkshopButton'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Workshops' }
export const revalidate = 0

export default async function AdminWorkshopsPage() {
  const workshops = await getWorkshops()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink">Workshops</h1>
          <p className="text-stone-400 text-sm mt-1">{workshops.length} workshop{workshops.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/workshops/new" className="inline-flex items-center gap-2 bg-ink text-canvas text-sm font-medium px-5 py-2.5 rounded-full hover:bg-stone-800 transition-colors">
          <Plus className="h-4 w-4" /> Add workshop
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {workshops.length === 0 && (
          <div className="bg-white rounded-2xl border border-stone-100 p-10 text-center text-stone-400">
            No workshops yet.{' '}
            <Link href="/admin/workshops/new" className="underline">Create your first →</Link>
          </div>
        )}
        {workshops.map((ws) => {
          const upcomingDates = (ws.dates ?? []).filter((d) => new Date(d.date) >= new Date())
          return (
            <div key={ws.id} className="bg-white rounded-2xl border border-stone-100 p-5 flex items-start gap-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-ink">{ws.title}</h3>
                  {ws.active ? (
                    <Badge variant="success">Active</Badge>
                  ) : (
                    <Badge variant="muted">Inactive</Badge>
                  )}
                </div>
                <p className="text-sm text-stone-500 line-clamp-1 mb-3">{ws.short_description}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-stone-400">
                  <span>{formatPrice(ws.price)} / person</span>
                  <span>{ws.duration_minutes}min</span>
                  <span>{ws.max_participants} max participants</span>
                  <span>{upcomingDates.length} upcoming date{upcomingDates.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/admin/workshops/${ws.id}/edit`} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-ink transition-colors">
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteWorkshopButton id={ws.id} title={ws.title} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
