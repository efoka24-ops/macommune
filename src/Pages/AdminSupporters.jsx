import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, ArrowLeft, Phone, Mail, MapPin, 
  Search, Filter, Download, CheckCircle, User
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminSupporters() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCanton, setFilterCanton] = useState('tous');

  const { data: supporters = [], isLoading } = useQuery({
    queryKey: ['supporters-admin'],
    queryFn: () => base44.entities.Supporter.list('-created_date'),
  });

  const updateSupporter = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Supporter.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supporters-admin'] });
    }
  });

  const toggleContacted = (supporter) => {
    updateSupporter.mutate({
      id: supporter.id,
      data: { contacted: !supporter.contacted }
    });
  };

  const cantonLabels = {
    figuil: 'Figuil',
    lam: 'Lam',
    biou: 'Biou',
    bidzar_1: 'Bidzar I',
    bidzar_2: 'Bidzar II'
  };

  const profileLabels = {
    jeune: 'Jeune',
    femme: 'Femme',
    agriculteur: 'Agriculteur',
    eleveur: 'Éleveur',
    commercant: 'Commerçant',
    enseignant: 'Enseignant',
    autre: 'Autre'
  };

  const helpTypeLabels = {
    mobilisation: 'Mobilisation',
    communication: 'Communication',
    logistique: 'Logistique',
    terrain: 'Terrain'
  };

  const filteredSupporters = supporters.filter(supporter => {
    const matchesSearch = supporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supporter.phone.includes(searchTerm) ||
                         (supporter.village && supporter.village.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCanton = filterCanton === 'tous' || supporter.canton === filterCanton;
    return matchesSearch && matchesCanton;
  });

  const stats = {
    total: supporters.length,
    contacted: supporters.filter(s => s.contacted).length,
    notContacted: supporters.filter(s => !s.contacted).length,
    byProfile: supporters.reduce((acc, s) => {
      acc[s.profile] = (acc[s.profile] || 0) + 1;
      return acc;
    }, {})
  };

  const exportToCSV = () => {
    const headers = ['Nom', 'Téléphone', 'Email', 'Canton', 'Village', 'Profil', 'Aide', 'Contacté'];
    const rows = filteredSupporters.map(s => [
      s.name,
      s.phone,
      s.email || '',
      cantonLabels[s.canton],
      s.village || '',
      profileLabels[s.profile] || '',
      (s.help_type || []).map(h => helpTypeLabels[h]).join('; '),
      s.contacted ? 'Oui' : 'Non'
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `supporters-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
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
                  <Users className="w-8 h-8 mr-3" />
                  Gérer les Supporters
                </h1>
                <p className="text-purple-200 mt-1">{supporters.length} personne(s) inscrite(s)</p>
              </div>
            </div>
            <Button 
              onClick={exportToCSV}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              <Download className="w-5 h-5 mr-2" />
              Exporter CSV
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-1">Total Inscrits</div>
              <div className="text-4xl font-bold text-blue-900">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-1">Contactés</div>
              <div className="text-4xl font-bold text-green-900">{stats.contacted}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-white">
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-1">À Contacter</div>
              <div className="text-4xl font-bold text-amber-900">{stats.notContacted}</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-1">Cantons</div>
              <div className="text-4xl font-bold text-purple-900">5</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Rechercher par nom, téléphone, village..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterCanton}
                  onChange={(e) => setFilterCanton(e.target.value)}
                  className="h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="tous">Tous les cantons</option>
                  {Object.entries(cantonLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supporters List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Chargement...</p>
          </div>
        ) : filteredSupporters.length === 0 ? (
          <Card className="border-0 shadow-xl">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {searchTerm || filterCanton !== 'tous' ? 'Aucun résultat' : 'Aucun supporter'}
              </h3>
              <p className="text-gray-600">
                {searchTerm || filterCanton !== 'tous' 
                  ? 'Essayez de modifier vos filtres de recherche'
                  : 'Les nouveaux inscrits apparaîtront ici'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredSupporters.map((supporter) => (
              <motion.div
                key={supporter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`border-0 shadow-lg hover:shadow-xl transition-all ${
                  supporter.contacted ? 'bg-green-50/50' : 'bg-white'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-7 h-7 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{supporter.name}</h3>
                            {supporter.contacted && (
                              <Badge className="bg-green-500 text-white">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Contacté
                              </Badge>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div className="flex items-center text-gray-600">
                              <Phone className="w-4 h-4 mr-2 text-purple-600" />
                              <a href={`tel:${supporter.phone}`} className="hover:text-purple-600">
                                {supporter.phone}
                              </a>
                            </div>
                            {supporter.email && (
                              <div className="flex items-center text-gray-600">
                                <Mail className="w-4 h-4 mr-2 text-purple-600" />
                                <a href={`mailto:${supporter.email}`} className="hover:text-purple-600">
                                  {supporter.email}
                                </a>
                              </div>
                            )}
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                              <span>{cantonLabels[supporter.canton]}</span>
                              {supporter.village && <span className="ml-1">• {supporter.village}</span>}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {supporter.profile && (
                              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                                {profileLabels[supporter.profile]}
                              </Badge>
                            )}
                            {supporter.help_type && supporter.help_type.map((type) => (
                              <Badge key={type} variant="outline" className="bg-blue-50 text-blue-700">
                                {helpTypeLabels[type]}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => toggleContacted(supporter)}
                        variant={supporter.contacted ? "outline" : "default"}
                        className={supporter.contacted 
                          ? "border-green-600 text-green-600 hover:bg-green-50" 
                          : "bg-purple-600 hover:bg-purple-700 text-white"}
                      >
                        {supporter.contacted ? 'Marquer non contacté' : 'Marquer contacté'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}