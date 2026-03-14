import React, { useState } from 'react';
//import { div, div, CardHeader, div } from '@/components/ui/card';
//import { Badge } from '@/components/ui/badge';
import Badge  from '../components/Badge';
//import { Button } from '@/components/ui/button';
import Button from '../components/Button';
import { 
  Building2, Droplet, Sun, Cpu, GraduationCap, 
  Recycle, Users, Construction, Landmark, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Figuil Business Zone',
      icon: Building2,
      color: 'from-blue-600 to-blue-800',
      category: 'Économie',
      objective: 'Créer un pôle économique dynamique',
      problem: 'Manque d\'infrastructures pour les entreprises et artisans',
      solution: 'Zone commerciale moderne avec 100 boutiques, ateliers, et espaces coworking',
      impact: '500+ emplois directs, attraction d\'investissements',
      partners: 'Chambre de Commerce, MINCOMMERCE',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    },
    {
      id: 2,
      title: '150 Forages - Eau Pour Tous',
      icon: Droplet,
      color: 'from-cyan-500 to-blue-600',
      category: 'Infrastructure',
      objective: 'Garantir l\'accès à l\'eau potable dans tous les villages',
      problem: 'Pénurie d\'eau potable, maladies hydriques',
      solution: '150 forages équipés de pompes solaires répartis dans les 5 cantons',
      impact: 'Santé améliorée, temps gagné, élevage facilité',
      partners: 'MINEE, ONG internationales, Partenaires techniques',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800'
    },
    {
      id: 3,
      title: 'Éclairage Solaire 5 Cantons',
      icon: Sun,
      color: 'from-amber-500 to-orange-600',
      category: 'Énergie',
      objective: 'Illuminer Figuil avec l\'énergie propre',
      problem: 'Obscurité nocturne, insécurité, activités limitées',
      solution: '500 lampadaires solaires dans zones stratégiques + places publiques',
      impact: 'Sécurité renforcée, activités nocturnes, économies d\'énergie',
      partners: 'MINEE, entreprises solaires',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800'
    },
    {
      id: 4,
      title: 'MOKINE - Traçabilité Animale IA',
      icon: Cpu,
      color: 'from-purple-600 to-indigo-700',
      category: 'Innovation',
      objective: 'Moderniser l\'élevage par l\'intelligence artificielle',
      problem: 'Vol de bétail, traçabilité difficile, conflits',
      solution: 'Système IA de reconnaissance et traçabilité du cheptel',
      impact: 'Sécurité du bétail, conflits réduits, données statistiques',
      partners: 'MINEPIA, Google Developer Group',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800'
    },
    {
      id: 5,
      title: 'Université Rurale de Figuil',
      icon: GraduationCap,
      color: 'from-green-600 to-emerald-700',
      category: 'Éducation',
      objective: 'Formation supérieure adaptée aux réalités rurales',
      problem: 'Exode des jeunes, formation inadaptée',
      solution: 'Centre universitaire : agro-pastoralisme, entrepreneuriat, tech',
      impact: 'Jeunes formés localement, compétences adaptées',
      partners: 'MINESUP, universités partenaires',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
    },
    {
      id: 6,
      title: 'Commune Propre - Pavés Recyclés',
      icon: Recycle,
      color: 'from-teal-600 to-cyan-700',
      category: 'Environnement',
      objective: 'Assainissement et économie circulaire',
      problem: 'Déchets plastiques, rues dégradées',
      solution: 'Usine de pavés à partir de plastique recyclé',
      impact: 'Environnement sain, emplois verts, routes durables',
      partners: 'MINEPDED, ONG environnementales',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800'
    },
    {
      id: 7,
      title: 'Coopératives Cantonales',
      icon: Users,
      color: 'from-rose-600 to-pink-700',
      category: 'Social',
      objective: 'Renforcer l\'organisation économique locale',
      problem: 'Agriculteurs/éleveurs isolés, faible pouvoir de négociation',
      solution: '10 coopératives (agriculture, élevage, artisanat, femmes)',
      impact: 'Revenus améliorés, accès au crédit, formation',
      partners: 'MINADER, MINEPIA, IMF',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800'
    },
    {
      id: 8,
      title: 'Routes Pavées Rurales',
      icon: Construction,
      color: 'from-gray-600 to-slate-700',
      category: 'Infrastructure',
      objective: 'Désenclaver les villages',
      problem: 'Isolement, difficulté d\'accès aux marchés',
      solution: '50 km de routes pavées reliant villages aux centres',
      impact: 'Commerce facilité, accès aux soins, mobilité',
      partners: 'MINTP, Commune',
      image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800'
    },
    {
      id: 9,
      title: 'Musée & Route Culturelle Bidzar',
      icon: Landmark,
      color: 'from-orange-600 to-red-700',
      category: 'Culture',
      objective: 'Valoriser le patrimoine UNESCO',
      problem: 'Potentiel touristique inexploité',
      solution: 'Musée moderne + circuit touristique sites Bidzar',
      impact: 'Tourisme développé, emplois, fierté culturelle',
      partners: 'MINAC, UNESCO, tour-opérateurs',
      image: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800'
    },
    {
      id: 10,
      title: 'Corridor Économique Figuil-Léré-Mubi',
      icon: Globe,
      color: 'from-indigo-600 to-blue-800',
      category: 'Commerce',
      objective: 'Intégration économique transfrontalière',
      problem: 'Échanges limités avec Tchad et Nigeria',
      solution: 'Zone de libre-échange, facilitation douanière, infrastructures',
      impact: 'Commerce multiplié, emplois, rayonnement régional',
      partners: 'Gouvernements, CEMAC, acteurs privés',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-slate-900 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Mes 10 Projets
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Signatures
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Des projets concrets, ambitieux et réalisables pour transformer Figuil
              en un modèle de développement durable et inclusif.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div 
                    className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden border-0"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-20 h-20 text-white group-hover:scale-110 transition-transform" />
                      </div>
                      
                      <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                        {project.category}
                      </Badge>
                    
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{project.objective}</p>
                      <Button variant="outline" className="w-full group-hover:bg-blue-900 group-hover:text-white transition-all">
                        Voir les Détails
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-64 bg-gradient-to-br ${selectedProject.color} relative`}>
              {(() => {
                const Icon = selectedProject.icon;
                return <Icon className="w-32 h-32 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />;
              })()}
            </div>
            
            <div className="p-8">
              <Badge className="mb-4">{selectedProject.category}</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{selectedProject.title}</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">🎯 Objectif</h3>
                  <p className="text-gray-700">{selectedProject.objective}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-red-900 mb-2">⚠️ Problème</h3>
                  <p className="text-gray-700">{selectedProject.problem}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">✅ Solution</h3>
                  <p className="text-gray-700">{selectedProject.solution}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">📊 Impact Attendu</h3>
                  <p className="text-gray-700">{selectedProject.impact}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-amber-900 mb-2">🤝 Partenaires</h3>
                  <p className="text-gray-700">{selectedProject.partners}</p>
                </div>
              </div>

              <Button 
                className="w-full mt-8 bg-blue-900 hover:bg-blue-800 text-white"
                onClick={() => setSelectedProject(null)}
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