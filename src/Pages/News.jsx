import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import Skeleton from '../components/Skeleton';
import { Calendar, MapPin, Newspaper, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';

export default function News() {
  const [activeCategory, setActiveCategory] = useState('tous');
  const [activeCanton, setActiveCanton] = useState('tous');

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const all = await base44.entities.NewsArticle.list('-created_date');
      return all.filter(a => a.published);
    },
  });

  const categories = [
    { value: 'tous', label: 'Toutes' },
    { value: 'terrain', label: 'Sur le terrain' },
    { value: 'reunion', label: 'Réunion' },
    { value: 'projet', label: 'Projet' },
    { value: 'temoignage', label: 'Témoignage' },
    { value: 'communique', label: 'Communiqué' },
  ];

  const cantons = [
    { value: 'tous', label: 'Tous' },
    { value: 'figuil', label: 'Figuil' },
    { value: 'lam', label: 'Lam' },
    { value: 'biou', label: 'Biou' },
    { value: 'bidzar_1', label: 'Bidzar I' },
    { value: 'bidzar_2', label: 'Bidzar II' },
  ];

  const filtered = articles.filter(a => {
    const catOk = activeCategory === 'tous' || a.category === activeCategory;
    const cantonOk = activeCanton === 'tous' || a.canton === activeCanton;
    return catOk && cantonOk;
  });

  return (
    <div className="min-h-screen">
      <section className="bg-blue-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Newspaper className="w-4 h-4" /> Vie de la Campagne
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Actualités</h1>
            <p className="text-blue-200 text-xl max-w-2xl mx-auto">
              Suivez nos actions sur le terrain, nos rencontres et l'avancement de nos projets.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-b border-slate-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button key={c.value} onClick={() => setActiveCategory(c.value)}
                  className={"px-4 py-1.5 rounded-full text-sm font-medium transition-all " + (activeCategory === c.value ? 'bg-blue-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
                  {c.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {cantons.map(c => (
                <button key={c.value} onClick={() => setActiveCanton(c.value)}
                  className={"flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium transition-all " + (activeCanton === c.value ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
                  {c.value !== 'tous' && <MapPin className="w-3 h-3" />}{c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-3"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-4 w-full" /></div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <Newspaper className="w-20 h-20 text-slate-200 mx-auto mb-5" />
              <h3 className="text-2xl font-bold text-slate-700 mb-2">Aucune actualité trouvée</h3>
              <p className="text-slate-500">Modifiez les filtres ou revenez plus tard.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article, i) => (
                <motion.article key={article.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all">
                  {article.image_url ? (
                    <div className="aspect-video overflow-hidden">
                      <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="aspect-video bg-blue-950 flex items-center justify-center">
                      <span className="text-blue-700 font-black text-3xl">EF</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {article.category && (
                        <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full capitalize">{article.category}</span>
                      )}
                      {article.canton && article.canton !== 'tous' && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                          <MapPin className="w-3 h-3" />{article.canton.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-lg mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">{article.title}</h3>
                    {article.excerpt && <p className="text-slate-500 text-sm line-clamp-2 mb-3">{article.excerpt}</p>}
                    {article.created_date && (
                      <div className="flex items-center gap-1 text-slate-400 text-xs">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(article.created_date), 'd MMMM yyyy', { locale: fr })}
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
