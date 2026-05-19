import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Terrafinity — Living Terrariums', template: '%s — Terrafinity' },
  description: 'Handcrafted luxury terrariums made in the Philippines. Living art for modern interiors.',
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    siteName: 'Terrafinity',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
