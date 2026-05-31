'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/types'

interface Props {
  products: Product[]
}

const PLACEHOLDERS = [
  { name: 'Mountainscape', price: 2800 },
  { name: 'Bonsai',        price: 3500, badge: 'Bestseller' },
  { name: 'Sulu',          price: 3200 },
  { name: 'Sibuyan',       price: 2600 },
  { name: 'Eternal',       price: 2400 },
  { name: 'Miniscape',     price: 4200, badge: 'Set of 4' },
] as const

export default function ProductCarousel({ products }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scroll(dir: 'prev' | 'next') {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector('.product-card') as HTMLElement | null
    const amount = (card?.offsetWidth ?? 280) + 20
    trackRef.current.scrollBy({ left: dir === 'prev' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <div className="products-carousel">
      <button className="carousel-btn carousel-btn--prev" aria-label="Previous" onClick={() => scroll('prev')}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="products" id="productsGrid" ref={trackRef}>
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
        )) : PLACEHOLDERS.map((p) => (
          <div key={p.name} className="product-card card--visible">
            <div className="product-card__img" style={{ background: 'linear-gradient(150deg,#dce8d8,#c8d8c4)' }}>
              {'badge' in p && <span className="product-card__badge">{p.badge}</span>}
            </div>
            <div className="product-card__body">
              <p className="product-card__name">{p.name}</p>
              <p className="product-card__price">₱{p.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-btn carousel-btn--next" aria-label="Next" onClick={() => scroll('next')}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
