import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/store/ProductCard'
import WorkshopCard from '@/components/store/WorkshopCard'
import { getFeaturedProducts } from '@/lib/actions/products'
import { getWorkshops } from '@/lib/actions/workshops'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [featured, workshops] = await Promise.all([
    getFeaturedProducts('homepage'),
    getWorkshops(true),
  ])

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Background photo — place your image at public/hero-bg.jpg */}
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          {/* Soft white wash so text stays legible over the photo */}
          <div className="absolute inset-0 bg-white/55" />
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-stone-500 mb-8">
              Handcrafted in the Philippines
            </p>
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-ink tracking-tight leading-[0.95] mb-8 text-balance">
              Living worlds<br />
              <em className="not-italic text-stone-500">under glass</em>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 max-w-xl mx-auto leading-relaxed mb-12">
              Each terrarium is a hand-placed ecosystem — a living sculpture for your home or workspace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 bg-ink text-canvas font-medium px-8 py-4 rounded-full hover:bg-stone-800 transition-colors"
              >
                Shop terrariums <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/workshops"
                className="inline-flex items-center gap-2 border border-stone-200 bg-white/70 text-ink font-medium px-8 py-4 rounded-full hover:bg-white transition-colors"
              >
                Book a workshop
              </Link>
            </div>
          </div>
        </section>

        {/* Featured products */}
        {featured.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-400 mb-3">Curated</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink tracking-tight">
                  Featured pieces
                </h2>
              </div>
              <Link
                href="/gallery"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-ink transition-colors"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featured.slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 2} />
              ))}
            </div>
          </section>
        )}

        {/* Workshops teaser */}
        {workshops.length > 0 && (
          <section className="bg-stone-50 py-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-14">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-400 mb-3">Hands-on</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink tracking-tight mb-4">
                  Terrarium workshops
                </h2>
                <p className="text-stone-500 max-w-lg mx-auto leading-relaxed">
                  Build your own terrarium in an intimate group session. All materials included.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workshops.slice(0, 3).map((ws) => (
                  <WorkshopCard key={ws.id} workshop={ws} />
                ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  href="/workshops"
                  className="inline-flex items-center gap-2 border border-stone-200 text-ink font-medium px-7 py-3.5 rounded-full hover:bg-stone-100 transition-colors"
                >
                  View all workshops <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Values strip */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Handcrafted', body: 'Every piece is assembled by hand in our Manila studio.' },
              { title: 'Low maintenance', body: 'Self-sustaining ecosystems designed for modern life.' },
              { title: 'Ship nationwide', body: 'Carefully packaged and shipped across the Philippines.' },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <h3 className="font-serif text-xl font-bold text-ink mb-3">{v.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
