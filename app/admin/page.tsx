import { Package, CalendarDays, BookOpen, TrendingUp } from 'lucide-react'
import StatCard from '@/components/admin/StatCard'
import { createAdminClient } from '@/lib/supabase/admin'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Dashboard' }
export const revalidate = 30

async function getStats() {
  const supabase = createAdminClient()
  const [products, workshops, bookings] = await Promise.all([
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('workshops').select('id', { count: 'exact', head: true }),
    supabase.from('workshop_bookings').select('total_price, status'),
  ])
  const revenue = (bookings.data ?? [])
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + Number(b.total_price), 0)
  return {
    productCount: products.count ?? 0,
    workshopCount: workshops.count ?? 0,
    bookingCount: bookings.data?.length ?? 0,
    revenue,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-ink">Dashboard</h1>
        <p className="text-stone-500 text-sm mt-1">Welcome back to the Terrafinity studio.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard title="Products" value={stats.productCount} icon={Package} trend="Total in catalogue" />
        <StatCard title="Workshops" value={stats.workshopCount} icon={CalendarDays} trend="Active experiences" />
        <StatCard title="Bookings" value={stats.bookingCount} icon={BookOpen} trend="All time" />
        <StatCard title="Revenue" value={formatPrice(stats.revenue)} icon={TrendingUp} trend="Confirmed bookings" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <h2 className="font-semibold text-sm text-stone-500 tracking-wide uppercase mb-5">Quick actions</h2>
          <div className="flex flex-col gap-2">
            {[
              { href: '/admin/products/new', label: 'Add new product', icon: Package },
              { href: '/admin/workshops/new', label: 'Add new workshop', icon: CalendarDays },
              { href: '/admin/bookings', label: 'View all bookings', icon: BookOpen },
            ].map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-50 transition-colors group"
              >
                <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                  <Icon className="h-4 w-4 text-stone-500" />
                </div>
                <span className="text-sm font-medium text-stone-700">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <h2 className="font-semibold text-sm text-stone-500 tracking-wide uppercase mb-5">Store links</h2>
          <div className="flex flex-col gap-2">
            {[
              { href: '/', label: 'Homepage' },
              { href: '/gallery', label: 'Gallery' },
              { href: '/workshops', label: 'Workshops' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-stone-50 transition-colors text-sm text-stone-600 hover:text-ink"
              >
                {label}
                <span className="text-xs text-stone-400">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
