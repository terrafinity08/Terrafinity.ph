'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/',           label: 'Home',           page: 'home' },
  { href: '/series',     label: 'The Series',     page: 'series' },
  { href: '/create',     label: 'Create Your Own', page: 'create' },
  { href: '/workshops',  label: 'Workshops',       page: 'workshops' },
  { href: '/gallery',    label: 'Gallery',         page: 'gallery' },
  { href: '/about',      label: 'About',           page: 'about' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartCount] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="nav__inner">
        {/* Logo */}
        <Link href="/" className="nav__logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M4 14C4 14 6 8 14 6C22 4 24 10 20 14C16 18 10 16 8 20C6 24 10 26 14 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M14 6C14 6 12 10 14 14C16 18 20 18 20 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 10C8 10 10 11 12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M18 8C18 8 17 11 16 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>Terrafinity</span>
        </Link>

        {/* Desktop nav */}
        <nav className="nav__links">
          <Link href="/" className={`nav__link${pathname === '/' ? ' nav__link--active' : ''}`}>Home</Link>

          <div className="nav__item nav__item--dropdown">
            <a href="/#shop" className="nav__link">
              Shop{' '}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <div className="nav__dropdown">
              <Link href="/gallery">All Terrariums</Link>
              <Link href="/gallery">Best Sellers</Link>
              <Link href="/gallery">New Arrivals</Link>
            </div>
          </div>

          {navLinks.slice(1).map(({ href, label, page }) => (
            <Link
              key={href}
              href={href}
              className={`nav__link${pathname === href || pathname.startsWith(href + '/') ? ' nav__link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="nav__actions">
          <button className="nav__icon" aria-label="Search" onClick={() => setSearchOpen(v => !v)}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11.5 11.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="nav__icon" aria-label="Account">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="nav__icon nav__cart" aria-label="Cart">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2h2l2.4 9.6A1 1 0 007.36 13h7.28a1 1 0 00.96-.72L17 6H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8" cy="16" r="1" fill="currentColor"/>
              <circle cx="14" cy="16" r="1" fill="currentColor"/>
            </svg>
            <span className="nav__cart-count" id="cartCount">{cartCount}</span>
          </button>
          <Link href="/workshops" className="btn btn--dark btn--sm">
            Book a consultation{' '}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <button
          className={`nav__hamburger${mobileOpen ? ' open' : ''}`}
          id="menuToggle"
          aria-label="Menu"
          onClick={() => setMobileOpen(v => !v)}
        >
          <span/><span/><span/>
        </button>
      </div>

      {/* Search bar */}
      <div className={`nav__search${searchOpen ? ' open' : ''}`} id="searchBar">
        <input ref={searchRef} type="text" placeholder="Search terrariums, plants, accessories…" />
        <button>Search</button>
      </div>

      {/* Mobile menu */}
      <div className={`nav__mobile${mobileOpen ? ' open' : ''}`} id="mobileMenu">
        <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link href="/gallery" onClick={() => setMobileOpen(false)}>Shop</Link>
        <Link href="/series" onClick={() => setMobileOpen(false)}>The Series</Link>
        <Link href="/create" onClick={() => setMobileOpen(false)}>Create Your Own</Link>
        <Link href="/workshops" onClick={() => setMobileOpen(false)}>Workshops</Link>
        <Link href="/gallery" onClick={() => setMobileOpen(false)}>Gallery</Link>
        <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>
        <Link href="/workshops" onClick={() => setMobileOpen(false)} className="btn btn--dark" style={{ marginTop: '1rem' }}>
          Book a consultation
        </Link>
      </div>
    </header>
  )
}
