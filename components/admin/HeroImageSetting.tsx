'use client'

import { useState, useTransition } from 'react'
import { CheckCircle2 } from 'lucide-react'
import ImageUpload from './ImageUpload'
import { setSetting } from '@/lib/actions/settings'

interface HeroImageSettingProps {
  currentUrl: string | null
}

export default function HeroImageSetting({ currentUrl }: HeroImageSettingProps) {
  const [url, setUrl] = useState(currentUrl ?? '')
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleImageChange(newUrl: string) {
    setUrl(newUrl)
    setSaved(false)
    setError(null)
  }

  function handleSave() {
    setError(null)
    setSaved(false)
    startTransition(async () => {
      const result = await setSetting('hero_image_url', url)
      if (!result.success) { setError(result.error ?? 'Failed to save'); return }
      setSaved(true)
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-5">
      <div>
        <h2 className="font-semibold text-stone-800">Hero Background Photo</h2>
        <p className="text-sm text-stone-400 mt-1">
          The full-screen photo behind the headline on the homepage. Upload your fern or nature photo here.
        </p>
      </div>

      <div className="max-w-sm">
        <ImageUpload
          label="Hero Image"
          value={url}
          onChange={handleImageChange}
          bucket="site-images"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
      )}

      {saved && (
        <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          Saved — homepage hero updated.
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={isPending || !url}
        className="self-start inline-flex items-center gap-2 bg-ink text-canvas text-sm font-medium px-5 py-2.5 rounded-full hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isPending ? 'Saving…' : 'Apply hero image'}
      </button>
    </div>
  )
}
