'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'Do I need any experience?',
    a: 'None at all. Our workshops are designed for complete beginners — we guide you through every step. All you need is curiosity and a willingness to get your hands a little dirty.',
  },
  {
    q: 'What is included in the workshop fee?',
    a: 'Everything. Your glass vessel, substrate, plants, moss, driftwood, tools, expert guidance, and a fully finished terrarium to take home. No hidden costs.',
  },
  {
    q: 'How many people are in each session?',
    a: 'We keep groups small — maximum 12 participants — so every person gets individual attention and the session stays relaxed and unhurried.',
  },
  {
    q: 'Can I bring my own materials?',
    a: 'You can bring personal touches like small figurines or stones, but we provide all the core materials. We want your build to thrive long-term, and that starts with the right substrate and plants.',
  },
  {
    q: 'How long does the workshop run?',
    a: 'Most workshops run 2–3 hours. We don\'t rush anyone out the door — the session ends when everyone is happy with their piece.',
  },
  {
    q: 'Can I book a private session for a group?',
    a: 'Yes — private sessions are available for birthdays, team events, hen parties, or any gathering. Use the "Create your own" page to send us an enquiry and we\'ll arrange everything.',
  },
  {
    q: 'How do I care for my terrarium after the workshop?',
    a: 'We cover care basics during the session, and every participant leaves with a care card. The short version: indirect light, mist lightly every 2–4 weeks, and enjoy watching it grow.',
  },
]

export default function WorkshopsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ background: '#f7f4ef', padding: '5rem 2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="eyebrow">FAQ</p>
          <h2>Common <em>questions</em></h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                  padding: '1.25rem 0', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', gap: '1rem', textAlign: 'left',
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--black)', lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ flexShrink: 0, width: '24px', height: '24px', borderRadius: '50%', background: open === i ? 'var(--black)' : 'rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}>
                    <path d="M2 3.5l3 3 3-3" stroke={open === i ? '#fff' : '#666'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              {open === i && (
                <p style={{ color: 'var(--stone)', fontSize: '0.9rem', lineHeight: 1.7, paddingBottom: '1.25rem', paddingRight: '2rem' }}>{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
