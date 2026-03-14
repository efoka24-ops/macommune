import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import  Button  from '../components/Button';
//import { Button } from '@/components/ui/button';
//import { div, div } from '@/components/ui/card';
import { ArrowRight, Users, MapPin, Lightbulb, Heart, Building2, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const stats = [
    { value: '83 500', label: 'Habitants', icon: Users },
    { value: '5', label: 'Cantons Unis', icon: MapPin },
    { value: '10', label: 'Projets Signatures', icon: Lightbulb },
  ];

  const highlights = [
    {
      title: 'Figuil Business Zone',
      description: 'Un hub économique pour créer 500+ emplois directs',
      icon: Building2,
      color: 'from-blue-500 to-blue-700'
    },
    {
      title: '150 Forages',
      description: 'Eau potable pour tous, dans chaque village',
      icon: Droplet,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Jeunes & Femmes',
      description: 'Formation, emploi et autonomisation prioritaires',
      icon: Heart,
      color: 'from-amber-500 to-orange-600'
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-6 py-2 bg-amber-500/20 border border-amber-400 rounded-full mb-6">
              <span className="text-amber-300 font-semibold text-sm">Campagne Municipale 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              De la pierre au progrès :
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Bâtissons Figuil
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Emmanuel Foka, fils de Figuil, entrepreneur innovant et expert en développement local,
              au service du progrès et de l'inclusion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={createPageUrl('Program')}>
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6 shadow-2xl">
                  Découvrir mon Programme
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to={createPageUrl('Join')}>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8 py-6">
                  Rejoindre l'Équipe
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20">
                  <Icon className="w-10 h-10 text-amber-400 mx-auto mb-4" />
                  <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Une Vision pour <span className="text-amber-600">Figuil</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un projet ambitieux, réaliste et inclusif pour transformer notre commune
              en un modèle de développement durable et de prospérité partagée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white overflow-hidden group">
                    <div className="p-8">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to={createPageUrl('Projects')}>
              <Button size="lg" variant="outline" className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white">
                Voir les 10 Projets Signatures
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mon Message</h2>
            <p className="text-xl text-gray-600">Une vision claire pour l'avenir de Figuil</p>
          </div>
          
          <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900 to-slate-800 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
              </div>
              <p className="text-lg">Vidéo de présentation (30 secondes)</p>
              <p className="text-sm text-gray-400 mt-2">À venir prochainement</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200')] bg-cover bg-center opacity-5"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ensemble, faisons de Figuil
            <span className="block text-amber-400 mt-2">un modèle de développement</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Votre soutien est essentiel. Rejoignez le mouvement et participons
            à la construction d'un avenir meilleur pour nos 5 cantons.
          </p>
          <Link to={createPageUrl('Join')}>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white text-xl px-12 py-7 shadow-2xl">
              Je Rejoins le Mouvement
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}