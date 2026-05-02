import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, TrendingUp, CheckCircle, Clock, XCircle, RefreshCw, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const STATUS_CONFIG = {
  success:  { label: 'Confirmé',  color: 'bg-green-100 text-green-700 border-green-200',  icon: CheckCircle },
  pending:  { label: 'En attente', color: 'bg-amber-100 text-amber-700 border-amber-200',  icon: Clock },
  failed:   { label: 'Échoué',    color: 'bg-red-100 text-red-700 border-red-200',         icon: XCircle },
};

function getStatusConf(status) {
  const key = (status || '').toLowerCase();
  return STATUS_CONFIG[key] || { label: status || 'Inconnu', color: 'bg-slate-100 text-slate-600 border-slate-200', icon: Clock };
}

function formatXAF(n) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' XAF';
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function AdminDonations() {
  const queryClient = useQueryClient();
  const [verifying, setVerifying] = useState(null); // transaction_id being verified

  const { data: donations = [], isLoading, refetch } = useQuery({
    queryKey: ['donations-admin'],
    queryFn: () => base44.entities.Donation.list('-created_date'),
  });

  const confirmed = donations.filter(d => d.status?.toLowerCase() === 'success');
  const pending   = donations.filter(d => d.status?.toLowerCase() === 'pending');
  const totalXAF  = confirmed.reduce((s, d) => s + (Number(d.amount) || 0), 0);

  const handleVerify = async (donation) => {
    if (!donation.transaction_id) return;
    setVerifying(donation.transaction_id);
    try {
      const res = await fetch(`/api/donations/verify?id=${encodeURIComponent(donation.transaction_id)}`);
      const data = await res.json();
      if (data.status) {
        queryClient.invalidateQueries({ queryKey: ['donations-admin'] });
      }
    } finally {
      setVerifying(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to={createPageUrl('Admin')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div>
              <h1 className="font-extrabold text-slate-900 text-xl">Gestion des Dons</h1>
              <p className="text-slate-500 text-sm">{donations.length} transaction{donations.length !== 1 ? 's' : ''} au total</p>
            </div>
          </div>
          <button onClick={() => refetch()} className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-950 border border-slate-200 hover:border-blue-950 px-3 py-2 rounded-lg transition-all">
            <RefreshCw className="w-4 h-4" /> Actualiser
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {[
            { label: 'Total collecté (confirmé)', value: formatXAF(totalXAF), icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Transactions confirmées', value: confirmed.length, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'En attente de confirmation', value: pending.length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">{s.label}</p>
                      <p className="text-2xl font-black text-slate-900 mt-1">{s.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center`}>
                      <s.icon className={`w-6 h-6 ${s.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Donations list */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white rounded-xl border animate-pulse" />)}
          </div>
        ) : donations.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-14 h-14 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 text-lg font-medium">Aucun don pour l'instant</p>
            <p className="text-slate-400 text-sm mt-1">Les contributions apparaîtront ici dès qu'un donateur soumet sa contribution.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {donations.map((don, i) => {
              const sc = getStatusConf(don.status);
              const StatusIcon = sc.icon;
              const isVerifying = verifying === don.transaction_id;
              return (
                <motion.div key={don.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white rounded-xl border border-slate-100 p-5 flex gap-4 items-center">

                  <div className="flex-shrink-0 w-12 h-12 bg-blue-950 text-white rounded-xl flex items-center justify-center">
                    <Heart className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-bold text-slate-900 text-lg">{formatXAF(don.amount)}</span>
                      <Badge variant="outline" className={sc.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {sc.label}
                      </Badge>
                      {don.network && (
                        <Badge variant="outline" className="text-slate-500 text-xs">
                          {don.network.toUpperCase()}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 font-medium">{don.donor_name || 'Anonyme'}</p>
                    <p className="text-xs text-slate-400 mt-0.5 font-mono">{don.phone_number}</p>
                    {don.message && <p className="text-xs text-slate-500 mt-1 italic">"{don.message}"</p>}
                    <p className="text-xs text-slate-400 mt-1">{formatDate(don.created_date)}</p>
                  </div>

                  <div className="flex-shrink-0 flex flex-col items-end gap-2">
                    {don.transaction_id && don.status?.toLowerCase() === 'pending' && (
                      <button onClick={() => handleVerify(don)} disabled={isVerifying}
                        className="flex items-center gap-1.5 text-xs text-blue-950 hover:text-blue-700 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all disabled:opacity-50">
                        {isVerifying
                          ? <Loader2 className="w-3 h-3 animate-spin" />
                          : <RefreshCw className="w-3 h-3" />}
                        Vérifier
                      </button>
                    )}
                    {don.transaction_id && (
                      <p className="text-xs text-slate-300 font-mono truncate max-w-[120px]" title={don.transaction_id}>
                        {don.transaction_id.slice(0, 8)}…
                      </p>
                    )}
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
