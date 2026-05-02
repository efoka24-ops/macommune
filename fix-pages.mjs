import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pages = join(__dirname, 'src', 'Pages');

// ── ABOUT.JSX ─────────────────────────────────────────────────────────────────
writeFileSync(join(pages, 'About.jsx'), `import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Award, Heart, Users, Lightbulb, Target, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const values = [
    { icon: Heart, title: 'Intégrité', description: 'Transparence et honnêteté dans chaque action et décision' },
    { icon: Users, title: 'Proximité', description: "À l'écoute des besoins de chaque canton et chaque famille" },
    { icon: Lightbulb, title: 'Innovation', description: 'Solutions modernes pour les défis de notre commune' },
    { icon: Briefcase, title: 'Travail', description: 'Engagement total et concret au service de Figuil' },
    { icon: Target, title: 'Résultats', description: 'Des projets mesurables avec des délais définis' },
    { icon: Award, title: 'Excellence', description: "Standard élevé dans chaque initiative et réalisation" },
  ];

  const achievements = [
    'Responsable Google Developer Group Cameroun',
    'Fondateur de MOKINE (traçabilité animale par IA)',
    'Lauréat YEIC – Young Entrepreneurs Innovation Challenge',
    "Lauréat APPECAM – Association pour la Promotion de l'Entrepreneuriat",
    'Lauréat ECAM – École Supérieure des Sciences et Techniques',
    'Lauréat AppsAfrica Innovation Awards',
    "Expert en Intelligence Artificielle appliquée à l'agriculture",
    'Expert en développement rural et élevage',
  ];

  const timeline = [
    { year: 'Enfance', title: 'Figuil, ma terre natale', desc: "Né et élevé à Figuil, j'ai grandi en observant les défis de notre commune : accès à l'eau, chômage des jeunes, difficultés économiques. Ces réalités ont forgé ma détermination." },
    { year: 'Formation', title: 'Excellence académique', desc: "Parcours brillant en sciences et technologies, spécialisation en Intelligence Artificielle et développement rural. Lauréat de plusieurs prix d'excellence nationaux et continentaux." },
    { year: 'Innovation', title: 'Entrepreneur engagé', desc: "Fondation de MOKINE, solution IA de traçabilité animale adaptée aux réalités locales. Reconnaissance internationale via AppsAfrica Innovation Awards." },
    { year: '2026', title: 'Candidat à la Mairie', desc: "Fort de mon expérience et de ma connaissance de Figuil, je me présente pour mettre mes compétences au service de notre commune. Construisons ensemble le Figuil de demain." },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-blue-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
                Candidat à la Mairie de Figuil 2026
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Emmanuel Foka</h1>
              <p className="text-2xl text-green-400 font-semibold mb-6">Un fils de Figuil au service du progrès</p>
              <p className="text-blue-200 text-lg leading-relaxed mb-8">
                Entrepreneur innovant, expert en développement local et passionné par l'avenir
                de notre commune. Mon parcours est celui d'un bâtisseur engagé pour l'inclusion,
                l'innovation et la prospérité partagée.
              </p>
              <Link to={createPageUrl('Program')} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-7 py-3 rounded-xl transition-all">
                Découvrir mon Programme <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto">
                <img src="/images/foka-reflexion.jpg" alt="Emmanuel FOKA" className="w-full h-full object-cover object-top" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-3">Son Parcours</div>
            <h2 className="text-4xl font-extrabold text-blue-950">De Figuil au service de Figuil</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative flex gap-8 items-start">
                  <div className="w-16 h-16 bg-blue-950 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg z-10">
                    <span className="text-green-400 font-bold text-xs text-center leading-tight px-1">{item.year}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-blue-950 mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-3">Reconnaissances</div>
            <h2 className="text-4xl font-extrabold text-blue-950">Prix & Distinctions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {achievements.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-center gap-3 bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-slate-700 text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-3">Ce qui me guide</div>
            <h2 className="text-4xl font-extrabold text-blue-950">Mes Valeurs</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-slate-50 rounded-2xl p-6 text-center hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-blue-950 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-blue-950 mb-2">{v.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-950 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5">
            Ensemble, bâtissons <span className="text-green-400">Figuil de demain</span>
          </h2>
          <p className="text-blue-200 mb-8 text-lg">Rejoignez le mouvement et participez à la transformation de notre commune.</p>
          <Link to={createPageUrl('Join')} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-9 py-4 rounded-xl text-lg transition-all">
            Rejoindre le Mouvement <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
`, 'utf8');
console.log('About.jsx ✓');

// ── HOME.JSX ──────────────────────────────────────────────────────────────────
writeFileSync(join(pages, 'Home.jsx'), `import React from 'react';
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
`, 'utf8');
console.log('Home.jsx ✓');

// ── PROGRAM.JSX ───────────────────────────────────────────────────────────────
writeFileSync(join(pages, 'Program.jsx'), `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ChevronDown, ArrowRight, Building2, Droplet, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const priorities = [
  {
    number: '01',
    icon: Building2,
    color: 'bg-blue-950',
    title: 'Développement Économique & Infrastructures',
    summary: "Créer les conditions d'une croissance économique durable et désenclaver nos cantons.",
    sectors: [
      { title: 'Business Zone', desc: 'Zone économique spéciale à Figuil pour attirer les investissements' },
      { title: 'Marchés modernes', desc: 'Construction et réhabilitation des marchés dans les 5 cantons' },
      { title: 'Routes pavées', desc: 'Désenclavement des villages par 150 km de routes bitumées' },
      { title: 'Microcrédits', desc: 'Fonds de garantie pour les PME et agriculteurs locaux' },
      { title: 'Élevage intensif', desc: 'Appui technique et financier aux éleveurs bovins et ovins' },
      { title: 'Agriculture moderne', desc: 'Irrigation, semences améliorées et stockage post-récolte' },
    ],
  },
  {
    number: '02',
    icon: Droplet,
    color: 'bg-green-700',
    title: 'Bien-être Social & Services de Base',
    summary: "Garantir l'accès à l'eau, à la santé et à l'éducation pour tous les habitants.",
    sectors: [
      { title: '150 Forages solaires', desc: 'Eau potable pour 100% des villages des 5 cantons' },
      { title: 'Centres de santé', desc: 'Rénovation et équipement de 5 centres de santé communautaires' },
      { title: 'Maternités', desc: 'Construction de 3 maternités modernes avec personnel qualifié' },
      { title: 'Éclairage public', desc: 'Électrification solaire de tous les centres urbains et villages' },
      { title: 'École numérique', desc: 'Connexion internet et tablettes pour toutes les écoles primaires' },
      { title: 'Terrain multisport', desc: 'Un complexe sportif par canton avec terrain de foot' },
    ],
  },
  {
    number: '03',
    icon: Lightbulb,
    color: 'bg-blue-700',
    title: 'Jeunesse, Innovation & Inclusion',
    summary: 'Investir dans la jeunesse et les femmes pour préparer le Figuil de demain.',
    sectors: [
      { title: 'Université Rurale', desc: 'Centre de formation professionnelle certifiante à Figuil' },
      { title: 'Incubateur startups', desc: "Hub d'innovation pour les entrepreneurs du Nord Cameroun" },
      { title: 'Programme Femmes', desc: 'Autonomisation économique de 500 femmes par an' },
      { title: 'MOKINE agricole', desc: 'Déploiement de la solution IA de traçabilité animale' },
      { title: 'Bourses scolaires', desc: '200 bourses annuelles pour les meilleurs élèves de la commune' },
      { title: 'Sport & culture', desc: 'Festival culturel annuel et ligue communale de football' },
    ],
  },
];

export default function Program() {
  const [open, setOpen] = useState(0);

  return (
    <div className="min-h-screen">
      <section className="bg-blue-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              Notre Vision pour Figuil
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Notre Programme</h1>
            <p className="text-blue-200 text-xl max-w-2xl mx-auto">
              Un projet de société ambitieux structuré autour de 3 grandes priorités et 18 secteurs d'action concrets.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div><div className="text-5xl font-black mb-1">3</div><div className="text-green-100">Priorités majeures</div></div>
            <div><div className="text-5xl font-black mb-1">18+</div><div className="text-green-100">Secteurs d'action</div></div>
            <div><div className="text-5xl font-black mb-1">10</div><div className="text-green-100">Projets signatures</div></div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {priorities.map((p, i) => {
            const Icon = p.icon;
            const isOpen = open === i;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <button onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center gap-5 p-6 text-left hover:bg-slate-50 transition-colors">
                  <div className={"w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 " + p.color}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-green-600 font-black text-sm mb-1">{p.number}</div>
                    <h3 className="text-xl font-extrabold text-blue-950">{p.title}</h3>
                    <p className="text-slate-500 text-sm mt-1 hidden sm:block">{p.summary}</p>
                  </div>
                  <ChevronDown className={"w-5 h-5 text-slate-400 flex-shrink-0 transition-transform " + (isOpen ? 'rotate-180' : '')} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="px-6 pb-6 border-t border-slate-100 pt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {p.sectors.map((s, j) => (
                            <div key={j} className="bg-slate-50 rounded-xl p-4">
                              <h4 className="font-bold text-blue-950 text-sm mb-1">{s.title}</h4>
                              <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-20 bg-blue-950 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Découvrez nos 10 projets signatures</h2>
          <p className="text-blue-200 mb-8">Des projets concrets, planifiés et budgétisés pour transformer Figuil.</p>
          <Link to={createPageUrl('Projects')} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition-all">
            Voir les Projets <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
`, 'utf8');
console.log('Program.jsx ✓');

// ── PROJECTS.JSX ──────────────────────────────────────────────────────────────
writeFileSync(join(pages, 'Projects.jsx'), `import React, { useState } from 'react';
import { X, MapPin, Banknote, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { id: 1, num: '01', title: 'Business Zone Figuil', icon: '🏭', canton: 'Figuil', budget: '500M FCFA', duree: '24 mois', desc: "Création d'une zone économique spéciale avec 50 parcelles pour PME, entrepôts frigorifiques et guichet unique des affaires.", impact: '300+ emplois directs' },
  { id: 2, num: '02', title: '150 Forages Solaires', icon: '💧', canton: 'Tous cantons', budget: '750M FCFA', duree: '18 mois', desc: "150 forages équipés de pompes solaires pour garantir l'eau potable dans chaque village de la commune.", impact: '60 000 bénéficiaires' },
  { id: 3, num: '03', title: 'Routes Structurantes', icon: '🛣️', canton: 'Tous cantons', budget: '2 Mds FCFA', duree: '36 mois', desc: 'Pavage et bitumage de 150 km de routes intercommunales pour désenclaver les cantons et faciliter le commerce.', impact: '5 cantons désenclavés' },
  { id: 4, num: '04', title: 'Centre de Santé Moderne', icon: '🏥', canton: 'Figuil', budget: '400M FCFA', duree: '20 mois', desc: "Construction d'un centre de santé de référence avec maternité, bloc opératoire et équipements de diagnostic.", impact: '83 500 personnes' },
  { id: 5, num: '05', title: 'Université Rurale', icon: '🎓', canton: 'Figuil', budget: '600M FCFA', duree: '30 mois', desc: 'Centre de formation professionnelle certifiante dans 10 filières : agriculture, élevage, numérique, BTP, santé...', impact: '500 jeunes/an' },
  { id: 6, num: '06', title: 'Marché Moderne Lam', icon: '🏪', canton: 'Lam', budget: '200M FCFA', duree: '12 mois', desc: "Construction d'un marché couvert de 200 boutiques avec chambre froide, aire de stationnement et WiFi gratuit.", impact: '400 commerçants' },
  { id: 7, num: '07', title: 'Éclairage Solaire', icon: '💡', canton: 'Tous cantons', budget: '350M FCFA', duree: '15 mois', desc: '500 lampadaires solaires dans tous les centres-villes et axes principaux des 5 cantons.', impact: 'Sécurité nocturne' },
  { id: 8, num: '08', title: 'Programme Femmes 500', icon: '👩‍💼', canton: 'Tous cantons', budget: '150M FCFA', duree: '12 mois/an', desc: 'Formation, microcrédit et accompagnement de 500 femmes par an en entrepreneuriat agricole et artisanal.', impact: '500 femmes/an' },
  { id: 9, num: '09', title: 'Incubateur MOKINE', icon: '🤖', canton: 'Figuil', budget: '100M FCFA', duree: '12 mois', desc: 'Déploiement de la solution IA de traçabilité animale MOKINE pour 5 000 éleveurs de la commune.', impact: '5 000 éleveurs' },
  { id: 10, num: '10', title: 'Complexe Sportif', icon: '⚽', canton: 'Figuil', budget: '250M FCFA', duree: '18 mois', desc: 'Stade communal de 5 000 places, piscine, salle omnisports et espaces de loisirs pour les jeunes.', impact: 'Jeunesse épanouie' },
];

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen">
      <section className="bg-blue-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              Projets Concrets
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">10 Projets Signatures</h1>
            <p className="text-blue-200 text-xl max-w-2xl mx-auto">
              Des réalisations planifiées, budgétisées et prêtes à démarrer dès le premier jour du mandat.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelected(p)}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-green-200 cursor-pointer transition-all">
                <div className="text-4xl mb-4">{p.icon}</div>
                <div className="text-green-600 font-black text-sm mb-1">{p.num}</div>
                <h3 className="font-extrabold text-blue-950 text-lg mb-2 group-hover:text-green-700 transition-colors">{p.title}</h3>
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <MapPin className="w-3 h-3" />{p.canton}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-6">
                <div className="text-5xl">{selected.icon}</div>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="text-green-600 font-black text-sm mb-1">{selected.num}</div>
              <h2 className="text-2xl font-extrabold text-blue-950 mb-3">{selected.title}</h2>
              <p className="text-slate-600 leading-relaxed mb-6">{selected.desc}</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <MapPin className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <div className="text-xs font-bold text-blue-950">{selected.canton}</div>
                  <div className="text-xs text-slate-500">Zone</div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <Banknote className="w-4 h-4 text-green-600 mx-auto mb-1" />
                  <div className="text-xs font-bold text-blue-950">{selected.budget}</div>
                  <div className="text-xs text-slate-500">Budget</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 text-center">
                  <Clock className="w-4 h-4 text-slate-600 mx-auto mb-1" />
                  <div className="text-xs font-bold text-blue-950">{selected.duree}</div>
                  <div className="text-xs text-slate-500">Durée</div>
                </div>
              </div>
              <div className="mt-4 bg-green-50 rounded-xl p-3 text-center">
                <span className="text-green-700 font-semibold text-sm">Impact : {selected.impact}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
`, 'utf8');
console.log('Projects.jsx ✓');

// ── CANTONS.JSX ───────────────────────────────────────────────────────────────
writeFileSync(join(pages, 'Cantons.jsx'), `import React, { useState } from 'react';
import { MapPin, Users, Droplet, BookOpen, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const cantons = [
  {
    id: 'figuil',
    name: 'Canton de Figuil',
    chef_lieu: 'Figuil',
    population: '35 000',
    villages: 48,
    desc: "Chef-lieu de l'arrondissement, Figuil est le cœur économique et administratif de la commune. Centre commercial, éducatif et sanitaire principal.",
    priorities: ['Business Zone et marché moderne', 'Centre de santé de référence', 'Université Rurale et incubateur', 'Éclairage et routes bitumées'],
    projects: ['Business Zone Figuil', 'Centre de Santé Moderne', 'Université Rurale', 'Incubateur MOKINE'],
  },
  {
    id: 'lam',
    name: 'Canton de Lam',
    chef_lieu: 'Lam',
    population: '18 000',
    villages: 35,
    desc: "Canton agricole par excellence, Lam concentre une grande partie de la production céréalière et d'élevage de la commune. Zone à fort potentiel économique.",
    priorities: ['Marché couvert et chambre froide', 'Forages et eau potable', 'Pistes agricoles bitumées', 'Coopératives agricoles'],
    projects: ['Marché Moderne Lam', '30 Forages Solaires', 'Routes Structurantes Lam', 'Programme Femmes 500'],
  },
  {
    id: 'biou',
    name: 'Canton de Biou',
    chef_lieu: 'Biou',
    population: '12 000',
    villages: 28,
    desc: "Canton pastoral au nord de la commune, Biou accueille une grande communauté d'éleveurs. Ses ressources pastorales sont un atout majeur pour le développement.",
    priorities: ['Couloirs de transhumance sécurisés', 'Centres vétérinaires', 'Forages pastoraux', 'Électrification solaire'],
    projects: ['20 Forages Pastoraux', 'Centre Vétérinaire Biou', 'Éclairage Solaire Biou', 'MOKINE Élevage Biou'],
  },
  {
    id: 'bidzar_1',
    name: 'Canton Bidzar I',
    chef_lieu: 'Bidzar',
    population: '10 500',
    villages: 22,
    desc: "Bidzar I couvre la partie orientale du canton historique de Bidzar. Terres fertiles propices à la polyculture et à l'agropastoralisme.",
    priorities: ['Aménagements hydro-agricoles', 'École numérique', 'Centre multiservices', 'Route Bidzar-Figuil'],
    projects: ['Forages Bidzar I', 'École Numérique Bidzar', 'Centre Multiservices', 'Piste Bidzar-Figuil'],
  },
  {
    id: 'bidzar_2',
    name: 'Canton Bidzar II',
    chef_lieu: 'Bidzar',
    population: '8 000',
    villages: 18,
    desc: "Bidzar II couvre la partie occidentale, avec une population à dominante agropastorale. Zone enclavée qui bénéficiera en priorité des routes et forages.",
    priorities: ['Désenclavement prioritaire', 'Forages et eau potable', 'Formation agricole', 'Terrain de sport'],
    projects: ['Route Désenclavement', '15 Forages Bidzar II', 'Formation Agricole', 'Complexe Sportif Bidzar'],
  },
];

const icons = [MapPin, Users, Droplet, BookOpen, Briefcase];

export default function Cantons() {
  const [active, setActive] = useState(0);
  const canton = cantons[active];

  return (
    <div className="min-h-screen">
      <section className="bg-blue-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" /> Territoire
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Nos 5 Cantons</h1>
            <p className="text-blue-200 text-xl max-w-2xl mx-auto">
              La commune de Figuil regroupe 5 cantons, chacun avec ses spécificités et ses besoins. Notre programme répond à chacun d'eux.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {cantons.map((c, i) => (
              <button key={c.id} onClick={() => setActive(i)}
                className={"flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all " + (active === i ? 'bg-blue-950 text-white shadow-lg' : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:shadow-sm')}>
                <MapPin className="w-4 h-4" />{c.name}
              </button>
            ))}
          </div>

          <motion.div key={canton.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-blue-950 text-white p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2">
                    <h2 className="text-3xl font-extrabold mb-2">{canton.name}</h2>
                    <div className="flex flex-wrap gap-4 text-blue-200 text-sm mb-4">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />Chef-lieu : {canton.chef_lieu}</span>
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" />{canton.population} habitants</span>
                      <span>{canton.villages} villages</span>
                    </div>
                    <p className="text-blue-200 leading-relaxed">{canton.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-black">{canton.population}</div>
                      <div className="text-blue-200 text-xs">habitants</div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-black">{canton.villages}</div>
                      <div className="text-blue-200 text-xs">villages</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xl font-extrabold text-blue-950 mb-5">Priorités pour ce canton</h3>
                  <ul className="space-y-3">
                    {canton.priorities.map((p, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 font-bold text-xs">{i + 1}</span>
                        </div>
                        <span className="text-slate-700">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-blue-950 mb-5">Projets prévus</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {canton.projects.map((p, i) => (
                      <div key={i} className="bg-slate-50 rounded-xl px-4 py-3 flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0" />
                        <span className="text-slate-700 font-medium text-sm">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
`, 'utf8');
console.log('Cantons.jsx ✓');

// ── YOUTH.JSX ─────────────────────────────────────────────────────────────────
writeFileSync(join(pages, 'Youth.jsx'), `import React, { useState } from 'react';
import { Users, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';

const tabs = [
  {
    id: 'jeunes',
    label: 'Programme Jeunes',
    icon: Sparkles,
    headline: 'Investir dans la jeunesse de Figuil',
    sub: "La jeunesse représente 60% de notre population. Notre programme leur offre des outils concrets pour réussir sur place.",
    items: [
      { title: 'Université Rurale', desc: 'Centre de formation professionnelle certifiante : agriculture, numérique, BTP, santé, artisanat', badge: '500 jeunes/an' },
      { title: 'Incubateur de startups', desc: "Hub d'innovation avec équipements, mentors et fonds d'amorçage pour les entrepreneurs de moins de 35 ans", badge: '50 startups' },
      { title: 'Bourses scolaires', desc: '200 bourses annuelles pour les meilleurs élèves de la commune, tous cantons confondus', badge: '200 bourses/an' },
      { title: 'Complexe sportif', desc: "Stade communal, salle omnisports, piscine et espaces de loisirs pour canaliser l'énergie de la jeunesse", badge: '5 000 places' },
      { title: 'Programme MOKINE Jeunes', desc: "Formation à l'utilisation de la technologie IA pour l'élevage et l'agriculture moderne", badge: '1 000 formés' },
      { title: 'Emplois garantis', desc: '500 emplois directs créés dans les projets de la commune pour les jeunes diplômés sans emploi', badge: '500 emplois' },
    ],
  },
  {
    id: 'femmes',
    label: 'Programme Femmes',
    icon: Users,
    headline: 'Autonomiser les femmes de Figuil',
    sub: "Les femmes sont les piliers de notre économie locale. Leur émancipation est au cœur de notre projet de société.",
    items: [
      { title: 'Fonds de microcrédit', desc: 'Accès à des prêts de 50 000 à 500 000 FCFA sans garantie pour les femmes entrepreneures', badge: '500 femmes/an' },
      { title: 'Coopératives féminines', desc: '10 coopératives agricoles et artisanales créées et accompagnées dans les 5 cantons', badge: '10 coopératives' },
      { title: 'Formation professionnelle', desc: "Modules certifiants en transformation alimentaire, couture, savonnerie, maraîchage et commerce", badge: '300 formées/an' },
      { title: 'Maternités sécurisées', desc: '3 maternités modernes avec personnel qualifié pour réduire la mortalité maternelle et infantile', badge: '3 maternités' },
      { title: 'Éducation des filles', desc: "Programme de maintien des filles à l'école avec cantines scolaires et bourses dédiées", badge: '500 bénéficiaires' },
      { title: 'Leadership féminin', desc: '30% de femmes dans les instances décisionnelles de la mairie et des comités de développement', badge: '30% de parité' },
    ],
  },
];

export default function Youth() {
  const [active, setActive] = useState('jeunes');
  const tab = tabs.find(t => t.id === active);
  const Icon = tab.icon;

  return (
    <div className="min-h-screen">
      <section className="bg-blue-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Users className="w-4 h-4" /> Inclusion & Avenir
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Jeunes & Femmes</h1>
            <p className="text-blue-200 text-xl max-w-2xl mx-auto">
              Deux programmes dédiés pour les deux forces vives de notre commune.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4 mb-12">
            {tabs.map(t => {
              const TIcon = t.icon;
              return (
                <button key={t.id} onClick={() => setActive(t.id)}
                  className={"flex items-center gap-2 px-7 py-3 rounded-xl font-semibold transition-all " + (active === t.id ? 'bg-blue-950 text-white shadow-lg' : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300')}>
                  <TIcon className="w-5 h-5" />{t.label}
                </button>
              );
            })}
          </div>

          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-blue-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-3xl font-extrabold text-blue-950 mb-3">{tab.headline}</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">{tab.sub}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tab.items.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-950 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full">{item.badge}</span>
                  </div>
                  <h3 className="font-extrabold text-blue-950 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-blue-950 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Rejoignez le mouvement !</h2>
          <p className="text-blue-200 mb-8">Que vous soyez jeune ou femme, votre engagement est la clé du changement.</p>
          <Link to={createPageUrl('Join')} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition-all">
            S'inscrire <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
`, 'utf8');
console.log('Youth.jsx ✓');

// ── JOIN.JSX ──────────────────────────────────────────────────────────────────
writeFileSync(join(pages, 'Join.jsx'), `import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { UserPlus, CheckCircle, MapPin, Phone, Mail, Briefcase, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const CANTONS = [
  { value: 'figuil', label: 'Canton de Figuil' },
  { value: 'lam', label: 'Canton de Lam' },
  { value: 'biou', label: 'Canton de Biou' },
  { value: 'bidzar_1', label: 'Canton de Bidzar I' },
  { value: 'bidzar_2', label: 'Canton de Bidzar II' },
];

const HELP_TYPES = [
  'Sensibilisation porte-à-porte',
  'Distribution de tracts',
  'Financement',
  'Organisation de meetings',
  'Transport de sympathisants',
  'Animation réseaux sociaux',
  'Mobilisation de femmes',
  'Mobilisation de jeunes',
];

const PROFILES = [
  { value: 'jeune', label: 'Jeune (18-35 ans)' },
  { value: 'femme', label: 'Femme' },
  { value: 'chef', label: 'Chef traditionnel' },
  { value: 'agriculteur', label: 'Agriculteur/Éleveur' },
  { value: 'commercant', label: 'Commerçant/Entrepreneur' },
  { value: 'enseignant', label: 'Enseignant/Fonctionnaire' },
  { value: 'autre', label: 'Autre' },
];

export default function Join() {
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', canton: '', village: '', help_type: [], profile: ''
  });

  const createSupporter = useMutation({
    mutationFn: (data) => base44.entities.Supporter.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['supporters-admin'] }); setSubmitted(true); }
  });

  const handleSubmit = (e) => { e.preventDefault(); createSupporter.mutate(formData); };

  const handleHelpTypeChange = (value, checked) => {
    setFormData(prev => ({
      ...prev,
      help_type: checked ? [...prev.help_type, value] : prev.help_type.filter(t => t !== value)
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-12 text-center">
          <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-950 mb-3">Bienvenue dans l'équipe !</h2>
          <p className="text-slate-600 text-lg mb-8">Votre inscription a bien été enregistrée. Nous vous contacterons très prochainement.</p>
          <button onClick={() => setSubmitted(false)} className="text-green-600 font-semibold hover:text-green-700 underline">
            Inscrire quelqu'un d'autre
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="bg-blue-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <UserPlus className="w-4 h-4" /> Rejoindre le Mouvement
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Nous Rejoindre</h1>
            <p className="text-blue-200 text-xl max-w-2xl mx-auto">
              Ensemble, construisons le Figuil de demain. Inscrivez-vous comme sympathisant ou bénévole.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div><div className="text-4xl font-black mb-1">1 200+</div><div className="text-green-100">Sympathisants inscrits</div></div>
            <div><div className="text-4xl font-black mb-1">5</div><div className="text-green-100">Cantons mobilisés</div></div>
            <div><div className="text-4xl font-black mb-1">150+</div><div className="text-green-100">Bénévoles actifs</div></div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl font-extrabold text-blue-950 mb-8">Formulaire d'inscription</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nom complet *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent" placeholder="Votre nom complet" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Téléphone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input required type="tel" value={formData.phone} onChange={e => setFormData(p => ({...p, phone: e.target.value}))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950" placeholder="+237 6XX XXX XXX" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input type="email" value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950" placeholder="votre@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Canton *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <select required value={formData.canton} onChange={e => setFormData(p => ({...p, canton: e.target.value}))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950 appearance-none bg-white">
                      <option value="">Choisir un canton</option>
                      {CANTONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Village</label>
                  <input type="text" value={formData.village} onChange={e => setFormData(p => ({...p, village: e.target.value}))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950" placeholder="Votre village" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Profil</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <select value={formData.profile} onChange={e => setFormData(p => ({...p, profile: e.target.value}))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950 appearance-none bg-white">
                      <option value="">Votre profil</option>
                      {PROFILES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Comment souhaitez-vous aider ?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {HELP_TYPES.map(ht => (
                    <label key={ht} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-green-400 hover:bg-green-50 cursor-pointer transition-all">
                      <input type="checkbox" checked={formData.help_type.includes(ht)} onChange={e => handleHelpTypeChange(ht, e.target.checked)}
                        className="w-4 h-4 accent-green-600" />
                      <span className="text-sm text-slate-700">{ht}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={createSupporter.isPending}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors text-lg">
                {createSupporter.isPending ? 'Inscription en cours...' : "M'inscrire comme sympathisant"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
`, 'utf8');
console.log('Join.jsx ✓');

// ── NEWS.JSX ──────────────────────────────────────────────────────────────────
writeFileSync(join(pages, 'News.jsx'), `import React, { useState } from 'react';
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
`, 'utf8');
console.log('News.jsx ✓');

// ── GALLERY.JSX ───────────────────────────────────────────────────────────────
writeFileSync(join(pages, 'Gallery.jsx'), `import React, { useState } from 'react';
import { Image as ImageIcon, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('tous');

  const images = [
    { url: '/images/foka-portrait.jpg', title: 'Portrait officiel du candidat', canton: 'figuil', category: 'reunion' },
    { url: '/images/foka-debout-1.jpg', title: 'Emmanuel FOKA lors d\\'une réunion de campagne', canton: 'figuil', category: 'reunion' },
    { url: '/images/foka-doigt-1.jpg', title: 'Message aux habitants de la commune', canton: 'figuil', category: 'terrain' },
    { url: '/images/foka-reflexion.jpg', title: 'Réflexion sur les projets de la commune', canton: 'figuil', category: 'terrain' },
    { url: '/images/foka-doigt-2.jpg', title: 'Prise de parole lors d\\'un meeting', canton: 'tous', category: 'reunion' },
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
                transition={{ duration: 0.4, delay: i * 0.04 }} className="group cursor-pointer overflow-hidden rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all"
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

// ── CONTACT.JSX ───────────────────────────────────────────────────────────────
writeFileSync(join(pages, 'Contact.jsx'), `import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Youtube, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const contacts = [
  { icon: Phone, title: 'Téléphone', lines: ['+237 6XX XXX XXX', '+237 6XX XXX XXX'], color: 'bg-green-50 text-green-600' },
  { icon: Mail, title: 'Email', lines: ['contact@foka-figuil.cm', 'campagne@foka-figuil.cm'], color: 'bg-blue-50 text-blue-600' },
  { icon: MapPin, title: 'Quartier général', lines: ['Figuil Centre', 'Département du Mayo-Louti, Cameroun'], color: 'bg-green-50 text-green-600' },
  { icon: Clock, title: "Heures d\\'ouverture", lines: ['Lun – Sam : 8h00 – 18h00', 'Dimanche : sur rendez-vous'], color: 'bg-blue-50 text-blue-600' },
];

const socials = [
  { icon: Facebook, label: 'Facebook', href: '#', color: 'hover:text-blue-600' },
  { icon: Youtube, label: 'YouTube', href: '#', color: 'hover:text-red-600' },
  { icon: Twitter, label: 'Twitter / X', href: '#', color: 'hover:text-slate-800' },
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
            {contacts.map(({ icon: Icon, title, lines, color }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 hover:shadow-lg transition-all">
                <div className={\\'w-14 h-14 rounded-2xl flex items-center justify-center mb-5 \\' + color}>
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
                    <a href={\\'tel:\\' + c.phone.replace(/\\\\s/g, \\'\\')}
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
                {socials.map(({ icon: Icon, label, href, color }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                    className={\\'flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all group text-slate-600 \\' + color}>
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
                  S\\'inscrire maintenant
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

console.log('\\nTous les fichiers ont été réécrits avec succès !');
