import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, Facebook, Youtube, Twitter, Phone, Mail, MapPin, Home as HomeIcon, Newspaper, Calendar, Heart as HeartIcon, MoreHorizontal, ImageIcon as BadgeIcon } from 'lucide-react';

// Import des pages
import { Toaster } from 'sonner';
import Home from './Pages/Home';
import About from './Pages/About';
import Projects from './Pages/Projects';
import Program from './Pages/Program';
import Cantons from './Pages/Cantons';
import Youth from './Pages/Youth';
import News from './Pages/News';
import Gallery from './Pages/Gallery';
import Join from './Pages/Join';
import Contact from './Pages/Contact';
import BadgePage from './Pages/BadgePage';
import Agenda from './Pages/Agenda';
import Donate from './Pages/Donate';

// Import des pages admin
import AdminLogin from './Pages/AdminLogin';
import Admin from './Pages/Admin';
import AdminNews from './Pages/AdminNews';
import AdminSupporters from './Pages/AdminSupporters';
import AdminTestimonials from './Pages/AdminTestimonials';
import AdminPages from './Pages/AdminPages';
import AdminEvents from './Pages/AdminEvents';
import AdminDonations from './Pages/AdminDonations';

// Auth utilities
import { ProtectedRoute } from './utils/auth.jsx';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', page: 'Home', component: <Home /> },
    { name: 'Le Candidat', page: 'About', component: <About /> },
    { name: 'Programme', page: 'Program', component: <Program /> },
    { name: 'Projets', page: 'Projects', component: <Projects /> },
    { name: 'Cantons', page: 'Cantons', component: <Cantons />, hideFromNav: true },
    { name: 'Jeunes & Femmes', page: 'Youth', component: <Youth />, hideFromNav: true },
    { name: 'Actualités', page: 'News', component: <News />, hideFromNav: true },
    { name: 'Galerie', page: 'Gallery', component: <Gallery />, hideFromNav: true },
    { name: 'Agenda', page: 'Agenda', component: <Agenda /> },
    { name: 'Badge', page: 'BadgePage', component: <BadgePage /> },
    { name: 'Faire un Don', page: 'Donate', component: <Donate /> },
    { name: 'Contact', page: 'Contact', component: <Contact /> },
  ];

  const bottomNavItems = [
    { name: 'Accueil', page: 'Home', icon: HomeIcon },
    { name: 'Actualités', page: 'News', icon: Newspaper },
    { name: 'Agenda', page: 'Agenda', icon: Calendar },
    { name: 'Don', page: 'Donate', icon: HeartIcon },
    { name: 'Plus', page: null, icon: MoreHorizontal },
  ];

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <style>{`
          :root {
            --primary: #172554;
            --primary-mid: #1e3a8a;
            --accent: #16a34a;
            --accent-dark: #15803d;
          }
          * { scroll-behavior: smooth; }
        `}</style>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-blue-950 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <Link to={createPageUrl('Home')} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">EF</span>
                </div>
                <div>
                  <div className="text-white font-bold text-base leading-tight">Emmanuel Foka</div>
                  <div className="text-green-400 text-xs font-medium">Commune de Figuil · 2026</div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {navigation.filter(item => !item.hideFromNav).map((item) => (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    className="px-3 py-2 text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-800 rounded-lg transition-all"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* CTA + mobile toggle */}
              <div className="flex items-center space-x-3">
                <Link
                  to={createPageUrl('Join')}
                  className="hidden md:inline-flex items-center px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-lg transition-all"
                >
                  Rejoindre
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation (lg–xl only, dropdown in header) */}
            {mobileMenuOpen && (
              <div className="lg:hidden pb-4 border-t border-blue-800 pt-4">
                <div className="flex flex-col space-y-1">
                  {navigation.filter(item => !item.hideFromNav).map((item) => (
                    <Link
                      key={item.page}
                      to={createPageUrl(item.page)}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 text-sm font-medium text-blue-100 hover:text-white hover:bg-blue-800 rounded-lg transition-all"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    to={createPageUrl('Join')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-lg text-center transition-all"
                  >
                    Rejoindre le Mouvement
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </header>

        {/* Main Content */}
        <main className="pb-20 lg:pb-0">
          <Routes>
            {navigation.map((item) => (
              <Route key={item.page} path={createPageUrl(item.page)} element={item.component} />
            ))}
            <Route path={createPageUrl('Join')} element={<Join />} />
            
            {/* Admin Login */}
            <Route path="/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route path={createPageUrl('Admin')} element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path={createPageUrl('AdminNews')} element={<ProtectedRoute><AdminNews /></ProtectedRoute>} />
            <Route path={createPageUrl('AdminSupporters')} element={<ProtectedRoute><AdminSupporters /></ProtectedRoute>} />
            <Route path={createPageUrl('AdminTestimonials')} element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
            <Route path={createPageUrl('AdminPages')} element={<ProtectedRoute requiredRole="admin"><AdminPages /></ProtectedRoute>} />
            <Route path={createPageUrl('AdminEvents')} element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
            <Route path={createPageUrl('AdminDonations')} element={<ProtectedRoute requiredRole="admin"><AdminDonations /></ProtectedRoute>} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        {/* ── Mobile Bottom Navigation ───────────────────────── */}
        <nav
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-blue-950 border-t border-blue-800"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex items-center justify-around px-1 py-1">
            {bottomNavItems.map((item) => {
              if (item.page === null) {
                return (
                  <button
                    key="plus"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all min-w-[52px] ${
                      mobileMenuOpen ? 'text-green-400' : 'text-blue-300'
                    }`}
                  >
                    <MoreHorizontal className="w-5 h-5" />
                    <span className="text-[10px] font-semibold leading-none">Plus</span>
                  </button>
                );
              }
              return (
                <NavLink
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all min-w-[52px] ${
                      isActive ? 'text-green-400' : 'text-blue-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-green-400' : ''}`} />
                      <span className="text-[10px] font-semibold leading-none">{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* ── Mobile Full Menu Overlay (bottom sheet) ─────────── */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="absolute bottom-[68px] left-0 right-0 bg-blue-950 rounded-t-3xl border-t border-blue-800 p-5"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-blue-700 rounded-full mx-auto mb-5" />
              <div className="grid grid-cols-2 gap-3">
                {navigation.filter(item => !item.hideFromNav).map((item) => (
                  <NavLink
                    key={item.page}
                    to={createPageUrl(item.page)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-4 rounded-xl font-semibold text-sm transition-all ${
                        isActive ? 'bg-green-600 text-white' : 'bg-blue-800/70 text-blue-100 hover:bg-blue-700'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <NavLink
                to={createPageUrl('Join')}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 flex items-center justify-center p-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all"
              >
                Rejoindre le Mouvement
              </NavLink>
            </div>
          </div>
        )}

        <Toaster richColors position="top-right" />

        {/* Footer */}
        <footer className="bg-blue-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* IdentitÃ© */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">EF</span>
                  </div>
                  <span className="text-white font-bold text-base">Emmanuel Foka</span>
                </div>
                <p className="text-blue-200 text-sm leading-relaxed mb-5">
                  Candidat à la mairie de Figuil 2026.<br />
                  Bâtissons ensemble notre commune de demain.
                </p>
                <div className="flex space-x-2">
                  <a href="#" className="w-9 h-9 bg-blue-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 bg-blue-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all">
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 bg-blue-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Navigation */}
              <div>
                <h3 className="font-bold text-white mb-4 text-xs uppercase tracking-widest">Navigation</h3>
                <ul className="space-y-2">
                  {navigation.slice(0, 4).map(item => (
                    <li key={item.page}>
                      <Link to={createPageUrl(item.page)} className="text-blue-200 hover:text-green-400 text-sm transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Liens utiles */}
              <div>
                <h3 className="font-bold text-white mb-4 text-xs uppercase tracking-widest">Liens Utiles</h3>
                <ul className="space-y-2">
                  {[
                    { name: 'Actualités', page: 'News' },
                    { name: 'Galeries', page: 'Gallery' },
                    { name: 'Cantons', page: 'Cantons' },
                    { name: 'Jeunes & Femmes', page: 'Youth' },
                  ].map(item => (
                    <li key={item.page}>
                      <Link to={createPageUrl(item.page)} className="text-blue-200 hover:text-green-400 text-sm transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="font-bold text-white mb-4 text-xs uppercase tracking-widest">Contact</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-blue-200">
                    <MapPin className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Figuil, Région du Nord, Cameroun</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-blue-200">
                    <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>+237 6XX XXX XXX</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-blue-200">
                    <Mail className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>contact@foka-figuil.cm</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-blue-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-blue-300 text-sm">
                © 2026 Emmanuel Foka — Campagne Municipale Figuil. Tous droits réservés.
              </p>
              <p className="text-blue-400 text-xs italic">
                De la pierre au progrès : Bâtissons Figuil Ensemble
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}