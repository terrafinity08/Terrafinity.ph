'use client'

import { useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteWorkshop } from '@/lib/actions/workshops'
import { useRouter } from 'next/navigation'

export default function DeleteWorkshopButton({ id, title }: { id: string; title: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handle() {
    if (!confirm(`Delete "${title}"? This will also delete all scheduled dates.`)) return
    startTransition(async () => {
      await deleteWorkshop(id)
      router.refresh()
    })
  }

  return (
    <button
      onClick={handle}
      disabled={isPending}
      className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors disabled:opacity-40"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
