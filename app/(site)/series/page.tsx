import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getProducts } from '@/lib/actions/products'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

export const metadata: Metadata = { title: 'The Series — Terrafinity' }
export const dynamic = 'force-dynamic'

export default async function SeriesPage() {
  const products = await getProducts()

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="hv2" id="series-hero" style={{ minHeight: '55vh' }}>
          <div className="hv2-forest" aria-hidden="true">
            <div className="hv2-sky" />
            <div className="hv2-mist hv2-mist--1" />
            <div className="hv2-mist hv2-mist--2" />
            <div className="hv2-ground" />
          </div>
          <div className="hv2-overlay" />
          <div className="hv2-content" style={{ textAlign: 'center' }}>
            <p className="hv2-eyebrow">Handcrafted Collection</p>
            <h1 className="hv2-h1">The <em>Series</em></h1>
            <p className="hv2-sub">Nine signature terrariums, each named after a Philippine landscape. Built by hand. Made to last.</p>
            <div className="hv2-ctas">
              <Link href="/gallery" className="btn btn--dark">View all terrariums</Link>
              <Link href="/create" className="btn btn--outline">Create your own</Link>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="shop" id="series-shop" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
          <div className="shop__header">
            <div className="section-header">
              <div>
                <p className="eyebrow eyebrow--light">The Collection</p>
                <h2>Signature <em>terrariums</em></h2>
              </div>
              <Link href="/gallery" className="link-arrow link-arrow--light">
                All products{' '}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>

          <div className="products" style={{ paddingLeft: '2rem', paddingRight: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '2rem auto 0' }}>
            {products.length > 0 ? products.map((p) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="product-card card--visible">
                <div className="product-card__img" style={{ background: 'linear-gradient(150deg,#dce8d8,#c8d8c4)', position: 'relative', overflow: 'hidden' }}>
                  {p.bestseller  && <span className="product-card__badge">Bestseller</span>}
                  {p.new_arrival && <span className="product-card__badge">New</span>}
                  {p.image_url && (
                    <Image src={p.image_url} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="280px" />
                  )}
                </div>
                <div className="product-card__body">
                  <p className="product-card__name">{p.name}</p>
                  <p className="product-card__price">{formatPrice(p.price)}</p>
                </div>
              </Link>
            )) : (
              ['Mountainscape', 'Bonsai', 'Sulu', 'Sibuyan', 'Eternal', 'Miniscape', 'Coastal', 'Fern', 'Mosscape'].map((name) => (
                <div key={name} className="product-card card--visible">
                  <div className="product-card__img" style={{ background: 'linear-gradient(150deg,#dce8d8,#c8d8c4)' }} />
                  <div className="product-card__body">
                    <p className="product-card__name">{name}</p>
                    <p className="product-card__price">Coming soon</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <div className="features__inner">
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3C8 3 5 7 6 11c1 4 6 6 9 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M12 21V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title: 'Philippine-Inspired', desc: 'Named after our islands, mountains, and coastal wonders.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="8" rx="4" ry="2" stroke="currentColor" strokeWidth="1.3"/><ellipse cx="12" cy="12" rx="6" ry="3" stroke="currentColor" strokeWidth="1.3"/><ellipse cx="12" cy="16" rx="4" ry="2" stroke="currentColor" strokeWidth="1.3"/></svg>, title: 'Self-Sustaining', desc: 'A little light. Occasional misting. Years of life.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.3"/><path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: '100% Handbuilt', desc: 'No two pieces are exactly alike.' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: 'Ships Nationwide', desc: 'Safely packed and delivered anywhere in the Philippines.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="feature">
                <div className="feature__icon">{icon}</div>
                <div><strong>{title}</strong><p>{desc}</p></div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
