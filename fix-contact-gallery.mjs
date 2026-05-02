import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pages = join(__dirname, 'src', 'Pages');

writeFileSync(join(pages, 'Contact.jsx'), `import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Youtube, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const contacts = [
  { icon: Phone, title: 'Téléphone', lines: ['+237 6XX XXX XXX', '+237 6XX XXX XXX'], bg: 'bg-green-50', ic: 'text-green-600' },
  { icon: Mail, title: 'Email', lines: ['contact@foka-figuil.cm', 'campagne@foka-figuil.cm'], bg: 'bg-blue-50', ic: 'text-blue-600' },
  { icon: MapPin, title: 'Quartier général', lines: ['Figuil Centre', 'Département du Mayo-Louti, Cameroun'], bg: 'bg-green-50', ic: 'text-green-600' },
  { icon: Clock, title: "Heures d'ouverture", lines: ['Lun – Sam : 8h00 – 18h00', 'Dimanche : sur rendez-vous'], bg: 'bg-blue-50', ic: 'text-blue-600' },
];

const socials = [
  { icon: Facebook, label: 'Facebook', href: '#', hoverClass: 'hover:text-blue-600' },
  { icon: Youtube, label: 'YouTube', href: '#', hoverClass: 'hover:text-red-600' },
  { icon: Twitter, label: 'Twitter / X', href: '#', hoverClass: 'hover:text-slate-800' },
];

const cantons = [
  { name: 'Figuil', phone: '+237 6XX XXX XXX' },
  { name: 'Lam', phone: '+237 6XX XXX XXX' },
  { name: 'Biou', phone: '+237 6XX XXX XXX' },
  { name: 'Bidzar I', phone: '+237 6XX XXX XXX' },
  { name: 'Bidzar II', phone: '+237 6XX XXX XXX' },
];

export default function Contact() {
  return (
    <div className="min-h-screen">
      <section className="bg-blue-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" /> Prenons contact
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Nous Contacter</h1>
            <p className="text-blue-200 text-xl max-w-2xl mx-auto">
              Une question, une suggestion, ou vous souhaitez nous rencontrer ? Nous sommes à votre écoute.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contacts.map(({ icon: Icon, title, lines, bg, ic }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 hover:shadow-lg transition-all">
                <div className={"w-14 h-14 rounded-2xl flex items-center justify-center mb-5 " + bg + " " + ic}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-blue-950 text-lg mb-2">{title}</h3>
                {lines.map((l, j) => <p key={j} className="text-slate-500 text-sm">{l}</p>)}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Représentants cantonaux</span>
              <h2 className="text-3xl font-extrabold text-blue-950 mt-2 mb-8">Contacts par canton</h2>
              <div className="space-y-4">
                {cantons.map((c, i) => (
                  <div key={i} className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-950 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {c.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-semibold text-slate-800">Canton de {c.name}</span>
                    </div>
                    <a href={"tel:" + c.phone.replace(/\\s/g, '')}
                      className="flex items-center gap-2 text-green-600 font-semibold text-sm hover:text-green-700">
                      <Phone className="w-4 h-4" />{c.phone}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Réseaux sociaux</span>
              <h2 className="text-3xl font-extrabold text-blue-950 mt-2 mb-8">Suivez la campagne</h2>
              <div className="space-y-4">
                {socials.map(({ icon: Icon, label, href, hoverClass }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                    className={"flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all group text-slate-600 " + hoverClass}>
                    <Icon className="w-8 h-8 flex-shrink-0 transition-colors" />
                    <div>
                      <div className="font-bold text-slate-900">{label}</div>
                      <div className="text-sm text-slate-500">@fokafiguil</div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-8 bg-blue-950 rounded-2xl p-8 text-white">
                <h3 className="font-extrabold text-xl mb-2">Rejoignez le mouvement !</h3>
                <p className="text-blue-200 text-sm mb-5">Inscrivez-vous comme sympathisant et recevez toutes nos actualités.</p>
                <a href="/join" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
                  S'inscrire maintenant
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
`, 'utf8');
console.log('Contact.jsx ✓');

writeFileSync(join(pages, 'Gallery.jsx'), `import React, { useState } from 'react';
import { Image as ImageIcon, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('tous');

  const images = [
    { url: '/images/foka-portrait.jpg', title: 'Portrait officiel du candidat', canton: 'figuil', category: 'reunion' },
    { url: '/images/foka-debout-1.jpg', title: "Emmanuel FOKA lors d'une réunion de campagne", canton: 'figuil', category: 'reunion' },
    { url: '/images/foka-doigt-1.jpg', title: 'Message aux habitants de la commune', canton: 'figuil', category: 'terrain' },
    { url: '/images/foka-reflexion.jpg', title: 'Réflexion sur les projets de la commune', canton: 'figuil', category: 'terrain' },
    { url: '/images/foka-doigt-2.jpg', title: "Prise de parole lors d'un meeting", canton: 'tous', category: 'reunion' },
    { url: '/images/foka-debout-2.jpg', title: 'Rencontre avec les sympathisants', canton: 'figuil', category: 'terrain' },
  ];

  const filters = [
    { value: 'tous', label: 'Toutes les photos' },
    { value: 'terrain', label: 'Sur le terrain' },
    { value: 'reunion', label: 'Réunions' },
    { value: 'projet', label: 'Projets' },
    { value: 'formation', label: 'Formations' },
  ];

  const filtered = filter === 'tous' ? images : images.filter(i => i.category === filter);

  return (
    <div className="min-h-screen">
      <section className="bg-blue-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <ImageIcon className="w-4 h-4" /> La Campagne en Images
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Galerie Photos</h1>
            <p className="text-blue-200 text-xl max-w-2xl mx-auto">Retrouvez les moments forts de notre campagne sur le terrain.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {filters.map(f => (
              <button key={f.value} onClick={() => setFilter(f.value)}
                className={"px-5 py-2 rounded-full text-sm font-medium transition-all " + (filter === f.value ? 'bg-blue-950 text-white shadow' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300')}>
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group cursor-pointer overflow-hidden rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all"
                onClick={() => setSelected(img)}>
                <div className="aspect-square overflow-hidden relative">
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/40 transition-all flex items-end p-4 opacity-0 group-hover:opacity-100">
                    <p className="text-white font-semibold text-sm leading-tight">{img.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelected(null)} className="absolute -top-10 right-0 text-white/70 hover:text-white">
                <X className="w-8 h-8" />
              </button>
              <img src={selected.url} alt={selected.title} className="w-full rounded-2xl shadow-2xl" />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-white font-semibold">{selected.title}</p>
                {selected.canton !== 'tous' && (
                  <span className="flex items-center gap-1 text-green-400 text-sm">
                    <MapPin className="w-4 h-4" />{selected.canton.replace('_', ' ')}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
`, 'utf8');
console.log('Gallery.jsx ✓');
