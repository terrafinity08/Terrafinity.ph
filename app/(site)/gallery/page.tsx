import { Suspense } from 'react'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductGrid from '@/components/store/ProductGrid'
import CategoryFilter from '@/components/store/CategoryFilter'
import SearchBar from '@/components/store/SearchBar'
import Spinner from '@/components/ui/Spinner'
import { getProducts } from '@/lib/actions/products'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Category, ProductFilters } from '@/lib/types'

export const metadata: Metadata = { title: 'Gallery' }
export const dynamic = 'force-dynamic'

async function getCategories(): Promise<Category[]> {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase.from('categories').select('*').order('sort_order')
    return (data ?? []) as Category[]
  } catch {
    return []
  }
}

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string }>
}

export default async function GalleryPage({ searchParams }: PageProps) {
  const params = await searchParams
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ category: params.category, search: params.search } as ProductFilters),
  ])

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        {/* Hero */}
        <div className="bg-stone-50 border-b border-stone-100 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-stone-400 mb-3">Handmade</p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-ink tracking-tight mb-4">Gallery</h1>
            <p className="text-stone-500 max-w-lg leading-relaxed">Every terrarium is one-of-a-kind — living art you can own.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <Suspense>
              <CategoryFilter categories={categories} />
            </Suspense>
            <Suspense>
              <SearchBar className="md:w-72 md:ml-auto" />
            </Suspense>
          </div>

          {/* Products */}
          <Suspense fallback={<div className="flex justify-center py-24"><Spinner className="h-8 w-8" /></div>}>
            <ProductGrid
              products={products}
              emptyMessage="No terrariums match your search. Try a different filter."
            />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
