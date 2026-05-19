import ProductCard from './ProductCard'
import type { Product } from '@/lib/types'

interface ProductGridProps {
  products: Product[]
  title?: string
  subtitle?: string
  emptyMessage?: string
}

export default function ProductGrid({
  products,
  title,
  subtitle,
  emptyMessage = 'No products found.',
}: ProductGridProps) {
  return (
    <section className="w-full">
      {(title || subtitle) && (
        <div className="text-center mb-16">
          {title && (
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink tracking-tight mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-stone-500 text-lg max-w-xl mx-auto leading-relaxed">{subtitle}</p>
          )}
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-24 text-stone-400">
          <p className="text-sm tracking-wide">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      )}
    </section>
  )
}
