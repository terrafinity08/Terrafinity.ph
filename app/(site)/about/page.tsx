import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = { title: 'About — Terrafinity' }

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="hv2" id="about-hero" style={{ minHeight: '60vh' }}>
          <div className="hv2-forest" aria-hidden="true">
            <div className="hv2-sky" />
            <div className="hv2-mist hv2-mist--1" />
            <div className="hv2-mist hv2-mist--2" />
            <div className="hv2-ground" />
          </div>
          <div className="hv2-overlay" />
          <div className="hv2-content" style={{ textAlign: 'center' }}>
            <p className="hv2-eyebrow">Our Story</p>
            <h1 className="hv2-h1">Nature, <em>simplified.</em></h1>
            <p className="hv2-sub">A Philippine terrarium studio built on craft, care, and a deep love for living things.</p>
          </div>
        </section>

        {/* About section */}
        <section className="tf-about">
          <div className="tf-about__inner">
            <div className="tf-about__text">
              <p className="eyebrow">Who We Are</p>
              <h2>We build <em>living art</em><br />inside glass.</h2>
              <p>Terrafinity is a Philippine-based terrarium studio. We design and build miniature ecosystems by hand — each one named after one of our islands, mountains, or coastal wonders. Moss layered over stone, roots shaped around driftwood, living matter arranged to breathe and grow inside sealed glass.</p>
              <p>We believe nature belongs in your everyday spaces — right here, on your desk, your shelf, your bedside table. Alive and growing, quietly, without much care from you.</p>
              <p>Every Terrafinity piece is self-sustaining. A little light. Occasional misting. Years of life.</p>
            </div>
            <div className="tf-about__stats">
              <div className="tf-stat"><strong>120+</strong><span>Terrariums crafted</span></div>
              <div className="tf-stat"><strong>9</strong><span>Signature designs</span></div>
              <div className="tf-stat"><strong>100%</strong><span>Handbuilt</span></div>
              <div className="tf-stat"><strong>PH</strong><span>Made in the Philippines</span></div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="features">
          <div className="features__inner">
            {[
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3C8 3 5 7 6 11c1 4 6 6 9 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M12 21V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                title: 'Handbuilt with Intention', desc: 'Every piece is designed and built by hand in the Philippines.',
              },
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3c0 0-8 4-8 11a8 8 0 0016 0c0-7-8-11-8-11z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                title: 'Sustainably Sourced', desc: 'We use locally sourced materials and ethical growing practices.',
              },
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.3"/><path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                title: 'Built to Last', desc: 'Self-sustaining ecosystems that thrive for years with minimal care.',
              },
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                title: 'Community First', desc: 'We run workshops and share knowledge to grow the terrarium community.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="feature">
                <div className="feature__icon">{icon}</div>
                <div><strong>{title}</strong><p>{desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="tf-about" style={{ background: 'var(--black)' }}>
          <div className="tf-about__inner" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div>
              <p className="eyebrow">Get Involved</p>
              <h2 style={{ color: 'var(--white)' }}>Join a <em>workshop</em> or shop the collection</h2>
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
