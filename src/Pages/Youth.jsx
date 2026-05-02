import React, { useState } from 'react';
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
