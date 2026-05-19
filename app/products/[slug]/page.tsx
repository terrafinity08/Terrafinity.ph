import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, Leaf, Droplets, Sun } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductGrid from '@/components/store/ProductGrid'
import Badge from '@/components/ui/Badge'
import { getProductBySlug, getProducts } from '@/lib/actions/products'
import { formatPrice } from '@/lib/utils'

export const revalidate = 60

interface Params { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Not found' }
  return {
    title: product.name,
    description: product.short_description ?? undefined,
  }
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const related = (await getProducts({ category: product.category_id ?? undefined }))
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link href="/gallery" className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-ink transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to gallery
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Images */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-50">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Leaf className="h-16 w-16 text-stone-200" />
                  </div>
                )}
              </div>
              {product.gallery_images?.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.gallery_images.slice(0, 4).map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-stone-50">
                      <Image src={url} alt={`${product.name} ${i + 2}`} fill className="object-cover" sizes="15vw" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-2">
                {product.bestseller  && <Badge>Bestseller</Badge>}
                {product.new_arrival && <Badge variant="success">New arrival</Badge>}
                {product.featured    && <Badge variant="muted">Featured</Badge>}
                {product.category    && <Badge variant="muted">{product.category.name}</Badge>}
              </div>

              <div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink tracking-tight mb-3">
                  {product.name}
                </h1>
                {product.short_description && (
                  <p className="text-lg text-stone-500 leading-relaxed">{product.short_description}</p>
                )}
              </div>

              <div className="flex items-center gap-4 py-5 border-y border-stone-100">
                <span className="font-serif text-3xl font-bold text-ink">{formatPrice(product.price)}</span>
                <span className={`text-sm font-medium ${product.stock > 5 ? 'text-emerald-600' : product.stock > 0 ? 'text-amber-600' : 'text-stone-400'}`}>
                  {product.stock > 5 ? '✓ In stock' : product.stock > 0 ? `${product.stock} remaining` : 'Sold out'}
                </span>
              </div>

              {product.description && (
                <div>
                  <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-3">About</h3>
                  <p className="text-stone-600 leading-relaxed text-sm">{product.description}</p>
                </div>
              )}

              {product.care_notes && (
                <div className="bg-stone-50 rounded-2xl p-5">
                  <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4 flex items-center gap-2">
                    <Leaf className="h-3.5 w-3.5" /> Care guide
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{product.care_notes}</p>
                </div>
              )}

              {(product.dimensions || product.weight_grams) && (
                <div className="grid grid-cols-2 gap-4">
                  {product.dimensions && (
                    <div className="bg-stone-50 rounded-xl p-4">
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-1">Dimensions</p>
                      <p className="text-sm font-medium text-ink">{product.dimensions}</p>
                    </div>
                  )}
                  {product.weight_grams && (
                    <div className="bg-stone-50 rounded-xl p-4">
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-400 mb-1">Weight</p>
                      <p className="text-sm font-medium text-ink">{product.weight_grams}g</p>
                    </div>
                  )}
                </div>
              )}

              <button
                disabled={product.stock === 0}
                className="w-full bg-ink text-canvas font-medium py-4 rounded-full hover:bg-stone-800 active:bg-stone-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {product.stock > 0 ? 'Add to cart' : 'Sold out'}
              </button>

              <Link
                href="/workshops"
                className="text-center text-sm text-stone-400 hover:text-ink transition-colors"
              >
                Want to make your own? → Book a workshop
              </Link>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-24">
              <h2 className="font-serif text-3xl font-bold text-ink mb-8">You might also like</h2>
              <ProductGrid products={related} />
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
