'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, CalendarDays, BookOpen, LogOut, Leaf } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/admin',           label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/admin/products',  label: 'Products',   icon: Package },
  { href: '/admin/workshops', label: 'Workshops',  icon: CalendarDays },
  { href: '/admin/bookings',  label: 'Bookings',   icon: BookOpen },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-ink text-canvas flex flex-col z-50">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-7 border-b border-white/8">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
          <Leaf className="h-4 w-4 text-white/80" />
        </div>
        <div>
          <p className="text-sm font-bold tracking-wide">Terrafinity</p>
          <p className="text-[10px] text-white/40 tracking-widest uppercase">Admin Studio</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-white/12 text-white'
                  : 'text-white/45 hover:bg-white/8 hover:text-white/80'
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-white/8">
        <button
          onClick={signOut}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-white/45 hover:bg-white/8 hover:text-white/80 transition-all"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
