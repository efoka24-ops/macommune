import React, { useState } from 'react';
//import { div, div } from '@/components/ui/card';
//import { Button } from '@/components/ui/button';
import  Button  from  '../components/Button';
//import { Badge } from '@/components/ui/badge';
import  Badge  from '../components/Badge';
import { MapPin, Users, Sprout, Factory, Landmark, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Cantons() {
  const [selectedCanton, setSelectedCanton] = useState(null);

  const cantons = [
    {
      id: 'figuil',
      name: 'Canton de Figuil',
      icon: Factory,
      color: 'from-blue-600 to-indigo-700',
      population: '~30,000',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
      description: 'Centre urbain et administratif de la commune',
      priorities: [
        'Urbanisation planifiée',
        'Business Zone',
        'Emploi des jeunes',
        'Services administratifs modernes',
        'Éclairage public'
      ],
      projects: [
        'Figuil Business Zone : Hub économique avec 100 boutiques',
        'Éclairage solaire : 200 lampadaires',
        'Université Rurale : Centre de formation supérieure',
        'Coworking & Incubateur : Pépinière de startups',
        'Marchés modernes : 3 marchés restructurés'
      ],
      challenges: [
        'Croissance démographique rapide',
        'Chômage des jeunes',
        'Infrastructure vieillissante'
      ],
      testimonials: [
        {
          name: 'Amadou Bello',
          role: 'Jeune entrepreneur',
          message: 'La Business Zone va changer nos vies. Enfin des opportunités ici !'
        }
      ]
    },
    {
      id: 'lam',
      name: 'Canton de Lam',
      icon: Sprout,
      color: 'from-green-600 to-emerald-700',
      population: '~18,000',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
      description: 'Zone agricole stratégique',
      priorities: [
        'Agriculture moderne',
        'Accès à l\'eau',
        'Coopératives agricoles',
        'Routes rurales',
        'Formation des agriculteurs'
      ],
      projects: [
        '40 forages équipés : Eau pour tous les villages',
        'Coopératives agricoles : 3 coopératives structurées',
        'Routes pavées : 15 km reliant villages',
        'Centre de formation : Techniques agricoles modernes',
        'Banque de céréales : Stockage et commercialisation'
      ],
      challenges: [
        'Sécheresse récurrente',
        'Difficulté d\'accès aux marchés',
        'Techniques agricoles traditionnelles'
      ],
      testimonials: [
        {
          name: 'Aïcha Moussa',
          role: 'Agricultrice',
          message: 'Avec l\'eau et les coopératives, nous pourrons enfin vivre de nos récoltes.'
        }
      ]
    },
    {
      id: 'biou',
      name: 'Canton de Biou',
      icon: Droplet,
      color: 'from-cyan-600 to-blue-700',
      population: '~12,000',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      description: 'Potentiel piscicole et agro-pastoral',
      priorities: [
        'Pisciculture',
        'Adductions d\'eau',
        'Transformation agro-pastorale',
        'Désenclavement',
        'Électrification'
      ],
      projects: [
        'Fermes piscicoles : 5 fermes modernes',
        '30 forages équipés : Eau potable accessible',
        'Unité de transformation : Lait, viande, poisson',
        'Routes pavées : 10 km vers centres de collecte',
        'Éclairage solaire : 100 lampadaires'
      ],
      challenges: [
        'Isolement géographique',
        'Manque d\'infrastructures',
        'Potentiel inexploité'
      ],
      testimonials: [
        {
          name: 'Hamidou Issa',
          role: 'Éleveur-pêcheur',
          message: 'Les fermes piscicoles vont diversifier nos revenus et nourrir la région.'
        }
      ]
    },
    {
      id: 'bidzar',
      name: 'Cantons Bidzar I & II',
      icon: Landmark,
      color: 'from-orange-600 to-red-700',
      population: '~23,500',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
      description: 'Patrimoine UNESCO et identité culturelle',
      priorities: [
        'Valorisation du site UNESCO',
        'Tourisme culturel',
        'Routes pavées',
        'Artisanat local',
        'Préservation du patrimoine'
      ],
      projects: [
        'Musée moderne de Bidzar : Centre culturel et touristique',
        'Route culturelle : Circuit des sites historiques',
        'Formation guides : 50 guides touristiques locaux',
        'Villages artisanaux : Promotion de l\'artisanat',
        '40 forages : Eau pour préserver le patrimoine',
        'Routes pavées : 15 km d\'accès aux sites'
      ],
      challenges: [
        'Potentiel touristique inexploité',
        'Dégradation du patrimoine',
        'Faible valorisation culturelle'
      ],
      testimonials: [
        {
          name: 'Malam Oumar',
          role: 'Gardien du patrimoine',
          message: 'Nos ancêtres nous ont légué un trésor. Il est temps de le faire rayonner.'
        }
      ]
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Figuil en
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                5 Cantons
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Un projet territorial qui parle à chaque communauté, 
              valorise chaque potentiel et unit nos diversités.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">5</div>
              <div className="text-gray-600">Cantons</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">83,500</div>
              <div className="text-gray-600">Habitants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">150</div>
              <div className="text-gray-600">Forages prévus</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 mb-2">100%</div>
              <div className="text-gray-600">Couverture</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cantons Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cantons.map((canton, index) => {
              const Icon = canton.icon;
              return (
                <motion.div
                  key={canton.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden border-0">
                    <div className="relative h-64">
                      <div className={`absolute inset-0 bg-gradient-to-br ${canton.color} opacity-90`}></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                        <Icon className="w-20 h-20 mb-4" />
                        <h3 className="text-3xl font-bold mb-2">{canton.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{canton.population} habitants</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4 italic">{canton.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-bold text-gray-900 mb-2">Priorités :</h4>
                        <div className="flex flex-wrap gap-2">
                          {canton.priorities.slice(0, 3).map((priority, idx) => (
                            <Badge key={idx} variant="secondary">
                              {priority}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => setSelectedCanton(canton)}
                      >
                        Voir les Projets
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedCanton && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedCanton(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-5xl w-full my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-56 bg-gradient-to-br ${selectedCanton.color} relative flex items-center justify-center`}>
              {(() => {
                const Icon = selectedCanton.icon;
                return (
                  <>
                    <div className="text-center text-white">
                      <Icon className="w-24 h-24 mx-auto mb-4" />
                      <h2 className="text-4xl font-bold">{selectedCanton.name}</h2>
                      <p className="text-xl mt-2">{selectedCanton.population} habitants</p>
                    </div>
                  </>
                );
              })()}
            </div>
            
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <p className="text-lg text-gray-600 mb-8 italic">{selectedCanton.description}</p>
              
              {/* Challenges */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3">⚠️</span> Défis Actuels
                </h3>
                <ul className="space-y-2">
                  {selectedCanton.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <span className="text-red-600 mr-2">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3">🎯</span> Projets Dédiés
                </h3>
                <div className="space-y-3">
                  {selectedCanton.projects.map((project, idx) => (
                    <div key={idx} className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-600">
                      <p className="text-gray-800 font-medium">{project}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              {selectedCanton.testimonials && (
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="mr-3">💬</span> Voix des Habitants
                  </h3>
                  {selectedCanton.testimonials.map((testimonial, idx) => (
                    <div key={idx} className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-600">
                      <p className="text-gray-700 italic mb-3">"{testimonial.message}"</p>
                      <div className="text-sm">
                        <span className="font-bold text-gray-900">{testimonial.name}</span>
                        <span className="text-gray-600"> - {testimonial.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                className={`w-full bg-gradient-to-r ${selectedCanton.color} hover:opacity-90 text-white py-4 rounded-xl font-semibold text-lg transition-all`}
                onClick={() => setSelectedCanton(null)}
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}