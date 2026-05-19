import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WorkshopCard from '@/components/store/WorkshopCard'
import { getWorkshops } from '@/lib/actions/workshops'

export const metadata: Metadata = { title: 'Workshops' }
export const dynamic = 'force-dynamic'

export default async function WorkshopsPage() {
  const workshops = await getWorkshops(true)

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <div className="bg-stone-50 border-b border-stone-100 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-stone-400 mb-3">Hands-on</p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-ink tracking-tight mb-4">Workshops</h1>
            <p className="text-stone-500 max-w-lg leading-relaxed">
              Build your own living terrarium. All materials, guidance, and a take-home creation included.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          {workshops.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-stone-400 text-sm">No workshops scheduled yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workshops.map((ws) => (
                <WorkshopCard key={ws.id} workshop={ws} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
