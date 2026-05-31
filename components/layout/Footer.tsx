'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__top">
        <div className="footer__brand">
          <Link href="/" className="nav__logo footer__logo">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <path d="M4 14C4 14 6 8 14 6C22 4 24 10 20 14C16 18 10 16 8 20C6 24 10 26 14 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M14 6C14 6 12 10 14 14C16 18 20 18 20 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Terrafinity</span>
          </Link>
          <p>Modern terrariums for calmer spaces and a more mindful life.</p>
          <div className="footer__social">
            <a href="#" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="13" cy="5" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" aria-label="Pinterest">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 3c0 2 1.5 3 3 3v3c-1.5 0-3-.5-4-1.5V13a4 4 0 11-4-4V12a1 1 0 100 2 1 1 0 000-2V3h5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h5>Shop</h5>
          <Link href="/gallery">All Terrariums</Link>
          <Link href="/gallery">Best Sellers</Link>
          <Link href="/gallery">New Arrivals</Link>
          <Link href="/gallery">Gift Cards</Link>
        </div>
        <div className="footer__col">
          <h5>Company</h5>
          <Link href="/about">About Us</Link>
          <Link href="/about">Sustainability</Link>
          <Link href="/about">Our Process</Link>
          <Link href="/workshops">Contact</Link>
        </div>
        <div className="footer__col">
          <h5>Resources</h5>
          <Link href="/workshops">Workshops</Link>
          <Link href="/gallery">Gallery</Link>
          <a href="#">FAQ</a>
          <a href="#">Shipping &amp; Returns</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="footer__col footer__newsletter">
          <h5>Stay inspired</h5>
          <p>Sign up for plant care tips, new arrivals, and mindful living.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" aria-label="Subscribe">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Terrafinity. All rights reserved.</p>
        <p>Nature, Simplified.</p>
      </div>
    </footer>
  )
}
