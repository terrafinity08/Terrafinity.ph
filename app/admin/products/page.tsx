import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { getProducts } from '@/lib/actions/products'
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import DeleteProductButton from './DeleteProductButton'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Products' }
export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink">Products</h1>
          <p className="text-stone-400 text-sm mt-1">{products.length} item{products.length !== 1 ? 's' : ''} in catalogue</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center gap-2 bg-ink text-canvas text-sm font-medium px-5 py-2.5 rounded-full hover:bg-stone-800 transition-colors">
          <Plus className="h-4 w-4" /> Add product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-stone-100">
            <tr>
              {['Product', 'Category', 'Price', 'Stock', 'Labels', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-4 text-xs font-semibold tracking-widest uppercase text-stone-400 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-stone-400">
                  No products yet.{' '}
                  <Link href="/admin/products/new" className="underline">Add your first one →</Link>
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product.id} className="border-b border-stone-50 hover:bg-stone-50/60 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                      {product.image_url ? (
                        <Image src={product.image_url} alt={product.name} fill className="object-cover" sizes="40px" />
                      ) : (
                        <div className="w-full h-full bg-stone-100" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-ink">{product.name}</p>
                      <p className="text-xs text-stone-400">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-stone-500">{product.category?.name ?? '—'}</td>
                <td className="px-5 py-4 font-medium text-ink">{formatPrice(product.price)}</td>
                <td className="px-5 py-4">
                  <span className={`font-medium ${product.stock > 5 ? 'text-emerald-600' : product.stock > 0 ? 'text-amber-600' : 'text-stone-400'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {product.featured   && <Badge variant="default">Featured</Badge>}
                    {product.bestseller && <Badge variant="muted">Bestseller</Badge>}
                    {product.new_arrival && <Badge variant="success">New</Badge>}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-ink transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteProductButton id={product.id} name={product.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
