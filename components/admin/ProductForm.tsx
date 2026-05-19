'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Textarea } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ImageUpload from './ImageUpload'
import { slugify, formatPrice } from '@/lib/utils'
import { createProduct, updateProduct } from '@/lib/actions/products'
import type { Product, Category, ProductFormData } from '@/lib/types'

interface ProductFormProps {
  product?: Product
  categories: Category[]
}

const EMPTY: ProductFormData = {
  name: '', slug: '', description: '', short_description: '',
  price: 0, category_id: '', image_url: '', gallery_images: [],
  featured: false, bestseller: false, new_arrival: false,
  stock: 0, care_notes: '', dimensions: '', weight_grams: null,
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<ProductFormData>({
    ...EMPTY,
    ...(product
      ? {
          name: product.name,
          slug: product.slug,
          description: product.description ?? '',
          short_description: product.short_description ?? '',
          price: product.price,
          category_id: product.category_id ?? '',
          image_url: product.image_url ?? '',
          gallery_images: product.gallery_images ?? [],
          featured: product.featured,
          bestseller: product.bestseller,
          new_arrival: product.new_arrival,
          stock: product.stock,
          care_notes: product.care_notes ?? '',
          dimensions: product.dimensions ?? '',
          weight_grams: product.weight_grams,
        }
      : {}),
  })

  function set<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleNameChange(name: string) {
    set('name', name)
    if (!product) set('slug', slugify(name))
  }

  function handleSubmit() {
    setError(null)
    if (!form.name.trim())  { setError('Name is required'); return }
    if (!form.slug.trim())  { setError('Slug is required'); return }
    if (form.price <= 0)    { setError('Price must be greater than 0'); return }

    startTransition(async () => {
      const result = product
        ? await updateProduct(product.id, form)
        : await createProduct(form)
      if (!result.success) { setError(result.error ?? 'Something went wrong'); return }
      router.push('/admin/products')
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* Basic info card */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-5">
          <h2 className="font-semibold text-sm text-stone-600 tracking-wide uppercase">Product Info</h2>
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="e.g. Forest Sphere"
          />
          <Input
            label="Slug"
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            hint="Used in the product URL"
            placeholder="forest-sphere"
          />
          <Textarea
            label="Short description"
            value={form.short_description}
            onChange={(e) => set('short_description', e.target.value)}
            rows={2}
            placeholder="One-liner shown on product cards"
          />
          <Textarea
            label="Full description"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            rows={6}
            placeholder="Detailed product story, materials, uniqueness…"
          />
          <Textarea
            label="Care notes"
            value={form.care_notes}
            onChange={(e) => set('care_notes', e.target.value)}
            rows={3}
            placeholder="Watering, light requirements, maintenance…"
          />
        </div>

        {/* Details card */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-5">
          <h2 className="font-semibold text-sm text-stone-600 tracking-wide uppercase">Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Dimensions"
              value={form.dimensions}
              onChange={(e) => set('dimensions', e.target.value)}
              placeholder="e.g. 15cm × 15cm × 20cm"
            />
            <Input
              label="Weight (grams)"
              type="number"
              value={form.weight_grams ?? ''}
              onChange={(e) => set('weight_grams', e.target.value ? Number(e.target.value) : null)}
              placeholder="850"
            />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex flex-col gap-6">
        {/* Image */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <ImageUpload
            label="Main Image"
            value={form.image_url}
            onChange={(url) => set('image_url', url)}
            bucket="product-images"
          />
        </div>

        {/* Pricing & Stock */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-4">
          <h2 className="font-semibold text-sm text-stone-600 tracking-wide uppercase">Pricing</h2>
          <Input
            label="Price (₱)"
            type="number"
            value={form.price || ''}
            onChange={(e) => set('price', Number(e.target.value))}
            placeholder="3200"
          />
          {form.price > 0 && (
            <p className="text-xs text-stone-400">{formatPrice(form.price)}</p>
          )}
          <Input
            label="Stock"
            type="number"
            value={form.stock || ''}
            onChange={(e) => set('stock', Number(e.target.value))}
            placeholder="10"
          />
        </div>

        {/* Category */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-4">
          <h2 className="font-semibold text-sm text-stone-600 tracking-wide uppercase">Category</h2>
          <select
            value={form.category_id}
            onChange={(e) => set('category_id', e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink"
          >
            <option value="">— None —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Flags */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-3">
          <h2 className="font-semibold text-sm text-stone-600 tracking-wide uppercase">Labels</h2>
          {(
            [
              { key: 'featured',    label: 'Featured on homepage' },
              { key: 'bestseller',  label: 'Bestseller badge' },
              { key: 'new_arrival', label: 'New arrival badge' },
            ] as const
          ).map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                  form[key] ? 'bg-ink border-ink' : 'border-stone-300 group-hover:border-stone-500'
                }`}
                onClick={() => set(key, !form[key])}
              >
                {form[key] && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-stone-600">{label}</span>
            </label>
          ))}
        </div>

        {/* Submit */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
        <Button onClick={handleSubmit} loading={isPending} size="lg" className="w-full">
          {product ? 'Save changes' : 'Publish product'}
        </Button>
        <Button variant="secondary" onClick={() => router.back()} className="w-full" size="lg">
          Cancel
        </Button>
      </div>
    </div>
  )
}
