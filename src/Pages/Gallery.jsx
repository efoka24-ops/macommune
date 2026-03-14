import React, { useState } from 'react';
//import { div } from '@/components/ui/card';
//import { Button } from '@/components/ui/button';
import  Button  from '../components/Button';
import  Badge  from  '../components/Badge';

//import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('tous');

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
      title: 'Rencontre avec les jeunes de Figuil',
      canton: 'figuil',
      category: 'terrain'
    },
    {
      url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800',
      title: 'Assemblée Canton de Lam',
      canton: 'lam',
      category: 'reunion'
    },
    {
      url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800',
      title: 'Échanges avec les agriculteurs',
      canton: 'lam',
      category: 'terrain'
    },
    {
      url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
      title: 'Coopérative féminine Bidzar',
      canton: 'bidzar',
      category: 'projet'
    },
    {
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
      title: 'Formation des jeunes entrepreneurs',
      canton: 'figuil',
      category: 'formation'
    },
    {
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
      title: 'Visite de terrain Canton Biou',
      canton: 'biou',
      category: 'terrain'
    },
    {
      url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800',
      title: 'Rencontre avec les éleveurs',
      canton: 'tous',
      category: 'terrain'
    },
    {
      url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
      title: 'Réunion d\'équipe de campagne',
      canton: 'figuil',
      category: 'reunion'
    }
  ];

  const cantonLabels = {
    figuil: 'Figuil',
    lam: 'Lam',
    biou: 'Biou',
    bidzar: 'Bidzar',
    tous: 'Tous'
  };

  const filteredImages = filter === 'tous' 
    ? images 
    : images.filter(img => img.canton === filter);

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
            <ImageIcon className="w-16 h-16 text-amber-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Galerie
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Photo & Vidéo
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Revivez les moments forts de la campagne à travers nos images 
              et nos rencontres avec les habitants des 5 cantons.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {['tous', 'figuil', 'lam', 'biou', 'bidzar'].map((canton) => (
              <Button
                key={canton}
                variant={filter === canton ? 'default' : 'outline'}
                onClick={() => setFilter(canton)}
                className={filter === canton ? 'bg-blue-900 text-white' : ''}
              >
                <MapPin className="w-4 h-4 mr-2" />
                {cantonLabels[canton]}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div 
                    className="overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300 border-0"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="font-semibold text-sm line-clamp-2">{image.title}</p>
                        {//`<Badge variant="secondary" className="mt-2 bg-white/20 text-white border-white/30"> {cantonLabels[image.canton]} </Badge>`
                        }
                        <div variant="secondary" className="mt-2 bg-white/20 text-white border-white/30">
                          {cantonLabels[image.canton]}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <ImageIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <p className="text-xl text-gray-600">Aucune image pour ce filtre.</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Vidéos</h2>
            <p className="text-xl text-gray-600">Messages et moments clés de la campagne</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-900 to-slate-800 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                  </div>
                  <p className="text-lg">Vidéo {i}</p>
                  <p className="text-sm text-gray-400 mt-2">À venir prochainement</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                <Badge className="bg-amber-500 text-white">
                  {cantonLabels[selectedImage.canton]}
                </Badge>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}