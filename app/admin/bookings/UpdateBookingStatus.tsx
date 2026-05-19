'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updateBookingStatus } from '@/lib/actions/bookings'
import type { WorkshopBooking } from '@/lib/types'

export default function UpdateBookingStatus({
  id,
  current,
}: {
  id: string
  current: WorkshopBooking['status']
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handle(e: React.ChangeEvent<HTMLSelectElement>) {
    const status = e.target.value as WorkshopBooking['status']
    startTransition(async () => {
      await updateBookingStatus(id, status)
      router.refresh()
    })
  }

  return (
    <select
      value={current}
      onChange={handle}
      disabled={isPending}
      className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-ink/20 disabled:opacity-40"
    >
      <option value="pending">pending</option>
      <option value="confirmed">confirmed</option>
      <option value="cancelled">cancelled</option>
      <option value="completed">completed</option>
    </select>
  )
}
