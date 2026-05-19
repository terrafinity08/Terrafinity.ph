import AdminNav from '@/components/admin/AdminNav'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNav />
      {/* Mobile: offset for top bar; Desktop: offset for sidebar */}
      <div className="pt-14 md:pt-0 md:ml-64">
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
