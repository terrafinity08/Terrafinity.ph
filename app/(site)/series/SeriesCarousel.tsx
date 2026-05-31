'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

type Spec = { key: string; value: string }
type SeriesItem = {
  id: string; slug: string; location: string; name: string
  desc: string; specs: Spec[]; price: number; bg: string
}

const SERIES: SeriesItem[] = [
  {
    id: '01', slug: 'mountainscape', location: 'MOUNTAIN PROVINCE, PH',
    name: 'Mountainscape',
    desc: 'A teardrop vessel cradling a mossy arch — its silhouette framing a portal of open sky. Inspired by the misty cordillera highlands.',
    specs: [
      { key: 'SIZE',     value: '17.5 × 17.5 cm · 23 cm H' },
      { key: 'FEATURES', value: 'Built-in 5W LED · Ventilation · Sliding Window' },
      { key: 'CARE',     value: 'Low — indirect light' },
    ],
    price: 2800,
    bg: 'radial-gradient(ellipse at 70% 45%, #2d5a2d 0%, #1b3a1b 55%, #0d1a0d 100%)',
  },
  {
    id: '02', slug: 'bonsai', location: 'BAGUIO CITY, PH',
    name: 'Bonsai',
    desc: 'A dramatic bonsai rises from volcanic rock inside a large round sphere — cool, contemplative, highland air captured in glass.',
    specs: [
      { key: 'VESSEL',  value: 'Large Round Sphere' },
      { key: 'PALETTE', value: 'Blue-Gray · Stone · Dark Soil' },
      { key: 'CARE',    value: 'Medium — bright indirect' },
    ],
    price: 3500,
    bg: 'radial-gradient(ellipse at 70% 45%, #2d3d52 0%, #1e2a3a 55%, #111720 100%)',
  },
  {
    id: '03', slug: 'sulu', location: 'SULU ARCHIPELAGO, PH',
    name: 'Sulu',
    desc: 'Dense forest moss and hanging vines fill a tall cylinder, lit from within by warm amber LED. Primordial jungle at dusk — alive, breathing, untamed.',
    specs: [
      { key: 'VESSEL',  value: 'Tall Cylinder' },
      { key: 'FEATURE', value: 'Warm LED Lighting' },
      { key: 'PALETTE', value: 'Deep Forest · Amber Glow' },
    ],
    price: 3200,
    bg: 'radial-gradient(ellipse at 70% 45%, #1a3320 0%, #0d1f0d 55%, #080c08 100%)',
  },
  {
    id: '04', slug: 'sibuyan', location: 'SIBUYAN ISLAND, PH',
    name: 'Sibuyan',
    desc: 'Vivid emerald light floods a tall rectangle where a dark cave formation hangs with draping moss. Among the most biodiverse islands on Earth.',
    specs: [
      { key: 'VESSEL',  value: 'Tall Rectangle' },
      { key: 'PALETTE', value: 'Vivid Green · Cave Dark' },
      { key: 'CARE',    value: 'Low — thrives in dim light' },
    ],
    price: 2600,
    bg: 'radial-gradient(ellipse at 70% 45%, #2d6a15 0%, #1a4a0f 55%, #0d2008 100%)',
  },
  {
    id: '05', slug: 'eternal', location: 'ETERNAL — NO ORIGIN',
    name: 'Eternal',
    desc: 'Preserved botanicals suspended in time. A floral study in black, purple, and white — built to outlast the seasons without soil or sunlight.',
    specs: [
      { key: 'VESSEL',  value: 'Round Bowl' },
      { key: 'PALETTE', value: 'Black · Purple · White' },
      { key: 'TYPE',    value: 'Floral · Preserved' },
    ],
    price: 2400,
    bg: 'radial-gradient(ellipse at 70% 45%, #1c1c1c 0%, #0e0e0e 55%, #080808 100%)',
  },
  {
    id: '06', slug: 'miniscape', location: 'ARCHIPELAGO SERIES',
    name: 'Miniscape',
    desc: 'A collector\'s set of four squat jars — each a miniature world of black stone and living moss. Displayed together or spread across a room.',
    specs: [
      { key: 'VESSELS', value: 'Set of 4 Squat Jars' },
      { key: 'PALETTE', value: 'Black · Stone · Moss' },
      { key: 'NOTE',    value: 'Collector Set' },
    ],
    price: 4200,
    bg: 'radial-gradient(ellipse at 70% 45%, #141414 0%, #0a0a0a 55%, #060606 100%)',
  },
  {
    id: '07', slug: 'mini-bloom', location: 'GARDEN PROVINCE, PH',
    name: 'Mini Bloom',
    desc: 'A soft, warm terrarium for gifting, desk use, or the bedroom. Lavender tones and gentle moss in a petite round jar — nature in your palm.',
    specs: [
      { key: 'VESSEL',  value: 'Squat Round Jar' },
      { key: 'PALETTE', value: 'Warm Gray · White · Lavender' },
      { key: 'IDEAL',   value: 'Gifting · Desk · Bedroom' },
    ],
    price: 1800,
    bg: 'radial-gradient(ellipse at 70% 45%, #4a3a2a 0%, #2e2318 55%, #1a1410 100%)',
  },
  {
    id: '08', slug: 'talon', location: 'MT. APO, PH',
    name: 'Talon',
    desc: 'A dramatic waterfall rockscape cascades inside a tall rectangle — slate, obsidian, and white cascade recalling the rivers of Mt. Apo.',
    specs: [
      { key: 'VESSEL',  value: 'Tall Rectangle' },
      { key: 'FEATURE', value: 'Waterfall Rockscape' },
      { key: 'PALETTE', value: 'Black · Slate · White Cascade' },
    ],
    price: 3800,
    bg: 'radial-gradient(ellipse at 70% 45%, #181818 0%, #0c0c0c 55%, #060606 100%)',
  },
  {
    id: '09', slug: 'el-nido', location: 'EL NIDO, PALAWAN, PH',
    name: 'El Nido',
    desc: 'Dark limestone formations rise from black substrate, inspired by the towering karst cliffs and hidden lagoons of Bacuit Bay, Palawan.',
    specs: [
      { key: 'VESSEL',   value: 'Tall Rectangle' },
      { key: 'PALETTE',  value: 'Black · Dark Limestone' },
      { key: 'INSPIRED', value: 'Bacuit Bay, Palawan' },
    ],
    price: 3600,
    bg: 'radial-gradient(ellipse at 70% 45%, #1a1a1a 0%, #0e0e0e 55%, #080808 100%)',
  },
]

export default function SeriesCarousel() {
  const [slide, setSlide] = useState(0) // 0 = intro
  const touchStartX = useRef(0)

  const prev = useCallback(() => setSlide(s => Math.max(0, s - 1)), [])
  const next = useCallback(() => setSlide(s => Math.min(SERIES.length, s + 1)), [])

  useEffect(() => {
    // Lock all scrolling — only left/right swipe allowed
    const savedBody = document.body.style.overflow
    const savedHtml = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    const blockScroll = (e: TouchEvent) => e.preventDefault()
    document.addEventListener('touchmove', blockScroll, { passive: false })
    return () => {
      document.body.style.overflow = savedBody
      document.documentElement.style.overflow = savedHtml
      document.removeEventListener('touchmove', blockScroll)
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft')  prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const btnStyle: React.CSSProperties = {
    position: 'fixed', top: '50%', transform: 'translateY(-50%)',
    width: '48px', height: '48px', borderRadius: '50%',
    background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.2)', color: 'var(--white)',
    fontSize: '1.2rem', cursor: 'pointer', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 200,
    transition: 'background 0.2s',
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: '#0a0a0a', zIndex: 10 }}
      onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        const dx = e.changedTouches[0].clientX - touchStartX.current
        if (dx < -50) next()
        if (dx > 50) prev()
      }}
    >
      <Navbar />

      {/* Slides */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex',
        transform: `translateX(-${slide * 100}vw)`,
        transition: 'transform 0.75s cubic-bezier(0.77, 0, 0.175, 1)',
        willChange: 'transform',
      }}>

        {/* ── Intro ── */}
        <div style={{
          width: '100vw', height: '100%', flexShrink: 0,
          background: 'radial-gradient(ellipse at 50% 60%, #1a2e1a 0%, #0d150d 60%, #0a0a0a 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '2rem' }}>
            Terrafinity
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontWeight: 700, lineHeight: 0.9,
            fontSize: 'clamp(4rem, 12vw, 9rem)', color: 'var(--white)',
            textAlign: 'center',
          }}>
            The{' '}
            <em style={{ color: 'var(--green-mid)', fontStyle: 'italic' }}>Series.</em>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.45)', marginTop: '2.5rem',
            textAlign: 'center', lineHeight: 1.7, fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            maxWidth: '340px',
          }}>
            Nine terrariums. Nine Philippine landscapes.<br />Each one built to carry a place with you.
          </p>
          <button
            onClick={next}
            style={{
              position: 'absolute', bottom: '3.5rem',
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: '1rem',
            }}
          >
            SCROLL RIGHT TO EXPLORE
            <svg width="40" height="10" viewBox="0 0 40 10" fill="none">
              <path d="M0 5h36M33 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ── Product slides ── */}
        {SERIES.map((item, i) => (
          <div
            key={item.id}
            style={{
              width: '100vw', height: '100%', flexShrink: 0,
              background: item.bg, position: 'relative',
            }}
          >
            {/* Decorative circle / light bloom */}
            <div style={{
              position: 'absolute', right: '15%', top: '15%',
              width: 'min(50vw, 500px)', height: 'min(50vw, 500px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Product card */}
            <div style={{
              position: 'absolute',
              bottom: 'clamp(2rem, 5vh, 3.5rem)',
              left: 'clamp(1.5rem, 4vw, 3.5rem)',
              width: 'min(420px, calc(100vw - 3rem))',
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '16px',
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              {/* Number */}
              <p style={{
                color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem',
                letterSpacing: '0.2em', marginBottom: '0.3rem', fontWeight: 500,
              }}>
                {item.id}
              </p>
              {/* Location */}
              <p style={{
                color: 'rgba(255,255,255,0.45)', fontSize: '0.65rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                marginBottom: '0.6rem',
              }}>
                {item.location}
              </p>
              {/* Name */}
              <h2 style={{
                fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700, color: 'var(--white)', lineHeight: 1.1, marginBottom: '0.75rem',
              }}>
                {item.name}
              </h2>
              {/* Description */}
              <p style={{
                color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.78rem, 1.5vw, 0.875rem)',
                lineHeight: 1.65, marginBottom: '1.25rem',
              }}>
                {item.desc}
              </p>

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem' }} />

              {/* Specs */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.25rem' }}>
                <tbody>
                  {item.specs.map(s => (
                    <tr key={s.key}>
                      <td style={{
                        color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        paddingRight: '1.25rem', paddingBottom: '0.35rem',
                        whiteSpace: 'nowrap', verticalAlign: 'top',
                      }}>
                        {s.key}
                      </td>
                      <td style={{
                        color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.72rem, 1.4vw, 0.8rem)',
                        paddingBottom: '0.35rem', lineHeight: 1.4,
                      }}>
                        {s.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: '1.25rem' }} />

              {/* Price + CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <span style={{
                  color: 'var(--white)', fontWeight: 700,
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                }}>
                  ₱{item.price.toLocaleString()}
                </span>
                <Link
                  href={`/products/${item.slug}`}
                  style={{
                    background: 'var(--white)', color: 'var(--black)',
                    padding: '0.55rem 1.4rem', borderRadius: '50px',
                    fontWeight: 600, fontSize: '0.825rem',
                    textDecoration: 'none', whiteSpace: 'nowrap',
                    transition: 'opacity 0.2s',
                  }}
                >
                  Add to Cart
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Counter ── */}
      {slide > 0 && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '2rem',
          color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem',
          letterSpacing: '0.1em', zIndex: 200, userSelect: 'none',
        }}>
          {String(slide).padStart(2, '0')} / {String(SERIES.length).padStart(2, '0')}
        </div>
      )}

      {/* ── Prev button ── */}
      {slide > 0 && (
        <button onClick={prev} aria-label="Previous" style={{ ...btnStyle, left: '1.5rem' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}

      {/* ── Next button ── */}
      {slide < SERIES.length && (
        <button onClick={next} aria-label="Next" style={{ ...btnStyle, right: '1.5rem' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}

      {/* ── Dots / progress ── */}
      <div style={{
        position: 'fixed', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: '6px', zIndex: 200,
      }}>
        {[0, ...SERIES.map((_, i) => i + 1)].map(n => (
          <button
            key={n}
            onClick={() => setSlide(n)}
            aria-label={`Slide ${n}`}
            style={{
              width: n === slide ? '20px' : '6px', height: '6px',
              borderRadius: '3px', border: 'none', cursor: 'pointer',
              background: n === slide ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)',
              transition: 'all 0.3s', padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}
