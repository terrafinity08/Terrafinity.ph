import { Suspense } from 'react'
import LoginForm from './LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Login' }

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
