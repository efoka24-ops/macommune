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
import { 
  Settings, ArrowLeft, Plus, Trash2, Save, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPages() {
  const queryClient = useQueryClient();
  const [editingPage, setEditingPage] = useState('about');
  const [showAddValue, setShowAddValue] = useState(false);
  const [newValue, setNewValue] = useState({ title: '', description: '' });
  const [formData, setFormData] = useState({
    title: '',
    intro: '',
    values: [],
    achievements: []
  });

  const { data: pageData } = useQuery({
    queryKey: ['pages', editingPage],
    queryFn: () => base44.pages.get(editingPage),
  });

  const updatePage = useMutation({
    mutationFn: (data) => base44.pages.update(editingPage, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      queryClient.invalidateQueries({ queryKey: ['pages', editingPage] });
    }
  });

  const handleAddValue = () => {
    if (newValue.title && newValue.description) {
      setFormData(prev => ({
        ...prev,
        values: [
          ...prev.values,
          { id: Date.now(), ...newValue }
        ]
      }));
      setNewValue({ title: '', description: '' });
      setShowAddValue(false);
    }
  };

  const handleRemoveValue = (id) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.filter(v => v.id !== id)
    }));
  };

  const handleAddAchievement = (e) => {
    const value = e.target.value;
    if (e.key === 'Enter' && value.trim()) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, value.trim()]
      }));
      e.target.value = '';
    }
  };

  const handleRemoveAchievement = (index) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePage.mutate(formData);
  };

  const handlePageChange = (page) => {
    setEditingPage(page);
    setFormData(pageData?.[page] || {
      title: '',
      intro: '',
      values: [],
      achievements: []
    });
  };

  React.useEffect(() => {
    if (pageData?.[editingPage]) {
      setFormData(pageData[editingPage]);
    }
  }, [pageData, editingPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <Link to={createPageUrl('Admin')}>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Settings className="w-8 h-8 mr-3" />
                Gérer les Pages
              </h1>
              <p className="text-purple-200 mt-1">Modifier le contenu principal du site</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Page Selector */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-20">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-gray-600">Pages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button
                  onClick={() => handlePageChange('about')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    editingPage === 'about'
                      ? 'bg-purple-600 text-white font-semibold'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Qui suis-je
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={editingPage}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gray-50">
                  <CardTitle>{formData.title || 'Charger...'}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Title */}
                    <div>
                      <Label className="text-lg font-semibold">Titre *</Label>
                      <Input
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Qui suis-je"
                        className="mt-2 h-12"
                      />
                    </div>

                    {/* Intro */}
                    <div>
                      <Label className="text-lg font-semibold">Introduction *</Label>
                      <Textarea
                        required
                        value={formData.intro}
                        onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
                        placeholder="Texte d'introduction..."
                        className="mt-2 min-h-[120px]"
                      />
                    </div>

                    {/* Values/Principes */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-lg font-semibold">Valeurs & Principes</Label>
                        {!showAddValue && (
                          <Button
                            type="button"
                            onClick={() => setShowAddValue(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Ajouter
                          </Button>
                        )}
                      </div>

                      {showAddValue && (
                        <Card className="bg-gray-50 p-4 mb-4">
                          <div className="space-y-3">
                            <Input
                              placeholder="Titre (ex: Intégrité)"
                              value={newValue.title}
                              onChange={(e) => setNewValue({ ...newValue, title: e.target.value })}
                              className="h-10"
                            />
                            <Textarea
                              placeholder="Description..."
                              value={newValue.description}
                              onChange={(e) => setNewValue({ ...newValue, description: e.target.value })}
                              className="min-h-[80px]"
                            />
                            <div className="flex space-x-2">
                              <Button
                                type="button"
                                onClick={handleAddValue}
                                className="bg-green-600 hover:bg-green-700 text-white flex-1"
                              >
                                <Save className="w-4 h-4 mr-1" />
                                Enregistrer
                              </Button>
                              <Button
                                type="button"
                                onClick={() => {
                                  setShowAddValue(false);
                                  setNewValue({ title: '', description: '' });
                                }}
                                variant="outline"
                                className="flex-1"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      )}

                      <div className="space-y-2">
                        {formData.values?.map((value) => (
                          <motion.div
                            key={value.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gray-50 p-4 rounded-lg flex items-start justify-between"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{value.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{value.description}</p>
                            </div>
                            <Button
                              type="button"
                              onClick={() => handleRemoveValue(value.id)}
                              variant="ghost"
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <Label className="text-lg font-semibold mb-2 block">Réalisations</Label>
                      <Input
                        placeholder="Entrez une réalisation et appuyez sur Entrée..."
                        onKeyPress={handleAddAchievement}
                        className="h-10 mb-3"
                      />
                      <div className="space-y-2">
                        {formData.achievements?.map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gray-50 p-3 rounded-lg flex items-center justify-between"
                          >
                            <span className="text-gray-700">{achievement}</span>
                            <Button
                              type="button"
                              onClick={() => handleRemoveAchievement(index)}
                              variant="ghost"
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end space-x-3 pt-6 border-t">
                      <Button
                        type="submit"
                        disabled={updatePage.isPending}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {updatePage.isPending ? 'Enregistrement...' : 'Enregistrer'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
