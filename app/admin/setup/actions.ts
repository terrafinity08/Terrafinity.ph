'use server'

import { createAdminClient } from '@/lib/supabase/admin'

const OWNER_EMAIL = process.env.ADMIN_EMAIL ?? 'terrafinity.ph@gmail.com'

export async function isSetupNeeded(): Promise<boolean> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.auth.admin.listUsers()
    if (error) return true
    return !data.users.some(u => u.email === OWNER_EMAIL)
  } catch {
    return true
  }
}

export async function setupAdminAccount(
  password: string
): Promise<{ success: boolean; error?: string }> {
  if (password.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters' }
  }

  try {
    const supabase = createAdminClient()

    // Check if the owner account already exists
    const { data: listData } = await supabase.auth.admin.listUsers()
    const existing = listData?.users.find(u => u.email === OWNER_EMAIL)

    if (existing) {
      // Update the existing account's password
      const { error } = await supabase.auth.admin.updateUserById(existing.id, { password })
      if (error) return { success: false, error: error.message }
    } else {
      // Create brand new account — skip email confirmation
      const { error } = await supabase.auth.admin.createUser({
        email: OWNER_EMAIL,
        password,
        email_confirm: true,
      })
      if (error) return { success: false, error: error.message }
    }

    return { success: true }
  } catch (e) {
    return { success: false, error: String(e) }
  }
}
