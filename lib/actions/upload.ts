'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import type { ActionResult } from '@/lib/types'

export async function uploadImage(
  formData: FormData,
  bucket: 'product-images' | 'workshop-images'
): Promise<ActionResult<{ url: string; path: string }>> {
  const file = formData.get('file') as File | null
  if (!file) return { success: false, error: 'No file provided' }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
  if (!allowedTypes.includes(file.type)) {
    return { success: false, error: 'Only JPEG, PNG, WebP, and AVIF images are supported.' }
  }
  if (file.size > 8 * 1024 * 1024) {
    return { success: false, error: 'File size must be under 8 MB.' }
  }

  const supabase = createAdminClient()
  const ext = file.name.split('.').pop() ?? 'jpg'
  const timestamp = Date.now()
  const random = Math.random().toString(36).slice(2, 8)
  const path = `${timestamp}-${random}.${ext}`

  const arrayBuffer = await file.arrayBuffer()
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) return { success: false, error: error.message }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return { success: true, data: { url: publicUrl, path } }
}

export async function deleteImage(
  path: string,
  bucket: 'product-images' | 'workshop-images'
): Promise<ActionResult> {
  const supabase = createAdminClient()
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) return { success: false, error: error.message }
  return { success: true }
}
