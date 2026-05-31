'use client'

export default function SiteError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0B0B0B', color: '#F5F5F2', textAlign: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong</h1>
      <p style={{ color: '#9a9a8e', marginBottom: '2rem', maxWidth: '400px' }}>We hit an unexpected error. Please try refreshing the page.</p>
      <button
        onClick={reset}
        style={{ background: '#F5F5F2', color: '#0B0B0B', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
      >
        Try again
      </button>
    </div>
  )
}
