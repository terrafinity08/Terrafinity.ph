import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import WorkshopForm from '@/components/admin/WorkshopForm'
import { getWorkshopBySlug } from '@/lib/actions/workshops'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Workshop } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Edit Workshop' }

async function getWorkshopById(id: string): Promise<Workshop | null> {
  const supabase = createAdminClient()
  const { data } = await supabase.from('workshops').select('*, dates:workshop_dates(*)').eq('id', id).single()
  return data as Workshop | null
}

interface Props { params: Promise<{ id: string }> }

export default async function EditWorkshopPage({ params }: Props) {
  const { id } = await params
  const workshop = await getWorkshopById(id)
  if (!workshop) notFound()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/workshops" className="p-2 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-ink transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink">Edit: {workshop.title}</h1>
          <p className="text-stone-400 text-sm mt-0.5">Manage dates, details, and availability</p>
        </div>
      </div>
      <WorkshopForm workshop={workshop} />
    </div>
  )
}
