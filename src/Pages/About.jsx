import React from 'react';
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
                <img src="/images/foka-about.jpg" alt="Emmanuel FOKA" className="w-full h-full object-cover object-top" />
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
