'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const VESSELS = [
  { id: 'teardrop',  name: 'Teardrop Arch', desc: 'Signature arch vessel', basePrice: 800 },
  { id: 'sphere',    name: 'Large Sphere',   desc: 'Round globe display',   basePrice: 900 },
  { id: 'cylinder',  name: 'Tall Cylinder',  desc: 'Tall, ventilated lid',  basePrice: 850 },
  { id: 'rectangle', name: 'Rectangle Box',  desc: 'Classic display case',  basePrice: 750 },
  { id: 'bowl',      name: 'Wide Bowl',      desc: 'Open shallow bowl',     basePrice: 600 },
]

const GREENERY = [
  { id: 'moss',       name: 'Moss Carpet',       price: 200 },
  { id: 'ferns',      name: 'Miniature Ferns',   price: 300 },
  { id: 'succulents', name: 'Succulents',        price: 250 },
  { id: 'airplants',  name: 'Air Plants',        price: 350 },
  { id: 'bonsai',     name: 'Bonsai',            price: 500 },
  { id: 'florals',    name: 'Preserved Florals', price: 400 },
]

const SUBSTRATES = [
  { id: 'standard', name: 'Potting Mix',     desc: 'Balanced soil blend',  price: 0,   color: '#8B6340' },
  { id: 'volcanic', name: 'Volcanic Soil',   desc: 'Dark & nutrient-rich', price: 150, color: '#3D3030' },
  { id: 'sand',     name: 'Sand & Stone',    desc: 'Desert aesthetic',     price: 200, color: '#C4A882' },
  { id: 'black',    name: 'Black Substrate', desc: 'Dramatic dark base',   price: 150, color: '#1a1a1a' },
]

const EXTRAS = [
  { id: 'led',       name: '5W LED Light',      price: 450 },
  { id: 'driftwood', name: 'Driftwood',         price: 350 },
  { id: 'stones',    name: 'Stones & Pebbles',  price: 200 },
  { id: 'waterfall', name: 'Waterfall Feature', price: 600 },
  { id: 'figurine',  name: 'Figurine',          price: 300 },
]

const STEPS = ['Vessel', 'Greenery', 'Substrate', 'Extras', 'Review']

type Build = {
  vessel: string; greenery: string[]; substrate: string; extras: string[]
  name: string; email: string; phone: string; notes: string
}

function TerrariumPreview({ build }: { build: Build }) {
  const substrate = SUBSTRATES.find(s => s.id === build.substrate) ?? SUBSTRATES[0]
  const hasMoss  = build.greenery.includes('moss')
  const hasFerns = build.greenery.includes('ferns')
  const hasSuc   = build.greenery.includes('succulents')
  const hasBon   = build.greenery.includes('bonsai')
  const hasFlor  = build.greenery.includes('florals')
  const hasLED   = build.extras.includes('led')
  const hasDrift = build.extras.includes('driftwood')
  const hasStones = build.extras.includes('stones')
  const hasWfall = build.extras.includes('waterfall')

  type VesselDef = { path: React.ReactNode; subX: number; subY: number; subW: number; subH: number }
  const vesselDefs: Record<string, VesselDef> = {
    teardrop: {
      path: <path d="M100 30 C68 30 42 65 42 120 C42 175 65 210 100 210 C135 210 158 175 158 120 C158 65 132 30 100 30 Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" />,
      subX: 58, subY: 182, subW: 84, subH: 22,
    },
    sphere: {
      path: <circle cx="100" cy="130" r="80" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" />,
      subX: 38, subY: 188, subW: 124, subH: 18,
    },
    cylinder: {
      path: <><rect x="45" y="50" width="110" height="185" rx="8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" /><rect x="40" y="44" width="120" height="12" rx="4" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="rgba(255,255,255,0.05)" /></>,
      subX: 55, subY: 210, subW: 90, subH: 20,
    },
    rectangle: {
      path: <rect x="30" y="60" width="140" height="175" rx="4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" />,
      subX: 40, subY: 208, subW: 120, subH: 22,
    },
    bowl: {
      path: <path d="M25 100 C25 185 55 220 100 220 C145 220 175 185 175 100 Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" />,
      subX: 38, subY: 196, subW: 124, subH: 18,
    },
  }

  const vd = vesselDefs[build.vessel]
  const sy = vd ? vd.subY : 182
  const sx = vd ? vd.subX : 58

  return (
    <svg viewBox="0 0 200 260" fill="none" style={{ width: '100%', maxWidth: '200px', margin: '0 auto', display: 'block' }}>
      {vd ? vd.path : (
        <text x="100" y="135" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="11" fontFamily="system-ui">Select vessel</text>
      )}
      {vd && (
        <>
          {/* substrate */}
          <rect x={vd.subX} y={vd.subY} width={vd.subW} height={vd.subH} rx="4" fill={substrate.color} opacity="0.9" />
          {/* stones */}
          {hasStones && <><circle cx={sx+12} cy={sy-7} r="4" fill="#888" opacity="0.8"/><circle cx={sx+28} cy={sy-5} r="3" fill="#aaa" opacity="0.8"/><circle cx={sx+vd.subW-18} cy={sy-6} r="5" fill="#777" opacity="0.8"/><circle cx={sx+vd.subW-8} cy={sy-4} r="3" fill="#999" opacity="0.8"/></>}
          {/* driftwood */}
          {hasDrift && <path d={`M${sx+8} ${sy-12} C${sx+28} ${sy-32} ${sx+55} ${sy-22} ${sx+75} ${sy-36}`} stroke="#8B6340" strokeWidth="3" strokeLinecap="round" opacity="0.8"/>}
          {/* moss */}
          {hasMoss && <path d={`M${sx} ${sy-10} C${sx+10} ${sy-22} ${sx+22} ${sy-18} ${sx+32} ${sy-16} C${sx+42} ${sy-24} ${sx+54} ${sy-20} ${sx+64} ${sy-18} C${sx+74} ${sy-23} ${sx+84} ${sy-16} ${sx+vd.subW-2} ${sy-10}`} stroke="#4a7c3f" strokeWidth="8" strokeLinecap="round" opacity="0.85" fill="none"/>}
          {/* ferns */}
          {hasFerns && <><path d="M100 170 C90 148 76 138 69 127" stroke="#2d6a20" strokeWidth="1.5" strokeLinecap="round"/><path d="M100 170 C110 146 126 137 134 125" stroke="#2d6a20" strokeWidth="1.5" strokeLinecap="round"/><line x1="100" y1="178" x2="100" y2="168" stroke="#4a5a30" strokeWidth="1.5"/></>}
          {/* succulents */}
          {hasSuc && <><circle cx="82" cy="168" r="8" fill="#5a8c35" opacity="0.85"/><circle cx="82" cy="163" r="5" fill="#4a7c2a" opacity="0.9"/><circle cx="118" cy="165" r="7" fill="#6a9c3f" opacity="0.85"/><circle cx="118" cy="160" r="4" fill="#5a8c30" opacity="0.9"/></>}
          {/* bonsai */}
          {hasBon && <><line x1="100" y1="178" x2="100" y2="132" stroke="#5a3a1a" strokeWidth="3"/><line x1="100" y1="158" x2="79" y2="144" stroke="#5a3a1a" strokeWidth="2"/><line x1="100" y1="149" x2="120" y2="135" stroke="#5a3a1a" strokeWidth="2"/><ellipse cx="100" cy="122" rx="22" ry="15" fill="#2d6a20" opacity="0.85"/><ellipse cx="79" cy="137" rx="12" ry="9" fill="#3a7a28" opacity="0.8"/><ellipse cx="120" cy="128" rx="14" ry="10" fill="#2d6a20" opacity="0.8"/></>}
          {/* preserved florals */}
          {hasFlor && <><circle cx="88" cy="162" r="6" fill="#9b59b6" opacity="0.7"/><circle cx="112" cy="157" r="5" fill="#d4c7e8" opacity="0.7"/><circle cx="78" cy="154" r="4" fill="#e8e0f0" opacity="0.7"/><circle cx="102" cy="149" r="5" fill="#8e44ad" opacity="0.6"/></>}
          {/* waterfall */}
          {hasWfall && <><path d="M132 85 C130 112 127 142 130 165" stroke="#5bc0de" strokeWidth="3" strokeLinecap="round" opacity="0.6"/><path d="M137 90 C135 117 132 145 135 168" stroke="#7dd3ef" strokeWidth="2" strokeLinecap="round" opacity="0.4"/></>}
          {/* LED */}
          {hasLED && <><circle cx="100" cy="58" r="10" fill="rgba(255,240,160,0.15)"/><circle cx="100" cy="58" r="5" fill="rgba(255,240,160,0.5)"/><circle cx="100" cy="58" r="2.5" fill="rgba(255,255,200,0.9)"/></>}
        </>
      )}
    </svg>
  )
}

export default function CreatePage() {
  const [step, setStep] = useState(0)
  const [build, setBuild] = useState<Build>({
    vessel: '', greenery: [], substrate: 'standard', extras: [],
    name: '', email: '', phone: '', notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const vessel    = VESSELS.find(v => v.id === build.vessel)
  const substrate = SUBSTRATES.find(s => s.id === build.substrate) ?? SUBSTRATES[0]
  const selGreen  = GREENERY.filter(g => build.greenery.includes(g.id))
  const selExtras = EXTRAS.filter(e => build.extras.includes(e.id))
  const total     = (vessel?.basePrice ?? 0) + selGreen.reduce((s, g) => s + g.price, 0) + substrate.price + selExtras.reduce((s, e) => s + e.price, 0)

  function toggle(key: 'greenery' | 'extras', id: string) {
    setBuild(b => ({ ...b, [key]: b[key].includes(id) ? b[key].filter(x => x !== id) : [...b[key], id] }))
  }

  function canNext() {
    if (step === 0) return !!build.vessel
    if (step === 1) return build.greenery.length > 0
    return true
  }

  function submit() {
    setError(null)
    if (!build.name.trim()) { setError('Please enter your name'); return }
    if (!build.email.trim()) { setError('Please enter your email'); return }
    setSubmitted(true)
  }

  const card = (on: boolean): React.CSSProperties => ({
    background: on ? 'rgba(109,184,126,0.12)' : 'rgba(0,0,0,0.04)',
    border: `1.5px solid ${on ? '#6db87e' : 'rgba(0,0,0,0.1)'}`,
    borderRadius: '12px', padding: '1rem', cursor: 'pointer',
    transition: 'all 0.2s', textAlign: 'left', width: '100%',
  })

  if (submitted) return (
    <>
      <Navbar />
      <main style={{ background: '#f7f4ef', minHeight: '100vh', paddingTop: '80px' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(109,184,126,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M7 16l7 7 12-12" stroke="#6db87e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Order received!</h2>
          <p style={{ color: 'var(--stone)', lineHeight: 1.7, marginBottom: '0.5rem' }}>
            Thanks, <strong>{build.name}</strong>. We&apos;ll reach out to <strong>{build.email}</strong> within 1–2 business days.
          </p>
          <p style={{ color: 'var(--stone)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
            Estimated total: <strong style={{ color: 'var(--black)' }}>₱{total.toLocaleString()}</strong>
          </p>
          <Link href="/gallery" className="btn btn--dark">Browse the collection</Link>
        </div>
      </main>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar />
      <main style={{ background: '#f7f4ef', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Header */}
        <div style={{ background: 'var(--black)', padding: '4rem 2rem 3rem', textAlign: 'center' }}>
          <p className="eyebrow" style={{ color: 'var(--green-mid)' }}>Custom Build</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--white)', marginTop: '0.5rem', lineHeight: 1.1 }}>
            Create Your <em>Own</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: '1rem', fontSize: '0.95rem' }}>
            Build your perfect terrarium in 5 steps — we craft it by hand.
          </p>
        </div>

        {/* Step tabs */}
        <div style={{ background: 'var(--black)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 2rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex' }}>
            {STEPS.map((s, i) => (
              <button key={s} onClick={() => i < step && setStep(i)} style={{
                flex: 1, padding: '0.85rem 0.5rem', background: 'transparent', border: 'none',
                borderBottom: `2px solid ${i === step ? '#6db87e' : i < step ? 'rgba(109,184,126,0.35)' : 'transparent'}`,
                color: i === step ? 'var(--white)' : i < step ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.22)',
                fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', letterSpacing: '0.06em', textTransform: 'uppercase',
                cursor: i < step ? 'pointer' : 'default', fontWeight: i === step ? 600 : 400, transition: 'all 0.2s',
              }}>
                <span style={{ display: 'inline-block', width: '18px', height: '18px', borderRadius: '50%', background: i <= step ? '#6db87e' : 'rgba(255,255,255,0.08)', color: i <= step ? '#000' : 'rgba(255,255,255,0.25)', fontSize: '0.6rem', fontWeight: 700, lineHeight: '18px', marginRight: '0.4rem', textAlign: 'center' }}>{i + 1}</span>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 2rem', display: 'grid', gridTemplateColumns: '1fr clamp(220px, 28vw, 280px)', gap: '2.5rem', alignItems: 'start' }}>

          {/* Left: step content */}
          <div>

            {step === 0 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>Choose your vessel</h2>
                <p style={{ color: 'var(--stone)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>The glass container that houses your ecosystem.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.875rem' }}>
                  {VESSELS.map(v => (
                    <button key={v.id} onClick={() => setBuild(b => ({ ...b, vessel: v.id }))} style={card(build.vessel === v.id)}>
                      <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.2rem', color: 'var(--black)' }}>{v.name}</p>
                      <p style={{ fontSize: '0.775rem', color: 'var(--stone)', marginBottom: '0.4rem' }}>{v.desc}</p>
                      <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2d6a20' }}>from ₱{v.basePrice.toLocaleString()}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>Add greenery</h2>
                <p style={{ color: 'var(--stone)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Choose one or more plants or botanicals.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.875rem' }}>
                  {GREENERY.map(g => (
                    <button key={g.id} onClick={() => toggle('greenery', g.id)} style={card(build.greenery.includes(g.id))}>
                      <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.2rem', color: 'var(--black)' }}>{g.name}</p>
                      <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2d6a20' }}>+₱{g.price.toLocaleString()}</p>
                      {build.greenery.includes(g.id) && <span style={{ display: 'inline-block', marginTop: '0.35rem', background: '#6db87e', color: '#fff', fontSize: '0.62rem', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>✓ Added</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>Choose your substrate</h2>
                <p style={{ color: 'var(--stone)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>The base layer that supports your plants.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.875rem' }}>
                  {SUBSTRATES.map(s => (
                    <button key={s.id} onClick={() => setBuild(b => ({ ...b, substrate: s.id }))} style={card(build.substrate === s.id)}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: s.color, marginBottom: '0.5rem', border: '1px solid rgba(0,0,0,0.08)' }} />
                      <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.15rem', color: 'var(--black)' }}>{s.name}</p>
                      <p style={{ fontSize: '0.775rem', color: 'var(--stone)', marginBottom: '0.3rem' }}>{s.desc}</p>
                      <p style={{ fontSize: '0.8rem', fontWeight: 700, color: s.price > 0 ? '#2d6a20' : 'var(--stone)' }}>{s.price > 0 ? `+₱${s.price}` : 'Included'}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>Add extras</h2>
                <p style={{ color: 'var(--stone)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Optional finishing touches — skip any you don&apos;t need.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.875rem' }}>
                  {EXTRAS.map(e => (
                    <button key={e.id} onClick={() => toggle('extras', e.id)} style={card(build.extras.includes(e.id))}>
                      <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.2rem', color: 'var(--black)' }}>{e.name}</p>
                      <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2d6a20' }}>+₱{e.price.toLocaleString()}</p>
                      {build.extras.includes(e.id) && <span style={{ display: 'inline-block', marginTop: '0.35rem', background: '#6db87e', color: '#fff', fontSize: '0.62rem', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>✓ Added</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>Review & order</h2>
                <p style={{ color: 'var(--stone)', fontSize: '0.9rem', marginBottom: '2rem' }}>We&apos;ll confirm your build and be in touch within 1–2 business days.</p>

                <div style={{ background: 'rgba(0,0,0,0.05)', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
                  <p style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.75rem' }}>Your build</p>
                  {vessel && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.35rem' }}><span>{vessel.name}</span><span style={{ fontWeight: 600 }}>₱{vessel.basePrice.toLocaleString()}</span></div>}
                  {selGreen.map(g => <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.35rem' }}><span>{g.name}</span><span style={{ fontWeight: 600 }}>+₱{g.price.toLocaleString()}</span></div>)}
                  {substrate.price > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.35rem' }}><span>{substrate.name}</span><span style={{ fontWeight: 600 }}>+₱{substrate.price.toLocaleString()}</span></div>}
                  {selExtras.map(e => <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.35rem' }}><span>{e.name}</span><span style={{ fontWeight: 600 }}>+₱{e.price.toLocaleString()}</span></div>)}
                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                    <span>Estimated total</span><span>₱{total.toLocaleString()}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { label: 'Full name', key: 'name', type: 'text', ph: 'Maria Santos', req: true },
                    { label: 'Email address', key: 'email', type: 'email', ph: 'maria@email.com', req: true },
                    { label: 'Phone (optional)', key: 'phone', type: 'tel', ph: '+63 917 000 0000', req: false },
                  ].map(({ label, key, type, ph, req }) => (
                    <div key={key}>
                      <label style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)', display: 'block', marginBottom: '0.4rem' }}>{label}</label>
                      <input type={type} placeholder={ph} required={req} value={build[key as keyof Build] as string} onChange={e => setBuild(b => ({ ...b, [key]: e.target.value }))}
                        style={{ width: '100%', background: 'rgba(255,255,255,0.85)', border: '1.5px solid rgba(0,0,0,0.12)', borderRadius: '8px', padding: '0.8rem 1rem', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)', display: 'block', marginBottom: '0.4rem' }}>Notes (optional)</label>
                    <textarea placeholder="Any special requests, colour preferences, or questions?" rows={3} value={build.notes} onChange={e => setBuild(b => ({ ...b, notes: e.target.value }))}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.85)', border: '1.5px solid rgba(0,0,0,0.12)', borderRadius: '8px', padding: '0.8rem 1rem', fontSize: '0.9rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                  </div>
                  {error && <div style={{ background: '#fce8e8', border: '1px solid #f5a0a0', borderRadius: '8px', padding: '0.75rem 1rem', color: '#c0392b', fontSize: '0.875rem' }}>{error}</div>}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {step > 0 && (
                <button onClick={() => setStep(s => s - 1)} style={{ background: 'transparent', border: '1.5px solid rgba(0,0,0,0.15)', borderRadius: '50px', padding: '0.75rem 1.5rem', fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer', color: 'var(--stone)' }}>← Back</button>
              )}
              {step < 4 ? (
                <button onClick={() => canNext() && setStep(s => s + 1)} disabled={!canNext()} style={{ background: canNext() ? 'var(--black)' : 'rgba(0,0,0,0.12)', color: canNext() ? 'var(--white)' : 'rgba(0,0,0,0.25)', border: 'none', borderRadius: '50px', padding: '0.85rem 2rem', fontWeight: 600, fontSize: '0.9rem', cursor: canNext() ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>Continue →</button>
              ) : (
                <button onClick={submit} style={{ background: 'var(--black)', color: 'var(--white)', border: 'none', borderRadius: '50px', padding: '0.85rem 2rem', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
                  Place order — ₱{total.toLocaleString()}
                </button>
              )}
              {step === 1 && build.greenery.length === 0 && <p style={{ color: 'var(--stone)', fontSize: '0.8rem' }}>Select at least one plant</p>}
            </div>
          </div>

          {/* Right: preview panel */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ background: 'var(--black)', borderRadius: '16px', padding: '1.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Live preview</p>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <TerrariumPreview build={build} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {vessel && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}><span>{vessel.name}</span><span>₱{vessel.basePrice.toLocaleString()}</span></div>}
                {selGreen.map(g => <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}><span>{g.name}</span><span>+₱{g.price}</span></div>)}
                {substrate.price > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}><span>{substrate.name}</span><span>+₱{substrate.price}</span></div>}
                {selExtras.map(e => <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}><span>{e.name}</span><span>+₱{e.price}</span></div>)}
              </div>
              {total > 0 && (
                <>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0.75rem 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Estimated</span>
                    <span style={{ color: 'var(--white)', fontWeight: 700, fontSize: '1.2rem' }}>₱{total.toLocaleString()}</span>
                  </div>
                </>
              )}
              {!build.vessel && <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.75rem', textAlign: 'center', marginTop: '0.5rem' }}>Choose a vessel to begin</p>}
            </div>
          </div>
        </div>

        {/* Trust */}
        <div className="trust-bar">
          {[
            { title: 'Handbuilt for you', desc: '2–3 weeks from order',     icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.3"/><path d="M11 7v4l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
            { title: 'Free consultation', desc: 'We help finalise your design', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 6h14M4 10h10M4 14h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
            { title: 'Ships nationwide',  desc: 'Packed safely, delivered', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="11" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M7 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
            { title: 'Aftercare support', desc: "We're here after delivery",  icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.3"/><path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
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
