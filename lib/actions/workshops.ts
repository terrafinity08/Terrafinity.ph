'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Workshop, WorkshopDate, WorkshopFormData, ActionResult } from '@/lib/types'

export async function getWorkshops(activeOnly = false): Promise<Workshop[]> {
  try {
    const supabase = createAdminClient()
    let query = supabase
      .from('workshops')
      .select('*, dates:workshop_dates(*)')
      .order('created_at', { ascending: false })
    if (activeOnly) query = query.eq('active', true)
    const { data, error } = await query
    if (error) { console.error('getWorkshops:', error.message); return [] }
    return (data ?? []) as Workshop[]
  } catch (e) {
    console.error('getWorkshops error:', e)
    return []
  }
}

export async function getWorkshopBySlug(slug: string): Promise<Workshop | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('workshops')
    .select('*, dates:workshop_dates(*)')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data as Workshop
}

export async function createWorkshop(
  formData: WorkshopFormData
): Promise<ActionResult<Workshop>> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('workshops')
    .insert(formData)
    .select('*, dates:workshop_dates(*)')
    .single()
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/workshops')
  revalidatePath('/workshops')
  return { success: true, data: data as Workshop }
}

export async function updateWorkshop(
  id: string,
  formData: Partial<WorkshopFormData>
): Promise<ActionResult<Workshop>> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('workshops')
    .update(formData)
    .eq('id', id)
    .select('*, dates:workshop_dates(*)')
    .single()
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/workshops')
  revalidatePath('/workshops')
  return { success: true, data: data as Workshop }
}

export async function deleteWorkshop(id: string): Promise<ActionResult> {
  const supabase = createAdminClient()
  const { error } = await supabase.from('workshops').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/workshops')
  revalidatePath('/workshops')
  return { success: true }
}

export async function addWorkshopDate(
  workshopId: string,
  date: string,
  startTime: string,
  endTime: string,
  spotsTotal: number
): Promise<ActionResult<WorkshopDate>> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('workshop_dates')
    .insert({
      workshop_id: workshopId,
      date,
      start_time: startTime,
      end_time: endTime,
      spots_total: spotsTotal,
    })
    .select()
    .single()
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/workshops')
  revalidatePath('/workshops')
  return { success: true, data: data as WorkshopDate }
}

export async function deleteWorkshopDate(dateId: string): Promise<ActionResult> {
  const supabase = createAdminClient()
  const { error } = await supabase.from('workshop_dates').delete().eq('id', dateId)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/workshops')
  return { success: true }
}
