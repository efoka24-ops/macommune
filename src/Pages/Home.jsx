import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowRight, Users, MapPin, Lightbulb, CheckCircle, Building2, Droplet, Star, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Home() {
  const { data: articles = [] } = useQuery({
    queryKey: ['news-home'],
    queryFn: async () => {
      const all = await base44.entities.NewsArticle.list('-created_date');
      return all.filter(a => a.published).slice(0, 3);
    },
  });

  const { data: testimonials = [] } = useQuery({
    queryKey: ['testimonials-home'],
    queryFn: async () => {
      const all = await base44.entities.Testimonial.list('-created_date');
      return all.filter(t => t.featured).slice(0, 3);
    },
  });

  const { data: badgeCount = 0 } = useQuery({
    queryKey: ['badge-count'],
    queryFn: async () => {
      const all = await base44.entities.Badge.list();
      return all.length;
    },
  });

  const priorities = [
    {
      number: '01',
      title: 'Développement Économique',
      description: 'Business Zone, 500+ emplois, marchés modernes, microcrédits et routes pavées pour désenclaver nos cantons.',
      icon: Building2,
      color: 'bg-blue-950',
    },
    {
      number: '02',
      title: 'Bien-être & Services',
      description: '150 forages solaires, centres de santé rénovés, éclairage public et infrastructures dans les 5 cantons.',
      icon: Droplet,
      color: 'bg-green-700',
    },
    {
      number: '03',
      title: 'Jeunesse & Innovation',
      description: 'Université Rurale, incubateur de startups, formation professionnelle et autonomisation des femmes.',
      icon: Lightbulb,
      color: 'bg-blue-700',
    },
  ];

  const stats = [
    { value: '83 500', label: 'Habitants', sub: 'dans nos 5 cantons' },
    { value: '10', label: 'Projets signatures', sub: 'concrets et financés' },
    { value: '1 000+', label: 'Emplois', sub: "à créer d'ici 2031" },
    { value: '150', label: 'Forages', sub: 'eau pour tous les villages' },
    { value: badgeCount > 0 ? badgeCount + '+' : '0', label: 'Badges générés', sub: 'et partagés' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-blue-950 text-white min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600')] bg-cover bg-center opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
                <MapPin className="w-4 h-4" /> Commune de Figuil · Élections 2026
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                Emmanuel<br /><span className="text-green-400">Foka</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 font-light mb-4">Candidat à la Mairie de Figuil 2026</p>
              <p className="text-blue-300 text-lg leading-relaxed mb-10 max-w-lg">
                Un fils de Figuil au service du progrès. Entrepreneur, innovateur, bâtisseur — 
                ensemble construisons la commune que nos enfants méritent.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to={createPageUrl('Program')} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-green-900/30">
                  Découvrir le Programme <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to={createPageUrl('Join')} className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all">
                  Nous Rejoindre
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:block">
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-blue-700">
                  <img src="/images/foka-portrait.jpg" alt="Emmanuel FOKA" className="w-full h-full object-cover object-top" />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 max-w-[210px]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">Programme validé</span>
                  </div>
                  <p className="text-slate-500 text-xs">10 projets concrets pour les 5 cantons</p>
                </div>
                <div className="absolute -top-5 -right-5 bg-green-600 rounded-2xl shadow-xl p-4 text-white text-center">
                  <div className="text-3xl font-black">2026</div>
                  <div className="text-green-200 text-xs">Élections municipales</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <div className="w-5 h-9 border-2 border-white/30 rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center">
                <div className="text-4xl md:text-5xl font-black mb-1">{s.value}</div>
                <div className="font-bold text-green-100">{s.label}</div>
                <div className="text-green-200 text-sm">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Priorités */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-3">Notre Vision</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-950">3 Priorités pour Figuil</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {priorities.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg transition-all group cursor-default">
                  <div className={"w-14 h-14 " + p.color + " rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-green-600 font-black text-5xl mb-2 leading-none">{p.number}</div>
                  <h3 className="text-xl font-extrabold text-blue-950 mb-3">{p.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{p.description}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link to={createPageUrl('Program')} className="inline-flex items-center gap-2 border-2 border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white font-semibold px-7 py-3 rounded-xl transition-all">
              Voir le Programme Complet <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Actualités */}
      {articles.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">Sur le terrain</div>
                <h2 className="text-4xl font-extrabold text-blue-950">Dernières Actualités</h2>
              </div>
              <Link to={createPageUrl('News')} className="hidden sm:flex items-center gap-1 text-green-600 font-semibold hover:text-green-700">
                Toutes les actus <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <motion.article key={article.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all">
                  {article.image_url ? (
                    <div className="aspect-video overflow-hidden">
                      <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="aspect-video bg-blue-950 flex items-center justify-center">
                      <span className="text-blue-700 font-black text-4xl">EF</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-extrabold text-slate-900 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">{article.title}</h3>
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
          </div>
        </section>
      )}

      {/* Témoignages */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">Ils nous font confiance</div>
              <h2 className="text-4xl font-extrabold text-blue-950">Témoignages</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-green-500 text-green-500" />)}
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-6 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-950 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t.name?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                      {t.location && <div className="text-slate-500 text-xs">{t.location}</div>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="py-24 bg-blue-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Construisons ensemble<br /><span className="text-green-400">le Figuil de demain</span>
            </h2>
            <p className="text-blue-200 text-xl mb-10">Rejoignez le mouvement. Chaque voix compte, chaque engagement fait la différence.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={createPageUrl('Join')} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-9 py-4 rounded-xl text-lg transition-all">
                Rejoindre le Mouvement <Users className="w-5 h-5" />
              </Link>
              <Link to={createPageUrl('Contact')} className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white font-semibold px-9 py-4 rounded-xl text-lg transition-all">
                Nous Contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
