import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import  Button  from '../components/Button';
import Input  from '../components/Input';
import Label  from '../components/Label';
import  Checkbox  from '../components/Checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/select'
import { UserPlus, CheckCircle, Users, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Join() {
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    canton: '',
    village: '',
    help_type: [],
    profile: ''
  });

  const createSupporter = useMutation({
    mutationFn: (data) => base44.entities.Supporter.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supporters-admin'] });
      setSubmitted(true);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createSupporter.mutate(formData);
  };

  const handleHelpTypeChange = (value, checked) => {
    setFormData(prev => ({
      ...prev,
      help_type: checked
        ? [...prev.help_type, value]
        : prev.help_type.filter(t => t !== value)
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="border-0 shadow-2xl">
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Bienvenue dans l'équipe !
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Merci {formData.name} pour votre soutien. Notre équipe vous contactera 
                très prochainement sur WhatsApp pour coordonner vos actions.
              </p>
              <div className="bg-amber-50 rounded-xl p-6 mb-8">
                <p className="text-gray-700 font-medium">
                  Ensemble, nous allons construire le Figuil de demain.
                  De la pierre au progrès, bâtissons Figuil !
                </p>
              </div>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    canton: '',
                    village: '',
                    help_type: [],
                    profile: ''
                  });
                }}
                className="bg-blue-900 hover:bg-blue-800 text-white"
              >
                Faire rejoindre quelqu'un d'autre
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

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
            <UserPlus className="w-16 h-16 text-amber-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Rejoignez
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                le Mouvement
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Participez activement à la construction d'un avenir meilleur pour Figuil.
              Votre engagement fait la différence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Réseau</h3>
              <p className="text-gray-600">Connectez-vous avec d'autres citoyens engagés</p>
            </div>
            <div>
              <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Impact</h3>
              <p className="text-gray-600">Contribuez directement au développement local</p>
            </div>
            <div>
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Formation</h3>
              <p className="text-gray-600">Accédez à des formations et opportunités</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="shadow-2xl border-0">
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-8 rounded-t-xl">
                <div className="text-3xl">Formulaire d'Adhésion</div>
                <p className="text-blue-200 mt-2">Remplissez vos informations pour nous rejoindre</p>
              </div>
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-lg font-semibold">
                      Nom Complet <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Votre nom et prénom"
                      className="mt-2 h-12"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-lg font-semibold">

                      Numéro WhatsApp <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+237 XXX XXX XXX"
                      className="mt-2 h-12"
                    />
                    <p className="text-sm text-gray-500 mt-1">Pour vous contacter facilement</p>
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-lg font-semibold">
                      Email (optionnel)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre.email@exemple.com"
                      className="mt-2 h-12"
                    />
                  </div>

                  {/* Canton */}
                  <div>
                    <Label htmlFor="canton" className="text-lg font-semibold">
                      Canton <span className="text-red-600">*</span>
                    </Label>
                    <Select
                      required
                      value={formData.canton}
                      onValueChange={(value) => setFormData({ ...formData, canton: value })}
                    >
                      <SelectTrigger className="mt-2 h-12">
                        <SelectValue placeholder="Sélectionnez votre canton" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="figuil">Canton de Figuil</SelectItem>
                        <SelectItem value="lam">Canton de Lam</SelectItem>
                        <SelectItem value="biou">Canton de Biou</SelectItem>
                        <SelectItem value="bidzar_1">Canton Bidzar I</SelectItem>
                        <SelectItem value="bidzar_2">Canton Bidzar II</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Village */}
                  <div>
                    <Label htmlFor="village" className="text-lg font-semibold">
                      Village / Quartier
                    </Label>
                    <Input
                      id="village"
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      placeholder="Nom de votre village ou quartier"
                      className="mt-2 h-12"
                    />
                  </div>

                  {/* Help Type */}
                  <div>
                    <Label className="text-lg font-semibold mb-3 block">
                      Comment souhaitez-vous aider ?
                    </Label>
                    <div className="space-y-3">
                      {[
                        { value: 'mobilisation', label: 'Mobilisation sur le terrain' },
                        { value: 'communication', label: 'Communication / Réseaux sociaux' },
                        { value: 'logistique', label: 'Logistique et organisation' },
                        { value: 'terrain', label: 'Actions de proximité' }
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-3">
                          <Checkbox
                            id={option.value}
                            checked={formData.help_type.includes(option.value)}
                            onCheckedChange={(checked) => handleHelpTypeChange(option.value, checked)}
                          />
                          <Label htmlFor={option.value} className="cursor-pointer font-normal">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Profile */}
                  <div>
                    <Label htmlFor="profile" className="text-lg font-semibold">
                      Votre Profil
                    </Label>
                    <Select
                      value={formData.profile}
                      onValueChange={(value) => setFormData({ ...formData, profile: value })}
                    >
                      <SelectTrigger className="mt-2 h-12">
                        <SelectValue placeholder="Sélectionnez votre profil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jeune">Jeune</SelectItem>
                        <SelectItem value="femme">Femme</SelectItem>
                        <SelectItem value="agriculteur">Agriculteur</SelectItem>
                        <SelectItem value="eleveur">Éleveur</SelectItem>
                        <SelectItem value="commercant">Commerçant</SelectItem>
                        <SelectItem value="enseignant">Enseignant</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit */}
                  {createSupporter.isError && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                      Une erreur est survenue. Veuillez réessayer.
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={createSupporter.isPending}
                    className="w-full h-14 text-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold shadow-xl"
                  >
                    {createSupporter.isPending ? 'Envoi en cours...' : 'Rejoindre le Mouvement'}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}