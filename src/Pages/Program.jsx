import React, { useState } from 'react';
//import { div, div } from '@/components/ui/card';
//import { Badge } from '@/components/ui/badge';
import  Badge  from '../components/Badge';
import Button from '../components/Button';
import { 
  Scale, Briefcase, Users, HeartHandshake, 
  Stethoscope, Palette, ShoppingCart
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Program() {
  const [selectedAxis, setSelectedAxis] = useState(null);

  const axes = [
    {
      id: 1,
      title: 'Gouvernance & Transparence',
      icon: Scale,
      color: 'from-blue-600 to-indigo-700',
      problems: [
        'Manque de transparence dans la gestion communale',
        'Faible participation citoyenne',
        'Information limitée sur les projets'
      ],
      solutions: [
        'Conseil communal ouvert et accessible',
        'Publication trimestrielle des comptes',
        'Plateforme digitale de suivi des projets',
        'Assemblées cantonales mensuelles',
        'Budget participatif (20% des investissements)'
      ],
      results: [
        'Confiance restaurée',
        'Citoyens informés et impliqués',
        'Gestion exemplaire'
      ],
      projects: ['Plateforme digitale', 'Assemblées participatives']
    },
    {
      id: 2,
      title: 'Emploi, Économie & Routes',
      icon: Briefcase,
      color: 'from-green-600 to-emerald-700',
      problems: [
        'Chômage massif des jeunes (65%)',
        'Infrastructures routières défaillantes',
        'Accès limité aux marchés'
      ],
      solutions: [
        'Figuil Business Zone : 500+ emplois',
        '50 km de routes pavées',
        'Incubateur d\'entreprises',
        'Microcrédits pour jeunes entrepreneurs',
        'Marchés modernes dans chaque canton'
      ],
      results: [
        '1000+ emplois créés d\'ici 2031',
        'Mobilité améliorée',
        'Économie locale dynamique'
      ],
      projects: ['Business Zone', 'Routes pavées', 'Coopératives']
    },
    {
      id: 3,
      title: 'Jeunesse, Formation & Innovation',
      icon: Users,
      color: 'from-purple-600 to-pink-700',
      problems: [
        'Exode rural des jeunes',
        'Formation inadaptée au marché',
        'Manque d\'opportunités locales'
      ],
      solutions: [
        'Université Rurale de Figuil',
        'Centre de formation professionnelle',
        'Pépinière de startups',
        'Programme de mentorat',
        'Festival annuel de l\'innovation',
        'Bourses d\'excellence'
      ],
      results: [
        '500 jeunes formés/an',
        '50 startups lancées',
        'Talents locaux valorisés'
      ],
      projects: ['Université Rurale', 'MOKINE', 'Coworking']
    },
    {
      id: 4,
      title: 'Cohésion Sociale & Inclusion',
      icon: HeartHandshake,
      color: 'from-rose-600 to-red-700',
      problems: [
        'Tensions intercommunautaires',
        'Marginalisation des femmes',
        'Faible organisation sociale'
      ],
      solutions: [
        'Programme d\'autonomisation des femmes',
        'Coopératives féminines dans chaque canton',
        'Microcrédits sans garantie',
        'Centre d\'écoute et de médiation',
        'Festivals culturels intercommunautaires',
        'Quotas femmes dans les instances (40%)'
      ],
      results: [
        '1000 femmes autonomisées',
        'Conflits réduits de 70%',
        'Tissu social renforcé'
      ],
      projects: ['Coopératives féminines', 'Centres de médiation']
    },
    {
      id: 5,
      title: 'Santé, Eau & Environnement',
      icon: Stethoscope,
      color: 'from-cyan-600 to-blue-700',
      problems: [
        'Accès limité à l\'eau potable',
        'Infrastructures sanitaires insuffisantes',
        'Pollution plastique',
        'Maladies hydriques récurrentes'
      ],
      solutions: [
        '150 forages dans les 5 cantons',
        'Centre de santé moderne par canton',
        'Ambulances équipées (3)',
        'Usine de pavés à partir de plastique recyclé',
        'Programme d\'assainissement',
        'Campagnes de sensibilisation santé'
      ],
      results: [
        '100% accès à l\'eau potable',
        'Mortalité infantile réduite de 50%',
        'Environnement assaini'
      ],
      projects: ['150 forages', 'Pavés recyclés', 'Centres de santé']
    },
    {
      id: 6,
      title: 'Culture, Sport & Identité',
      icon: Palette,
      color: 'from-amber-600 to-orange-700',
      problems: [
        'Patrimoine culturel sous-valorisé',
        'Infrastructures sportives inexistantes',
        'Potentiel touristique inexploité'
      ],
      solutions: [
        'Musée moderne de Bidzar (site UNESCO)',
        'Route culturelle et touristique',
        'Stades multisports (3)',
        'Festival culturel annuel',
        'Écoles de musique et danse traditionnelles',
        'Promotion des artisans locaux'
      ],
      results: [
        'Tourisme développé',
        'Jeunes épanouis',
        'Fierté culturelle restaurée'
      ],
      projects: ['Musée Bidzar', 'Route culturelle', 'Complexes sportifs']
    },
    {
      id: 7,
      title: 'Commerce & Ouverture Régionale',
      icon: ShoppingCart,
      color: 'from-indigo-600 to-purple-700',
      problems: [
        'Isolement économique',
        'Faible intégration régionale',
        'Marchés informels peu rentables'
      ],
      solutions: [
        'Corridor Économique Figuil-Léré-Mubi (CELT)',
        'Zone de libre-échange transfrontalière',
        'Facilitation douanière',
        'Marchés modernes structurés',
        'Promotion des produits locaux',
        'Partenariats avec Tchad et Nigeria'
      ],
      results: [
        'Commerce multiplié par 3',
        'Revenus des commerçants +50%',
        'Rayonnement régional'
      ],
      projects: ['CELT', 'Marchés modernes', 'Zone franche']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-6 py-2 bg-amber-500/20 border border-amber-400 rounded-full mb-6">
              <span className="text-amber-300 font-semibold">Programme 2026-2031</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Programme Complet
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              7 axes stratégiques pour transformer Figuil en un modèle 
              de développement durable, inclusif et prospère.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Axes Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {axes.map((axis, index) => {
              const Icon = axis.icon;
              return (
                <motion.div
                  key={axis.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div 
                    className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group border-0 overflow-hidden"
                    onClick={() => setSelectedAxis(axis)}
                  >
                    <div className={`h-32 bg-gradient-to-br ${axis.color} flex items-center justify-center relative`}>
                      <Icon className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white text-gray-900">Axe {axis.id}</Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">
                        {axis.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {axis.problems.length} problèmes identifiés • {axis.solutions.length} solutions proposées
                      </p>
                      <div className="text-amber-600 font-semibold text-sm">
                        Cliquer pour détails →
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedAxis && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedAxis(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-48 bg-gradient-to-br ${selectedAxis.color} relative flex items-center justify-center`}>
              {(() => {
                const Icon = selectedAxis.icon;
                return (
                  <>
                    <Icon className="w-24 h-24 text-white" />
                    <Badge className="absolute top-6 right-6 bg-white text-gray-900 text-lg px-4 py-2">
                      Axe {selectedAxis.id}
                    </Badge>
                  </>
                );
              })()}
            </div>
            
            <div className="p-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{selectedAxis.title}</h2>
              
              <div className="space-y-8">
                {/* Problems */}
                <div className="bg-red-50 rounded-2xl p-6 border-l-4 border-red-600">
                  <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center">
                    <span className="mr-3">⚠️</span> Problèmes Identifiés
                  </h3>
                  <ul className="space-y-2">
                    {selectedAxis.problems.map((problem, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start">
                        <span className="text-red-600 mr-2 font-bold">•</span>
                        <span>{problem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions */}
                <div className="bg-green-50 rounded-2xl p-6 border-l-4 border-green-600">
                  <h3 className="text-2xl font-bold text-green-900 mb-4 flex items-center">
                    <span className="mr-3">✅</span> Solutions Proposées
                  </h3>
                  <ul className="space-y-3">
                    {selectedAxis.solutions.map((solution, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start">
                        <span className="text-green-600 mr-2 font-bold text-lg">✓</span>
                        <span className="font-medium">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Results */}
                <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                    <span className="mr-3">📊</span> Résultats Attendus
                  </h3>
                  <ul className="space-y-2">
                    {selectedAxis.results.map((result, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start">
                        <span className="text-blue-600 mr-2 font-bold">→</span>
                        <span className="font-semibold">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Projects */}
                <div className="bg-amber-50 rounded-2xl p-6 border-l-4 border-amber-600">
                  <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
                    <span className="mr-3">🎯</span> Projets Signatures Intégrés
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAxis.projects.map((project, idx) => (
                      <Badge key={idx} className="bg-amber-600 text-white px-4 py-2 text-sm">
                        {project}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-4 rounded-xl font-semibold text-lg transition-all"
                onClick={() => setSelectedAxis(null)}
              >
                Fermer
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}