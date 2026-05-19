'use client'

import { useState, useTransition } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { createBooking } from '@/lib/actions/bookings'
import { formatPrice, getSpotsLeft } from '@/lib/utils'
import type { Workshop, WorkshopDate } from '@/lib/types'
import { format, parseISO } from 'date-fns'
import { cn } from '@/lib/utils'

interface Props {
  workshop: Workshop
}

export default function WorkshopBooking({ workshop }: Props) {
  const [isPending, startTransition] = useTransition()
  const [selectedDate, setSelectedDate] = useState<WorkshopDate | null>(null)
  const [qty, setQty] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const upcomingDates = (workshop.dates ?? [])
    .filter((d) => d.active && new Date(d.date) >= new Date())
    .sort((a, b) => a.date.localeCompare(b.date))

  const total = workshop.price * qty

  function handleSubmit() {
    setError(null)
    if (!selectedDate) { setError('Please select a date'); return }
    if (!form.name.trim()) { setError('Name is required'); return }
    if (!form.email.trim()) { setError('Email is required'); return }
    if (qty < 1 || qty > getSpotsLeft(selectedDate)) { setError('Invalid quantity'); return }

    startTransition(async () => {
      const result = await createBooking(
        {
          workshop_id: workshop.id,
          workshop_date_id: selectedDate.id,
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: form.phone,
          qty,
          notes: form.notes,
        },
        total
      )
      if (!result.success) { setError(result.error ?? 'Booking failed'); return }
      setSuccess(true)
    })
  }

  if (success) {
    return (
      <div className="bg-white rounded-3xl border border-stone-100 shadow-glass p-8 text-center flex flex-col items-center gap-5">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-ink mb-2">You're booked!</h3>
          <p className="text-stone-500 text-sm">
            We'll send a confirmation to <strong>{form.email}</strong> shortly.
          </p>
        </div>
        <div className="bg-stone-50 rounded-2xl p-4 w-full text-left">
          <p className="text-xs text-stone-400 font-semibold tracking-widest uppercase mb-2">Booking summary</p>
          <p className="text-sm text-stone-700 font-medium">{workshop.title}</p>
          {selectedDate && (
            <p className="text-sm text-stone-500 mt-1">
              {format(parseISO(selectedDate.date), 'EEEE, MMMM d, yyyy')} · {selectedDate.start_time}
            </p>
          )}
          <p className="text-sm font-semibold text-ink mt-2">{formatPrice(total)}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl border border-stone-100 shadow-glass p-6 md:p-8 sticky top-24">
      <div className="mb-6">
        <p className="font-serif text-3xl font-bold text-ink">{formatPrice(workshop.price)}</p>
        <p className="text-sm text-stone-400 mt-1">per person</p>
      </div>

      {/* Date selection */}
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-3">Select a date</p>
        {upcomingDates.length === 0 ? (
          <p className="text-sm text-stone-400">No upcoming dates scheduled.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {upcomingDates.map((d) => {
              const left = getSpotsLeft(d)
              const full = left === 0
              return (
                <button
                  key={d.id}
                  disabled={full}
                  onClick={() => setSelectedDate(d)}
                  className={cn(
                    'flex items-center justify-between w-full rounded-xl border px-4 py-3 text-sm text-left transition-all',
                    full ? 'opacity-40 cursor-not-allowed border-stone-100' :
                    selectedDate?.id === d.id
                      ? 'border-ink bg-ink text-canvas'
                      : 'border-stone-200 hover:border-stone-400'
                  )}
                >
                  <span className="font-medium">{format(parseISO(d.date), 'EEE, MMM d')}</span>
                  <span className="flex items-center gap-2 text-xs">
                    <span>{d.start_time}</span>
                    {full ? (
                      <span className="text-stone-400">Full</span>
                    ) : left <= 3 ? (
                      <span className="text-amber-600">{left} left</span>
                    ) : (
                      <span className={selectedDate?.id === d.id ? 'text-white/60' : 'text-stone-400'}>{left} spots</span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Qty */}
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-3">Participants</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
          >
            −
          </button>
          <span className="w-8 text-center font-medium text-ink">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(selectedDate ? getSpotsLeft(selectedDate) : workshop.max_participants, q + 1))}
            className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
          >
            +
          </button>
          <span className="text-sm text-stone-400 ml-2">= {formatPrice(total)}</span>
        </div>
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-4 mb-6">
        <Input label="Full name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Maria Santos" />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="maria@email.com" />
        <Input label="Phone (optional)" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="+63 917 000 0000" />
        <Textarea label="Notes (optional)" value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} rows={2} placeholder="Any questions or special requests?" />
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <Button onClick={handleSubmit} loading={isPending} size="lg" className="w-full" disabled={upcomingDates.length === 0}>
        Confirm booking — {formatPrice(total)}
      </Button>
    </div>
  )
}
