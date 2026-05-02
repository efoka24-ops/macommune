import React, { useState } from 'react';
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
