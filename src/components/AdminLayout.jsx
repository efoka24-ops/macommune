import React from 'react';
import { useAuth, logout } from '@/utils/auth.jsx';
import { Button } from '@/components/ui/button';
import { LogOut, User, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLayout({ children, title }) {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">{title || 'Dashboard'}</h1>
            <p className="text-sm text-gray-500">Emmanuel Foka Campaign</p>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-lg">
              <User size={18} className="text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">{user?.full_name}</p>
                <p className="text-xs text-blue-600 capitalize">{user?.role}</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden border-t px-4 py-4 space-y-3"
          >
            <div className="flex items-center gap-3 px-3 py-2 bg-blue-50 rounded">
              <User size={16} className="text-blue-600" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">{user?.full_name}</p>
                <p className="text-xs text-blue-600 capitalize">{user?.role}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="w-full flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
