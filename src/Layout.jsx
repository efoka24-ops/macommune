import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, Facebook, Youtube, Phone, Mail } from 'lucide-react';
import Button from './components/Button';

// Import des pages
import Home from './Pages/Home';
import About from './Pages/About';
import Projects from './Pages/Projects';
import Program from './Pages/Program';
import Cantons from './Pages/Cantons';
import Youth from './Pages/Youth';
import News from './Pages/News';
import Gallery from './Pages/Gallery';
import Join from './Pages/Join';

// Import des pages admin
import Admin from './Pages/Admin';
import AdminNews from './Pages/AdminNews';
import AdminSupporters from './Pages/AdminSupporters';
import AdminTestimonials from './Pages/AdminTestimonials';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', page: 'Home', component: <Home /> },
    { name: 'Qui suis-je', page: 'About', component: <About /> },
    { name: 'Projets Signatures', page: 'Projects', component: <Projects /> },
    { name: 'Programme', page: 'Program', component: <Program /> },
    { name: 'Les 5 Cantons', page: 'Cantons', component: <Cantons /> },
    { name: 'Jeunes & Femmes', page: 'Youth', component: <Youth /> },
    { name: 'Actualités', page: 'News', component: <News /> },
    { name: 'Galerie', page: 'Gallery', component: <Gallery /> },
  ];

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <style>{`
          :root {
            --primary: #1e3a8a;
            --primary-dark: #1e40af;
            --accent: #f59e0b;
            --accent-dark: #d97706;
          }
        `}</style>

        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Link to={createPageUrl('Home')} className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-white font-bold text-xl">EF</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-xl font-bold text-gray-900">Emmanuel Foka</div>
                  <div className="text-xs text-amber-600 font-medium">Construisons Figuil Ensemble</div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="hidden lg:flex items-center space-x-3">
                <Link to={createPageUrl('Join')}>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-lg">
                    Rejoindre
                  </Button>
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="lg:hidden py-4 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.page}
                      to={createPageUrl(item.page)}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-medium transition-all text-gray-700 hover:bg-blue-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link to={createPageUrl('Join')} onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold mt-3">
                      Rejoindre le Mouvement
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </header>

        {/* Main Content */}
        <main>
          <Routes>
            {navigation.map((item) => (
              <Route
                key={item.page}
                path={createPageUrl(item.page)}
                element={item.component}
              />
            ))}
            <Route
              path={createPageUrl('Join')}
              element={<Join />}
            />
            {/* Routes Admin */}
            <Route path={createPageUrl('Admin')} element={<Admin />} />
            <Route path={createPageUrl('AdminNews')} element={<AdminNews />} />
            <Route path={createPageUrl('AdminSupporters')} element={<AdminSupporters />} />
            <Route path={createPageUrl('AdminTestimonials')} element={<AdminTestimonials />} />
            {/* Route par défaut */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* About */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-amber-400">Emmanuel Foka</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Candidat à la mairie de Figuil 2026. 
                  De la pierre au progrès : bâtissons Figuil ensemble.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-amber-400">Navigation</h3>
                <ul className="space-y-2 text-sm">
                  {navigation.slice(1, 5).map((item) => (
                    <li key={item.page}>
                      <Link 
                        to={createPageUrl(item.page)} 
                        className="text-gray-300 hover:text-amber-400 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Les 5 Cantons */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-amber-400">Nos Cantons</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Canton de Figuil</li>
                  <li>Canton de Lam</li>
                  <li>Canton de Biou</li>
                  <li>Canton Bidzar I</li>
                  <li>Canton Bidzar II</li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-amber-400">Contact</h3>
                <div className="space-y-3 text-sm">
                  <a href="tel:+237" className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>+237 XXX XXX XXX</span>
                  </a>
                  <a href="mailto:contact@emmanuelfoka.cm" className="flex items-center space-x-2 text-gray-300 hover:text-amber-400 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>contact@emmanuelfoka.cm</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © 2026 Emmanuel Foka - Campagne Municipale Figuil. Tous droits réservés.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}