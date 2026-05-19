'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Product, ProductFormData, ActionResult, ProductFilters } from '@/lib/types'

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const supabase = createAdminClient()
  let query = supabase
    .from('products')
    .select('*, category:categories(*)')
    .order('created_at', { ascending: false })

  if (filters?.category) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', filters.category)
      .single()
    if (!cat) return []
    query = query.eq('category_id', cat.id)
  }
  if (filters?.featured)   query = query.eq('featured', true)
  if (filters?.bestseller) query = query.eq('bestseller', true)
  if (filters?.search)     query = query.ilike('name', `%${filters.search}%`)
  if (filters?.minPrice)   query = query.gte('price', filters.minPrice)
  if (filters?.maxPrice)   query = query.lte('price', filters.maxPrice)

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return (data ?? []) as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data as Product
}

export async function getFeaturedProducts(collection = 'homepage'): Promise<Product[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('featured_products')
    .select('*, product:products(*, category:categories(*))')
    .eq('collection', collection)
    .order('sort_order')
  if (error) throw new Error(error.message)

  const fromJunction = (data ?? []).map((fp) => fp.product as Product).filter(Boolean)
  if (fromJunction.length > 0) return fromJunction

  // Fallback: return products marked featured=true when junction table is empty
  const { data: fallback } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(8)
  return (fallback ?? []) as Product[]
}

export async function createProduct(
  formData: ProductFormData
): Promise<ActionResult<Product>> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .insert(formData)
    .select('*, category:categories(*)')
    .single()
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/products')
  revalidatePath('/')
  return { success: true, data: data as Product }
}

export async function updateProduct(
  id: string,
  formData: Partial<ProductFormData>
): Promise<ActionResult<Product>> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .update(formData)
    .eq('id', id)
    .select('*, category:categories(*)')
    .single()
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/products')
  revalidatePath('/')
  revalidatePath(`/products/${data.slug}`)
  return { success: true, data: data as Product }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const supabase = createAdminClient()
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/products')
  revalidatePath('/')
  return { success: true }
}

export async function setFeatured(
  productId: string,
  collection: string,
  isFeatured: boolean
): Promise<ActionResult> {
  const supabase = createAdminClient()
  if (isFeatured) {
    const { error } = await supabase
      .from('featured_products')
      .insert({ product_id: productId, collection })
    if (error) return { success: false, error: error.message }
  } else {
    const { error } = await supabase
      .from('featured_products')
      .delete()
      .eq('product_id', productId)
      .eq('collection', collection)
    if (error) return { success: false, error: error.message }
  }
  revalidatePath('/admin/products')
  revalidatePath('/')
  return { success: true }
}
