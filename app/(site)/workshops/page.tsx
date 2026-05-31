import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getWorkshops } from '@/lib/actions/workshops'
import { formatPrice } from '@/lib/utils'

export const metadata: Metadata = { title: 'Workshops — Terrafinity' }
export const dynamic = 'force-dynamic'

export default async function WorkshopsPage() {
  const workshops = await getWorkshops(true)

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="hv2" id="workshops-hero" style={{ minHeight: '55vh' }}>
          <div className="hv2-forest" aria-hidden="true">
            <div className="hv2-sky" />
            <div className="hv2-mist hv2-mist--1" />
            <div className="hv2-mist hv2-mist--2" />
            <div className="hv2-ground" />
          </div>
          <div className="hv2-overlay" />
          <div className="hv2-content" style={{ textAlign: 'center' }}>
            <p className="hv2-eyebrow">Hands-on Experience</p>
            <h1 className="hv2-h1">Terrarium <em>Workshops</em></h1>
            <p className="hv2-sub">Build your own living ecosystem. All materials, guidance, and a take-home creation included.</p>
            <div className="hv2-ctas">
              <a href="#workshops-list" className="btn btn--dark">See all workshops</a>
              <Link href="/create" className="btn btn--outline">Custom order</Link>
            </div>
          </div>
        </section>

        {/* Workshop list */}
        <section className="workshops" id="workshops-list">
          <div className="workshops__left">
            <p className="eyebrow">What to Expect</p>
            <h2>Hands-on.<br />Mindful.<br />Unforgettable.</h2>
            <p>Join our terrarium workshops and create your own living landscape in a relaxed, inspiring environment. No experience needed — everything is provided.</p>
            <Link href="/create" className="btn btn--outline" style={{ marginTop: '1rem' }}>
              Request a custom session{' '}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
          <div className="workshops__right">
            <div className="workshop-cards">
              {workshops.length > 0 ? workshops.map((ws, i) => (
                <Link key={ws.id} href={`/workshops/${ws.slug}`} className="workshop-card" style={{ textDecoration: 'none', display: 'block' }}>
                  <div className={`workshop-card__img workshop-card__img--${(i % 2) + 1}`}>
                    {ws.image_url ? (
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image src={ws.image_url} alt={ws.title} fill style={{ objectFit: 'cover' }} sizes="400px" />
                      </div>
                    ) : (
                      <div className="workshop-scene">
                        <div className="ws-table" /><div className="ws-person ws-person--1" /><div className="ws-person ws-person--2" /><div className="ws-terrarium" />
                      </div>
                    )}
                  </div>
                  <div className="workshop-card__body">
                    <h4>{ws.title}</h4>
                    {ws.short_description && <p style={{ fontSize: '0.85rem', color: 'var(--stone)', marginBottom: '0.5rem', lineHeight: 1.5 }}>{ws.short_description}</p>}
                    <div className="workshop-meta">
                      <span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                        {' '}{ws.duration_minutes} min
                      </span>
                      <span>Up to {ws.max_participants} people</span>
                    </div>
                    <p className="workshop-price">{formatPrice(ws.price)} <span>/ person</span></p>
                    <span className="btn btn--dark btn--sm" style={{ display: 'inline-block' }}>Book now</span>
                  </div>
                </Link>
              )) : (
                <>
                  {[
                    { title: 'Terrarium Basics', duration: '2.5 hours', level: 'Beginner', price: '₱4,250' },
                    { title: 'Advanced Design',  duration: '3 hours',   level: 'Intermediate', price: '₱6,250' },
                  ].map((w, i) => (
                    <div key={w.title} className="workshop-card">
                      <div className={`workshop-card__img workshop-card__img--${i + 1}`}>
                        <div className="workshop-scene">
                          <div className="ws-table" /><div className="ws-person ws-person--1" /><div className="ws-person ws-person--2" /><div className="ws-terrarium" />
                        </div>
                      </div>
                      <div className="workshop-card__body">
                        <h4>{w.title}</h4>
                        <div className="workshop-meta"><span>{w.duration}</span><span>{w.level}</span></div>
                        <p className="workshop-price">{w.price} <span>/ person</span></p>
                        <Link href="/create" className="btn btn--dark btn--sm">Enquire</Link>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="features">
          <div className="features__inner">
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3C8 3 5 7 6 11c1 4 6 6 9 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M12 21V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title: 'All materials included', desc: 'Glass, plants, soil, tools — everything provided.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title: 'Expert guidance', desc: 'Led by our in-house terrarium designers.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3C8 3 5 7 6 11c1 4 6 6 9 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title: 'Take it home', desc: 'Your finished terrarium is yours to keep.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.3"/><path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: 'Small groups', desc: 'Intimate sessions, maximum 12 participants.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="feature">
                <div className="feature__icon">{icon}</div>
                <div><strong>{title}</strong><p>{desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust bar */}
        <div className="trust-bar">
          {[
            { title: 'All skill levels',  desc: 'No experience needed',       icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.3"/><path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            { title: 'Small groups',      desc: 'Max 12 people per session',  icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M15 19v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M11 9a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
            { title: '2–3 hours',         desc: 'Relaxed and unhurried pace',  icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.3"/><path d="M11 7v4l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
            { title: 'Take-home piece',   desc: 'Your creation, yours to keep', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6l7-3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
          ].map(({ title, desc, icon }) => (
            <div key={title} className="trust-item">
              {icon}
              <div><strong>{title}</strong><p>{desc}</p></div>
            </div>
          ))}
        </div>

      </main>
      <Footer />
    </>
  )
}
