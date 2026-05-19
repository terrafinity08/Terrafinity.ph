import { getBookings } from '@/lib/actions/bookings'
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import UpdateBookingStatus from './UpdateBookingStatus'
import { format, parseISO } from 'date-fns'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Bookings' }
export const revalidate = 0

const statusVariant = {
  pending:   'warning',
  confirmed: 'success',
  cancelled: 'danger',
  completed: 'muted',
} as const

export default async function AdminBookingsPage() {
  const bookings = await getBookings()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-ink">Bookings</h1>
        <p className="text-stone-400 text-sm mt-1">{bookings.length} total booking{bookings.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-stone-100">
              <tr>
                {['Customer', 'Workshop', 'Date', 'Qty', 'Total', 'Status', 'Booked', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold tracking-widest uppercase text-stone-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-stone-400">No bookings yet.</td>
                </tr>
              )}
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-stone-50 hover:bg-stone-50/60 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-ink">{b.customer_name}</p>
                    <p className="text-xs text-stone-400">{b.customer_email}</p>
                  </td>
                  <td className="px-5 py-4 text-stone-600">{(b.workshop as any)?.title ?? '—'}</td>
                  <td className="px-5 py-4 text-stone-500 whitespace-nowrap">
                    {b.workshop_date
                      ? format(parseISO((b.workshop_date as any).date), 'MMM d, yyyy')
                      : '—'}
                  </td>
                  <td className="px-5 py-4 text-center font-medium text-ink">{b.qty}</td>
                  <td className="px-5 py-4 font-semibold text-ink">{formatPrice(b.total_price)}</td>
                  <td className="px-5 py-4">
                    <Badge variant={statusVariant[b.status]}>{b.status}</Badge>
                  </td>
                  <td className="px-5 py-4 text-stone-400 whitespace-nowrap text-xs">
                    {format(parseISO(b.created_at), 'MMM d, h:mm a')}
                  </td>
                  <td className="px-5 py-4">
                    <UpdateBookingStatus id={b.id} current={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
