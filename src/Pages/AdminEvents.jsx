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
import { Calendar, Plus, Edit, Trash2, ArrowLeft, Save, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TYPE_CONFIG = {
  meeting: { label: 'Meeting', color: 'bg-green-100 text-green-700 border-green-200' },
  rencontre: { label: 'Rencontre', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  forum: { label: 'Forum', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  autre: { label: 'Autre', color: 'bg-slate-100 text-slate-600 border-slate-200' },
};

const CANTON_LABELS = {
  figuil: 'Figuil', lam: 'Lam', biou: 'Biou', bidzar_1: 'Bidzar 1', bidzar_2: 'Bidzar 2',
};

const defaultForm = {
  titre: '',
  date: '',
  lieu: '',
  canton: 'figuil',
  type: 'meeting',
  description: '',
};

export default function AdminEvents() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(defaultForm);

  const { data: evenements = [], isLoading } = useQuery({
    queryKey: ['evenements-admin'],
    queryFn: () => base44.entities.Evenement.list('date'),
  });

  const createEv = useMutation({
    mutationFn: (data) => base44.entities.Evenement.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evenements-admin'] });
      queryClient.invalidateQueries({ queryKey: ['evenements'] });
      resetForm();
    },
  });

  const updateEv = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Evenement.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evenements-admin'] });
      queryClient.invalidateQueries({ queryKey: ['evenements'] });
      resetForm();
    },
  });

  const deleteEv = useMutation({
    mutationFn: (id) => base44.entities.Evenement.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evenements-admin'] });
      queryClient.invalidateQueries({ queryKey: ['evenements'] });
    },
  });

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setFormData(defaultForm);
  };

  const startEdit = (ev) => {
    setEditing(ev);
    setFormData({
      titre: ev.titre || '',
      date: ev.date ? ev.date.slice(0, 16) : '',
      lieu: ev.lieu || '',
      canton: ev.canton || 'figuil',
      type: ev.type || 'meeting',
      description: ev.description || '',
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData };
    if (editing) {
      updateEv.mutate({ id: editing.id, data: payload });
    } else {
      createEv.mutate(payload);
    }
  };

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const isLoading2 = createEv.isPending || updateEv.isPending;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to={createPageUrl('Admin')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div>
              <h1 className="font-extrabold text-slate-900 text-xl">Gestion des Événements</h1>
              <p className="text-slate-500 text-sm">{evenements.length} événement{evenements.length !== 1 ? 's' : ''} au total</p>
            </div>
          </div>
          <Button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-950 hover:bg-blue-900 text-white gap-2">
            <Plus className="w-4 h-4" /> Nouvel événement
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="mb-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-blue-950">
                      {editing ? "Modifier l'événement" : 'Nouvel événement'}
                    </CardTitle>
                    <button onClick={resetForm} className="p-2 hover:bg-slate-100 rounded-lg"><X className="w-4 h-4" /></button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <Label htmlFor="titre">Titre *</Label>
                        <Input id="titre" value={formData.titre} onChange={e => handleChange('titre', e.target.value)}
                          placeholder="Ex : Meeting de Figuil" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="date">Date et heure</Label>
                        <Input id="date" type="datetime-local" value={formData.date}
                          onChange={e => handleChange('date', e.target.value)} className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lieu">Lieu</Label>
                        <Input id="lieu" value={formData.lieu} onChange={e => handleChange('lieu', e.target.value)}
                          placeholder="Ex : Salle des fêtes de Figuil" className="mt-1" />
                      </div>
                      <div>
                        <Label>Canton</Label>
                        <Select value={formData.canton} onValueChange={v => handleChange('canton', v)}>
                          <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {Object.entries(CANTON_LABELS).map(([k, v]) => (
                              <SelectItem key={k} value={k}>{v}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Type</Label>
                        <Select value={formData.type} onValueChange={v => handleChange('type', v)}>
                          <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {Object.entries(TYPE_CONFIG).map(([k, v]) => (
                              <SelectItem key={k} value={k}>{v.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={formData.description}
                          onChange={e => handleChange('description', e.target.value)}
                          placeholder="Détails sur l'événement..." rows={3} className="mt-1" />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button type="submit" disabled={isLoading2} className="bg-green-600 hover:bg-green-700 text-white gap-2">
                        <Save className="w-4 h-4" /> {isLoading2 ? 'Enregistrement...' : (editing ? 'Modifier' : 'Créer')}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm}>Annuler</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white rounded-xl border animate-pulse" />)}
          </div>
        ) : evenements.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-14 h-14 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 text-lg font-medium">Aucun événement</p>
            <p className="text-slate-400 text-sm mt-1">Créez le premier événement de la campagne.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {evenements.map((ev, i) => {
              const typeConf = TYPE_CONFIG[ev.type] || TYPE_CONFIG.autre;
              const isPast = ev.date && new Date(ev.date) < new Date();
              return (
                <motion.div key={ev.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`bg-white rounded-xl border p-5 flex gap-4 items-start ${isPast ? 'opacity-60' : ''}`}>
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center ${isPast ? 'bg-slate-200 text-slate-500' : 'bg-blue-950 text-white'}`}>
                    {ev.date ? (
                      <>
                        <span className="text-xl font-black leading-none">{new Date(ev.date).getDate().toString().padStart(2, '0')}</span>
                        <span className="text-xs opacity-80 uppercase font-semibold">
                          {['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'][new Date(ev.date).getMonth()]}
                        </span>
                      </>
                    ) : <Calendar className="w-6 h-6 opacity-50" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-1">
                      <Badge variant="outline" className={typeConf.color}>{typeConf.label}</Badge>
                      {ev.canton && <Badge variant="outline" className="text-slate-500">{CANTON_LABELS[ev.canton] || ev.canton}</Badge>}
                      {isPast && <Badge variant="outline" className="text-slate-400">Passé</Badge>}
                    </div>
                    <h3 className="font-bold text-slate-900">{ev.titre}</h3>
                    {ev.lieu && <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin className="w-3.5 h-3.5" /> {ev.lieu}</p>}
                    {ev.description && <p className="text-sm text-slate-500 mt-1 line-clamp-2">{ev.description}</p>}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => startEdit(ev)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-blue-950">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => { if (confirm('Supprimer cet événement ?')) deleteEv.mutate(ev.id); }}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-600 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
