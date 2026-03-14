import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
//import { div, div } from '@/components/ui/card';
//import { Button } from '@/components/ui/button';
import Button from '../components/Button';
import { 
  Users, Briefcase, GraduationCap, Lightbulb, 
  Heart, TrendingUp, Target, Award
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Youth() {
  const youthPrograms = [
    {
      icon: GraduationCap,
      title: 'Formation Professionnelle',
      description: 'Centre de formation dans 10 métiers porteurs',
      details: [
        'Mécanique auto et moto',
        'Électricité et électronique',
        'Soudure et métallurgie',
        'Menuiserie et ébénisterie',
        'Couture et stylisme',
        'Informatique et développement web',
        'Agriculture moderne',
        'Élevage intensif',
        'Pâtisserie et transformation alimentaire',
        'Maçonnerie et BTP'
      ],
      impact: '500 jeunes formés par an'
    },
    {
      icon: Briefcase,
      title: 'Emploi & Entrepreneuriat',
      description: 'Facilitation d\'accès à l\'emploi et création d\'entreprise',
      details: [
        'Figuil Business Zone : 300 emplois jeunes',
        'Incubateur de startups : accompagnement gratuit',
        'Microcrédits sans garantie (50 000 - 500 000 FCFA)',
        'Mentorat par entrepreneurs expérimentés',
        'Bourses de stage en entreprise',
        'Programme "Premier emploi" avec subventions',
        'Plateforme digitale offres d\'emploi Figuil'
      ],
      impact: '1000+ emplois créés d\'ici 2031'
    },
    {
      icon: Lightbulb,
      title: 'Innovation & Technologie',
      description: 'Hub d\'innovation pour jeunes talents',
      details: [
        'Espace de coworking équipé',
        'Formation en IA, développement web, design',
        'Accès internet haut débit gratuit',
        'Matériel informatique disponible',
        'Hackathons et compétitions d\'innovation',
        'Partenariat avec Google Developer Group',
        'Bourses d\'excellence pour projets innovants'
      ],
      impact: '50 startups tech lancées'
    },
    {
      icon: Award,
      title: 'Festival de l\'Innovation',
      description: 'Événement annuel célébrant les jeunes talents',
      details: [
        'Concours de projets innovants',
        'Prix : 3 millions FCFA à gagner',
        'Exposition des réalisations jeunes',
        'Conférences inspirantes',
        'Networking avec investisseurs',
        'Démonstrations technologiques',
        'Concert et animations culturelles'
      ],
      impact: 'Valorisation des talents locaux'
    }
  ];

  const womenPrograms = [
    {
      icon: Users,
      title: 'Coopératives Féminines',
      description: 'Organisation et structuration économique',
      details: [
        '10 coopératives dans les 5 cantons',
        'Coopérative agricole (maraîchage, céréales)',
        'Coopérative élevage (volaille, petit bétail)',
        'Coopérative artisanat (tissage, poterie)',
        'Coopérative transformation (karité, arachide)',
        'Formation en gestion coopérative',
        'Accès groupé aux marchés',
        'Mutuelle d\'épargne et crédit'
      ],
      impact: '1000 femmes organisées'
    },
    {
      icon: TrendingUp,
      title: 'Microcrédits Sans Garantie',
      description: 'Financement accessible pour toutes',
      details: [
        'Prêts de 25 000 à 1 million FCFA',
        'Taux préférentiels (2-5%)',
        'Pas de garantie matérielle exigée',
        'Remboursement flexible adapté aux cycles',
        'Formation en gestion financière incluse',
        'Accompagnement personnalisé',
        '500 femmes financées la première année'
      ],
      impact: 'Autonomie économique renforcée'
    },
    {
      icon: Target,
      title: 'Centres Féminins de Métiers',
      description: 'Espaces de formation et de production',
      details: [
        '3 centres (Figuil, Lam, Bidzar)',
        'Ateliers de couture équipés',
        'Transformation agroalimentaire',
        'Savonnerie et cosmétique naturelle',
        'Teinture et batik',
        'Garderie pour enfants sur place',
        'Espace de vente des productions',
        'Formation certifiante'
      ],
      impact: '300 femmes formées annuellement'
    },
    {
      icon: Heart,
      title: 'Leadership & Participation',
      description: 'Femmes au cœur des décisions',
      details: [
        'Quota 40% femmes dans instances communales',
        'Formation en leadership et gouvernance',
        'Réseau de femmes leaders',
        'Programme de mentorat féminin',
        'Conseil communal des femmes',
        'Campagnes de sensibilisation égalité',
        'Protection contre les violences',
        'Médiation et écoute psychologique'
      ],
      impact: 'Participation politique renforcée'
    }
  ];

  const stats = [
    { value: '65%', label: 'Jeunes sans emploi', color: 'text-red-600' },
    { value: '1000+', label: 'Emplois à créer', color: 'text-green-600' },
    { value: '500', label: 'Formations annuelles', color: 'text-blue-600' },
    { value: '40%', label: 'Quota femmes', color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block px-6 py-2 bg-amber-500/20 border border-amber-400 rounded-full mb-6">
              <span className="text-amber-300 font-semibold">Priorité n°1</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Jeunes & Femmes
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Au Cœur du Projet
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Vous êtes l'avenir de Figuil. Notre programme met l'accent sur votre 
              formation, votre emploi, votre autonomisation et votre participation active.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 text-center"
              >
                <div className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Youth Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Programme <span className="text-blue-600">Jeunesse</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Former, employer et accompagner les jeunes vers l'autonomie et la réussite
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {youthPrograms.map((program, index) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="h-full hover:shadow-2xl transition-all duration-300 border-0">
                    <div className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{program.title}</h3>
                      <p className="text-gray-600 mb-6">{program.description}</p>
                      
                      <div className="bg-blue-50 rounded-xl p-4 mb-4">
                        <h4 className="font-bold text-blue-900 mb-3">Détails :</h4>
                        <ul className="space-y-2">
                          {program.details.map((detail, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start">
                              <span className="text-blue-600 mr-2">✓</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <span className="text-green-900 font-bold">🎯 {program.impact}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Women Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Programme <span className="text-pink-600">Femmes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Autonomisation économique, leadership et participation active des femmes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {womenPrograms.map((program, index) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                    <div className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{program.title}</h3>
                      <p className="text-gray-600 mb-6">{program.description}</p>
                      
                      <div className="bg-pink-50 rounded-xl p-4 mb-4">
                        <h4 className="font-bold text-pink-900 mb-3">Détails :</h4>
                        <ul className="space-y-2">
                          {program.details.map((detail, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start">
                              <span className="text-pink-600 mr-2">✓</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-3 text-center">
                        <span className="text-purple-900 font-bold">🎯 {program.impact}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Vous êtes concerné(e) ?
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Rejoignez le mouvement et participez activement à la construction 
            de votre avenir et celui de Figuil.
          </p>
          <Link to={createPageUrl('Join')}>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-xl px-12 py-7 shadow-2xl">
              Soutenir le Programme Jeunes & Femmes
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}