import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import WorkshopBooking from './WorkshopBooking'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getWorkshopBySlug } from '@/lib/actions/workshops'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, CheckCircle2 } from 'lucide-react'

export const revalidate = 60

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ws = await getWorkshopBySlug(slug)
  if (!ws) return { title: 'Not found' }
  return { title: ws.title, description: ws.short_description ?? undefined }
}

export default async function WorkshopDetailPage({ params }: Props) {
  const { slug } = await params
  const workshop = await getWorkshopBySlug(slug)
  if (!workshop) notFound()

  const durationLabel =
    workshop.duration_minutes >= 60
      ? `${Math.floor(workshop.duration_minutes / 60)}h${workshop.duration_minutes % 60 ? ` ${workshop.duration_minutes % 60}m` : ''}`
      : `${workshop.duration_minutes}m`

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link href="/workshops" className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-ink transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> All workshops
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div className="flex flex-col gap-8">
              {workshop.image_url && (
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-stone-50">
                  <Image src={workshop.image_url} alt={workshop.title} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 50vw" />
                </div>
              )}

              <div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink tracking-tight mb-4">{workshop.title}</h1>
                {workshop.description && (
                  <p className="text-stone-500 leading-relaxed">{workshop.description}</p>
                )}
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <Clock className="h-4 w-4" />
                  <span>{durationLabel}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <Users className="h-4 w-4" />
                  <span>Max {workshop.max_participants} participants</span>
                </div>
              </div>

              {workshop.highlights?.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4">Highlights</h3>
                  <ul className="flex flex-col gap-2.5">
                    {workshop.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-stone-600">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.includes?.length > 0 && (
                <div className="bg-stone-50 rounded-2xl p-6">
                  <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4">What's included</h3>
                  <ul className="flex flex-col gap-2">
                    {workshop.includes.map((inc, i) => (
                      <li key={i} className="text-sm text-stone-600 flex items-center gap-2">
                        <span className="w-1 h-1 bg-stone-400 rounded-full" /> {inc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: Booking */}
            <div>
              <WorkshopBooking workshop={workshop} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
