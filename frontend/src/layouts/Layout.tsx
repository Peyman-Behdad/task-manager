import { useAuthStore } from '../store/auth.store'
import { useLogout } from '../hooks/useAuth'
import { LogOut } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user)
  const logout = useLogout()

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* نوار بالا */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">مدیریت وظایف</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">سلام، {user?.name}</span>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 transition text-sm font-medium"
            >
              <LogOut size={18} />
              خروج
            </button>
          </div>
        </div>
      </nav>
      
      {/* محتوای اصلی */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}