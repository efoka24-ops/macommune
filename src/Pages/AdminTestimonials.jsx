import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  MessageSquare, Plus, Edit, Trash2, ArrowLeft, 
  Save, X, Star, MapPin, Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminTestimonials() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    canton: 'figuil',
    category: 'autre',
    message: '',
    photo_url: '',
    video_url: '',
    featured: false
  });

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials-admin'],
    queryFn: () => base44.entities.Testimonial.list('-created_date'),
  });

  const createTestimonial = useMutation({
    mutationFn: (data) => base44.entities.Testimonial.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials-admin'] });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      resetForm();
    }
  });

  const updateTestimonial = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Testimonial.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials-admin'] });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      resetForm();
    }
  });

  const deleteTestimonial = useMutation({
    mutationFn: (id) => base44.entities.Testimonial.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials-admin'] });
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTestimonial) {
      updateTestimonial.mutate({ id: editingTestimonial.id, data: formData });
    } else {
      createTestimonial.mutate(formData);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role || '',
      canton: testimonial.canton,
      category: testimonial.category || 'autre',
      message: testimonial.message,
      photo_url: testimonial.photo_url || '',
      video_url: testimonial.video_url || '',
      featured: testimonial.featured || false
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingTestimonial(null);
    setFormData({
      name: '',
      role: '',
      canton: 'figuil',
      category: 'autre',
      message: '',
      photo_url: '',
      video_url: '',
      featured: false
    });
  };

  const cantonLabels = {
    figuil: 'Figuil',
    lam: 'Lam',
    biou: 'Biou',
    bidzar_1: 'Bidzar I',
    bidzar_2: 'Bidzar II'
  };

  const categoryLabels = {
    jeune: 'Jeune',
    femme: 'Femme',
    agriculteur: 'Agriculteur',
    eleveur: 'Éleveur',
    commercant: 'Commerçant',
    leader: 'Leader',
    autre: 'Autre'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to={createPageUrl('Admin')}>
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Retour
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold flex items-center">
                  <MessageSquare className="w-8 h-8 mr-3" />
                  Gérer les Témoignages
                </h1>
                <p className="text-green-200 mt-1">{testimonials.length} témoignage(s) au total</p>
              </div>
            </div>
            {!showForm && (
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                Nouveau Témoignage
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-green-50">
                  <CardTitle className="flex items-center justify-between">
                    <span>{editingTestimonial ? 'Modifier le Témoignage' : 'Nouveau Témoignage'}</span>
                    <Button variant="ghost" onClick={resetForm}>
                      <X className="w-5 h-5" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <Label htmlFor="name" className="text-lg font-semibold">
                          Nom de la Personne *
                        </Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ex: Amadou Bello"
                          className="mt-2 h-12"
                        />
                      </div>

                      {/* Role */}
                      <div>
                        <Label htmlFor="role" className="text-lg font-semibold">
                          Fonction / Profession
                        </Label>
                        <Input
                          id="role"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          placeholder="Ex: Agriculteur"
                          className="mt-2 h-12"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Canton */}
                      <div>
                        <Label htmlFor="canton" className="text-lg font-semibold">
                          Canton *
                        </Label>
                        <Select
                          value={formData.canton}
                          onValueChange={(value) => setFormData({ ...formData, canton: value })}
                        >
                          <SelectTrigger className="mt-2 h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(cantonLabels).map(([key, label]) => (
                              <SelectItem key={key} value={key}>{label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Category */}
                      <div>
                        <Label htmlFor="category" className="text-lg font-semibold">
                          Catégorie
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger className="mt-2 h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(categoryLabels).map(([key, label]) => (
                              <SelectItem key={key} value={key}>{label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <Label htmlFor="message" className="text-lg font-semibold">
                        Témoignage *
                      </Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Écrivez le témoignage complet..."
                        className="mt-2 min-h-[150px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Photo Upload */}
                      <div>
                        <Label className="text-lg font-semibold">
                          Photo de la Personne
                        </Label>
                        <div className="mt-2">
                          {formData.photo_url ? (
                            <div className="relative inline-block">
                              <img src={formData.photo_url} alt="Aperçu" className="w-full max-h-40 object-cover rounded-lg border" />
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, photo_url: '' })}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors">
                              <Upload className="w-6 h-6 text-gray-400 mb-1" />
                              <span className="text-sm text-gray-500 font-medium">Choisir une photo</span>
                              <span className="text-xs text-gray-400 mt-1">PNG, JPG (max 5 Mo)</span>
                              <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file && file.size <= 5 * 1024 * 1024) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => setFormData({ ...formData, photo_url: ev.target.result });
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      {/* Video URL */}
                      <div>
                        <Label htmlFor="video_url" className="text-lg font-semibold">
                          URL de la Vidéo (optionnel)
                        </Label>
                        <Input
                          id="video_url"
                          type="url"
                          value={formData.video_url}
                          onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                          placeholder="https://youtube.com/..."
                          className="mt-2 h-12"
                        />
                      </div>
                    </div>

                    {/* Featured */}
                    <div className="flex items-center space-x-3 bg-amber-50 p-4 rounded-lg">
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                      />
                      <Label htmlFor="featured" className="cursor-pointer font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-2 text-amber-600" />
                        {formData.featured ? 'Témoignage mis en avant (affiché sur la page d\'accueil)' : 'Témoignage standard'}
                      </Label>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-6 border-t">
                      <Button type="button" variant="outline" onClick={resetForm}>
                        <X className="w-4 h-4 mr-2" />
                        Annuler
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-green-600 hover:bg-green-700"
                        disabled={createTestimonial.isPending || updateTestimonial.isPending}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {editingTestimonial ? 'Mettre à Jour' : 'Enregistrer'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Chargement...</p>
                </div>
              ) : testimonials.length === 0 ? (
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun témoignage</h3>
                    <p className="text-gray-600 mb-6">Commencez par ajouter votre premier témoignage</p>
                    <Button onClick={() => setShowForm(true)} className="bg-green-600">
                      <Plus className="w-5 h-5 mr-2" />
                      Créer un Témoignage
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                              <p className="text-sm text-gray-600">{testimonial.role}</p>
                            </div>
                          </div>
                          {testimonial.featured && (
                            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                          )}
                        </div>

                        <p className="text-gray-700 italic mb-4 line-clamp-3">
                          "{testimonial.message}"
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800">
                              {categoryLabels[testimonial.category]}
                            </Badge>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-3 h-3 mr-1" />
                              {cantonLabels[testimonial.canton]}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEdit(testimonial)}
                              className="hover:bg-green-50"
                            >
                              <Edit className="w-4 h-4 text-green-600" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                if (confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) {
                                  deleteTestimonial.mutate(testimonial.id);
                                }
                              }}
                              className="hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}