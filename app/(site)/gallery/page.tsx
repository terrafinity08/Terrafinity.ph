import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getProducts } from '@/lib/actions/products'
import GalleryClient from './GalleryClient'

export const metadata: Metadata = { title: 'Gallery — Terrafinity' }
export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const products = await getProducts()

  // Derive unique categories from loaded products
  const categoryMap = new Map<string, { id: string; name: string; slug: string }>()
  for (const p of products) {
    if (p.category && !categoryMap.has(p.category.id)) {
      categoryMap.set(p.category.id, { id: p.category.id, name: p.category.name, slug: p.category.slug })
    }
  }
  const categories = Array.from(categoryMap.values())

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="hv2" id="gallery-hero" style={{ minHeight: '50vh' }}>
          <div className="hv2-forest" aria-hidden="true">
            <div className="hv2-sky" />
            <div className="hv2-mist hv2-mist--1" />
            <div className="hv2-mist hv2-mist--2" />
            <div className="hv2-ground" />
          </div>
          <div className="hv2-overlay" />
          <div className="hv2-content" style={{ textAlign: 'center' }}>
            <p className="hv2-eyebrow">Handcrafted in the Philippines</p>
            <h1 className="hv2-h1">The <em>Gallery</em></h1>
            <p className="hv2-sub">Every terrarium is one-of-a-kind — a living landscape you can own.</p>
            <div className="hv2-ctas">
              <a href="#shop" className="btn btn--dark">Browse terrariums</a>
              <a href="/create" className="btn btn--outline">Create your own</a>
            </div>
          </div>
        </section>

        {/* Products + filter — client component */}
        {products.length > 0 ? (
          <GalleryClient products={products} categories={categories} />
        ) : (
          <section className="shop" id="shop" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
            <div className="shop__header">
              <div className="section-header">
                <div>
                  <p className="eyebrow eyebrow--light">Coming Soon</p>
                  <h2>Our <em>collection</em></h2>
                </div>
                <a href="/create" className="link-arrow link-arrow--light">
                  Create your own{' '}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '2rem auto 0', padding: '0 2rem' }}>
              {['Mountainscape', 'Bonsai', 'Sulu', 'Sibuyan', 'Eternal', 'Miniscape', 'Coastal', 'Fern', 'Mosscape'].map((name) => (
                <div key={name} className="product-card card--visible">
                  <div className="product-card__img" style={{ background: 'linear-gradient(150deg,#dce8d8,#c8d8c4)' }} />
                  <div className="product-card__body">
                    <p className="product-card__name">{name}</p>
                    <p className="product-card__price">Coming soon</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Features bar */}
        <section className="features">
          <div className="features__inner">
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3C8 3 5 7 6 11c1 4 6 6 9 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M12 21V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title: 'Self-sustaining', desc: 'Each piece is a living, breathing ecosystem.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="8" rx="4" ry="2" stroke="currentColor" strokeWidth="1.3"/><ellipse cx="12" cy="12" rx="6" ry="3" stroke="currentColor" strokeWidth="1.3"/><ellipse cx="12" cy="16" rx="4" ry="2" stroke="currentColor" strokeWidth="1.3"/></svg>, title: 'Low maintenance', desc: 'A little light. Occasional misting. Years of life.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.3"/><path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: '100% handbuilt', desc: 'No two pieces are exactly alike.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: 'Ships nationwide', desc: 'Safe delivery anywhere in the Philippines.' },
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
            { title: 'Free shipping',    desc: 'On orders over ₱2,500',       icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="11" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M7 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
            { title: 'Secure packaging', desc: 'Plants arrive safe & sound',  icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6l7-3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
            { title: 'Made to order',    desc: 'Crafted with care, 2–3 weeks', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.3"/><path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            { title: 'Support',          desc: "We're here to help",          icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 6h14M4 10h10M4 14h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
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
