'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/types'
import Badge from '@/components/ui/Badge'

interface ProductCardProps {
  product: Product
  className?: string
  priority?: boolean
}

export default function ProductCard({ product, className, priority = false }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        'group relative flex flex-col bg-white rounded-3xl overflow-hidden',
        'border border-stone-100 shadow-glass',
        'hover:shadow-glass-lg hover:-translate-y-1 transition-all duration-500 ease-out',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square bg-stone-50 overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={priority}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjVGMkVBIi8+PC9zdmc+"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Top-left shimmer overlay */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.bestseller && <Badge>Bestseller</Badge>}
          {product.new_arrival && <Badge variant="success">New</Badge>}
          {product.stock === 0 && <Badge variant="muted">Sold Out</Badge>}
        </div>

        {/* Quick-add overlay */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="text-white text-xs font-medium tracking-widest uppercase">View Details</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        {product.category && (
          <span className="text-[10px] font-medium tracking-widest uppercase text-stone-400">
            {product.category.name}
          </span>
        )}
        <h3 className="font-serif text-base font-bold text-ink leading-tight tracking-tight">
          {product.name}
        </h3>
        {product.short_description && (
          <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 flex-1">
            {product.short_description}
          </p>
        )}
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-stone-100">
          <span className="font-medium text-sm text-ink">{formatPrice(product.price)}</span>
          <span
            className={cn(
              'text-[10px] font-medium',
              product.stock > 5  ? 'text-emerald-600' :
              product.stock > 0  ? 'text-amber-600' : 'text-stone-400'
            )}
          >
            {product.stock > 5  ? 'In stock' :
             product.stock > 0  ? `${product.stock} left` : 'Sold out'}
          </span>
        </div>
      </div>
    </Link>
  )
}
