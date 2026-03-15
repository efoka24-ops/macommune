import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Newspaper, MessageSquare, Users, 
  BarChart3, PlusCircle, Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Admin() {
  const { data: newsCount = 0 } = useQuery({
    queryKey: ['news-count'],
    queryFn: async () => {
      const articles = await base44.entities.NewsArticle.list();
      return articles.length;
    },
  });

  const { data: testimonialsCount = 0 } = useQuery({
    queryKey: ['testimonials-count'],
    queryFn: async () => {
      const testimonials = await base44.entities.Testimonial.list();
      return testimonials.length;
    },
  });

  const { data: supportersCount = 0 } = useQuery({
    queryKey: ['supporters-count'],
    queryFn: async () => {
      const supporters = await base44.entities.Supporter.list();
      return supporters.length;
    },
  });

  const stats = [
    {
      title: 'Articles',
      value: newsCount,
      icon: Newspaper,
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      link: 'AdminNews'
    },
    {
      title: 'Témoignages',
      value: testimonialsCount,
      icon: MessageSquare,
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50',
      link: 'AdminTestimonials'
    },
    {
      title: 'Supporters',
      value: supportersCount,
      icon: Users,
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50',
      link: 'AdminSupporters'
    }
  ];

  const quickActions = [
    {
      title: 'Nouvelle Actualité',
      description: 'Publier un article',
      icon: Newspaper,
      color: 'from-blue-600 to-blue-800',
      link: 'AdminNews'
    },
    {
      title: 'Nouveau Témoignage',
      description: 'Ajouter un témoignage',
      icon: MessageSquare,
      color: 'from-green-600 to-green-800',
      link: 'AdminTestimonials'
    },
    {
      title: 'Gérer les Pages',
      description: 'Éditer le contenu du site',
      icon: Settings,
      color: 'from-amber-600 to-amber-800',
      link: 'AdminPages'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Tableau de Bord Admin</h1>
              <p className="text-blue-200">Gérez le contenu de votre site de campagne</p>
            </div>
            <Settings className="w-12 h-12 text-blue-300" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={createPageUrl(stat.link)}>
                  <Card className={`${stat.bgColor} border-0 hover:shadow-xl transition-all cursor-pointer group`}>
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                          <p className="text-5xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <PlusCircle className="w-6 h-6 mr-2 text-blue-600" />
            Actions Rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Link to={createPageUrl(action.link)}>
                    <Card className="border-0 hover:shadow-xl transition-all cursor-pointer group overflow-hidden">
                      <div className={`h-32 bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                        <Icon className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-gray-600">{action.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Management Sections */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
            Gérer le Contenu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to={createPageUrl('AdminNews')}>
              <Card className="border-0 hover:shadow-xl transition-all cursor-pointer">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center text-blue-900">
                    <Newspaper className="w-5 h-5 mr-2" />
                    Actualités
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">
                    Gérer les articles, photos et communiqués de campagne
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Gérer les Articles
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to={createPageUrl('AdminTestimonials')}>
              <Card className="border-0 hover:shadow-xl transition-all cursor-pointer">
                <CardHeader className="bg-green-50">
                  <CardTitle className="flex items-center text-green-900">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Témoignages
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">
                    Publier et gérer les témoignages des habitants
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Gérer les Témoignages
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to={createPageUrl('AdminSupporters')}>
              <Card className="border-0 hover:shadow-xl transition-all cursor-pointer">
                <CardHeader className="bg-purple-50">
                  <CardTitle className="flex items-center text-purple-900">
                    <Users className="w-5 h-5 mr-2" />
                    Supporters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">
                    Voir et contacter les personnes inscrites
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Voir les Supporters
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to={createPageUrl('AdminPages')}>
              <Card className="border-0 hover:shadow-xl transition-all cursor-pointer">
                <CardHeader className="bg-amber-50">
                  <CardTitle className="flex items-center text-amber-900">
                    <Settings className="w-5 h-5 mr-2" />
                    Pages du Site
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">
                    Modifier le contenu des pages principales
                  </p>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
                    Gérer les Pages
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Back to Site */}
        <div className="mt-12 text-center">
          <Link to={createPageUrl('Home')}>
            <Button variant="outline" size="lg" className="border-2">
              ← Retour au Site Public
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}