'use client'

import Link from 'next/link'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function CreatePage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '', style: '', size: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="hv2" id="create-hero" style={{ minHeight: '55vh' }}>
          <div className="hv2-forest" aria-hidden="true">
            <div className="hv2-sky" />
            <div className="hv2-mist hv2-mist--1" />
            <div className="hv2-mist hv2-mist--2" />
            <div className="hv2-ground" />
          </div>
          <div className="hv2-overlay" />
          <div className="hv2-content" style={{ textAlign: 'center' }}>
            <p className="hv2-eyebrow">Custom Orders</p>
            <h1 className="hv2-h1">Create <em>Your Own</em></h1>
            <p className="hv2-sub">Design a one-of-a-kind terrarium built to your vision — your style, your space, your story.</p>
          </div>
        </section>

        {/* How it works */}
        <section className="tf-about">
          <div className="tf-about__inner" style={{ flexDirection: 'column', maxWidth: '720px', margin: '0 auto', gap: '3rem' }}>
            <div style={{ textAlign: 'center' }}>
              <p className="eyebrow">How It Works</p>
              <h2>Your <em>custom terrarium</em>, step by step</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', width: '100%' }}>
              {[
                { step: '01', title: 'Tell us your vision', desc: 'Fill in the form below — size, style, and what you have in mind.' },
                { step: '02', title: 'We design it for you', desc: 'Our team creates a concept tailored to your space and preferences.' },
                { step: '03', title: 'We build it by hand', desc: 'Your terrarium is crafted and ready within 2–3 weeks.' },
                { step: '04', title: 'Delivered to your door', desc: 'Safely packed and shipped anywhere in the Philippines.' },
              ].map(({ step, title, desc }) => (
                <div key={step} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--green-mid)', opacity: 0.5, lineHeight: 1 }}>{step}</span>
                  <strong style={{ color: 'var(--black)', fontSize: '0.9rem' }}>{title}</strong>
                  <p style={{ color: 'var(--stone)', fontSize: '0.85rem', lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry form */}
        <section style={{ background: 'var(--black)', padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', color: 'var(--white)' }}>
                <h2 style={{ marginBottom: '1rem' }}>Thank you! <em>We&apos;ll be in touch.</em></h2>
                <p style={{ color: 'var(--stone)', marginBottom: '2rem' }}>We&apos;ll reply to your email within 1–2 business days with next steps.</p>
                <Link href="/gallery" className="btn btn--outline">Browse the collection</Link>
              </div>
            ) : (
              <>
                <p className="eyebrow" style={{ color: 'var(--green-mid)' }}>Custom Order Inquiry</p>
                <h2 style={{ color: 'var(--white)', marginBottom: '2rem' }}>Tell us about <em>your vision</em></h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <input
                    name="name" type="text" placeholder="Your name" required
                    value={form.name} onChange={handleChange}
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '0.85rem 1rem', color: 'var(--white)', fontSize: '0.9rem', outline: 'none' }}
                  />
                  <input
                    name="email" type="email" placeholder="Email address" required
                    value={form.email} onChange={handleChange}
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '0.85rem 1rem', color: 'var(--white)', fontSize: '0.9rem', outline: 'none' }}
                  />
                  <select
                    name="size"
                    value={form.size} onChange={handleChange}
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '0.85rem 1rem', color: form.size ? 'var(--white)' : 'rgba(255,255,255,0.4)', fontSize: '0.9rem', outline: 'none' }}
                  >
                    <option value="">Select a size</option>
                    <option value="small">Small — Desk / shelf piece</option>
                    <option value="medium">Medium — Statement piece</option>
                    <option value="large">Large — Floor or centerpiece</option>
                    <option value="set">Set of terrariums</option>
                  </select>
                  <textarea
                    name="message" placeholder="Describe your vision — style, plants, colours, occasion, or anything else" rows={5} required
                    value={form.message} onChange={handleChange}
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '0.85rem 1rem', color: 'var(--white)', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                  />
                  <button type="submit" className="btn btn--dark" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
                    Send inquiry
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: '0.5rem' }}><path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </form>
              </>
            )}
          </div>
        </section>

        {/* Trust */}
        <div className="trust-bar">
          {[
            { title: 'Free consultation', desc: 'We help you figure out what suits your space.', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 6h14M4 10h10M4 14h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
            { title: '2–3 week build time', desc: 'Handcrafted to your specs.', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.3"/><path d="M11 7v4l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
            { title: 'Ships nationwide', desc: 'Safe and secure delivery across PH.', icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="11" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M7 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
            { title: 'Lifetime support', desc: "Questions after delivery? We're here.", icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.3"/><path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
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
