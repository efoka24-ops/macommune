import React from 'react';
//import { div, div } from '@/components/ui/card';
import { Award, Heart, Users, Lightbulb, Target, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Intégrité',
      description: 'Transparence et honnêteté dans chaque action'
    },
    {
      icon: Users,
      title: 'Proximité',
      description: 'À l\'écoute des besoins de chaque canton'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Solutions modernes pour défis locaux'
    },
    {
      icon: Briefcase,
      title: 'Travail',
      description: 'Engagement total au service de Figuil'
    },
    {
      icon: Target,
      title: 'Résultats',
      description: 'Des projets concrets et mesurables'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Standard élevé dans chaque initiative'
    },
  ];

  const achievements = [
    'Responsable Google Developer Group',
    'Fondateur de MOKINE (traçabilité animale par IA)',
    'Lauréat YEIC (Young Entrepreneurs Innovation Challenge)',
    'Lauréat APPECAM (Association pour la Promotion de l\'Entrepreneuriat)',
    'Lauréat ECAM (École Supérieure des Sciences et Techniques)',
    'Lauréat AppsAfrica Innovation Awards',
    'Expert en Intelligence Artificielle appliquée à l\'agriculture',
    'Expert en développement rural et élevage'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-2 bg-amber-500/20 border border-amber-400 rounded-full mb-6">
                <span className="text-amber-300 font-semibold text-sm">Candidat à la Mairie de Figuil 2026</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Emmanuel Foka
              </h1>
              <p className="text-2xl text-amber-400 mb-6">
                Un fils de Figuil au service du progrès
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                Entrepreneur innovant, expert en développement local et passionné 
                par l'avenir de notre commune. Mon parcours est celui d'un bâtisseur 
                engagé pour l'inclusion, l'innovation et la prospérité partagée.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <div className="text-9xl font-bold text-white/20">EF</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Mon Parcours</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-3">Enfance à Figuil</h3>
              <p className="text-gray-700 leading-relaxed">
                Né et élevé à Figuil, j'ai grandi en observant les défis de notre commune :
                l'accès limité à l'eau potable, le manque d'opportunités pour les jeunes,
                les difficultés économiques de nos agriculteurs et éleveurs. Ces réalités
                ont forgé ma détermination à contribuer au développement de ma terre natale.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-xl">
              <h3 className="text-2xl font-bold text-amber-900 mb-3">Formation & Expertise</h3>
              <p className="text-gray-700 leading-relaxed">
                Mon parcours académique et professionnel m'a permis de développer une expertise
                unique en intelligence artificielle, agriculture intelligente et développement
                rural. J'ai combiné ces compétences pour créer des solutions innovantes adaptées
                aux réalités locales.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-xl">
              <h3 className="text-2xl font-bold text-green-900 mb-3">Leadership & Innovation</h3>
              <p className="text-gray-700 leading-relaxed">
                En tant que Responsable du Google Developer Group et fondateur de MOKINE
                (système de traçabilité animale par IA), j'ai démontré ma capacité à diriger
                des projets innovants et à mobiliser les talents. Ces expériences m'ont préparé
                à relever les défis du développement communal.
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Reconnaissances & Distinctions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-start space-x-3"
                >
                  <Award className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mes Valeurs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident mon engagement au service de Figuil
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white group">
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20">
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Ma Mission</h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                Transformer Figuil en un modèle de développement durable où chaque habitant,
                de chaque canton, a accès aux opportunités, aux services essentiels et 
                peut contribuer à la prospérité collective.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20">
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Ma Vision</h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                Une commune moderne, inclusive et prospère où l'innovation technologique
                sert le développement local, où les jeunes et les femmes sont au cœur
                des transformations, et où chaque canton brille de son potentiel.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-2xl text-amber-400 font-semibold mb-4">
              "De la pierre au progrès : ensemble, bâtissons Figuil"
            </p>
            <p className="text-lg text-gray-300">
              Ce n'est pas qu'un slogan, c'est notre engagement commun.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}