import React, { useState } from 'react';
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
