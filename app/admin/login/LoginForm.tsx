'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') ?? '/admin'
  const urlError   = searchParams.get('error')

  const [isPending, startTransition] = useTransition()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState<string | null>(null)

  function handleSubmit() {
    setError(null)
    if (!email || !password) { setError('Email and password required'); return }
    startTransition(async () => {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) { setError('Invalid credentials. Check your email and password.'); return }
      router.push(redirectTo)
      router.refresh()
    })
  }

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
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '0.25rem' }}>Admin Studio</p>
        </div>

        {/* Unauthorized banner */}
        {urlError === 'unauthorized' && (
          <div style={{ background: 'rgba(220,50,50,0.1)', border: '1px solid rgba(220,50,50,0.25)', borderRadius: '12px', padding: '0.9rem 1rem', marginBottom: '1.25rem', color: '#ff8080', fontSize: '0.84rem', lineHeight: 1.5 }}>
            Access denied. This admin panel belongs to one account only.
          </div>
        )}

        {/* Form card */}
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

          <div>
            <label style={lbl}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="terrafinity.ph@gmail.com"
              style={inp}
            />
          </div>

          <div>
            <label style={lbl}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="••••••••"
              style={inp}
            />
          </div>

          {error && (
            <div style={{ background: 'rgba(220,50,50,0.12)', border: '1px solid rgba(220,50,50,0.3)', borderRadius: '10px', padding: '0.75rem 1rem', color: '#ff8080', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isPending}
            style={{ background: 'var(--white)', color: 'var(--black)', border: 'none', borderRadius: '12px', padding: '0.9rem', fontWeight: 700, fontSize: '0.9rem', cursor: isPending ? 'wait' : 'pointer', opacity: isPending ? 0.7 : 1, marginTop: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            {isPending && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
            {isPending ? 'Signing in…' : 'Sign in'}
          </button>
        </div>

        {/* First-time setup link */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
          First time here?{' '}
          <Link href="/admin/setup" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'underline' }}>
            Create your account →
          </Link>
        </p>

      </div>
    </div>
  )
}

const lbl: React.CSSProperties = {
  display: 'block', fontSize: '0.7rem', letterSpacing: '0.12em',
  textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.4rem',
}

const inp: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '10px', padding: '0.8rem 1rem', color: 'var(--white)', fontSize: '0.9rem',
  outline: 'none', boxSizing: 'border-box',
}
