import React, { useState } from 'react';
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
