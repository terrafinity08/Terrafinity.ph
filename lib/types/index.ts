// ── Database row types ───────────────────────────────────────

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  sort_order: number
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  price: number
  category_id: string | null
  image_url: string | null
  gallery_images: string[]
  featured: boolean
  bestseller: boolean
  new_arrival: boolean
  stock: number
  care_notes: string | null
  dimensions: string | null
  weight_grams: number | null
  created_at: string
  updated_at: string
  // joined
  category?: Category | null
}

export interface Workshop {
  id: string
  title: string
  slug: string
  description: string | null
  short_description: string | null
  price: number
  duration_minutes: number
  max_participants: number
  image_url: string | null
  highlights: string[]
  includes: string[]
  active: boolean
  created_at: string
  updated_at: string
  // joined
  dates?: WorkshopDate[]
}

export interface WorkshopDate {
  id: string
  workshop_id: string
  date: string
  start_time: string
  end_time: string | null
  spots_total: number
  spots_booked: number
  active: boolean
  created_at: string
}

export interface WorkshopBooking {
  id: string
  workshop_id: string
  workshop_date_id: string | null
  customer_name: string
  customer_email: string
  customer_phone: string | null
  qty: number
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes: string | null
  created_at: string
  // joined
  workshop?: Workshop | null
  workshop_date?: WorkshopDate | null
}

export interface FeaturedProduct {
  id: string
  product_id: string
  collection: string
  sort_order: number
  created_at: string
  product?: Product | null
}

// ── Form input types ─────────────────────────────────────────

export interface ProductFormData {
  name: string
  slug: string
  description: string
  short_description: string
  price: number
  category_id: string
  image_url: string
  gallery_images: string[]
  featured: boolean
  bestseller: boolean
  new_arrival: boolean
  stock: number
  care_notes: string
  dimensions: string
  weight_grams: number | null
}

export interface WorkshopFormData {
  title: string
  slug: string
  description: string
  short_description: string
  price: number
  duration_minutes: number
  max_participants: number
  image_url: string
  highlights: string[]
  includes: string[]
  active: boolean
}

export interface BookingFormData {
  workshop_id: string
  workshop_date_id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  qty: number
  notes: string
}

// ── Server action responses ──────────────────────────────────

export interface ActionResult<T = unknown> {
  data?: T
  error?: string
  success: boolean
}

// ── Query filters ────────────────────────────────────────────

export interface ProductFilters {
  category?: string
  featured?: boolean
  bestseller?: boolean
  search?: string
  minPrice?: number
  maxPrice?: number
}
