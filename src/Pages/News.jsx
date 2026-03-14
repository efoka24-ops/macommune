import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import Badge  from '../components/Badge';
import Skeleton  from '../components/Skeleton';
import { Calendar, MapPin, Newspaper } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';

export default function News() {
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const all = await base44.entities.NewsArticle.list('-created_date');
      return all.filter(a => a.published);
    },
  });

  const categoryLabels = {
    terrain: 'Sur le terrain',
    reunion: 'Réunion',
    projet: 'Projet',
    temoignage: 'Témoignage',
    communique: 'Communiqué'
  };

  const categoryColors = {
    terrain: 'bg-green-100 text-green-800',
    reunion: 'bg-blue-100 text-blue-800',
    projet: 'bg-purple-100 text-purple-800',
    temoignage: 'bg-amber-100 text-amber-800',
    communique: 'bg-red-100 text-red-800'
  };

  const cantonLabels = {
    figuil: 'Figuil',
    lam: 'Lam',
    biou: 'Biou',
    bidzar_1: 'Bidzar I',
    bidzar_2: 'Bidzar II',
    tous: 'Tous les cantons'
  };

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
            <div className="inline-flex items-center space-x-3 mb-6">
              <Newspaper className="w-12 h-12 text-amber-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Actualités
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                de la Campagne
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Suivez nos activités sur le terrain, nos rencontres avec les habitants 
              et l'avancement de nos projets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Aucune actualité pour le moment</h3>
              <p className="text-gray-600">Les actualités de la campagne seront publiées ici.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <div className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 group">
                    {article.image_url && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={article.image_url} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {article.category && (
                            <Badge className={categoryColors[article.category]}>
                              {categoryLabels[article.category]}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      {article.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {format(new Date(article.created_date), 'dd MMM yyyy', { locale: fr })}
                          </span>
                        </div>
                        {article.canton && article.canton !== 'tous' && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{cantonLabels[article.canton]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              La Voix des Habitants
            </h2>
            <p className="text-xl text-gray-600">
              Ce qu'ils disent de notre projet
            </p>
          </div>
          <TestimonialsSection />
        </div>
      </section>
    </div>
  );
}

function TestimonialsSection() {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const all = await base44.entities.Testimonial.list('-created_date');
      return all.filter(t => t.featured).slice(0, 6);
    },
  });

  const cantonLabels = {
    figuil: 'Figuil',
    lam: 'Lam',
    biou: 'Biou',
    bidzar_1: 'Bidzar I',
    bidzar_2: 'Bidzar II'
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="p-6">
              <Skeleton className="h-20 w-full mb-4" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>Les témoignages seront publiés prochainement.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <div className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white">
            <div className="p-8">
              <div className="text-amber-600 text-4xl mb-4">"</div>
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                {testimonial.message}
              </p>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {cantonLabels[testimonial.canton]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}