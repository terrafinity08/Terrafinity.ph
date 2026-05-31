import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import WorkshopBooking from './WorkshopBooking'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getWorkshopBySlug } from '@/lib/actions/workshops'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'

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
      <main style={{ background: 'var(--black)', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Breadcrumb */}
        <div style={{ padding: '1.5rem 2rem 0', maxWidth: '1100px', margin: '0 auto' }}>
          <Link href="/workshops" style={{ color: 'var(--stone)', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L3 7l6-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            All workshops
          </Link>
        </div>

        {/* Layout */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Left: Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Image */}
            {workshop.image_url && (
              <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', background: 'rgba(255,255,255,0.05)' }}>
                <Image src={workshop.image_url} alt={workshop.title} fill style={{ objectFit: 'cover' }} priority sizes="(max-width:1024px) 100vw, 50vw" />
              </div>
            )}

            {/* Title */}
            <div>
              <p className="eyebrow eyebrow--light">Workshop</p>
              <h1 style={{ color: 'var(--white)', fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, marginTop: '0.5rem', marginBottom: '1rem' }}>{workshop.title}</h1>
              {workshop.description && (
                <p style={{ color: 'var(--stone)', lineHeight: 1.7, fontSize: '0.95rem' }}>{workshop.description}</p>
              )}
            </div>

            {/* Meta */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--stone)', fontSize: '0.9rem' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                {durationLabel}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--stone)', fontSize: '0.9rem' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 13v-1a3 3 0 00-3-3H5a3 3 0 00-3 3v1M7 7a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                Max {workshop.max_participants} participants
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--stone)', fontSize: '0.9rem' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2C5 2 3 5 3.5 7.5c.5 2.5 4.5 4 6.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M8 14V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                {formatPrice(workshop.price)} / person
              </div>
            </div>

            {/* Highlights */}
            {workshop.highlights?.length > 0 && (
              <div>
                <p className="eyebrow eyebrow--light" style={{ marginBottom: '0.75rem' }}>Highlights</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', listStyle: 'none', padding: 0, margin: 0 }}>
                  {workshop.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--stone)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M3 8l4 4 6-6" stroke="#6db87e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Includes */}
            {workshop.includes?.length > 0 && (
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '1.25rem' }}>
                <p className="eyebrow eyebrow--light" style={{ marginBottom: '0.75rem' }}>What&apos;s included</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0 }}>
                  {workshop.includes.map((inc, i) => (
                    <li key={i} style={{ color: 'var(--stone)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--stone)', flexShrink: 0 }} />
                      {inc}
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

      </main>
      <Footer />
    </>
  )
}
