'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2 } from 'lucide-react'
import { Input, Textarea } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ImageUpload from './ImageUpload'
import { slugify, formatPrice } from '@/lib/utils'
import { createWorkshop, updateWorkshop, addWorkshopDate, deleteWorkshopDate } from '@/lib/actions/workshops'
import type { Workshop, WorkshopFormData } from '@/lib/types'
import { format, parseISO } from 'date-fns'

interface WorkshopFormProps {
  workshop?: Workshop
}

const EMPTY: WorkshopFormData = {
  title: '', slug: '', description: '', short_description: '',
  price: 0, duration_minutes: 120, max_participants: 10,
  image_url: '', highlights: [], includes: [], active: true,
}

export default function WorkshopForm({ workshop }: WorkshopFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [highlightInput, setHighlightInput] = useState('')
  const [includesInput, setIncludesInput] = useState('')

  // Date form
  const [newDate, setNewDate] = useState({ date: '', startTime: '10:00', endTime: '12:00', spots: 10 })
  const [addingDate, setAddingDate] = useState(false)

  const [form, setForm] = useState<WorkshopFormData>({
    ...EMPTY,
    ...(workshop
      ? {
          title: workshop.title,
          slug: workshop.slug,
          description: workshop.description ?? '',
          short_description: workshop.short_description ?? '',
          price: workshop.price,
          duration_minutes: workshop.duration_minutes,
          max_participants: workshop.max_participants,
          image_url: workshop.image_url ?? '',
          highlights: workshop.highlights ?? [],
          includes: workshop.includes ?? [],
          active: workshop.active,
        }
      : {}),
  })

  function set<K extends keyof WorkshopFormData>(key: K, value: WorkshopFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function addHighlight() {
    const text = highlightInput.trim()
    if (!text) return
    set('highlights', [...form.highlights, text])
    setHighlightInput('')
  }

  function addIncludes() {
    const text = includesInput.trim()
    if (!text) return
    set('includes', [...form.includes, text])
    setIncludesInput('')
  }

  function handleSubmit() {
    setError(null)
    if (!form.title.trim()) { setError('Title is required'); return }
    if (!form.slug.trim())  { setError('Slug is required'); return }
    if (form.price <= 0)    { setError('Price must be greater than 0'); return }

    startTransition(async () => {
      const result = workshop
        ? await updateWorkshop(workshop.id, form)
        : await createWorkshop(form)
      if (!result.success) { setError(result.error ?? 'Error saving workshop'); return }
      router.push('/admin/workshops')
    })
  }

  async function handleAddDate() {
    if (!workshop || !newDate.date) return
    setAddingDate(true)
    await addWorkshopDate(workshop.id, newDate.date, newDate.startTime, newDate.endTime, newDate.spots)
    setAddingDate(false)
    setNewDate({ date: '', startTime: '10:00', endTime: '12:00', spots: 10 })
    router.refresh()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-5">
          <h2 className="font-semibold text-sm text-stone-600 tracking-wide uppercase">Workshop Info</h2>
          <Input label="Title" value={form.title} onChange={(e) => { set('title', e.target.value); if (!workshop) set('slug', slugify(e.target.value)) }} placeholder="Terrarium Making 101" />
          <Input label="Slug" value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="terrarium-making-101" />
          <Textarea label="Short description" value={form.short_description} onChange={(e) => set('short_description', e.target.value)} rows={2} placeholder="Brief tagline shown on cards" />
          <Textarea label="Full description" value={form.description} onChange={(e) => set('description', e.target.value)} rows={6} placeholder="What participants will learn, experience, and take home…" />
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-4">
          <h2 className="font-semibold text-sm text-stone-600 tracking-wide uppercase">Highlights</h2>
          <div className="flex gap-2">
            <Input value={highlightInput} onChange={(e) => setHighlightInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())} placeholder="e.g. Make your own terrarium" className="flex-1" />
            <Button type="button" variant="secondary" onClick={addHighlight} size="sm"><Plus className="h-4 w-4" /></Button>
          </div>
          {form.highlights.map((h, i) => (
            <div key={i} className="flex items-center justify-between text-sm bg-stone-50 rounded-xl px-4 py-2.5">
              <span>{h}</span>
              <button onClick={() => set('highlights', form.highlights.filter((_, j) => j !== i))} className="text-stone-400 hover:text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          ))}
        </div>

        {/* Includes */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-4">
          <h2 className="font-semibold text-sm text-stone-600 tracking-wide uppercase">What's included</h2>
          <div className="flex gap-2">
            <Input value={includesInput} onChange={(e) => setIncludesInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addIncludes())} placeholder="e.g. All materials" className="flex-1" />
            <Button type="button" variant="secondary" onClick={addIncludes} size="sm"><Plus className="h-4 w-4" /></Button>
          </div>
          {form.includes.map((inc, i) => (
            <div key={i} className="flex items-center justify-between text-sm bg-stone-50 rounded-xl px-4 py-2.5">
              <span>{inc}</span>
              <button onClick={() => set('includes', form.includes.filter((_, j) => j !== i))} className="text-stone-400 hover:text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          ))}
        </div>

        {/* Dates (only for existing workshops) */}
        {workshop && (
          <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-4">
            <h2 className="font-semibold text-sm text-stone-600 tracking-wide uppercase">Workshop Dates</h2>
            {(workshop.dates ?? []).sort((a, b) => a.date.localeCompare(b.date)).map((d) => (
              <div key={d.id} className="flex items-center justify-between text-sm bg-stone-50 rounded-xl px-4 py-3">
                <div>
                  <span className="font-medium">{format(parseISO(d.date), 'EEEE, MMMM d, yyyy')}</span>
                  <span className="text-stone-400 ml-2">{d.start_time}{d.end_time ? `–${d.end_time}` : ''}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-stone-500">{d.spots_booked}/{d.spots_total} booked</span>
                  <button onClick={() => deleteWorkshopDate(d.id)} className="text-stone-400 hover:text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-stone-100">
              <Input label="Date" type="date" value={newDate.date} onChange={(e) => setNewDate((p) => ({ ...p, date: e.target.value }))} />
              <Input label="Start" type="time" value={newDate.startTime} onChange={(e) => setNewDate((p) => ({ ...p, startTime: e.target.value }))} />
              <Input label="End" type="time" value={newDate.endTime} onChange={(e) => setNewDate((p) => ({ ...p, endTime: e.target.value }))} />
              <Input label="Spots" type="number" value={newDate.spots} onChange={(e) => setNewDate((p) => ({ ...p, spots: Number(e.target.value) }))} />
            </div>
            <Button variant="secondary" onClick={handleAddDate} loading={addingDate} className="self-start">
              <Plus className="h-4 w-4" /> Add date
            </Button>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <ImageUpload label="Workshop Image" value={form.image_url} onChange={(url) => set('image_url', url)} bucket="workshop-images" />
        </div>
        <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-4">
          <h2 className="font-semibold text-sm text-stone-600 tracking-wide uppercase">Pricing</h2>
          <Input label="Price (₱)" type="number" value={form.price || ''} onChange={(e) => set('price', Number(e.target.value))} placeholder="4250" />
          {form.price > 0 && <p className="text-xs text-stone-400">{formatPrice(form.price)}</p>}
          <Input label="Duration (minutes)" type="number" value={form.duration_minutes} onChange={(e) => set('duration_minutes', Number(e.target.value))} />
          <Input label="Max participants" type="number" value={form.max_participants} onChange={(e) => set('max_participants', Number(e.target.value))} />
        </div>
        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${form.active ? 'bg-ink border-ink' : 'border-stone-300'}`}
              onClick={() => set('active', !form.active)}
            >
              {form.active && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className="text-sm text-stone-600">Workshop is active / bookable</span>
          </label>
        </div>
        {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">{error}</div>}
        <Button onClick={handleSubmit} loading={isPending} size="lg" className="w-full">
          {workshop ? 'Save changes' : 'Create workshop'}
        </Button>
        <Button variant="secondary" onClick={() => router.back()} className="w-full" size="lg">Cancel</Button>
      </div>
    </div>
  )
}
