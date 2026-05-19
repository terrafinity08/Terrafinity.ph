import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ProductForm from '@/components/admin/ProductForm'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Category } from '@/lib/types'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Admin — New Product' }

async function getCategories(): Promise<Category[]> {
  const supabase = createAdminClient()
  const { data } = await supabase.from('categories').select('*').order('sort_order')
  return (data ?? []) as Category[]
}

export default async function NewProductPage() {
  const categories = await getCategories()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-ink transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink">New product</h1>
          <p className="text-stone-400 text-sm mt-0.5">Fill in the details and publish instantly</p>
        </div>
      </div>
      <ProductForm categories={categories} />
    </div>
  )
}
