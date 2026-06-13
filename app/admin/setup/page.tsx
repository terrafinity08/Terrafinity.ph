import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { isSetupNeeded } from './actions'
import SetupForm from './SetupForm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Terrafinity — Admin Setup' }

export default async function SetupPage() {
  const needed = await isSetupNeeded()

  // Account already exists — go to login
  if (!needed) redirect('/admin/login')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '360px' }}>

        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C8 3 5 7 6 11c1 4 6 6 9 3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 21V11" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p style={{ color: 'var(--white)', fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700 }}>Terrafinity</p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '0.25rem' }}>First-time setup</p>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '2rem' }}>
          <h1 style={{ color: 'var(--white)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Create your admin account</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.84rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            This creates the one account that controls your entire web store. Keep your password safe — only you will ever be able to log in.
          </p>
          <Suspense>
            <SetupForm />
          </Suspense>
        </div>

      </div>
    </div>
  )
}
