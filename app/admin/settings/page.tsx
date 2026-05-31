import { getSetting } from '@/lib/actions/settings'
import HeroImageSetting from '@/components/admin/HeroImageSetting'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Settings' }
export const dynamic = 'force-dynamic'

export default async function AdminSettingsPage() {
  const heroUrl = await getSetting('hero_image_url')

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-ink">Settings</h1>
        <p className="text-stone-500 text-sm mt-1">Control your site appearance and content.</p>
      </div>

      <HeroImageSetting currentUrl={heroUrl} />
    </div>
  )
}
