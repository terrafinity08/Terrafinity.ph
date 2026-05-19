import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ProductForm from '@/components/admin/ProductForm'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Category, Product } from '@/lib/types'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Admin — Edit Product' }

async function getProduct(id: string): Promise<Product | null> {
  const supabase = createAdminClient()
  const { data } = await supabase.from('products').select('*, category:categories(*)').eq('id', id).single()
  return data as Product | null
}

async function getCategories(): Promise<Category[]> {
  const supabase = createAdminClient()
  const { data } = await supabase.from('categories').select('*').order('sort_order')
  return (data ?? []) as Category[]
}

interface Props { params: Promise<{ id: string }> }

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const [product, categories] = await Promise.all([getProduct(id), getCategories()])
  if (!product) notFound()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-ink transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink">Edit: {product.name}</h1>
          <p className="text-stone-400 text-sm mt-0.5">Changes publish instantly</p>
        </div>
      </div>
      <ProductForm product={product} categories={categories} />
    </div>
  )
}
