import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import WorkshopForm from '@/components/admin/WorkshopForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — New Workshop' }

export default function NewWorkshopPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/workshops" className="p-2 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-ink transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink">New workshop</h1>
          <p className="text-stone-400 text-sm mt-0.5">Create a new bookable experience</p>
        </div>
      </div>
      <WorkshopForm />
    </div>
  )
}
