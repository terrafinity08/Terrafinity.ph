'use client'

import { useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteProduct } from '@/lib/actions/products'
import { useRouter } from 'next/navigation'

interface Props {
  id: string
  name: string
}

export default function DeleteProductButton({ id, name }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    startTransition(async () => {
      await deleteProduct(id)
      router.refresh()
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors disabled:opacity-40"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
