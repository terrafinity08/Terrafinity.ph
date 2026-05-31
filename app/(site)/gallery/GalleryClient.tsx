'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/types'

interface Props {
  products: Product[]
  categories: { id: string; name: string; slug: string }[]
}

export default function GalleryClient({ products, categories }: Props) {
  const [active, setActive] = useState<string | null>(null)

  const filtered = active
    ? products.filter(p => p.category?.slug === active)
    : products

  const pillStyle = (on: boolean): React.CSSProperties => ({
    background: on ? 'var(--black)' : 'rgba(0,0,0,0.06)',
    color: on ? 'var(--white)' : 'var(--stone)',
    border: on ? '1px solid transparent' : '1px solid rgba(0,0,0,0.1)',
    borderRadius: '50px',
    padding: '0.4rem 1.1rem',
    fontSize: '0.78rem',
    fontWeight: on ? 600 : 400,
    letterSpacing: '0.04em',
    cursor: 'pointer',
    transition: 'all 0.2s',
  })

  return (
    <section className="shop" id="shop" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
      <div className="shop__header">
        <div className="section-header">
          <div>
            <p className="eyebrow eyebrow--light">
              {filtered.length > 0 ? `${filtered.length} terrariums` : 'All Terrariums'}
            </p>
            <h2>Explore the <em>collection</em></h2>
          </div>
          <Link href="/create" className="link-arrow link-arrow--light">
            Create your own{' '}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>

      {/* Category pills */}
      {categories.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', maxWidth: '1200px', margin: '1.5rem auto 0', padding: '0 2rem' }}>
          <button style={pillStyle(active === null)} onClick={() => setActive(null)}>All</button>
          {categories.map(c => (
            <button key={c.id} style={pillStyle(active === c.slug)} onClick={() => setActive(active === c.slug ? null : c.slug)}>
              {c.name}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '2rem auto 0', padding: '0 2rem' }}>
        {filtered.length > 0 ? filtered.map((p) => (
          <Link key={p.id} href={`/products/${p.slug}`} className="product-card card--visible">
            <div className="product-card__img" style={{ background: 'linear-gradient(150deg,#dce8d8,#c8d8c4)', position: 'relative', overflow: 'hidden' }}>
              {p.bestseller  && <span className="product-card__badge">Bestseller</span>}
              {p.new_arrival && <span className="product-card__badge">New</span>}
              {p.image_url && <Image src={p.image_url} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="300px" />}
            </div>
            <div className="product-card__body">
              <p className="product-card__name">{p.name}</p>
              <p className="product-card__price">{formatPrice(p.price)}</p>
            </div>
          </Link>
        )) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 0', color: 'var(--stone)' }}>
            <p>No terrariums in this category yet.</p>
            <button onClick={() => setActive(null)} style={{ marginTop: '1rem', background: 'none', border: 'none', color: 'var(--green-mid)', cursor: 'pointer', textDecoration: 'underline' }}>View all</button>
          </div>
        )}
      </div>
    </section>
  )
}
