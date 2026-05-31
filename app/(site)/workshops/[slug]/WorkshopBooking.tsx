'use client'

import { useState, useTransition } from 'react'
import { createBooking } from '@/lib/actions/bookings'
import { formatPrice, getSpotsLeft } from '@/lib/utils'
import type { Workshop, WorkshopDate } from '@/lib/types'

interface Props { workshop: Workshop }

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px',
  padding: '0.8rem 1rem', color: 'var(--white)', fontSize: '0.9rem', outline: 'none',
}
const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
  color: 'var(--stone)', marginBottom: '0.4rem', display: 'block',
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

  const total = (workshop.price ?? 0) * qty

  function fmt(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString('en-PH', { weekday: 'short', month: 'short', day: 'numeric' })
    } catch { return dateStr }
  }

  function handleSubmit() {
    setError(null)
    if (!selectedDate) { setError('Please select a date'); return }
    if (!form.name.trim()) { setError('Name is required'); return }
    if (!form.email.trim()) { setError('Email is required'); return }
    if (qty < 1) { setError('Invalid quantity'); return }

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
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ width: '56px', height: '56px', background: 'rgba(109,184,126,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 14l6 6 10-10" stroke="#6db87e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h3 style={{ color: 'var(--white)', fontSize: '1.5rem', fontFamily: 'var(--font-serif)', fontWeight: 700, marginBottom: '0.75rem' }}>You&apos;re booked!</h3>
        <p style={{ color: 'var(--stone)', fontSize: '0.9rem' }}>Confirmation sent to <strong style={{ color: 'var(--white)' }}>{form.email}</strong></p>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '1rem', marginTop: '1.5rem', textAlign: 'left' }}>
          <p style={{ color: 'var(--stone)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Booking summary</p>
          <p style={{ color: 'var(--white)', fontWeight: 600, fontSize: '0.95rem' }}>{workshop.title}</p>
          {selectedDate && <p style={{ color: 'var(--stone)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{fmt(selectedDate.date)} · {selectedDate.start_time}</p>}
          <p style={{ color: 'var(--white)', fontWeight: 700, marginTop: '0.5rem' }}>{formatPrice(total)}</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: '100px' }}>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.25rem' }}>{formatPrice(workshop.price)}</p>
      <p style={{ color: 'var(--stone)', fontSize: '0.85rem', marginBottom: '2rem' }}>per person</p>

      {/* Dates */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={labelStyle}>Select a date</p>
        {upcomingDates.length === 0 ? (
          <p style={{ color: 'var(--stone)', fontSize: '0.9rem' }}>No upcoming dates scheduled. <a href="/create" style={{ color: 'var(--green-mid)', textDecoration: 'none' }}>Request a private session →</a></p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {upcomingDates.map((d) => {
              const left = getSpotsLeft(d)
              const full = left === 0
              const selected = selectedDate?.id === d.id
              return (
                <button
                  key={d.id}
                  disabled={full}
                  onClick={() => setSelectedDate(d)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: selected ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                    border: selected ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px', padding: '0.75rem 1rem', cursor: full ? 'not-allowed' : 'pointer',
                    opacity: full ? 0.4 : 1, color: 'var(--white)', fontSize: '0.875rem',
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{fmt(d.date)}</span>
                  <span style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--stone)' }}>
                    <span>{d.start_time}</span>
                    {full ? <span>Full</span> : left <= 3 ? <span style={{ color: '#c9a84c' }}>{left} left</span> : <span>{left} spots</span>}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Qty */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={labelStyle}>Participants</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'var(--white)', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
          <span style={{ color: 'var(--white)', fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>{qty}</span>
          <button onClick={() => setQty((q) => Math.min(selectedDate ? getSpotsLeft(selectedDate) : workshop.max_participants, q + 1))} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'var(--white)', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          <span style={{ color: 'var(--stone)', fontSize: '0.9rem' }}>= {formatPrice(total)}</span>
        </div>
      </div>

      {/* Contact */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Full name', name: 'name', type: 'text', placeholder: 'Maria Santos' },
          { label: 'Email', name: 'email', type: 'email', placeholder: 'maria@email.com' },
          { label: 'Phone (optional)', name: 'phone', type: 'tel', placeholder: '+63 917 000 0000' },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label style={labelStyle}>{label}</label>
            <input type={type} name={name} placeholder={placeholder} required={name !== 'phone'} value={form[name as keyof typeof form]} onChange={(e) => setForm(p => ({ ...p, [name]: e.target.value }))} style={inputStyle} />
          </div>
        ))}
        <div>
          <label style={labelStyle}>Notes (optional)</label>
          <textarea name="notes" placeholder="Any questions or special requests?" rows={2} value={form.notes} onChange={(e) => setForm(p => ({ ...p, notes: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(220,50,50,0.1)', border: '1px solid rgba(220,50,50,0.3)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#ff8080', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isPending || upcomingDates.length === 0}
        style={{ width: '100%', background: 'var(--white)', color: 'var(--black)', border: 'none', borderRadius: '50px', padding: '1rem', fontWeight: 700, fontSize: '0.95rem', cursor: isPending ? 'wait' : 'pointer', opacity: isPending ? 0.7 : 1, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
      >
        {isPending ? (
          <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> Booking…</>
        ) : `Confirm booking — ${formatPrice(total)}`}
      </button>
    </div>
  )
}
