'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import type { WorkshopBooking, BookingFormData, ActionResult } from '@/lib/types'

export async function createBooking(
  formData: BookingFormData,
  totalPrice: number
): Promise<ActionResult<WorkshopBooking>> {
  const supabase = createAdminClient()

  // Verify spots are available
  if (formData.workshop_date_id) {
    const { data: dateData, error: dateError } = await supabase
      .from('workshop_dates')
      .select('spots_total, spots_booked')
      .eq('id', formData.workshop_date_id)
      .single()
    if (dateError) return { success: false, error: 'Date not found' }
    const spotsLeft = dateData.spots_total - dateData.spots_booked
    if (spotsLeft < formData.qty) {
      return { success: false, error: `Only ${spotsLeft} spot(s) remaining for this date.` }
    }
  }

  const { data, error } = await supabase
    .from('workshop_bookings')
    .insert({
      workshop_id: formData.workshop_id,
      workshop_date_id: formData.workshop_date_id || null,
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone || null,
      qty: formData.qty,
      total_price: totalPrice,
      notes: formData.notes || null,
    })
    .select('*, workshop:workshops(*), workshop_date:workshop_dates(*)')
    .single()

  if (error) return { success: false, error: error.message }

  // Increment spots_booked
  if (formData.workshop_date_id) {
    await supabase.rpc('increment_spots_booked', {
      date_id: formData.workshop_date_id,
      qty: formData.qty,
    })
  }

  revalidatePath('/admin/bookings')
  return { success: true, data: data as WorkshopBooking }
}

export async function getBookings(workshopId?: string): Promise<WorkshopBooking[]> {
  try {
    const supabase = createAdminClient()
    let query = supabase
      .from('workshop_bookings')
      .select('*, workshop:workshops(title,slug), workshop_date:workshop_dates(date,start_time)')
      .order('created_at', { ascending: false })
    if (workshopId) query = query.eq('workshop_id', workshopId)
    const { data, error } = await query
    if (error) { console.error('getBookings:', error.message); return [] }
    return (data ?? []) as WorkshopBooking[]
  } catch (e) {
    console.error('getBookings error:', e)
    return []
  }
}

export async function updateBookingStatus(
  id: string,
  status: WorkshopBooking['status']
): Promise<ActionResult> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('workshop_bookings')
    .update({ status })
    .eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/bookings')
  return { success: true }
}
