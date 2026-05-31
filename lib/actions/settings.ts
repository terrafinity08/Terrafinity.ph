'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import type { ActionResult } from '@/lib/types'

export async function getSetting(key: string): Promise<string | null> {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .single()
    return data?.value ?? null
  } catch {
    return null
  }
}

export async function setSetting(key: string, value: string): Promise<ActionResult> {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value, updated_at: new Date().toISOString() })
    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    revalidatePath('/admin/settings')
    return { success: true }
  } catch (e: unknown) {
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' }
  }
}
