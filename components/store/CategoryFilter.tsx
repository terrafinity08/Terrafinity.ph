'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { Category } from '@/lib/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('category') ?? 'all'

  function select(slug: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') {
      params.delete('category')
    } else {
      params.set('category', slug)
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const tabs = [{ name: 'All', slug: 'all' }, ...categories]

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
      {tabs.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => select(cat.slug)}
          className={cn(
            'flex-shrink-0 text-xs font-medium tracking-wider uppercase px-5 py-2.5 rounded-full border transition-all duration-200',
            active === cat.slug
              ? 'bg-ink text-canvas border-ink'
              : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400 hover:text-ink'
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
