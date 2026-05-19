'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/gallery',   label: 'Gallery' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/about',     label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between bg-canvas/88 backdrop-blur-xl border-b border-stone-200/60 shadow-[0_1px_12px_rgba(0,0,0,0.05)]">
        {/* Logo */}
        <Link href="/" className="font-serif text-lg font-bold text-ink tracking-tight hover:opacity-70 transition-opacity">
          Terrafinity
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150',
                pathname === href
                  ? 'text-ink bg-stone-100'
                  : 'text-stone-500 hover:text-ink hover:bg-stone-50'
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Link href="/gallery" className="hidden md:flex items-center gap-2 bg-ink text-canvas text-sm font-medium px-5 py-2.5 rounded-full hover:bg-stone-800 transition-colors">
            Shop now
          </Link>
          <button className="p-2 rounded-xl text-stone-500 hover:text-ink hover:bg-stone-100 transition-colors">
            <ShoppingBag className="h-5 w-5" />
          </button>
          <button
            className="md:hidden p-2 rounded-xl text-stone-500 hover:text-ink hover:bg-stone-100 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-canvas/97 backdrop-blur-xl border-b border-stone-200 px-6 py-4 flex flex-col gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-ink transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/gallery"
            onClick={() => setOpen(false)}
            className="mt-2 text-center py-3 bg-ink text-canvas rounded-full text-sm font-medium"
          >
            Shop now
          </Link>
        </div>
      )}
    </header>
  )
}
