import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ink text-canvas">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <p className="font-serif text-xl font-bold mb-4">Terrafinity</p>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Living art for modern interiors. Handcrafted terrariums made with care in the Philippines.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Shop</p>
          <ul className="flex flex-col gap-2.5">
            {[['Gallery', '/gallery'], ['Workshops', '/workshops'], ['About', '/about']].map(([label, href]) => (
              <li key={href}><Link href={href} className="text-sm text-white/45 hover:text-white transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Get in touch</p>
          <ul className="flex flex-col gap-2.5 text-sm text-white/45">
            <li>hello@terrafinity.ph</li>
            <li>Instagram: @terrafinityph</li>
            <li>Philippines 🇵🇭</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/8 px-6 py-5 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/25">© {new Date().getFullYear()} Terrafinity PH. All rights reserved.</p>
        <p className="text-xs text-white/20">Handcrafted with love.</p>
      </div>
    </footer>
  )
}
