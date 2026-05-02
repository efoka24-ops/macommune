import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { UserPlus, CheckCircle, MapPin, Phone, Mail, Briefcase, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const CANTONS = [
  { value: 'figuil', label: 'Canton de Figuil' },
  { value: 'lam', label: 'Canton de Lam' },
  { value: 'biou', label: 'Canton de Biou' },
  { value: 'bidzar_1', label: 'Canton de Bidzar I' },
  { value: 'bidzar_2', label: 'Canton de Bidzar II' },
];

const HELP_TYPES = [
  'Sensibilisation porte-à-porte',
  'Distribution de tracts',
  'Financement',
  'Organisation de meetings',
  'Transport de sympathisants',
  'Animation réseaux sociaux',
  'Mobilisation de femmes',
  'Mobilisation de jeunes',
];

const PROFILES = [
  { value: 'jeune', label: 'Jeune (18-35 ans)' },
  { value: 'femme', label: 'Femme' },
  { value: 'chef', label: 'Chef traditionnel' },
  { value: 'agriculteur', label: 'Agriculteur/Éleveur' },
  { value: 'commercant', label: 'Commerçant/Entrepreneur' },
  { value: 'enseignant', label: 'Enseignant/Fonctionnaire' },
  { value: 'autre', label: 'Autre' },
];

export default function Join() {
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', canton: '', village: '', help_type: [], profile: ''
  });

  const createSupporter = useMutation({
    mutationFn: (data) => base44.entities.Supporter.create(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['supporters-admin'] }); setSubmitted(true); }
  });

  const handleSubmit = (e) => { e.preventDefault(); createSupporter.mutate(formData); };

  const handleHelpTypeChange = (value, checked) => {
    setFormData(prev => ({
      ...prev,
      help_type: checked ? [...prev.help_type, value] : prev.help_type.filter(t => t !== value)
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-12 text-center">
          <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-950 mb-3">Bienvenue dans l'équipe !</h2>
          <p className="text-slate-600 text-lg mb-8">Votre inscription a bien été enregistrée. Nous vous contacterons très prochainement.</p>
          <button onClick={() => setSubmitted(false)} className="text-green-600 font-semibold hover:text-green-700 underline">
            Inscrire quelqu'un d'autre
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="bg-blue-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <UserPlus className="w-4 h-4" /> Rejoindre le Mouvement
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Nous Rejoindre</h1>
            <p className="text-blue-200 text-xl max-w-2xl mx-auto">
              Ensemble, construisons le Figuil de demain. Inscrivez-vous comme sympathisant ou bénévole.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div><div className="text-4xl font-black mb-1">1 200+</div><div className="text-green-100">Sympathisants inscrits</div></div>
            <div><div className="text-4xl font-black mb-1">5</div><div className="text-green-100">Cantons mobilisés</div></div>
            <div><div className="text-4xl font-black mb-1">150+</div><div className="text-green-100">Bénévoles actifs</div></div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
            <h2 className="text-2xl font-extrabold text-blue-950 mb-8">Formulaire d'inscription</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Nom complet *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent" placeholder="Votre nom complet" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Téléphone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input required type="tel" value={formData.phone} onChange={e => setFormData(p => ({...p, phone: e.target.value}))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950" placeholder="+237 6XX XXX XXX" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input type="email" value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950" placeholder="votre@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Canton *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <select required value={formData.canton} onChange={e => setFormData(p => ({...p, canton: e.target.value}))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950 appearance-none bg-white">
                      <option value="">Choisir un canton</option>
                      {CANTONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Village</label>
                  <input type="text" value={formData.village} onChange={e => setFormData(p => ({...p, village: e.target.value}))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950" placeholder="Votre village" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Profil</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <select value={formData.profile} onChange={e => setFormData(p => ({...p, profile: e.target.value}))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-950 appearance-none bg-white">
                      <option value="">Votre profil</option>
                      {PROFILES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Comment souhaitez-vous aider ?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {HELP_TYPES.map(ht => (
                    <label key={ht} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-green-400 hover:bg-green-50 cursor-pointer transition-all">
                      <input type="checkbox" checked={formData.help_type.includes(ht)} onChange={e => handleHelpTypeChange(ht, e.target.checked)}
                        className="w-4 h-4 accent-green-600" />
                      <span className="text-sm text-slate-700">{ht}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={createSupporter.isPending}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors text-lg">
                {createSupporter.isPending ? 'Inscription en cours...' : "M'inscrire comme sympathisant"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
