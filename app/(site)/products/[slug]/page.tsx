import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getProductBySlug, getProducts } from '@/lib/actions/products'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface Params { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Not found' }
  return { title: product.name, description: product.short_description ?? undefined }
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const related = (await getProducts({ category: product.category?.slug ?? undefined }))
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--black)', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Breadcrumb */}
        <div style={{ padding: '1.5rem 2rem 0', maxWidth: '1100px', margin: '0 auto' }}>
          <Link href="/gallery" style={{ color: 'var(--stone)', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L3 7l6-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to gallery
          </Link>
        </div>

        {/* Product layout */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Image */}
          <div style={{ position: 'relative', aspectRatio: '1', borderRadius: '16px', overflow: 'hidden', background: 'linear-gradient(150deg,#dce8d8,#c8d8c4)' }}>
            {product.image_url ? (
              <Image src={product.image_url} alt={product.name} fill style={{ objectFit: 'cover' }} priority sizes="(max-width:768px) 100vw, 50vw" />
            ) : (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" opacity="0.3"><path d="M12 3C8 3 5 7 6 11c1 4 6 6 9 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M12 21V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </div>
            )}
            {product.bestseller  && <span className="product-card__badge">Bestseller</span>}
            {product.new_arrival && <span className="product-card__badge">New</span>}
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {product.category && (
              <p className="eyebrow eyebrow--light">{product.category.name}</p>
            )}
            <h1 style={{ color: 'var(--white)', fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1 }}>{product.name}</h1>
            {product.short_description && (
              <p style={{ color: 'var(--stone)', lineHeight: 1.7, fontSize: '0.95rem' }}>{product.short_description}</p>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--white)' }}>{formatPrice(product.price)}</span>
              <span style={{ fontSize: '0.8rem', color: product.stock > 5 ? '#6db87e' : product.stock > 0 ? '#c9a84c' : 'var(--stone)' }}>
                {product.stock > 5 ? '✓ In stock' : product.stock > 0 ? `${product.stock} remaining` : 'Sold out'}
              </span>
            </div>

            {product.description && (
              <div>
                <p className="eyebrow eyebrow--light">About</p>
                <p style={{ color: 'var(--stone)', lineHeight: 1.7, fontSize: '0.9rem', marginTop: '0.5rem' }}>{product.description}</p>
              </div>
            )}

            {product.care_notes && (
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '1.25rem' }}>
                <p className="eyebrow eyebrow--light" style={{ marginBottom: '0.5rem' }}>Care guide</p>
                <p style={{ color: 'var(--stone)', lineHeight: 1.7, fontSize: '0.85rem' }}>{product.care_notes}</p>
              </div>
            )}

            {(product.dimensions || product.weight_grams) && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {product.dimensions && (
                  <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '1rem' }}>
                    <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.3rem' }}>Dimensions</p>
                    <p style={{ color: 'var(--white)', fontSize: '0.9rem', fontWeight: 500 }}>{product.dimensions}</p>
                  </div>
                )}
                {product.weight_grams && (
                  <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '1rem' }}>
                    <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.3rem' }}>Weight</p>
                    <p style={{ color: 'var(--white)', fontSize: '0.9rem', fontWeight: 500 }}>{product.weight_grams}g</p>
                  </div>
                )}
              </div>
            )}

            <button
              disabled={product.stock === 0}
              style={{ width: '100%', background: product.stock > 0 ? 'var(--white)' : 'rgba(255,255,255,0.15)', color: product.stock > 0 ? 'var(--black)' : 'var(--stone)', border: 'none', borderRadius: '50px', padding: '1rem', fontWeight: 600, fontSize: '0.95rem', cursor: product.stock > 0 ? 'pointer' : 'not-allowed', transition: 'opacity 0.2s' }}
            >
              {product.stock > 0 ? 'Add to cart' : 'Sold out'}
            </button>

            <Link href="/workshops" style={{ textAlign: 'center', color: 'var(--stone)', fontSize: '0.85rem', textDecoration: 'none' }}>
              Want to make your own? → Book a workshop
            </Link>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="shop" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div className="shop__header" style={{ marginBottom: '2rem' }}>
              <div className="section-header">
                <div>
                  <p className="eyebrow eyebrow--light">More like this</p>
                  <h2>You might also <em>like</em></h2>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="product-card card--visible">
                  <div className="product-card__img" style={{ background: 'linear-gradient(150deg,#dce8d8,#c8d8c4)', position: 'relative', overflow: 'hidden' }}>
                    {p.image_url && <Image src={p.image_url} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="260px" />}
                  </div>
                  <div className="product-card__body">
                    <p className="product-card__name">{p.name}</p>
                    <p className="product-card__price">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  )
}
