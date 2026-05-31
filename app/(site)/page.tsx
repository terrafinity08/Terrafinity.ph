import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductCarousel from '@/components/store/ProductCarousel'
import { getFeaturedProducts } from '@/lib/actions/products'
import { getWorkshops } from '@/lib/actions/workshops'
import { formatPrice } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terrafinity — Living Nature, Crafted for You.' }
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [featured, workshops] = await Promise.all([
    getFeaturedProducts('homepage'),
    getWorkshops(true),
  ])

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO — animated forest ── */}
        <section className="hv2" id="home">
          <div className="hv2-forest" aria-hidden="true">
            <div className="hv2-sky" />
            <div className="hv2-mist hv2-mist--1" />
            <div className="hv2-mist hv2-mist--2" />
            <div className="hv2-mist hv2-mist--3" />

            {/* Far trees */}
            <div className="hv2-layer hv2-layer--far">
              {[
                { l:'2%',  w:'28px', h:'90px',  dur:'7.2s', del:'0s'   },
                { l:'9%',  w:'22px', h:'70px',  dur:'6.4s', del:'1.1s' },
                { l:'17%', w:'32px', h:'110px', dur:'8.1s', del:'0.4s' },
                { l:'25%', w:'24px', h:'80px',  dur:'6.8s', del:'2.2s' },
                { l:'36%', w:'30px', h:'95px',  dur:'7.6s', del:'0.8s' },
                { l:'50%', w:'26px', h:'85px',  dur:'6.2s', del:'1.6s' },
                { l:'63%', w:'34px', h:'105px', dur:'7.9s', del:'0.2s' },
                { l:'75%', w:'22px', h:'75px',  dur:'6.6s', del:'2.8s' },
                { l:'84%', w:'28px', h:'90px',  dur:'7.3s', del:'1.3s' },
                { l:'93%', w:'20px', h:'65px',  dur:'8.4s', del:'0.6s' },
              ].map((t, i) => (
                <div key={i} className="hv2-tree" style={{ left: t.l, ['--tw' as string]: t.w, ['--th' as string]: t.h, ['--dur' as string]: t.dur, ['--del' as string]: t.del }} />
              ))}
            </div>

            {/* Mid trees */}
            <div className="hv2-layer hv2-layer--mid">
              {[
                { l:'0%',  w:'48px', h:'160px', dur:'5.8s', del:'0.3s' },
                { l:'8%',  w:'38px', h:'130px', dur:'6.2s', del:'1.7s' },
                { l:'19%', w:'52px', h:'180px', dur:'5.4s', del:'0.9s' },
                { l:'31%', w:'42px', h:'145px', dur:'6.7s', del:'2.1s' },
                { l:'44%', w:'56px', h:'190px', dur:'5.1s', del:'0.5s' },
                { l:'57%', w:'40px', h:'135px', dur:'6.4s', del:'1.4s' },
                { l:'69%', w:'50px', h:'170px', dur:'5.7s', del:'0.1s' },
                { l:'80%', w:'44px', h:'150px', dur:'6.1s', del:'2.5s' },
                { l:'91%', w:'36px', h:'125px', dur:'5.9s', del:'1.0s' },
              ].map((t, i) => (
                <div key={i} className="hv2-tree" style={{ left: t.l, ['--tw' as string]: t.w, ['--th' as string]: t.h, ['--dur' as string]: t.dur, ['--del' as string]: t.del }} />
              ))}
            </div>

            {/* Near trees */}
            <div className="hv2-layer hv2-layer--near">
              {[
                { l:'-2%', w:'80px', h:'260px', dur:'4.2s', del:'0.7s' },
                { l:'10%', w:'64px', h:'220px', dur:'4.8s', del:'1.9s' },
                { l:'27%', w:'88px', h:'290px', dur:'3.9s', del:'0.3s' },
                { l:'48%', w:'72px', h:'240px', dur:'4.5s', del:'2.3s' },
                { l:'67%', w:'92px', h:'300px', dur:'4.1s', del:'0.9s' },
                { l:'83%', w:'68px', h:'230px', dur:'4.7s', del:'1.5s' },
                { l:'96%', w:'76px', h:'250px', dur:'3.7s', del:'0.1s' },
              ].map((t, i) => (
                <div key={i} className="hv2-tree" style={{ left: t.l, ['--tw' as string]: t.w, ['--th' as string]: t.h, ['--dur' as string]: t.dur, ['--del' as string]: t.del }} />
              ))}
            </div>

            {/* Particles */}
            <div className="hv2-particles">
              {[
                { l:'8%',  b:'20%', pd:'9s',  d:'0s'   },
                { l:'18%', b:'35%', pd:'12s', d:'2.1s' },
                { l:'29%', b:'15%', pd:'8s',  d:'4.3s' },
                { l:'41%', b:'28%', pd:'11s', d:'1.5s' },
                { l:'53%', b:'42%', pd:'10s', d:'3.7s' },
                { l:'62%', b:'18%', pd:'13s', d:'0.8s' },
                { l:'73%', b:'32%', pd:'9s',  d:'5.2s' },
                { l:'82%', b:'22%', pd:'11s', d:'2.9s' },
                { l:'91%', b:'38%', pd:'8s',  d:'1.1s' },
                { l:'45%', b:'10%', pd:'14s', d:'6.0s' },
                { l:'22%', b:'55%', pd:'10s', d:'3.3s' },
                { l:'77%', b:'48%', pd:'12s', d:'4.8s' },
              ].map((p, i) => (
                <div key={i} className="hv2-p" style={{ left: p.l, bottom: p.b, ['--pdur' as string]: p.pd, ['--del' as string]: p.d }} />
              ))}
            </div>
            <div className="hv2-ground" />
          </div>

          <div className="hv2-overlay" />

          <div className="hv2-content">
            <p className="hv2-eyebrow">Handcrafted in the Philippines</p>
            <h1 className="hv2-h1">Living nature,<br /><em>crafted for you.</em></h1>
            <p className="hv2-sub">
              Terrafinity builds miniature living ecosystems — each one named after a Philippine landscape,
              placed inside glass, and built to last for years.
            </p>
            <div className="hv2-ctas">
              <a href="#shop" className="btn btn--dark">Explore the collection</a>
              <Link href="/gallery" className="btn btn--outline">View The Series</Link>
            </div>
          </div>

          <div className="hv2-bottom">
            <span>Free shipping on orders over ₱2,500</span>
            <span className="hv2-dot">·</span>
            <span>Handcrafted to order · 2–3 weeks</span>
            <span className="hv2-dot">·</span>
            <span>Ships nationwide across the Philippines</span>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="tf-about">
          <div className="tf-about__inner">
            <div className="tf-about__text">
              <p className="eyebrow">What is Terrafinity</p>
              <h2>We build <em>living art</em><br />inside glass.</h2>
              <p>Terrafinity is a Philippine-based terrarium studio. We design and build miniature ecosystems by hand — each one named after one of our islands, mountains, or coastal wonders. Moss layered over stone, roots shaped around driftwood, living matter arranged to breathe and grow inside sealed glass.</p>
              <p>We believe nature belongs in your everyday spaces. Not just outside, and not just in parks — right here, on your desk, your shelf, your bedside table. Alive and growing, quietly, without much care from you.</p>
              <p>Every Terrafinity piece is self-sustaining. A little light. Occasional misting. Years of life.</p>
              <Link href="/gallery" className="btn btn--outline" style={{ marginTop: '8px' }}>See the full series →</Link>
            </div>
            <div className="tf-about__stats">
              <div className="tf-stat"><strong>120+</strong><span>Terrariums crafted</span></div>
              <div className="tf-stat"><strong>9</strong><span>Signature designs</span></div>
              <div className="tf-stat"><strong>100%</strong><span>Handbuilt</span></div>
              <div className="tf-stat"><strong>PH</strong><span>Made in the Philippines</span></div>
            </div>
          </div>
        </section>

        {/* ── FEATURES BAR ── */}
        <section className="features">
          <div className="features__inner">
            {[
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3C8 3 5 7 6 11c1 4 6 6 9 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M12 21V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                title: 'Natural & Timeless', desc: 'Designed to last, styled by nature.',
              },
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="8" rx="4" ry="2" stroke="currentColor" strokeWidth="1.3"/><ellipse cx="12" cy="12" rx="6" ry="3" stroke="currentColor" strokeWidth="1.3"/><ellipse cx="12" cy="16" rx="4" ry="2" stroke="currentColor" strokeWidth="1.3"/></svg>,
                title: 'Low Maintenance', desc: 'Self-sustaining ecosystems that thrive.',
              },
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 17L5 19M17 17l2 2M12 3v4M4.5 7.5l3 3M19.5 7.5l-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="12" cy="14" r="5" stroke="currentColor" strokeWidth="1.3"/></svg>,
                title: 'Sustainable', desc: 'Ethical materials. Minimal impact.',
              },
              {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.3"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.3"/></svg>,
                title: 'Mindful Living', desc: 'Encouraging calm, focus & well-being.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="feature">
                <div className="feature__icon">{icon}</div>
                <div><strong>{title}</strong><p>{desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SHOP CAROUSEL ── */}
        <section className="shop" id="shop">
          <div className="shop__header">
            <div className="section-header">
              <div>
                <p className="eyebrow eyebrow--light">The Collection</p>
                <h2>Shop curated <em>terrariums</em></h2>
              </div>
              <Link href="/gallery" className="link-arrow link-arrow--light">
                View The Series{' '}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>
          <ProductCarousel products={featured} />
        </section>

        {/* ── WORKSHOPS ── */}
        <section className="workshops" id="workshops">
          <div className="workshops__left">
            <p className="eyebrow">Workshops</p>
            <h2>Hands-on.<br />Mindful.<br />Unforgettable.</h2>
            <p>Join our terrarium workshops and create your own living landscape in a relaxed, inspiring environment.</p>
            <Link href="/workshops" className="btn btn--outline">
              Explore workshops{' '}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
          <div className="workshops__right">
            <div className="workshop-cards">
              {workshops.slice(0, 2).map((ws) => (
                <div key={ws.id} className="workshop-card">
                  <div className="workshop-card__img workshop-card__img--1">
                    {ws.image_url ? (
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image src={ws.image_url} alt={ws.title} fill style={{ objectFit: 'cover' }} sizes="400px" />
                      </div>
                    ) : (
                      <div className="workshop-scene">
                        <div className="ws-table" /><div className="ws-person ws-person--1" /><div className="ws-person ws-person--2" /><div className="ws-terrarium" />
                      </div>
                    )}
                  </div>
                  <div className="workshop-card__body">
                    <h4>{ws.title}</h4>
                    <div className="workshop-meta">
                      <span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                        {' '}{ws.duration_minutes} min
                      </span>
                      <span>Up to {ws.max_participants} people</span>
                    </div>
                    <p className="workshop-price">{formatPrice(ws.price)} <span>/ person</span></p>
                    <Link href="/workshops" className="btn btn--dark btn--sm">Book now</Link>
                  </div>
                </div>
              ))}
              {workshops.length === 0 && (
                <>
                  {[
                    { title: 'Terrarium Basics', duration: '2.5 hours', level: 'Beginner', price: '₱4,250' },
                    { title: 'Advanced Design',  duration: '3 hours',   level: 'Intermediate', price: '₱6,250' },
                  ].map((w, i) => (
                    <div key={w.title} className="workshop-card">
                      <div className={`workshop-card__img workshop-card__img--${i + 1}`}>
                        <div className="workshop-scene">
                          <div className="ws-table" /><div className="ws-person ws-person--1" /><div className="ws-person ws-person--2" /><div className="ws-terrarium" />
                        </div>
                      </div>
                      <div className="workshop-card__body">
                        <h4>{w.title}</h4>
                        <div className="workshop-meta"><span>{w.duration}</span><span>{w.level}</span></div>
                        <p className="workshop-price">{w.price} <span>/ person</span></p>
                        <Link href="/workshops" className="btn btn--dark btn--sm">Book now</Link>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── JOURNAL ── */}
        <section className="journal" id="journal">
          <div className="section-header">
            <h2>From the journal</h2>
            <a href="#journal" className="link-arrow">View all <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
          </div>
          <div className="journal-grid">
            <article className="journal-card journal-card--lg">
              <div className="journal-card__img journal-card__img--1" />
              <div className="journal-card__body">
                <span className="journal-tag">Care Guide</span>
                <h3>How to keep your closed terrarium thriving for years</h3>
                <p>A closed terrarium is a self-sustaining ecosystem — here's how to set it up for long-term success.</p>
                <a href="#journal" className="link-arrow small">Read more <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
              </div>
            </article>
            <article className="journal-card">
              <div className="journal-card__img journal-card__img--2" />
              <div className="journal-card__body">
                <span className="journal-tag">Inspiration</span>
                <h3>5 ways terrariums transform your workspace</h3>
                <a href="#journal" className="link-arrow small">Read more <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
              </div>
            </article>
            <article className="journal-card">
              <div className="journal-card__img journal-card__img--3" />
              <div className="journal-card__body">
                <span className="journal-tag">Sustainability</span>
                <h3>Our commitment to ethical sourcing</h3>
                <a href="#journal" className="link-arrow small">Read more <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
              </div>
            </article>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <div className="trust-bar">
          {[
            { title: 'Free shipping',    desc: 'On orders over ₱2,500',    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="11" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M7 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
            { title: 'Secure packaging', desc: 'Plants arrive safe & sound', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6l7-3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
            { title: 'Made to order',    desc: 'Crafted with care',          icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.3"/><path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            { title: 'Support',          desc: "We're here to help",         icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 6h14M4 10h10M4 14h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
          ].map(({ title, desc, icon }) => (
            <div key={title} className="trust-item">
              {icon}
              <div><strong>{title}</strong><p>{desc}</p></div>
            </div>
          ))}
        </div>

      </main>
      <Footer />
    </>
  )
}
