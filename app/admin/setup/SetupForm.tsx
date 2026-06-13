'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { setupAdminAccount } from './actions'

const OWNER_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? 'terrafinity.ph@gmail.com'

export default function SetupForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  function handleSubmit() {
    setError(null)
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }

    startTransition(async () => {
      const result = await setupAdminAccount(password)
      if (!result.success) { setError(result.error ?? 'Setup failed'); return }
      setDone(true)
      setTimeout(() => router.push('/admin/login'), 2000)
    })
  }

  if (done) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(109,184,126,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 14l6 6 10-10" stroke="#6db87e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <p style={{ color: 'var(--white)', fontSize: '1.1rem', fontWeight: 600 }}>Account created!</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Redirecting to login…</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      <div>
        <label style={lbl}>Email</label>
        <div style={{ ...inp, color: 'rgba(255,255,255,0.35)', cursor: 'not-allowed', userSelect: 'none' }}>
          {OWNER_EMAIL}
        </div>
      </div>
      <div>
        <label style={lbl}>Create password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="At least 8 characters"
          style={inp}
        />
      </div>
      <div>
        <label style={lbl}>Confirm password</label>
        <input
          type="password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Repeat your password"
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
        style={{ background: 'var(--white)', color: 'var(--black)', border: 'none', borderRadius: '12px', padding: '0.9rem', fontWeight: 700, fontSize: '0.9rem', cursor: isPending ? 'wait' : 'pointer', opacity: isPending ? 0.7 : 1, marginTop: '0.25rem' }}
      >
        {isPending ? 'Creating account…' : 'Create my admin account'}
      </button>
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
