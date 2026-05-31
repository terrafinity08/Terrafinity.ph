'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { uploadImage } from '@/lib/actions/upload'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  bucket?: 'product-images' | 'workshop-images' | 'site-images'
  label?: string
}

export default function ImageUpload({
  value,
  onChange,
  bucket = 'product-images',
  label = 'Product Image',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return
      setUploading(true)
      setError(null)
      const form = new FormData()
      form.append('file', file)
      const result = await uploadImage(form, bucket)
      setUploading(false)
      if (!result.success || !result.data) {
        setError(result.error ?? 'Upload failed')
        return
      }
      onChange(result.data.url)
    },
    [bucket, onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.avif'] },
    maxSize: 8 * 1024 * 1024,
    multiple: false,
  })

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-stone-600 tracking-wide uppercase">{label}</label>

      {value ? (
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 group">
          <Image src={value} alt="Uploaded" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={() => onChange('')}
              className="bg-white text-ink rounded-full p-2 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            'relative w-full aspect-square rounded-2xl border-2 border-dashed cursor-pointer',
            'flex flex-col items-center justify-center gap-3 transition-colors duration-200',
            isDragActive
              ? 'border-ink bg-stone-50'
              : 'border-stone-200 bg-stone-50/50 hover:border-stone-400 hover:bg-stone-50',
            uploading && 'pointer-events-none opacity-60'
          )}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <Loader2 className="h-8 w-8 text-stone-300 animate-spin" />
          ) : isDragActive ? (
            <>
              <Upload className="h-8 w-8 text-ink" />
              <p className="text-sm font-medium text-ink">Drop to upload</p>
            </>
          ) : (
            <>
              <ImageIcon className="h-8 w-8 text-stone-300" />
              <div className="text-center">
                <p className="text-sm font-medium text-stone-600">Drag & drop or click</p>
                <p className="text-xs text-stone-400 mt-1">JPEG, PNG, WebP — max 8 MB</p>
              </div>
            </>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
