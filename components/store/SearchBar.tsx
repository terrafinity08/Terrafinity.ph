'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  placeholder?: string
  className?: string
}

export default function SearchBar({ placeholder = 'Search terrariums…', className }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search') ?? '')

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value.trim()) {
        params.set('search', value.trim())
      } else {
        params.delete('search')
      }
      router.push(`?${params.toString()}`, { scroll: false })
    }, 350)
    return () => clearTimeout(timer)
  }, [value, router, searchParams])

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-stone-200 rounded-full pl-11 pr-10 py-3 text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink transition-colors"
      />
      {value && (
        <button
          onClick={() => setValue('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="h-3.5 w-3.5 text-stone-400" />
        </button>
      )}
    </div>
  )
}
