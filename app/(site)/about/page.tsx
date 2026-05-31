import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = { title: 'About — Terrafinity' }

const TEAM = [
  { name: 'Raf Santos',   role: 'Founder & Lead Builder',    bio: 'Self-taught terrarium designer with 8 years building living glass ecosystems.' },
  { name: 'Mia Cruz',     role: 'Plant Curator',             bio: 'Botanist and forager who sources all our native mosses, ferns, and rare specimens.' },
  { name: 'Carlo Reyes',  role: 'Workshop Facilitator',      bio: 'Educator and craftsman who has guided hundreds of students through their first build.' },
]

const PROCESS = [
  { step: '01', title: 'Design',   desc: 'We sketch the concept — vessel shape, plant palette, lighting, and substrate — around the story we want to tell.' },
  { step: '02', title: 'Gather',   desc: 'Plants, mosses, stones, and driftwood are sourced from local foragers and sustainable nurseries across the Philippines.' },
  { step: '03', title: 'Build',    desc: 'Each piece is assembled by hand. Layers are placed one at a time — substrate, drainage, planting, styling.' },
  { step: '04', title: 'Cure',     desc: 'Terrariums rest for 7–14 days before shipping. We monitor humidity and health before they leave the studio.' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="hv2" id="about-hero" style={{ minHeight: '65vh' }}>
          <div className="hv2-forest" aria-hidden="true">
            <div className="hv2-sky" />
            <div className="hv2-mist hv2-mist--1" />
            <div className="hv2-mist hv2-mist--2" />
            <div className="hv2-ground" />
          </div>
          <div className="hv2-overlay" />
          <div className="hv2-content" style={{ textAlign: 'center' }}>
            <p className="hv2-eyebrow">Our Story</p>
            <h1 className="hv2-h1">Nature,<br /><em>simplified.</em></h1>
            <p className="hv2-sub">A Philippine terrarium studio built on craft, care, and a deep love for living things.</p>
          </div>
        </section>

        {/* Stats bar */}
        <div style={{ background: 'var(--black)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center' }}>
            {[
              { n: '120+', label: 'Terrariums built' },
              { n: '9',    label: 'Signature designs' },
              { n: '500+', label: 'Workshop graduates' },
              { n: '100%', label: 'Handbuilt in PH' },
            ].map(({ n, label }) => (
              <div key={label}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, color: 'var(--white)', lineHeight: 1 }}>{n}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: '0.4rem', letterSpacing: '0.05em' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About section */}
        <section className="tf-about">
          <div className="tf-about__inner">
            <div className="tf-about__text">
              <p className="eyebrow">Who We Are</p>
              <h2>We build <em>living art</em><br />inside glass.</h2>
              <p>Terrafinity is a Philippine-based terrarium studio. We design and build miniature ecosystems by hand — each one named after one of our islands, mountains, or coastal wonders. Moss layered over stone, roots shaped around driftwood, living matter arranged to breathe and grow inside sealed glass.</p>
              <p>We believe nature belongs in your everyday spaces — right here, on your desk, your shelf, your bedside table. Alive and growing, quietly, without much care from you.</p>
              <p>Every Terrafinity piece is self-sustaining. A little light. Occasional misting. Years of life.</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <Link href="/gallery" className="btn btn--dark">Shop the collection</Link>
                <Link href="/workshops" className="btn btn--outline">Book a workshop</Link>
              </div>
            </div>
            <div className="tf-about__stats">
              <div className="tf-stat"><strong>120+</strong><span>Terrariums crafted</span></div>
              <div className="tf-stat"><strong>9</strong><span>Signature designs</span></div>
              <div className="tf-stat"><strong>100%</strong><span>Handbuilt</span></div>
              <div className="tf-stat"><strong>PH</strong><span>Made in the Philippines</span></div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section style={{ background: '#f7f4ef', padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p className="eyebrow">How We Work</p>
              <h2>From concept to <em>your hands</em></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '2rem' }}>
              {PROCESS.map(({ step, title, desc }) => (
                <div key={step}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--green-mid)', opacity: 0.4, lineHeight: 1, marginBottom: '0.5rem' }}>{step}</p>
                  <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--black)' }}>{title}</strong>
                  <p style={{ color: 'var(--stone)', fontSize: '0.875rem', lineHeight: 1.65 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="features">
          <div className="features__inner">
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3C8 3 5 7 6 11c1 4 6 6 9 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M12 21V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title: 'Handbuilt with Intention', desc: 'Every piece is designed and built by hand in the Philippines.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3c0 0-8 4-8 11a8 8 0 0016 0c0-7-8-11-8-11z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title: 'Sustainably Sourced', desc: 'We use locally sourced materials and ethical growing practices.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.3"/><path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: 'Built to Last', desc: 'Self-sustaining ecosystems that thrive for years with minimal care.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: 'Community First', desc: 'We run workshops and share knowledge to grow the terrarium community.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="feature">
                <div className="feature__icon">{icon}</div>
                <div><strong>{title}</strong><p>{desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section style={{ padding: '5rem 2rem', background: '#f7f4ef' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p className="eyebrow">The Team</p>
              <h2>The people behind <em>every piece</em></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem' }}>
              {TEAM.map(({ name, role, bio }) => (
                <div key={name} style={{ background: 'rgba(255,255,255,0.7)', borderRadius: '16px', padding: '1.75rem', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #c8d8c4, #8ab888)', marginBottom: '1.25rem' }}>
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                      <circle cx="28" cy="22" r="10" fill="rgba(255,255,255,0.5)" />
                      <path d="M10 48C10 38 18 32 28 32C38 32 46 38 46 48" fill="rgba(255,255,255,0.4)" />
                    </svg>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem', color: 'var(--black)' }}>{name}</p>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.75rem' }}>{role}</p>
                  <p style={{ color: 'var(--stone)', fontSize: '0.875rem', lineHeight: 1.6 }}>{bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philippines origin */}
        <section style={{ background: 'var(--black)', padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <p className="eyebrow" style={{ color: 'var(--green-mid)' }}>Where We Source</p>
              <h2 style={{ color: 'var(--white)', marginBottom: '1.25rem' }}>Born from the <em>Philippine archipelago</em></h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '1rem' }}>
                Our plant and stone sources span the archipelago — highland mosses from the Cordilleras, volcanic soil from Bicol, driftwood from Palawan&apos;s shores, and endemic ferns from the rainforests of Mindanao.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontSize: '0.95rem' }}>
                Each terrarium carries a piece of the island it&apos;s named after — not just in spirit, but in the soil beneath your plants.
              </p>
            </div>
            {/* Simplified Philippines island map SVG */}
            <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.7 }}>
              <svg viewBox="0 0 180 280" fill="none" style={{ width: '100%', maxWidth: '220px' }}>
                {/* Luzon */}
                <path d="M70 20 C65 25 58 35 60 50 C62 65 68 72 72 80 C78 92 76 100 80 108 C84 116 90 120 92 128 C94 136 88 145 90 152 C92 158 100 160 105 155 C110 150 112 140 115 132 C118 124 122 118 120 108 C118 98 110 90 108 80 C106 70 110 58 106 48 C102 38 96 30 90 24 C85 18 75 16 70 20 Z" fill="rgba(109,184,126,0.4)" stroke="rgba(109,184,126,0.6)" strokeWidth="1" />
                {/* Visayas group */}
                <path d="M60 168 C55 165 50 168 52 174 C54 180 62 182 66 178 C70 174 66 170 60 168 Z" fill="rgba(109,184,126,0.35)" stroke="rgba(109,184,126,0.5)" strokeWidth="0.8" />
                <path d="M80 172 C76 170 73 174 75 179 C77 184 84 185 87 180 C90 175 84 173 80 172 Z" fill="rgba(109,184,126,0.35)" stroke="rgba(109,184,126,0.5)" strokeWidth="0.8" />
                <path d="M100 168 C96 167 93 171 95 177 C97 183 104 184 107 179 C110 174 104 169 100 168 Z" fill="rgba(109,184,126,0.35)" stroke="rgba(109,184,126,0.5)" strokeWidth="0.8" />
                {/* Palawan */}
                <path d="M38 172 C35 168 28 170 28 180 C28 192 32 205 38 215 C42 222 46 224 48 218 C50 212 46 200 44 190 C42 182 40 176 38 172 Z" fill="rgba(109,184,126,0.3)" stroke="rgba(109,184,126,0.5)" strokeWidth="0.8" />
                {/* Mindanao */}
                <path d="M68 200 C60 196 50 198 50 210 C50 224 58 236 70 242 C82 248 96 248 106 242 C116 236 122 224 120 212 C118 202 110 196 100 196 C90 196 78 200 68 200 Z" fill="rgba(109,184,126,0.4)" stroke="rgba(109,184,126,0.6)" strokeWidth="1" />
                {/* Dots for key sources */}
                <circle cx="80" cy="50" r="3" fill="#6db87e" opacity="0.9" />
                <circle cx="42" cy="200" r="3" fill="#6db87e" opacity="0.9" />
                <circle cx="85" cy="235" r="3" fill="#6db87e" opacity="0.9" />
                <circle cx="104" cy="175" r="3" fill="#6db87e" opacity="0.9" />
              </svg>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="tf-about" style={{ background: 'var(--forest)' }}>
          <div className="tf-about__inner" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div>
              <p className="eyebrow" style={{ color: 'var(--green-mid)' }}>Get Involved</p>
              <h2 style={{ color: 'var(--white)' }}>Join a <em>workshop</em> or shop the collection</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '1rem', maxWidth: '480px', lineHeight: 1.7 }}>
                Come build with us — or take home a piece of the Philippines in glass.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/gallery" className="btn btn--outline">Shop the Series</Link>
              <Link href="/workshops" className="btn btn--dark">Book a Workshop</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
