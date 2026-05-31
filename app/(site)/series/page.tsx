import type { Metadata } from 'next'
import SeriesCarousel from './SeriesCarousel'

export const metadata: Metadata = { title: 'The Series — Terrafinity' }

export default function SeriesPage() {
  return <SeriesCarousel />
}
