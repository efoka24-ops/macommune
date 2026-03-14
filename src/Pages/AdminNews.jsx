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
  Newspaper, Plus, Edit, Trash2, ArrowLeft, 
  Save, X, Calendar, MapPin, Upload, ImageIcon
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminNews() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image_url: '',
    category: 'terrain',
    canton: 'tous',
    published: true
  });

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['news-admin'],
    queryFn: () => base44.entities.NewsArticle.list('-created_date'),
  });

  const createArticle = useMutation({
    mutationFn: (data) => base44.entities.NewsArticle.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-admin'] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
      resetForm();
    }
  });

  const updateArticle = useMutation({
    mutationFn: ({ id, data }) => base44.entities.NewsArticle.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-admin'] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
      resetForm();
    }
  });

  const deleteArticle = useMutation({
    mutationFn: (id) => base44.entities.NewsArticle.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-admin'] });
      queryClient.invalidateQueries({ queryKey: ['news'] });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingArticle) {
      updateArticle.mutate({ id: editingArticle.id, data: formData });
    } else {
      createArticle.mutate(formData);
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt || '',
      image_url: article.image_url || '',
      category: article.category,
      canton: article.canton,
      published: article.published
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingArticle(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      image_url: '',
      category: 'terrain',
      canton: 'tous',
      published: true
    });
  };

  const categoryLabels = {
    terrain: 'Sur le terrain',
    reunion: 'Réunion',
    projet: 'Projet',
    temoignage: 'Témoignage',
    communique: 'Communiqué'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
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
                  <Newspaper className="w-8 h-8 mr-3" />
                  Gérer les Actualités
                </h1>
                <p className="text-blue-200 mt-1">{articles.length} article(s) au total</p>
              </div>
            </div>
            {!showForm && (
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                Nouvel Article
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
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center justify-between">
                    <span>{editingArticle ? 'Modifier l\'Article' : 'Nouvel Article'}</span>
                    <Button variant="ghost" onClick={resetForm}>
                      <X className="w-5 h-5" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                      <Label htmlFor="title" className="text-lg font-semibold">
                        Titre de l'Article *
                      </Label>
                      <Input
                        id="title"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Ex: Rencontre avec les jeunes de Figuil"
                        className="mt-2 h-12"
                      />
                    </div>

                    {/* Excerpt */}
                    <div>
                      <Label htmlFor="excerpt" className="text-lg font-semibold">
                        Résumé Court
                      </Label>
                      <Input
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="Résumé en une phrase"
                        className="mt-2 h-12"
                      />
                      <p className="text-sm text-gray-500 mt-1">Apparaîtra dans les aperçus</p>
                    </div>

                    {/* Content */}
                    <div>
                      <Label htmlFor="content" className="text-lg font-semibold">
                        Contenu Complet *
                      </Label>
                      <Textarea
                        id="content"
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Écrivez le contenu complet de l'article..."
                        className="mt-2 min-h-[200px]"
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <Label className="text-lg font-semibold">
                        Image de l'Article
                      </Label>
                      <div className="mt-2">
                        {formData.image_url ? (
                          <div className="relative inline-block">
                            <img src={formData.image_url} alt="Aperçu" className="w-full max-h-48 object-cover rounded-lg border" />
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, image_url: '' })}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500 font-medium">Cliquez pour choisir une image</span>
                            <span className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (max 5 Mo)</span>
                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/webp"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file && file.size <= 5 * 1024 * 1024) {
                                  const reader = new FileReader();
                                  reader.onload = (ev) => setFormData({ ...formData, image_url: ev.target.result });
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Category */}
                      <div>
                        <Label htmlFor="category" className="text-lg font-semibold">
                          Catégorie *
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
                    </div>

                    {/* Published */}
                    <div className="flex items-center space-x-3 bg-amber-50 p-4 rounded-lg">
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                      />
                      <Label htmlFor="published" className="cursor-pointer font-semibold">
                        {formData.published ? '✅ Article Publié (visible sur le site)' : '⚠️ Brouillon (non visible)'}
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
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={createArticle.isPending || updateArticle.isPending}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {editingArticle ? 'Mettre à Jour' : 'Publier'}
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
              {/* Articles List */}
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Chargement...</p>
                </div>
              ) : articles.length === 0 ? (
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-12 text-center">
                    <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun article</h3>
                    <p className="text-gray-600 mb-6">Commencez par créer votre premier article</p>
                    <Button onClick={() => setShowForm(true)} className="bg-blue-600">
                      <Plus className="w-5 h-5 mr-2" />
                      Créer un Article
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {articles.map((article) => (
                    <Card key={article.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h3 className="text-xl font-bold text-gray-900">{article.title}</h3>
                              {!article.published && (
                                <Badge variant="outline" className="bg-amber-50 text-amber-700">
                                  Brouillon
                                </Badge>
                              )}
                            </div>
                            {article.excerpt && (
                              <p className="text-gray-600 mb-3">{article.excerpt}</p>
                            )}
                            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {format(new Date(article.created_date), 'dd MMM yyyy', { locale: fr })}
                              </div>
                              <Badge className="bg-blue-100 text-blue-800">
                                {categoryLabels[article.category]}
                              </Badge>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {cantonLabels[article.canton]}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEdit(article)}
                              className="hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4 text-blue-600" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
                                  deleteArticle.mutate(article.id);
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